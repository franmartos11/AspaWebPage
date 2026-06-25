"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function () {
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const { language, setLanguage } = useLanguage("es");

  const texts = {
    es: {
      title: "Nuestro Equipo",
      paragraph:
        "No somos solo una empresa, somos un equipo apasionado por lo que hacemos",
    },
    en: {
      title: "Our Team",
      paragraph:
        "We are not just a company, we are a team passionate about what we do.",
    },
  };

  type TeamMember = {
    name: string;
    role: string;
    roleLabel: string;
    description: string;
    badgeColor: string;
    href: string;
    imgNormal: string;
    imgHover: string;
    hovered: boolean;
    setHovered: (v: boolean) => void;
  };

  const members: TeamMember[] = [
    {
      name: "Agustín Luque",
      role: "CMO",
      roleLabel: "Chief Marketing Officer",
      description: "Estrategia de marketing & crecimiento de marca",
      badgeColor: "bg-violet-600/90",
      href: "https://www.linkedin.com/in/agustin-luque/",
      imgNormal: "/agus.jpeg",
      imgHover: "/agusPjAspa.png",
      hovered: hovered,
      setHovered: setHovered,
    },
    {
      name: "Francisco Martos",
      role: "CTO",
      roleLabel: "Chief Technology Officer",
      description: "Arquitectura de software & desarrollo full-stack",
      badgeColor: "bg-indigo-600/90",
      href: "https://www.linkedin.com/in/francisco-martos-7a8850226/",
      imgNormal: "/fran.jpeg",
      imgHover: "/franPjAspa.png",
      hovered: hovered1,
      setHovered: setHovered1,
    },
    {
      name: "Haik Kilic",
      role: "CEO",
      roleLabel: "Chief Executive Officer",
      description: "Visión estratégica & crecimiento empresarial",
      badgeColor: "bg-blue-600/90",
      href: "https://www.linkedin.com/in/haik-kilic/?originalSubdomain=ar",
      imgNormal: "/haik.jpeg",
      imgHover: "/haikPjAspa.png",
      hovered: hovered2,
      setHovered: setHovered2,
    },
  ];

  return (
    <div>
      <motion.div
        className="flex flex-wrap mb-24 pt-[6rem] justify-center align-middle text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-full lg:w-6/12 px-4">
          <div className="container px-6 pt-7 pb-0 mx-auto sm:pt-0">
            <h2 className="text-4xl pt-16 font-semibold text-center capitalize lg:text-6xl text-white">
              {texts[language].title}
            </h2>
            <div className="flex justify-center mx-auto mt-6">
              <motion.span
                className="inline-block h-1 bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "10rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full" />
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full" />
            </div>
          </div>
          <p className="text-gray-400 text-lg font-light pt-[2rem]">
            {texts[language].paragraph}
          </p>
        </div>
      </motion.div>

      <div className="flex items-center justify-center pb-[10rem]">
        <div className="flex flex-col">
          <div className="container max-w-7xl px-4">
            <motion.div
              className="flex flex-wrap justify-around align-middle gap-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.18 } },
              }}
            >
              {members.map((member) => (
                <motion.div
                  key={member.name}
                  className="md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                  variants={cardVariants}
                >
                  <div className="flex flex-col align-middle justify-center">
                    <a
                      title={`LinkedIn ${member.name}`}
                      href={member.href}
                      className="relative group block mx-auto"
                    >
                      <div className="relative overflow-hidden rounded-2xl w-[22rem] h-[23rem]">
                        <img
                          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                          alt={`${member.name} - ${member.role} Aspa Software`}
                          title={`${member.name} - ${member.role}`}
                          src={member.hovered ? member.imgHover : member.imgNormal}
                          onMouseEnter={() => member.setHovered(true)}
                          onMouseLeave={() => member.setHovered(false)}
                        />
                        {/* Overlay gradiente al hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-1">
                            {member.roleLabel}
                          </span>
                          <span className="text-white text-sm opacity-90">
                            {member.description}
                          </span>
                        </div>
                        {/* Badge de rol */}
                        <div className={`absolute top-3 left-3 ${member.badgeColor} backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {member.role}
                        </div>
                      </div>
                    </a>

                    <div className="text-center mt-5 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 mt-2">
                        <a
                          title={`LinkedIn ${member.name}`}
                          href={member.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex rounded-full justify-center align-middle hover:bg-blue-600 pt-2 h-10 w-10 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            className="h-6 justify-center align-middle"
                          >
                            <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
