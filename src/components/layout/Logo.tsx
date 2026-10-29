import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`} suppressHydrationWarning>
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/meatin-logo.webp"
          alt="MEATiN Logo"
          width={180}
          height={65}
          className="h-10 sm:h-12 lg:h-[3.6vw] w-auto object-contain"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
