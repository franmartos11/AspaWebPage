import Image from "next/image";
import Link from "next/link";
export default function CardProyect() {
    return (
        <div className="relative isolate overflow-hidden bg-black px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                CarCheck Workshop 
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                alista tu car
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <Image
                        className="w-[48rem] max-w-none rounded-xl bg-gray-400 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/qs.jpg"
                        alt=""
                        width={612}
                        height={612}
                    ></Image>
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-200 lg:max-w-lg">
                            <p>
                                Dos Arroyos, es un desarrollo de montaña ubicado
                                a orillas del arroyo El Cajón, a minutos de El
                                Durazno, un pequeño pueblo localizado al pie del
                                Cerro Champaquí, con una belleza particular
                                caracterizada por su río homónimo, variedad de
                                arroyos y grandes extensiones de pinares sobre
                                sus cerros. Zona de gran crecimiento turístico
                                en los últimos años y de enorme potencial para
                                los próximos.
                                <br />
                                <br />
                            </p>
                            <h2> PARCELAS EN VENTA </h2>

                            <p className="mt-6">
                                El desarrollo cuenta con un total de 20 chacras
                                exclusivas, planteadas desde una filosofía
                                sustentable y de respeto a la naturaleza, donde
                                el diseño y tamaño de las mismas junto al
                                aprovechamiento de las energías renovables hacen
                                al cuidado de la montaña, la vegetación y los
                                animales que allí habitan. La presencia de sus
                                arroyos con caudal de agua todo el año, sus
                                abundantes pinos y pendientes, hacen de Dos
                                Arroyos un espacio ideal para disfrutar la
                                conexión con la montaña, la vida silvestre y la
                                tranquilidad.
                            </p>
                            <br />

                            <h2> SUSTENTABILIDAD EDILICIA EN CABAÑAS </h2>

                            <p className="mt-6">
                                En Dos Arroyos, estamos comprometidos con el
                                cuidado del medio ambiente y la promoción de
                                prácticas sostenibles en todas nuestras
                                operaciones. Nuestras cabañas no solo ofrecen un
                                refugio acogedor en medio de la naturaleza, sino
                                que también están diseñadas y construidas con
                                los más altos estándares de sustentabilidad
                                edilicia. ¿Qué es la sustentabilidad edilicia?
                                Es el enfoque integral que considera el impacto
                                ambiental, social y económico de la construcción
                                y operación de edificios.
                            </p>
                            <p className="mt-6">
                                En Dos Arroyos, nos esforzamos por minimizar
                                nuestra huella ecológica y maximizar el
                                bienestar de nuestros huéspedes y la comunidad
                                local. Nuestras cabañas están construidas con
                                materiales eco-amigables y de bajo impacto
                                ambiental. Desde los materiales certificados
                                hasta los sistemas de energía renovable, cada
                                aspecto de nuestras construcciones se selecciona
                                cuidadosamente para garantizar la máxima
                                eficiencia y mínimos residuos. Además, nuestras
                                cabañas están diseñadas para integrarse
                                armoniosamente con el entorno natural
                                circundante. Desde los paisajes hasta la vida
                                silvestre, nos esforzamos por preservar y
                                proteger la belleza única de cada ubicación
                                donde operamos. Al elegirnos, no solo
                                disfrutarás de un ambiente tranquilo y
                                relajante, sino que también estarás apoyando
                                prácticas sustentables y responsables.
                            </p>
                            <p className="mt-6">
                                ¡Únete a nosotros en nuestro viaje hacia un
                                futuro más verde y próspero! ¡Visita la web del
                                proyecto y descubre la belleza de la
                                sustentabilidad en Dos Arroyos!
                            </p>
                            <Link
                                href="http://dosarroyoseldurazno.com.ar/?utm_term&utm_campaign=2A%20-%20Maximo%20Rendimiento&utm_source=adwords&utm_medium=ppc&hsa_acc=7732122384&hsa_cam=19982195984&hsa_grp&hsa_ad&hsa_src=x&hsa_tgt&hsa_kw&hsa_mt&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjwwMqvBhCtARIsAIXsZpblkfcvM5a9idid-TrFtRsz-1SbIa8dSw__bjxw6YXFn1UqeUJO-xMaAqHxEALw_wcB"
                                className="mt-[2rem] inline-block rounded border-blue-950 bg-blue-950 px-12 py-3 text-sm font-medium text-white  hover:bg-blue-900 focus:outline-none focus:ring active:text-blue-950"
                            >
                                Visita la web
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
