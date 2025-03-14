"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

// Define el tipo de datos de un video
type Video = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
};

// Contenido multilingüe para los videos
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
      title: "Cómo gestionar órdenes de trabajo",
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
      title: "How to Manage Work Orders",
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

// Contenido multilingüe para textos
const textContent = {
  es: {
    title: "Aprende a usar CarCheck",
    description: "Próximamente descubre nuestros tutoriales para sacar el máximo provecho del sistema.",
    closeModal: "Cerrar",
  },
  en: {
    title: "Learn to Use CarCheck",
    description: "Discover our tutorials to make the most of the system, coming soon!!!",
    closeModal: "Close",
  },
};

export const TutorialVideos: React.FC = () => {
  const { language } = useLanguage("es"); // Hook para el idioma seleccionado
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = videoContent[language]; // Videos según el idioma
  const texts = textContent[language]; // Textos según el idioma

  return (
    <section className="py-[5rem] px-6">
      {/* Contenedor animado */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto text-center"
      >
        {/* Título */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-8">
          {texts.title} <span className="text-blue-700">CarCheck</span>
        </h2>
        <p className="text-lg text-gray-300 mb-12">{texts.description}</p>

        {/* Galería de videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              // onClick={() => setSelectedVideo(video.url)} // 🔴 Descomentar cuando los videos estén listos
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-lg font-semibold">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)} // Cierra al hacer clic en el fondo
        >
          <div
            className="relative w-full max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400 transition"
            >
              <AiOutlineClose />
            </button>
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo}
                title="Video Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
