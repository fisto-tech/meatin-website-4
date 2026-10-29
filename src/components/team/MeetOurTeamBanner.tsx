'use client';

import React from 'react';

export default function MeetOurTeamBanner() {
  return (
    <div className="w-full relative select-none">
      {/* Desktop Banner View */}
      <div className="hidden md:block w-full relative overflow-hidden">
        {/* Base Banner */}
        <img
          src="/MeetOurTeam/banner/banner.svg"
          alt="Meet Our Team Banner"
          className="w-full h-auto block select-none pointer-events-none"
        />

  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      clipPath:
        'inset(3.945% 1.623% 5.917% 1.579% round 12px)',
    }}
  >

        {/* People Image */}
        <div
          className="absolute top-[9.68%] left-[49.9%] w-[48.55%] h-[85.32%] pointer-events-none z-10 overflow-hidden"
        >
          <img
            src="/MeetOurTeam/banner/neet-out-team-banner-people-image.webp"
            alt="MEATiN Team Members"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

  </div>
      </div>

      {/* Mobile Banner View */}
      <div className="block md:hidden w-full relative">
        <img
          src="/MeetOurTeam/banner/banner-mobile.svg"
          alt="Meet Our Team Mobile Banner"
          className="w-full h-auto block select-none pointer-events-none"
        />
        {/* People Image Overlay for Mobile */}
        <div className="absolute top-[51.43%] left-0 w-full h-[47.35%] pointer-events-none z-10 overflow-hidden">
          <img
            src="/MeetOurTeam/banner/neet-out-team-banner-people-image.webp"
            alt="MEATiN Team Members"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

