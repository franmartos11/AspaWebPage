"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
};

export function CarcheckTutorials() {
  const { language } = useLanguage("es");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videoContent = {
    es: [
      {
        id: 1,
        title: "Introducción a CarCheck",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Gestionar órdenes de trabajo",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      },
      {
        id: 3,
        title: "Administrar clientes y vehículos",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
    en: [
      {
        id: 1,
        title: "Introduction to CarCheck",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 2,
        title: "Manage Work Orders",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      },
      {
        id: 3,
        title: "Manage Clients and Vehicles",
        thumbnail: "/turnos.webp",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  };

  const texts = {
    es: {
      badge: "Recursos de Aprendizaje",
      title1: "Aprende a usar ",
      title2: "CarCheck",
      description: "Descubre nuestros tutoriales para sacar el máximo provecho de todas las funcionalidades del sistema (Próximamente).",
      closeModal: "Cerrar",
    },
    en: {
      badge: "Learning Resources",
      title1: "Learn to use ",
      title2: "CarCheck",
      description: "Discover our tutorials to make the most of all the system's features (Coming Soon).",
      closeModal: "Close",
    },
  };

  const t = texts[language] ?? texts.es;
  const videos = videoContent[language] ?? videoContent.es;

  return (
    <section className="relative py-16 lg:py-24 px-6 z-10 bg-black">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-wider text-gray-300 uppercase">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.title1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              {t.title2}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer"
              // onClick={() => setSelectedVideo(video.url)} // Uncoment when videos are ready
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-white/10 flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                src={selectedVideo}
                title="Video Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
