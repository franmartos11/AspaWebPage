"use client";
import { cn } from "@/utils/cn";
import React from "react";

import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/app/Components/Grid/BentoGrid";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function BentoGrid2() {
  const { language } = useLanguage("es");
  const texts = {
    en: {
      title1: "Our Offer",
      title2: "Benefits of Choosing Us",
    },
    es: {
      title1: "Nuestra Oferta",
      title2: "Beneficios de Elegirnos",
    },
  };
  return (
    <div className="relative z-10">
      <motion.div
        className="pt-[5rem] mb-[3rem] text-center relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
          {texts[language].title1}
        </h2>
        <h3 className="text-4xl md:text-5xl text-white text-center font-bold">
          {texts[language].title2}
        </h3>
      </motion.div>
      <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[22rem] px-6 relative z-20">
        {items[language].items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2  items-center space-x-2 bg-black/40 backdrop-blur-sm"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 shrink-0" />
        <div className="w-full h-4 rounded-full bg-white/10" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 w-3/4 ml-auto bg-black/40 backdrop-blur-sm"
      >
        <div className="w-full  h-4 rounded-full bg-white/10" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-white/10 p-2 items-center space-x-2 bg-black/40 backdrop-blur-sm"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 shrink-0" />
        <div className="w-full h-4 rounded-full bg-white/10" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
            background:
              "linear-gradient(-45deg, #60a5fa, #3b82f6, #2563eb, #1e40af)",
          }}
          className="flex flex-row rounded-full border  p-2  items-center space-x-2  w-full h-4 "
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2 "
      style={{
        background:
          "linear-gradient(-45deg, #60a5fa, #3b82f6, #2563eb, #1e40af)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const { language } = useLanguage("es");
  const texts = {
    en: {
      title1: "Yahoo!",
      title2: "Google",
      title3: "Bing",
      title4: "Recomended",
    },
    es: {
      title1: "Yahoo!",
      title2: "Google",
      title3: "Bing",
      title4: "Recomendado",
    },
  };
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-black/40 backdrop-blur-sm border-white/10 border flex flex-col items-center justify-center"
      >
        <Image
          src="/logo-Yahoo.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10 bg-white"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          {texts[language].title1}
        </p>
        <p className="border border-green-500 bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          {texts[language].title4}
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-black/40 backdrop-blur-sm border-white/10 border flex flex-col items-center justify-center">
        <Image
          src="/logo-google.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          {texts[language].title2}
        </p>
        <p className="border border-green-500 bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          {texts[language].title4}
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-black/40 backdrop-blur-sm border-white/10 border flex flex-col items-center justify-center"
      >
        <Image
          src="/logo-bing.png"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          {texts[language].title3}
        </p>
        <p className="border border-green-500 bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          {texts[language].title4}
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const { language } = useLanguage("es");
  const texts = {
    es: {
      paragraph1:
        "Hola, estoy teniendo problemas para actualizar mi sitio web. ¿Pueden ayudarme?",
      paragraph2: "Estamos aquí para asistirte, vamos a solucionarlo.",
    },
    en: {
      paragraph1:
        "Hello, I am having trouble updating my website. Can you help me?",
      paragraph2: "We are here to assist you, lets fix it.",
    },
  };

  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-white/10 p-2  items-start space-x-2 bg-black/40 backdrop-blur-sm"
      >
        <Image
          src="/agus.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-400">{texts[language].paragraph1}</p>
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-2xl border border-white/10 p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-black/40 backdrop-blur-sm"
      >
        <p className="text-xs text-neutral-400">{texts[language].paragraph2}</p>
        <Image
          src="/haik.jpeg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
      </motion.div>
    </motion.div>
  );
};
const items = {
  es: {
    items: [
      {
        title: "📈 Optimización para Conversiones",
        description: (
          <span className="text-sm">
            Nuestras webs están diseñadas para maximizar las oportunidades de
            venta.
          </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-white" />,
      },
      {
        title: "Análisis de Datos",
        description: (
          <span className="text-sm">
            Te proporcionamos informes detallados sobre el comportamiento de los
            usuarios, las conversiones y las oportunidades de mejora.
          </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-white" />,
      },
      {
        title: "🎨 Diseño Web Profesional y Personalizado",
        description: (
          <span className="text-sm">
            Creamos experiencias visuales impactantes, optimizadas para
            usabilidad y conversión, logrando que tu sitio web destaque entre la
            competencia.
          </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-white" />,
      },
      {
        title: "🔍 Optimización SEO para Motores de Búsqueda",
        description: (
          <span className="text-sm">
            Optimiza tu presencia online y lleva tu negocio al primer lugar en
            los motores de búsqueda más importantes.
          </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-white" />,
      },
      {
        title: "🤝 Soporte Tecnico y Mantenimiento Constante",
        description: (
          <span className="text-sm">
            No solo creamos tu web, también te acompañamos con soporte continuo
            y actualizaciones necesarias.
          </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-white" />,
      },
    ],
  },
  en: {
    items: [
      {
        title: "📈 Conversion Optimization",
        description: (
          <span className="text-sm">
            Our websites are designed to maximize sales opportunities.
          </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-white" />,
      },
      {
        title: "📊 Data Analysis",
        description: (
          <span className="text-sm">
            We provide detailed reports on user behavior, conversions, and
            improvement opportunities.
          </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-white" />,
      },
      {
        title: "🎨 Professional and Custom Web Design",
        description: (
          <span className="text-sm">
            We create impactful visual experiences, optimized for usability and
            conversion, making your website stand out from the competition.
          </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-white" />,
      },
      {
        title: "🔍 SEO Optimization for Search Engines",
        description: (
          <span className="text-sm">
            Optimize your online presence and take your business to the top of
            the most important search engines.
          </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-white" />,
      },
      {
        title: "🤝 Ongoing Technical Support and Maintenance",
        description: (
          <span className="text-sm">
            Not only do we create your website, but we also provide continuous
            support and necessary updates.
          </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-white" />,
      },
    ],
  },
};
