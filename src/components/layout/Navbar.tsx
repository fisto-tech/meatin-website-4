'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'KNOW YOUR MEAT', href: '/know-your-meat' },
  { label: 'PRODUCTS', href: '/product' },
  { label: 'RECIPES', href: '/recipes' },
  { label: 'FRANCHISE', href: '/franchise' },
  { label: 'MEET OUR TEAM', href: '/team' },
  { label: 'VLOG', href: '/vlog' },
  { label: 'CONTACT US', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Eagerly prefetch all pages immediately after Navbar mounts
  useEffect(() => {
    navItems.forEach((item) => {
      try {
        router.prefetch(item.href);
      } catch (e) {}
    });
  }, [router]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Track scroll depth to toggle scrolled appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isItemActive = (itemHref: string) => {
    if (!pathname) return false;
    const current = pathname.split('?')[0].replace(/\/+$/, '') || '/';
    const target = itemHref.split('?')[0].replace(/\/+$/, '') || '/';

    if (target === '/') {
      return current === '/';
    }
    if (target === '/product' || target === '/products') {
      return current === '/product' || current === '/products';
    }
    if (target === '/know-your-meat') {
      return current === '/know-your-meat';
    }
    return current === target || current.startsWith(`${target}/`);
  };

  // Determine if current page is one of the requested transparent-hero pages
  // Handles: know-your-meat, product (or products), vlog, and team
  const isTransparentHeroPage = () => {
    if (!pathname) return false;
    const path = pathname.split('?')[0].replace(/\/+$/, '') || '/';
    return (
      path === '/know-your-meat' ||
      path === '/product' ||
      path === '/products' ||
      path === '/vlog'
    );
  };

  const isTransparentHero = isTransparentHeroPage();

  return (
    <>
      {/* Sticky top full-width header navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.08)] border-b border-slate-200/80 py-3 sm:py-3.5'
            : isTransparentHero
            ? 'bg-transparent border-b border-transparent py-3.5 sm:py-4 lg:py-4.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 sm:py-4 lg:py-4.5'
        }`}
        suppressHydrationWarning
      >
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between font-inter">
          
          {/* Logo with proper brand prominence and vertical clearance */}
          <Link href="/" className="inline-flex items-center group shrink-0" suppressHydrationWarning>
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/meatin-logo.webp"
                alt="MEATiN Logo"
                width={170}
                height={60}
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation with comfortable text sizing and balanced spacing */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 whitespace-nowrap" suppressHydrationWarning>
            {navItems.map((item) => {
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={true}
                  onMouseEnter={() => {
                    try {
                      router.prefetch(item.href);
                    } catch (e) {}
                  }}
                  suppressHydrationWarning
                  className={`relative text-xs xl:text-[13px] 2xl:text-sm font-bold font-inter tracking-wider transition-all duration-200 py-1.5 ${
                    isActive ? 'text-[#C62828]' : 'text-slate-800 hover:text-[#064823]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C62828] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Enquiry Button (Desktop) & Hamburger Menu (Mobile/Tablet) */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              suppressHydrationWarning
              className="hidden sm:inline-block bg-[#064823] hover:bg-[#0a5e30] text-white font-bold font-inter text-xs xl:text-sm px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              ENQUIRY NOW
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[101] w-full max-w-xs bg-white/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col font-inter ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        suppressHydrationWarning
      >
        {/* Drawer Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/meatin-logo.webp"
              alt="MEATiN Logo"
              width={130}
              height={45}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                  isActive
                    ? 'bg-red-50 text-[#C62828]'
                    : 'text-slate-800 hover:bg-slate-50 hover:text-[#064823]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#C62828]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-3 px-4 bg-[#064823] hover:bg-[#0a5e30] text-white text-center font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            ENQUIRY NOW
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
