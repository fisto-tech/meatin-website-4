'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PRELOAD_ASSETS } from './preloaderAssets';
import { AssetPreloadEngine, startBackgroundAssetPreload } from './preloadEngine';

export const Preloader: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Deep Pre-warm Next.js route bundles and HTML payloads on client router
  useEffect(() => {
    const routesToPrewarm = [
      '/',
      '/about',
      '/know-your-meat',
      '/product',
      '/recipes',
      '/franchise',
      '/team',
      '/vlog',
      '/contact',
    ];

    // 1. Router Prefetch (Next.js JS Chunks)
    routesToPrewarm.forEach((routePath) => {
      try {
        router.prefetch(routePath);
      } catch (e) {
        // Safe fallback
      }
    });

    // 2. Fetch HTML & Server Components payload in background into browser disk cache
    if (typeof window !== 'undefined') {
      routesToPrewarm.forEach((routePath) => {
        try {
          fetch(routePath, { priority: 'high', cache: 'force-cache' }).catch(() => {});
        } catch (e) {}
      });
    }
  }, [router]);

  // Preloader lifecycle logic
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('meatin_preloaded') === 'true') {
      setLoading(false);
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
      // Warm remaining assets in background
      startBackgroundAssetPreload(PRELOAD_ASSETS);
      return;
    }

    setMounted(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('preloader-active');
      document.body.style.overflow = 'hidden';
    }

    let isFinished = false;
    let assetsLoaded = false;
    let windowLoaded = typeof document !== 'undefined' && document.readyState === 'complete';
    const startTime = Date.now();
    const MIN_PRELOAD_MS = 3800; // Guarantee thorough 3.8s preload window for 100% asset caching

    const finishLoading = () => {
      if (isFinished) return;
      
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_PRELOAD_MS) {
        setTimeout(finishLoading, MIN_PRELOAD_MS - elapsed);
        return;
      }

      isFinished = true;
      setProgress(100);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('meatin_preloaded', 'true');
      }

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove('preloader-active');
            document.body.style.overflow = '';
          }
          setLoading(false);
          if (typeof window !== 'undefined') {
            if ((window as any).lenis) {
              (window as any).lenis.resize();
            }
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          }
          // Continue background preloading for 100% asset pool
          startBackgroundAssetPreload(PRELOAD_ASSETS);
        }, 500);
      }, 300);
    };

    const checkReady = () => {
      if (assetsLoaded && windowLoaded) {
        finishLoading();
      }
    };

    if (!windowLoaded && typeof window !== 'undefined') {
      const handleWindowLoad = () => {
        windowLoaded = true;
        checkReady();
      };
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    if (typeof window !== 'undefined') {
      // Concurrency 16 to quickly swallow and cache image/route assets
      const engine = new AssetPreloadEngine(PRELOAD_ASSETS, {
        concurrency: 16,
        onProgress: (percent) => {
          setProgress((prev) => Math.max(prev, percent));
          if (percent >= 90) {
            assetsLoaded = true;
            checkReady();
          }
        },
        onComplete: () => {
          assetsLoaded = true;
          finishLoading();
        },
      });

      engine.start();
    }

    // Fixed safety ceiling around 4.8s
    const maxTimeout = setTimeout(() => {
      finishLoading();
    }, 4800);

    return () => {
      clearTimeout(maxTimeout);
      if (typeof document !== 'undefined') {
        document.body.classList.remove('preloader-active');
        document.body.style.overflow = '';
      }
    };
  }, []);

  if (!loading) return null;

  // Circular gauge calculations (circumference for r=70 is ~439.82)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="preloader-root"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F7F4] text-[#1A1A1A] transition-all duration-600 ease-out select-none overflow-hidden"
      style={{
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <style>{`
        body.preloader-active > *:not(#preloader-root) {
          opacity: 0 !important;
        }
        @keyframes mascotRunBounce {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-1deg);
          }
          50% {
            transform: translateY(-7px) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(1deg);
          }
        }
        @keyframes shadowScaleSync {
          0%, 100% {
            transform: scale(1);
            opacity: 0.28;
          }
          50% {
            transform: scale(0.72);
            opacity: 0.12;
          }
        }
        @keyframes shimmerGleam {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        .mascot-animated {
          animation: mascotRunBounce 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .shadow-synced {
          animation: shadowScaleSync 1.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .bar-shimmer {
          animation: shimmerGleam 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .glow-ambient {
          animation: softPulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Warm Ambient Brand Radial Glows */}
      <div className="glow-ambient absolute w-[450px] sm:w-[540px] h-[450px] sm:h-[540px] rounded-full bg-gradient-to-tr from-[#8DC541]/12 via-[#F7840F]/10 to-[#064823]/8 blur-[90px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full px-6 text-center">

        {/* 1. Official MEATiN Brand Logo */}
        <div className="relative w-44 sm:w-48 h-12 sm:h-14 mb-2">
          <Image
            src="/meatin-logo.webp"
            alt="MEATiN Logo"
            fill
            className="object-contain object-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
            priority
          />
        </div>

        {/* 2. Subtitle with Refined Gold Accents */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-7">
          <span className="h-[1px] w-6 bg-[#D4A437]/60" />
          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.24em] text-[#064823]/75 uppercase font-manrope">
            South India&apos;s Multi Species Meat Plant
          </span>
          <span className="h-[1px] w-6 bg-[#D4A437]/60" />
        </div>

        {/* 3. Polished Mascot Stage with Circular Pedestal */}
        <div className="relative flex flex-col items-center justify-center my-1 sm:my-2">
          {/* Circular Pedestal: Clean circular badge */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white border-2 border-[#8DC541]/30 shadow-[0_10px_25px_rgba(6,72,35,0.08)] overflow-hidden flex items-center justify-center">
            {/* Running Mascot */}
            <div className="mascot-animated relative w-32 h-28 sm:w-36 sm:h-32">
              <Image
                src="/preloader-running-clean.gif"
                alt="MEATiN Mascot Running"
                fill
                className="object-contain object-center mix-blend-multiply"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* 4. Sleek Progress Bar & Dynamic Status */}
        <div className="w-full max-w-[270px] sm:max-w-[300px] mt-6 sm:mt-7 flex flex-col items-center gap-2">
          
          {/* Progress Track */}
          <div className="w-full h-2.5 bg-[#E7ECE3] rounded-full overflow-hidden p-[2px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] border border-[#064823]/10 relative">
            <div
              className="h-full bg-gradient-to-r from-[#8DC541] via-[#064823] to-[#F7840F] rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.max(8, progress)}%` }}
            >
              {/* Shimmer Light Beam */}
              <div className="bar-shimmer absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </div>

          {/* Status Label & Percentage Row */}
          <div className="flex items-center justify-between w-full px-1 text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC541] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#064823]/85 uppercase tracking-wider font-manrope">
                {progress < 30
                  ? 'Inspecting Quality'
                  : progress < 65
                  ? 'Cold-Chain Logistics'
                  : progress < 92
                  ? 'Seasoning Freshness'
                  : 'Ready to Serve'}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-black text-[#064823] font-barlow tabular-nums tracking-wider">
              {progress}<span className="text-[10px] font-bold text-[#F7840F] ml-0.5">%</span>
            </span>
          </div>

          {/* Freshness Assurance Pill */}
          <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-[#064823]/[0.05] border border-[#064823]/10">
            <span className="text-[9px] font-semibold text-[#064823]/70 uppercase tracking-widest font-manrope">
              100% Halal & Hygienic
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Preloader;
