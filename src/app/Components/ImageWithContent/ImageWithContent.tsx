import Link from "next/link";
import Image from "next/image";
export default function ImageWithContent() {
    let es ={
        title:'QUE BUSCAMOS ?',
        paragraph1:'Creamos Aspa con el objetivo de poder brindar a las empresas un software o sistemas de información que pueda ayudar a cumplir los objetivos que tengan. El ideal de Aspa se encuentra en conocer realmente la necesidad de nuestros clientes y poder acercarnos de la mejor manera para desarrollar una plataforma adecuada que solucione un problema, agilice un proceso o brinde información relevante para la obtención de mejores resultados.',
        paragraph2:'Para nosotros en Aspa, cada proyecto es una oportunidad para demostrar nuestro compromiso con la excelencia y la satisfacción del cliente. Nos esforzamos por entender a fondo las necesidades y desafíos específicos de cada empresa con la que trabajamos, y así diseñar soluciones a medida que no solo resuelvan problemas inmediatos, sino que también establezcan bases sólidas para el crecimiento y la innovación a largo plazo. Nuestro enfoque se centra en la colaboración estrecha y la comunicación transparente, asegurando que cada paso del proceso de desarrollo esté alineado con las expectativas y metas del cliente. En Aspa, no solo entregamos software de calidad, sino que también cultivamos relaciones de confianza y éxito mutuo con quienes confían en nosotros para impulsar su progreso tecnológico y empresarial.',
        button:'Contáctanos',
    }
    let en = {
        title: 'WHAT ARE WE LOOKING FOR?',
        paragraph1: 'We created Aspa with the goal of providing companies with software or information systems that can help achieve their objectives. The ideal of Aspa is to truly understand the needs of our clients and to approach them in the best way to develop an appropriate platform that solves a problem, streamlines a process, or provides relevant information for better results.',
        paragraph2: 'For us at Aspa, each project is an opportunity to demonstrate our commitment to excellence and customer satisfaction. We strive to deeply understand the specific needs and challenges of each company we work with, and thus design tailored solutions that not only solve immediate problems but also lay a solid foundation for long-term growth and innovation. Our approach focuses on close collaboration and transparent communication, ensuring that every step of the development process is aligned with the client’s expectations and goals. At Aspa, we not only deliver quality software but also cultivate relationships of trust and mutual success with those who trust us to drive their technological and business progress.',
        button: 'Contact Us',
    };
    return (
        <section>
            <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <Image
                            alt="crecimiento"
                            title="crecimiento"
                            src="/crecimiento.avif"
                            className="h-[90%] rounded-lg w-full object-cover"
                            width={1500}
                            height={800}
                        ></Image>
                    </div>
                    <div className="lg:py-24">
                        <h2 className="text-4xl text-white font-bold ">
                            {es.title}
                        </h2>
                        <p className="mt-4 text-base text-gray-300">
                            {es.paragraph1}
                            <br />
                            <br />
                            {es.paragraph2}
                        </p>
                        <div className="mt-12 mb-10 text-center">
                            <Link
                                title="link"
                                href="/contact"
                                className="inline-block rounded bg-blue-400 px-[4rem] py-3 text-sm font-medium text-white transition hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400"
                            >
                                {es.button}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
