import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-[#FAF8F5] overflow-hidden">
      <Link href="/" className="relative block w-full h-full cursor-pointer">
        <Image
          src="/404.webp"
          alt="404 Not Found - Click to go Home"
          fill
          priority
          className="object-cover object-center w-full h-full"
        />
      </Link>
    </div>
  );
}
