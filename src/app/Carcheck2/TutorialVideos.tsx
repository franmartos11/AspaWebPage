"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const videos = [
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
];

export const TutorialVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-[15rem] px-6 ">
      {/* Animación de Aparición */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto text-center"
      >
        {/* Título */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-8">
          Aprende a usar <span className="text-blue-700">CarCheck</span>
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Descubre nuestros tutoriales para sacar el máximo provecho del sistema.
        </p>

        {/* Galería de Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedVideo(video.url)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-lg font-semibold">
                  {video.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)} // Cerrar al hacer clic en el overlay
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
