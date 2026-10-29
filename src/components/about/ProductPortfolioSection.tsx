'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';

interface PortfolioCategory {
  title: string;
  desc: string;
  icon: string;
  iconBg: string;
  cardBg: string;
  hoverCardBg: string;
  cardBorder: string;
  hoverBorder: string;
  arrowBg: string;
  image: string;
  imageAlt: string;
  href: string;
}

const CATEGORIES: PortfolioCategory[] = [
  {
    title: 'Fresh Meat',
    desc: 'Scientifically slaughtered and hygienically cleaned meat for immediate distribution.',
    icon: 'boxicons:meat',
    iconBg: '#1A5C38',
    cardBg: '#D8ECD4',
    hoverCardBg: '#B8DCB0',
    cardBorder: '#B6DEAE',
    hoverBorder: '#1A5C38',
    arrowBg: '#C4E4BF',
    image: '/AboutUs/portfolio/fresh-meat.webp',
    imageAlt: 'Fresh Meat',
    href: '/know-your-meat',
  },
  {
    title: 'Chilled Meat',
    desc: 'Temperature-controlled meat stored at 4°C with a shelf life of up to 72 hours.',
    icon: 'carbon:temperature-max',
    iconBg: '#BC581A',
    cardBg: '#F2E2CD',
    hoverCardBg: '#E4C7A3',
    cardBorder: '#E6CBA6',
    hoverBorder: '#BC581A',
    arrowBg: '#E6CBA6',
    image: '/AboutUs/portfolio/chilled-meat.webp',
    imageAlt: 'Chilled Meat',
    href: '/know-your-meat',
  },
  {
    title: 'Frozen Meat',
    desc: 'Maintained between -18°C to -20°C with a shelf life of up to 9 months.',
    icon: 'ion:snow-outline',
    iconBg: '#2E6E9E',
    cardBg: '#D2EAF9',
    hoverCardBg: '#ACD5F4',
    cardBorder: '#A6D1F1',
    hoverBorder: '#2E6E9E',
    arrowBg: '#B4D7F4',
    image: '/AboutUs/portfolio/frozen-meat.webp',
    imageAlt: 'Frozen Meat',
    href: '/know-your-meat',
  },
  {
    title: 'Value-Added Products',
    desc: 'Ready-to-cook & processed products like burger patties, nuggets & sausages.',
    icon: 'streamline-plump:burger',
    iconBg: '#648E32',
    cardBg: '#DCECCD',
    hoverCardBg: '#BDDCA9',
    cardBorder: '#B8D8A3',
    hoverBorder: '#648E32',
    arrowBg: '#C8E4B5',
    image: '/AboutUs/portfolio/value-added-products.webp',
    imageAlt: 'Value-Added Products',
    href: '/know-your-meat',
  },
];

export default function ProductPortfolioSection() {
  return (
    <section className="relative w-full bg-[#F6FFE8] py-10 sm:py-14 lg:py-[4.5vw] overflow-hidden select-none">
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

      {/* Decorative Organic Vector Background Doodles matching mockup */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* Top curve with animated dash offset on scroll */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            d="M-30 180 C 280 60, 480 320, 840 120 C 1180 -50, 1340 220, 1500 110"
            stroke="#DCE9CF"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="6 8"
          />
          {/* Bottom swirl & decorative lines */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
            d="M60 840 C 360 670, 560 880, 960 720 C 1280 600, 1380 800, 1540 730"
            stroke="#DCE9CF"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="160" cy="280" r="22" stroke="#E2EED4" strokeWidth="2" fill="none" />
          <circle cx="1280" cy="360" r="30" stroke="#E2EED4" strokeWidth="2" fill="none" />
          <path
            d="M1360 620 C 1420 640, 1450 700, 1420 740 C 1390 780, 1340 760, 1350 710"
            stroke="#E2EED4"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Floating Fresh Green Leaves Accent from mockup (Right edge) - Animated floating sway */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -25, x: 40 }}
        whileInView={{ opacity: 0.9, scale: 1, rotate: 0, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.3 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 4, 0],
        }}
        // @ts-expect-error framer-motion transition config
        transition={{
          y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        }}
        className="absolute top-[32%] right-[-1%] w-20 sm:w-24 lg:w-[6.8vw] aspect-[3/4] pointer-events-none z-10 drop-shadow-sm"
      >
        <Image
          src="/AboutUs/portfolio/leaves-img.webp"
          alt="Fresh leaves decoration"
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5vw] relative z-10 w-full">
        
        {/* TOP SECTION: Left Hero Image Card & Right Headings */}
        {/* On mobile: Heading first -> Image -> Description & CTA with tight, balanced gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 xl:gap-16 items-center mb-8 sm:mb-12 lg:mb-[3vw]">
          
          {/* Right Column (Headings & CTA): on mobile order-1 for heading, on desktop col-span-6 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-start lg:pl-2 xl:pl-6 order-2 lg:order-2"
          >
            <div className="overflow-hidden hidden lg:block">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-barlow font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] leading-[0.98]"
              >
                <span className="text-[#0B4D26] block">PRODUCT</span>
                <span className="text-[#F37321] block">PORTFOLIO</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-1 sm:mt-4 lg:mt-[1.1vw] text-slate-700 text-sm sm:text-base lg:text-[1.02vw] leading-relaxed max-w-xl font-medium"
            >
              Quality meat products, processed and packed with care to ensure freshness, safety and great taste.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
            >
              <Link
                href="/know-your-meat"
                className="mt-4 sm:mt-7 lg:mt-[1.6vw] inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#163823] hover:bg-[#0B4D26] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_6px_20px_rgba(22,56,35,0.25)] hover:shadow-[0_10px_25px_rgba(22,56,35,0.4)] transition-all duration-300 hover:gap-3.5 group cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Explore our products</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Left Column: Hero Meat Board Image */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: 10, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="lg:col-span-6 xl:col-span-6 order-1 lg:order-1"
          >
            {/* Mobile-only header above image */}
            <div className="overflow-hidden lg:hidden mb-3">
              <h2 className="font-barlow font-black uppercase tracking-tight text-3xl sm:text-5xl leading-[0.98]">
                <span className="text-[#0B4D26] inline">PRODUCT </span>
                <span className="text-[#F37321] inline">PORTFOLIO</span>
              </h2>
            </div>

            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] rounded-2xl sm:rounded-3xl lg:rounded-[1.8vw] overflow-hidden shadow-[0_12px_30px_rgba(27,82,53,0.12)] border-2 sm:border-[3px] border-white group bg-[#F5F8F2] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(27,82,53,0.2)]">
              <Image
                src="/AboutUs/portfolio/product-portfolio.webp"
                alt="MEATiN Product Portfolio - Fresh Chicken Cuts"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

        </div>

        {/* BOTTOM SECTION: 4 Product Cards Grid with Wow Stagger & Tilt Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-5 xl:gap-[1.4vw]">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 14,
                delay: idx * 0.1,
              }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <Link
                href={cat.href}
                style={
                  {
                    '--card-bg': cat.cardBg,
                    '--card-hover-bg': cat.hoverCardBg,
                    '--card-border': cat.cardBorder,
                    '--card-hover-border': cat.hoverBorder,
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                  } as React.CSSProperties
                }
                className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl lg:rounded-[1.2vw] p-3.5 sm:p-4 lg:p-[1vw] border-2 shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(0,0,0,0.15)] overflow-hidden cursor-pointer hover:![background-color:var(--card-hover-bg)] hover:![border-color:var(--card-hover-border)]"
              >
                {/* Top: Icon + Title + Description */}
                <div>
                  {/* Round Category Icon with entrance spring */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.2 + idx * 0.1 }}
                    style={{ backgroundColor: cat.iconBg }}
                    className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[2.4vw] lg:h-[2.4vw] rounded-full flex items-center justify-center text-white shadow-md mb-2 sm:mb-2.5 lg:mb-[0.55vw] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  >
                    <Icon icon={cat.icon} className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-[1.35vw] lg:h-[1.35vw]" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-barlow font-bold text-lg sm:text-xl lg:text-[1.25vw] text-[#1E3B27] tracking-tight mb-1 leading-snug group-hover:text-[#0B4D26] transition-colors">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-800 text-xs sm:text-[13px] lg:text-[0.88vw] leading-normal font-medium">
                    {cat.desc}
                  </p>
                </div>

                {/* Bottom Row: Circular Arrow Button (Left) & Platter Plate Image (Right) */}
                <div className="relative flex items-end justify-between mt-2.5 sm:mt-3 pt-0">
                  
                  {/* Circular Arrow Button with bounce effect */}
                  <div
                    style={{ backgroundColor: cat.arrowBg }}
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-[1.9vw] lg:h-[1.9vw] rounded-full flex items-center justify-center text-slate-800 transition-all duration-300 group-hover:scale-115 group-hover:bg-white group-hover:shadow-md shrink-0 z-10"
                  >
                    <ArrowRight className="w-3.5 h-3.5 lg:w-[0.9vw] lg:h-[0.9vw] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Meat Platter Plate Image with 3D floating pop */}
                  <div className="relative w-28 sm:w-32 lg:w-[8.2vw] xl:w-[8.5vw] aspect-square shrink-0 -mr-2.5 -mb-2.5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3">
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      className="object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]"
                    />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
