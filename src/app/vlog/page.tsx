'use client';

import React, { useEffect, useRef } from 'react';

export default function VlogPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Vlog video autoplay error:", err);
      });
    }
  }, []);

  return (
    <div className="w-full bg-white font-inter relative flex flex-col justify-center overflow-hidden pt-20 lg:pt-0">
      {/* Full Width Video with Light Background */}
      <div className="w-full relative overflow-hidden bg-slate-100 min-h-auto lg:min-h-[65vh] lg:max-h-[100vh]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/vlog/vlog-vdo.mp4" type="video/mp4" />
          <source src="/vlog/vlog-vdo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}




