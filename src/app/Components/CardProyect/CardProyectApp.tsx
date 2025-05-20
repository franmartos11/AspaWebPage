import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export default function CardProyectApp() {
  const { language, setLanguage } = useLanguage("es");
  const texts = {
    es: {
      title: "Desarrollo de Apps a Medida",
      subtitle:
        "¿Estás listo para llevar tu negocio al siguiente nivel con una app a medida? Contacta con nosotros y te ayudaremos a crear una app que cumpla con tus necesidades y te impulse hacia el éxito.",

      text1: "Soluciones personalizadas",
      desciption1:
        "Olvídate de las limitaciones de las apps genéricas. Con una app a medida, obtienes una solución que se adapta perfectamente a las necesidades específicas de tu negocio y a los flujos de trabajo de tus empleados.",
      text2: "Eficiencia y productividad",
      desciption2:
        "Una app a medida puede automatizar tareas repetitivas, optimizar procesos y eliminar la necesidad de personal para ciertas actividades. Esto te permite ahorrar tiempo y dinero, y aumentar la productividad de tu equipo.",
      text3: "Mayor satisfacción del cliente",
      desciption3:
        "Una app intuitiva, fácil de usar y que ofrece una experiencia personalizada a tus clientes, aumenta su satisfacción y fidelización.",
      text4: "Ventaja competitiva",
      desciption4:
        "En un mercado cada vez más competitivo, una app a medida te permite diferenciarte de tus competidores y ofrecer un valor único a tus clientes.",
      text5: "Escalabilidad",
      desciption5:
        "A medida que tu negocio crece, tu app a medida también puede crecer contigo. Se adapta a tus necesidades cambiantes y te permite seguir ofreciendo una experiencia de usuario excepcional.",
    },
    en: {
      title: "Custom App Development",
      subtitle:
        "Ready to take your business to the next level with a custom app? Contact us and we'll help you create an app that meets your needs and drives your success.",

      text1: "Personalized Solutions",
      desciption1:
        "Forget the limitations of generic apps. With a custom app, you get a solution that perfectly fits the specific needs of your business and your employees' workflows.",
      text2: "Efficiency and Productivity",
      desciption2:
        "A custom app can automate repetitive tasks, optimize processes, and eliminate the need for personnel for certain activities. This allows you to save time and money, and increase your team's productivity.",
      text3: "Greater Customer Satisfaction",
      desciption3:
        "An intuitive, easy-to-use app that offers a personalized experience to your customers increases their satisfaction and loyalty.",
      text4: "Competitive Advantage",
      desciption4:
        "In an increasingly competitive market, a custom app allows you to differentiate yourself from your competitors and offer unique value to your customers.",
      text5: "Scalability",
      desciption5:
        "As your business grows, your custom app can grow with you. It adapts to your changing needs and allows you to continue offering an exceptional user experience.",
    },
  };

  return (
    <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-left text-white sm:text-5xl">
                {texts[language].title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-100">
                {texts[language].subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="flex justify-center">
            <Image
              className="max-w-[48rem] w-full rounded-xl bg-gray-400 shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
              src="/apps-a-medida-3.jpg"
              alt="apps a medida"
              title="apps a medida"
              width={812}
              height={812}
            ></Image>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-200 lg:max-w-lg">
              <br />
              <h3>{texts[language].text1}</h3>
              <br />
              <p>
                {texts[language].desciption1}
                <br />
                <br />
              </p>
              <h3>{texts[language].text2}</h3>

              <p className="mt-6">
                {texts[language].desciption2}
                <br />
                <br />
              </p>

              <h3>{texts[language].text3}</h3>

              <p className="mt-6">
                {texts[language].desciption3}
                <br />
                <br />
              </p>
              <h3>{texts[language].text4}</h3>

              <p className="mt-6">
                {texts[language].desciption4}
                <br />
                <br />
              </p>
              <h3>{texts[language].text5}</h3>

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
