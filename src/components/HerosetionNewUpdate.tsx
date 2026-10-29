'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Snowflake, Truck } from 'lucide-react';

interface HeroSectionProps {
  totalFrames?: number;
}

export const HerosetionNewUpdate: React.FC<HeroSectionProps> = ({ totalFrames = 563 }) => {
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

    const getGlobalFrame = (src: string): HTMLImageElement | null => {
      if (typeof window === 'undefined') return null;
      const store = (window as any).__HERO_FRAMES__;
      if (!store) return null;
      if (typeof store.get === 'function') return store.get(src) || null;
      return store[src] || null;
    };

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

    let imgToDraw = getReadyImg(safeTarget);

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
      }
    }

    if (!imgToDraw) {
      imgToDraw = getReadyImg(lastDrawnFrameRef.current);
    }

    if (!imgToDraw) return;

    const containerWidth = canvas.clientWidth || window.innerWidth;
    const containerHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    }

    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const imgWidth = imgToDraw.naturalWidth || 1920;
    const imgHeight = imgToDraw.naturalHeight || 1080;

    const canvasRatio = cWidth / cHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = cWidth;
      drawHeight = cWidth / imgRatio;
      offsetX = 0;
      offsetY = (cHeight - drawHeight) / 2;
    } else {
      drawWidth = cHeight * imgRatio;
      drawHeight = cHeight;
      offsetX = (cWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = safeTarget;
  }, [TOTAL_HERO_FRAMES]);

  const scheduleRender = React.useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawCanvas(targetFrameRef.current);
    });
  }, [drawCanvas]);

  const loadFrame = React.useCallback((frameNum: number) => {
    if (frameNum < 1 || frameNum > TOTAL_HERO_FRAMES) return null;
    const map = imagesMapRef.current;
    if (map.has(frameNum)) return map.get(frameNum)!;

    const frameStr = String(frameNum).padStart(5, '0');
    const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;

    if (typeof window !== 'undefined') {
      const store = (window as any).__HERO_FRAMES__;
      if (store) {
        const cached = typeof store.get === 'function' ? store.get(src) : store[src];
        if (cached && cached.complete && cached.naturalWidth > 0) {
          map.set(frameNum, cached);
          return cached;
        }
      }
    }

    const img = new window.Image();
    img.decoding = 'async';
    map.set(frameNum, img);

    if (typeof window !== 'undefined') {
      const store = (window as any).__HERO_FRAMES__;
      if (store) {
        if (typeof store.set === 'function') store.set(src, img);
        else store[src] = img;
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
              batchTimer = setTimeout(processRemaining, 30);
            }
          };
          batchTimer = setTimeout(processRemaining, 60);
        }
      };

      batchTimer = setTimeout(processMilestones, 50);
    }, 120);

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      if (batchTimer) clearTimeout(batchTimer);
    };
  }, [TOTAL_HERO_FRAMES, loadFrame, renderFrame]);

  React.useEffect(() => {
    const unsub = smoothProgress.on('change', (latest: number) => {
      const targetFrame = Math.max(1, Math.min(TOTAL_HERO_FRAMES, Math.round(latest * (TOTAL_HERO_FRAMES - 1) + 1)));
      renderFrame(targetFrame);
    });

    const directProgress = scrollYProgress.get();
    if (directProgress !== undefined) {
      const initialFrame = Math.max(1, Math.min(TOTAL_HERO_FRAMES, Math.round(directProgress * (TOTAL_HERO_FRAMES - 1) + 1)));
      renderFrame(initialFrame);
    }

    const handleResize = () => {
      drawCanvas(targetFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      unsub();
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
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between bg-black overflow-hidden select-none pt-24 sm:pt-28 lg:pt-24 pb-6 sm:pb-8 lg:pb-8">
        {/* Background Frame Sequence Canvas */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Top/Main Hero Content Block */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 w-full max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex-1 flex flex-col justify-center my-auto"
        >
          <div className="w-full max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
            {/* Tagline / Quality Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs lg:text-[13px] font-bold tracking-[0.25em] text-white uppercase font-inter drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
            >
              <span>QUALITY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC541]" />
              <span>SAFETY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC541]" />
              <span>FRESHNESS</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-0.5 sm:space-y-1"
            >
              <h1 className="text-5xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-[6rem] font-black tracking-normal uppercase leading-[0.88] drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]">
                <span className="block text-[#F07C00] font-black">
                  MEAT<span className="lowercase">i</span>N
                </span>
                <span className="block text-white">PURE QUALITY.</span>
                <span className="block text-white">TRUSTED MEAT.</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white text-base sm:text-lg lg:text-xl font-bold leading-snug font-inter max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] pt-1"
            >
              South India&apos;s Multi Species <br />
              Meat Processing Plant
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 sm:pt-3"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-[#034423] hover:bg-[#065830] border border-white/20 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_8px_25px_rgba(3,68,35,0.5)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(3,68,35,0.7)] hover:scale-105 active:scale-95 group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar: 4 Highlight Badges with subtle vertical divider lines */}
        <motion.div
          style={{ opacity: heroContentOpacity }}
          className="relative z-10 w-full max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 pt-4 pb-2"
        >
          <div className="w-full flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center divide-x divide-white/25"
            >
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center group cursor-default pr-5 sm:pr-8 lg:pr-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-[#8DC541]">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-[#8DC541] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider text-white uppercase font-inter leading-tight max-w-[95px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  PREMIUM<br />QUALITY MEAT
                </span>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center group cursor-default px-5 sm:px-8 lg:px-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-[#8DC541]">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-[#8DC541] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider text-white uppercase font-inter leading-tight max-w-[95px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  HYGIENIC<br />PROCESSING
                </span>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center text-center group cursor-default px-5 sm:px-8 lg:px-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-[#8DC541]">
                  <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-[#8DC541] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider text-white uppercase font-inter leading-tight max-w-[95px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  COLD CHAIN<br />SUPPLY
                </span>
              </div>

              {/* Badge 4 */}
              <div className="flex flex-col items-center text-center group cursor-default pl-5 sm:pl-8 lg:pl-10">
                <div className="w-13 h-13 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-[#8DC541]">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-[#8DC541] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider text-white uppercase font-inter leading-tight max-w-[95px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  FARM TO<br />FRESH
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HerosetionNewUpdate;
