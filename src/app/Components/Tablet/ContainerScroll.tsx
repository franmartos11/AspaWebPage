"use client";
import React, { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValueEvent,
} from "framer-motion";

export interface ScrollStep {
  label: string;
  title: string;
  description: string;
}

// ─── StepText ──────────────────────────────────────────────────────────────────
// Must be its own component so hooks are called at component level (not in .map)
const StepText = ({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: ScrollStep;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const stepSize = 1 / total;
  const start = index * stepSize;
  const end = start + stepSize;
  const fadeInStart = Math.max(0, start - 0.06);
  const fadeInEnd = start + 0.1;
  const fadeOutStart = Math.max(fadeInEnd + 0.05, end - 0.1);
  const fadeOutEnd = Math.min(1, end + 0.06);

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fadeOutStart, fadeOutEnd]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    index === 0
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fadeOutStart, fadeOutEnd]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    index === 0
      ? [0, 0, -40]
      : [40, 0, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-16 lg:px-20"
    >
      <span className="inline-block text-blue-400 text-xs font-bold tracking-[0.22em] uppercase mb-3 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/5">
        {step.label}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
        {step.title}
      </h2>
      <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-md">
        {step.description}
      </p>
    </motion.div>
  );
};

// ─── ScrollDots ────────────────────────────────────────────────────────────────
const ScrollDot = ({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const stepSize = 1 / total;
  const start = index * stepSize;
  const end = start + stepSize;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.1), start + 0.1, end - 0.1, Math.min(1, end + 0.1)],
    [0.3, 1, 1, 0.3]
  );
  const scaleX = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.1, end - 0.1, Math.min(1, end + 0.05)],
    [1, 2.5, 2.5, 1]
  );
  return (
    <motion.div
      style={{ opacity, scaleX }}
      className="h-1 w-4 rounded-full bg-blue-400 origin-left"
    />
  );
};

// ─── ContainerScroll ───────────────────────────────────────────────────────────
export const ContainerScroll = ({
  steps,
  stepVisuals,
  children,
}: {
  steps: ScrollStep[];
  stepVisuals?: React.ReactNode[];
  children?: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Track active visual step for AnimatePresence
  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * steps.length), steps.length - 1);
    if (next !== activeStep) setActiveStep(next);
  });

  // Spring-smoothed 3D transforms — animate in the first 60% of scroll
  const rawRotate = useTransform(scrollYProgress, [0, 0.6], [14, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.6], [0.85, 0.95]);
  const rotate = useSpring(rawRotate, { stiffness: 55, damping: 18 });
  const scale = useSpring(rawScale, { stiffness: 55, damping: 18 });

  return (
    <div className="h-[300vh] relative" ref={containerRef}>
      <div
        className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden pt-16"
        style={{ perspective: "1400px" }}
      >
        {/* ─── TOP on mobile / LEFT on desktop: Scroll-driven text ─────────────── */}
        {/*
          KEY FIX: On mobile, this div gets a FIXED height of 45vh and overflow:hidden.
          This creates a hard boundary — the absolutely-positioned StepText elements
          can never visually escape into the frame zone below.
        */}
        <div
          className="w-full md:w-1/2 relative overflow-hidden"
          style={{ height: "45vh", flex: "0 0 45vh" }}
        >
          {/* Override height for desktop via an inner full-height wrapper */}
          <div className="hidden md:flex md:absolute md:inset-0">
            {steps.map((step, i) => (
              <StepText
                key={i}
                step={step}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
            <div className="absolute bottom-12 left-16 lg:left-20 flex gap-2">
              {Array.from({ length: steps.length }).map((_, i) => (
                <ScrollDot
                  key={i}
                  index={i}
                  total={steps.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Mobile text - absolutely fills its 45vh container, clipped by overflow-hidden */}
          <div className="md:hidden absolute inset-0">
            {steps.map((step, i) => (
              <StepText
                key={i}
                step={step}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
            <div className="absolute bottom-3 left-6 flex gap-2">
              {Array.from({ length: steps.length }).map((_, i) => (
                <ScrollDot
                  key={i}
                  index={i}
                  total={steps.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── BOTTOM on mobile / RIGHT on desktop: 3D Frame ──────────────────── */}
        <div
          className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-8 lg:px-12 pb-6 md:py-24"
          style={{ flex: "1 1 auto", minHeight: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl border-[3px] border-[#404040] bg-[#111111] rounded-[24px] overflow-hidden flex flex-col"
            style={{
              rotateX: rotate,
              scale,
              height: "100%",
              maxHeight: "clamp(220px, 46vh, 640px)",
              boxShadow:
                "0 0 80px rgba(29,78,216,0.22), 0 30px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* MacBook-style chrome top bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-[#1a1a1a] flex-none">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4">
                <div className="h-4 bg-black/30 rounded-md w-48 mx-auto flex items-center justify-center">
                  <span className="text-gray-600 text-[10px]">aspasoftware.com</span>
                </div>
              </div>
            </div>

            {/* Content — crossfades between step visuals */}
            <div className="relative overflow-hidden bg-[#0d0d0d] flex-1">
              {stepVisuals ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {stepVisuals[activeStep]}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="h-full w-full">{children}</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
