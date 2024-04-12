import Link from "next/link";
import Image from "next/image";
export default function ImageWithContent() {
    return (
        <section>
            <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <Image
                            alt="crecimiento"
                            src="/crecimientoSoftware.webp"
                            className="absolute inset-0 h-full w-full object-cover"
                            width={1500}
                            height={800}
                        ></Image>
                    </div>
                    <div className="lg:py-24">
                        <h2 className="text-4xl text-white font-bold ">
                            QUE BUSCAMOS ?
                        </h2>

                        <p className="mt-4 text-base text-gray-300">
                            Creamos Aspa con el objetivo de poder brindar a las
                            empresas un software o sistemas de información que
                            pueda ayudar a cumplir los objetivos que tengan. El
                            ideal de Aspa se encuentra en conocer realmente la
                            necesidad de nuestros clientes y poder acercarnos de
                            la mejor manera para desarrollar una plataforma
                            adecuada que solucione un problema, agilice un
                            proceso o brinde información relevante para la
                            obtención de mejores resultados.
                            <br />
                            <br />
                            Para nosotros en Aspa, cada proyecto es una
                            oportunidad para demostrar nuestro compromiso con la
                            excelencia y la satisfacción del cliente. Nos
                            esforzamos por entender a fondo las necesidades y
                            desafíos específicos de cada empresa con la que
                            trabajamos, y así diseñar soluciones a medida que no
                            solo resuelvan problemas inmediatos, sino que
                            también establezcan bases sólidas para el
                            crecimiento y la innovación a largo plazo. Nuestro
                            enfoque se centra en la colaboración estrecha y la
                            comunicación transparente, asegurando que cada paso
                            del proceso de desarrollo esté alineado con las
                            expectativas y metas del cliente. En Aspa, no solo
                            entregamos software de calidad, sino que también
                            cultivamos relaciones de confianza y éxito mutuo con
                            quienes confían en nosotros para impulsar su
                            progreso tecnológico y empresarial.
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
