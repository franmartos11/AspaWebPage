import Link from "next/link";
import Image from "next/image";
export default function ImageWithContent2() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                        <Image
                            alt="Party"
                            src="/image2.png"
                            className="absolute inset-0 h-full w-full object-cover"
                            width={1200}
                            height={800}
                        ></Image>
                    </div>
                    <div className="lg:py-24">
                        <h2 className="text-4xl text-white font-bold">
                            Quiénes somos?
                        </h2>

                        <p className="mt-4 text-base text-gray-300">
                            En Aspa, somos un equipo apasionado y diverso de
                            profesionales comprometidos con la excelencia y la
                            innovación. Fundada por dos programadores con una
                            visión compartida y un especialista en marketing,
                            diseño y ventas, nuestra empresa representa la
                            perfecta fusión entre la creatividad, la tecnología
                            y la estrategia empresarial. Nos enorgullece nuestra
                            capacidad para combinar habilidades técnicas sólidas
                            con una mentalidad comercial aguda, lo que nos
                            permite ofrecer soluciones integrales que no solo
                            son técnicamente sólidas, sino también
                            comercialmente viables y estratégicamente alineadas
                            con los objetivos de nuestros clientes.
                            <br />
                            <br />
                            En el núcleo de nuestra empresa está el compromiso
                            con la colaboración, la transparencia y la mejora
                            continua. Creemos en el poder del trabajo en equipo
                            y en la diversidad de perspectivas para impulsar la
                            innovación y la excelencia. Cada miembro de nuestro
                            equipo aporta habilidades únicas y experiencia
                            invaluable, lo que nos permite abordar los desafíos
                            más complejos con creatividad y determinación. En
                            Aspa, nos esforzamos por crear un ambiente de
                            trabajo inclusivo y estimulante, donde cada
                            individuo se sienta valorado y capacitado para
                            contribuir al éxito colectivo de la empresa y de
                            nuestros clientes.
                        </p>
                        <div className="mt-12 mb-10 text-center">
                            <Link
                                href="/contact"
                                className="inline-block rounded bg-blue-950 px-[4rem] py-3 text-sm font-medium text-white transition hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400"
                            >
                                Contáctanos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
