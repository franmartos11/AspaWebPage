"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ page }: { page: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdown(!dropdown);

  const { language, setLanguage } = useLanguage("es");

  const texts = {
    es: {
      op1: "Inicio",
      op2: {
        title: "Servicios",
        o1: "Todos los servicios",
        o2: "Desarrollo Web",
        o3: "Apps a medida",
        o4: "Carcheck",
        o5: "Audit",
        o6: "IA & Automatización",
      },
      op3: "Nosotros",
      op4: "Contacto",
    },
    en: {
      op1: "Home",
      op2: {
        title: "Services",
        o1: "All services",
        o2: "Web Development",
        o3: "Custom Apps",
        o4: "Carcheck",
        o5: "Audit",
        o6: "AI & Automation",
      },
      op3: "About Us",
      op4: "Contact",
    },
  };

  const linkBase =
    "relative block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:border-0 transition-colors duration-200 group";
  const linkActive = "text-blue-500";
  const linkIdle = "text-white md:hover:text-blue-400";

  const isHome = page === "home";

  return (
    <motion.div
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
        : "bg-transparent"
        }`}
      id="top-page"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link
          title="Aspa Software - Home"
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <motion.img
            className="h-[4.5rem]"
            src="/logo-n0-bg.webp"
            alt="Logo Aspa Software"
            title="Logo Aspa"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 transition-colors"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Nav links — mobile: full screen overlay, desktop: inline */}
        <AnimatePresence>
          {(isMenuOpen) && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl z-50"
            >
              <ul className="flex flex-col p-4 space-y-1">
                {/* Inicio */}
                <li>
                  <Link
                    title="Inicio"
                    onClick={toggleMenu}
                    href="/"
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${page === "home" ? "text-blue-400 bg-blue-500/10" : "text-white hover:text-blue-400 hover:bg-white/5"}`}
                  >
                    {texts[language].op1}
                  </Link>
                </li>

                {/* Servicios + inline dropdown */}
                <li>
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center justify-between w-full py-3 px-4 rounded-xl text-base font-medium transition-colors ${page === "servicios" ? "text-blue-400 bg-blue-500/10" : "text-white hover:text-blue-400 hover:bg-white/5"}`}
                  >
                    {texts[language].op2.title}
                    <motion.svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                      animate={{ rotate: dropdown ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4 mt-1"
                      >
                        <div className="border-l-2 border-blue-500/30 pl-4 space-y-1">
                          {[
                            { href: "/servicios", label: texts[language].op2.o1 },
                            { href: "/desarrollo-web", label: texts[language].op2.o2 },
                            { href: "/apps-a-medida", label: texts[language].op2.o3 },
                            { href: "/carcheck", label: texts[language].op2.o4 },
                            { href: "/auditorias", label: texts[language].op2.o5 },
                            { href: "/ia-automatizacion", label: texts[language].op2.o6 },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              title={item.label}
                              href={item.href}
                              onClick={() => { setDropdown(false); toggleMenu(); }}
                              className="block py-2 px-3 rounded-lg text-sm text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 transition-all"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {/* Nosotros */}
                <li>
                  <Link
                    title="Nosotros"
                    onClick={toggleMenu}
                    href="/nosotros"
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${page === "nosotros" ? "text-blue-400 bg-blue-500/10" : "text-white hover:text-blue-400 hover:bg-white/5"}`}
                  >
                    {texts[language].op3}
                  </Link>
                </li>

                {/* Contacto */}
                <li>
                  <Link
                    title="Contacto"
                    onClick={toggleMenu}
                    href="/contact"
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${page === "contacto" ? "text-blue-400 bg-blue-500/10" : "text-white hover:text-blue-400 hover:bg-white/5"}`}
                  >
                    {texts[language].op4}
                  </Link>
                </li>

                {/* Language toggle */}
                <li className="pt-2 px-4 flex items-center gap-2 border-t border-white/10 mt-2">
                  <span className="text-gray-500 text-xs mr-1">Idioma:</span>
                  <button
                    onClick={() => setLanguage("es")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${language === "es" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    ES
                  </button>
                  <span className="text-gray-600 text-xs">|</span>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${language === "en" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    EN
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop nav links */}
        <div className="hidden md:block">
          <ul className="flex text-white font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 items-center">
            {/* Inicio */}
            <li>
              <Link
                title="Inicio"
                href="/"
                className={`${linkBase} ${page === "home" ? linkActive : linkIdle}`}
              >
                {texts[language].op1}
                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            </li>

            {/* Servicios + dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-between py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 md:w-auto transition-colors duration-200 group ${page === "servicios" ? linkActive : linkIdle}`}
              >
                {texts[language].op2.title}
                <motion.svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                  animate={{ rotate: dropdown ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bg-black/80 backdrop-blur-md flex flex-col border border-blue-700/50 p-3 rounded-xl mt-2 min-w-[180px] shadow-xl shadow-black/40"
                  >
                    {[
                      { href: "/servicios", label: texts[language].op2.o1 },
                      { href: "/desarrollo-web", label: texts[language].op2.o2 },
                      { href: "/apps-a-medida", label: texts[language].op2.o3 },
                      { href: "/carcheck", label: texts[language].op2.o4 },
                      { href: "/auditorias", label: texts[language].op2.o5 },
                      { href: "/ia-automatizacion", label: texts[language].op2.o6 },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        title={item.label}
                        href={item.href}
                        onClick={() => { setDropdown(false); }}
                        className="text-white hover:text-blue-400 py-1.5 px-2 rounded-md hover:bg-blue-900/30 transition-all duration-150 text-sm"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Nosotros */}
            <li>
              <Link
                title="Nosotros"
                href="/nosotros"
                className={`${linkBase} ${page === "nosotros" ? linkActive : linkIdle}`}
              >
                {texts[language].op3}
                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            </li>

            {/* Contacto */}
            <li>
              <Link
                title="Contacto"
                href="/contact"
                className={`${linkBase} ${page === "contacto" ? linkActive : linkIdle}`}
              >
                {texts[language].op4}
                <span className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            </li>

            {/* Toggle de idioma */}
            <li className="flex items-center gap-1 ml-2">
              <motion.button
                onClick={() => setLanguage("es")}
                whileTap={{ scale: 0.9 }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${language === "es" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                ES
              </motion.button>
              <span className="text-gray-600 text-xs">|</span>
              <motion.button
                onClick={() => setLanguage("en")}
                whileTap={{ scale: 0.9 }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${language === "en" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                EN
              </motion.button>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
