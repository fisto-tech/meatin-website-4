'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

interface HeroSectionProps {
  totalFrames?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ totalFrames = 563 }) => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const [pointerEvents, setPointerEvents] = React.useState<'auto' | 'none'>('auto');
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const lastDrawnFrameRef = React.useRef<number>(1);
  const targetFrameRef = React.useRef<number>(1);
  const rafIdRef = React.useRef<number | null>(null);
  const imagesMapRef = React.useRef<Map<number, HTMLImageElement>>(new Map());

  const TOTAL_HERO_FRAMES = totalFrames;

  // Draw the best available frame for the given target
  const drawCanvas = React.useCallback((targetFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    }) as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const total = TOTAL_HERO_FRAMES;
    const safeTarget = Math.max(1, Math.min(total, Math.round(targetFrame)));
    const map = imagesMapRef.current;

    // Helper to safely retrieve cached frame from global LRU cache
    const getGlobalFrame = (src: string): HTMLImageElement | null => {
      if (typeof window === 'undefined') return null;
      const store = (window as any).__HERO_FRAMES__;
      if (!store) return null;
      if (typeof store.get === 'function') return store.get(src) || null;
      return store[src] || null;
    };

    // Helper to check if an image is completely loaded and ready to draw
    const getReadyImg = (num: number): HTMLImageElement | null => {
      let img = map.get(num);
      if (!img && typeof window !== 'undefined') {
        const frameStr = String(num).padStart(5, '0');
        const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;
        const globalImg = getGlobalFrame(src);
        if (globalImg) {
          map.set(num, globalImg);
          img = globalImg;
        }
      }
      if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        return img;
      }
      return null;
    };

    // 1. Direct hit on target frame
    let imgToDraw = getReadyImg(safeTarget);
    let frameUsed = safeTarget;

    // 2. If target frame isn't loaded yet, find the closest loaded frame in memory to safeTarget
    if (!imgToDraw) {
      let closestFrame = -1;
      let minDiff = Infinity;

      map.forEach((img, num) => {
        if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
          const diff = Math.abs(num - safeTarget);
          if (diff < minDiff) {
            minDiff = diff;
            closestFrame = num;
          }
        }
      });

      if (closestFrame !== -1) {
        imgToDraw = map.get(closestFrame) || null;
        frameUsed = closestFrame;
      }
    }

    // 3. Fallback to last successfully drawn frame if no other frame found
    if (!imgToDraw) {
      imgToDraw = getReadyImg(lastDrawnFrameRef.current);
      frameUsed = lastDrawnFrameRef.current;
    }

    if (!imgToDraw) return;

    const containerWidth = canvas.clientWidth || window.innerWidth;
    const containerHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    }

    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const containerRatio = containerWidth / containerHeight;

    let drawWidth = containerWidth;
    let drawHeight = containerHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio > imgRatio) {
      drawWidth = containerWidth;
      drawHeight = containerWidth / imgRatio;
      offsetY = (containerHeight - drawHeight) / 2;
    } else {
      drawHeight = containerHeight;
      drawWidth = containerHeight * imgRatio;
      offsetX = (containerWidth - drawWidth) / 2;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = frameUsed;
  }, [TOTAL_HERO_FRAMES]);

  const scheduleRender = React.useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawCanvas(targetFrameRef.current);
    });
  }, [drawCanvas]);

  const loadFrame = React.useCallback((frameNum: number): HTMLImageElement | null => {
    if (typeof window === 'undefined') return null;
    const total = TOTAL_HERO_FRAMES;
    if (frameNum < 1 || frameNum > total) return null;

    const map = imagesMapRef.current;
    if (map.has(frameNum)) {
      return map.get(frameNum)!;
    }

    const frameStr = String(frameNum).padStart(5, '0');
    const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;

    const store = (window as any).__HERO_FRAMES__;
    if (store) {
      const globalImg = typeof store.get === 'function' ? store.get(src) : store[src];
      if (globalImg) {
        map.set(frameNum, globalImg);
        return globalImg;
      }
    }

    const img = new (window as any).Image();
    img.decoding = 'async';
    map.set(frameNum, img);

    if (store) {
      if (typeof store.set === 'function') {
        store.set(src, img);
      } else {
        store[src] = img;
      }
    }

    const onImageLoaded = () => {
      const currentDiff = Math.abs(targetFrameRef.current - lastDrawnFrameRef.current);
      const newDiff = Math.abs(targetFrameRef.current - frameNum);
      if (newDiff <= currentDiff || Math.abs(targetFrameRef.current - frameNum) <= 4) {
        scheduleRender();
      }
    };

    img.addEventListener('load', onImageLoaded, { once: true });
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      onImageLoaded();
    }

    return img;
  }, [TOTAL_HERO_FRAMES, scheduleRender]);

  const renderFrame = React.useCallback((targetFrame: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let safeTarget = Math.max(1, Math.min(TOTAL_HERO_FRAMES, Math.round(targetFrame)));

    if (isMobile && safeTarget > 1 && safeTarget < TOTAL_HERO_FRAMES) {
      safeTarget = Math.round(safeTarget / 2) * 2;
    }

    targetFrameRef.current = safeTarget;

    loadFrame(safeTarget);
    const lookaheadStep = isMobile ? 2 : 1;
    const lookaheadCount = isMobile ? 4 : 8;
    for (let i = 1; i <= lookaheadCount; i++) {
      const offset = i * lookaheadStep;
      if (safeTarget + offset <= TOTAL_HERO_FRAMES) loadFrame(safeTarget + offset);
      if (safeTarget - offset >= 1) loadFrame(safeTarget - offset);
    }

    scheduleRender();
  }, [TOTAL_HERO_FRAMES, loadFrame, scheduleRender]);

  // Two-tier background frame preloader
  React.useEffect(() => {
    const total = TOTAL_HERO_FRAMES;
    let isCancelled = false;
    let batchTimer: NodeJS.Timeout | null = null;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const firstImg = loadFrame(1);
    if (firstImg && firstImg.complete) {
      renderFrame(1);
    } else if (firstImg) {
      firstImg.onload = () => {
        if (!isCancelled) renderFrame(1);
      };
    }

    const milestones: number[] = [];
    for (let i = 10; i <= total; i += 10) {
      milestones.push(i);
    }
    if (total % 10 !== 0) milestones.push(total);

    const timerId = setTimeout(() => {
      if (isCancelled) return;
      for (let i = 0; i < Math.min(milestones.length, 15); i++) {
        loadFrame(milestones[i]);
      }

      let milestoneIdx = 15;
      const processMilestones = () => {
        if (isCancelled) return;
        const end = Math.min(milestones.length, milestoneIdx + 10);
        for (let i = milestoneIdx; i < end; i++) {
          loadFrame(milestones[i]);
        }
        milestoneIdx = end;

        if (milestoneIdx < milestones.length) {
          batchTimer = setTimeout(processMilestones, 40);
        } else {
          const frameStep = isMobile ? 2 : 1;
          let currentFrame = 2;
          const processRemaining = () => {
            if (isCancelled || currentFrame > total) return;
            const batchEnd = Math.min(total, currentFrame + (isMobile ? 16 : 12));
            for (let f = currentFrame; f <= batchEnd; f += frameStep) {
              if (f % 10 !== 0) loadFrame(f);
            }
            currentFrame = batchEnd + frameStep;
            if (currentFrame <= total) {
              batchTimer = setTimeout(processRemaining, 50);
            }
          };
          batchTimer = setTimeout(processRemaining, 60);
        }
      };

      batchTimer = setTimeout(processMilestones, 50);
    }, 100);

    const t1 = setTimeout(() => {
      if (!isCancelled) window.dispatchEvent(new Event('resize'));
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      if (batchTimer) clearTimeout(batchTimer);
      clearTimeout(t1);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [TOTAL_HERO_FRAMES, loadFrame, renderFrame]);

  // Connect scroll progress directly to canvas drawing
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const total = TOTAL_HERO_FRAMES;
    const holdThreshold = 0.88;
    const normalizedProgress = Math.min(1, latest / holdThreshold);
    const frame = Math.min(
      total,
      Math.max(1, Math.floor(normalizedProgress * total)),
    );
    renderFrame(frame);

    if (latest > 0.4) {
      setPointerEvents('none');
    } else {
      setPointerEvents('auto');
    }
  });

  // Handle window resize and initial canvas paint
  React.useEffect(() => {
    const total = TOTAL_HERO_FRAMES;
    const holdThreshold = 0.88;
    const currentProgress = smoothProgress.get() ?? scrollYProgress.get() ?? 0;
    const normalizedProgress = Math.min(1, currentProgress / holdThreshold);
    const initialFrame = Math.min(
      total,
      Math.max(1, Math.floor(normalizedProgress * total)),
    );
    renderFrame(initialFrame);

    const handleResize = () => {
      drawCanvas(targetFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [TOTAL_HERO_FRAMES, renderFrame, drawCanvas, smoothProgress, scrollYProgress]);

  const heroContentOpacity = useTransform(smoothProgress, [0.75, 0.88], [1, 0]);
  const heroContentY = useTransform(smoothProgress, [0.75, 0.88], [0, -30]);

  return (
    <section ref={heroRef} className="relative w-full h-[380vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center bg-black overflow-hidden">
        {/* Background Frame Sequence Canvas */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center brightness-[0.75] lg:brightness-100"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 lg:via-transparent to-transparent" />
        </div>

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] relative z-10 pt-[6rem]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header content */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-3"
              >
                <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[5.5vw] font-extrabold tracking-wide uppercase leading-[0.92] space-y-1.5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  <span className="block text-[#F07C00] normal-case font-black">MEATiN</span>
                  <span className="block text-white">PURE QUALITY.</span>
                  <span className="block text-white">TRUSTED MEAT.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-white/90 text-sm sm:text-base lg:text-base xl:text-xl font-medium leading-relaxed font-inter max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  South India&apos;s Multi Species <br />
                  Meat Processing Plant
                </p>
              </motion.div>
            </div>

            {/* Right stamp overlay badge (Mobile/Tablet) */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="relative w-44 h-22 sm:w-48 sm:h-24 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hidden sm:block lg:hidden"
              >
                <Image
                  src="/AboutUs/keralas-original.webp"
                  alt="Kerala's Original Meat Badge"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Fixed bottom-right badge attached to the sticky hero container */}
        <motion.div
          style={{ opacity: heroContentOpacity }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-6 lg:right-8 xl:bottom-8 xl:right-10 w-44 h-22 sm:w-48 sm:h-24 lg:w-48 lg:h-24 xl:w-56 xl:h-28 2xl:w-64 2xl:h-32 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hidden lg:block z-20"
        >
          <Image
            src="/AboutUs/keralas-original.webp"
            alt="Kerala's Original Meat Badge"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
