"use client";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function AboutMeCard({
  type,
  title,
  text,
  place,
  link,
  linkName,
  img,
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glow follows mouse
  const glowX = useTransform(mouseX, [-200, 200], ["-20%", "120%"]);
  const glowY = useTransform(mouseY, [-200, 200], ["-20%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-sm w-full mx-auto rounded-[2rem] overflow-hidden group cursor-default transition-all duration-500"
      style={{ background: "#050505" }}
      whileHover={{ y: -8 }}
    >
      {/* Subtle border that glows on hover */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500 z-20 pointer-events-none" />

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Top Image Section */}
      <div className="relative overflow-hidden h-56 w-full p-2 pb-0">
        <div className="relative w-full h-full rounded-t-[1.5rem] rounded-b-xl overflow-hidden">
          <Image
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
            src={img}
            alt={title}
            title={title}
            width={400}
            height={300}
          />
          {/* Subtle inset shadow to blend edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 px-8 pb-8 pt-6">
        
        {/* Tag & Title */}
        <div className="mb-4">
          <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            {type}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-400/90 leading-relaxed min-h-[4rem] mb-6">
          {text}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-5 group-hover:bg-blue-500/20 transition-colors duration-500" />

        {/* Details */}
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">{place}</p>
          </div>

          {/* Link */}
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <a
              title={linkName}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-white transition-colors duration-300 font-medium tracking-wide flex items-center gap-1 group/link"
            >
              {linkName}
              <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
