"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Icon } from "@iconify/react";

interface Product3DViewerProps {
  frontImg: string;
  backImg?: string;
  title: string;
  className?: string;
}

export default function Product3DViewer({
  frontImg,
  title,
  className = "",
}: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction States
  const [isDragging, setIsDragging] = useState(false);
  const [autoMotion, setAutoMotion] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number }>({
    x: 0,
    y: 0,
    rotY: 0,
    rotX: 0,
  });

  // Motion Values for Volumetric 3D Tilt (Clamped so image never flattens to a paper edge)
  const rotY = useMotionValue(0);
  const rotX = useMotionValue(6);

  // Physics Spring Smoothing
  const springConfig = { stiffness: 220, damping: 24, mass: 0.5 };
  const smoothRotY = useSpring(rotY, springConfig);
  const smoothRotX = useSpring(rotX, springConfig);

  // Dynamic Multi-Plane Lighting & Sheen (Follows tilt angle across cut surface)
  const sheenX = useTransform(smoothRotY, [-38, 38], ["15%", "85%"]);
  const sheenY = useTransform(smoothRotX, [-32, 32], ["85%", "15%"]);
  const sheenOpacity = useTransform(
    [smoothRotY, smoothRotX],
    ([y, x]) => Math.min(0.65, 0.25 + (Math.abs(Number(y)) + Math.abs(Number(x))) / 90)
  );

  // Rim Light Glow (Opposite direction of tilt for authentic 3D curvature)
  const rimGlowX = useTransform(smoothRotY, [-38, 38], [25, -25]);
  const rimGlowY = useTransform(smoothRotX, [-32, 32], [-15, 15]);

  // Dynamic Contact Shadow Reactions
  const shadowX = useTransform(smoothRotY, [-38, 38], [-22, 22]);
  const shadowScaleX = useTransform(smoothRotY, [-38, 38], [1.08, 0.92]);
  const shadowOpacity = useTransform(smoothRotX, [-32, 32], [0.45, 0.25]);

  // Ambient Idle Floating & Wobble
  useEffect(() => {
    let animationFrameId: number;

    const tick = (timestamp: number) => {
      const isIdle = Date.now() - lastInteractionTime > 2000;
      if (autoMotion && !isDragging && isIdle) {
        const time = timestamp * 0.0015;
        // Natural organic 3D floating wobble (bounded to +/- 18 degrees)
        const targetY = Math.sin(time) * 16;
        const targetX = 6 + Math.cos(time * 0.8) * 10;
        rotY.set(targetY);
        rotX.set(targetX);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoMotion, isDragging, lastInteractionTime, rotY, rotX]);

  // Pointer / Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastInteractionTime(Date.now());
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: rotY.get(),
      rotX: rotX.get(),
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setLastInteractionTime(Date.now());
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Clamp rotation strictly to [-38deg, +38deg] horizontally and [-28deg, +28deg] vertically
    const newRotY = Math.max(-38, Math.min(38, dragStartRef.current.rotY + deltaX * 0.35));
    const newRotX = Math.max(-28, Math.min(28, dragStartRef.current.rotX - deltaY * 0.3));

    rotY.set(newRotY);
    rotX.set(newRotX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setLastInteractionTime(Date.now());
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Hover Orbit on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    rotY.set(xRatio * 32);
    rotX.set(-yRatio * 24 + 6);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      rotY.set(0);
      rotX.set(6);
    }
  };

  // Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setLastInteractionTime(Date.now());
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom((prev) => Math.max(0.85, Math.min(1.4, prev + delta)));
  };

  const handleReset = useCallback(() => {
    rotY.set(0);
    rotX.set(6);
    setZoom(1);
    setLastInteractionTime(Date.now());
  }, [rotY, rotX]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex flex-col items-center justify-center select-none overflow-visible ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 3D Volumetric Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none overflow-visible"
      >
        {/* Dynamic Ground Contact Shadow (Reacts with angle and floating position) */}
        <motion.div
          style={{
            x: shadowX,
            scaleX: shadowScaleX,
            opacity: shadowOpacity,
          }}
          className="absolute bottom-6 sm:bottom-10 w-[240px] sm:w-[320px] md:w-[380px] h-[36px] sm:h-[48px] bg-radial from-slate-950/45 via-slate-900/20 to-transparent rounded-full blur-xl pointer-events-none -z-10"
        />

        {/* Dynamic 3D Rim Lighting / Volume Glow Behind Product */}
        <motion.div
          style={{
            x: rimGlowX,
            y: rimGlowY,
          }}
          className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] bg-radial from-amber-100/35 via-orange-100/15 to-transparent rounded-full blur-2xl pointer-events-none -z-10"
        />

        {/* 3D Rotational Item Wrapper (Bounded multi-axis tilt) */}
        <motion.div
          style={{
            rotateY: smoothRotY,
            rotateX: smoothRotX,
            scale: zoom,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {/* Main Volumetric Meat Image Container */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)",
            }}
            className="relative h-[42vh] sm:h-[46vh] w-auto max-w-full max-h-[46vh] flex items-center justify-center"
          >
            <img
              src={frontImg}
              alt={`${title} 3D View`}
              className="h-full w-auto max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)] transition-transform duration-200"
              draggable={false}
            />

            {/* Dynamic Specular Gloss Sheen on Cut Surface */}
            <motion.div
              style={{
                background: useTransform(
                  [sheenX, sheenY],
                  ([x, y]) =>
                    `radial-gradient(ellipse 65% 55% at ${x} ${y}, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 35%, transparent 70%)`
                ),
                opacity: sheenOpacity,
              }}
              className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay rounded-3xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Interactive 3D Orbit Controls Toolbar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-950/75 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-2xl pointer-events-auto">
        {/* Drag / Hover Hint */}
        <div className="flex items-center gap-1.5 text-white/90 text-[10.5px] sm:text-[11.5px] font-medium font-manrope pr-2 border-r border-white/20">
          <Icon icon="ph:hand-pointing-bold" className="w-3.5 h-3.5 text-[#8DC541] animate-bounce" />
          <span>Move or drag to inspect 3D angle</span>
        </div>

        {/* Auto Motion Toggle */}
        <button
          type="button"
          onClick={() => {
            setAutoMotion((prev) => !prev);
            setLastInteractionTime(Date.now());
          }}
          className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 ${
            autoMotion
              ? "bg-[#8DC541] text-[#064823]"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
          title={autoMotion ? "Pause 3D Motion" : "Play 3D Motion"}
        >
          <Icon icon={autoMotion ? "ph:pause-fill" : "ph:play-fill"} className="w-3 h-3" />
          <span>{autoMotion ? "Motion On" : "Motion Off"}</span>
        </button>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={handleReset}
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Reset 3D Angle"
        >
          <Icon icon="ph:arrow-counter-clockwise-bold" className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
