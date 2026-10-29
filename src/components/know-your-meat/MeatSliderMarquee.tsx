"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface MeatSliderItem {
  name: string;
  img: string;
  alt?: string;
}

export interface MeatSliderMarqueeProps {
  items?: MeatSliderItem[];
  bgImage?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  heightClass?: string;
  showLabels?: boolean;
}

const DEFAULT_ITEMS: MeatSliderItem[] = [
  { name: "Fresh Breast", img: "/Product/slider-images/breast.webp" },
  { name: "Juicy Wings", img: "/Product/slider-images/wings.webp" },
  { name: "Tender Drumette", img: "/Product/slider-images/drumette.webp" },
  { name: "Fresh Leg", img: "/Product/slider-images/leg-left.webp" },
  { name: "Rich Neck Cut", img: "/Product/slider-images/neck.webp" },
  { name: "Prime Leg", img: "/Product/slider-images/leg-right.webp" },
];

export default function MeatSliderMarquee({
  items = DEFAULT_ITEMS,
  bgImage = "/Product/slider-images/slider-bg.webp",
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
  heightClass = "h-24 sm:h-32 md:h-36 lg:h-40",
  showLabels = false,
}: MeatSliderMarqueeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Duplicate items so loop is seamless
  const repeatedItems = [...items, ...items, ...items, ...items];

  const animationDirectionClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={`group relative w-full overflow-hidden select-none shadow-md bg-slate-200 ${className}`}
    >
      {/* ===================== SINGLE ANIMATED TRACK =====================
          Both belt + chickens live inside this one animated flex row.
          Because they share the container, they translate together
          perfectly — no separate keyframes, no sync math. */}
      <div
        className={`relative flex items-center w-full ${heightClass} ${animationDirectionClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* ---------- BELT LAYER (absolute, behind) ---------- */}
        <div className="absolute inset-0 flex items-stretch h-full pointer-events-none">
          {/* Two full copies of the belt image, each rendered at its
              natural aspect ratio (h-full, width auto). Translating
              the parent by -50% loops seamlessly. */}
          {[0, 1].map((copy) => (
            <div
              key={`belt-copy-${copy}`}
              className="relative h-full shrink-0"
              style={{
                // Each copy should be at least as wide as the container,
                // so the strip always covers the viewport. Width:auto
                // preserves the belt image's aspect ratio.
                width: "auto",
                aspectRatio: "auto",
              }}
            >
              <img
                src={bgImage}
                alt=""
                className="h-full w-auto block pointer-events-none select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* ---------- CHICKEN LAYER (foreground) ---------- */}
        <div className="relative z-10 flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-2 px-4">
          {repeatedItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative flex flex-col items-center justify-center shrink-0 cursor-pointer group/item transition-transform duration-300 ease-out hover:scale-110 sm:hover:scale-115"
            >
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.22)] transition-all duration-300">
                <Image
                  src={item.img}
                  alt={item.alt || item.name}
                  fill
                  sizes="(max-width: 640px) 110px, (max-width: 1024px) 160px, 200px"
                  className="object-contain transform group-hover/item:-translate-y-1.5 transition-transform duration-300"
                />
              </div>

              {(showLabels || hoveredIdx === idx) && (
                <div className="absolute -bottom-2 sm:bottom-1 bg-[#064823]/90 text-white text-[10px] sm:text-xs font-bold font-inter tracking-wider px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap transition-all duration-300 animate-fadeIn pointer-events-none z-30">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top & Bottom rail glow */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent z-20 pointer-events-none" />

      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Move by exactly one chicken-set width, not 50% of parent.
               Set this to match (items.length * (itemWidth + gap)). */
            transform: translateX(calc(-1 * var(--marquee-distance, 100%)));
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(calc(-1 * var(--marquee-distance, 100%)));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marqueeLeft linear infinite;
          will-change: transform;
        }

        .animate-marquee-right {
          animation: marqueeRight linear infinite;
          will-change: transform;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}