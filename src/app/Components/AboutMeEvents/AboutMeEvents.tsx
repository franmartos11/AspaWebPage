'use client'
import { useLanguage } from "../AALenguageContext/LenguageContext";
import AboutMeCard from "./AboutMeCard";


export default function AboutMeEvents() {
    const { language, setLanguage } = useLanguage('es');
    const texts = {
        es :{
            title: 'EVENTOS',
            card1:{
                type:'Formación',
                title:'Impulso 21',
                text:'Participamos de una incubadora de negocios,practicando la validación, evaluación y planificación de ideas.',
                place:'Córdoba',
                link:'https://21.edu.ar/impulso-21',
                linkName:'Impulso21.com',
                img:'/impulso21.jpg',
            },
            card2:{
                type:'Expositores',
                title:'Feria 21',
                text:'Fuimos exponentes de un software a medida que generaba leeds para negocios segun rubro y ubicacion.',
                place:'Córdoba',
                link:'https://feria.21.edu.ar',
                linkName:'Feria.21.edu.ar',
                img:'/feria21.jpg',
            },
            card3:{
                type:'Formación',
                title:'Evento TV 4.0 en vivo',
                text:'Fuimos parte de una jornada en la que la ciencia, la innovación y la tecnología fueron las premisas.',
                place:'Córdoba Hotel Centenario',
                link:'https://eldoce.tv/sociedad/tv-4-0-vivo-megaevento-ciencia-innovacion-tecnologia-el-doce_158243/',
                linkName:'TV 4.0 Canal 12',
                img:'/evento3.jpeg',
            }
        },
        en : {
            title: 'EVENTS',
            card1: {
                type: 'Training',
                title: 'Impulso 21',
                text: 'We participated in a business incubator, practicing validation, evaluation, and planning of ideas.',
                place: 'Córdoba',
                link: 'https://21.edu.ar/impulso-21',
                linkName: 'Impulso21.com',
                img: '/impulso21.jpg',
            },
            card2: {
                type: 'Exhibitors',
                title: 'Feria 21',
                text: 'We were exhibitors of custom software that generated leads for businesses based on industry and location.',
                place: 'Córdoba',
                link: 'https://feria.21.edu.ar',
                linkName: 'Feria.21.edu.ar',
                img: '/feria21.jpg',
            },
            card3: {
                type: 'Training',
                title: 'TV 4.0 Live Event',
                text: 'We were part of a day where science, innovation, and technology were the main themes.',
                place: 'Córdoba Hotel Centenario',
                link: 'https://eldoce.tv/sociedad/tv-4-0-vivo-megaevento-ciencia-innovacion-tecnologia-el-doce_158243/',
                linkName: 'TV 4.0 Canal 12',
                img: '/evento3.jpeg',
            }
        },
    }
    
    return (
        <div>
            <div className="h-[15rem] pt-[4rem] pb-[3rem]  flex items-center justify-center ">
                <p className="text-3xl font-bold sm:text-6xl text-white ">
                    {texts[language].title}
                </p>
            </div>
            <div className=" align-middle ">
                <div className="container   pb-24 mx-auto md:px-6">
                    <section className="mb-32 text-center">
                        <div className="flex justify-center items-center">
                            <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12 ">
                                <AboutMeCard type={texts[language].card1.type} title={texts[language].card1.title} text={texts[language].card1.text} place={texts[language].card1.place} link={texts[language].card1.link} linkName={texts[language].card1.linkName} img={texts[language].card1.img}></AboutMeCard>
                                <AboutMeCard type={texts[language].card2.type} title={texts[language].card2.title} text={texts[language].card2.text} place={texts[language].card2.place} link={texts[language].card2.link} linkName={texts[language].card2.linkName} img={texts[language].card2.img}></AboutMeCard>
                                <AboutMeCard type={texts[language].card3.type} title={texts[language].card3.title} text={texts[language].card3.text} place={texts[language].card3.place} link={texts[language].card3.link} linkName={texts[language].card3.linkName} img={texts[language].card3.img}></AboutMeCard>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
