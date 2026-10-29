"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
};

export default function TrustedQualityBanner({ className }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D tilt & parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Card 3D tilt
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  // Parallax offsets for different layers
  const badgeParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const badgeParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  const personParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const personParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  const itemsParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]);
  const itemsParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);

  const knifeParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]);
  const knifeParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className={`w-full relative z-10 ${className ?? 'pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8'}`} style={{ perspective: 1200 }}>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <Image
                src="/Home/section-bg.webp"
                alt="Section background"
                fill
                className="object-cover object-center pointer-events-none"
                style={{
                  filter: "brightness(0)",
                  opacity: 0.7,
                }}
              />
            </div>
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          // style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-full bg-[#F5F5F5] rounded-[20px] sm:rounded-[28px] shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200/80 overflow-hidden relative min-h-[190px] sm:min-h-[220px] lg:min-h-[350px] xl:min-h-[370px] flex flex-col lg:flex-row items-stretch cursor-pointer group/banner"
        >
          {/* Card Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/TrustedQualityBanner/banner-bg.webp"
              alt="Banner Background"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover/banner:scale-[1.03]"
              priority
            />
          </div>

          {/* Subtle Ambient Light Shimmer Overlay */}
          <motion.div
            animate={{
              opacity: [0.12, 0.32, 0.12],
              scale: [1, 1.08, 1],
              x: [-10, 15, -10],
            }}
            transition={{
              repeat: Infinity,
              duration: 7.5,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-radial from-amber-200/40 via-green-100/20 to-transparent rounded-full blur-3xl pointer-events-none z-10"
          />

          {/* Top Right Absolute: MEATiN Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 120, damping: 14 }}
            className="absolute top-3 right-4 sm:top-4 sm:right-5 lg:top-3 lg:right-[40%] z-50 w-22 sm:w-28 lg:w-36 xl:w-42 h-9 sm:h-12 lg:h-14 xl:h-16 pointer-events-none"
          >
            <motion.div
              animate={{
                y: [0, -2.5, 0],
                scale: [1, 1.025, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <Image
                src="/meatin-logo.webp"
                alt="MEATiN Logo"
                fill
                className="object-contain object-right-top drop-shadow-sm"
              />
            </motion.div>
          </motion.div>

          {/* Text Content Area: 100% width on screens <= 990px (below lg), 35%/32% on desktop (lg+) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative z-20 px-4 pt-4 pb-2 sm:px-7 md:px-8 lg:pl-10 xl:pl-12 py-4 sm:py-5 lg:py-7 flex flex-col justify-center w-full lg:w-[32%] space-y-1.5 sm:space-y-2.5 shrink-0"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[25px] min-[400px]:text-[29px] sm:text-[34px] lg:text-[38px] xl:text-[44px] font-bold font-barlow-condensed leading-[1.05] tracking-tight pr-24 min-[450px]:pr-28 sm:pr-32 lg:pr-0"
            >
              <span className="text-[#064823] block">Trusted Quality</span>
              <span className="text-[#F7840F] block mt-0.5">Delivery Fresh.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[11px] sm:text-xs lg:text-sm text-slate-700 font-medium tracking-tight leading-relaxed font-manrope w-full max-w-lg lg:max-w-[340px] pr-8 sm:pr-12 lg:pr-0"
            >
              Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-0.5">
              <Link
                href="/know-your-meat"
                className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-1 sm:py-1.5 bg-[#064823] hover:bg-[#0a5e30] text-white rounded-md font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] group"
              >
                <span>Explore Our Products</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-[10px] sm:text-xs md:text-sm inline-block transition-transform"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Graphics Area (2nd Partition): Wrapped below (100% width) on screens <= 990px (below lg), 68% on desktop */}
          <div className="relative z-20 w-full lg:w-[68%] flex-1 h-[140px] sm:h-[170px] md:h-[210px] lg:h-auto min-h-[140px] sm:min-h-[170px] md:min-h-[210px] lg:min-h-full flex flex-col justify-end overflow-hidden">

            {/* Kerala's Original Meat Badge Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -30, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: false }}
              style={{ x: badgeParallaxX, y: badgeParallaxY }}
              transition={{ duration: 0.9, delay: 0.35, type: "spring", stiffness: 110, damping: 13 }}
              className="absolute lg:hidden top-1 sm:top-2 lg:top-[8%] left-1/2 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 z-30 w-[75px] sm:w-[100px] md:w-[120px] lg:w-[149px] xl:w-[171px] h-[32px] sm:h-[42px] md:h-[50px] lg:h-[64px] pointer-events-none"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.2,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/TrustedQualityBanner/keralas-original-meat.webp"
                  alt="Kerala's Original Meat Badge"
                  fill
                  className="object-contain object-center lg:object-left-top filter drop-shadow-md"
                />
              </motion.div>
            </motion.div>

            {/* Kerala's Original Meat Badge Desktop*/}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -30, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: false }}
              style={{ x: badgeParallaxX, y: badgeParallaxY }}
              transition={{ duration: 0.9, delay: 0.35, type: "spring", stiffness: 110, damping: 13 }}
              className="absolute hidden lg:block top-1 sm:top-0 lg:top-[0%] left-1/2 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 z-30 w-[75px] sm:w-[100px] md:w-[120px] lg:w-[149px] xl:w-[171px] h-[32px] sm:h-[42px] md:h-[50px] lg:h-[64px] pointer-events-none"
            >
              <motion.div

                className="relative w-full h-full"
              >
                <Image
                  src="/TrustedQualityBanner/keralas-original-hanging.webp"
                  alt="Kerala's Original Meat Badge"
                  fill
                  className="object-contain object-center lg:object-left-top filter drop-shadow-md"
                />
              </motion.div>
            </motion.div>

            {/* Person Holding Chicken */}
            <motion.div
              initial={{ opacity: 0, y: 85, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute right-[10%] min-[390px]:right-[12%] sm:right-[16%] md:right-[18%] lg:left-1/2 lg:-translate-x-1/2 bottom-0 z-10 w-[115px] min-[390px]:w-[125px] sm:w-[165px] md:w-[195px] lg:w-[285px] xl:w-[320px] h-[88%] sm:h-[92%] lg:h-[95%] pointer-events-none"
            >
              <motion.div
                animate={{
                  y: [0, -3.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5.2,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/TrustedQualityBanner/person-holding-packed-chicken.webp"
                  alt="Person Holding Packed Chicken"
                  fill
                  className="object-contain object-bottom filter drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Chicken Popup - Hidden by default, appears on card hover */}
            {/* Chicken Popup - Peeking by default, slides in on card hover */}
            <motion.div
              initial={false}
              animate={
                isHovered
                  ? { x: 0, y: 0, scale: 1 }
                  : { x: -45, y: -65, scale: 0.6 }
              }
              transition={{
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-[-1%] min-[390px]:right-[1%] sm:right-[3%] md:right-[5%] lg:right-auto lg:left-[65%] lg:-translate-x-1/2 bottom-0 z-[9] w-[85px] min-[390px]:w-[98px] sm:w-[135px] md:w-[165px] lg:w-[285px] xl:w-[320px] h-[82%] sm:h-[88%] lg:h-[95%] pointer-events-none origin-bottom"
            >
              <motion.div
                transition={{
                  repeat: Infinity,
                  duration: 3.6,
                  ease: "easeInOut",
                }}
                style={{ x: personParallaxX, y: personParallaxY }}
                className="relative w-full h-full origin-bottom"
              >
                <Image
                  src="/TrustedQualityBanner/character-popup.webp"
                  alt="Character Popup"
                  fill
                  className="object-contain object-bottom filter drop-shadow-2xl"
                  priority
                  style={{ rotate: "18deg", scale: "0.92" }}
                />
              </motion.div>
            </motion.div>

          </div>

          {/* Full Width Bottom Wood Cover (z-20) */}
          <div className="absolute bottom-0 left-0 right-0 h-[16px] sm:h-[20px] md:h-[24px] lg:h-[30px] xl:h-[34px] z-20 pointer-events-none">
            <Image
              src="/TrustedQualityBanner/bottom-wood-block.webp"
              alt="Wood Counter Table"
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Absolute Items Overlay (Packed Chicken, Chicken in Bowl, Knife) Sitting Directly ON Top of Wooden Bar (z-30) */}
          <div className="absolute bottom-0 right-0 w-full lg:w-[68%] z-30 flex items-end justify-between px-2 sm:px-5 lg:px-6 pb-1 sm:pb-1.5 lg:pb-2.5 pointer-events-none">

            {/* Left Group: Packed Chicken + Chicken in Bowl */}
            <motion.div

              className="flex items-end gap-1 sm:gap-2.5"
            >
              {/* Packed Chicken Products */}
              <motion.div
                initial={{ opacity: 0, y: 65, x: -35, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative z-30 w-[140px] sm:w-[200px] md:w-[240px] lg:w-[340px] xl:w-[370px] aspect-[260/170]"
              >
                <motion.div
                  animate={{
                    y: [0, -2.5, 0],
                  }}
                  style={{ x: itemsParallaxX, y: itemsParallaxY }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.6,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/TrustedQualityBanner/packed-chicken-products.webp"
                    alt="Packed Chicken Products"
                    fill
                    className="object-contain object-bottom filter drop-shadow-lg"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Chicken in Bowl */}
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.5, rotate: 8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: 0.6, type: "spring", stiffness: 120, damping: 14 }}
                className="relative z-40 w-[45px] sm:w-[68px] md:w-[82px] lg:w-[120px] xl:w-[130px] aspect-[140/90]"
              >
                <motion.div
                  animate={{
                    y: [0, -3.5, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.8,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/TrustedQualityBanner/chicken-in-bowl.webp"
                    alt="Fresh Raw Chicken in Bowl"
                    fill
                    className="object-contain object-bottom filter drop-shadow-md"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Group: Knife Image (Fixed desktop visibility and position) */}
            <motion.div
              initial={{ opacity: 0, y: 35, x: 25, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 110, damping: 14 }}
              className="relative z-40 w-[55px] sm:w-[75px] md:w-[90px] lg:w-[125px] xl:w-[145px] aspect-[180/70] mb-0.5 mr-1 sm:mr-2 lg:mr-3"
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.4,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/TrustedQualityBanner/knife-in-wooden.webp"
                  alt="Kitchen Knife on Wooden Block"
                  fill
                  className="object-contain object-bottom filter drop-shadow-md"
                />
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}