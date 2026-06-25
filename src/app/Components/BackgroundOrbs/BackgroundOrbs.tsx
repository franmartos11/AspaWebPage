"use client";
import { motion } from "framer-motion";

/**
 * BackgroundOrbs — fixed ambient glow orbs that sit behind all content.
 * Applied once in layout.tsx so they persist across all pages.
 */
export default function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left — large blue orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "-15rem",
          left: "-15rem",
          width: "680px",
          height: "680px",
          background:
            "radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom-right — indigo orb (only Y axis to avoid horizontal overflow) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          bottom: "-18rem",
          right: "-18rem",
          width: "750px",
          height: "750px",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center-right — sky blue, only Y axis to avoid overflow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "35%",
          right: "-8rem",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ y: [-60, 60, -60] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top-right corner — tiny accent orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "5rem",
          right: "8rem",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
