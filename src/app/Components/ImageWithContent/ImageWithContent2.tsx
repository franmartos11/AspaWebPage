import Link from "next/link";
import Image from "next/image";
export default function ImageWithContent2() {
    let es ={
        title:'Quiénes somos ?',
        paragraph1:'En Aspa, somos un equipo apasionado y diverso de profesionales dedicados a la excelencia y la innovación en tecnología. Fundada por dos programadores visionarios y un especialista en marketing, diseño y ventas, nuestra empresa combina creatividad, tecnología avanzada y estrategia empresarial para ofrecer soluciones integrales. Nuestra habilidad para fusionar competencias técnicas sólidas con una aguda mentalidad comercial nos permite entregar soluciones que no solo son técnicamente robustas, sino también comercialmente viables y alineadas estratégicamente con los objetivos de nuestros clientes. En Aspa, nuestro enfoque integral asegura que cada proyecto se ejecute con precisión y eficacia, brindando resultados excepcionales y sostenibles.',
        paragraph2:'En el núcleo de Aspa, nuestro compromiso con la colaboración, la transparencia y la mejora continua es fundamental. Creemos firmemente en el poder del trabajo en equipo y en la diversidad de perspectivas para fomentar la innovación y alcanzar la excelencia. Cada miembro de nuestro equipo aporta habilidades únicas y una experiencia invaluable, lo que nos capacita para enfrentar los desafíos más complejos con creatividad y determinación. En Aspa, trabajamos para crear un ambiente de trabajo inclusivo y estimulating, donde cada individuo se sienta valorado y pueda contribuir al éxito colectivo de la empresa y de nuestros clientes. Nuestro enfoque en la inclusión y el desarrollo personal asegura que cada proyecto se ejecute con la máxima calidad y eficacia, fortaleciendo nuestras relaciones y resultados.',
        button:'Contáctanos',
    };
    let en = {
        title: 'Who Are We?',
        paragraph1: 'At Aspa, we are a passionate and diverse team of professionals dedicated to excellence and innovation in technology. Founded by two visionary programmers and a specialist in marketing, design, and sales, our company combines creativity, advanced technology, and business strategy to offer comprehensive solutions. Our ability to merge strong technical skills with a sharp business mindset allows us to deliver solutions that are not only technically robust but also commercially viable and strategically aligned with our clients’ goals. At Aspa, our holistic approach ensures that each project is executed with precision and efficiency, delivering exceptional and sustainable results.',
        paragraph2: 'At the core of Aspa, our commitment to collaboration, transparency, and continuous improvement is fundamental. We firmly believe in the power of teamwork and the diversity of perspectives to foster innovation and achieve excellence. Each member of our team brings unique skills and invaluable experience, enabling us to tackle the most complex challenges with creativity and determination. At Aspa, we strive to create an inclusive and stimulating work environment where every individual feels valued and can contribute to the collective success of the company and our clients. Our focus on inclusion and personal development ensures that each project is executed with the highest quality and efficiency, strengthening our relationships and results.',
        button: 'Contact Us',
    };
    
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                        <Image
                            alt="quienes somos"
                            title="quienes somos"
                            src="/logoaspanewera.png"
                            className=" h-[90%] rounded-lg w-full object-cover"
                            width={500}
                            height={100}
                        ></Image>
                    </div>
                    <div className="lg:py-24">
                        <h1 className="text-4xl uppercase text-white font-bold">
                            {es.title}
                        </h1>

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
