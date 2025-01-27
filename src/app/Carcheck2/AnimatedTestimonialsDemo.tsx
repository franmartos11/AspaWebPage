"use client";
import { AnimatedTestimonials } from "./AnimatedTestimonials";


export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Gómez",
      designation: "Taller Mecánico Gómez",
      quote:
        "CarCheck ha transformado por completo la gestión de mi taller. Ahora puedo organizar mejor a mis mecánicos y ofrecer un servicio más transparente a mis clientes.",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
      id: 2,
      name: "Laura Martínez",
      designation: "Automotores Martínez",
      quote:
        "Gracias a CarCheck, hemos optimizado nuestros tiempos y aumentado nuestra rentabilidad. La gestión de órdenes de trabajo nunca fue tan fácil.",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
      id: 3,
      name: "Fernando López",
      designation: "López Motors",
      quote:
        "La digitalización de procesos con CarCheck ha sido clave. La posibilidad de enviar presupuestos y facturas electrónicas agilizó nuestro trabajo diario.",
        src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
