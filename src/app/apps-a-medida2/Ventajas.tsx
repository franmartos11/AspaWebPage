'use client'

const Ventajas: React.FC = () => {
  
  return (
    <section className="py-[9rem] px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold ">
        Hace Crecer tu Negocio con el {" "}
        <span className="text-blue-600 transition-all">Desarrollo de Apps</span>
      </h2>
      <p className="mt-4 text-gray-400 text-lg max-w-3xl mx-auto">
        Desarrollamos soluciones digitales a medida para optimizar procesos, mejorar productividad y potenciar tu negocio.
      </p>

      <p className="mt-4 text-blue-600 font-medium">
        No solo diseñamos y construimos tu aplicación, sino que también te ofrecemos:
      </p>

      <div className="mt-[6rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {/* Consultoría */}
        <div className="flex flex-col items-center">
          <img src="/consultoria1.png" alt="Consultoría" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">Consultoría</h3>
          <p className="text-gray-400 text-sm mt-2">Te ayudamos a definir qué tipo de app es ideal para tu negocio.</p>
        </div>

        {/* Desarrollo */}
        <div className="flex flex-col items-center">
          <img src="/desarrollo2.png" alt="Desarrollo" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">Desarrollo</h3>
          <p className="text-gray-400 text-sm mt-2">Ahorra hasta un <span className="font-bold text-blue-600">800%</span> en costos con nuestros frameworks.</p>
        </div>

        {/* Publicación */}
        <div className="flex flex-col items-center">
          <img src="/upload.png" alt="Publicación" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">Publicación</h3>
          <p className="text-gray-400 text-sm mt-2">Nos encargamos de publicar tu app en <span className="font-bold">Google Play y App Store.</span></p>
        </div>

        {/* Lanzamiento */}
        <div className="flex flex-col items-center">
          <img src="/lanzamiento.png" alt="Lanzamiento" className="w-12 h-12" />
          <h3 className="mt-4 text-xl font-semibold ">Lanzamiento</h3>
          <p className="text-gray-400 text-sm mt-2">Incluimos un plan de lanzamiento y asesoramiento.</p>
        </div>
      </div>
    </section>
  );
};

export default Ventajas;
