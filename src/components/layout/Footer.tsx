'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#FAF9F5] text-[#2D3748] font-inter border-t border-[#ECE8DC]">

      {/* Upper Footer Area with Cream Background */}
      <div className="relative w-full overflow-hidden">

        {/* Decorative Meat on Cutting Board (Bottom Left - Contained cleanly above the green bar) */}
        <div className="absolute left-0 bottom-0 z-10 pointer-events-none hidden md:block w-44 lg:w-56 xl:w-64">
          <Image
            src="/Footer/footer-left-transparent.webp"
            alt="Fresh Meat Cuts"
            width={340}
            height={260}
            className="w-full h-auto object-contain -translate-x-3 translate-y-1"
          />
        </div>

        {/* Decorative Leaf (Right Background - Scaled down) */}
        <div className="absolute right-0 top-2 bottom-0 pointer-events-none hidden lg:block w-52 xl:w-30 z-0 opacity-80">
          <Image
            src="/Footer/footer-right-transparent.webp"
            alt="Decorative Leaf"
            width={300}
            height={320}
            className="w-full h-auto object-contain translate-x-2"
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-start">

            {/* Column 1: Brand Info & Social Icons */}
            <div className="lg:col-span-4 space-y-5 md:pl-28 lg:pl-36 xl:pl-44">
              <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <Image
                  src="/meatin-logo.webp"
                  alt="MEATiN Logo"
                  width={185}
                  height={65}
                  className="h-12 sm:h-13 lg:h-14 w-auto object-contain"
                  priority
                />
              </Link>

              <p className="text-sm sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-sm font-normal">
                MEATiN Farms and Foods manufactures and delivers premium quality, ethically sourced and fresh cut meat products for unforgettable culinary experiences.
              </p>

              {/* Social Icons: 5 Rounded Pills (FB, X, Insta, LinkedIn, YouTube) */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* Facebook */}
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#E5E9DC] hover:bg-[#064823] text-[#064823] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="#twitter"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-full bg-[#E5E9DC] hover:bg-[#064823] text-[#064823] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#E5E9DC] hover:bg-[#064823] text-[#064823] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#E5E9DC] hover:bg-[#064823] text-[#064823] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#E5E9DC] hover:bg-[#064823] text-[#064823] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Contact Us */}
            <div className="lg:col-span-3 space-y-5">
              <div>
                <h3 className="font-bold text-[#064823] text-base sm:text-lg tracking-wider uppercase">
                  CONTACT
                </h3>
                <div className="w-8 h-[2px] bg-[#D4A437] mt-1.5" />
              </div>

              <ul className="space-y-4 text-sm sm:text-[14.5px] text-[#2D3748] font-normal">
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#E5E9DC] flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-[#064823] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Panchami+Complex+Perumpilavu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed hover:text-[#064823] font-medium text-[#2D3748] transition-colors"
                  >
                    15/809E, Panchami Complex, Perumpilavu, Karikkad P.O, Thrissur - 680519, Kerala
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#E5E9DC] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#064823] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <a
                    href="tel:+919940616162"
                    className="hover:text-[#064823] font-medium text-[#2D3748] transition-colors whitespace-nowrap"
                  >
                    +91 99406 16162
                  </a>
                </li>
                <li className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#E5E9DC] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#064823] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <a
                    href="mailto:info@meatinfoods.com"
                    className="hover:text-[#064823] font-medium text-[#2D3748] transition-colors break-all"
                  >
                    info@meatinfoods.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigate */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="font-bold text-[#064823] text-base sm:text-lg tracking-wider uppercase">
                  NAVIGATE
                </h3>
                <div className="w-8 h-[2px] bg-[#D4A437] mt-1.5" />
              </div>

              <ul className="space-y-3.5 text-sm sm:text-[14.5px] text-[#374151] font-medium">
                <li>
                  <Link href="/" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Home</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>About Us</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Products</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Meet Our Team</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Contact</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Explore */}
            <div className="lg:col-span-3 space-y-5 pr-0 lg:pr-10">
              <div>
                <h3 className="font-bold text-[#064823] text-base sm:text-lg tracking-wider uppercase">
                  EXPLORE
                </h3>
                <div className="w-8 h-[2px] bg-[#D4A437] mt-1.5" />
              </div>

              <ul className="space-y-3.5 text-sm sm:text-[14.5px] text-[#374151] font-medium">
                <li>
                  <Link href="/know-your-meat" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Know Your Meat</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Recipes</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/vlog" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Vlog &amp; Media</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/franchise" className="hover:text-[#064823] transition-colors flex items-center justify-between group">
                    <span>Franchise Opportunity</span>
                    <svg className="w-4 h-4 text-[#8898AA] group-hover:text-[#064823] transition-all group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Bar: Clean Deep Forest Green with Perfectly Centered Copyright and Right Ribbon */}
      <div className="relative w-full bg-[#0E4225] py-3.5 px-4 sm:px-8 lg:px-16 overflow-hidden">

        {/* Right Decorative Ribbon & Leaf Accent */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none opacity-80">
          <svg className="w-20 sm:w-28 h-5 text-[#8DC541]" viewBox="0 0 100 20" fill="none">
            <path d="M0 15 Q25 0 50 12 T100 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 18 Q35 5 60 14 T100 12" stroke="#D4A437" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
          <svg className="w-4 h-4 text-[#8DC541] fill-current -rotate-12" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-13 4s-4 7-4 7c3-1 7-1 12-6z" />
          </svg>
        </div>

        {/* Content Row: Perfectly Centered Copyright */}
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-center text-xs text-white/90">
          <p className="text-center font-normal tracking-wide">
            &copy; {new Date().getFullYear()} MEATiN FARMS AND FOODS LLP. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
