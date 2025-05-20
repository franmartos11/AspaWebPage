import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
export default function CardProyectWeb() {
  const { language, setLanguage } = useLanguage("es");
  const texts = {
    es: {
      title: "Desarrollo Web",
      subtitle:
        "¿Quieres aprovechar las ventajas del desarrollo web y llevar tu negocio al siguiente nivel? Contacta con nosotros y te ayudaremos a crear un sitio web personalizado que cumpla con tus necesidades y te impulse hacia el éxito.",

      text1: "Visibilidad global",
      desciption1:
        "Un sitio web te permite estar presente en el mercado digital las 24 horas del día, los 7 días de la semana, para clientes de todo el mundo. No solo amplías tu alcance, sino que también abres nuevas oportunidades de negocio que antes no estaban disponibles. Aumenta tu visibilidad global y conecta con una audiencia internacional.",
      text2: "Crecimiento del negocio",
      desciption2:
        "Un sitio web atractivo y funcional es una herramienta poderosa para atraer nuevos clientes, aumentar tus ventas y fidelizar a los clientes existentes. A través de una experiencia online personalizada, ofreces una mejor atención al cliente y construyes relaciones duraderas. Impulsa el crecimiento de tu negocio con una presencia online efectiva.",
      text3: "Imagen profesional",
      desciption3:
        "Un sitio web moderno y profesional es la carta de presentación de tu negocio en el mundo digital. Te ayuda a proyectar una imagen de confianza, seriedad y competencia, lo que te da una ventaja sobre tus competidores. Destaca con una imagen profesional que refleje la calidad de tus servicios.",
      text4: "Eficiencia y automatización",
      desciption4:
        "Un sitio web te permite optimizar procesos, automatizar tareas repetitivas y eliminar la necesidad de personal para ciertas actividades. Esto te permite ahorrar tiempo y dinero, y enfocarte en lo que realmente importa: hacer crecer tu negocio. Mejora la eficiencia y automatiza procesos para maximizar tus recursos.",
      text5: "Marketing digital",
      desciption5:
        "Un sitio web es la base fundamental para implementar estrategias de marketing online efectivas. Te permite llegar a tu público objetivo de manera precisa, aumentar el tráfico a tu sitio web, generar leads y conversiones, y finalmente, impulsar tus ventas. Potencia tu marketing digital y alcanza tus objetivos comerciales.",
    },
    en: {
      title: "Web Development",
      subtitle:
        "Want to leverage the advantages of web development and take your business to the next level? Contact us and we'll help you create a personalized website that meets your needs and drives your success.",

      text1: " Global Visibility",
      desciption1:
        "A website allows you to be present in the digital market 24/7 for customers around the world. Not only do you expand your reach, but you also open up new business opportunities that were previously unavailable. Increase your global visibility and connect with an international audience.",
      text2: "Business Growth",
      desciption2:
        "An attractive and functional website is a powerful tool to attract new customers, increase your sales, and retain existing clients. Through a personalized online experience, you offer better customer service and build lasting relationships. Drive your business growth with an effective online presence.",
      text3: "Professional Image",
      desciption3:
        "A modern and professional website is your business is calling card in the digital world. It helps you project an image of trust, seriousness, and competence, giving you an edge over your competitors. Stand out with a professional image that reflects the quality of your services.",
      text4: "Efficiency and Automation",
      desciption4:
        "A website allows you to optimize processes, automate repetitive tasks, and eliminate the need for personnel for certain activities. This saves you time and money, allowing you to focus on what really matters: growing your business. Improve efficiency and automate processes to maximize your resources.",
      text5: "Digital Marketing",
      desciption5:
        "A website is the fundamental base for implementing effective online marketing strategies. It allows you to reach your target audience precisely, increase traffic to your website, generate leads and conversions, and ultimately boost your sales. Enhance your digital marketing and achieve your business goals.",
    },
  };

  return (
    <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {texts[language].title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-100">
                {texts[language].subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="flex justify-center flex-col ">
            <Image
              className="max-w-[48rem] mb-[1rem]  w-full rounded-xl  shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
              src="/vpweb2.png"
              alt="desarrollo web"
              title="desarrollo web"
              width={1920}
              height={1080}
            ></Image>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-200 lg:max-w-lg">
              <br />
              <h2 className="text-xl">{texts[language].text1}</h2>
              <br />
              <p>
                {texts[language].desciption1}
                <br />
                <br />
              </p>
              <h2 className="text-xl">{texts[language].text2}</h2>

              <p className="mt-6">
                {texts[language].desciption2}
                <br />
                <br />
              </p>

              <h2 className="text-xl">{texts[language].text3}</h2>

              <p className="mt-6">
                {texts[language].desciption3}
                <br />
                <br />
              </p>
              <h2 className="text-xl">{texts[language].text4}</h2>

              <p className="mt-6">
                {texts[language].desciption4}
                <br />
                <br />
              </p>
              <h2 className="text-xl">{texts[language].text5}</h2>

              <p className="mt-6">
                {texts[language].desciption5}
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
