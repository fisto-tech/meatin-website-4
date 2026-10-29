"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

// Types for Pin Outlets
interface OutletInfo {
  id: string;
  city: string;
  malayalam: string;
  address: string;
  phone: string;
  xPercent: number;
  yPercent: number;
}

export default function FranchisePage() {
  // Main Franchise Page Component
  // Map View Mode: 'full' (India Map) | 'kerala' (Kerala State Map)
  const [mapMode, setMapMode] = useState<"full" | "kerala">("full");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPos, setPanPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedOutlet, setSelectedOutlet] = useState<OutletInfo | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Preload both map images immediately at page load to avoid viewport or toggle fetch delays
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img1 = new window.Image();
      img1.src = "/Franchies/india-map-image.webp";
      const img2 = new window.Image();
      img2.src = "/Franchies/kerala-map.webp";
    }
  }, []);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [autoPos, setAutoPos] = useState<{ xPercent: number; yPercent: number; radius: number }>({
    xPercent: 50,
    yPercent: 50,
    radius: 0,
  });
  const heroImageContainerRef = useRef<HTMLDivElement>(null);

  // Auto-demonstration animation when user is not hovering over hero image
  useEffect(() => {
    if (isHovered) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Smooth expansion of spotlight radius up to 100px over 900ms
      const targetRadius = 100;
      const radiusProgress = Math.min(elapsed / 900, 1);
      const currentRadius = targetRadius * (1 - Math.pow(1 - radiusProgress, 3));

      // Organic glide movement across the storefront image
      const moveElapsed = Math.max(0, elapsed - 300);
      const xPercent = 50 + Math.sin(moveElapsed * 0.0014) * 22; // moves smoothly between 28% and 72%
      const yPercent = 50 + Math.sin(moveElapsed * 0.0022) * 12; // moves smoothly between 38% and 62%

      setAutoPos({
        xPercent,
        yPercent,
        radius: currentRadius,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageContainerRef.current) return;
    const rect = heroImageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    if (!isHovered) setIsHovered(true);
  };

  const handleHeroMouseEnter = () => {
    setIsHovered(true);
  };

  const handleHeroMouseLeave = () => {
    setMousePos(null);
    setIsHovered(false);
  };

  // Ref for Map Container Column & Popup Card
  const mapRightColRef = useRef<HTMLDivElement>(null);
  const popupCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close tooltip popup card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedOutlet &&
        popupCardRef.current &&
        !popupCardRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-pin-element='true']")) {
          setSelectedOutlet(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOutlet]);

  // Ctrl + Mouse Wheel Zoom Handler (Only zooms map canvas when Ctrl/Cmd is held down)
  useEffect(() => {
    const mapContainer = mapRightColRef.current;
    if (!mapContainer) return;

    const handleWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.12 : -0.12;
        setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 2.2));
      }
    };

    mapContainer.addEventListener("wheel", handleWheelZoom, { passive: false });
    return () => {
      mapContainer.removeEventListener("wheel", handleWheelZoom);
    };
  }, []);

  // India Map Hotspot Outlets
  const indiaOutlets: OutletInfo[] = [
    {
      id: "kerala",
      city: "Kerala",
      malayalam: "കേരളം",
      address:
        "MEATiN Regional Head Office, Panchami Complex, Thrissur - 680519",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 78.0,
    },
    {
      id: "bengaluru",
      city: "Bengaluru",
      malayalam: "ബെംഗളൂരു",
      address:
        "MEATiN Express Outlet, Indiranagar, Bengaluru, Karnataka - 560038",
      phone: "+91 99466 16162",
      xPercent: 51.0,
      yPercent: 68.0,
    },
    {
      id: "mumbai",
      city: "Mumbai",
      malayalam: "മുംബൈ",
      address: "MEATiN Store, Bandra West, Mumbai, Maharashtra - 400050",
      phone: "+91 99466 16162",
      xPercent: 38.0,
      yPercent: 57.0,
    },
    {
      id: "hyderabad",
      city: "Hyderabad",
      malayalam: "ഹൈദരാബാദ്",
      address: "MEATiN Fresh Hub, Jubilee Hills, Hyderabad, Telangana - 500033",
      phone: "+91 99466 16162",
      xPercent: 50.0,
      yPercent: 61.0,
    },
    {
      id: "kolkata",
      city: "Kolkata",
      malayalam: "കൊൽക്കത്ത",
      address:
        "MEATiN Store, Salt Lake Sector 5, Kolkata, West Bengal - 700091",
      phone: "+91 99466 16162",
      xPercent: 69.0,
      yPercent: 48.0,
    },
    {
      id: "lucknow",
      city: "Lucknow",
      malayalam: "ലക്നൗ",
      address: "MEATiN Store, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
      phone: "+91 99466 16162",
      xPercent: 55.0,
      yPercent: 37.0,
    },
    {
      id: "delhi",
      city: "Delhi",
      malayalam: "ഡൽഹി",
      address: "MEATiN Prime Hub, Connaught Place, New Delhi - 110001",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 30.0,
    },
  ];

  // Kerala Map Hotspot Outlets
  const keralaOutlets: OutletInfo[] = [

    {
      id: "kannur",
      city: "Kannur",
      malayalam: "കണ്ണൂർ",
      address: "MEATiN Outlet, City Centre Complex, Fort Road, Kannur - 670001",
      phone: "+91 99466 16162",
      xPercent: 25.0,
      yPercent: 10.0,
    },
    {
      id: "kozhikode",
      city: "Kozhikode",
      malayalam: "കോഴിക്കോട്",
      address: "MEATiN Outlet, Focus Mall Road, Kozhikode - 673004",
      phone: "+91 99466 16162",
      xPercent: 38.0,
      yPercent: 29.0,
    },
    {
      id: "malappuram",
      city: "Malappuram",
      malayalam: "മലപ്പുറം",
      address: "MEATiN Hub, Calicut Road, Malappuram - 676505",
      phone: "+91 99466 16162",
      xPercent: 50.0,
      yPercent: 38.0,
    },
    {
      id: "thrissur",
      city: "Thrissur",
      malayalam: "തൃശ്ശൂർ",
      address: "MEATiN Flagship Store, Perumpilavu, Thrissur - 680519",
      phone: "+91 99466 16162",
      xPercent: 36.0,
      yPercent: 30.0,
    },
    {
      id: "ernakulam",
      city: "Ernakulam",
      malayalam: "എറണാകുളം",
      address: "MEATiN Prime Outlet, MG Road, Ernakulam - 682016",
      phone: "+91 99466 16162",
      xPercent: 38.0,
      yPercent: 37.0,
    },
    {
      id: "kottayam",
      city: "Kottayam",
      malayalam: "കോട്ടയം",
      address: "MEATiN Store, KK Road, Kottayam - 686001",
      phone: "+91 99466 16162",
      xPercent: 40.0,
      yPercent: 44.0,
    },
    {
      id: "alappuzha",
      city: "Alappuzha",
      malayalam: "ആലപ്പുഴ",
      address: "MEATiN Fresh Hub, Boat Jetty Road, Alappuzha - 688001",
      phone: "+91 99466 16162",
      xPercent: 44.0,
      yPercent: 51.0,
    },
    {
      id: "kollam",
      city: "Kollam",
      malayalam: "കൊല്ലം",
      address: "MEATiN Outlet, Chinnakada, Kollam - 691001",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 62.0,
    },
    {
      id: "kochi",
      city: "Kochi",
      malayalam: "കൊച്ചി",
      address: "MEATiN Express Hub, Marine Drive, Kochi - 682031",
      phone: "+91 99466 16162",
      xPercent: 49.0,
      yPercent: 69.0,
    },
    {
      id: "thiruvananthapuram",
      city: "Thiruvananthapuram",
      malayalam: "തിരുവനന്തപുരം",
      address:
        "MEATiN Main Outlet, MG Road, Statue, Thiruvananthapuram - 695001",
      phone: "+91 99466 16162",
      xPercent: 56.0,
      yPercent: 80.0,
    },
  ];

  const activeOutlets = mapMode === "full" ? [] : keralaOutlets;

  // Zoom & Pan Handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPos({ x: 0, y: 0 });
    setSelectedOutlet(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-slate-800 font-manrope selection:bg-[#8DC541] selection:text-white overflow-x-clip pt-0">
      {/* Hidden Eager Preloader for Map Images (Instant load at page mount) */}
      <div className="hidden" aria-hidden="true">
        <Image
          src="/Franchies/india-map-image.webp"
          alt="Preload India Map"
          width={888}
          height={982}
          priority
          loading="eager"
        />
        <Image
          src="/Franchies/kerala-map.webp"
          alt="Preload Kerala Map"
          width={888}
          height={982}
          priority
          loading="eager"
        />
      </div>
      {/* ============================================================ */}
      {/* SECTION 1: HERO & STORE SHOWCASE (EXACT MATCH TO DESIGN) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[auto] lg:min-h-[calc(100vh-50px)] pt-[88px] sm:pt-[94px] lg:pt-[108px] xl:pt-[115px] pb-4 sm:pb-6 lg:pb-8 px-2 sm:px-4 lg:px-6 xl:px-8 bg-slate-900 overflow-x-hidden overflow-y-visible select-none flex flex-col items-center justify-between">
        {/* Background Image: franchise-bg-new.webp */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/Franchies/franchise-bg-new.webp"
            alt="Franchise Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="w-full relative z-10 flex-1 flex flex-col items-center justify-between max-w-[1780px] mx-auto">
          {/* Header Title Block (Matching Reference Image) */}
          <div className="text-center shrink-0 mt-0.5 lg:mt-2 py-0 z-20 relative w-full">
            {/* Top Right Script Slogan: Good Meat Brighter Communities */}
            <div className="absolute right-2 sm:right-6 lg:right-10 xl:right-14 2xl:right-16 top-0 hidden sm:block w-16 sm:w-20 md:w-28 lg:w-32 xl:w-36 h-auto">
              <Image
                src="/Franchies/good-meat-brigher-communities.webp"
                alt="Good Meat Brighter Communities"
                width={200}
                height={150}
                className="w-full h-auto object-contain drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
              />
            </div>

            {/* Subtitle: — GROWTH WITH — */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-2.5 text-[10px] sm:text-[11px] lg:text-[12px] xl:text-[13px] font-extrabold text-[#0B3C2A] tracking-[0.2em] uppercase font-manrope"
            >
              <span className="w-5 sm:w-8 h-[2px] bg-[#E58E26] rounded-full" />
              GROWTH WITH
              <span className="w-5 sm:w-8 h-[2px] bg-[#E58E26] rounded-full" />
            </motion.div>

            {/* Main Brand Title: MEATiN */}
            <h1 className="flex items-center justify-center mt-1 mb-0.5">
              <Image
                src="/Franchies/meatin-logo-text.webp"
                alt="MEATiN"
                width={300}
                height={90}
                className="w-auto h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 object-contain"
                priority
              />
            </h1>

            {/* Subtitle below MEATiN: A HEALTHIER TOMORROW TOGETHER */}
            <p className="text-[#0B3C2A] font-black uppercase tracking-[0.22em] text-[9.5px] sm:text-[11px] lg:text-[11.5px] xl:text-[12.5px] mt-0.5 font-manrope drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
              A HEALTHIER TOMORROW TOGETHER
            </p>
          </div>

          {/* Feature Showcase Container */}
          <div className="relative w-full flex-1 max-w-[1720px] mx-auto flex items-end justify-center z-20 mb-1 lg:mb-0 mt-1 lg:mt-2">

            {/* Center Interactive Storefront Spotlight Showcase */}
            <motion.div
              ref={heroImageContainerRef}
              onMouseEnter={handleHeroMouseEnter}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-[95%] sm:w-[88%] md:w-[80%] lg:w-[48%] xl:w-[56%] 2xl:w-[60%] max-w-[500px] sm:max-w-[600px] lg:max-w-[680px] xl:max-w-[1040px] 2xl:max-w-[1220px] h-auto z-20 mx-auto cursor-default lg:cursor-crosshair rounded-2xl select-none flex items-end justify-center"
            >
              {/* Mobile / Tablet View (Clean Display) */}
              <div className="block lg:hidden relative w-full h-auto">
                <Image
                  src="/Franchies/hero-main-image.webp"
                  alt="MEATiN Outlet Storefront"
                  width={1120}
                  height={880}
                  priority
                  className="w-full h-auto object-contain block drop-shadow-xl"
                />
              </div>

              {/* Desktop View (Interactive Spotlight Lens Cursor Reveal) */}
              <div className="hidden lg:block relative w-full h-auto">
                {/* Layer 1 (Base): Store Exterior Facade */}
                <Image
                  src="/Franchies/hero-overlay-image.webp"
                  alt="MEATiN Store Exterior Facade"
                  width={1120}
                  height={880}
                  priority
                  className="w-full h-auto object-contain block pointer-events-none"
                />

                {/* Layer 2 (Spotlight Lens Reveal): Store Interior */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none transition-[clip-path] duration-75 ease-out"
                  style={{
                    clipPath: isHovered && mousePos
                      ? `circle(130px at ${mousePos.x}px ${mousePos.y}px)`
                      : `circle(${autoPos.radius * 1.1}px at ${autoPos.xPercent}% ${autoPos.yPercent}%)`,
                    WebkitClipPath: isHovered && mousePos
                      ? `circle(130px at ${mousePos.x}px ${mousePos.y}px)`
                      : `circle(${autoPos.radius * 1.1}px at ${autoPos.xPercent}% ${autoPos.yPercent}%)`,
                  }}
                >
                  <Image
                    src="/Franchies/hero-main-image.webp"
                    alt="MEATiN Main Outlet Interior Storefront"
                    width={920}
                    height={720}
                    priority
                    className="w-full h-auto object-contain block"
                  />
                </div>

                {/* Glowing ring edge around spotlight lens */}
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-white/90 shadow-[0_0_30px_rgba(255,255,255,0.95)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                  style={{
                    left: isHovered && mousePos ? `${mousePos.x}px` : `${autoPos.xPercent}%`,
                    top: isHovered && mousePos ? `${mousePos.y}px` : `${autoPos.yPercent}%`,
                    width: isHovered ? '260px' : `${autoPos.radius * 2.2}px`,
                    height: isHovered ? '260px' : `${autoPos.radius * 2.2}px`,
                    opacity: (!isHovered && autoPos.radius < 5) ? 0 : 1,
                  }}
                />

                {/* Interactive Hint Badge (Visible when not hovering) */}
                <AnimatePresence>
                  {!isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-xl pointer-events-none"
                    >
                      <Icon icon="ph:cursor-click-duotone" className="w-3.5 h-3.5 text-[#8DC541] animate-bounce" />
                      <span className="tracking-wide">Hover over with cursor to reveal the store</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* LEFT 3 FEATURE BADGES WITH DYNAMIC CONNECTOR LINES (01, 02, 03) */}
            <div className="absolute left-1 lg:left-3 xl:left-6 top-1 bottom-1 lg:top-2 lg:bottom-2 z-30 pointer-events-none hidden lg:flex flex-col justify-between w-[calc(50%-24.5%)] xl:w-[calc(50%-28.5%)] 2xl:w-[calc(50%-30.5%)]">
              {/* Feature 01: HYGIENIC PROCESSING */}
              <div className="flex items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:microscope-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      01
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      HYGIENIC<br />PROCESSING
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Processed under strict hygiene standards.
                    </p>
                  </div>
                </motion.div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Feature 02: PREMIUM QUALITY */}
              <div className="flex items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:shield-check-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      02
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      PREMIUM<br />QUALITY
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Handpicked for superior freshness.
                    </p>
                  </div>
                </motion.div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Feature 03: FARM FRESH */}
              <div className="flex items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:house-line-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      03
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      FARM FRESH
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Sourced from trusted local farms.
                    </p>
                  </div>
                </motion.div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>
              </div>
            </div>

            {/* RIGHT 3 FEATURE BADGES WITH DYNAMIC CONNECTOR LINES (04, 05, 06) */}
            <div className="absolute right-1 lg:right-3 xl:right-6 top-1 bottom-1 lg:top-2 lg:bottom-2 z-30 pointer-events-none hidden lg:flex flex-col justify-between w-[calc(50%-24.5%)] xl:w-[calc(50%-28.5%)] 2xl:w-[calc(50%-30.5%)]">
              {/* Feature 04: NO ARTIFICIAL ADDITIVES */}
              <div className="flex items-center justify-end w-full">
                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:leaf-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      04
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      NO ARTIFICIAL<br />ADDITIVES
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Free from artificial preservatives.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Feature 05: FRESHNESS GUARANTEED */}
              <div className="flex items-center justify-end w-full">
                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:package-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      05
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      FRESHNESS<br />GUARANTEED
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Packed to lock in freshness.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Feature 06: FAST DELIVERY */}
              <div className="flex items-center justify-end w-full">
                {/* Red Dot on Store Wall */}
                <div className="relative shrink-0 flex items-center justify-center pointer-events-auto">
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-[#D93829]"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D93829] border-2 border-white shadow-md" />
                </div>

                {/* Dynamic Horizontal Connector Line */}
                <div className="flex-1 h-0 border-b-[2.5px] border-dashed border-white opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] my-auto mx-1 lg:mx-1.5" />

                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 bg-[#FDFBF7]/95 hover:bg-white backdrop-blur-md border border-slate-200/90 p-2 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl lg:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_22px_rgba(11,60,42,0.12)] transition-all duration-300 w-[165px] lg:w-[170px] xl:w-[230px] 2xl:w-[275px] shrink-0 pointer-events-auto"
                >
                  <div className="w-8 h-8 lg:w-8.5 lg:h-8.5 xl:w-11 xl:h-11 2xl:w-[50px] 2xl:h-[50px] rounded-full bg-[#0B3C2A] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon icon="ph:truck-bold" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7" />
                  </div>
                  <div className="flex flex-col items-start text-left min-w-0">
                    <span className="text-xs lg:text-xs xl:text-sm 2xl:text-base font-black text-[#D93829] font-manrope leading-none block">
                      06
                    </span>
                    <div className="w-3.5 lg:w-4 xl:w-5 h-[2px] bg-[#D93829] my-0.5 rounded-full" />
                    <h3 className="text-[10px] lg:text-[10.5px] xl:text-[12.5px] 2xl:text-[14.5px] font-extrabold text-[#0B3C2A] uppercase tracking-wider font-manrope leading-tight">
                      FAST<br />DELIVERY
                    </h3>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] 2xl:text-[11.5px] text-slate-600 leading-tight mt-0.5 font-medium font-manrope">
                      Fresh meat delivered to your doorstep.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Premium Glassmorphic Mobile Grid Layout for 6 Features (Below 1024px) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 mt-4 lg:hidden w-full px-1 sm:px-3">
            {
              [
                {
                  num: "01",
                  title: "HYGIENIC PROCESSING",
                  desc: "Processed under strict hygiene standards.",
                  icon: "ph:microscope",
                },
                {
                  num: "02",
                  title: "PREMIUM QUALITY",
                  desc: "Handpicked for superior freshness.",
                  icon: "ph:shield-check",
                },
                {
                  num: "03",
                  title: "FARM FRESH",
                  desc: "Sourced from trusted local farms.",
                  icon: "ph:plant",
                },
                {
                  num: "04",
                  title: "NO ARTIFICIAL ADDITIVES",
                  desc: "Free from artificial preservatives.",
                  icon: "ph:leaf",
                },
                {
                  num: "05",
                  title: "FRESHNESS GUARANTEED",
                  desc: "Packed to lock in freshness.",
                  icon: "ph:package",
                },
                {
                  num: "06",
                  title: "FAST DELIVERY",
                  desc: "Fresh meat delivered to your doorstep.",
                  icon: "ph:truck",
                },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group relative bg-white/95 backdrop-blur-md border border-slate-200/90 p-3.5 sm:p-4 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(6,72,35,0.12)] flex flex-col justify-between items-start gap-2.5 transition-all duration-300 overflow-hidden active:scale-[0.98]"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064823]/10 border border-[#8DC541]/30 flex items-center justify-center text-[#064823] group-hover:bg-[#064823] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon icon={feat.icon} className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 text-[11px] font-black text-[#F7840F] bg-[#F7840F]/10 rounded-full border border-[#F7840F]/20 font-manrope">
                      {feat.num}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#064823] uppercase font-manrope tracking-wider leading-tight mt-0.5 group-hover:text-[#064823] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-1 font-semibold font-manrope">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: INTERACTIVE PRESENCE MAP (EXACT MATCH TO DESIGN) */}
      {/* ============================================================ */}
      <section className="relative w-full pt-8 sm:pt-12 lg:pt-14 xl:pt-16 pb-24 sm:pb-32 lg:pb-36 xl:pb-40 2xl:pb-44 flex flex-col justify-between bg-[#EFF2EB] overflow-x-clip select-none" >
            {/* background image layer absolute */}
            <div className="absolute top-0 left-0 w-full h-full z-10 opacity-[0.5]">
              <Image
                src="/Franchies/bg-pattern-layer.webp"
                alt="bg-pattern-layer"
                fill
                className="object-cover"
              />
            </div>
        {/* Content Wrapper */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 flex-1 flex flex-col justify-center relative z-30 max-w-[1800px] mx-auto">
          {/* Flexbox Layout: Left Content Container & Right Map/Image Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 w-full my-auto">
            {/* LEFT CONTAINER (lg:w-[42%]): Header Title, Red Underline & Stat Cards */}
            <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-start space-y-3 sm:space-y-6 lg:space-y-8 shrink-0">
              {/* Header Title + Red Underline + Subtitle */}
              <div className="space-y-1.5 sm:space-y-3">
                {/* Real Letter-by-Letter Typewriter Animation for Heading */}
                <div>
                  <h2 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[68px] font-bold font-barlow-condensed tracking-wide uppercase leading-none text-[#064823]">
                    <div className="block">
                      {Array.from("OUR PRESENCE ACROSS").map((char, index) => (
                        <motion.span
                          key={`green-${index}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.04, delay: index * 0.055 }}
                          className="inline"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                    <div className="block text-[#F7840F] mt-0.5 sm:mt-1">
                      {Array.from("KERALA").map((char, index) => (
                        <motion.span
                          key={`kerala-${index}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.04, delay: 1.05 + index * 0.07 }}
                          className="inline"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-12 sm:w-16 h-[2.5px] sm:h-[3px] bg-[#F7840F] rounded-full origin-left"
                />

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[11.5px] sm:text-[14px] lg:text-[16px] font-medium text-slate-700 leading-snug sm:leading-relaxed font-manrope max-w-sm pt-0.5"
                >
                  Building a stronger network to serve you better with freshness
                  and trust across the state.
                </motion.p>
              </div>

              {/* 3 Stat Cards arranged Side-by-Side in a Row (Mobile Compact Grid) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3.5 max-w-lg w-full mb-4 sm:mb-6 lg:mb-8">
                {/* Card 1: Stores */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="proicons:location"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#F7840F] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#F7840F] font-barlow-condensed leading-none block">
                      100+
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      STORES
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Across Kerala
                    </span>
                  </div>
                </motion.div>

                {/* Card 2: Districts */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.70 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="griddy-icons:building"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#F7840F] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#F7840F] font-barlow-condensed leading-none block">
                      14
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      DISTRICTS
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Strong Presence
                    </span>
                  </div>
                </motion.div>

                {/* Card 3: Team Members */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="ion:people-outline"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#F7840F] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#F7840F] font-barlow-condensed leading-none block">
                      500+
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      TEAM MEMBERS
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Serving with Pride
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTAINER (lg:w-[54%]): Map Display & Right Side Elements (Fade in from Right Side) */}
            <motion.div
              ref={mapRightColRef}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="w-full lg:w-[54%] xl:w-[52%] relative z-20 h-[340px] sm:h-[460px] lg:h-[480px] xl:h-[540px] 2xl:h-[580px] [@media(max-height:720px)]:lg:h-[410px] flex items-center justify-center shrink-0 mt-1 sm:mt-0 bg-transparent overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              {/* Dark Green Zoom Controls Pill (Top Right, mobile horizontal / desktop vertical) */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-4 z-40 bg-[#064823] text-white p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl shadow-xl flex flex-row sm:flex-col items-center gap-2 sm:gap-2.5 font-manrope text-[9px] sm:text-[11px]">
                {/* Back Button (Shown ONLY when viewing Kerala District Map) */}
                {mapMode === "kerala" && (
                  <button
                    onClick={() => {
                      setMapMode("full");
                      setPanPos({ x: 0, y: 0 });
                      setSelectedOutlet(null);
                    }}
                    className="flex flex-col sm:flex-col items-center gap-0.5 text-[#8DC541] hover:text-white transition-colors cursor-pointer border-r sm:border-r-0 sm:border-b border-white/15 pr-2 sm:pr-0 sm:pb-2 w-auto sm:w-full"
                    title="Back to India Map"
                  >
                    <Icon icon="ph:arrow-left-bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-bold">Back</span>
                  </button>
                )}

                <button
                  onClick={handleZoomIn}
                  className="flex flex-col items-center gap-0.5 hover:text-[#8DC541] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <Icon
                    icon="ph:magnifying-glass-plus-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Zoom In</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex flex-col items-center gap-0.5 hover:text-[#8DC541] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <Icon
                    icon="ph:magnifying-glass-minus-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Zoom Out</span>
                </button>
                <button
                  onClick={handleResetZoom}
                  className="flex flex-col items-center gap-0.5 hover:text-[#8DC541] transition-colors cursor-pointer"
                  title="Reset View & Position"
                >
                  <Icon
                    icon="ph:arrow-counter-clockwise-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Reset</span>
                </button>
                <span className="text-[8px] text-[#8DC541] font-semibold text-center opacity-85 pt-1 border-t border-white/10 hidden sm:block leading-tight select-none">
                  Ctrl + Scroll
                </span>
              </div>

              {/* Draggable Map Canvas Container with Smooth Zoom & Pan */}
              <motion.div
                drag
                dragConstraints={{
                  left: -280 * zoomLevel,
                  right: 280 * zoomLevel,
                  top: -220 * zoomLevel,
                  bottom: 220 * zoomLevel,
                }}
                dragElastic={0.08}
                animate={{
                  x: panPos.x,
                  y: panPos.y,
                  scale: zoomLevel * (mapMode === "kerala" ? (typeof window !== "undefined" && window.innerWidth < 640 ? 0.72 : 0.85) : (typeof window !== "undefined" && window.innerWidth < 640 ? 0.95 : 1.12)),
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onDragEnd={(_, info) => {
                  setPanPos((prev) => ({
                    x: prev.x + info.offset.x,
                    y: prev.y + info.offset.y,
                  }));
                }}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing origin-center touch-none select-none"
              >
                {/* 3D Map WebP Illustration with AnimatePresence Mode Toggle Animation */}
                <div className="relative h-full w-auto aspect-[888/982] max-w-full translate-x-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mapMode}
                      initial={{ opacity: 0, scale: 0.9, rotate: mapMode === "kerala" ? -2 : 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={
                          mapMode === "full"
                            ? "/Franchies/india-map-image.webp"
                            : "/Franchies/kerala-map.webp"
                        }
                        alt={
                          mapMode === "full"
                            ? "3D India Map"
                            : "3D Kerala State Map"
                        }
                        fill
                        priority
                        loading="eager"
                        draggable={false}
                        className="object-contain select-none pointer-events-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* INVISIBLE CLICKABLE HOTSPOTS OVER SVG BUILT-IN PINS */}
                  {activeOutlets.map((outlet) => {
                    const isSelected = selectedOutlet?.id === outlet.id;

                    return (
                      <div
                        key={outlet.id}
                        data-pin-element="true"
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group w-12 h-12 flex items-center justify-center"
                        style={{
                          left: `${outlet.xPercent}%`,
                          top: `${outlet.yPercent}%`,
                        }}
                        onClick={() => {
                          if (mapMode === "full" && outlet.id === "kerala") {
                            setMapMode("kerala");
                            setSelectedOutlet(null);
                          } else {
                            setSelectedOutlet(outlet);
                          }
                        }}
                        title={`Click to view ${outlet.city} outlet details`}
                      >
                        <div className="w-full h-full" />
                      </div>
                    );
                  })}

                  {/* CLICKABLE OVERLAY DIRECTLY OVER GREEN KERALA STATE SHAPE */}
                  {mapMode === "full" && (
                    <div
                      className="absolute z-30 cursor-pointer group pointer-events-auto"
                      style={{
                        left: "22.5%",
                        top: "62%",
                        width: "9%",
                        height: "26%",
                        transform: "rotate(-22deg)",
                      }}
                      onClick={() => {
                        setMapMode("kerala");
                        setSelectedOutlet(null);
                      }}
                      title="Click to open Kerala District Map"
                    />
                  )}

                  {/* KERALA RED PIN + GREEN TAG OVERLAY WITH ANIMATED PULSE & POP ENTRANCE */}
                  {mapMode === "full" && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: [1, 1.25, 1], opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 },
                        opacity: { duration: 0.3, delay: 0.5 },
                      }}
                      className="absolute z-40 cursor-pointer flex items-center select-none pointer-events-auto"
                      style={{
                        left: "23.2%",
                        top: "75%",
                        transform: "translate(-45%, -95%)",
                      }}
                      onClick={() => {
                        setMapMode("kerala");
                        setSelectedOutlet(null);
                      }}
                      title="Click to explore Kerala District Map"
                    >
                      {/* Red Location Pin with Centered Compact Red Glow Pulse */}
                      <div className="relative flex items-center justify-center shrink-0">
                        {/* Compact Red Glow Ring Centered Directly Around Pin */}
                        <span className="absolute inset-0 m-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF3B30]/60 animate-ping pointer-events-none z-0" />
                        <span className="absolute inset-0 m-auto w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF3B30]/30 animate-pulse pointer-events-none z-0" />

                        {/* Location Pin WebP Icon */}
                        <div className="relative w-[22px] sm:w-[26px] lg:w-[30px] xl:w-[34px] h-[28px] sm:h-[33px] lg:h-[38px] xl:h-[43px] shrink-0 drop-shadow-lg z-10">
                          <Image
                            src="/Franchies/marker-image.webp"
                            alt="Pin Marker"
                            fill
                            draggable={false}
                            className="object-contain relative z-10 pointer-events-none"
                          />
                        </div>
                      </div>

                      {/* Dark Green "Kerala" Tag Label Pill with White Border */}
                      <div className="-ml-1 bg-gradient-to-r from-[#063B16] via-[#0B4D1E] to-[#136127] text-white px-2 sm:px-2.5 py-[1px] rounded-r-xl rounded-l-sm border-[1.5px] border-white shadow-lg flex items-center justify-center font-bold font-manrope text-[8.5px] sm:text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-wide whitespace-nowrap">
                        <span>Kerala</span>
                      </div>
                    </motion.div>
                  )}

                  {/* KERALA DISTRICT PINS WITH DARK GREEN TAG PILLS (ANIMATE ONE BY ONE AFTER MAP LOADS) */}
                  {mapMode === "kerala" &&
                    keralaOutlets
                      .filter((outlet) =>
                        [
                          "kannur",
                          "thrissur",
                          "ernakulam",
                          "kottayam",
                          "alappuzha",
                          "kollam",
                          "kochi",
                          "thiruvananthapuram",
                        ].includes(outlet.id)
                      )
                      .map((outlet, tagIdx) => {
                        const isSelected = selectedOutlet?.id === outlet.id;

                        return (
                          <motion.div
                            key={`kerala-pin-${outlet.id}`}
                            data-pin-element="true"
                            initial={{ scale: 0, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.5 + tagIdx * 0.08,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            whileHover={{ scale: 1.12 }}
                            className="absolute z-40 cursor-pointer flex items-center select-none"
                            style={{
                              left: `${outlet.xPercent}%`,
                              top: `${outlet.yPercent}%`,
                              transform: "translate(-8px, -100%)",
                            }}
                            onClick={() => setSelectedOutlet(outlet)}
                            title={`Click to view ${outlet.city} details`}
                          >
                            {/* Red Location Pin with Centered Glow Ring when Selected */}
                            <div className="relative flex items-center justify-center shrink-0">
                              {isSelected && (
                                <>
                                  <span className="absolute inset-0 m-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF3B30]/60 animate-ping pointer-events-none z-0" />
                                  <span className="absolute inset-0 m-auto w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF3B30]/35 animate-pulse pointer-events-none z-0" />
                                </>
                              )}

                              {/* Location Pin WebP Icon */}
                              <div className="relative w-[16px] sm:w-[18px] md:w-[20px] lg:w-[22px] xl:w-[24px] 2xl:w-[26px] h-[20px] sm:h-[22px] md:h-[25px] lg:h-[28px] xl:h-[30px] 2xl:h-[33px] shrink-0 drop-shadow-lg z-10">
                                <Image
                                  src="/Franchies/marker-image.webp"
                                  alt="Pin Marker"
                                  fill
                                  draggable={false}
                                  className="object-contain relative z-10 pointer-events-none"
                                />
                              </div>
                            </div>

                            {/* Dark Green Tag Label Pill */}
                            <div
                              className={`-ml-1 bg-gradient-to-r from-[#043312] via-[#0B4D1E] to-[#125D25] text-white px-1.5 sm:px-2 py-[1px] rounded-r-lg sm:rounded-r-xl rounded-l-sm border-[1px] sm:border-[1.5px] border-white shadow-lg flex items-center justify-center font-bold font-manrope text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] 2xl:text-[11px] tracking-wide whitespace-nowrap transition-transform duration-300 ${isSelected
                                ? "scale-110 border-yellow-300 ring-2 ring-yellow-400/50"
                                : ""
                                }`}
                            >
                              <span>{outlet.city}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                </div>
              </motion.div>

              {/* POPUP INFO CARD OVERLAY (PLACED INSIDE mapRightColRef FOR 100% FULL MOBILE VISIBILITY) */}
              <AnimatePresence>
                {selectedOutlet && (
                  <motion.div
                    ref={popupCardRef}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-[9999] isolate bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl w-[calc(100%-36px)] max-w-[300px] lg:w-[310px] pointer-events-auto"
                    style={{
                      left: isMobile
                        ? "18px"
                        : `${Math.min(Math.max(selectedOutlet.xPercent, 28), 65)}%`,
                      top: isMobile
                        ? `${selectedOutlet.yPercent > 55 ? "38%" : "44%"}`
                        : `${selectedOutlet.yPercent > 55 ? Math.max(selectedOutlet.yPercent - 32, 18) : Math.min(Math.max(selectedOutlet.yPercent - 12, 15), 45)}%`,
                      transform: isMobile ? "translate(0, -100%)" : "translate(-50%, -100%)",
                    }}
                  >
                    {/* Red Dashed Line connecting card to pin */}
                    <svg
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-6 h-7 pointer-events-none"
                      viewBox="0 0 24 28"
                    >
                      <path
                        d="M12 0 L12 28"
                        stroke="#F7840F"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                    </svg>

                    {/* Popup Header with Close Button */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-wide font-barlow-condensed leading-none">
                          {selectedOutlet.city}
                        </h3>
                        <span className="text-sm font-medium text-slate-500 font-manrope block mt-0.5">
                          {selectedOutlet.malayalam}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedOutlet(null)}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 text-sm font-bold"
                        title="Close Card"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Popup Content: Address & Phone */}
                    <div className="space-y-3 text-[12px] lg:text-[13px] text-slate-700 font-manrope">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon
                            icon="ph:map-pin-fill"
                            className="w-4 h-4 text-[#F7840F]"
                          />
                        </div>
                        <p className="leading-snug text-slate-700 font-medium">
                          {selectedOutlet.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="w-5 h-5 rounded-full bg-[#EBF3EC] flex items-center justify-center shrink-0">
                          <svg
                            className="w-3.5 h-3.5 text-[#064823]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <span className="font-bold text-slate-900 tracking-wide font-manrope">
                          {selectedOutlet.phone}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* UNIFIED BOTTOM GRAPHICS ASSEMBLY: Bottom Slope Wave + Truck + Mascot Character (Flush to bottom-0) */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[90px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[185px] pointer-events-none select-none shrink-0 z-30">

          {/* 1. Bottom Slope Wave Background Transition (#064823 & #488E40 Brand Green Variant) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
            <svg
              className="w-full h-full object-cover object-bottom"
              viewBox="0 0 1440 185"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="slopeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#488E40" />
                  <stop offset="45%" stopColor="#327A33" />
                  <stop offset="100%" stopColor="#488E40" />
                </linearGradient>
                <linearGradient id="slopeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#287435" />
                  <stop offset="50%" stopColor="#1B602A" />
                  <stop offset="100%" stopColor="#0D5028" />
                </linearGradient>
                <linearGradient id="slopeGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#064823" />
                  <stop offset="50%" stopColor="#0B562B" />
                  <stop offset="100%" stopColor="#064823" />
                </linearGradient>
              </defs>

              {/* Wave 1: Topmost lighter green curve (#488E40 variant) */}
              <path
                d="M 0 55 Q 380 135 740 105 Q 1100 75 1440 25 L 1440 185 L 0 185 Z"
                fill="url(#slopeGrad1)"
                opacity="0.9"
              />

              {/* Wave 2: Middle green curve */}
              <path
                d="M 0 88 Q 390 152 770 122 Q 1130 92 1440 48 L 1440 185 L 0 185 Z"
                fill="url(#slopeGrad2)"
                opacity="0.95"
              />

              {/* Wave 3: Dark green base (#064823 variant) */}
              <path
                d="M 0 120 Q 400 170 800 140 Q 1160 110 1440 72 L 1440 185 L 0 185 Z"
                fill="url(#slopeGrad3)"
              />
            </svg>
          </div>

          {/* 2. 3D Green Delivery Truck (Positioned flush on bottom slope wave) */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="absolute bottom-0 sm:bottom-1 left-0 z-20 pointer-events-none w-[185px] min-[420px]:w-[220px] sm:w-[270px] md:w-[320px] lg:w-[305px] xl:w-[355px] 2xl:w-[425px] [@media(min-width:1800px)]:w-[475px]"
          >
            <Image
              src="/Franchies/franchise-truck-image.webp"
              alt="MEATiN Delivery Truck"
              width={520}
              height={350}
              priority
              className="w-full h-auto object-contain object-bottom drop-shadow-xl"
            />
          </motion.div>

          {/* 3. 3D Mascot Character (Chicken standing in bottom right corner over bottom slope) */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute bottom-0 sm:bottom-1 right-1 sm:right-2 md:right-4 lg:right-6 xl:right-10 z-20 pointer-events-none w-[75px] min-[420px]:w-[90px] sm:w-[110px] md:w-[130px] lg:w-[145px] xl:w-[165px]"
          >
            <Image
              src="/Franchies/chicken.webp"
              alt="MEATiN Chicken Mascot"
              width={400}
              height={500}
              priority
              className="w-full h-auto object-contain object-bottom drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
