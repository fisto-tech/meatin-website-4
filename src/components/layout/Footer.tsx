'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

// Typing Animation Component for Section Titles
const TitleTyping: React.FC<{ text: string }> = ({ text }) => {
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ staggerChildren: 0.07 }}
      className="inline-block"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Column 1 Staggered Variants
const firstContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const firstItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// Container and item variants for staggered fade-in of text links (Smooth Medium Speed)
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const Footer: React.FC = () => {
  const [activeAutoIndex, setActiveAutoIndex] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isFooterInView, setIsFooterInView] = useState<boolean>(false);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Total links count is 9 (5 Quick Links + 4 Explore)
  const totalItems = 9;

  useEffect(() => {
    if (isFooterInView && !isUserHovering) {
      // Force start at 0 (Home link) immediately when footer enters view
      setActiveAutoIndex(0);

      hoverIntervalRef.current = setInterval(() => {
        setActiveAutoIndex((prev) => (prev + 1) % totalItems);
      }, 1500);
    } else {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
    }

    return () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
    };
  }, [isFooterInView, isUserHovering]);

  // Helper to determine if an item should show the active scale/color highlight
  const getHighlightClass = (index: number) => {
    const isActive = activeAutoIndex === index && !isUserHovering;
    return isActive
      ? 'text-[#F7840F] scale-105 duration-300'
      : 'text-white/90 hover:text-[#F7840F] hover:scale-105 transition-all duration-300';
  };

  return (
    <motion.footer
      onViewportEnter={() => setIsFooterInView(true)}
      onViewportLeave={() => setIsFooterInView(false)}
      className="relative w-full text-white pt-5 sm:pt-6 pb-4 overflow-hidden font-inter"
      style={{
        background: "radial-gradient(circle at center, #488E40 0%, #064823 100%)",
      }}
      suppressHydrationWarning
    >

      {/* Doodle Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/Footer/doodle.webp"
          alt="Footer Background Pattern"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
      </div>

      <Container className="relative z-10 max-w-full px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-6 lg:gap-8 pb-6 border-b border-white/20 w-full">

          {/* Column 1: Brand Info & Social Icons */}
          <motion.div
            variants={firstContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full lg:w-[26%] space-y-3 shrink-0 lg:border-r lg:border-white/20 lg:pr-8 pb-4 lg:pb-0"
          >
            {/* Logo */}
            <motion.div variants={firstItemVariants} className="flex items-center">
              <Link
                href="/"
                className="inline-block hover:opacity-95 transition-opacity"
              >
                <Image
                  src="/meatin-logo.webp"
                  alt="MEATiN Logo"
                  width={150}
                  height={55}
                  className="w-32 sm:w-36 h-auto object-contain shadow-sm"
                  priority
                />
              </Link>
            </motion.div>

            <motion.h4 variants={firstItemVariants} className="font-chau text-sm sm:text-base text-white tracking-wider uppercase whitespace-nowrap">
              <span className="normal-case">MEATiN</span> FARMS AND FOODS LLP
            </motion.h4>

            <motion.div variants={firstItemVariants} className="space-y-3">
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-xs">
                Premium quality meat, ethically sourced and fresh cut for
                unforgettable culinary experiences.
              </p>

              {/* Social Icons with #F7840F Backgrounds */}
              <div className="flex items-center gap-3.5 pt-2">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#F7840F] hover:bg-[#e0750a] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shrink-0 aspect-square"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#F7840F] hover:bg-[#e0750a] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shrink-0 aspect-square"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-[#F7840F] hover:bg-[#e0750a] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shrink-0 aspect-square"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919946616162"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#F7840F] hover:bg-[#e0750a] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shrink-0 aspect-square"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Links and Contact Wrapper */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 items-start gap-6 lg:gap-8 xl:gap-12 w-full lg:w-[74%] lg:pl-8"
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
          >
            {/* Column 2: QUICK LINKS */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="w-full space-y-4 shrink-0 lg:border-r lg:border-white/20 lg:pr-6 pb-2 lg:pb-0"
            >
              <div className="border-b-2 border-[#F7840F] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase whitespace-nowrap">
                  <TitleTyping text="QUICK LINKS" />
                </h3>
              </div>
              <motion.ul
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-4.5 sm:space-y-5 pt-3 text-sm sm:text-base font-normal text-white/90"
              >
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(0)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Home
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/about"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(1)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    About Us
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/know-your-meat"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(2)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Know Your Meat
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/product"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(3)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Product
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/contact"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(4)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Contact Us
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Column 3: EXPLORE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="w-full space-y-4 shrink-0 lg:border-r lg:border-white/20 lg:pr-6 pb-2 lg:pb-0"
            >
              <div className="border-b-2 border-[#F7840F] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase whitespace-nowrap">
                  <TitleTyping text="EXPLORE" />
                </h3>
              </div>
              <motion.ul
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-4.5 sm:space-y-5 pt-3 text-sm sm:text-base font-normal text-white/90"
              >
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/recipes"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(5)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Recipes
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/franchise"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(6)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Franchise
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/team"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(7)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Meet Our Team
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/vlog"
                    prefetch={true}
                    className={`flex items-center gap-2 sm:gap-2.5 origin-left whitespace-nowrap ${getHighlightClass(8)}`}
                  >
                    <svg className="w-3 h-5 text-[#F7840F] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Vlog
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Column 4: CONTACT US */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="w-full space-y-4 shrink-0 pb-2 lg:pb-0"
            >
              <div className="border-b-2 border-[#F7840F] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase whitespace-nowrap">
                  <TitleTyping text="CONTACT US" />
                </h3>
              </div>
              <ul className="space-y-4 sm:space-y-4.5 pt-3 text-sm sm:text-base font-normal text-white/90">
                <li className="flex items-start gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 min-w-[20px] max-w-[20px] text-[#F7840F] shrink-0 mt-0.5 fill-current"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="leading-normal text-xs sm:text-sm">
                    15/809E, Panchami Complex, Perumpilavu, Karikkad P.O, Thrissur - 680519, Kerala, India
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 min-w-[20px] max-w-[20px] text-[#F7840F] shrink-0 fill-current"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <a
                    href="tel:+919946616162"
                    className="hover:text-[#F7840F] transition-colors whitespace-nowrap text-xs sm:text-sm"
                  >
                    +91 9946616162
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 min-w-[20px] max-w-[20px] text-[#F7840F] shrink-0 fill-current"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <a
                    href="mailto:info@meatinfoods.com"
                    className="hover:text-[#F7840F] transition-colors break-all whitespace-nowrap text-xs sm:text-sm"
                  >
                    info@meatinfoods.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Column 5: Delivery Truck Image (Commented out for now) */}
          {/* <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="w-full lg:w-[16%] flex items-center justify-center lg:justify-end shrink-0 lg:self-center"
          >
            <Image
              src="/Footer/rightside.webp"
              alt="MEATiN Delivery Truck"
              width={400}
              height={320}
              className="w-36 sm:w-44 lg:w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </motion.div> */}
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-white/90 font-medium w-full">
          <p className="text-center sm:text-left whitespace-nowrap">
            @ 2025 MEATiN FARMS AND FOODS LLP. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#privacy"
              className="hover:text-[#F7840F] transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <span className="opacity-50">|</span>
            <a href="#terms" className="hover:text-[#F7840F] transition-colors whitespace-nowrap">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

      </Container>
    </motion.footer>
  );
};

export default Footer;
