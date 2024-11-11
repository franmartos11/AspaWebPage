import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Componente principal: HoverEffect
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    Content: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Para controlar el pop-up
  const modalRef = useRef<HTMLDivElement>(null); // Para detectar clics fuera del pop-up

  // Función para cerrar el modal
  const handleClose = () => {
    setSelectedIndex(null);
  };

  // Hook para detectar clics fuera del modal y cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-[5rem] ${className}`}>
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setSelectedIndex(idx)} // Abrir el modal al hacer clic
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-700 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card code={item.title}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}

      {/* Modal para mostrar el contenido del item seleccionado */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 h-screen z-50 overflow-auto bg-black/80 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
  ref={modalRef}
  className="bg-white dark:bg-neutral-900 p-6 md:p-10 rounded-3xl max-w-4xl w-full max-h-[90vh] mx-auto overflow-y-auto scrollbar-hide relative"
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 50, opacity: 0 }}
>
  <button
    onClick={handleClose}
    className="absolute top-4 right-4 p-2 bg-black dark:bg-white rounded-full"
  >
    ✕
  </button>
  <h3 className="text-2xl md:text-4xl font-bold text-black dark:text-white mb-4">
    {items[selectedIndex].title}
  </h3>
  <div className="text-neutral-600 dark:text-neutral-300">
    {items[selectedIndex].Content}
  </div>
</motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Subcomponentes

export const Card = ({
  className,
  children,
  code,
}: {
  className?: string;
  children: React.ReactNode;
  code: string;
}) => {
  return (
    <div
      id={code}
      className={`rounded-2xl h-[14rem] w-full p-4 overflow-hidden bg-black border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.2),rgba(0,0,0,0.9))] ${className}`}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={`text-zinc-100 font-bold tracking-wide mt-4 ${className}`}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={`mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm ${className}`}>
      {children}
    </p>
  );
};
