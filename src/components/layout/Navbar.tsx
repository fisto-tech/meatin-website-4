'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

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

  const containerBgClass = 'bg-white/95 border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]';

  const getLinkColorClass = (isActive: boolean) => {
    if (isActive) {
      return 'text-[#C62828] font-black';
    }
    return 'text-slate-800 hover:text-[#064823]';
  };

  const getUnderlineColorClass = () => {
    return 'bg-[#C62828]';
  };

  const hamburgerColorClass = 'text-slate-800 hover:bg-slate-100';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full p-4 lg:p-[1vw] pointer-events-none" suppressHydrationWarning>
        <div className={`w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] py-2 lg:py-[0.5vw] flex items-center justify-between font-inter border transition-all duration-300 rounded-[20px] pointer-events-auto ${containerBgClass}`}>
          {/* Logo */}
          <Logo variant="dark" className="shrink-0" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-[1.8vw] whitespace-nowrap" suppressHydrationWarning>
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
                  className={`relative text-xs lg:text-[11px] xl:text-xs 2xl:text-[0.8vw] font-black font-inter tracking-wider transition-all duration-200 lg:px-1 xl:px-1.5 py-1 ${getLinkColorClass(isActive)}`}
                >
                  {item.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${getUnderlineColorClass()}`} />
                  )}
                </Link>

              );
            })}
          </nav>

          {/* Enquiry Button (Desktop) & Hamburger Menu (Mobile/Tablet) */}
          <div className="flex items-center gap-3 lg:gap-4 2xl:gap-[1vw]">
            <Link
              href="/contact"
              suppressHydrationWarning
              className="hidden sm:inline-block bg-[#064823] hover:bg-[#0a5e30] text-white font-bold font-inter text-xs lg:text-xs xl:text-xs 2xl:text-[0.75vw] px-4 lg:px-4 py-2 lg:py-2 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              ENQUIRY KNOW
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden p-2 rounded-xl transition-colors ${hamburgerColorClass}`}
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
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <Logo variant="dark" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2" suppressHydrationWarning>
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={true}
                suppressHydrationWarning
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold font-inter tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#064823]/10 text-[#064823] font-extrabold border-l-4 border-[#064823]'
                    : 'text-slate-800 hover:bg-slate-50 hover:text-[#064823]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#F7840F]" />
                )}
              </Link>
            );
          })}
          <div className="pt-4 sm:hidden">
            <Link
              href="/contact"
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#064823] hover:bg-[#0a5e30] text-white font-bold font-inter text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md"
            >
              ENQUIRY KNOW
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-center text-xs text-slate-400 font-medium">
          Fresh. Hygienic. Scientifically Processed.
        </div>
      </aside>
    </>
  );
};

export default Navbar;
