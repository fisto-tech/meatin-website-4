'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import CareersBanner from '@/components/layout/CareersBanner';
import MeetOurTeamBanner from '@/components/team/MeetOurTeamBanner';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  shiftImage?: boolean; 
}

const ledByMembers: TeamMember[] = [
  {
    name: "Mr. SHIBU K.MOHAMED",
    role: "Chairman",
    image: "/MeetOurTeam/led-by-persons/Mr. SHIBU K.MOHAMED.webp",
  },
  {
    name: "Mr. ALI VARIKUNNATH",
    role: "Managing Director",
    image: "/MeetOurTeam/led-by-persons/Mr. ALI VARIKUNNATH.webp",
  },
  {
    name: "Mr. RAFEEQUE ARAKKAKATTIL",
    role: "Chief Executive Officer",
    image: "/MeetOurTeam/led-by-persons/Mr. RAFEEQUE ARAKKAKATTIL.webp",
  },
];

const directors: TeamMember[] = [
  // {
  //   name: "Mohanan Pilankuvittil",
  //   role: "Project Consultant",
  //   image: "/MeetOurTeam/directors-persons/Mohanan Pilankuvittil.webp",
  // },
  {
    name: "Mohamed Asharaf K",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Asharaf K.webp",
  },
  {
    name: "Anfas K Mohamed",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Anfas K Mohamed.webp",
  },
  {
    name: "Nazeer VM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nazeer VM.webp",
  },
  {
    name: "Jadeer Akthar M",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Jadeer Akthar M.webp",
  },
  {
    name: "Arshad Asharaf",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Arshad Asharaf.webp",
  },
  {
    name: "Rooshid Mohiyudheen C A",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rooshid Mohiyudheen C A.webp",
  },
  {
    name: "Nasir Neriyar",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nasir Neriyar.webp",
  },
  {
    name: "Moosakutty MM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Moosakutty MM.webp",
  },
  {
    name: "Sabeer Abdul Rahman",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Sabeer Abdul Rahman.webp",
  },
  {
    name: "Abbas Chemban",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Abbas Chemban.webp",
  },
  {
    name: "Hydros Villan",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Hydros Villan.webp",
  },
  {
    name: "Rafi Abdu Rahman",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rafi Abdu Rahman.webp",
  },
  {
    name: "Anas Kamaru",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Anas Kamaru.webp",
  },
  {
    name: "Mohamed Gadhafi Pilakal",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Gadhafi Pilakal.webp",
  },
];



export default function TeamPage() {

  interface Director {
    name: string;
    role: string;
    image: string;
  }

  interface DirectorCardProps {
    member: Director;
    idx: number;
  }

  const DirectorCard = ({ member, idx }: DirectorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: (idx % 5) * 0.08,
      }}
      className="
        group relative flex flex-col items-center

        /* Mobile */
        w-[calc(50%-7px)]
        min-[380px]:w-[calc(50%-8px)]
        max-w-[180px]

        /* Tablet */
        sm:max-w-none
        sm:w-[200px]
        md:w-[220px]

        /* Desktop */
        lg:w-[215px]
        xl:w-[230px]
        2xl:w-[245px]

        transition-transform duration-500
        hover:scale-[1.03]
      "
    >
      {/* Photo */}
      <div className="relative w-full aspect-[622/564] overflow-hidden flex items-end justify-center">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-contain object-bottom"
          sizes="
            (max-width: 640px) 180px,
            (max-width: 768px) 200px,
            (max-width: 1024px) 215px,
            (max-width: 1280px) 230px,
            245px
          "
        />
      </div>

      {/* Green name block */}
      <div
        className="
          relative
          w-full
          h-[48px]
          min-[360px]:h-[52px]
          sm:h-[68px]

          bg-[#064823]
          text-white

          pl-1.5
          min-[360px]:pl-2
          sm:pl-3

          pr-1.5
          sm:pr-2

          py-1
          sm:py-2

          flex
          flex-col
          justify-center
          items-start
        "
      >
        {/* Name */}
        <h3
          className="
            block
            w-full
            max-w-full

            text-[11px]
            min-[350px]:text-[11.5px]
            min-[375px]:text-[12.5px]
            min-[400px]:text-[13.5px]

            sm:text-[0.95rem]
            lg:text-[1.05rem]
            xl:text-[1.1rem]
            2xl:text-[1.2rem]

            font-bold
            text-white
            font-barlow

            tracking-tight
            sm:tracking-wide

            leading-tight
            whitespace-nowrap
          "
        >
          {member.name}
        </h3>

        {/* Role */}
        <p
          className="
            w-full
            text-[10.5px]
            min-[360px]:text-[11px]
            min-[390px]:text-[12px]

            sm:text-sm

            font-semibold
            text-white/95

            tracking-normal

            mt-0.5
            sm:mt-1

            flex
            items-center

            gap-1
            sm:gap-1.5

            font-manrope
            leading-tight

            pr-5
            min-[360px]:pr-6
            sm:pr-7
          "
        >
          <span
            className="
              text-white/80
              group-hover:text-[#D4A437]
              transition-colors
              duration-300
              shrink-0

              text-[10px]
              sm:text-xs
            "
          >
            ★
          </span>

          <span className="whitespace-nowrap">
            {member.role}
          </span>
        </p>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute

            bottom-1
            right-1

            min-[360px]:bottom-1.5
            min-[360px]:right-1.5

            sm:bottom-2
            sm:right-2.5

            z-20

            w-4.5
            h-4.5

            min-[360px]:w-5
            min-[360px]:h-5

            sm:w-6.5
            sm:h-6.5

            rounded-full

            bg-[#0077B5]
            hover:bg-[#005582]

            transition-colors

            flex
            items-center
            justify-center

            text-white
            shadow-md

            active:scale-90
            shrink-0
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="
              w-2.5
              h-2.5

              min-[360px]:w-3
              min-[360px]:h-3

              sm:w-3.5
              sm:h-3.5

              fill-white
            "
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38-1.11-2.5-2.48-2.5s-2.48 1.12-2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};




  return (

    <div className="w-full bg-[#FCFAF7] text-[#1E293B] overflow-x-clip font-manrope">

      {/* Hero Section */}
      <section className="relative w-full pt-[85px] sm:pt-[95px] lg:pt-[95px] bg-white flex items-center overflow-hidden">
        {/* Full Edge-to-Edge Hero Image Container */}
        <div className="relative w-full min-h-[310px] sm:min-h-[370px] lg:h-[390px] py-4 sm:py-6 lg:py-0 flex items-center overflow-hidden">
          {/* Edge to Edge Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/MeetOurTeam/hero/meet-our-team-hero-image.webp"
              alt="MEATiN Boardroom"
              fill
              priority
              className="object-cover object-[55%_50%] sm:object-[60%_50%] lg:object-[40%_50%]"
              sizes="100vw"
            />
          </div>

          {/* Hero Content Overlay with Glassy Frosted Card */}
          <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[88vw] mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-[340px] sm:max-w-[460px] lg:max-w-[500px] bg-white/75 backdrop-blur-md border border-white/70 rounded-3xl p-5 sm:p-8 shadow-xl"
            >
              {/* MEATiN Logo for Mobile and Tablet view alone */}
              {/* <div className="block lg:hidden mb-2.5 sm:mb-3.5 mx-auto">
                <div className="relative w-[150px] sm:w-[200px] h-[75px] mx-auto">
                  <Image
                    src="/meatin-logo.webp"
                    alt="MEATiN Logo"
                    fill
                    priority
                    className="object-contain object-center"
                  />
                </div>
              </div> */}

              <h2 className="text-[#1E3B2B] font-extrabold font-manrope tracking-widest text-[10px] sm:text-xs uppercase mb-1.5">
                OUR PEOPLE. OUR STRENGTH.
              </h2>

              <h1 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold font-anek tracking-normal leading-none uppercase mb-3 text-left">
                <span className="text-[#064823] mr-2">MEET</span>
                <span className="text-[#F7840F]">THE TEAM</span>
              </h1>

              <p className="text-slate-800 font-medium text-xs sm:text-sm lg:text-base leading-relaxed mb-4 max-w-md">
                The leadership team driving MEATiN's vision of delivering farm-fresh, hygienically processed meat with uncompromising quality and trust.
              </p>

              {/* Original Hero Leaf Underline SVG Asset */}
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] h-6 mt-1">
                <Image
                  src="/MeetOurTeam/hero/hero-leaf-underline.svg"
                  alt="Leaf Underline"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Led By / Executive Leadership Section */}
      <section className="relative pt-10 lg:py-10 bg-[#FCFAF7] overflow-hidden">
        {/* Background Doodles */}
        {/* Top-Left: Growth chart doodle */}
        <div className="absolute top-[2%] left-[-5%] sm:left-[-2%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[230px] xl:h-[230px] 2xl:w-[260px] 2xl:h-[260px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/left-side-growth-image.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Left: Support hands holding people doodle */}
        <div className="absolute top-[65%] left-[-4%] sm:left-[8%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[230px] xl:h-[230px] 2xl:w-[270px] 2xl:h-[270px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/support-image-hand.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Right: Handshake right-side doodle */}
        <div className="absolute top-[60%] right-[-5%] sm:right-[-2%] w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] 2xl:w-[280px] 2xl:h-[280px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/right-shake-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-3 sm:px-6 lg:px-[1.5vw]">

          {/* Centered LED BY Title with Gold Separator Lines */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8 min-[380px]:mb-10 sm:mb-16"
          >
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#064823] tracking-relaxed uppercase px-4 sm:px-6">
              LED BY
            </h2>

            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </motion.div>

          {/* Flexbox layout to cleanly wrap and center the rows — 2 per row on mobile */}
          <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-8 min-[380px]:gap-x-4 min-[380px]:gap-y-10 sm:gap-x-10 sm:gap-y-16 lg:gap-x-[3vw] xl:gap-x-[2.5vw] lg:gap-y-20 max-w-7xl xl:max-w-[1350px] 2xl:max-w-[1400px] mx-auto">

            {ledByMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group relative flex flex-col items-center w-[calc(50%-7px)] min-[380px]:w-[calc(50%-8px)] max-w-[195px] sm:max-w-none sm:w-[260px] md:w-[200px] lg:w-[260px] xl:w-[275px] 2xl:w-[285px] transition-transform duration-500 hover:scale-[1.03]"
              >
                {/* Photo container */}
                <div className="relative w-full aspect-[622/564] overflow-hidden flex items-end justify-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 640px) 195px, (max-width: 768px) 260px, 285px"
                  />
                </div>

                {/* Bright green box */}
                <div className="relative w-full h-[48px] min-[360px]:h-[52px] sm:h-[68px] bg-[#064823] text-white pl-1.5 min-[360px]:pl-2 sm:pl-3 pr-1.5 sm:pr-3 py-1 sm:py-2 flex flex-col justify-center items-start">
                  <h3 className="w-full text-[11px] min-[350px]:text-[11.5px] min-[375px]:text-[12.5px] min-[400px]:text-[13.5px] sm:text-[rem] lg:text-[1.05rem] xl:text-[1.1rem] 2xl:text-[1.2rem] font-bold text-white font-barlow tracking-tight sm:tracking-wide leading-tight whitespace-nowrap">
                    {member.name}
                  </h3>
                  <p className="text-[10.5px] min-[360px]:text-[11px] min-[390px]:text-[12px] sm:text-sm font-semibold text-white/95 tracking-normal mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 font-manrope leading-tight pr-5 min-[360px]:pr-6 sm:pr-7">
                    <span className="text-white/80 group-hover:text-[#D4A437] transition-colors duration-300 shrink-0 text-[10px] sm:text-xs">★</span>
                    <span className="whitespace-nowrap sm:whitespace-normal">{member.role}</span>
                  </p>

                  {/* Floating blue LinkedIn icon */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-1 right-1 min-[360px]:bottom-1.5 min-[360px]:right-1.5 sm:bottom-2 sm:right-2.5 z-20 w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 sm:w-6.5 sm:h-6.5 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-colors flex items-center justify-center text-white shadow-md active:scale-90 shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3.5 sm:h-3.5 fill-white">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="relative pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12 bg-[#FCFAF7] overflow-hidden border-t border-slate-100">

        {/* Background Doodles */}
        {/* Mid-Left: Together piece left side doodle */}
        <div className="absolute top-[35%] left-[-5%] sm:left-[-3%] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] 2xl:w-[240px] 2xl:h-[240px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/together-piece-left-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Right: Together piece right side doodle */}
        <div className="absolute top-[40%] right-[-5%] sm:right-[-3.2%] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[175px] lg:h-[175px] xl:w-[210px] xl:h-[210px] 2xl:w-[250px] 2xl:h-[250px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/together-piece-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-Left: Handshake left side doodle */}
        <div className="absolute bottom-[5%] left-[-5%] sm:left-[-2%] w-[105px] h-[105px] sm:w-[150px] sm:h-[150px] lg:w-[190px] lg:h-[190px] xl:w-[230px] xl:h-[230px] 2xl:w-[270px] 2xl:h-[270px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/handshake-left-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-Right: Growth image right side doodle */}
        <div className="absolute bottom-[5%] right-[-5%] sm:right-[-2%] w-[100px] h-[100px] sm:w-[145px] sm:h-[145px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] 2xl:w-[260px] 2xl:h-[260px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/growth-image-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[92vw] xl:max-w-[90vw] mx-auto px-3 sm:px-6 lg:px-[1.5vw]">

          {/* Centered DIRECTORS Title with Gold Separator Lines */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8 min-[380px]:mb-10 sm:mb-16"
          >
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#064823] tracking-relaxed uppercase px-4 sm:px-6">
              DIRECTORS
            </h2>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </motion.div>



          {/* Directors Grid */}
          <div className="max-w-[1600px] mx-auto">

            {/* ===================================================== */}
            {/* MOBILE — 2 CARDS PER ROW                             */}
            {/* ===================================================== */}

            <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-8 min-[380px]:gap-x-4 min-[380px]:gap-y-10 min-[500px]:gap-x-8 lg:hidden">
              {directors.map((member, idx) => (
                <DirectorCard
                  key={idx}
                  member={member}
                  idx={idx}
                />
              ))}
            </div>


            {/* ===================================================== */}
            {/* TABLET + DESKTOP                                     */}
            {/* ===================================================== */}

            <div className="hidden lg:block">


              {/* ================================================= */}
              {/* ROW 1 — 4 CARDS                                  */}
              {/* ================================================= */}

              <div
                className="flex flex-wrap justify-center gap-x-6 md:gap-x-7 lg:gap-x-[2.5vw] xl:gap-x-[2vw] 2xl:gap-x-[2.2vw] gap-y-14 lg:gap-y-16 max-w-[1400px] xl:max-w-[1500px] 2xl:max-w-[1600px] mx-auto">
                {directors.slice(0, 4).map((member, idx) => (
                  <DirectorCard
                    key={idx}
                    member={member}
                    idx={idx}
                  />
                ))}
              </div>


              {/* ================================================= */}
              {/* ROWS 2 + 3 — REMAINING CARDS                     */}
              {/* ================================================= */}

              <div
                className="flex flex-wrap justify-center gap-x-6 md:gap-x-7 lg:gap-x-[2.5vw] xl:gap-x-[2vw] 2xl:gap-x-[2.2vw] gap-y-14 md:gap-y-16 lg:gap-y-16 mt-14 md:mt-16 lg:mt-16 mx-auto max-w-[1400px] xl:max-w-[1550px] 2xl:max-w-[1650px]">
                {directors.slice(4).map((member, idx) => (
                  <DirectorCard
                    key={idx + 4}
                    member={member}
                    idx={idx + 4}
                  />
                ))}
              </div>

            </div>
          </div>


        </div>
      </section>

      {/* MEET OUR TEAM BANNER SECTION */}
      <section className="relative z-10 pt-0 pb-20 sm:pt-0 sm:pb-28 lg:pb-32 bg-[#FCFAF7] overflow-hidden">
        {/* Background Side Doodles around the banner as seen in Reference Image 3 */}
        {/* Left Side Handshake Doodle */}
        <div className="absolute top-[8%] left-[0.5%] lg:left-[2%] xl:left-[3%] w-[120px] sm:w-[170px] lg:w-[220px] xl:w-[260px] aspect-square pointer-events-none select-none z-0 opacity-80">
          <Image
            src="/MeetOurTeam/doodles-bg/handshake-left-side.webp"
            alt="Handshake doodle left"
            fill
            className="object-contain"
          />
        </div>

        {/* Right Side Growth Arrow Doodle */}
        <div className="absolute top-[5%] right-[0.5%] lg:right-[2%] xl:right-[3%] w-[110px] sm:w-[160px] lg:w-[210px] xl:w-[250px] aspect-square pointer-events-none select-none z-0 opacity-80">
          <Image
            src="/MeetOurTeam/doodles-bg/growth-image-right-side.webp"
            alt="Growth doodle right"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <MeetOurTeamBanner />
        </div>

        {/* Position Absolute Centered Bottom Doodle (without green background) */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[11%] w-[280px] sm:w-[440px] md:w-[540px] lg:w-[660px] h-[100px] sm:h-[150px] md:h-[180px] lg:h-[220px] pointer-events-none select-none z-20">
          <Image
            src="/MeetOurTeam/doodles-bg/bottom-doodle.webp"
            alt="Bottom Doodle"
            fill
            className="object-contain object-bottom opacity-75"
          />
        </div>
      </section>

    </div>
  );
}
