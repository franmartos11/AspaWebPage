import Image from "next/image";
import Link from "next/link";
export default function CardProyectWeb() {
    return (
        <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                Desarrollo Web
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                ¿Estás listo para aprovechar las ventajas del
                                desarrollo web y llevar tu negocio al siguiente
                                nivel? Contacta con nosotros y te ayudaremos a
                                crear un sitio web personalizado que cumpla con
                                tus necesidades y te impulse hacia el éxito.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <div className="flex justify-center flex-col ">
                        <Image
                            className="max-w-[48rem]  w-full rounded-xl  shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
                            src="/imageweb.png"
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
                            <h2 className="text-2xl">
                                Una página web te ayudara con:
                            </h2>
                            <br />
                            <h3>Visibilidad global:</h3>
                            <br />
                            <p>
                                Tu sitio web te permite estar presente en el
                                mercado digital, las 24 horas del día, los 7
                                días de la semana, para clientes de todo el
                                mundo. No solo amplías tu alcance, sino que
                                también abres nuevas oportunidades de negocio
                                que antes no estaban disponibles.
                                <br />
                                <br />
                            </p>
                            <h3>Crecimiento del negocio</h3>

                            <p className="mt-6">
                                Un sitio web atractivo y funcional puede ser una
                                herramienta poderosa para atraer nuevos
                                clientes, aumentar tus ventas y fidelizar a los
                                clientes existentes. A través de una experiencia
                                online personalizada, ofreces una mejor atención
                                al cliente y construyes relaciones duraderas.
                                <br />
                                <br />
                            </p>

                            <h2>Imagen profesional</h2>

                            <p className="mt-6">
                                Un sitio web moderno y profesional es la carta
                                de presentación de tu negocio en el mundo
                                digital. Te ayuda a proyectar una imagen de
                                confianza, seriedad y competencia, lo que te da
                                una ventaja sobre tus competidores.
                                <br />
                                <br />
                            </p>
                            <h2>Eficiencia y automatización</h2>

                            <p className="mt-6">
                                Un sitio web te permite optimizar procesos,
                                automatizar tareas repetitivas y eliminar la
                                necesidad de personal para ciertas actividades.
                                Esto te permite ahorrar tiempo y dinero, y
                                enfocarte en lo que realmente importa: hacer
                                crecer tu negocio.
                                <br />
                                <br />
                            </p>
                            <h2>Marketing digital</h2>

                            <p className="mt-6">
                                Un sitio web es la base fundamental para
                                implementar estrategias de marketing online
                                efectivas. Te permite llegar a tu público
                                objetivo de manera precisa, aumentar el tráfico
                                a tu sitio web, generar leads y conversiones, y
                                finalmente, impulsar tus ventas.
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
