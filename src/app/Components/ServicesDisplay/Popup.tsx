"use client";
import Image, { ImageProps } from "next/image";
import React, { useEffect } from "react";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200  font-sans">
        Conoce nuestros Modulos
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const ContentCliente = () => {
  return (
    <>


      <div

        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            Gestión completa de clientes al alcance de tu mano.
          </span>{" "}
          <br />
          Puedes visualizar la lista de todos tus clientes, realizar búsquedas y acceder a su información detallada con un solo clic. Además, podrás llamarlos directamente o iniciar una conversación desde aquí.
        </p>
        <Image
          src="/carcheckClientes.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>

      <div

        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Consulta toda la información de tus clientes en un solo lugar.
          </span>{" "}
          <br />
          Accede fácilmente a sus datos personales, vehículos registrados y turnos asignados. Además, puedes gestionar su historial, agregar nuevos registros o comunicarte directamente desde esta sección.
        </p>
        
        <Image
          src="/carcheckCliente2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div

        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Consulta el historial completo de cada vehículo en el taller.
          </span>{" "}
          <br />
          Desde esta sección, puedes acceder a los presupuestos generados y las veces que el vehículo ingresó al taller para alistajes. Mantén un registro organizado con fechas, detalles asociados, y acciones rápidas para agregar nuevos registros o visualizar la información completa.
        </p>
        <Image
          src="/carcheckClientes3.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};

const ContentVehiculos = () => {
  return (
    <>
      <div
        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            Administra todos los vehículos registrados en tu taller de forma sencilla.
          </span>{" "}
          <br />
          puedes buscar rápidamente por matrícula, modelo o marca, y acceder a la información completa de cada vehículo. Agrega nuevos registros o actualiza los existentes con solo un clic, manteniendo todo organizado y al día.
        </p>
        <Image
          src="/carcheckCars2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/carcheckCars.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div
        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Consulta toda la información detallada de cada vehículo registrado en el taller.
          </span>{" "}
          <br />
          Podrás visualizar datos clave como la patente, marca, modelo, color y cliente asociado. Además, accede al historial completo de alistajes realizados, con fechas y detalles específicos. Gestiona de forma eficiente la información del vehículo y mantén un registro organizado de su historial en el taller.
        </p>
        <Image
          src="/carcheckCar3.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
        <Image
          src="/carcheckCar4.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};

const DummyContent = () => {
  return (
    <>
      <div
        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
            Gestiona de manera eficiente el flujo de trabajo de los vehículos en el taller.
          </span>{" "}
          <br />
          Aquí podrás visualizar y organizar cada etapa del proceso, desde el preingreso hasta la entrega final. Realiza un seguimiento claro del estado de cada vehículo, asigna tareas, registra avances y mantén todo el proceso bajo control. Diseñada para optimizar el orden y la productividad del taller.
        </p>
        <Image
          src="/carcheckAlistaje.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
      <div
        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Monitorea el progreso del alistaje de un vehículo en detalle.
          </span>{" "}
          <br />
          Puedes consultar información clave como los kilómetros recorridos, nivel de combustible, estado general al ingreso, y cualquier observación relevante. También podrás visualizar el área asignada, el precio estimado o final, y el estado actual del proceso. Mantén un seguimiento claro y organizado para garantizar un servicio eficiente y preciso.
        </p>
        <Image
          src="/carcheckAlistaje2.png"
          alt="Macbook mockup from Aceternity UI"
          height="1920"
          width="1080"
          className="mt-[1rem] rounded-xl"
        />
      </div>
    </>
  );
};


const data = [
  {
    category: "Clientes",
    title: "Clientes",
    src: "/cliente.webp",
    content: <ContentCliente />,
  },
  {
    category: "Productivity",
    title: "Vehiculos",
    src: "/vehiculos.webp",
    content: <ContentVehiculos />,
  },
  {
    category: "Product",
    title: "Alistajes",
    src: "/alistaje2.webp",
    content: <DummyContent />,
  },

  {
    category: "Presupuestos",
    title: "Presupuestos",
    src: "/presupuestos.webp",
    content: <DummyContent />,
  },
  {
    category: "Turnos",
    title: "Turnos",
    src: "/turnos.webp",
    content: <DummyContent />,
  },
  {
    category: "Servicios",
    title: "Servicios",
    src: "/servicio2.webp",
    content: <DummyContent />,
  },
  {
    category: "Stock",
    title: "Stock",
    src: "/inventario.webp",
    content: <DummyContent />,
  },
  {
    category: "Reporte",
    title: "Reporte",
    src: "/reportes.webp",
    content: <DummyContent />,
  },
];


export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};


import {
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";


interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
