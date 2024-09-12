import { CardHome } from "./CardHome";

export interface CardHomeProps {
    title: string;
    paragraph: string;
    img: string;
}
export default function () {

    let es = {
        title: 'En Que Nos Diferenciamos',
        card1: {
            title: 'Personalización',
            paragraph: 'Despídete de las soluciones genéricas. En Aspa, creamos estrategias personalizadas que se adaptan a tus necesidades y te ayudan a alcanzar tus objetivos',
            img: 'https://fc-abogados.com/es/wp-content/uploads/2021/12/Diseno-sin-titulo-5.png'
        },
        card2: {
            title: 'Calidad',
            paragraph: 'Más que cumplir, superamos expectativas. Te ofrecemos software y servicios de la más alta calidad, diseñados para impulsar tu éxito.',
            img: 'https://inteligenciaemocionalaplicada.com/wp-content/uploads/2021/03/MASTER-2.png',
        },
        card3: {
            title: 'Orientación al cliente',
            paragraph: 'Tu éxito es nuestro norte. Priorizamos tus necesidades y te brindamos un servicio excepcional que va más allá de lo esperado. Tu satisfacción es nuestro compromiso.',
            img: 'https://lh4.googleusercontent.com/1sCJiMOSRxYGbu6lsYD4y9-G-gSaQ3hckcI35ElV_7jUB1iVuwwP8Adau8U7ea4kRxkyhBgoSLrmw6KUK9MBLmKc_JJwvBQ0DFXkaiyTNB7D9lniM8A5wLyjj-BIm935v1K1gUOY',
        },
    }
    let en = {
        title: 'What Sets Us Apart',
        card1: {
            title: 'Personalization',
            paragraph: 'Say goodbye to generic solutions. At Aspa, we create personalized strategies tailored to your needs, helping you achieve your goals.',
            img: 'https://fc-abogados.com/es/wp-content/uploads/2021/12/Diseno-sin-titulo-5.png'
        },
        card2: {
            title: 'Quality',
            paragraph: 'We don’t just meet expectations, we exceed them. We offer the highest quality software and services designed to drive your success.',
            img: 'https://inteligenciaemocionalaplicada.com/wp-content/uploads/2021/03/MASTER-2.png',
        },
        card3: {
            title: 'Customer Orientation',
            paragraph: 'Your success is our compass. We prioritize your needs and provide exceptional service that goes beyond expectations. Your satisfaction is our commitment.',
            img: 'https://lh4.googleusercontent.com/1sCJiMOSRxYGbu6lsYD4y9-G-gSaQ3hckcI35ElV_7jUB1iVuwwP8Adau8U7ea4kRxkyhBgoSLrmw6KUK9MBLmKc_JJwvBQ0DFXkaiyTNB7D9lniM8A5wLyjj-BIm935v1K1gUOY',
        },
    };

    return (
        <div className="container mx-auto px-4 pt-[15rem] py-[6rem]">
            <div className="container    px-6 pt-7 pb-0 mx-auto sm:pt-0  ">
                <h2 className="text-4xl pt-16  font-semibold text-center  capitalize lg:text-6xl text-white">
                    En Que Nos Diferenciamos
                </h2>

                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
            </div>
            <div className="flex flex-wrap justify-evenly items-center">
                <CardHome title={es.card1.title} paragraph={es.card1.paragraph} img={es.card1.img} ></CardHome>
                <CardHome title={es.card3.title} paragraph={es.card3.paragraph} img={es.card3.img}></CardHome>
                <CardHome title={es.card2.title} paragraph={es.card2.paragraph} img={es.card2.img}></CardHome>
            </div>
        </div>
    );
}
