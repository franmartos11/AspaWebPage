"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

type Status = "idle" | "success";

type ContactTexts = {
  title: string;
  paragraph: string;
  form: {
    a: string;
    b: string;
    c: string;
    d: string;
    button: string;
    e: string;
  };
};

const textsMap: Record<string, ContactTexts> = {
  es: {
    title: "Contáctanos",
    paragraph:
      "¡Haznos saber cómo podemos ayudarte! Completa el formulario de contacto y estaremos encantados de responder a tus preguntas, discutir colaboraciones o simplemente charlar sobre tus ideas.",
    form: {
      a: "Nombre Completo",
      b: "Dirección Email",
      c: "Número Teléfono",
      d: "Mensaje",
      button: "Enviar",
      e: "Síguenos",
    },
  },
  en: {
    title: "Contact Us",
    paragraph:
      "Let us know how we can help you! Fill out the contact form and we will be happy to answer your questions, discuss collaborations, or just chat about your ideas.",
    form: {
      a: "Full Name",
      b: "Email Address",
      c: "Phone Number",
      d: "Message",
      button: "Send",
      e: "Follow Us",
    },
  },
};

export default function ContactCardImg() {
  const { language } = useLanguage("es");
  const texts = textsMap[language];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const pn = formData.get("pn")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const subject = texts.title;

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pn, subject, message }),
      });
      const data = await res.json();
      console.log("API response:", res.status, data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setStatus("success");
      form.reset();
    }
  };

  const inputClass =
    "block w-full px-5 py-3.5 mt-2 border border-white/10 rounded-xl placeholder-gray-500 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 focus:border-blue-500 focus:ring-0 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:bg-white/10 outline-none";

  return (
    <section className="min-h-screen pt-[5rem] bg-black overflow-x-hidden">
      <div className="container px-6 mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 py-12">

          {/* Left Column — Form */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold capitalize text-white lg:text-5xl tracking-tight">
              {texts.title}
            </h1>
            <p className="mt-4 text-gray-400 leading-relaxed text-lg">{texts.paragraph}</p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {/* Name + Email row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-300">{texts.form.a}</label>
                  <input name="name" type="text" className={inputClass} required />
                </div>
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-300">{texts.form.b}</label>
                  <input name="email" type="email" className={inputClass} required />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">{texts.form.c}</label>
                <input name="pn" type="tel" className={inputClass} required />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">{texts.form.d}</label>
                <textarea
                  name="message"
                  rows={5}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors duration-300 rounded-xl bg-blue-600 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Enviando..." : texts.form.button}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center font-medium text-green-400 mt-4"
                >
                  ¡Mensaje enviado correctamente!
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Right Column — Contact Info */}
          <motion.div
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="space-y-5">
              {/* Location */}
              <motion.a
                title="Location"
                href="https://www.google.com/maps/place/ASPA+software/@-31.4105525,-64.1954704,17z"
                target="_blank"
                rel="noreferrer"
                className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <div className="p-3 bg-black rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="mx-4 text-gray-300 group-hover:text-white transition-colors text-sm">
                  Av. Colón 730, X5003 Córdoba
                </span>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                title="WhatsApp"
                href="https://wa.me/17867630202?text=Hola,%20quiero%20enviar%20un%20mensaje%20a%20trav%C3%A9s%20de%20WhatsApp."
                target="_blank"
                rel="noreferrer"
                className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <div className="p-3 bg-black rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="mx-4 text-gray-300 group-hover:text-white transition-colors">
                  +1 (786) 763-0202
                </span>
              </motion.a>

              {/* Email */}
              <motion.a
                title="Email"
                href="mailto:aspasoftwaredevelopment@gmail.com"
                className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <div className="p-3 bg-black rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="mx-4 text-gray-300 group-hover:text-white transition-colors text-sm break-all">
                  aspasoftwaredevelopment@gmail.com
                </span>
              </motion.a>
            </div>

            {/* Social links */}
            <div className="mt-10">
              <h3 className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-5">{texts.form.e}</h3>
              <div className="flex gap-4">
                <motion.a
                  title="LinkedIn"
                  href="https://www.linkedin.com/company/85621550/admin/feed/posts/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/20 text-gray-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z" fill="currentColor"/>
                    <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" fill="currentColor"/>
                    <path d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z" fill="currentColor"/>
                  </svg>
                </motion.a>
                <motion.a
                  title="Instagram"
                  href="https://www.instagram.com/aspa.software"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-pink-500/50 hover:bg-pink-900/20 text-gray-400 hover:text-pink-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z" fill="currentColor"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
