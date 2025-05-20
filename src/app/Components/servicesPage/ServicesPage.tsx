"use client";
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";

function ServiceCard({
  href,
  img,
  title,
  text,
}: {
  href: string;
  img: string;
  title: string;
  text: string;
}) {
  return (
    <a title="link" href={href}>
      <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
        <Image
          className="object-cover w-full rounded-sm aspect-square"
          src={img}
          alt="Aplicaciones a medida"
          title="Aplicaciones a medida"
          width={2000}
          height={2000}
        ></Image>
        <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
          {title}
        </h1>
        <p className="mt-2   text-gray-300 text-center">{text}</p>
        <div className="flex mt-3 -mx-2"></div>
      </div>
    </a>
  );
}
export default function CarrouselMamado() {
  const { language, setLanguage } = useLanguage("es");
  const texts = {
    es: {
      txt1: "Nuestros Servicios",
      txt2: "Selecciona el servicio del que desees conocer mas",
      card1: {
        title: "Aplicaciones Diseñadas",
        description:
          "Disponemos de aplicaciones desarrolladas para que implementes en tu empresa",
        img: "/amedida.jpg",
      },
      card2: {
        title: "Aplicaciones Diseñadas",
        description:
          "Disponemos de aplicaciones desarrolladas para que implementes en tu empresa",
        img: "/desarrollado.jpg",
      },
      card3: {
        title: "Desarrollo Web",
        description:
          "Desarrollamos webs para tu empresa, con los mejores tiempos de entrega",
        img: "/webdevelopment.webp",
      },
    },
    en: {
      txt1: "Our Services",
      txt2: "Select the service you want to know more about",
      card1: {
        title: "Designed Applications",
        description:
          "We have developed applications for you to implement in your company",
        img: "/amedida.jpg",
      },
      card2: {
        title: "Designed Applications",
        description:
          "We have developed applications for you to implement in your company",
        img: "/desarrollado.jpg",
      },
      card3: {
        title: "Web Development",
        description:
          "We develop websites for your company, with the best delivery times",
        img: "/webdevelopment.webp",
      },
    },
  };
  return (
    <section className="pt-[0rem] pb-[10rem]">
      <div className="container    px-6 pt-7 pb-0 mx-auto sm:pt-0  ">
        <h3 className="text-4xl pt-[3rem]  font-semibold text-center  capitalize lg:text-6xl text-white">
          {texts[language].txt1}
        </h3>
        <div className="flex justify-center mx-auto mt-6">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>
        <p className="text-gray-400 text-center text-lg font-light pt-[0.5rem] ">
          {texts[language].txt2}
        </p>
      </div>
      <div></div>
      <div className="h-[27rem] "></div>
      <div className="container px-6 mx-auto -mt-72 sm:-mt-80 md:-mt-96">
        <div className="grid grid-cols-1 gap-8 mt-0 xl:mt-1 md:grid-cols-2 xl:grid-cols-3">
          <ServiceCard
            href={"#desarrollo-medida"}
            img={texts[language].card1.img}
            title={texts[language].card1.title}
            text={texts[language].card1.description}
          ></ServiceCard>
          <ServiceCard
            href={"#carcheck"}
            img={texts[language].card2.img}
            title={texts[language].card2.title}
            text={texts[language].card2.description}
          ></ServiceCard>
          <ServiceCard
            href={"#desarrollo-web"}
            img={texts[language].card2.img}
            title={texts[language].card3.title}
            text={texts[language].card1.description}
          ></ServiceCard>
        </div>
      </div>
    </section>
  );
}
