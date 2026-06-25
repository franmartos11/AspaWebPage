"use client";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
      className={cn(
        "row-span-1 rounded-3xl relative overflow-hidden group/bento transition duration-500 shadow-none p-4 bg-[#080808] border-white/5 border justify-between flex flex-col space-y-4 hover:border-blue-500/30 hover:bg-[#0a0a0a]",
        className
      )}
    >
      {/* Interactive mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 z-0"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
          {icon}
          <div className="font-sans font-bold text-neutral-200 mb-2 mt-2 group-hover/bento:text-blue-400 transition-colors">
            {title}
          </div>
          <div className="font-sans font-normal text-xs text-neutral-400">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
