'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface CountryItem {
  name: string;
  flag: string;
}

const COUNTRIES: CountryItem[] = [
  { name: 'Indonesia', flag: '/AboutUs/countries-serve/flag-images/indonesia.webp' },
  { name: 'Kuwait', flag: '/AboutUs/countries-serve/flag-images/kuwait.webp' },
  { name: 'Qatar', flag: '/AboutUs/countries-serve/flag-images/qatar.webp' },
  { name: 'Egypt', flag: '/AboutUs/countries-serve/flag-images/egypt.webp' },
  { name: 'Bahrain', flag: '/AboutUs/countries-serve/flag-images/bahrain.webp' },
  { name: 'Lebanon', flag: '/AboutUs/countries-serve/flag-images/lebanon.webp' },
  { name: 'Jordan', flag: '/AboutUs/countries-serve/flag-images/jordan.webp' },
  { name: 'Myanmar', flag: '/AboutUs/countries-serve/flag-images/myanmar.webp' },
  { name: 'Maldives', flag: '/AboutUs/countries-serve/flag-images/maldives.webp' },
  { name: 'Oman', flag: '/AboutUs/countries-serve/flag-images/oman.webp' },
  { name: 'Thailand', flag: '/AboutUs/countries-serve/flag-images/thailand.webp' },
  { name: 'Philippines', flag: '/AboutUs/countries-serve/flag-images/philippines.webp' },
  { name: 'UAE', flag: '/AboutUs/countries-serve/flag-images/uae.webp' },
  { name: 'Vietnam', flag: '/AboutUs/countries-serve/flag-images/vietnam.webp' },
  { name: 'Singapore', flag: '/AboutUs/countries-serve/flag-images/singapore.webp' },
  { name: 'Saudi Arabia', flag: '/AboutUs/countries-serve/flag-images/saudi-arabia.webp' },
  { name: 'Iran', flag: '/AboutUs/countries-serve/flag-images/iran.webp' },
  { name: 'Uzbekistan', flag: '/AboutUs/countries-serve/flag-images/uzbekistan.webp' },
];

export default function CountriesWeServeSection() {
  // Continuous one-by-one sequential flag highlight cycle
  const [activeFlagIdx, setActiveFlagIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlagIdx((prev) => (prev + 1) % COUNTRIES.length);
    }, 1600);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative w-full pt-8 sm:pt-12 lg:pt-[3.8vw] pb-10 sm:pb-14 lg:pb-[4.2vw] overflow-hidden select-none">
      {/* Background Image Layer */}
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
      
      {/* Background Subtle Organic Curved Pattern (as seen in mockup background) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
          <path d="M-50 150 C 300 50, 450 300, 800 120 C 1150 -60, 1300 200, 1500 100" stroke="#E1EBD5" strokeWidth="1.5" fill="none" strokeDasharray="4 6" opacity="0.6" />
          <path d="M100 800 C 400 650, 600 850, 1000 700 C 1300 580, 1400 750, 1550 720" stroke="#E1EBD5" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="150" cy="280" r="18" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="1250" cy="350" r="24" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.6" />
          <circle cx="450" cy="850" r="28" stroke="#E5EEE0" strokeWidth="1.2" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:pl-[4.5vw] lg:pr-[2vw] relative z-10 w-full">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-0">
          
          {/* LEFT COLUMN: Headings, Flags Grid Card & Bottom 3 Highlights */}
          <div className="lg:col-span-6 xl:col-span-6 z-20">
            
            {/* Eyebrow and Headings with scroll entrance */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-[0.5vw] mb-1.5 lg:mb-[0.4vw]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ originX: 0 }}
                  className="w-5 sm:w-6 lg:w-[1.6vw] h-[2px] lg:h-[0.16vw] bg-[#CF9A16]"
                />
                <span className="text-[11px] sm:text-xs lg:text-[0.75vw] font-bold tracking-[0.24em] text-[#CF9A16] uppercase font-manrope">
                  FROM OUR FARM TO THE WORLD
                </span>
              </div>

              {/* Main Title with masked slide up */}
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold font-barlow-condensed tracking-normal leading-[0.92] text-5xl sm:text-6xl lg:text-[4.6vw]"
                >
                  <span className="text-[#1F5A3C] block">FRESHNESS</span>
                  <span className="block uppercase">
                    <span className="text-[#F58408]">ACROSS </span>
                    <span className="text-[#1F5A3C]">THE WORLD</span>
                  </span>
                </motion.h2>
              </div>

              {/* Subtitle description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#2D2D2D] font-medium leading-snug mt-2.5 lg:mt-[0.6vw] text-sm sm:text-base lg:text-[1.12vw] max-w-sm sm:max-w-md lg:max-w-[26vw]"
              >
                Trusted in 18+ Countries, Serving Healthy Chicken to Families Around the Globe.
              </motion.p>

              {/* Small decorative line #8DC541 with stretch expand */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="w-9 sm:w-11 lg:w-[3vw] h-[3px] lg:h-[0.22vw] bg-[#8DC541] rounded-full mt-3 lg:mt-[0.8vw] mb-5 lg:mb-[1.4vw]"
              />
            </motion.div>

            {/* Countries Flag Holding Card (#EAF8D0) - With Rich Hover Dynamics */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 35, rotateX: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#EAF8D0',
                boxShadow: '0px 12px 36px rgba(31, 90, 60, 0.08)',
                perspective: 1000,
              }}
              className="rounded-2xl sm:rounded-3xl lg:rounded-[1.6vw] p-5 sm:p-6 md:p-8 lg:p-[1.8vw] w-full sm:max-w-[540px] md:max-w-[620px] lg:max-w-[43.5vw] border-2 border-white/80 hover:border-[#8DC541]/50 hover:shadow-[0_20px_45px_rgba(31,90,60,0.14)] transition-all duration-500 relative"
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-3 sm:gap-x-5 md:gap-x-7 lg:gap-x-[1vw] gap-y-3.5 sm:gap-y-4 md:gap-y-5 lg:gap-y-[1.15vw] items-center justify-items-center">
                {COUNTRIES.map((country, idx) => {
                  const isAutoActive = activeFlagIdx === idx;
                  // For 18 items in 4 columns: 4 * 4 = 16 items in first 4 full rows.
                  // Remaining 2 items are index 16 & 17 (Iran & Uzbekistan).
                  // Centering them horizontally on tablet (sm to lg):
                  // Index 16 shifts to col-start-2, placing items at cols 2 and 3 of the 4 columns.
                  const tabletCenterClass = idx === 16 ? 'sm:col-start-2 lg:col-start-auto' : '';

                  return (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, scale: 0.7, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 14,
                        delay: 0.15 + (idx % 6) * 0.04 + Math.floor(idx / 6) * 0.08,
                      }}
                      whileHover={{ scale: 1.18, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      animate={isAutoActive ? { scale: 1.12, y: -3 } : { scale: 1, y: 0 }}
                      className={`flex flex-col items-center justify-center text-center group cursor-pointer relative w-full ${tabletCenterClass}`}
                    >
                      {/* Flag Image - 3D Pop, Auto Wave Glow & Hover Border */}
                      <div className={`relative w-[48px] h-[32px] sm:w-[68px] sm:h-[44px] md:w-[76px] md:h-[48px] lg:w-[3.8vw] lg:h-[2.4vw] rounded-md sm:rounded-lg lg:rounded-[0.5vw] overflow-hidden transition-all duration-300 ${
                        isAutoActive 
                          ? 'border-2 border-[#1F5A3C] shadow-[0_8px_22px_rgba(31,90,60,0.32)] ring-2 ring-[#8DC541]/40' 
                          : 'border border-black/10 shadow-[0_3px_10px_rgba(0,0,0,0.12)] group-hover:border-[#1F5A3C] group-hover:shadow-[0_8px_20px_rgba(31,90,60,0.25)]'
                      }`}>
                        <Image
                          src={country.flag}
                          alt={country.name}
                          fill
                          sizes="(max-width: 640px) 50px, (max-width: 1024px) 85px, 80px"
                          unoptimized
                          className={`object-cover transition-transform duration-500 ${
                            isAutoActive ? 'scale-105' : 'group-hover:scale-110'
                          }`}
                        />
                      </div>
                      {/* Country Name with Color Fill & Active Accent */}
                      <span className={`text-[10px] sm:text-[13px] md:text-[14px] lg:text-[0.85vw] font-bold mt-1.5 lg:mt-[0.4vw] leading-tight tracking-tight transition-colors duration-200 ${
                        isAutoActive 
                          ? 'text-[#1F5A3C]' 
                          : 'text-[#2D2D2D] group-hover:text-[#1F5A3C]'
                      }`}>
                        {country.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* 3 Bottom Highlights Row: High Quality | Trusted Globally | Healthy Families with Interactive Hover Glow */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 sm:gap-6 lg:gap-[1.8vw] mt-5 sm:mt-7 lg:mt-[1.6vw]"
            >
              
              {/* Highlight 1: High Quality */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.4 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="flex items-center gap-2 sm:gap-3 lg:gap-[0.6vw] group cursor-pointer p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-[#EAF8D0]/60"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] group-hover:bg-[#01511C] flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:rotate-12 group-hover:shadow-[0_4px_12px_rgba(1,81,28,0.3)]">
                  <Icon icon="bxs:leaf" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">High</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">Quality</span>
                </div>
              </motion.div>

              {/* Vertical divider */}
              <div className="w-[1.2px] h-8 sm:h-9 lg:h-[2vw] bg-[#2D2D2D]/15" />

              {/* Highlight 2: Trusted Globally */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.48 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="flex items-center gap-2 sm:gap-3 lg:gap-[0.6vw] group cursor-pointer p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-[#EAF8D0]/60"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] group-hover:bg-[#01511C] flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:rotate-12 group-hover:shadow-[0_4px_12px_rgba(1,81,28,0.3)]">
                  <Icon icon="icon-park-solid:protect" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">Trusted</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">Globally</span>
                </div>
              </motion.div>

              {/* Vertical divider */}
              <div className="w-[1.2px] h-8 sm:h-9 lg:h-[2vw] bg-[#2D2D2D]/15" />

              {/* Highlight 3: Healthy Families */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.56 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="flex items-center gap-2 sm:gap-3 lg:gap-[0.6vw] group cursor-pointer p-1.5 sm:p-2 rounded-xl transition-colors hover:bg-[#EAF8D0]/60"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[3vw] lg:h-[3vw] rounded-full bg-[#D4FFE3] group-hover:bg-[#01511C] flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:rotate-12 group-hover:shadow-[0_4px_12px_rgba(1,81,28,0.3)]">
                  <Icon icon="famicons:people" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.4vw] lg:h-[1.4vw] text-[#01511C] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">Healthy</span>
                  <span className="text-xs sm:text-sm lg:text-[0.9vw] font-bold text-[#1D1D1D] group-hover:text-[#01511C] transition-colors">Families</span>
                </div>
              </motion.div>

            </motion.div>

          </div>

          {/* RIGHT COLUMN: Globe Background, Airplane Flight Path & Packed Products in Foreground - Centered Horizontally */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[36vw]">
            
            {/* Globe Map with Location Marker Pins (Centered) */}
            <div className="relative w-[320px] sm:w-[420px] md:w-[460px] lg:w-[35vw] aspect-square flex items-center justify-center z-10 mt-2 lg:mt-0">
              
              {/* Airplane Image: Dynamic Swoop-in and gentle floating flight glide */}
              <div className="absolute top-[0%] sm:top-[1%] lg:top-[0.5%] -left-[18%] sm:-left-[16%] lg:-left-[15%] z-30 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, x: -70, y: 50, scale: 0.7, rotate: -15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative flex items-center"
                >
                  <div className="relative w-28 h-18 sm:w-40 sm:h-26 lg:w-[13vw] lg:h-[8.2vw] drop-shadow-xl">
                    <Image
                      src="/AboutUs/countries-serve/airplane-image.webp"
                      alt="MEATiN Global Airplane"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Globe with 3D scale-up and subtle float */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src="/AboutUs/countries-serve/globe-image.webp"
                  alt="MEATiN World Serving Destinations"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Foreground Packed Chicken Products Stack (Docked at bottom overlapping globe) - 3D Pop entrance & Hover lift */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.35 }}
                whileHover={{ scale: 1.04, y: -6 }}
                className="absolute -bottom-2 sm:-bottom-4 lg:-bottom-[0.8vw] -right-[5%] sm:-right-[4%] lg:-right-[3%] w-[300px] sm:w-[420px] md:w-[460px] lg:w-[33.5vw] z-20 pointer-events-auto cursor-pointer"
              >
                <Image
                  src="/AboutUs/countries-serve/packed-product.webp"
                  alt="MEATiN I'm Your Chicken Packed Products"
                  width={800}
                  height={550}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] block transition-transform duration-500 hover:brightness-105"
                />
              </motion.div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
