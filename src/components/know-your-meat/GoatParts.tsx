"use client";

import { useEffect, useRef, useState } from "react";

interface GoatPartsProps {
  partsDx?: number;
  partsDy?: number;
}

export default function GoatParts({ partsDx = 0, partsDy = 0 }: GoatPartsProps) {
  const [svgContent, setSvgContent] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    fetch("/Product/GoatBeef/goat-parts.svg")
      .then((res) => res.text())
      .then((data) => {
        if (data) {
          let cleaned = data.replace(/<image[^>]*\/>/g, "");
          const imageTag = `<image href="/Product/GoatBeef/goat-img.webp" x="0" y="0" width="900" height="555" preserveAspectRatio="none" style="pointer-events: none;" />`;
          const transformAttr = partsDx !== 0 || partsDy !== 0 ? ` transform="translate(${partsDx}, ${partsDy})"` : "";
          const updated = cleaned
            .replace(/<svg\b([^>]*)>/, '<svg $1 style="overflow: visible;">')
            .replace(
              '<g id="goat-parts">',
              `${imageTag}<g id="goat-parts"${transformAttr}>`
            );
          setSvgContent(updated);
        }
      });
  }, [partsDx, partsDy]);

  // Auto-cycle through cut parts infinitely, pausing when user hovers
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const partsContainer = containerRef.current.querySelector("#goat-parts");
    if (!partsContainer) return;

    // Get all direct cut groups inside #goat-parts
    const groups = Array.from(partsContainer.children).filter(
      (el) => el.tagName.toLowerCase() === "g"
    );

    if (groups.length === 0) return;

    let currentIndex = 0;

    const clearAutoActive = () => {
      groups.forEach((g) => g.classList.remove("auto-active-part"));
    };

    const updateActive = () => {
      if (isHoveredRef.current) return;
      clearAutoActive();
      groups[currentIndex]?.classList.add("auto-active-part");
      currentIndex = (currentIndex + 1) % groups.length;
    };

    // Initial highlight
    updateActive();

    // Loop interval every 1.8 seconds
    const interval = setInterval(updateActive, 1800);

    // Event listeners for hover interruption
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      clearAutoActive();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      updateActive();
    };

    groups.forEach((g) => {
      g.addEventListener("mouseenter", handleMouseEnter);
      g.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      clearInterval(interval);
      clearAutoActive();
      groups.forEach((g) => {
        g.removeEventListener("mouseenter", handleMouseEnter);
        g.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [svgContent]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full [&>svg]:object-contain [&>svg]:overflow-visible overflow-visible filter drop-shadow-2xl"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}