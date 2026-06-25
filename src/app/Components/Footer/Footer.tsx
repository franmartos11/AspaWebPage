"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export default function () {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      op1: "Inicio",
      op2: "Servicios",
      op3: "Nosotros",
      op4: "Contacto",
    },
    en: {
      op1: "Home",
      op2: "Services",
      op3: "About Us",
      op4: "Contact",
    },
  };

  const navLinks = [
    { href: "/", label: texts[language].op1 },
    { href: "/servicios", label: texts[language].op2 },
    { href: "/nosotros", label: texts[language].op3 },
    { href: "/contact", label: texts[language].op4 },
  ];

  return (
    <motion.div
      className="relative px-4 pt-20 bg-black border-t border-white/5 z-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo flotante */}
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-2 border-blue-500/60 bg-black p-1 shadow-lg shadow-blue-500/20">
        <Link title="Volver al inicio" href={"#top-page"} className="block w-full h-full">
          <img
            className="w-full h-full object-contain"
            src="/aspaLogo.webp"
            alt="Aspa Software logo"
            title="Aspa Software"
          />
        </Link>
      </div>

      {/* Links de navegación */}
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-8 flex max-w-lg flex-col gap-8 text-center justify-center sm:flex-row sm:text-left"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            title={link.label}
            href={link.href}
            className="font-medium text-gray-400 hover:text-white transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 rounded-full transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Separador */}
      <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      {/* Redes sociales */}
      <div className="flex justify-center gap-4 mb-6">
        <a
          href="https://www.linkedin.com/company/aspa-software/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Aspa Software"
          className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-blue-600/20 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
            <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/aspa.software/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram Aspa Software"
          className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-pink-600/20 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
            <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
          </svg>
        </a>
        <a
          href="https://wa.me/5493517730900"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Aspa Software"
          className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-green-600/20 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-5 w-5">
            <path fill="currentColor" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>
          </svg>
        </a>
      </div>

      <p className="py-6 text-center text-gray-500 text-sm">
        © 2026 Aspa Software | All Rights Reserved
      </p>
    </motion.div>
  );
}
