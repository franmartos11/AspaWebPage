"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  description: string;
  imageNormal: string;
  imageHover: string;
  linkedin: string;
  accentColor: string;
}

function ProfileCard({ member, delay }: { member: TeamMember; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);
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
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className="group relative flex flex-col rounded-[2rem] overflow-hidden cursor-default w-full md:w-[24rem] h-[32rem] bg-[#050505] shadow-2xl"
      whileHover={{ y: -8 }}
    >
      {/* Subtle border that glows on hover */}
      <div
        className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500 z-30 pointer-events-none"
      />

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${member.accentColor}20 0%, transparent 60%)`,
        }}
      />

      {/* Image container */}
      <div className="relative w-full h-[75%] overflow-hidden bg-black rounded-b-3xl">
        {/* Normal image (Full color) */}
        <img
          src={member.imageNormal}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90"
        />

        {/* Bottom gradient overlay to blend into the card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-100 z-10" />
        
        {/* Top Floating Badge */}
        <div className="absolute top-5 left-5 z-20">
          <div
            className="text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg"
            style={{
              background: `${member.accentColor}20`,
              color: member.accentColor,
              border: `1px solid ${member.accentColor}40`,
            }}
          >
            {member.badge}
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 w-full z-30 flex flex-col justify-end bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-12 pb-6 px-8">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <p
            className="text-[10px] font-bold tracking-widest uppercase mb-1"
            style={{ color: member.accentColor }}
          >
            {member.role}
          </p>
          <h3 className="text-2xl font-bold text-white mb-2">
            {member.name}
          </h3>
          
          {/* Detailed description that reveals on hover */}
          <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {member.description}
            </p>
          </div>

          {/* Social / Connect bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: member.accentColor }}>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="font-medium tracking-wide">Conectar</span>
            </a>
            
            {/* Animated arrow */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
              style={{ background: `${member.accentColor}20`, color: member.accentColor }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function NosotrosTeam() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      title: "Nuestro Equipo",
      subtitle: "No somos solo una empresa, somos un equipo apasionado que respira código y estrategia.",
    },
    en: {
      title: "Our Team",
      subtitle: "We're not just a company, we're a passionate team that breathes code and strategy.",
    },
  };

  const members: TeamMember[] = [
    {
      name: "Francisco Martos",
      role: "Chief Technology Officer",
      badge: "CTO",
      description: "Especialista en arquitectura de software, desarrollo full-stack y creación de infraestructuras escalables y eficientes.",
      imageNormal: "/fran.jpeg",
      imageHover: "/franPjAspa.png",
      linkedin: "https://www.linkedin.com/in/francisco-martos-7a8850226/",
      accentColor: "#60a5fa", // Blue 400
    },
    {
      name: "Haik Kilic",
      role: "Chief Executive Officer",
      badge: "CEO",
      description: "Experto en visión estratégica, análisis de negocios y en impulsar el crecimiento sostenido de la empresa.",
      imageNormal: "/haik.jpeg",
      imageHover: "/haikPjAspa.png",
      linkedin: "https://www.linkedin.com/in/haik-kilic/?originalSubdomain=ar",
      accentColor: "#3b82f6", // Blue 500
    },
  ];

  return (
    <div className="py-24 relative z-10 bg-black">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      {/* Header */}
      <motion.div
        className="text-center mb-16 px-6 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10">
          Fundadores
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
          {texts[language]?.title ?? texts.es.title}
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          {texts[language]?.subtitle ?? texts.es.subtitle}
        </p>
      </motion.div>

      {/* Team Cards Container */}
      <div className="container mx-auto px-6 max-w-5xl relative z-20">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {members.map((member, idx) => (
            <ProfileCard key={member.name} member={member} delay={0.2 * idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
