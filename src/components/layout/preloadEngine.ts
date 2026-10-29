/**
 * High-Performance Bounded Asset Preloader & Memory Cache Engine
 * 
 * Features:
 * 1. 4-Tier DSA Priority Bucket Sorting (Instant Hero milestones -> Page Heroes -> Full Frames -> Complete Subpages)
 * 2. High-throughput Worker Pool with Bounded Concurrency (16 concurrent streams)
 * 3. Bounded LRU Memory Cache for Hero Frames (Max 150 active frame instances in RAM)
 * 4. Memory-Safe Subpage Preloading (Warms HTTP/2 browser disk/memory cache without holding 1,000+ DOM objects in JS heap)
 * 5. Resilient background worker pipeline that continues preloading post-hydration
 */

export interface PreloadOptions {
  concurrency?: number;
  onProgress?: (progress: number, loaded: number, total: number) => void;
  onComplete?: () => void;
}

/**
 * Bounded LRU Cache to maintain maximum active frames in JS memory (prevents iOS Safari memory reload)
 */
export class LRUImageCache {
  private map = new Map<string, HTMLImageElement>();
  private max: number;

  constructor(max = 150) {
    this.max = max;
  }

  get(key: string): HTMLImageElement | undefined {
    const item = this.map.get(key);
    if (item) {
      this.map.delete(key);
      this.map.set(key, item);
    }
    return item;
  }

  set(key: string, val: HTMLImageElement): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.max) {
      // Evict oldest unaccessed frame from JS memory
      const oldestKey = this.map.keys().next().value;
      if (oldestKey) this.map.delete(oldestKey);
    }
    this.map.set(key, val);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  size(): number {
    return this.map.size;
  }
}

// Global LRU cache initialization
if (typeof window !== 'undefined') {
  (window as any).__HERO_FRAMES__ = (window as any).__HERO_FRAMES__ || new LRUImageCache(150);
}

export class AssetPreloadEngine {
  private queue: string[] = [];
  private totalCount: number = 0;
  private loadedCount: number = 0;
  private maxConcurrency: number;
  private onProgress?: (progress: number, loaded: number, total: number) => void;
  private onComplete?: () => void;
  private isFinished: boolean = false;

  constructor(assets: string[], options: PreloadOptions = {}) {
    this.maxConcurrency = options.concurrency || 16;
    this.onProgress = options.onProgress;
    this.onComplete = options.onComplete;

    // 1. O(1) Set Deduplication
    const uniqueAssets = Array.from(new Set(assets.filter(Boolean)));

    // 2. Multi-tier Priority Bucket Sort (O(N))
    this.queue = this.prioritySort(uniqueAssets);
    this.totalCount = this.queue.length;
  }

  /**
   * 4-Tier Priority Bucket Sort:
   * Tier 1: Mascot, Logo, Home Section essentials, Hero first 15 frames + 10th-milestone frames
   * Tier 2: Hero images & primary cards for About, Products, Recipes, Franchise, Team, Contact
   * Tier 3: Intermediate Hero video frames (00001..00563)
   * Tier 4: Detailed subpage assets, dish cuts, country flags, doodles, etc.
   */
  private prioritySort(assets: string[]): string[] {
    const t1: string[] = []; // Immediate / Homepage Critical
    const t2: string[] = []; // Subpage Hero & Main Visuals
    const t3: string[] = []; // Full Hero video frames
    const t4: string[] = []; // Deep subpage assets & secondary visuals

    for (let i = 0; i < assets.length; i++) {
      const path = assets[i];
      const lower = path.toLowerCase();

      const isHeroFrame = lower.includes('/video-frames-opt/');

      if (isHeroFrame) {
        const match = lower.match(/(\d+)\.jpg$/);
        const frameNum = match ? parseInt(match[1], 10) : 999;
        if (frameNum <= 15 || frameNum % 10 === 0 || frameNum === 563) {
          t1.push(path); // Keyframe milestone -> Tier 1
        } else {
          t3.push(path); // Intermediate frame -> Tier 3
        }
      } else if (
        lower.includes('logo') ||
        lower.includes('preloader') ||
        lower.includes('/trustedqualitybanner/') ||
        lower.includes('/brand-story/') ||
        lower.includes('/truck-section/') ||
        lower.includes('/home/') ||
        lower.includes('/footer/') ||
        lower.includes('keralas-original')
      ) {
        t1.push(path);
      } else if (
        lower.includes('about-us-hero') ||
        lower.includes('hero-image') ||
        lower.includes('/product/chicken/banner') ||
        lower.includes('chickenparts') ||
        lower.includes('fullchicken') ||
        lower.includes('franchise-hero') ||
        lower.includes('meet-our-team-hero') ||
        lower.includes('contact-banner') ||
        lower.includes('/vlog/')
      ) {
        t2.push(path);
      } else {
        t4.push(path);
      }
    }

    return [...t1, ...t2, ...t3, ...t4];
  }

  /**
   * Start Worker Pool Execution (Producer-Consumer Queue Pipeline)
   */
  public start(): void {
    if (this.totalCount === 0) {
      this.triggerComplete();
      return;
    }

    const workersToLaunch = Math.min(this.maxConcurrency, this.queue.length);
    for (let i = 0; i < workersToLaunch; i++) {
      this.dispatchWorker();
    }
  }

  private triggerComplete(): void {
    if (this.isFinished) return;
    this.isFinished = true;
    if (this.onProgress) {
      this.onProgress(100, this.totalCount, this.totalCount);
    }
    if (this.onComplete) {
      this.onComplete();
    }
  }

  private dispatchWorker(): void {
    if (this.queue.length === 0) return;

    const assetPath = this.queue.shift()!;
    this.preloadAsset(assetPath).finally(() => {
      this.loadedCount++;
      const currentPercent = Math.min(99, Math.floor((this.loadedCount / this.totalCount) * 100));
      if (this.onProgress) {
        this.onProgress(currentPercent, this.loadedCount, this.totalCount);
      }

      if (this.loadedCount >= this.totalCount) {
        this.triggerComplete();
      } else {
        this.dispatchWorker();
      }
    });
  }

  private preloadAsset(assetPath: string): Promise<void> {
    return new Promise((resolve) => {
      const ext = assetPath.split('.').pop()?.toLowerCase();
      const isHeroFrame = assetPath.includes('/video-frames-opt/');

      if (ext === 'glb' || ext === 'gltf') {
        fetch(assetPath, { mode: 'cors', cache: 'force-cache' })
          .then(() => resolve())
          .catch(() => resolve());
      } else if (ext === 'mp4' || ext === 'webm') {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.src = assetPath;
        let done = false;
        const finish = () => {
          if (!done) {
            done = true;
            resolve();
          }
        };
        video.onloadeddata = finish;
        video.oncanplay = finish;
        video.onerror = finish;
        setTimeout(finish, 1200);
      } else {
        // For hero frames: check LRU Cache
        if (isHeroFrame && typeof window !== 'undefined') {
          const lru = (window as any).__HERO_FRAMES__;
          if (lru && typeof lru.get === 'function' && lru.get(assetPath)?.complete) {
            resolve();
            return;
          }
        }

        const img = new window.Image();
        img.src = assetPath;

        if (isHeroFrame && typeof window !== 'undefined') {
          const lru = (window as any).__HERO_FRAMES__;
          if (lru && typeof lru.set === 'function') {
            lru.set(assetPath, img);
          } else {
            (window as any).__HERO_FRAMES__ = (window as any).__HERO_FRAMES__ || {};
            (window as any).__HERO_FRAMES__[assetPath] = img;
          }
        }

        // When loaded, browser HTTP/2 cache saves the image file natively.
        // For subpage assets, img will be naturally GC'ed when no longer referenced, saving 300MB+ RAM.
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  }
}

/**
 * Background Idle Preloader to pre-warm browser cache across all pages
 */
export function startBackgroundAssetPreload(assets: string[]): void {
  if (typeof window === 'undefined') return;

  const run = () => {
    const engine = new AssetPreloadEngine(assets, {
      concurrency: 12,
    });
    engine.start();
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1000);
  }
}


