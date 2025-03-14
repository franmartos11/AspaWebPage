"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Carlos Gómez",
    company: "Taller Mecánico Gómez",
    feedback:
      "CarCheck ha transformado por completo la gestión de mi taller. Ahora puedo organizar mejor a mis mecánicos y ofrecer un servicio más transparente a mis clientes.",
    image: "/customer1.jpg",
  },
  {
    id: 2,
    name: "Laura Martínez",
    company: "Automotores Martínez",
    feedback:
      "Gracias a CarCheck, hemos optimizado nuestros tiempos y aumentado nuestra rentabilidad. La gestión de órdenes de trabajo nunca fue tan fácil.",
    image: "/customer2.jpg",
  },
  {
    id: 3,
    name: "Fernando López",
    company: "López Motors",
    feedback:
      "La digitalización de procesos con CarCheck ha sido clave. La posibilidad de enviar presupuestos y facturas electrónicas agilizó nuestro trabajo diario.",
    image: "/customer3.jpg",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className=" py-16 px-6">
      <div className="container mx-auto text-center">
        {/* Título Principal */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-12">
          Lo que opinan <span className="text-blue-700">nuestros clientes</span>
        </h2>

        {/* Testimonios Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 object-cover rounded-full mb-4"
                />
                <p className="text-gray-600 italic mb-4">
                  "{testimonials[currentIndex].feedback}"
                </p>
                <h4 className="text-lg font-bold text-gray-800">
                  {testimonials[currentIndex].name}
                </h4>
                <span className="text-sm text-gray-500">
                  {testimonials[currentIndex].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de Navegación */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-800 transition"
          >
            &#8592;
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-800 transition"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};
