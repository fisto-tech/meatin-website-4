'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ComponentItem {
  id: string;
  name: string;
  icon: string;
}

const COMPONENTS: ComponentItem[] = [
  {
    id: '01',
    name: 'Large animal slaughterhouse',
    icon: 'healthicons:animal-cow',
  },
  {
    id: '02',
    name: 'Small animal slaughterhouse',
    icon: 'game-icons:goat',
  },
  {
    id: '03',
    name: 'Poultry processing unit',
    icon: 'cbi:chicken',
  },
  {
    id: '04',
    name: 'Rendering plant',
    icon: 'clarity:factory-solid',
  },
  {
    id: '05',
    name: 'Lairages',
    icon: 'material-symbols-light:warehouse',
  },
  {
    id: '06',
    name: '200 KLD ETP',
    icon: 'griddy-icons:water-drop-filled',
  },
  {
    id: '07',
    name: 'Biogas plant',
    icon: 'f7:flame-fill',
  },
  {
    id: '08',
    name: 'Biofilter plant',
    icon: 'ph:plant-fill',
  },
  {
    id: '09',
    name: 'Freezing & cold storage units',
    icon: 'emojione-monotone:snowflake',
  },
];

export default function InfrastructureSection() {
  return (
    <section className="relative w-full bg-[#F4F4EA] overflow-hidden flex flex-col justify-end pt-10 sm:pt-14 lg:pt-[3.6vw] pb-0 select-none">
      
      {/* Background Factory Facility Building Image - Half height on desktop docked top right with zoom-in reveal */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-0 w-full lg:w-[68vw] h-full lg:h-[58%] opacity-65 lg:opacity-100"
        >
          <Image
            src="/AboutUs/infrastructure/infrastructure-background-building.webp"
            alt="MEATiN Infrastructure Facility"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle soft gradient fade into #F4F4EA from the left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4EA] via-[#F4F4EA]/90 lg:via-[#F4F4EA]/40 via-[30%] to-transparent" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#F4F4EA] via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-[3.6vw] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end">
          
          {/* LEFT COLUMN: Headings & 9 Pill Items */}
          <div className="lg:col-span-5 pb-6 sm:pb-10 lg:pb-[2.8vw] z-10">
            
            {/* Eyebrow & Main Headings */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3.5 sm:mb-5 lg:mb-[1.5vw]"
            >
              {/* Eyebrow label with left line */}
              <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-[0.5vw] mb-1.5 lg:mb-[0.4vw]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  style={{ originX: 0 }}
                  className="w-4 sm:w-6 lg:w-[1.4vw] h-[2px] lg:h-[0.16vw] bg-[#D4A437]"
                />
                <span className="text-[11px] sm:text-xs lg:text-[0.72vw] font-bold tracking-[0.24em] text-[#D4A437] uppercase font-manrope">
                  OUR INFRASTRUCTURE
                </span>
              </div>

              {/* Main Titles with masked slide */}
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="font-extrabold font-barlow-condensed tracking-normal leading-[0.9] text-5xl sm:text-6xl lg:text-[4.6vw]"
                >
                  <span className="text-[#1F5A3C] block">MEAT<span className="lowercase">i</span>N</span>
                  <span className="text-[#F58408] block uppercase">COMPONENTS</span>
                </motion.h2>
              </div>

              {/* Subheading text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-800 font-medium leading-snug mt-2 lg:mt-[0.55vw] text-sm sm:text-base lg:text-[1.12vw] max-w-sm sm:max-w-md lg:max-w-[24vw]"
              >
                An integrated ecosystem designed for safe, scalable and sustainable meat production.
              </motion.p>
            </motion.div>

            {/* 9 Component Capsule Pills - Dynamic Interactive Hover Effects */}
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-[0.55vw] max-w-lg lg:max-w-none lg:w-[37.5vw] relative z-10">
              {COMPONENTS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 14,
                    delay: 0.08 + idx * 0.045,
                  }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    backgroundColor: '#F0F9EC',
                    borderColor: '#8DC541',
                    boxShadow: '0px 10px 24px rgba(31, 90, 60, 0.15)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: '#F9FCF7',
                    border: '1.5px solid #EEF4EE',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                    borderRadius: '164.387px',
                  }}
                  className="w-full py-2 sm:py-2.5 lg:py-[0.5vw] pl-3.5 sm:pl-4 lg:pl-[1.1vw] pr-4 sm:pr-6 lg:pr-[2.5vw] flex items-center justify-between gap-3 sm:gap-3.5 lg:gap-[0.9vw] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 lg:gap-[0.9vw]">
                    {/* Dark Green Icon with dynamic pop & spin on hover */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[1.6vw] lg:h-[1.6vw] rounded-full bg-[#E5F5E4] group-hover:bg-[#1F5A3C] flex items-center justify-center shrink-0 text-[#063D26] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                      <Icon
                        icon={item.icon}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[0.95vw] lg:h-[0.95vw] object-contain transition-colors"
                      />
                    </div>

                    {/* Component Title */}
                    <span className="text-[14px] sm:text-[15.5px] lg:text-[1.1vw] font-semibold text-slate-800 group-hover:text-[#1F5A3C] tracking-normal leading-none whitespace-nowrap transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>

                  {/* Micro Arrow indicator on hover */}
                  <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#8DC541]">
                    <Icon icon="lucide:arrow-right" className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-[1vw] lg:h-[1vw]" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Meat Worker & 2 Stacked Photo Cards */}
          <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end z-20">
            
            {/* Center-Right: Meat Worker holding blue crate with grounded lift-up scroll entrance */}
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-[330px] sm:w-[440px] md:w-[500px] lg:w-[43vw] h-auto pointer-events-none lg:mr-[17vw] xl:mr-[19vw] -mb-1 lg:-ml-[15vw]"
            >
              <Image
                src="/AboutUs/infrastructure/infrastructure-person.webp"
                alt="MEATiN Professional Quality Specialist"
                width={700}
                height={900}
                priority
                className="w-full h-auto object-contain block drop-shadow-[0_25px_40px_rgba(0,0,0,0.22)]"
              />
            </motion.div>

            {/* Far-Right: 2 Stacked Rounded Photo Cards with Rich 3D Hover Depth */}
            <div className="hidden md:flex flex-col gap-3.5 sm:gap-4 lg:gap-[1.3vw] absolute right-0 top-[45%] lg:top-[53%] -translate-y-1/2 z-30 pointer-events-auto">
              
              {/* Card 1: Processing Line with Workers */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.88, rotate: 4 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.25 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 0, 
                  y: -6,
                  boxShadow: '0 25px 50px -12px rgba(6, 61, 38, 0.35)'
                }}
                className="relative w-[180px] sm:w-[210px] lg:w-[15.5vw] aspect-[16/10] rounded-2xl sm:rounded-3xl lg:rounded-[1.5vw] overflow-hidden shadow-2xl border-[3px] lg:border-[0.22vw] border-white group bg-slate-100 cursor-pointer transition-all duration-300"
              >
                <Image
                  src="/AboutUs/infrastructure/infrastructure-card-1.webp"
                  alt="MEATiN Processing Facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-[11px] sm:text-xs lg:text-[0.75vw] font-bold tracking-wider uppercase font-manrope drop-shadow-md">
                    Processing Plant
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Cold Storage Warehouse Racks */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.88, rotate: -4 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.38 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 0, 
                  y: -6,
                  boxShadow: '0 25px 50px -12px rgba(6, 61, 38, 0.35)'
                }}
                className="relative w-[180px] sm:w-[210px] lg:w-[15.5vw] aspect-[16/10] rounded-2xl sm:rounded-3xl lg:rounded-[1.5vw] overflow-hidden shadow-2xl border-[3px] lg:border-[0.22vw] border-white group bg-slate-100 cursor-pointer transition-all duration-300"
              >
                <Image
                  src="/AboutUs/infrastructure/infrastructure-card-2.webp"
                  alt="MEATiN Cold Storage Units"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-[11px] sm:text-xs lg:text-[0.75vw] font-bold tracking-wider uppercase font-manrope drop-shadow-md">
                    Cold-Chain Storage
                  </span>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}


