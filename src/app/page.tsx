"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import TrustedQualityBanner from "@/components/layout/TrustedQualityBanner";
import TruckSvg from "@/components/TruckSvg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 60, damping: 14 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HomePage() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const certSectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: certScrollProgress } = useScroll({
    target: certSectionRef,
    offset: ["start end", "end start"],
  });
  const rawTruckY = useTransform(certScrollProgress, [0, 1], [-120, 1250]);
  const truckY = useSpring(rawTruckY, {
    stiffness: 250,
    damping: 28,
    mass: 0.15,
    restDelta: 0.0001,
  });
  const certTruckOpacity = useTransform(
    certScrollProgress,
    [0, 0.08, 0.82, 0.95],
    [0, 1, 1, 0],
  );

  const section2Ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: section2ScrollProgress } = useScroll({
    target: section2Ref,
    offset: ["start 60%", "end 10%"],
  });

  const truckScrollX = useTransform(
    section2ScrollProgress,
    [0, 1],
    ["36vw", "-26vw"],
  );
  const truckScrollOpacity = useTransform(
    section2ScrollProgress,
    [0, 0.15, 0.85, 1],
    [0.9, 1, 1, 0.5],
  );
  const smoothTruckX = useSpring(truckScrollX, {
    stiffness: 250,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });
  const smoothTruckOpacity = useSpring(truckScrollOpacity, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.0001,
  });



  const [isTruckMoving, setIsTruckMoving] = React.useState(false);
  const stopTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const triggerMove = (duration = 400) => {
      setIsTruckMoving(true);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = setTimeout(() => {
        setIsTruckMoving(false);
      }, duration);
    };

    let lastY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) > 0.05) {
        triggerMove(400);
      }
      lastY = currentY;
    };

    const handleWheel = () => triggerMove(400);
    const handleTouchMove = () => triggerMove(400);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const unsubscribeX = smoothTruckX.on("change", () => {
      const velocity = Math.abs(smoothTruckX.getVelocity());
      if (velocity > 0.01) {
        triggerMove(400);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove, { passive: true } as any);
      unsubscribeX();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };
  }, [smoothTruckX]);

  const roadScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-1008px", "0px", "0px"],
  );
  const curbScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-192px", "0px", "0px"],
  );

  const sign1ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-300px", "70vw", "70vw"],
  );
  const sign2ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-300px", "20vw", "20vw"],
  );
  const sign3ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["100vw", "45vw", "45vw"],
  );
  const sign4ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["100vw", "85vw", "85vw"],
  );

  const truckX = smoothTruckX;
  const truckOpacity = certTruckOpacity;

  const [pointerEvents, setPointerEvents] = React.useState<"auto" | "none">(
    "auto",
  );
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const lastDrawnFrameRef = React.useRef<number>(1);
  const targetFrameRef = React.useRef<number>(1);
  const rafIdRef = React.useRef<number | null>(null);
  const imagesMapRef = React.useRef<Map<number, HTMLImageElement>>(new Map());

  const TOTAL_HERO_FRAMES = 563;

  // Draw the best available frame for the given target
  const drawCanvas = React.useCallback((targetFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    }) as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const totalFrames = TOTAL_HERO_FRAMES;
    const safeTarget = Math.max(1, Math.min(totalFrames, Math.round(targetFrame)));
    const map = imagesMapRef.current;

    // Helper to safely retrieve cached frame from global LRU cache
    const getGlobalFrame = (src: string): HTMLImageElement | null => {
      if (typeof window === "undefined") return null;
      const store = (window as any).__HERO_FRAMES__;
      if (!store) return null;
      if (typeof store.get === "function") return store.get(src) || null;
      return store[src] || null;
    };

    // Helper to check if an image is completely loaded and ready to draw
    const getReadyImg = (num: number): HTMLImageElement | null => {
      let img = map.get(num);
      if (!img && typeof window !== "undefined") {
        const frameStr = String(num).padStart(5, "0");
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

    // 2. If target frame isn't loaded yet, find the CLOSEST loaded frame in memory to safeTarget
    // This ensures smooth responsive scrubbing without EVER getting stuck on an early frame
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

    const imgWidth = imgToDraw.naturalWidth || 1920;
    const imgHeight = imgToDraw.naturalHeight || 1080;

    const hRatio = canvas.width / imgWidth;
    const vRatio = canvas.height / imgHeight;
    const ratio = Math.max(hRatio, vRatio);
    const shiftX = (canvas.width - imgWidth * ratio) / 2;
    const shiftY = (canvas.height - imgHeight * ratio) / 2;

    ctx.drawImage(
      imgToDraw,
      0,
      0,
      imgWidth,
      imgHeight,
      shiftX,
      shiftY,
      imgWidth * ratio,
      imgHeight * ratio,
    );
    lastDrawnFrameRef.current = frameUsed;
  }, []);

  // Coalesced 60FPS RAF-based Canvas Drawing
  const scheduleRender = React.useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      drawCanvas(targetFrameRef.current);
    });
  }, [drawCanvas]);

  // Synchronous / on-demand frame loader linked to global LRU cache
  const loadFrame = React.useCallback((frameNum: number): HTMLImageElement | null => {
    if (frameNum < 1 || frameNum > TOTAL_HERO_FRAMES) return null;
    const map = imagesMapRef.current;

    // Prune distant frames when local map exceeds 150 items to keep memory lean
    if (map.size > 150) {
      const currentTarget = targetFrameRef.current;
      map.forEach((_, key) => {
        if (Math.abs(key - currentTarget) > 75) {
          map.delete(key);
        }
      });
    }

    let img = map.get(frameNum);
    if (img) {
      if (!img.complete) {
        img.addEventListener("load", () => {
          const currentDiff = Math.abs(targetFrameRef.current - lastDrawnFrameRef.current);
          const newDiff = Math.abs(targetFrameRef.current - frameNum);
          if (newDiff <= currentDiff || Math.abs(targetFrameRef.current - frameNum) <= 4) {
            scheduleRender();
          }
        }, { once: true });
      }
      return img;
    }

    const frameStr = String(frameNum).padStart(5, "0");
    const src = `/Home/Hero/video-frames-opt/${frameStr}.jpg`;

    // 1. Check global preloader LRU cache
    if (typeof window !== "undefined") {
      const store = (window as any).__HERO_FRAMES__;
      const globalImg = store
        ? typeof store.get === "function"
          ? store.get(src)
          : store[src]
        : null;

      if (globalImg) {
        map.set(frameNum, globalImg);
        if (globalImg.complete && globalImg.naturalWidth > 0) {
          return globalImg;
        }
        globalImg.addEventListener("load", () => {
          const currentDiff = Math.abs(targetFrameRef.current - lastDrawnFrameRef.current);
          const newDiff = Math.abs(targetFrameRef.current - frameNum);
          if (newDiff <= currentDiff || Math.abs(targetFrameRef.current - frameNum) <= 4) {
            scheduleRender();
          }
        }, { once: true });
        return globalImg;
      }
    }

    // 2. Instantiate new Image
    img = new window.Image();
    map.set(frameNum, img);
    if (typeof window !== "undefined") {
      const store = (window as any).__HERO_FRAMES__;
      if (store && typeof store.set === "function") {
        store.set(src, img);
      } else {
        (window as any).__HERO_FRAMES__ = (window as any).__HERO_FRAMES__ || {};
        (window as any).__HERO_FRAMES__[src] = img;
      }
    }

    const onImageLoaded = () => {
      const currentDiff = Math.abs(targetFrameRef.current - lastDrawnFrameRef.current);
      const newDiff = Math.abs(targetFrameRef.current - frameNum);
      if (newDiff <= currentDiff || Math.abs(targetFrameRef.current - frameNum) <= 4) {
        scheduleRender();
      }
    };

    img.addEventListener("load", onImageLoaded, { once: true });
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      onImageLoaded();
    }

    return img;
  }, [scheduleRender]);

  // Guaranteed Canvas Render Engine with Adaptive Mobile Density & On-Demand Prioritization
  const renderFrame = React.useCallback((targetFrame: number) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    let safeTarget = Math.max(1, Math.min(TOTAL_HERO_FRAMES, Math.round(targetFrame)));
    
    // On mobile, step by 2 (~280 frames) for silky 30FPS motion with 50% data savings
    if (isMobile && safeTarget > 1 && safeTarget < TOTAL_HERO_FRAMES) {
      safeTarget = Math.round(safeTarget / 2) * 2;
    }
    
    targetFrameRef.current = safeTarget;

    // Immediately load target frame and adaptive lookahead buffer
    loadFrame(safeTarget);
    const lookaheadStep = isMobile ? 2 : 1;
    const lookaheadCount = isMobile ? 4 : 8;
    for (let i = 1; i <= lookaheadCount; i++) {
      const offset = i * lookaheadStep;
      if (safeTarget + offset <= TOTAL_HERO_FRAMES) loadFrame(safeTarget + offset);
      if (safeTarget - offset >= 1) loadFrame(safeTarget - offset);
    }

    scheduleRender();
  }, [loadFrame, scheduleRender]);

  // Two-tier background frame preloader:
  // Tier 1: Keyframe milestones across the whole sequence (every 10th frame) -> scrubs immediately across entire video
  // Tier 2: Fill in remaining intermediate frames progressively (stepping by 2 on mobile)
  React.useEffect(() => {
    const totalFrames = TOTAL_HERO_FRAMES;
    let isCancelled = false;
    let batchTimer: NodeJS.Timeout | null = null;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // 1. Load Frame 1 immediately
    const firstImg = loadFrame(1);
    if (firstImg && firstImg.complete) {
      renderFrame(1);
    } else if (firstImg) {
      firstImg.onload = () => {
        if (!isCancelled) renderFrame(1);
      };
    }

    // 2. Tier 1: Preload milestones every 10 frames (10, 20, 30... 560, 563)
    const milestones: number[] = [];
    for (let i = 10; i <= totalFrames; i += 10) {
      milestones.push(i);
    }
    if (totalFrames % 10 !== 0) milestones.push(totalFrames);

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
          // Tier 2: Fill in remaining intermediate frames (step by 2 on mobile to save 50% data)
          const frameStep = isMobile ? 2 : 1;
          let currentFrame = 2;
          const processRemaining = () => {
            if (isCancelled || currentFrame > totalFrames) return;
            const batchEnd = Math.min(totalFrames, currentFrame + (isMobile ? 16 : 12));
            for (let f = currentFrame; f <= batchEnd; f += frameStep) {
              if (f % 10 !== 0) loadFrame(f);
            }
            currentFrame = batchEnd + frameStep;
            if (currentFrame <= totalFrames) {
              batchTimer = setTimeout(processRemaining, 50);
            }
          };
          batchTimer = setTimeout(processRemaining, 60);
        }
      };

      batchTimer = setTimeout(processMilestones, 50);
    }, 100);

    const t1 = setTimeout(() => {
      if (!isCancelled) window.dispatchEvent(new Event("resize"));
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
  }, [loadFrame, renderFrame]);

  // Connect scroll progress directly to canvas drawing (60FPS without React re-renders)
  // Reaches the final frame at 0.88 scroll progress and holds it until 1.0 (providing a hold/rest stop before release)
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalFrames = TOTAL_HERO_FRAMES;
    const holdThreshold = 0.88;
    const normalizedProgress = Math.min(1, latest / holdThreshold);
    const frame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(normalizedProgress * totalFrames)),
    );
    renderFrame(frame);

    if (latest > 0.4) {
      setPointerEvents("none");
    } else {
      setPointerEvents("auto");
    }
  });

  // Handle window resize and initial canvas paint
  React.useEffect(() => {
    const totalFrames = TOTAL_HERO_FRAMES;
    const holdThreshold = 0.88;
    const currentProgress = smoothProgress.get() ?? scrollYProgress.get() ?? 0;
    const normalizedProgress = Math.min(1, currentProgress / holdThreshold);
    const initialFrame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(normalizedProgress * totalFrames)),
    );
    renderFrame(initialFrame);

    const handleResize = () => {
      drawCanvas(targetFrameRef.current);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [renderFrame, drawCanvas, smoothProgress, scrollYProgress]);

  const heroContentOpacity = useTransform(smoothProgress, [0.75, 0.88], [1, 0]);
  const heroContentY = useTransform(smoothProgress, [0.75, 0.88], [0, -30]);

  const storySteps = [
    {
      title: "RESPONSIBLE BEGINNINGS",
      desc: "We source from trusted farms that follow responsible farming practices.",
      icon: "/Home/brand-story/brand-story-icons/responsible-beginnings.svg",
      image: "/Home/brand-story/images/responsible-beginnings.webp",
    },
    {
      title: "HEALTHY LIVESTOCK",
      desc: "Healthy livestock is the foundation of fresh, quality meat products.",
      icon: "/Home/brand-story/brand-story-icons/healthy-livestock.svg",
      image: "/Home/brand-story/images/healthy-livestock.webp",
    },
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Every product is processed using modern technology and strict hygiene standards.",
      icon: "/Home/brand-story/brand-story-icons/scientific-processing.svg",
      image: "/Home/brand-story/images/scientific-processing.webp",
    },
    {
      title: "QUALITY WITHOUT COMPROMISE",
      desc: "Every batch is carefully checked to ensure safety, freshness, and quality.",
      icon: "/Home/brand-story/brand-story-icons/quality-without-compromise.svg",
      image: "/Home/brand-story/images/quality-without-compromise.webp",
    },
    {
      title: "HYGIENIC PACKAGING",
      desc: "Products are packed in clean, safe conditions to lock in freshness.",
      icon: "/Home/brand-story/brand-story-icons/hygienic-packaging.svg",
      image: "/Home/brand-story/images/hygienic-packaging.webp",
    },
    {
      title: "DELIVERED WITH TRUST",
      desc: "Our cold-chain delivery keeps every product fresh from our facility to your doorstep.",
      icon: "/Home/brand-story/brand-story-icons/delivered-with-trust.svg",
      image: "/Home/brand-story/images/delivered-with-trust.webp",
    },
  ];

  const certificates = [
    {
      name: "FSSAI",
      sub: "CERTIFIED",
      desc: "Food Safety and Standards Authority of India Certified.",
      icon: "/Home/certifications/fssai-icon-image.webp",
      certificateImage: "/Home/certifications/fssai.webp",
      pdf: "/Home/certifications/certificates/FSSAI Central License (New)-2025-30 (1).pdf",
    },
    {
      name: "ISO",
      sub: "CERTIFIED",
      desc: "International Organization for Standardization.",
      icon: "/Home/certifications/iso-icon-image.webp",
      certificateImage: "/Home/certifications/iso-certificate-image.webp",
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Hazard Analysis and Critical Control Points Compliant.",
      icon: "/Home/certifications/haccp-icon-image.webp",
      certificateImage: "/Home/certifications/haccp-certificate-image.webp",
    },
    {
      name: "HALAL",
      sub: "CERTIFIED",
      desc: "Halal Certified Process and Product Assurance.",
      icon: "/Home/certifications/halal-icon-image.webp",
      certificateImage: "/Home/certifications/halal-certificate-image.webp",
      pdf: "/Home/certifications/certificates/Halal Cerificate 2025-2028.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] overflow-x-clip font-manrope">
      {/* 1. HERO BANNER WITH STICKY SCROLL SEQUENCE */}
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
            {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" /> */}
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
                  <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[5.5vw] font-bold tracking-wide uppercase leading-[0.92] space-y-1.5">
                    <span className="block text-[#F48207] normal-case">MEATiN</span>
                    <span className="block text-white">PURE QUALITY.</span>
                    <span
                      className="block"
                      style={{
                        filter: "drop-shadow(0px 8px 2.7px rgba(0, 0, 0, 0.95))",
                      }}
                    >
                      <span
                        className="block"
                        style={{
                          background: "linear-gradient(180deg, #BADE78 39.9%, #89CE34 59.13%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        TRUSTED MEAT.
                      </span>
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-white/90 text-sm sm:text-base lg:text-base xl:text-xl font-medium leading-relaxed font-inter max-w-xl">
                    South India&apos;s{" "} Multi Species{" "} <br/>
                    <span className="text-[#8DC541] font-bold">Meat</span>{" "}
                    Processing Plant
                  </p>
                </motion.div>
              </div>

              {/* Right stamp overlay badge */}
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

      {/* 2. SECOND SECTION (MEATiN COLD CHAIN LOGISTICS TRUCK) */}
      <section
        ref={section2Ref}
        className="relative w-full bg-[#EBF6E4] pt-12 pb-24 sm:pt-16 sm:pb-28 md:pt-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat min-h-[300px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px]"
        style={{
          backgroundImage: "url('/Home/truck-section/truck-section-bg.webp')",
        }}
      >
        {/* Animated Truck Assembly Moving Right-To-Left as User Scrolls Down */}
        <div className="w-full max-w-[95%] px-4 sm:px-8 relative z-10 flex justify-start items-center my-auto">
          <motion.div
            style={{ x: smoothTruckX, opacity: smoothTruckOpacity }}
            className="relative w-full aspect-[4096/1339] max-w-[294px] sm:max-w-[357px] md:max-w-[420px] lg:max-w-[750px] min-[1375px]:max-w-[835px] min-[1531px]:max-w-[900px]"
          >
            {/* Ground Soft Shadow */}
            <div className="absolute -bottom-[4%] left-[4%] right-[4%] h-[12%] bg-black/20 blur-lg rounded-full z-0" />

            {/* Cold Chain Logistics Truck SVG with Dynamic Wheel Speed */}
            <motion.div
              animate={{ y: [-1.5, 1.5, -1.5] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            >
              <TruckSvg isMoving={isTruckMoving} />
            </motion.div>

            
          </motion.div>
        </div>

        {/* Wave SVG transition divider matching the Brand Story top color */}
        <div className="absolute bottom-0 left-0 right-0 h-[35px] sm:h-[55px] md:h-[90px] w-full z-20 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-[35px] sm:h-[55px] md:h-[90px]"
            viewBox="0 0 1920 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="truckBottomWaveGradient"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="#67BE47" />
                <stop offset="39.42%" stopColor="#094824" />
                <stop offset="100%" stopColor="#094824" />
              </radialGradient>
            </defs>
            <path
              d="M0 0C755.182 107.73 1158.5 130.5 1920 0V130.5H0V0Z"
              fill="url(#truckBottomWaveGradient)"
            />
          </svg>
        </div>
      </section>

      {/* 3. BRAND STORY / TIMELINE SECTION */}
      <section
        className="relative w-full pt-6 pb-6 lg:pt-8 lg:pb-8 2xl:pt-10 2xl:pb-10 text-white overflow-hidden"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(103, 190, 71, 0.68) 0%, #094824 100%)",
        }}
      >
        {/* Absolute Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
          <Image
            src="/Home/section-bg.webp"
            alt="Background pattern"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="w-full max-w-[1400px] lg:max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 pt-2 lg:pt-2 2xl:pt-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-3 lg:mb-6 xl:mb-6 2xl:mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#CF9A16] font-manrope">
                BRAND STORY
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-[3.5vw] font-semibold tracking-tight leading-none mb-2">
              More Than Meat. 
              <span className="text-[#8DC541]"> It&apos;s{" "} Our Promise.</span> 
            </h2>
            <p className="text-[#F6F5F0]/90 text-xs sm:text-sm xl:text-sm 2xl:text-base max-w-2xl mx-auto font-manrope font-semibold leading-relaxed">
              From farm to fork, every step we take is guided by science, driven
              by care and delivered with trust.
            </p>
          </motion.div>

          {/* Timeline Cards Grid with Alternating Staggered Heights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-3 2xl:gap-4 items-stretch pt-4 xl:pt-4 2xl:pt-6 pb-2"
          >
            {storySteps.map((step, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-[18px] 2xl:rounded-[20px] border border-white/80 shadow-lg hover:shadow-2xl flex flex-col justify-between h-max overflow-hidden group min-h-[270px] xl:min-h-[270px] 2xl:min-h-[335px] relative ${idx % 2 === 0 ? 'xl:-mt-4 2xl:-mt-8' : 'xl:mt-4 2xl:mt-8'}`}
                >
                  {/* Top Image Frame (with icon and title inside) */}
                  <div className="relative w-full h-[210px] xl:h-[210px] 2xl:h-[265px] overflow-hidden flex flex-col justify-end pb-3.5 2xl:pb-4 items-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Bottom gradient fade to white */}
                    <div className="absolute -bottom-1 left-0 right-0 h-[88px] xl:h-[88px] 2xl:h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    {/* Icon */}
                    <div className="relative z-20 w-10 h-10 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 drop-shadow-md mb-2">
                      <Image
                        src={step.icon}
                        alt={`${step.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h4 className="relative z-20 text-[#064823] font-extrabold text-[0.82rem] xl:text-[0.82rem] 2xl:text-[1.05rem] tracking-wide uppercase font-manrope leading-[1.3] text-center px-1.5 max-w-[95%]">
                      {step.title}
                    </h4>
                  </div>

                  {/* Bottom Text Panel */}
                  <div className="bg-white pb-3.5 xl:pb-3.5 2xl:pb-6 px-3 flex-1 flex flex-col items-center justify-start text-center relative z-20 -mt-px">
                    <p className="text-[#3A3A3A] text-[0.72rem] xl:text-[0.72rem] 2xl:text-[0.83rem] font-semibold leading-snug font-manrope max-w-[170px] 2xl:max-w-[195px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. CERTIFIED EXCELLENCE SECTION */}
      <section ref={certSectionRef} className="relative w-full pt-10 pb-4 lg:pt-12 lg:pb-6 overflow-hidden">
        {/* Section Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#DCDBDB]">
          <Image
            src="/Home/gray-bg-image.webp"
            alt="Section background"
            fill
            className="object-cover opacity-[0.8]"
            priority
          />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-5">
          {/* Creative vertical green truck graphics on left side gutter */}
          <motion.div
            style={{ y: truckY, opacity: truckOpacity }}
            className="absolute left-0 sm:left-1 lg:left-1 xl:left-2 2xl:left-[-40px] [@media(min-width:1800px)]:left-[-75px] top-2 lg:top-6 w-28 sm:w-30 lg:w-[130px] xl:w-[145px] 2xl:w-44 aspect-[1/2.35] hidden lg:block pointer-events-none z-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="/Home/certifications/truck-image-certificates.webp"
                alt="Logistic transport graphic"
                fill
                className="object-contain object-top"
              />
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-14 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#CF9A16] font-manrope">
                OUR PROMISE
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-[4vw] font-semibold tracking-normal leading-none mb-4">
              <span className="text-[#064823]">Certified</span>{" "}
              <span className="text-[#F7840F]">Excellence</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto font-manrope font-semibold leading-relaxed">
              Our commitment to international food safety and quality standards.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#D4A437]" />
              <span className="w-2 h-2 rounded-full bg-[#D4A437]" />
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#D4A437]" />
            </div>
          </motion.div>

          {/* Grid of certifications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-y-16 md:gap-y-12 gap-x-6 lg:gap-x-6 xl:gap-x-6 2xl:gap-x-8 lg:pl-24 xl:pl-28 2xl:pl-24 [@media(min-width:1800px)]:pl-20 items-stretch"
          >
            {certificates.map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.035)] px-3.5 py-4 pt-12 flex flex-col justify-between items-center text-center relative hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:border-[#064823]/20 transition-all duration-300 ease-out min-h-[380px] certificate-parent-card"
                >
                  {/* Top Circle logo overlay badge */}
                  <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center p-2 shadow-lg shadow-slate-200/60 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.icon}
                        alt={`${cert.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Header Content */}
                  <div className="flex flex-col items-center w-full">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#064823] font-barlow tracking-wide uppercase leading-none mb-1">{cert.name}</h4>
                    <span className="inline-block bg-[#8DC541] text-white px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-2 leading-none">
                      {cert.sub}
                    </span>
                    <p className="text-[11px] text-slate-500 font-bold sm:max-w-none  mb-2 leading-normal flex items-center justify-center min-h-[32px]">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Certificate Image Frame */}
                  <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden mb-2.5 h-[160px]">
                    <Image
                      src={cert.certificateImage}
                      alt={`${cert.name} Certificate`}
                      fill
                      className="object-contain blur-[2px] hover:blur-[0px] group-hover:blur-[0px]"
                    />
                  </div>

                  {/* Action Buttons Stack (One Below The Other) */}
                  <div className="flex flex-col gap-1.5 w-full mt-1">
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          window.open(cert.pdf, "_blank");
                        } else {
                          alert(
                            `${cert.name} certificate PDF is currently unavailable and will be updated soon.`,
                          );
                        }
                      }}
                      className="bg-[#064823] hover:bg-[#0a5e30] text-white text-[11px] font-extrabold h-9 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm w-full whitespace-nowrap cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#D4A437] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>VIEW CERTIFICATE</span>
                    </button>
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          const link = document.createElement("a");
                          link.href = cert.pdf;
                          link.download =
                            cert.pdf.split("/").pop() || "certificate.pdf";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert(
                            `${cert.name} certificate PDF is currently unavailable and will be updated soon.`,
                          );
                        }
                      }}
                      className="bg-white hover:bg-slate-50 border border-[#064823] text-[#064823] text-[11px] font-extrabold h-9 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 hover:shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm w-full whitespace-nowrap cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#064823] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>DOWNLOAD PDF</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 4. TRUST BANNER (Combined seamlessly inside same section) */}
        <TrustedQualityBanner className="pt-4 lg:pt-6 pb-2 lg:pb-4" />
      </section>
    </div>
  );
}
