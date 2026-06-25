import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

// Reusable Bento Feature Card
export function FeatureCard({
  title,
  text,
  delay,
  icon,
}: {
  title: string;
  text: string;
  delay: number;
  icon: React.ReactNode;
}) {
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative flex flex-col p-8 rounded-3xl bg-[#080808] border border-white/5 overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:bg-[#0a0a0a]"
    >
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-20 flex items-center mb-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white ml-4 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 leading-relaxed relative z-20">
        {text}
      </p>
    </motion.div>
  );
}
