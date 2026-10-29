import React from 'react';
import Container from './Container';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgGrad?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  bgGrad = 'from-slate-900 via-slate-800 to-[#064823]/90',
}) => {
  return (
    <section className={`relative py-16 md:py-24 bg-gradient-to-r ${bgGrad} text-white overflow-hidden shadow-md`}>
      {/* Decorative accent patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F7840F_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7840F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#064823]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#F7840F] text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#8DC541] animate-ping" />
          <span className="normal-case">MEATiN</span> Fresh Quality
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bree tracking-tight text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
};

export default PageBanner;
