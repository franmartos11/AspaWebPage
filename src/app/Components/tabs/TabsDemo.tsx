"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs } from "./Tabs";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export function TabsDemo() {
  const { language, setLanguage } = useLanguage("es");
  const texts = {
    es: {
      titulo: "Nuestros Servicios",
      tab1: {
        nombre: "Carcheck",
        imgpath: "/aspacarcheckbanner.png",
      },
      tab2: {
        nombre: "Audit",
        imgpath: "/aspaAuditBanner.png",
      },
      tab3: {
        nombre: "Páginas Web",
        imgpath: "/desarrolloWebBanner.png",
      },
      tab4: {
        nombre: "Apps a Medida",
        imgpath: "/appsAMedidaBanner.png",
      },
    },
    en: {
      titulo: "Our Services",
      tab1: {
        nombre: "Carcheck",
        imgpath: "/aspacarcheckbanner.png",
      },
      tab2: {
        nombre: "Audit",
        imgpath: "/aspaAuditBanner.png",
      },
      tab3: {
        nombre: "Web Pages",
        imgpath: "/desarrolloWebBanner.png",
      },
      tab4: {
        nombre: "Custom Apps",
        imgpath: "/appsAMedidaBanner.png",
      },
    },
  };

  const tabs = [
    {
      title: texts[language].tab1.nombre,
      value: "product",
      link: "/carcheck",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
          <img
            src={texts[language].tab1.imgpath}
            alt="carcheck-data"
            title="carcheck-data"
            className="rounded-2xl"
          />
        </div>
      ),
    },
    {
      title: texts[language].tab2.nombre,
      value: "services",
      link: "/auditorias",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
          <img
            src={texts[language].tab2.imgpath}
            alt="Auditorias-data"
            title="Auditorias-data"
            className="rounded-2xl"
          />
        </div>
      ),
    },
    {
      title: texts[language].tab3.nombre,
      value: "playground",
      link: "/desarrollo-web",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
          <img
            src={texts[language].tab3.imgpath}
            alt="Paginas-Web-data"
            title="Paginas-Web-data"
            className="rounded-2xl"
          />
        </div>
      ),
    },
    {
      title: texts[language].tab4.nombre,
      value: "content",
      link: "/apps-a-medida",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
          <img
            src={texts[language].tab4.imgpath}
            alt="Apps-a-Medida-data"
            title="Apps-a-Medida-data"
            className="rounded-2xl"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <motion.div
        className="container px-6 pt-7 pb-0 mx-auto sm:pt-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl pt-16 font-semibold text-center capitalize lg:text-6xl text-white">
          {texts[language].titulo}
        </h2>
        <div className="flex justify-center mx-auto mt-6">
          <motion.span
            className="inline-block h-1 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "10rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full" />
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full" />
        </div>
      </motion.div>
      <div className="h-[20rem] md:h-[37rem]  [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/desarrollado.jpg"
      alt="image"
      title="image"
      width="500"
      height="500"
      className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
