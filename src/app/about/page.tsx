'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Building2,
  Warehouse,
  Truck,
  Scale,
  MapPin,
  ShieldCheck,
  Globe,
  Gem,
  Award,
  Leaf,
  Users,
  FlaskConical
} from 'lucide-react';
import TrustedQualityBanner from '@/components/layout/TrustedQualityBanner';
import EcosystemCircle from '@/components/EcosystemCircle';
import InfrastructureSection from '@/components/about/InfrastructureSection';
import ProductPortfolioSection from '@/components/about/ProductPortfolioSection';
import CountriesWeServeSection from '@/components/about/CountriesWeServeSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
  }
};

const springScale = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 90, damping: 13 }
  }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.5, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 110, damping: 12 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
  }
};

const springPop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 13 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericString = value.replace(/[^\d]/g, '');
  const suffix = value.replace(/[\d,]/g, '');
  const target = parseInt(numericString, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutUsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set native DOM muted property (React's muted prop doesn't always set native attribute)
    video.muted = true;

    if (isVideoInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Video autoplay blocked or failed:", err);
        });
      }
    } else {
      video.pause();
    }
  }, [isVideoInView]);

  const stats = [
    {
      value: "30+",
      label: "ACRES",
      desc: "OF INTEGRATED LAND",
      icon: "ph:farm-light"
    },
    {
      value: "82,000+",
      label: "SQ.FT.",
      desc: "OF PLANT SPACE",
      icon: "la:industry"
    },
    {
      value: "45,000+",
      label: "KG",
      desc: "PROCESSING CAPACITY",
      icon: "weui:setting-outlined"
    },
    {
      value: "300+",
      label: "TONS",
      desc: "COLD STORAGE CAPACITY",
      icon: "streamline:interface-weather-snow-flake-winter-freeze-snow-freezing-ice-cold-weather-snowflake"
    },
    {
      value: "15+",
      label: "VEHICALS",
      desc: "IN LOGISTICS NETWORK",
      icon: "carbon:delivery-truck"
    }
  ];

  const highlights = [
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Modern technology-driven meat processing",
      icon: Award
    },
    {
      title: "HYGIENIC PRODUCTION",
      desc: "Strict cleanroom environment standards",
      icon: ShieldCheck
    },
    {
      title: "HALAL CERTIFIED",
      desc: "100% Halal compliance guaranteed",
      icon: ShieldCheck
    },
    {
      title: "EXPORT QUALITY",
      desc: "Premium international processing standards",
      icon: Globe
    }
  ];

  const coreValues = [
    {
      title: "TRUST",
      desc: "Honest process,\nalways.",
      icon: "/AboutUs/our-values-icons/trust-icon.svg"
    },
    {
      title: "QUALITY",
      desc: "Excellence in every\nproduct.",
      icon: "/AboutUs/our-values-icons/quality-icon.svg"
    },
    {
      title: "FRESHNESS",
      desc: "Honest process,\nalways.",
      icon: "/AboutUs/our-values-icons/freshness-icon.svg"
    },
    {
      title: "CUSTOMER SATISFACTION",
      desc: "Your satisfaction,\nour promise.",
      icon: "/AboutUs/our-values-icons/customer-satisfaction-icon.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope overflow-x-clip">

      {/* 1. HERO HEADER BANNER SECTION - RESPONSIVE STACKED ON MOBILE/TABLET, OVERLAY ON DESKTOP */}
      <section className="relative w-full overflow-hidden bg-[#F3F3F3] lg:bg-black lg:h-screen lg:min-h-[620px] lg:max-h-[1080px] lg:flex lg:items-center">
        {/* Desktop Only: Full-Fill Background Image with Exact Figma Dark Gradient */}
        <div className="hidden lg:block absolute inset-0 z-0 w-full h-full">
          <Image
            src="/AboutUs/about-hero-img.webp"
            alt="MEATiN Scientific Meat Processing Facility"
            fill
            priority
            className="object-cover object-[68%_center]"
          />
          {/* Exact Left-to-Right Dark Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background:
                "linear-gradient(270deg, rgba(0, 0, 0, 0) 52.66%, rgba(0, 0, 0, 0.562192) 70.16%, rgba(0, 0, 0, 0.7136) 85.22%, #000000 116.99%)",
            }}
          />
          {/* Top Gradient for Navbar legibility */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-1" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] h-full flex flex-col lg:flex-row lg:items-center pt-28 sm:pt-32 lg:pt-20 pb-10 lg:pb-0">
          {/* Text Content (Above on mobile/tablet, left-aligned on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl lg:max-w-3xl min-[1800px]:max-w-5xl text-left"
          >
            {/* Eyebrow Label with Green Accent Underline */}
            <div className="mb-4 sm:mb-6 min-[1800px]:mb-9">
              <span className="text-xs sm:text-base md:text-lg min-[1800px]:text-2xl font-semibold tracking-[0.22em] text-[#1F5A3C] lg:text-white/95 block mb-2 sm:mb-2.5 min-[1800px]:mb-3.5">
                WHAT IS MEATiN?
              </span>
              <div className="w-12 sm:w-16 min-[1800px]:w-24 h-[3px] min-[1800px]:h-[4px] bg-[#7BB23E] rounded-full" />
            </div>

            {/* Main Headline - Exact 1:1 Scale Ratio with Reference */}
            <h1 className="font-extrabold uppercase mb-5 sm:mb-7 min-[1800px]:mb-10 leading-[0.9] tracking-tight">
              <span className="block text-[#1F5A3C] lg:text-white whitespace-nowrap text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[5rem] min-[1800px]:text-[6.4rem] font-extrabold tracking-tight">
                WE ENGINEER
              </span>
              <span className="block text-[#F07C00] whitespace-nowrap text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[7rem] min-[1800px]:text-[9rem] font-black tracking-tight leading-[0.7]">
                QUALITY
              </span>
              <span className="block text-[#1F5A3C] lg:text-white whitespace-nowrap text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem] min-[1800px]:text-[5.8rem] font-extrabold tracking-tight">
                INTO EVERY CUT.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-700 lg:text-white/90 text-sm sm:text-lg md:text-xl min-[1800px]:text-2xl min-[1800px]:leading-relaxed font-normal leading-snug max-w-lg min-[1800px]:max-w-2xl">
              Integrated farming, <br />
              scientific processing, and <br />
              cold-chain distribution.
            </p>
          </motion.div>

          {/* Mobile & Tablet Only: Clean Image Displayed Below Text Without Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden w-full relative h-[260px] xs:h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden mt-8 shadow-xl border border-slate-200"
          >
            <Image
              src="/AboutUs/about-hero-img.webp"
              alt="MEATiN Scientific Meat Processing Facility"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. STATS METRICS BAR MATCHING ATTACHED DESIGN */}
      <section className="relative w-full bg-white border-y border-slate-200/90 shadow-sm z-20">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-7 lg:py-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 sm:gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-slate-300/80 items-center w-full"
          >
            {stats.map((stat, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={springScale}
                  className={`flex flex-col items-center text-center px-3 sm:px-5 lg:px-6 xl:px-8 ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                >
                  {/* Green Circle Icon Badge - balanced size on mobile, enlarged on desktop */}
                  <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#0E6838] flex items-center justify-center shrink-0 shadow-sm mb-2.5 sm:mb-3 text-white">
                    <Icon
                      icon={stat.icon}
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                    />
                  </div>

                  {/* Number Counter (bold, pure black color) */}
                  <div className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-[#153520] font-manrope tracking-tight leading-none mb-2">
                    <Counter value={stat.value} />
                  </div>

                  {/* Merged metric label and description into a single line text */}
                  <div className="flex items-center justify-center text-center font-manrope text-black">
                    <span className="text-sm sm:text-[15px] xl:text-base font-medium text-black uppercase tracking-tight whitespace-nowrap leading-none">
                      {stat.label} {stat.desc}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. WHO IS MEATiN SECTION */}
      <section id="who-is-meatin" className="relative w-full bg-[#F3F3F3] overflow-hidden scroll-mt-28">
        {/* Background pattern image */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.8]">
          <Image
            src="/AboutUs/who-is-bg.webp"
            alt="Background Pattern"
            fill
            className="object-cover"
            priority
          />
          {/* Soft overlay to tone down background doodles exactly like the reference image */}
          {/* <div className="absolute inset-0 bg-[#F3F3F3]/90" /> */}
        </div>

        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* Left Side: Plant Video (Docked Flush Left - Exactly 50%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[460px] xl:min-h-[500px] overflow-hidden"
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src="/AboutUs/about-us-video.mp4" type="video/mp4" />
                <source src="/AboutUs/about-us-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>

            </motion.div>

            {/* Right Side: Description (Right 50% Column with comfortable padding and safe top clearance for fixed navbar) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 sm:space-y-5 px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-24 pt-10 sm:pt-12 lg:pt-16 xl:pt-20 pb-8 sm:pb-10 lg:pb-14 xl:pb-16"
            >
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[62px] 2xl:text-[5.5rem] font-extrabold font-barlow-condensed tracking-wide uppercase leading-[0.95]">
                  <span className="text-[#064823] block">WHO IS</span>
                  <span className="text-[#F7840F] block normal-case">MEATiN?</span>
                </h2>
                <div className="h-[3.5px] w-16 bg-[#064823]" />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-[#064823]">Building a better meat ecosystem.</h3>
                <p className="text-xs sm:text-sm lg:text-[14px] xl:text-sm 2xl:text-[18px] text-slate-700 font-medium leading-relaxed tracking-wide">
                  MEATiN delivers safe, hygienic meat through scientific processing and controlled cold-chain systems. Built on quality, safety, and Halal-certified standards, our integrated approach ensures reliable production and distribution. From responsible sourcing to advanced infrastructure, we are building a better meat ecosystem.
                </p>
              </div>

              {/* Stamp Badges Row */}
              <div className="flex flex-wrap items-center gap-6 md:gap-[5%] xl:gap-[5%] 2xl:gap-[10%] pt-2">
                <div className="relative w-44 sm:w-56 lg:w-52 xl:w-64 2xl:w-72 h-10 sm:h-12 lg:h-12 xl:h-14 2xl:h-16">
                  <Image
                    src="/AboutUs/quality-is-our-promise.webp"
                    alt="Quality is our promise"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="relative w-28 sm:w-36 lg:w-36 xl:w-44 2xl:w-52 h-10 sm:h-12 lg:h-12 xl:h-14 2xl:h-16">
                  <Image
                    src="/AboutUs/keralas-original.webp"
                    alt="Kerala's Original Meat"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              {/* Circular Highlights badges */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:pt-3 2xl:pt-6"
              >
                {/* Highlight 1: Scientific Processing */}
                <motion.div variants={popIn} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/scientific-procssing.svg"
                      alt="Scientific Processing"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    SCIENTIFIC<br />PROCESSING
                  </span>
                </motion.div>

                {/* Highlight 2: Hygienic Production */}
                <motion.div variants={popIn} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/hygienic-production.svg"
                      alt="Hygienic Production"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    HYGIENIC<br />PRODUCTION
                  </span>
                </motion.div>

                {/* Highlight 3: Halal Certified */}
                <motion.div variants={popIn} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/halal-certified.svg"
                      alt="Halal Certified"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    HALAL<br />CERTIFIED
                  </span>
                </motion.div>

                {/* Highlight 4: Export Quality */}
                <motion.div variants={popIn} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/export-quality.svg"
                      alt="Export Quality"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    EXPORT<br />QUALITY
                  </span>
                </motion.div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION SPLIT GRID */}
      <section className="relative w-full">

        {/* Vertical Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-10 hidden lg:block" />

        {/* Floating Center MEATiN Logo Badge (visible on desktop screens) */}
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full h-full"
          >
            <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border border-white/20">
              {/* Decorative concentric thin circle */}
              <div className="absolute -inset-2 rounded-full border border-[#064823]/20 animate-spin-slow" />
              <div className="relative w-[80%] h-[80%] rounded-full overflow-hidden flex items-center justify-center p-1">
                <Image
                  src="/meatin-logo.webp"
                  alt="MEATiN Logo"
                  width={70}
                  height={35}
                  className="object-contain w-[70px]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-auto lg:min-h-[580px] xl:min-h-[635px]">

          {/* Mission Box */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative px-6 pt-11 pb-32 sm:px-10 lg:px-14 xl:px-16 sm:pt-14 lg:pt-16 xl:pt-18 flex flex-col justify-start text-white lg:overflow-hidden min-h-auto lg:min-h-[580px] xl:min-h-[635px]"
          >
            <Image
              src="/AboutUs/mission-image.webp"
              alt="Our Mission background"
              fill
              className="object-cover object-[50%_80%]  z-0"
              sizes="50vw"
            />
            {/* Full-height yellow-green overlay on mobile/tablet (1024px and below) for text contrast, and top-only (h-[65%]) overlay on desktop */}
            <div className="absolute inset-0 lg:bottom-auto lg:h-[120%] bg-[linear-gradient(180deg,#8DC541_0%,rgba(163,208,102,0.807715)_35.2%,rgba(255,255,255,0)_62.27%)] z-0 pointer-events-none" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="relative z-10 space-y-3.5 lg:space-y-4"
            >
              <motion.div variants={slideInLeft} className="relative w-56 xs:w-64 sm:w-72 md:w-80 lg:w-[245px] xl:w-[280px] 2xl:w-[320px] h-20 xs:h-24 sm:h-28 lg:h-[90px] xl:h-[102px] 2xl:h-[118px]">
                <Image
                  src="/AboutUs/mission-vision/mission-text.svg"
                  alt="Our Mission"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </motion.div>
              <motion.p
                variants={slideInLeft}
                style={{ lineHeight: '1.45' }}
                className="text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-black font-normal max-w-xl lg:max-w-[420px] xl:max-w-[460px] relative z-10 font-manrope tracking-tight"
              >
                Build value-added meat products, farming<br className="hidden sm:inline" /> and food supply chains while delivering<br className="hidden sm:inline" /> <span className="text-[#d62828] font-semibold">quality, service</span> and a <span className="text-[#d62828] font-semibold">sustainable</span> food system.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative px-6 pt-11 pb-32 sm:px-10 lg:px-14 xl:px-16 sm:pt-14 lg:pt-16 xl:pt-18 flex flex-col justify-start text-white lg:overflow-hidden min-h-auto lg:min-h-[580px] xl:min-h-[635px]"
          >
            {/* Floating Center MEATiN Logo Badge (Mobile/Tablet only, anchored directly to top seam) */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 lg:hidden">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.3 }}
                className="w-full h-full"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-lg border border-white/20">
                  <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-[#064823]/20 animate-spin-slow" />
                  <div className="relative w-[80%] h-[80%] rounded-full overflow-hidden flex items-center justify-center p-1">
                    <Image
                      src="/meatin-logo.webp"
                      alt="MEATiN logo"
                      width={70}
                      height={35}
                      className="object-contain w-10 sm:w-12"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <Image
              src="/AboutUs/vision-bg.webp"
              alt="Our Vision background"
              fill
              className="object-cover z-0"
              sizes="50vw"
            />
            {/* Full-height vertical spruce green overlay on mobile/tablet, and left-to-right spruce green gradient on desktop to keep right workers sharp */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#081a11]/95 via-[#081a11]/75 to-[#081a11]/45 lg:bg-gradient-to-r lg:from-[#081a11]/90 lg:via-[#081a11]/60 lg:to-transparent z-0 pointer-events-none" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="relative z-10 space-y-3.5 lg:space-y-4"
            >
              <motion.div variants={slideInRight} className="relative w-56 xs:w-64 sm:w-72 md:w-80 lg:w-[245px] xl:w-[280px] 2xl:w-[320px] h-20 xs:h-24 sm:h-28 lg:h-[90px] xl:h-[102px] 2xl:h-[118px]">
                <Image
                  src="/AboutUs/mission-vision/vision-text.svg"
                  alt="Our Vision"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              </motion.div>
              <motion.p
                variants={slideInRight}
                style={{ lineHeight: '1.45' }}
                className="text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-white font-normal max-w-xl lg:max-w-[440px] xl:max-w-[480px] relative z-10 font-manrope tracking-tight"
              >
                Become a leader in <span className="text-[#8DC541] font-semibold">value-added</span> meat<br className="hidden sm:inline" /> processing and a trusted premium-quality<br className="hidden sm:inline" /> food supplier.
              </motion.p>
            </motion.div>
          </motion.div>

        </div>

        {/* 5. FLOATING CORE VALUES CONTAINER CARD */}
        <div className="bg-[#d8d8d6] lg:bg-transparent relative lg:absolute lg:bottom-6 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-[950px] lg:max-w-[56vw] pt-6 sm:pt-6 md:pt-10 lg:pt-0 px-4 sm:px-6 lg:px-8 mx-auto lg:mx-0 -mt-16 lg:-mt-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="bg-[#F6F5F0] rounded-[24px] border border-[#E5EAE1] shadow-[0_10px_28px_rgba(0,0,0,0.06)] p-3.5 sm:p-4 lg:py-3.5 px-4 text-center space-y-2.5"
          >
            <h3 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-[#064823] tracking-tight uppercase flex items-center justify-center gap-3 font-barlow leading-none">
              <span className="w-6 sm:w-10 h-[2px] bg-[#F7840F]" /> OUR VALUES <span className="w-6 sm:w-10 h-[2px] bg-[#F7840F]" />
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-[0.85fr_1fr_1fr_1.15fr] gap-y-3 min-[400px]:gap-y-4 md:gap-y-0 divide-y divide-[#8DC541]/30 min-[400px]:divide-y-0 md:divide-x md:divide-[#8DC541] w-full items-start"
            >
              {coreValues.map((val, idx) => {
                return (
                  <motion.div
                    key={idx}
                    variants={springPop}
                    className={`flex flex-col items-center text-center px-2 sm:px-3 lg:px-4 pt-2 min-[400px]:pt-3 md:pt-0 ${idx >= 2 ? 'min-[400px]:border-t min-[400px]:border-[#8DC541]/30 md:border-t-0' : ''
                      }`}
                  >
                    {/* SVG Vector Icon */}
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-8 lg:h-8 xl:w-9 xl:h-9 mb-1">
                      <Image
                        src={val.icon}
                        alt={val.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-[17px] font-bold text-[#064823] font-barlow tracking-wide uppercase mb-0.5 leading-none whitespace-nowrap">{val.title}</h4>
                    <p className="text-[11px] sm:text-xs lg:text-[11px] xl:text-xs 2xl:text-xs text-slate-700 font-normal leading-tight max-w-[130px] sm:max-w-[150px] lg:max-w-[140px] xl:max-w-[170px] mx-auto">
                      {val.desc.split('\n').map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line}
                          {lIdx < val.desc.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* 6. MEATiN INFRASTRUCTURE COMPONENTS SECTION */}
      <InfrastructureSection />

      {/* 7. PRODUCT PORTFOLIO SECTION */}
      <ProductPortfolioSection />

      {/* 8. COUNTRIES WE SERVE SECTION */}
      <CountriesWeServeSection />

      {/* Global Trusted Quality Banner */}
      <TrustedQualityBanner />



    </div>
  );
}
