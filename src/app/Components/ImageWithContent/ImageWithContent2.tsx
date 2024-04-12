import Link from "next/link";
import Image from "next/image";
export default function ImageWithContent2() {
    return (
        <section >
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
                <h2 className="text-4xl text-white font-bold">Quiénes somos?</h2>

                <p className="mt-4 text-base text-gray-300">
                    Como desarrollador inmobiliario especializado en urbanización, mi compromiso es crear entornos
                    residenciales que destaquen por su calidad, excelencia y profesionalismo. Cada proyecto que emprendo
                    se caracteriza por cumplir con los más altos estándares de construcción y diseño, asegurando así un
                    estilo de vida excepcional para quienes eligen formar parte de estas comunidades.
                    <br />
                    <br />
                    Desde la cuidadosa planificación urbana hasta la selección estratégica de ubicaciones, me esfuerzo
                    por ofrecer más que simples edificaciones; busco proporcionar hogares que reflejen un equilibrio
                    armonioso con su entorno. La atención meticulosa a los detalles y mi compromiso con prácticas
                    sostenibles son elementos esenciales que contribuyen a la creación de espacios habitables que no solo
                    satisfacen las necesidades de los residentes, sino que también promueven un bienestar duradero en la
                    comunidad.
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
