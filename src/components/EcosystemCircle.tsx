'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface EcosystemPillar {
  id: number;
  num: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
}

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    id: 1,
    num: '01',
    title: 'Performing a safe and humane slaughter',
    shortDesc: 'Adhering to strict humane protocols, stress-free processing, and certified hygienic practices.',
    fullDesc: 'Standardized benchmarks, automated climate-controlled facilities, and rigorous protocols to elevate meat processing industry-wide with zero compromise on animal welfare.'
  },
  {
    id: 2,
    num: '02',
    title: 'Adopting animal husbandry and sustainable livestock practices',
    shortDesc: 'Partnering with certified farms ensuring natural feed, open environments, and ecological balance.',
    fullDesc: 'Closing the loop across feed management, livestock welfare, energy-efficient processing, and regenerative organic byproduct conversion.'
  },
  {
    id: 3,
    num: '03',
    title: 'Ensuring humane treatment of animals',
    shortDesc: 'Prioritizing animal welfare, ethical veterinary care, and compassionate handling at every stage.',
    fullDesc: 'Prioritizing ethical care, stress-free environments, continuous veterinary inspections, and humane protocols throughout every phase of sourcing and transport.'
  },
  {
    id: 4,
    num: '04',
    title: 'Upholding Halal practices in production',
    shortDesc: 'Dedicated to ensuring that our products, and the way we produce, meet the highest halal standards, with integrity and respect for our customers and communities.',
    fullDesc: 'Dedicated to ensuring that our products, and the way we produce, meet the highest halal standards, with integrity and respect for our customers and communities.'
  },
  {
    id: 5,
    num: '05',
    title: 'Respecting social economic development',
    shortDesc: 'Generating rural prosperity, fair farming partnerships, and sustainable employment in local communities.',
    fullDesc: 'Empowering local farmers, logistics operators, and rural communities through structured employment, fair pricing, and long-term economic enablement.'
  },
  {
    id: 6,
    num: '06',
    title: 'Committing to environmental protection',
    shortDesc: 'Investing in renewable energy, zero-waste byproduct recycling, and advanced wastewater treatment.',
    fullDesc: 'Investing in rooftop solar energy, advanced effluent treatment plants (ETP), and progressive zero-landfill biodegradable packaging objectives.'
  },
  {
    id: 7,
    num: '07',
    title: 'Offering our employees a healthy and safe work environment',
    shortDesc: 'Providing world-class ergonomics, extensive safety gear, health benefits, and dignity of labor.',
    fullDesc: 'Ensuring state-of-the-art protective equipment, ergonomic workstations, comprehensive healthcare coverage, and positive workplace safety culture.'
  },
  {
    id: 8,
    num: '08',
    title: 'Maintaining continuous improvement in our operations',
    shortDesc: 'Continuous R&D, cold-chain automation, and international standard audits across every unit.',
    fullDesc: 'Executing rigorous microbiological quality audits, automated temperature controls, and international process standards across our facility network.'
  },
  {
    id: 9,
    num: '09',
    title: 'Upholding long-term value to stakeholders',
    shortDesc: 'Delivering dependable supply, principled business ethics, and enduring value for consumers and partners.',
    fullDesc: 'Creating durable resilience for consumers, team members, farmers, and investors through principled, ethical stewardship and dependable supply.'
  },
  {
    id: 10,
    num: '10',
    title: 'Building a legacy of trust',
    shortDesc: 'Delivering pure quality, uncompromising food safety, and transparent honesty from our family to yours.',
    fullDesc: 'Cultivating decades of consumer confidence by remaining transparent, scientifically modern, and deeply loyal to purity and customer health.'
  }
];

export default function EcosystemCircle() {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Starts from 01
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Whenever this section goes off viewport and comes back into viewport, reset to 01
  useEffect(() => {
    if (isInView) {
      setActiveIndex(0);
    }
  }, [isInView]);

  // Auto-advance every 5.5s unless user is hovering/interacting with the list or section is out of view
  useEffect(() => {
    if (isHovered || !isInView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ECOSYSTEM_PILLARS.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isInView]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FBFBF8] py-12 sm:py-16 lg:py-14 overflow-hidden select-none border-y border-[#EAE8E0]">
      {/* MAIN 2-COLUMN SECTION: Left Docked Visual (stretching to full height) + Right Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-stretch pr-5 sm:pr-8 lg:pr-12 xl:pr-16">
        
        {/* LEFT: Single Meat Board Image Filling Height to Match Right Content - 3D Perspective Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -70, rotateY: 14, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="lg:col-span-6 xl:col-span-6 w-full pl-5 sm:pl-8 lg:pl-0 flex flex-col"
        >
          <div className="relative w-full h-[400px] sm:h-[480px] lg:h-full min-h-[400px] lg:min-h-[620px] rounded-[24px] sm:rounded-[28px] lg:rounded-l-none lg:rounded-r-[36px] xl:rounded-r-[42px] overflow-hidden shadow-[0_20px_50px_rgba(14,71,38,0.12)] border border-slate-200/80 bg-slate-100 group">
            {/* The Single Meat Board Image */}
            <Image
              src="/Product/we-are-meatin-image.webp"
              alt="MEATiN - Fresh Premium Meats"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* RIGHT: Heading + Timeline Accordion List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 w-full pl-5 sm:pl-8 lg:pl-0 flex flex-col justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header placed inside the right side content */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-black font-manrope tracking-tight leading-none">
              <span className="text-[#0E4726]">WE ARE </span>
              <span className="text-[#ea7200]">MEATiN</span>
            </h2>
          </div>

          <div className="relative space-y-2 sm:space-y-2.5">
            {/* Continuous Vertical Timeline Line - Center mathematically locked at half of w-8/w-10 */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="absolute left-4 sm:left-5 top-5 bottom-5 w-[2px] -translate-x-1/2 bg-[#D8E4D3] pointer-events-none"
            />

            {ECOSYSTEM_PILLARS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 14,
                    delay: 0.05 + index * 0.04,
                  }}
                  className="relative flex items-center gap-3 sm:gap-4.5"
                >
                  {/* Dedicated Timeline Column - Centers every dot directly on the vertical line */}
                  <div className="relative w-8 sm:w-10 shrink-0 flex items-center justify-center z-10">
                    {isActive ? (
                      /* Active Dot on the line with glowing ring */
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-6 h-6 rounded-full bg-[#8DC541]/25 animate-ping" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8DC541] ring-4 ring-[#8DC541]/30 ring-offset-2 ring-offset-[#FBFBF8] transition-all duration-300 relative z-10" />
                      </div>
                    ) : (
                      /* Inactive Dot on the line */
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          Math.abs(index - activeIndex) === 1
                            ? 'w-2.5 h-2.5 bg-[#8DC541]'
                            : 'w-2 h-2 bg-[#A8C7A0]'
                        }`}
                      />
                    )}
                  </div>

                  {/* Card Column - Seamlessly aligned for both active and inactive states */}
                  <div className="flex-1 min-w-0">
                    {isActive ? (
                      /* ACTIVE EXPANDED ITEM CARD - Scaling & layout fully inside card with increased typography */
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="w-full bg-white rounded-[20px] sm:rounded-[24px] border-2 border-[#A8DB86] p-4 sm:p-5 lg:p-6 shadow-[0_6px_22px_rgba(141,197,65,0.14)] flex items-center justify-between gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4 lg:gap-5 min-w-0">
                          {/* Large Green Number Circle INSIDE the card */}
                          <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-[#8DC541] text-white font-bold text-base sm:text-lg lg:text-xl flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(141,197,65,0.35)]">
                            {item.num}
                          </div>

                          {/* Title & Description with increased font sizes */}
                          <div className="space-y-1 min-w-0 pr-1">
                            <h4 className="text-base sm:text-lg lg:text-[1.22rem] font-bold text-[#0E4726] font-manrope leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium leading-relaxed font-manrope">
                              {item.shortDesc}
                            </p>
                          </div>
                        </div>

                        {/* Action Chevron Circle */}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 bg-slate-50">
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </div>
                      </motion.div>
                    ) : (
                      /* INACTIVE ROW - Clean Pill with increased font size */
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="w-full bg-white/80 hover:bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 hover:border-[#8DC541] py-2.5 sm:py-3.5 px-3.5 sm:px-5 flex items-center justify-between gap-3 shadow-none hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          {/* Clean Number Pill */}
                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-slate-200 group-hover:border-[#8DC541] group-hover:bg-[#8DC541] text-xs sm:text-[13.5px] font-bold text-slate-600 group-hover:text-white shrink-0 transition-all duration-200">
                            {item.num}
                          </span>

                          {/* Title with increased font size */}
                          <span className="text-[14.5px] sm:text-base lg:text-[16.5px] font-semibold text-[#1F3327] group-hover:text-[#0E4726] transition-colors truncate">
                            {item.title}
                          </span>
                        </div>

                        {/* Subtle Chevron */}
                        <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-300 group-hover:text-[#8DC541] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
