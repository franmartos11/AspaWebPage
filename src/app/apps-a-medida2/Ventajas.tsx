'use client'
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

const Ventajas: React.FC = () => {
  const { language } = useLanguage('es');
  
  const texts = {
    es: {
        title: 'Hace Crecer tu Negocio con el',
        title2: 'Desarrollo de Apps',
        paragraph: 'Desarrollamos soluciones digitales a medida para optimizar procesos, mejorar productividad y potenciar tu negocio.',
        paragraph2: 'No solo diseñamos y construimos tu aplicación, sino que también te ofrecemos:',
        subtitle1: 'Consultoría',
        subtext1: 'Te ayudamos a definir qué tipo de app es ideal para tu negocio.',
        subtitle2: 'Desarrollo',
        subtext2: 'Ahorra hasta un',
        subtext21: '800%',
        subtext22: ' en costos con nuestros frameworks.',
        subtitle3: 'Publicación',
        subtext3: 'Nos encargamos de publicar tu app en ',
        subtext31: 'Google Play y App Store.',
        subtitle4: 'Lanzamiento',
        subtext4: 'Incluimos un plan de lanzamiento y asesoramiento.',
    },
    en: {
        title: 'Grow Your Business with',
        title2: 'App Development',
        paragraph: 'We develop custom digital solutions to optimize processes, improve productivity, and boost your business.',
        paragraph2: 'We not only design and build your application, but we also offer:',
        subtitle1: 'Consulting',
        subtext1: 'We help you define what type of app is ideal for your business.',
        subtitle2: 'Development',
        subtext2: 'Save up to',
        subtext21: '800%',
        subtext22: ' in costs with our frameworks.',
        subtitle3: 'Publishing',
        subtext3: 'We take care of publishing your app on ',
        subtext31: 'Google Play and App Store.',
        subtitle4: 'Launch',
        subtext4: 'We include a launch plan and consulting services.',
    }
}


  return (
    <section className="py-[9rem] px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold ">
        {texts[language].title} {" "}
        <span className="text-blue-600 transition-all">{texts[language].title2}</span>
      </h2>
      <p className="mt-4 text-gray-400 text-lg max-w-3xl mx-auto">
      {texts[language].paragraph}
      </p>

      <p className="mt-4 text-blue-600 font-medium">
      {texts[language].paragraph2}
      </p>

      <div className="mt-[6rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {/* Consultoría */}
        <div className="flex flex-col items-center">
          <img src="/consultoria1.png" alt="Consultoría" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">{texts[language].subtitle1}</h3>
          <p className="text-gray-400 text-sm mt-2">{texts[language].subtext1}</p>
        </div>

        {/* Desarrollo */}
        <div className="flex flex-col items-center">
          <img src="/desarrollo2.png" alt="Desarrollo" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">{texts[language].subtitle2}</h3>
          <p className="text-gray-400 text-sm mt-2">{texts[language].subtext2} <span className="font-bold text-blue-600">{texts[language].subtext21}</span> {texts[language].subtext22}.</p>
        </div>

        {/* Publicación */}
        <div className="flex flex-col items-center">
          <img src="/upload.png" alt="Publicación" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">{texts[language].subtitle3}</h3>
          <p className="text-gray-400 text-sm mt-2">{texts[language].subtext3} <span className="font-bold">{texts[language].subtext31}</span></p>
        </div>

        {/* Lanzamiento */}
        <div className="flex flex-col items-center">
          <img src="/lanzamiento.png" alt="Lanzamiento" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">{texts[language].subtitle4}</h3>
          <p className="text-gray-400 text-sm mt-2">{texts[language].subtext4}</p>
        </div>
      </div>
    </section>
  );
};

export default Ventajas;
