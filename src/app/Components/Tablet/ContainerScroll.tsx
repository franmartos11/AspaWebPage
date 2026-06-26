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

  const isLast = index === total - 1;

  // Last step remains visible at the end of scroll (scrollYProgress = 1.0)
  // to avoid screen turning black before scrolling out
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fadeOutStart, fadeOutEnd]
      : isLast
      ? [fadeInStart, fadeInEnd, 1.0]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    index === 0
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, fadeOutStart, fadeOutEnd]
      : isLast
      ? [fadeInStart, fadeInEnd, 1.0]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    index === 0
      ? [0, 0, -30]
      : isLast
      ? [30, 0, 0]
      : [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-16 lg:px-20 pointer-events-none"
    >
      <div>
        <span className="inline-block text-blue-400 text-[10px] xs:text-xs md:text-sm font-bold tracking-[0.22em] uppercase mb-2 xs:mb-3 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/5">
          {step.label}
        </span>
        <h2 className="text-2xl xs:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 xs:mb-4 leading-tight">
          {step.title}
        </h2>
        <p className="text-gray-400 text-xs xs:text-sm md:text-base lg:text-lg leading-relaxed max-w-sm md:max-w-md">
          {step.description}
        </p>
      </div>
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
      className="h-1 w-3 xs:h-1.5 xs:w-4 rounded-full bg-blue-400 origin-left"
    />
  );
};

// ─── 3D Frame ─────────────────────────────────────────────────────────────────
const Frame = ({
  rotate,
  scale,
  activeStep,
  stepVisuals,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  activeStep: number;
  stepVisuals?: React.ReactNode[];
  children?: React.ReactNode;
}) => (
  // Immediate parent defines the 3D perspective to preserve depth context
  <div style={{ perspective: "1000px" }} className="w-full h-full">
    <motion.div
      className="w-full h-full border-[3px] border-[#404040] bg-[#111111] rounded-[24px] overflow-hidden flex flex-col origin-top"
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 80px rgba(29,78,216,0.22), 0 30px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* MacBook-style chrome top bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/8 bg-[#1a1a1a] flex-none">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4">
          <div className="h-4 bg-black/30 rounded-md w-36 mx-auto flex items-center justify-center">
            <span className="text-gray-600 text-[9px] font-mono">aspasoftware.com</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative overflow-hidden bg-[#0d0d0d] flex-1 min-h-0">
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
);

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
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * steps.length), steps.length - 1);
    if (next !== activeStep) setActiveStep(next);
  });

  // Smooth rotation for 3D effect
  const rawRotate = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.6], [0.82, 0.95]);
  const rotate = useSpring(rawRotate, { stiffness: 55, damping: 18 });
  const scale = useSpring(rawScale, { stiffness: 55, damping: 18 });

  return (
    <div className="h-[220vh] relative bg-black" ref={containerRef}>
      {/* 
        Sticky container takes exactly the viewport height, providing a 
        unified, flex-based responsive layout.
      */}
      <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden pt-[80px] pb-6 px-4 md:px-8 lg:px-12">
        
        {/* ─── TEXT COLUMN ─── */}
        {/* On mobile: fixed 32% height. On desktop: takes 50% width */}
        <div className="w-full md:w-1/2 relative flex-none h-[32dvh] md:h-full flex flex-col justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center">
            {steps.map((step, i) => (
              <StepText
                key={i}
                step={step}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
          {/* Progress dots at the bottom of the text section */}
          <div className="absolute bottom-2 left-6 md:left-16 lg:left-20 flex gap-2">
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

        {/* ─── FRAME COLUMN (TABLET/LAPTOP) ─── */}
        {/* On mobile: takes remaining space. On desktop: takes 50% width */}
        <div className="w-full md:w-1/2 flex-1 md:flex-none h-[calc(68dvh-80px)] md:h-full flex items-center justify-center min-h-0 relative">
          <div className="w-full h-full max-h-[90%] md:max-h-[70%] max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-center">
            {/* Tablet container: uses max-w-full and max-h-full, and adapts aspect ratios to fit safely */}
            <div className="w-full max-w-full max-h-full aspect-[1.25] xs:aspect-[1.4] md:aspect-[16/10]">
              <Frame
                rotate={rotate}
                scale={scale}
                activeStep={activeStep}
                stepVisuals={stepVisuals}
              >
                {children}
              </Frame>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
