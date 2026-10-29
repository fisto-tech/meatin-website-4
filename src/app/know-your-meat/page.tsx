"use client";

// Re-eval HMR compilation
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Icon } from "@iconify/react";
import GoatParts from "../../components/know-your-meat/GoatParts";
import BuffaloParts from "../../components/know-your-meat/BeefParts";
import {
  CHICKEN_PARTS,
  PART_RECIPES_MAP,
  CALLOUTS,
  CATEGORIES,
  PART_GLB_MAP,
} from "@/data/knowYourMeatData";
import EcosystemCircle from "@/components/EcosystemCircle";

const PRODUCTION_PILLARS = [
  {
    icon: "ph:tractor-light",
    line1: "Integrated",
    line2: "farming",
  },
  {
    icon: "vadivam:badge-check",
    line1: "Quality",
    line2: "control",
  },
  {
    icon: "emojione-monotone:snowflake",
    line1: "Storage &",
    line2: "cold chain",
  },
  {
    icon: "lets-icons:shop-light",
    line1: "Wholesale &",
    line2: "retail",
  },
  {
    icon: "hugeicons:hand-heart",
    line1: "Ethical",
    line2: "procurement",
  },
  {
    icon: "mdi-light:truck",
    line1: "Branding &",
    line2: "export",
  },
  {
    icon: "hugeicons:flask-conical",
    line1: "Scientific",
    line2: "slaughtering",
  },
  {
    icon: "hugeicons:package-check",
    line1: "Logistics &",
    line2: "distribution",
  },
];

export default function KnowYourMeatPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const stationaryImgRef = useRef<HTMLImageElement>(null);
  const stationaryPlateRef = useRef<HTMLDivElement>(null);
  const woodPlateContainerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<
    "skin" | "skinless" | "inside"
  >("skin");
  const [activeMeatType, setActiveMeatType] = useState<
    "chicken" | "beef" | "goat"
  >("chicken");
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);
  const [manuallySelectedPartIdx, setManuallySelectedPartIdx] = useState(0);
  const [activeViewTab, setActiveViewTab] = useState<
    "raw" | "platter" | "packed" | "3d"
  >("raw");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLandedInSection2, setIsLandedInSection2] = useState(false);
  const [hasSelectedAnyPart, setHasSelectedAnyPart] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [highlightedCategoryIdx, setHighlightedCategoryIdx] = useState(0);
  const [isAutoSwitchStopped, setIsAutoSwitchStopped] = useState(false);
  const [isOrbitHovered, setIsOrbitHovered] = useState(false);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const registerUserInteraction = () => {
    setIsAutoSwitchStopped(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    // Resume auto-play after 5 seconds of inactivity
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsAutoSwitchStopped(false);
      setIsOrbitHovered(false);
    }, 5000);
  };

  // Rotating dashed ring with alternating odd Red (with red shadow) & even Dark Green (with green shadow) dashes
  const renderAlternatingDottedRing = () => {
    const count = 16;
    const radius = 47.5;
    const dashSpan = 13.5;

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none animate-spin z-0 overflow-visible"
        style={{
          animationDuration: "12s",
          animationTimingFunction: "linear",
        }}
        viewBox="0 0 100 100"
      >
        {Array.from({ length: count }, (_, i) => {
          const startAngle = (i * 360) / count;
          const endAngle = startAngle + dashSpan;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = 50 + radius * Math.cos(startRad);
          const y1 = 50 + radius * Math.sin(startRad);
          const x2 = 50 + radius * Math.cos(endRad);
          const y2 = 50 + radius * Math.sin(endRad);

          const isOdd = (i + 1) % 2 === 1;
          const color = isOdd ? "#E31E24" : "#15803D";
          const shadowStyle = isOdd
            ? "drop-shadow(0px 0px 2.5px rgba(227, 30, 36, 0.35))"
            : "drop-shadow(0px 0px 2.5px rgba(21, 128, 61, 0.35))";

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              stroke={color}
              strokeWidth={2.8}
              strokeLinecap="round"
              fill="none"
              style={{ filter: shadowStyle }}
            />
          );
        })}
      </svg>
    );
  };

  // Animated flowing curved arrow with alternating red & dark green dashes entering dead-center into the arrowhead
  const renderAnimatedCurvedArrow = (
    direction: "top-left" | "bottom-left" | "top-right" | "bottom-right",
    isActive: boolean
  ) => {
    let curvePath = "";
    let arrowHead = "";

    if (direction === "top-left") {
      curvePath = "M 2 3 C 60 1, 115 12, 145 44";
      arrowHead = "M 153.2 41.8 L 156.6 56.4 L 142.2 52.0 L 145 44 Z";
    } else if (direction === "bottom-left") {
      curvePath = "M 2 61 C 60 63, 115 52, 145 20";
      arrowHead = "M 142.2 12.0 L 156.6 7.6 L 153.2 22.2 L 145 20 Z";
    } else if (direction === "top-right") {
      curvePath = "M 163 3 C 105 1, 50 12, 20 44";
      arrowHead = "M 11.8 41.8 L 8.4 56.4 L 22.8 52.0 L 20 44 Z";
    } else {
      // bottom-right
      curvePath = "M 163 61 C 105 63, 50 52, 20 20";
      arrowHead = "M 22.8 12.0 L 8.4 7.6 L 11.8 22.2 L 20 20 Z";
    }

    if (!isActive) {
      return (
        <svg
          width="165"
          height="65"
          viewBox="0 0 165 65"
          fill="none"
          className="w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        >
          <path
            d={curvePath}
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d={arrowHead} fill="#000000" />
        </svg>
      );
    }

    return (
      <svg
        width="165"
        height="65"
        viewBox="0 0 165 65"
        fill="none"
        className="w-full h-auto overflow-visible"
      >
        <style>{`
          @keyframes arrowFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -24; }
          }
        `}</style>
        {/* Red Dashes - Bolder weight */}
        <path
          d={curvePath}
          stroke="#E31E24"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeLinecap="round"
          style={{
            animation: "arrowFlow 1.3s linear infinite",
            filter: "drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.4))",
          }}
        />
        {/* Dark Green Dashes - Bolder weight */}
        <path
          d={curvePath}
          stroke="#15803D"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeDashoffset="12"
          strokeLinecap="round"
          style={{
            animation: "arrowFlow 1.3s linear infinite",
            filter: "drop-shadow(0px 0px 3px rgba(21, 128, 61, 0.4))",
          }}
        />
        {/* Sharp Seamless Arrowhead */}
        <path
          d={arrowHead}
          fill="#E31E24"
          style={{
            filter: "drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.45))",
          }}
        />
      </svg>
    );
  };

  useEffect(() => {
    const categoryTimer = setInterval(() => {
      setHighlightedCategoryIdx((prev) => (prev + 1) % 6);
    }, 1600);
    return () => clearInterval(categoryTimer);
  }, []);

  // Auto-switch through the 4 Section 2 view tabs every 3.5s unless hovered or clicked
  useEffect(() => {
    if (isAutoSwitchStopped || isOrbitHovered || !hasSelectedAnyPart) return;

    const tabs: ("raw" | "packed" | "platter" | "3d")[] = [
      "raw",
      "packed",
      "platter",
      "3d",
    ];
    const autoTimer = setInterval(() => {
      setActiveViewTab((prev) => {
        const idx = tabs.indexOf(prev);
        const nextIdx = (idx + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 3500);

    return () => clearInterval(autoTimer);
  }, [isAutoSwitchStopped, isOrbitHovered, hasSelectedAnyPart]);

  // GLB Model paths for 360 viewer (imported from @/data/knowYourMeatData)
  const partGlbMap = PART_GLB_MAP;

  // Lazily inject Google <model-viewer> web component ONLY when 3D mode is viewed
  useEffect(() => {
    if (activeViewTab === "3d" && typeof window !== "undefined") {
      if (!document.querySelector('script[src*="model-viewer"]')) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
        document.body.appendChild(script);
      }
    }
  }, [activeViewTab]);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setScreenSize("mobile");
      else if (w < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMeatTabChange = (type: "chicken" | "beef" | "goat") => {
    setActiveMeatType(type);
    setHasSelectedAnyPart(false);
    setSelectedPartIdx(0);
    setManuallySelectedPartIdx(0);
    setActiveStage("skin");
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.resize();
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "start",
        });
      }
    }
  };

  const selectPartManually = (idx: number) => {
    setSelectedPartIdx(idx);
    setManuallySelectedPartIdx(idx);
    setActiveViewTab("raw");
    setIsLandedInSection2(true);
    setHasSelectedAnyPart(true);
  };

  useEffect(() => {
    if (activeStage !== "inside") {
      const validIndices = [0, 2, 3, 4, 5, 8];
      if (!validIndices.includes(selectedPartIdx)) {
        setSelectedPartIdx(0);
      }
    }
  }, [activeStage]);

  useEffect(() => {
    if (!mounted || hoveredPart !== null) return;

    const interval = setInterval(() => {
      if (activeStage === "inside") {
        setSelectedPartIdx((prev) => (prev + 1) % 10);
      } else {
        const validIndices = [0, 2, 3, 4, 5, 8];
        setSelectedPartIdx((prev) => {
          const currPos = validIndices.indexOf(prev);
          const nextPos =
            currPos === -1 ? 0 : (currPos + 1) % validIndices.length;
          return validIndices[nextPos];
        });
      }
    }, 3500); // 3.5s auto-selection cycle for slow, graceful line drawing

    return () => clearInterval(interval);
  }, [mounted, activeStage, hoveredPart]);

  const [animatingPart, setAnimatingPart] = useState<{
    img: string;
    name: string;
    rotation?: number;
    startRect: { top: number; left: number; width: number; height: number };
    targetRect?: { top: number; left: number; width: number; height: number };
    timestamp: number;
  } | null>(null);
  // Single flying target — direct flight from clicked badge to wood plate
  const [flyTarget, setFlyTarget] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (animatingPart) {
      // Instantly dismiss flying animation if user manually scrolls on desktop or mobile
      const handleUserScroll = () => {
        setIsLandedInSection2(true);
        setAnimatingPart(null);
        setFlyTarget(null);
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.scrollTo(
            window.pageYOffset || document.documentElement.scrollTop,
            { immediate: true },
          );
        }
      };

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > 1 || Math.abs(e.deltaX) > 1) {
          handleUserScroll();
        }
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      };
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          if (Math.abs(e.touches[0].clientY - touchStartY) > 4) {
            handleUserScroll();
          }
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Space",
            "Home",
            "End",
          ].includes(e.code)
        ) {
          handleUserScroll();
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("keydown", handleKeyDown, { passive: true });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [animatingPart?.timestamp]);

  const handlePartClick = (
    e: React.MouseEvent<HTMLElement>,
    item: { name: string; img: string; rotation?: number },
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const normalized = item.name.toLowerCase().trim();
    let partSlug = normalized;
    if (normalized === "brest") partSlug = "breast";
    if (normalized === "bact") partSlug = "back";

    router.push(`/product?part=${encodeURIComponent(partSlug)}`);
  };

  const isPartSelected = (itemName: string) => {
    const normalized = itemName.toLowerCase().trim();
    const currentPartName =
      chickenParts[selectedPartIdx]?.name.toLowerCase().trim() || "";
    if (normalized === "brest" && currentPartName === "breast") return true;
    if (normalized === "bact" && currentPartName === "back") return true;
    return (
      normalized === currentPartName ||
      currentPartName.includes(normalized) ||
      normalized.includes(currentPartName)
    );
  };

  const isPartActive = (itemName: string) => {
    if (hoveredPart !== null) {
      const normHover = hoveredPart.toLowerCase().trim();
      const normItem = itemName.toLowerCase().trim();
      if (normHover === "brest" && normItem === "breast") return true;
      if (normItem === "brest" && normHover === "breast") return true;
      if (normHover === "bact" && normItem === "back") return true;
      if (normItem === "bact" && normHover === "back") return true;
      return (
        normHover === normItem ||
        normHover.includes(normItem) ||
        normItem.includes(normHover)
      );
    }
    return isPartSelected(itemName);
  };

  const isPartHovered = (itemName: string) => {
    if (hoveredPart === null || activeStage !== "inside") return false;
    const normHover = hoveredPart.toLowerCase().trim();
    const normItem = itemName.toLowerCase().trim();
    if (normHover === "brest" && normItem === "breast") return true;
    if (normItem === "brest" && normHover === "breast") return true;
    if (normHover === "bact" && normItem === "back") return true;
    if (normItem === "bact" && normHover === "back") return true;
    return (
      normHover === normItem ||
      normHover.includes(normItem) ||
      normItem.includes(normHover)
    );
  };

  const chickenParts = CHICKEN_PARTS;

  const getPlateStyleForPart = (idx: number) => {
    const part = chickenParts[idx];
    const custom = (part as any)?.plateStyle;
    const fallback = {
      mobile: { width: "68%", height: "76%", marginTop: "-12%" },
      tablet: { width: "44%", height: "62%", marginTop: "-10%" },
      desktop: { width: "42%", height: "62%", marginTop: "-10%" },
    };

    if (!mounted) {
      return custom?.desktop || fallback.desktop;
    }

    if (screenSize === "mobile") {
      return custom?.mobile || fallback.mobile;
    } else if (screenSize === "tablet") {
      return custom?.tablet || fallback.tablet;
    } else {
      return custom?.desktop || fallback.desktop;
    }
  };

  const partRecipesMap = PART_RECIPES_MAP;

  // Track page scroll inside the interactive visualizer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate clip path values for the scroll-peel layers
  // Layer 3 (Skin): Peels off from scroll progress 0.05 to 0.40
  const skinProgress = useTransform(scrollYProgress, [0.05, 0.4], [120, -20]);
  const skinClipPath = useTransform(
    skinProgress,
    (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`,
  );

  // Layer 2 (Skinless Meat): Peels off from scroll progress 0.42 to 0.70 to reveal the inside
  const meatProgress = useTransform(scrollYProgress, [0.42, 0.7], [120, -20]);
  const meatClipPath = useTransform(
    meatProgress,
    (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`,
  );

  // Ensure activeStage is reset to "skin" and scroll is at top whenever returning to chicken tab
  useEffect(() => {
    if (activeMeatType === "chicken") {
      setActiveStage("skin");
    }
  }, [activeMeatType]);

  // Update active stage and titles based on scroll progress (only for chicken)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (activeMeatType !== "chicken") return;
    if (latest <= 0.35) {
      setActiveStage("skin");
    } else if (latest > 0.35 && latest < 0.58) {
      setActiveStage("skinless");
    } else {
      setActiveStage("inside");
    }
  });

  // Main Header Text Config based on scroll phase
  const headerTitle = {
    skin: { main: "WITH SKIN", sub: "CHICKEN", isWhite: false },
    skinless: { main: "WITHOUT SKIN", sub: "CHICKEN", isWhite: false },
    inside: { main: "WHOLE CHICKEN", sub: "CHICKEN", isWhite: true },
  };

  // Callouts data from imported constants
  const callouts = CALLOUTS;

  // Categories from imported constants
  const categories = CATEGORIES;

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7] relative font-manrope selection:bg-black/10 selection:text-slate-900">
      {/* Background Doodle Repeat Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.6] bg-repeat"
        style={{
          backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
          backgroundSize: "800px",
        }}
      />

      {/* Interactive Visualizer Container */}
      <style>{`
        @media (max-height: 750px) {
          .viz-sticky-wrap {
            padding-top: 88px !important;
            padding-bottom: 4px !important;
          }
          .viz-beef-img-wrap {
            height: 350px !important;
            max-height: 48vh !important;
            transform: translateY(-55px) !important;
          }
          .viz-grid-wrap {
            margin-top: 0px !important;
            max-width: 1200px !important;
          }
          .viz-center-col {
            height: 380px !important;
          }
          .viz-chicken-box {
            width: 330px !important;
            height: 330px !important;
          }
          .viz-card-circle {
            width: 68px !important;
            height: 68px !important;
            padding: 4px !important;
          }
          .viz-card-badge {
            width: 18px !important;
            height: 18px !important;
            font-size: 11px !important;
          }
          .viz-card-desc-wrap {
            height: 72px !important;
            margin-left: -20px !important;
          }
          .viz-card-pill {
            min-width: 120px !important;
            padding: 3px 20px 3px 26px !important;
          }
          .viz-card-pill-text {
            font-size: 13.5px !important;
          }
          .viz-card-desc-text {
            font-size: 10.5px !important;
            max-width: 155px !important;
            padding-left: 26px !important;
          }
          .viz-inside-list {
            gap: 11px !important;
          }
          .viz-gizzard-pos {
            bottom: -58px !important;
          }
          .selected-part .viz-card-pill {
            padding-left: 36px !important;
          }
          .selected-part .viz-card-desc-text {
            padding-left: 36px !important;
          }
          .viz-switcher-container {
            top: 8px !important;
            height: 32px !important;
            font-size: 11px !important;
          }
          .viz-switcher-btn {
            padding-left: 14px !important;
            padding-right: 14px !important;
            font-size: 11px !important;
          }
          .viz-switcher-btn div {
            width: 10px !important;
            height: 10px !important;
            bottom: -5px !important;
          }
          .viz-title-sub {
            font-size: 18px !important;
          }
          .viz-title-sub span {
            font-size: 18px !important;
          }
          .viz-title-sub img {
            width: 26px !important;
            height: 26px !important;
          }
          .viz-title-main {
            font-size: 36px !important;
          }
          .viz-title-tagline {
            font-size: 14px !important;
          }
          /* Section 2 details responsive overrides for height breakpoints */
          /* Section 2 details responsive width offsets */
          @media (min-width: 768px) and (max-width: 1023px) {
            .detail-showcase-box {
              margin-left: 0px !important;
            }
            .detail-carousel-bar {
              margin-left: 0px !important;
            }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            .detail-showcase-box {
              margin-left: -12px !important;
            }
            .detail-carousel-bar {
              margin-left: -12px !important;
            }
          }
          @media (min-width: 1280px) and (max-width: 1535px) {
            .detail-showcase-box {
              margin-left: -28px !important;
            }
            .detail-carousel-bar {
              margin-left: -32px !important;
            }
          }
          @media (min-width: 1536px) {
            .detail-showcase-box {
              margin-left: -48px !important;
            }
            .detail-carousel-bar {
              margin-left: -64px !important;
            }
          }

          /* 70% / 30% Split for Details Section Left Column */
          @media (min-width: 768px) {
            .detail-left-col {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              padding-top: 0px !important;
              padding-bottom: 0px !important;
              gap: 0px !important;
            }
            .detail-top-70 {
              height: 70% !important;
              max-height: 70% !important;
              flex: 0 0 70% !important;
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              position: relative !important;
              overflow: visible !important;
            }
            .detail-bottom-30 {
              height: 30% !important;
              max-height: 30% !important;
              flex: 0 0 30% !important;
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              position: relative !important;
              padding-bottom: 28px !important;
            }
            .detail-top-70 .detail-showcase-box {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .detail-top-70 .detail-showcase-box:not(.is-3d) {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .detail-top-70 .detail-showcase-box:not(.is-3d) img {
              width: 100% !important;
              height: 100% !important;
              max-height: 100% !important;
              max-width: 100% !important;
              object-fit: contain !important;
            }
            .detail-top-70 .detail-showcase-box.is-3d {
              width: 100% !important;
              height: 46vh !important;
              max-width: 100% !important;
              max-height: 48vh !important;
            }
            .detail-right-col {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              align-items: flex-start !important;
              padding-bottom: 2vh !important;
            }
            .detail-carousel-btn {
              width: 106px !important;
            }
            @media (min-width: 1280px) {
              .detail-carousel-btn {
                width: 122px !important;
              }
            }
            @media (min-width: 1536px) {
              .detail-carousel-btn {
                width: 138px !important;
              }
            }
          }

          /* Section 2 details responsive height tiers for medium & laptop viewports */
          /* 3D Model Viewer full space mode */
          .detail-showcase-box.is-3d {
            width: 100% !important;
            max-width: 100% !important;
            height: 48vh !important;
            max-height: 52vh !important;
          }
          @media (min-height: 711px) {
            .detail-showcase-box.is-3d {
              height: 56vh !important;
              max-height: 60vh !important;
            }
          }
          @media (min-height: 800px) {
            .detail-showcase-box.is-3d {
              height: 64vh !important;
              max-height: 70vh !important;
            }
          }

          /* Tier 1: Ultra-compact & short desktop screens (e.g. 1351x607, 1275x575) */
          @media (max-height: 680px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 58px !important;
              padding-bottom: 2px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 2px !important;
              justify-content: center !important;
              gap: 14px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(340px, 44vh) !important;
              height: min(340px, 44vh) !important;
              max-height: 46vh !important;
            }
            .detail-carousel-bar {
              margin-top: 2px !important;
              gap: 4px !important;
            }
            .detail-carousel-btn {
              width: 88px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 2: Compact laptops (height 631px to 710px, e.g. 1305x651, 1519x695) */
          @media (min-height: 631px) and (max-height: 710px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 90px !important;
              padding-bottom: 4px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 4px !important;
              justify-content: center !important;
              gap: 16px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(340px, 46vh) !important;
              height: min(340px, 46vh) !important;
              max-height: 48vh !important;
            }
            .detail-carousel-bar {
              margin-top: 4px !important;
              gap: 6px !important;
            }
            .detail-carousel-btn {
              width: 98px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 3: Medium laptops (height 711px to 790px) */
          @media (min-height: 711px) and (max-height: 790px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 96px !important;
              padding-bottom: 6px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 6px !important;
              justify-content: center !important;
              gap: 20px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(380px, 48vh) !important;
              height: min(380px, 48vh) !important;
              max-height: 50vh !important;
            }
            .detail-carousel-bar {
              margin-top: 6px !important;
            }
            .detail-carousel-btn {
              width: 112px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 4: Standard & tall desktop screens (height >= 791px) */
          @media (min-height: 791px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 88px !important;
              padding-bottom: 12px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(460px, 46vw) !important;
              height: min(460px, 46vw) !important;
              max-width: 44vw !important;
              max-height: 62vh !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          @media (min-width: 1400px) and (min-height: 820px) {
            .detail-showcase-box:not(.is-3d) {
              width: 480px !important;
              height: 480px !important;
              max-width: 44vw !important;
              max-height: 62vh !important;
            }
            .detail-carousel-btn {
              width: 130px !important;
            }
          }

          @media (min-width: 1600px) and (min-height: 860px) {
            .detail-showcase-box:not(.is-3d) {
              width: 500px !important;
              height: 500px !important;
              max-width: 46vw !important;
              max-height: 68vh !important;
            }
            .detail-carousel-btn {
              width: 144px !important;
            }
          }
          /* Section 3 recipes responsive overrides */
          .recipe-section-wrap {
            padding-top: 32px !important;
            padding-bottom: 75px !important;
          }
          .recipe-container-wrap {
            gap: 16px !important;
          }
          .recipe-container-wrap > * + * {
            margin-top: 16px !important;
          }
          .recipe-title-text {
            font-size: 34px !important;
          }
          .recipe-desc-text {
            font-size: 14.5px !important;
            max-width: 400px !important;
          }
          .recipe-grid-wrap {
            gap: 16px !important;
          }
          .recipe-card-box {
            aspect-ratio: 3 / 3.3 !important;
            padding: 14px !important;
          }
          .recipe-card-badge {
            font-size: 10px !important;
            padding: 4px 8px !important;
          }
          .recipe-card-title {
            font-size: 18px !important;
          }
          .recipe-card-desc {
            font-size: 11px !important;
            line-clamp: 1 !important;
            -webkit-line-clamp: 1 !important;
          }
          .recipe-card-spec {
            font-size: 10.5px !important;
            gap: 8px !important;
          }
          .recipe-card-btn {
            font-size: 11px !important;
            padding-top: 6px !important;
            padding-bottom: 6px !important;
          }
          .recipe-bottom-banner {
            margin-top: -25px !important;
          }
        }
        @media (max-width: 767px) {
          /* Section 1 Visualizer Mobile Overrides */
          .viz-sticky-wrap {
            padding-top: 80px !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .viz-title-sub {
            display: none !important;
          }
          .viz-title-main {
            font-size: 38px !important;
            line-height: 1 !important;
          }
          .viz-title-tagline {
            font-size: 12px !important;
            margin-top: 2px !important;
          }
          .viz-switcher-btn {
            padding: 0px 14px !important;
            font-size: 11px !important;
            flex: 1 !important;
          }
          .viz-switcher-btn div {
            display: none !important;
          }
          .viz-title-block {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            margin-top: 12px !important;
            order: 2 !important;
            flex-shrink: 0 !important;
            z-index: 10 !important;
          }
          .viz-switcher-container {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            margin-top: 0px !important;
            justify-content: center !important;
            width: auto !important;
            max-width: none !important;
            height: 36px !important;
            z-index: 50 !important;
            order: 1 !important;
            flex-shrink: 0 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          .viz-main-wrap {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            padding-top: 0px !important;
            gap: 8px !important;
          }
          .viz-grid-wrap {
            order: 3 !important;
            flex-direction: column !important;
            height: auto !important;
            flex: 1 !important;
            justify-content: flex-start !important;
            padding-top: 0px !important;
            margin-top: 16px !important;
            gap: 6px !important;
          }
          .viz-center-col {
            width: 100% !important;
            height: 260px !important;
            margin-top: 0px !important;
          }
          .viz-chicken-box {
            width: 270px !important;
            height: 270px !important;
          }
          .viz-gizzard-pos {
            display: none !important;
          }
          .viz-center-col svg {
            display: none !important;
          }
          .viz-beef-section {
            order: 3 !important;
            height: auto !important;
            min-height: 0 !important;
            justify-content: flex-start !important;
            padding-bottom: 0px !important;
            flex: 1 !important;
          }
          .viz-beef-section > div:first-child {
            width: 100% !important;
            
            height: 220px !important;
            transform: none !important;
          }
          .viz-grassland-bar {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            width: 100% !important;
            height: auto !important;
            background-image: none !important;
            background-color: #3d5c0a !important;
            border-top-left-radius: 20px !important;
            border-top-right-radius: 20px !important;
            padding: 16px !important;
            align-items: center !important;
            justify-content: center !important;
            margin-top: 8px !important;
          }
          .viz-grassland-bar > div {
            display: grid !important;
            gap: 10px 16px !important;
            width: 100% !important;
            flex-wrap: unset !important;
            align-items: center !important;
            justify-items: start !important;
          }
          .viz-grassland-bar > div > div:not(.viz-divider) {
            gap: 8px !important;
            font-size: 13px !important;
          }
          .viz-grassland-bar .viz-divider {
            display: none !important;
          }

          /* Section 2 detail mobile & tablet overrides - remove height & whitespace gaps */
          @media (max-width: 1023px) {
            .detail-section-wrap.block {
              background-image: url("/Product/know-your-meat-bg.webp") !important;
              background-size: 500px !important;
              background-repeat: repeat !important;
              background-color: #FAF6F0 !important;
              height: auto !important;
              min-height: auto !important;
              max-height: none !important;
              overflow-y: visible !important;
              overflow-x: hidden !important;
              // padding-top: 76px !important;
              padding-bottom: 20px !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;
              justify-content: flex-start !important;
            }
          }
          .detail-section-wrap > div {
            flex-direction: column !important;
            align-items: center !important;
            height: auto !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            gap: 0px !important;
          }
          .detail-section-wrap .w-full.md\:w-1\/2:first-child {
            width: 100% !important;
            height: auto !important;
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .detail-top-70 {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 0px !important;
            margin-bottom: 8px !important;
          }
          .detail-showcase-box {
            width: min(340px, 88vw) !important;
            height: min(270px, 33vh) !important;
            max-width: 88vw !important;
            max-height: 35vh !important;
            margin-left: 0px !important;
            margin-top: 0px !important;
          }
          .detail-carousel-bar {
            margin-left: 0px !important;
            gap: 6px !important;
            top: 0px !important;
          }
          .detail-carousel-btn {
            width: min(88px, 22vw) !important;
          }
          .detail-right-col {
            width: 100% !important;
            height: auto !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
            padding-top: 16px !important;
            margin-top: 8px !important;
            gap: 12px !important;
            overflow-y: visible !important;
            justify-content: flex-start !important;
          }

          .detail-title span {
            color: #F2CE07 !important;
          }

          .detail-desc {
            font-size: 13px !important;
            line-clamp: none !important;
            display: block !important;
            -webkit-line-clamp: unset !important;
          }
         
          .detail-nutrition-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 6px !important;
          }
          .detail-nutrition-card {
            min-height: 70px !important;
            padding: 8px 4px !important;
            gap: 4px !important;
            border-radius: 10px !important;
          }
          .detail-nutrition-card .relative.w-8 {
            width: 22px !important;
            height: 22px !important;
          }
          .detail-nutrition-card span:first-of-type {
            font-size: 9px !important;
            letter-spacing: 0.03em !important;
          }
          .detail-nutrition-card span:last-of-type {
            font-size: 12px !important;
          }
          .detail-share-btn {
            font-size: 11px !important;
            padding: 8px 12px !important;
          }
          .detail-cooking-card {
            flex-direction: row !important;
            height: auto !important;
            margin-top: 6px !important;
            border-radius: 14px !important;
            align-items: center !important;
            padding: 10px !important;
            gap: 10px !important;
          }
          .detail-cooking-card > div:first-child {
            width: 78px !important;
            min-width: 78px !important;
            height: 78px !important;
            border-radius: 10px !important;
            align-self: center !important;
            overflow: hidden !important;
          }
        
          .detail-cooking-content {
            padding: 0px !important;
            gap: 4px !important;
          }
          .detail-cooking-content span:first-child {
            font-size: 14px !important;
          }
          .detail-cooking-content h5 {
            font-size: 13px !important;
            line-height: 1.25 !important;
          }
          .detail-cooking-content p {
            font-size: 11px !important;
            line-height: 1.35 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .detail-cooking-content button {
            width: auto !important;
            max-width: max-content !important;
            white-space: nowrap !important;
            font-size: 10px !important;
            padding: 5px 12px !important;
            border-radius: 8px !important;
            gap: 5px !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative w-full z-10 bg-[#FDFCF7] ${activeMeatType === "chicken" ? "h-[200vh]" : "h-auto"
          }`}
      >
        {/* Section 1 Doodle Repeat Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.6] bg-repeat"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className={`sticky top-0 left-0 w-full overflow-hidden flex flex-col justify-between pt-14 sm:pt-16 md:pt-24 lg:pt-24 xl:pt-32 pb-0 viz-sticky-wrap  ${activeMeatType === "chicken" ? "h-screen" : "h-auto lg:h-screen"
          }`}>
          {/* Main Visualizer Content Area */}
          <div className="flex-1 w-full px-0 md:px-8 flex items-center justify-center relative pt-0 viz-main-wrap">
            {/* Top Right Sub-category tabs */}
            <div className="absolute top-0 right-4 lg:right-12 flex items-stretch bg-white border border-[#CCCCCC] shadow-sm z-40 text-[13px] md:text-[14px] font-bold tracking-wider h-9 md:h-10 select-none viz-switcher-container">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("chicken")}
                className={`px-6 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "chicken"
                  ? "bg-[#064823] text-white"
                  : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                  }`}
              >
                CHICKEN
                {activeMeatType === "chicken" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("beef")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "beef"
                  ? "bg-[#064823] text-white"
                  : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                  }`}
              >
                BEEF
                {activeMeatType === "beef" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.34, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("goat")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "goat"
                  ? "bg-[#064823] text-white"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                GOAT
                {activeMeatType === "goat" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
            </div>

            {/* Title Section (Centered above animal visualizer - 100% centered horizontally) */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 text-center z-10 flex flex-col items-center viz-title-block ${activeMeatType === "chicken" ? "sm:top-2 md:top-10 lg:top-2" : "top-1 sm:top-2 md:top-10 lg:top-3"
                }`}
            >
              {/* Row 1: Icon + sub-label */}
              <motion.div
                key={`title-sub-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 viz-title-sub"
              >
                <img
                  src={
                    activeMeatType === "chicken"
                      ? "/Product/Chicken/green-hen.svg"
                      : activeMeatType === "beef"
                        ? "/Product/Chicken/beef.svg"
                        : "/Product/Chicken/goat.svg"
                  }
                  alt={activeMeatType}
                  className="w-7 h-7 md:w-9 md:h-9 object-contain"
                />
                <span className="text-lg md:text-xl font-bold text-[#D98A00] tracking-[2px] uppercase font-barlow-condensed leading-none">
                  {activeMeatType === "chicken"
                    ? headerTitle[activeStage].sub
                    : activeMeatType.toUpperCase()}
                </span>
              </motion.div>

              {/* Row 2: Main heading */}
              <motion.h2
                key={`title-main-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold font-bree tracking-wide uppercase leading-none text-[#222222] viz-title-main"
              >
                {activeMeatType === "chicken" ? (
                  activeStage === "skin" ? (
                    <>
                      WITH <span className="text-[#FF7805]">SKIN</span>
                    </>
                  ) : activeStage === "skinless" ? (
                    <>
                      WITHOUT <span className="text-[#FF7805]">SKIN</span>
                    </>
                  ) : (
                    <>
                      WHOLE <span className="text-[#FF7805]">CHICKEN</span>
                    </>
                  )
                ) : (
                  <>
                    WITH <span className="text-[#FF7805]">SKIN</span>
                  </>
                )}
              </motion.h2>

              {/* Row 3: Tagline */}
              <motion.p
                key={`title-tagline-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42, ease: "easeOut" }}
                className="text-[14px] md:text-[16px] font-medium text-slate-600 tracking-wide font-inter viz-title-tagline mt-1"
              >
                Know the cuts Choose the best.
              </motion.p>
            </div>

            {/* Main Visualizer Content Area */}
            {activeMeatType === "chicken" ? (
              <div className="w-full max-w-[1400px] mx-auto h-full flex items-center justify-between mt-4 md:mt-6 relative viz-grid-wrap">
                <div className="hidden md:flex w-[30%] z-30 flex-col justify-center items-end h-full pt-6 md:pt-10">
                  <div
                    className={`relative w-fit flex flex-col ${activeStage === "inside" ? "gap-3 md:gap-5 lg:gap-7 viz-inside-list" : "gap-6 md:gap-10"}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {callouts[activeStage].left.map((item, idx) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key={`${activeStage === "inside" ? "inside" : "outer"}-left-${item.id}`}
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, x: -6 }}
                            initial={{
                              opacity: 0,
                              x: -220,
                            }}
                            animate={{
                              opacity: 1,
                              x:
                                activeStage === "inside"
                                  ? -Math.round(
                                    Math.sin(
                                      (Math.PI * idx) /
                                      Math.max(
                                        callouts[activeStage].left.length -
                                        1,
                                        1,
                                      ),
                                    ) * 60,
                                  )
                                  : -Math.round(
                                    Math.sin(
                                      (Math.PI * idx) /
                                      Math.max(
                                        callouts[activeStage].left.length -
                                        1,
                                        1,
                                      ),
                                    ) * 20,
                                  ),
                            }}
                            exit={{
                              opacity: 0,
                              x: -220,
                            }}
                            transition={{
                              duration: 0.95,
                              delay: idx * 0.12,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`flex items-center relative select-none cursor-pointer group ${selected ? "z-40 scale-105 selected-part" : "z-10"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
                                {idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${selected
                                    ? "scale-115"
                                    : "group-hover:scale-110"
                                    }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                  : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                  }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Center Chicken Stack with EXACT matching width/height */}
                <motion.div
                  key={`center-chicken-${activeMeatType}`}
                  initial={{ opacity: 0, y: 140, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full md:w-[40%] flex items-center justify-center relative h-[340px] sm:h-[380px] lg:h-[430px] xl:h-[480px] viz-center-col"
                >
                  {/* Dynamic SVG Connecting Lines — spans full 3-column width */}
                  <svg
                    className="absolute top-0 pointer-events-none z-40"
                    style={{ left: "-75%", width: "250%", height: "100%" }}
                    viewBox="0 0 1500 480"
                    fill="none"
                  >
                    <defs>
                      <filter
                        id="yellowGlow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="0"
                          stdDeviation="3"
                          floodColor="#F2CE07"
                          floodOpacity="0.9"
                        />
                      </filter>
                    </defs>
                    {activeStage !== "inside" ? (
                      // Skin & Skinless: angled elbow lines reaching exact target parts on chicken
                      <>
                        {/* WING → upper-left wing tip */}
                        {(() => {
                          const active = isPartActive("WING");
                          const isHovered = isPartHovered("WING");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 100 L 520 100 L 635 185`;
                          return (
                            <g key="line-wing">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-wing-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="100"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="635"
                                cy="185"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="635"
                                    cy="185"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="635"
                                    cy="185"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMETTE → mid-left wing joint (marked position 1) */}
                        {(() => {
                          const active = isPartActive("DRUMETTE");
                          const isHovered = isPartHovered("DRUMETTE");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 240 L 520 200 L 615 235`;
                          return (
                            <g key="line-drumette">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-drumette-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="240"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="615"
                                cy="235"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="615"
                                    cy="235"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="615"
                                    cy="235"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* THIGH → lower-left thigh (marked position 2) */}
                        {(() => {
                          const active = isPartActive("THIGH");
                          const isHovered = isPartHovered("THIGH");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 380 L 520 330 L 630 305`;
                          return (
                            <g key="line-thigh">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-thigh-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="380"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="630"
                                cy="305"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="630"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="630"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* NECK → chicken neck stem */}
                        {(() => {
                          const active = isPartActive("NECK");
                          const isHovered = isPartHovered("NECK");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 90 L 960 70 L 745 125`;
                          return (
                            <g key="line-neck">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-neck-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="90"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="745"
                                cy="125"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="745"
                                    cy="125"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="745"
                                    cy="125"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BREST → center breast */}
                        {(() => {
                          const active = isPartActive("BREST");
                          const isHovered = isPartHovered("BREST");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 240 L 960 200 L 790 200`;
                          return (
                            <g key="line-brest">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-brest-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="240"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="790"
                                cy="200"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="790"
                                    cy="200"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="790"
                                    cy="200"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMSTICK → lower-right drumstick leg */}
                        {(() => {
                          const active = isPartActive("DRUMSTICK");
                          const isHovered = isPartHovered("DRUMSTICK");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 390 L 960 330 L 860 345`;
                          return (
                            <g key="line-drumstick">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-drumstick-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="390"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="860"
                                cy="345"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="860"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="860"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}
                      </>
                    ) : (
                      // Inside cavity — solid white non-crossing angled elbow lines stopping ~2vw before parts
                      <>
                        {/* WING (#1) → ~2vw before left wing tip */}
                        {(() => {
                          const active = isPartActive("WING");
                          const isHovered = isPartHovered("WING");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 75 L 530 75 L 620 170`;
                          return (
                            <g key="inside-wing">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-wing-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="75"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="620"
                                cy="170"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="620"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="620"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* HEART (#2) → heart organ in chest cavity */}
                        {(() => {
                          const active = isPartActive("HEART");
                          const isHovered = isPartHovered("HEART");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 180 L 540 170 L 745 195`;
                          return (
                            <g key="inside-heart">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-heart-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="180"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="745"
                                cy="195"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="745"
                                    cy="195"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="745"
                                    cy="195"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMETTE (#3) → left wing/drumette forearm (marked position 1) */}
                        {(() => {
                          const active = isPartActive("DRUMETTE");
                          const isHovered = isPartHovered("DRUMETTE");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 300 L 520 250 L 615 235`;
                          return (
                            <g key="inside-drumette">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-drumette-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="300"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="615"
                                cy="235"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="615"
                                    cy="235"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="615"
                                    cy="235"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* THIGH (#4) → outer upper thigh curve (marked position 2) */}
                        {(() => {
                          const active = isPartActive("THIGH");
                          const isHovered = isPartHovered("THIGH");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 410 L 520 355 L 630 305`;
                          return (
                            <g key="inside-thigh">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-thigh-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="410"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="630"
                                cy="305"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="630"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="630"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* NECK (#5) → neck stem base */}
                        {(() => {
                          const active = isPartActive("NECK");
                          const isHovered = isPartHovered("NECK");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 985 : 1040;
                          const d = `M ${sx} 50 L 950 55 L 755 110`;
                          return (
                            <g key="inside-neck">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-neck-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="50"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="755"
                                cy="110"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="755"
                                    cy="110"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="755"
                                    cy="110"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BREST (#6) → right breast muscle wall (lower) & reaches count 6 circle */}
                        {(() => {
                          const active = isPartActive("BREST");
                          const isHovered = isPartHovered("BREST");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 995 : 1050;
                          const d = `M ${sx} 155 L 940 150 L 820 170`;
                          return (
                            <g key="inside-brest">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-brest-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="155"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="820"
                                cy="170"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="820"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="820"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BACK (#7) → spine/back bone in cavity */}
                        {(() => {
                          const active =
                            isPartActive("BACK") || isPartActive("BACT");
                          const isHovered =
                            isPartHovered("BACK") || isPartHovered("BACT");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1025 : 1080;
                          const d = `M ${sx} 245 L 950 190 L 750 165`;
                          return (
                            <g key="inside-back">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-back-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="245"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="750"
                                cy="165"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="750"
                                    cy="165"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="750"
                                    cy="165"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* LIVER (#8) → liver organ in cavity */}
                        {(() => {
                          const active = isPartActive("LIVER");
                          const isHovered = isPartHovered("LIVER");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1015 : 1070;
                          const d = `M ${sx} 345 L 950 270 L 760 240`;
                          return (
                            <g key="inside-liver">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-liver-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="345"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="760"
                                cy="240"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="760"
                                    cy="240"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="760"
                                    cy="240"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMSTICK (#9) → ~2vw before right drumstick leg */}
                        {(() => {
                          const active = isPartActive("DRUMSTICK");
                          const isHovered = isPartHovered("DRUMSTICK");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 975 : 1030;
                          const d = `M ${sx} 425 L 950 340 L 865 340`;
                          return (
                            <g key="inside-drumstick">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-drumstick-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="425"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="865"
                                cy="340"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="865"
                                    cy="340"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="865"
                                    cy="340"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* GIZZARD (#10) → gizzard organ in lower cavity */}
                        {(() => {
                          const active = isPartActive("GIZZARD");
                          const isHovered = isPartHovered("GIZZARD");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sy = isHovered ? 395 : 430;
                          const d = `M 750 ${sy} L 760 310`;
                          return (
                            <g key="inside-gizzard">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-gizzard-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx="750"
                                cy={sy}
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="760"
                                cy="310"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="760"
                                    cy="310"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="760"
                                    cy="310"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}
                      </>
                    )}
                  </svg>

                  {/* Exact Stacked chicken viewport */}
                  <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] aspect-square flex items-center justify-center viz-chicken-box">
                    {/* Background Golden Outline Circle SVG behind chicken */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none z-0 -translate-y-5 sm:-translate-y-6 lg:-translate-y-7">
                      <img
                        src="/Product/Chicken/bg-circle.svg"
                        alt="Background Circle"
                        className="w-[67%] h-[67%] object-contain"
                      />
                    </div>

                    {/* Layer 1: Cavity (Bottom Layer) */}
                    <div className="absolute inset-0 w-full h-full z-0">
                      <img
                        src="/Product/Chicken/FullChicken/transparent.webp"
                        alt="Chicken Inside Cavity"
                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                      />
                    </div>

                    {/* Layer 2: Skinless (Middle Layer) */}
                    <motion.div
                      style={{ clipPath: meatClipPath }}
                      className="absolute inset-0 w-full h-full z-10"
                    >
                      <img
                        src="/Product/Chicken/FullChicken/withoutskin.webp"
                        alt="Chicken Skinless Muscle"
                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                      />
                    </motion.div>

                    {/* Layer 3: Skin-On (Top Layer) */}
                    <motion.div
                      style={{ clipPath: skinClipPath }}
                      className="absolute inset-0 w-full h-full z-20"
                    >
                      <img
                        src="/Product/Chicken/FullChicken/withskin.webp"
                        alt="Whole Chicken with Skin"
                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                      />
                    </motion.div>
                  </div>

                  {/* Bottom Callout: GIZZARD (Inside Cavity Only) */}
                  <AnimatePresence>
                    {activeStage === "inside" &&
                      callouts.inside.bottom.map((item) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key="gizzard"
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, y: -6 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute bottom-[-45px] md:bottom-[-55px] left-[45%] transform -translate-x-[45%] flex items-center select-none cursor-pointer group viz-gizzard-pos ${selected ? "z-40 scale-105 selected-part" : "z-30"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
                                {callouts[activeStage].left.length +
                                  callouts[activeStage].right.length +
                                  1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${selected
                                    ? "scale-115"
                                    : "group-hover:scale-110"
                                    }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                  : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                  }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </motion.div>

                {/* Mobile Only: Swipeable Callouts Carousel & Selected Part Card */}
                <div className="flex md:hidden flex-col items-center w-full mt-1 gap-2 z-30 select-none">
                  {/* Wrapped Circle Thumbnail Grid */}
                  <div className="flex flex-wrap items-center gap-3 w-full px-4 py-2 justify-center">
                    {callouts[activeStage].left
                      .concat(callouts[activeStage].right)
                      .concat(
                        activeStage === "inside" ? callouts.inside.bottom : [],
                      )
                      .map((item, idx) => {
                        const normalized = item.name.toLowerCase().trim();
                        const chickenPartIdx = chickenParts.findIndex((pt) => {
                          const ptName = pt.name.toLowerCase().trim();
                          if (normalized === "brest" && ptName === "breast")
                            return true;
                          if (normalized === "bact" && ptName === "back")
                            return true;
                          return ptName === normalized;
                        });
                        const selected = chickenPartIdx === selectedPartIdx;

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (chickenPartIdx !== -1) {
                                setSelectedPartIdx(chickenPartIdx);
                              }
                            }}
                            className={`w-[48px] h-[48px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 shadow-sm transition-all ${selected
                              ? "border-[#F2CE07] ring-2 ring-[#F2CE07] scale-110"
                              : "border-slate-200 hover:border-slate-300"
                              }`}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </button>
                        );
                      })}
                  </div>

                  {/* Selected Part Details Card */}
                  {(() => {
                    const allParts = callouts[activeStage].left
                      .concat(callouts[activeStage].right)
                      .concat(
                        activeStage === "inside" ? callouts.inside.bottom : [],
                      );
                    const currentPart =
                      allParts.find((p) => {
                        const normalized = p.name.toLowerCase().trim();
                        const foundIdx = chickenParts.findIndex((pt) => {
                          const ptName = pt.name.toLowerCase().trim();
                          if (normalized === "brest" && ptName === "breast")
                            return true;
                          if (normalized === "bact" && ptName === "back")
                            return true;
                          return ptName === normalized;
                        });
                        return foundIdx === selectedPartIdx;
                      }) || allParts[0];

                    if (!currentPart) return null;

                    return (
                      <div
                        onClick={(e) => handlePartClick(e, currentPart)}
                        className="w-[92%] max-w-[360px] bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md active:scale-95 transition-transform duration-200 cursor-pointer"
                      >
                        {/* Circle image */}
                        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 border-2 border-[#F2CE07] shadow-sm">
                          <img
                            src={currentPart.img}
                            alt={currentPart.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0 text-left flex flex-col justify-center self-center py-0.5">
                          <span className="block text-[16px] font-black uppercase tracking-wider text-[#b45309] truncate leading-tight">
                            {currentPart.name}
                          </span>
                          <p className="text-[12px] font-semibold text-slate-600 line-clamp-1 leading-snug mt-0.5">
                            {currentPart.desc}
                          </p>
                        </div>
                        {/* CTA */}
                        <div className="w-8 h-8 rounded-full bg-[#F2CE07] flex items-center justify-center shrink-0 shadow-sm self-center">
                          <span className="text-[#064823] font-black text-[14px] leading-none flex items-center justify-center">
                            →
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right Side Callout Section */}
                <div className="hidden md:flex w-[30%] z-30 flex-col justify-center h-full pt-16">
                  <div
                    className={`relative w-full flex flex-col ${activeStage === "inside" ? "gap-2 viz-inside-list" : "gap-12"}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {callouts[activeStage].right.map((item, idx) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key={`${activeStage === "inside" ? "inside" : "outer"}-right-${item.id}`}
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, x: 6 }}
                            initial={{
                              opacity: 0,
                              x: 220,
                            }}
                            animate={{
                              opacity: 1,
                              x:
                                activeStage === "inside"
                                  ? Math.round(
                                    Math.sin(
                                      (Math.PI * idx) /
                                      Math.max(
                                        callouts[activeStage].right.length -
                                        1,
                                        1,
                                      ),
                                    ) * 60,
                                  )
                                  : Math.round(
                                    Math.sin(
                                      (Math.PI * idx) /
                                      Math.max(
                                        callouts[activeStage].right.length -
                                        1,
                                        1,
                                      ),
                                    ) * 20,
                                  ),
                            }}
                            exit={{
                              opacity: 0,
                              x: 220,
                            }}
                            transition={{
                              duration: 0.95,
                              delay: idx * 0.12,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`flex items-center relative select-none cursor-pointer group ${selected ? "z-40 scale-105 selected-part" : "z-10"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
                                {callouts[activeStage].left.length + idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${selected
                                    ? "scale-115"
                                    : "group-hover:scale-110"
                                    }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                  : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                  }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>


              </div>
            ) : (
              /* Beef & Goat Visualizer - 100% Mockup Match */
              <div className="w-full h-full relative flex flex-col items-center justify-end pb-12 md:pb-0 lg:pb-12 z-30 viz-beef-section relative">
                {/* Central Animal Container — Split Independent Containers for Beef & Goat */}
                {activeMeatType === "beef" ? (
                  <motion.div
                    key="beef-container"
                    initial={{ opacity: 0, y: 140, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 1.15,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative top-[4vh] sm:top-[2vh] md:top-[1vh] lg:top-[7vh] xl:-top-[5vh] 2xl:-top-[7vh] w-[98%] sm:w-[92%] md:w-[88%] max-w-[300px] sm:max-w-[640px] md:max-w-[600px] lg:max-w-[580px] xl:max-w-[760px] 2xl:max-w-[820px] h-[220px] sm:h-[360px] md:h-[420px] lg:h-[270px] xl:h-[360px] 2xl:h-[400px] flex items-center justify-center z-20 viz-beef-img-wrap mt-[0%] mb-[-3.5%] ml-[-7%] md:ml-[0%] md:mt-[24%] md:mb-[-8%] lg:mt-0 lg:mb-0 overflow-visible"
                  >
                    <BuffaloParts partsDx={100} partsDy={-90} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="goat-container"
                    initial={{ opacity: 0, y: 140, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 1.15,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative top-[0.5vh] sm:-top-[3vh] md:-top-[2vh] lg:-top-[1.5vh] xl:-top-[2vh] 2xl:-top-[1.5vh] w-[98%] sm:w-[94%] md:w-[60%] lg:w-[50%] max-w-[300px] sm:max-w-[600px] md:max-w-[480px] lg:max-w-[420px] 2xl:max-w-[750px] xl:max-w-[560px] h-[260px] sm:h-[380px] md:h-[295px] lg:h-[260px] xl:h-[310px] 2xl:h-[425px] flex items-center justify-center z-20 viz-goat-img-wrap mt-0 mb-[-6.5%] ml-[-4%] md:ml-0 md:mt-[6%] md:mb-[-4%] lg:mt-0 lg:mb-[4%] overflow-visible"
                  >
                    <GoatParts partsDx={70} partsDy={-20} />
                  </motion.div>
                )}

                {/* Bottom Grassland Bar with 4 Feature Badges (Animal stands directly on this hill - 100vw full width) */}
                <div
                  className="w-screen absolute md:relative lg:absolute bottom-0 left-1/2 transform translate-x-0 sm:translate-x-[-46%] lg:translate-x-[-50%] h-auto pt-[4%] sm:h-auto md:h-auto lg:h-[155px] lg:pt-0 bg-no-repeat flex items-end pb-2 sm:pb-3 px-8 justify-center z-10 viz-grassland-bar bg-[#4e7610] lg:bg-transparent lg:bg-[url('/Product/GoatBeef/grassLand.webp')] lg:bg-no-repeat lg:bg-[length:100%_100%] lg:bg-center-bottom xl:h-[175px]">
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white font-barlow-condensed font-medium uppercase text-base sm:text-lg tracking-wider mb-[2.6vw] sm:mb-[2.4vw]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/natural.svg"
                          alt="Natural"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">100% NATURAL</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/higinical.svg"
                          alt="Hygienically"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">
                        HYGIENICALLY PROCESSED
                      </span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/safe.svg"
                          alt="Safe"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">SAFE & HEALTHY</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/perfectforRecipie.svg"
                          alt="Perfect"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">
                        PERFECT FOR EVERY RECIPE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Temperature & Storage Card Badge (Bottom-Right of Hero Section for Chicken) */}
          {activeMeatType === "chicken" && (
            <div className="absolute hidden md:block bottom-6 right-4 sm:bottom-6 lg:bottom-[2vw] lg:right-12 z-30 pointer-events-none drop-shadow-xl">
              <Image
                src="/Product/temp-and-storage-card.webp"
                alt="Temperature & Storage Card"
                width={320}
                height={180}
                className="w-[140px] sm:w-[200px] md:w-[240px] lg:w-[15.5vw] xl:w-[16.5vw] max-w-[275px] h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Categories Section */}
      <section
        className={`bg-[#EBFFE6] relative z-30 transition-all duration-500 recipe-bottom-banner  overflow-visible ${activeMeatType === "chicken"
          ? "rounded-t-[50px] sm:rounded-t-[60px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pt-4 sm:pt-5 pb-3 sm:pb-4 mt-0 "
          : "rounded-none shadow-none mt-0 pt-6 sm:pt-8 pb-3 sm:pb-4 "
          }`}
      >
        <div className="relative py-[3vh] ">
          {/* Overlapping Mascot on the left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[45vw] sm:w-[45vw] h-[35vh] sm:h-[30vh]  relative md:w-[20vw] md:h-[40vh]  md:absolute md:left-[1vw] -top-[10vh] md:-top-[10vh] md:mt-0 shrink-0 pointer-events-none drop-shadow-2xl -mb-[7vh] md:-mb-[0vh] z-20 mx-auto md:mx-0"
          >
            <Image
              src="/Product/chicken-gif.gif"
              alt="Chicken Mascot"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Heading and Categories grid */}
          <div className="w-full space-y-3 sm:space-y-4 flex flex-col items-center justify-center px-[5vw] -pl-[3vw]">
            <div className="space-y-2 text-center w-full flex flex-col items-center justify-center">
              {/* CATEGORIES Typewriter Title */}
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="text-4xl md:text-5xl font-bold text-[#064823] font-barlow-condensed tracking-widest uppercase inline-flex justify-center select-none"
              >
                {"CATEGORIES".split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, y: -10 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    transition={{ duration: 0.08, ease: "easeOut" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h3>

              {/* Red Line expand from center */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                className="w-32 h-[2.5px] bg-[#F7840F] mx-auto mt-3 mb-1 origin-center"
              />

              {/* Subtitle Typewriter Text */}
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.25,
                    },
                  },
                }}
                className="text-[15px] font-normal text-slate-800 tracking-wider font-inter inline-flex flex-wrap justify-center select-none"
              >
                {"Premium quality meat, delivery fresh to your life."
                  .split("")
                  .map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.04 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
              </motion.p>
            </div>

            {/* Category Circular Badges */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-3 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:items-center lg:justify-around items-center justify-items-center gap-y-4 gap-x-1 sm:gap-y-5 sm:gap-x-2 lg:gap-0 px-2 sm:px-4 lg:px-8 w-full md:pl-[180px] lg:pl-[220px] xl:pl-[240px]"
            >
              {categories.map((cat, idx) => {
                const isHighlighted = idx === highlightedCategoryIdx;

                return (
                  <React.Fragment key={idx}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.7, y: 25 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }}
                      animate={
                        isHighlighted
                          ? { scale: [1, 1.14, 1.08] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="group flex flex-col items-center gap-1 sm:gap-1.5 lg:gap-2">
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-[3px] lg:border-[5px] bg-white flex items-center justify-center transition-all duration-500 ${isHighlighted
                            ? "border-[#F2CE07] ring-2 sm:ring-3 lg:ring-4 ring-[#F2CE07]/40 shadow-lg lg:shadow-xl shadow-[#F2CE07]/30 scale-105 lg:scale-108"
                            : "border-[#CCCCCC] shadow-sm sm:shadow-md shadow-slate-200/50 group-hover:scale-105 group-hover:border-[#153520]"
                            }`}
                        >
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-[68px] lg:h-[68px] rounded-full border-2 border-white flex items-center justify-center transition-all duration-500 bg-[#82B224] group-hover:bg-[#153520] ${isHighlighted ? "scale-105 shadow-inner" : ""
                              }`}
                          >
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
                              <Image
                                src={cat.icon}
                                alt={cat.name}
                                fill
                                sizes="36px"
                                className="object-contain filter brightness-0 invert"
                              />
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] sm:text-[11px] lg:text-[14px] font-black tracking-wide lg:tracking-wider uppercase text-center leading-tight transition-all duration-300 group-hover:text-[#153520] ${isHighlighted
                            ? "text-[#127431] scale-105 lg:scale-110"
                            : "text-slate-800 group-hover:text-[#127431]"
                            }`}
                        >
                          {cat.name}
                        </span>
                      </div>
                    </motion.div>

                    {idx < categories.length - 1 && (
                      <div className="hidden lg:block w-[1px] h-10 bg-slate-300/60 self-start mt-5 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.25 MEATiN Ecosystem Connected Circle Section */}
      <EcosystemCircle />

      {/* 2.5 Rewriting Quality in Meat Production Section */}
      <section className="relative w-full bg-[#F5F4EE] pt-8 sm:pt-12 md:pt-12 lg:pt-14 pb-6 sm:pb-8 md:pb-8 lg:pb-10 overflow-hidden z-20">
        {/* Subtle Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] bg-repeat z-0"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: "650px",
          }}
        />

        <div className="relative z-10 w-full mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Top Row: Left Typography + Right Facility Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
            >
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.1rem] xl:text-[3.6rem] 2xl:text-[3.9rem] font-black font-manrope tracking-tight uppercase leading-[0.92] sm:leading-[0.90] select-none"
                >
                  <span className="block text-[#1B5235]">REWRITING</span>
                  <span className="block mt-1">
                    <span className="text-[#EA7200]">QUALITY</span>{" "}
                    <span className="text-[#1B5235]">IN</span>
                  </span>
                  <span className="block text-[#1B5235] mt-1">
                    MEAT PRODUCTION
                  </span>
                </motion.h2>
              </div>

              {/* Lime Accent Pill Bar (~10% width) */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="w-[10%] min-w-[36px] max-w-[48px] h-1 sm:h-1.5 bg-[#8DC541] rounded-full mt-3.5 sm:mt-4 mb-4 sm:mb-5 shadow-sm"
              />

              {/* Description Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#334139] text-[0.9375rem] sm:text-[1rem] lg:text-[1.0625rem] xl:text-[1.15rem] font-medium leading-relaxed font-manrope max-w-xl"
              >
                Meatin is a vision born from the concern over India&apos;s unhealthy
                slaughtering practices. India&apos;s meat industry has huge potential. We
                channel this growing opportunity toward a healthy &amp; efficient meat habit.
                Localising global standards through most advanced machinery and expert
                manpower.
              </motion.p>
            </motion.div>

            {/* Right Facility Image Column - 3D Perspective Card Entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ perspective: 1000 }}
              className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="relative w-full rounded-2xl sm:rounded-[24px] overflow-hidden border-2 sm:border-[3px] border-white/90 bg-white shadow-[0_20px_45px_rgba(27,82,53,0.1)] group">
                <Image
                  src="/Product/rewriting-quality.webp"
                  alt="MEATiN Production and Quality Facility"
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover block rounded-xl sm:rounded-[21px] transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Floating 8-Icon Capability Bar */}
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-3 sm:mt-4 lg:mt-5 bg-[#F1F7EE] rounded-2xl sm:rounded-[24px] p-4 sm:p-5 lg:py-5 lg:px-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-slate-200/80"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 sm:gap-y-6 gap-x-3 sm:gap-x-4 lg:gap-x-0 lg:divide-x lg:divide-slate-200/90 items-start">
              {PRODUCTION_PILLARS.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                    delay: 0.1 + idx * 0.05,
                  }}
                  className="flex flex-col items-center text-center px-1.5 lg:px-2 group cursor-default"
                >
                  {/* Circular Icon Container with spring pop */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-13 h-13 sm:w-15 sm:h-15 lg:w-[63px] lg:h-[63px] rounded-full bg-[#E6F1E0] flex items-center justify-center mb-2 sm:mb-2.5 shrink-0 shadow-sm group-hover:bg-[#D5EACD] group-hover:shadow-md transition-colors duration-300"
                  >
                    <Icon
                      icon={pillar.icon}
                      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-[#1E5638] transition-colors duration-300 group-hover:text-[#134229]"
                    />
                  </motion.div>

                  {/* 2-line Label */}
                  <span className="text-[12px] sm:text-[13px] lg:text-[13.5px] font-semibold text-[#1E3A2B] group-hover:text-[#124b2b] transition-colors leading-[1.22] max-w-[125px]">
                    <span className="block">{pillar.line1}</span>
                    <span className="block">{pillar.line2}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Interactive Details Section - 1:1 Match with Reference Layout */}
      <section
        ref={detailsSectionRef}
        className={`relative z-30 w-full h-auto lg:h-[100vh] pt-10 sm:pt-24 lg:pt-[5rem] xl:pt-[5.5rem] 2xl:pt-[6rem] pb-6 sm:pb-8 lg:pb-0 flex flex-col justify-between m-0 overflow-x-hidden bg-[#8DC541] transition-all duration-700 detail-section-wrap ${hasSelectedAnyPart && activeMeatType === "chicken"
          ? "block opacity-100 pointer-events-auto"
          : "hidden opacity-0 pointer-events-none"
          }`}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Layer 1: Background Doodle Pattern Overlay (BEHIND green bg image, scoped to top white section) */}
          <div
            className="absolute top-0 inset-x-0 h-[65%] pointer-events-none bg-repeat z-0 opacity-[0.18] filter brightness-0"
            style={{
              backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
              backgroundSize: "700px",
            }}
          />

          {/* Layer 2: Main Section Background Image (Green wave on top of doodle pattern) */}
          <Image
            src="/Product/details/section-images/product-details-bg.webp"
            alt="Section Background"
            fill
            priority
            className="object-cover object-[15%_0%] lg:object-center w-full h-full relative z-10"
          />

          {/* Floating single leaf - right side */}
          <div className="hidden md:block lg:block absolute bottom-[11vw] right-[7vw] w-[5.5vw] h-auto z-10">
            <Image
              src="/Product/details/section-images/single-leaf-image-1.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Floating single leaf - right side */}
          <div className="hidden md:block lg:block absolute bottom-[12vw] right-[0vw] w-[3.5vw] h-auto z-10 opacity-90 animate-pulse">
            <Image
              src="/Product/details/section-images/single-leaf-image-right-corner.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* TOP MAIN CONTENT CONTAINER */}
        <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-[3.5vw] flex-1 flex flex-col justify-start z-10 pt-1 lg:pt-[0.5vw]">

          {/* Top Left Slogan Badge: Goodness Begins at Our Farms + Two Leaves */}
          <div className="hidden md:flex lg:flex flex-col items-start absolute top-[1.5rem] lg:top-[1.8rem] xl:top-[2.2rem] 2xl:top-[2.5rem] left-[2.5vw] md:left-[3.5vw] z-20 pointer-events-none scale-90 md:scale-100">
            <div className="w-[13.5vw] max-w-[240px] h-auto">
              <Image
                src="/Product/details/section-images/goodness-begins-image.webp"
                alt="Goodness Begins at Our Farms"
                width={260}
                height={160}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="w-[8.5vw] max-w-[150px] h-auto ml-[3vw]">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={140}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Top Center Title Header */}
          <div className="text-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[42vw] mx-auto z-20 pt-1 lg:pt-[0.2vw] mt-0 lg:mt-1">
            <h4 className="text-xs sm:text-sm lg:text-[1vw] font-medium text-[#d52828] tracking-widest uppercase leading-none">
              FRESH PREMIUM CHICKEN
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3vw] font-bold text-[#17442d] tracking-normal uppercase leading-none mt-1 lg:mt-[0.3vw] drop-shadow-sm">
              {chickenParts[manuallySelectedPartIdx]?.name ||
                "CHICKEN DRUMSTICK"}
            </h2>
            <p className="text-xs sm:text-sm lg:text-[0.78vw] font-semibold text-slate-900 font-manrope leading-relaxed max-w-[92%] sm:max-w-[80%] lg:max-w-[36vw] mx-auto mt-2 lg:mt-[0.5vw]">
              {chickenParts[manuallySelectedPartIdx]?.desc ||
                "Succulent chicken drumsticks cut with precision. Perfect for grilling, roasting, or frying, offering rich flavor and tender texture in every bite."}
            </p>
          </div>

          {/* Top Right Nutrition Card (Desktop only to prevent text collision on tablet) */}
          <div className="hidden lg:block absolute top-[1.2rem] lg:top-[1.5rem] xl:top-[1.8rem] 2xl:top-[2.2rem] right-[3vw]">
            <Image
              src={"/Product/details/section-images/nutrition-information.svg"}
              alt="Nutrition information card"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[17vw] max-w-[340px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Leaf - Pure nutritional information */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+8.2vw)] lg:top-[calc(1.5rem+8.4vw)] xl:top-[calc(1.8rem+7.5vw)] 2xl:top-[calc(2.2rem+7vw)] right-[6.5vw]">
            <Image
              src={
                "/Product/details/section-images/pure-natural-nutrition.webp"
              }
              alt="Leaf - Pure nutritional information"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[9vw] max-w-[170px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Benefits */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+13.8vw)] lg:top-[calc(1.5rem+13.6vw)] xl:top-[calc(1.8rem+12.8vw)] 2xl:top-[calc(2.2rem+12vw)] right-[6.5vw]">
            <Image
              src={"/Product/details/section-images/benefits-texts.svg"}
              alt="Benefits"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[10.5vw] max-w-[190px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Top Right Decorative Leaf Prop for Tablet Viewports */}
          <div className="hidden md:block lg:hidden absolute top-[2rem] right-[4vw] z-20 pointer-events-none">
            <div className="w-[10vw] max-w-[110px] h-auto opacity-80">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={120}
                height={90}
                className="w-full h-auto object-contain transform rotate-45"
              />
            </div>
          </div>

          {/* CENTER PRODUCT ORBIT DISPLAY */}
          <div
            ref={centerCircleRef}
            className="relative w-full max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[42vw] xl:max-w-[44vw] h-[200px] sm:h-[300px] md:h-[340px] lg:h-[25vw] xl:h-[27vw] mx-auto my-1 sm:my-2 md:my-3 flex items-center justify-center"
          >
            {/* Main Center Selected Cut / Model Display */}
            <div
              ref={woodPlateContainerRef}
              className="relative w-[270px] sm:w-[420px] md:w-[480px] lg:w-[37vw] xl:w-[34vw] h-[200px] sm:h-[300px] md:h-[340px] lg:h-[27vw] xl:h-[28vw] flex items-center justify-center z-10"
            >
              <AnimatePresence mode="wait">
                {activeViewTab === "raw" && (
                  <motion.div
                    key="raw-plate-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Static Wood Plate — never re-animates on part change */}
                    <img
                      src="/Product/Chicken/ChickenParts/woodPlate.webp"
                      alt="Wood Plate"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                    />

                    {/* Animated Chicken Part — sits centered on the plate top surface */}
                    <div
                      ref={stationaryPlateRef}
                      suppressHydrationWarning
                      className="relative z-10 flex items-center justify-center"
                      style={getPlateStyleForPart(manuallySelectedPartIdx)}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center absolute inset-0"
                        style={{
                          opacity: isLandedInSection2 ? 1 : 0,
                        }}
                      >
                        <img
                          ref={stationaryImgRef as any}
                          src={
                            chickenParts[manuallySelectedPartIdx]?.productImg ||
                            "/Product/Chicken/ChickenParts/drumstick.webp"
                          }
                          alt={
                            chickenParts[manuallySelectedPartIdx]?.name || "Cut"
                          }
                          className="w-full h-full object-contain select-none pointer-events-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeViewTab === "packed" && (
                  <motion.div
                    key={`packed-${manuallySelectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={
                        (chickenParts[manuallySelectedPartIdx] as any)
                          ?.pouchImg || "/Product/details/packedProduct.webp"
                      }
                      alt="Packed Pouch"
                      width={550}
                      height={550}
                      className="w-[190px] sm:w-[260px] md:w-[310px] lg:w-[20vw] xl:w-[21vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === "platter" && (
                  <motion.div
                    key={`platter-${manuallySelectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={
                        chickenParts[manuallySelectedPartIdx]?.platterImg ||
                        "/Product/Chicken/Platters/drumstick.webp"
                      }
                      alt="Prepared Platter"
                      width={550}
                      height={420}
                      className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[28vw] xl:w-[29vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === "3d" &&
                  (() => {
                    const currentPartName =
                      chickenParts[manuallySelectedPartIdx]?.name ||
                      "Drumstick";
                    const glbPath =
                      partGlbMap[currentPartName] ||
                      partGlbMap[currentPartName.toLowerCase()] ||
                      partGlbMap[currentPartName.trim()] ||
                      "/Product/details/glb/drumstick.glb";

                    return (
                      <motion.div
                        key={`3d-${manuallySelectedPartIdx}`}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[90%] h-[90%] relative flex items-center justify-center rounded-2xl overflow-hidden drop-shadow-2xl z-20"
                      >
                        <style>{`
                          model-viewer::part(default-progress-bar),
                          model-viewer::part(default-progress-mask),
                          model-viewer > #default-progress-bar {
                            display: none !important;
                          }
                        `}</style>
                        {React.createElement(
                          "model-viewer",
                          {
                            src: glbPath,
                            alt: `3D model of ${currentPartName}`,
                            "auto-rotate": true,
                            "auto-rotate-delay": 0,
                            "rotation-per-second": "30deg",
                            "camera-controls": true,
                            "disable-zoom": true,
                            "touch-action": "pan-y",
                            "shadow-intensity": "1.2",
                            "shadow-softness": "0.8",
                            exposure: "1.15",
                            loading: "eager",
                            style: {
                              width: "88%",
                              height: "88%",
                              minHeight: "150px",
                              outline: "none",
                              cursor: "grab",
                              backgroundColor: "transparent",
                            },
                          },
                          React.createElement("div", {
                            slot: "progress-bar",
                            style: { display: "none" },
                          })
                        )}
                      </motion.div>
                    );
                  })()}
              </AnimatePresence>
            </div>

            {/* DESKTOP ORBIT BADGE 1: Top-Left (Single Raw Cut) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("raw");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-left-[3.8vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute top-[2.2vw] -right-[6.6vw] w-[6.4vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow("top-left", activeViewTab === "raw")}
              </div>
              <div
                className={`relative w-[54px] h-[54px] sm:w-[64px] sm:h-[64px] lg:w-[6.2vw] lg:h-[6.2vw] rounded-full flex items-center justify-center p-2 lg:p-[0.7vw] hover:scale-110 transition-all duration-300 ${activeViewTab === "raw"
                  ? "border-[1.5px] border-transparent scale-110"
                  : "border-[1.5px] border-black hover:border-black"
                  }`}
              >
                {/* Clockwise Running Dotted Ring: Odd Red & Even Green */}
                {activeViewTab === "raw" && renderAlternatingDottedRing()}
                <Image
                  src={
                    chickenParts[manuallySelectedPartIdx]?.productImg ||
                    "/Product/Chicken/ChickenParts/drumstick.webp"
                  }
                  alt="Raw Cut"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 2: Bottom-Left (Pouch / Packaged) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("packed");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[3.8vw] lg:-left-[4.5vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute bottom-[2.2vw] -right-[6.6vw] w-[6.4vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow("bottom-left", activeViewTab === "packed")}
              </div>
              <div
                className={`relative w-[54px] h-[54px] sm:w-[64px] sm:h-[64px] lg:w-[6.2vw] lg:h-[6.2vw] rounded-full flex items-center justify-center p-2 lg:p-[0.7vw] hover:scale-110 transition-all duration-300 ${activeViewTab === "packed"
                  ? "border-[1.5px] border-transparent scale-110"
                  : "border-[1.5px] border-black hover:border-black"
                  }`}
              >
                {/* Clockwise Running Dotted Ring: Odd Red & Even Green */}
                {activeViewTab === "packed" && renderAlternatingDottedRing()}
                <Image
                  src={
                    (chickenParts[manuallySelectedPartIdx] as any)?.pouchImg ||
                    "/Product/details/packedProduct.webp"
                  }
                  alt="Pouch Pack"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 3: Top-Right (Bowl / Platter) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("platter");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-right-[2.5vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute top-[2.2vw] -left-[6.6vw] w-[6.4vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow("top-right", activeViewTab === "platter")}
              </div>
              <div
                className={`relative w-[54px] h-[54px] sm:w-[64px] sm:h-[64px] lg:w-[6.2vw] lg:h-[6.2vw] rounded-full flex items-center justify-center p-2 lg:p-[0.7vw] hover:scale-110 transition-all duration-300 ${activeViewTab === "platter"
                  ? "border-[1.5px] border-transparent scale-110"
                  : "border-[1.5px] border-black hover:border-black"
                  }`}
              >
                {/* Clockwise Running Dotted Ring: Odd Red & Even Green */}
                {activeViewTab === "platter" && renderAlternatingDottedRing()}
                <Image
                  src={
                    chickenParts[manuallySelectedPartIdx]?.platterImg ||
                    "/Product/Chicken/Platters/drumstick.webp"
                  }
                  alt="Platter"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 4: Bottom-Right (View in 360°) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === "3d" ? "raw" : "3d");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[4.5vw] lg:-right-[6.8vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute bottom-[2.2vw] -left-[6.6vw] w-[6.4vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow("bottom-right", activeViewTab === "3d")}
              </div>
              <div
                className={`relative w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] lg:w-[6.6vw] lg:h-[6.6vw] rounded-full flex flex-col items-center justify-center p-1.5 lg:p-[0.45vw] hover:scale-110 transition-all duration-300 ${activeViewTab === "3d"
                  ? "border-[1.5px] border-transparent scale-110"
                  : "border-[1.5px] border-black hover:border-black"
                  }`}
              >
                {/* Clockwise Running Dotted Ring: Odd Red & Even Green */}
                {activeViewTab === "3d" && renderAlternatingDottedRing()}
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={50}
                  height={50}
                  className="w-6 h-6 lg:w-[3.2vw] lg:h-[3.2vw] object-contain -mt-[0.3vw] relative z-10"
                />
                <span className="text-[10px] lg:text-[0.68vw] font-black text-slate-800 tracking-tight leading-none mt-0.5 lg:-mt-[0.2vw] uppercase font-manrope whitespace-nowrap relative z-10">
                  View in 360°
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET FLOATING BUTTONS ROW (HIDDEN ON DESKTOP) */}
          <div className="grid lg:hidden grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[340px] sm:max-w-none mx-auto mt-1 mb-2 sm:mt-2 sm:mb-3 z-30 px-3">
            {/* Tab 1: Raw Cut */}
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("raw");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${activeViewTab === "raw"
                ? "bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]"
                : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50"
                }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={
                    chickenParts[manuallySelectedPartIdx]?.productImg ||
                    "/Product/Chicken/ChickenParts/drumstick.webp"
                  }
                  alt="Raw Cut"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Raw Cut</span>
            </button>

            {/* Tab 2: Pouch Pack */}
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("packed");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${activeViewTab === "packed"
                ? "bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]"
                : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50"
                }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={
                    (chickenParts[manuallySelectedPartIdx] as any)?.pouchImg ||
                    "/Product/details/packedProduct.webp"
                  }
                  alt="Pouch Pack"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Packed</span>
            </button>

            {/* Tab 3: Platter */}
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab("platter");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${activeViewTab === "platter"
                ? "bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]"
                : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50"
                }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={
                    chickenParts[manuallySelectedPartIdx]?.platterImg ||
                    "/Product/Chicken/Platters/drumstick.webp"
                  }
                  alt="Platter"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Platter</span>
            </button>

            {/* Tab 4: 360 / 3D Model */}
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === "3d" ? "raw" : "3d");
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current)
                  clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${activeViewTab === "3d"
                ? "bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]"
                : "bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50"
                }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">360° View</span>
            </button>
          </div>
        </div>

        {/* BOTTOM GREEN FOOTER SECTION */}
        <div className="relative w-full z-30 pb-4 sm:pb-6 lg:pb-[1.5vw] px-4 sm:px-8 lg:px-[3.5vw] mt-6 sm:mt-8 lg:mt-[1.2vw]">
          {/* Center Stamp Badge (Positioned over top wave curve with clean clearance above & below) */}
          <div className="w-[150px] hidden lg:block lg:w-[8vw] h-auto absolute -top-[16px] sm:-top-[20px] lg:-top-[2vw] left-1/2 -translate-x-1/2 z-40 drop-shadow-md">
            <Image
              src="/Product/details/section-images/keralas_original-meat.webp"
              alt="Kerala's Original Meat"
              width={170}
              height={110}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Bottom Green Container Row */}
          <div className="relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-[1.5vw] pt-5 sm:pt-6 lg:pt-0">
            {/* 1. Bottom Left Recipe Card (Moved to bottom of section on mobile/tablet) */}
            <div className="relative w-full max-w-[350px] sm:max-w-[420px] lg:max-w-none lg:w-[21.5vw] bg-[#FDFBF2] rounded-2xl lg:rounded-[1vw] shadow-lg border border-white/80 flex items-center gap-3 lg:gap-[0.8vw] p-2.5 sm:p-3 lg:p-0 order-3 lg:order-1">
              {/* Chef Icon Red Circular Badge on top-left corner */}
              <div className="absolute -top-3 -left-3 lg:-top-[0.8vw] lg:left-[0.25vw] lg:top-[0.25vw] w-10 h-10 lg:w-[1.85vw] lg:h-[1.85vw] rounded-full shadow-md flex items-center justify-center z-40">
                <Image
                  src="/Product/details/section-images/chef-icon.svg"
                  alt="Chef Icon"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Recipe Dish Image */}
              <div className="w-20 h-20 lg:w-[9.2vw] lg:h-[7.2vw] rounded-xl lg:rounded-[0] overflow-hidden relative shrink-0 shadow-sm">
                <Image
                  src="/Product/details/bottomCard.webp"
                  alt="Recipe"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text & CTA Button */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs lg:text-[0.85vw] font-bold text-[#E31E24] uppercase font-barlow-condensed tracking-widest leading-none">
                  WHAT'S COOKING?
                </span>
                <h5 className="text-xs lg:text-[0.75vw] font-bold text-black leading-tight font-manrope mt-1 lg:mt-[0.35vw] truncate">
                  Spicy Chicken{" "}
                  {chickenParts[manuallySelectedPartIdx]?.name || "Drumstick"}{" "}
                  Fry
                </h5>
                <p className="text-[10px] lg:text-[0.6vw] font-medium text-slate-900 leading-tight mt-1 lg:mt-[0.2vw] line-clamp-2 max-w-full lg:max-w-[11vw]">
                  A Spicy and flavourful recipe For a perfect family meal.
                </p>

                <Link
                  href={`/recipes?part=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase() || "drumstick"}`}
                  className="mt-2 lg:mt-[0.55vw] bg-[#E31E24] hover:bg-[#c9181d] text-white text-[10px] lg:text-[0.6vw] font-extrabold py-1 lg:py-[0.35vw] px-2.5 lg:px-[0.85vw] rounded-md lg:rounded-[0.4vw] uppercase tracking-wider inline-flex items-center gap-1 lg:gap-[0.3vw] shadow transition-colors w-max"
                >
                  <span>EXPLORE RECIPE</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* 2. Center 4 Feature SVGs directly rendered (Strictly 1 single row) */}
            <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 lg:gap-[1.2vw] shrink-0 mt-0 lg:mt-[1.6vw] order-1 lg:order-2 max-w-full overflow-x-auto no-scrollbar">
              {/* Feature 1 */}
              <img
                src="/Product/details/section-images/farm-fresh.svg"
                alt="Farm Fresh"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />

              {/* Divider */}
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />

              {/* Feature 2 */}
              <img
                src="/Product/details/section-images/hygienic-processing.svg"
                alt="Hygienic Processing"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />

              {/* Divider */}
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />

              {/* Feature 3 */}
              <img
                src="/Product/details/section-images/quality-checked.svg"
                alt="Quality Checked"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />

              {/* Divider */}
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />

              {/* Feature 4 */}
              <img
                src="/Product/details/section-images/ready-natural-taste.svg"
                alt="Ready Natural Taste"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
            </div>

            {/* 3. Right Truck Vector Graphic Banner */}
            <div className="hidden lg:flex items-center justify-center lg:justify-end shrink-0 order-2 lg:order-3 mt-1 sm:mt-2 lg:mt-0">
              <img
                src="/Product/details/section-images/keep-fresh-delivered-fresh.svg"
                alt="Keep Fresh Delivered Fresh"
                className="h-9 sm:h-11 lg:h-[4.75vw] w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Recipes Section */}
      <section
        className={`relative z-20 w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-[4vw] overflow-hidden transition-all duration-700 ${hasSelectedAnyPart && activeMeatType === "chicken"
          ? "block opacity-100 pointer-events-auto"
          : "hidden opacity-0 pointer-events-none"
          }`}
      >
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-[0.6] filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className="w-full space-y-12 relative z-10 recipe-container-wrap">
          {/* Section Header: Title, Description, and Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-10 pb-2">
            {/* Left Column: RECIPES tagline + MEAT MADE DELICIOUS Title */}
            <div className="space-y-2 shrink-0 select-none">
              {/* Tagline */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="flex items-center gap-2"
              >
                <motion.span
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: { scaleX: 1, opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-5 h-[2px] bg-[#8DC541] origin-left"
                />
                <span className="text-[13px] font-bold text-slate-700 tracking-widest uppercase font-manrope inline-flex">
                  {"RECIPES".split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: 3 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.div>

              {/* Title: MEAT MADE DELICIOUS */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.12,
                    },
                  },
                }}
                className="text-5xl md:text-6xl font-bold font-barlow-condensed tracking-wide uppercase leading-[0.95] recipe-title-text"
              >
                <span className="text-[#064823] block">
                  {`${chickenParts[manuallySelectedPartIdx]?.name || "CHICKEN"} RECIPES`
                    .split("")
                    .map((char, charIdx) => (
                      <motion.span
                        key={charIdx}
                        variants={{
                          hidden: { opacity: 0, y: -6 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.05 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                </span>
                <span className="text-[#F7840F] block">
                  {"DELICIOUS.".split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: -6 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>
            </div>

            {/* Vertical Red Divider Line */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block w-[2px] h-[70px] bg-[#F7840F] rounded-full shrink-0"
            />

            {/* Right Column: Paragraph + Filter buttons directly below paragraph */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-between py-1 mt-8 gap-4 md:gap-5"
            >
              <p className="text-[17px] md:text-[18px] font-medium text-slate-700 max-w-[480px] leading-snug font-manrope recipe-desc-text">
                Explore trending{" "}
                {chickenParts[manuallySelectedPartIdx]?.name.toLowerCase() ||
                  "chicken"}{" "}
                recipes in quick, easy &amp; delicious short-form videos.
              </p>

              {/* Filter buttons */}
              <div className="flex gap-3 recipe-filter-btns">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-[#064823] hover:bg-[#0a5e30] text-white text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm"
                >
                  Most Popular
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm"
                >
                  New Recipes
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Recipes Grid (4 Full-Image Cards with Dark Gradient Overlay) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-2 max-[480px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto recipe-grid-wrap">
            {(
              partRecipesMap[
              chickenParts[manuallySelectedPartIdx]?.name
                .toLowerCase()
                .trim() || "breast"
              ] || partRecipesMap["breast"]
            ).map((recipe, idx) => (
              <Link
                href={`/recipes?part=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase().trim() || "breast"}&recipeId=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase().trim() || "breast"}-${idx + 1}&title=${encodeURIComponent(recipe.title)}`}
                key={idx}
                className="block cursor-pointer"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 55 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  initial={isMobile ? { opacity: 0, y: 45 } : undefined}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={
                    isMobile
                      ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      : undefined
                  }
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 35px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-300 group flex flex-col select-none cursor-pointer border border-slate-200/90 ring-1 ring-black/[0.04]"
                >
                  {/* Compact 16:9.5 Image Header */}
                  <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={recipe.img}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top-Left Category Badge Pill */}
                    <span className="absolute top-2.5 left-2.5 z-10 bg-[#d62828] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm pointer-events-none">
                      {recipe.label}
                    </span>
                  </div>

                  {/* Distinct Elevated White Card Body */}
                  <div className="p-3.5 pt-1.5 sm:p-4 sm:pt-2 flex-1 flex flex-col justify-between space-y-1.5 font-inter bg-white">
                    <div className="space-y-0">
                      {/* Recipe Title */}
                      <h3
                        className="text-md sm:text-base font-bold text-black tracking-wide uppercase leading-normal group-hover:text-[#064823] transition-colors line-clamp-2 h-[2.5rem] flex items-center"
                        title={recipe.title}
                      >
                        {recipe.title}
                      </h3>

                      {/* Spec Row (Difficulty, Cooking Time, Servings) */}
                      <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-slate-900 font-manrope pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-1.5">

                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <img
                              src="/Product/recipies/easy.svg"
                              alt="Difficulty"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.diff}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <img
                              src="/Product/recipies/time.svg"
                              alt="Time"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.time}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <Image
                              src="/Product/recipies/servings.png"
                              alt="Servings"
                              fill
                              className="object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-[#F7840F] group-hover:bg-[#e0730b] text-white text-[11px] font-bold py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm group-hover:shadow mt-1">
                      <span>VIEW RECIPE & STEPS →</span>
                    </button>
                  </div>
                </motion.div>





              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Single continuous flying overlay: callout → exact plate position ── */}
      {animatingPart && flyTarget && (
        <motion.div
          key={`fly-${animatingPart.timestamp}`}
          initial={{
            top: animatingPart.startRect.top,
            left: animatingPart.startRect.left,
            width: animatingPart.startRect.width,
            height: animatingPart.startRect.height,
            opacity: 1,
            scale: 0.88,
            rotate: 0,
          }}
          animate={{
            top: flyTarget.top,
            left: flyTarget.left,
            width: flyTarget.width,
            height: flyTarget.height,
            opacity: 1,
            scale: [0.88, 1.1, 1],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 0.82,
            ease: [0.25, 0.1, 0.25, 1],
            scale: {
              duration: 0.82,
              times: [0, 0.45, 1],
              ease: "easeInOut",
            },
            rotate: {
              duration: 0.82,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            },
          }}
          onAnimationComplete={() => {
            // Synchronous handoff: only one image is ever visible at any moment
            setIsLandedInSection2(true);
            setAnimatingPart(null);
            setFlyTarget(null);
          }}
          className="fixed pointer-events-none flex items-center justify-center z-[99999]"
        >
          <img
            src={animatingPart.img}
            alt={animatingPart.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      )}

      {/* Fullscreen Lightbox Modal */}

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white hover:scale-115 active:scale-95 transition-all w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full cursor-pointer"
              aria-label="Close Fullscreen View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            >
              <img
                src={lightboxImage}
                alt="Product Fullscreen Preview"
                className={`object-contain rounded-2xl select-none filter drop-shadow-2xl ${lightboxImage.includes("packedProduct")
                  ? "max-w-full max-h-[85vh]"
                  : "w-[80vw] max-w-[500px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] max-h-[85vh]"
                  }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
