'use client'
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
export default function CardProyect() {
    const { language, setLanguage } = useLanguage('es');
    const texts = {
        es: {
            title: 'CarCheck',
            subtitle: 'Nuestra aplicación personalizada te permite gestionar tu taller de forma integral, optimizando tu tiempo y maximizando tu rentabilidad.',
            text1: 'Gestionar clientes',
            desciption1: 'La app te ayuda a organizar y gestionar la información de tus clientes, mejorar la atención al cliente y optimizar tu negocio. Crea perfiles completos con toda la información de tus clientes, accede a su historial en tiempo real y ofrece un servicio personalizado. Contacta a tus clientes directamente desde la app y mantén una comunicación fluida. Descarga mi app hoy mismo y comienza a disfrutar de sus beneficios.',
            text2: 'Administrar vehículos',
            desciption2: 'El proceso de registro y actualización de información de vehículos es fundamental para mantener un control preciso de la flota automotriz. Esto implica almacenar detalles como marca, modelo, matrícula, kilometraje e incluso un historial detallado de servicios. Además, la capacidad de capturar imágenes del vehículo en el momento del ingreso proporciona una documentación visual invaluable, permitiendo una identificación rápida y precisa del estado del vehículo en diferentes momentos. Esta combinación de datos y imágenes facilita la gestión eficiente de la flota, asegurando un mantenimiento adecuado y una toma de decisiones informada.',
            text3: 'Crear y gestionar ordenes de trabajo',
            desciption3: 'Digitaliza tus procesos: Genera ordenes de trabajo personalizadas con detalles del vehículo, cliente, servicio solicitado, presupuesto, fecha y hora de la visita, etc. Agiliza la reparación: Asigna tareas a los mecánicos, rastrea el progreso de las reparaciones y notifica al cliente sobre el estado del trabajo. Mejora la comunicación: Mantén al cliente informado sobre el avance de la reparación, envía fotos y videos del proceso, y ofrece un servicio transparente. Registro del trabajo realizado: permite al personal del taller registrar los trabajos realizados en el vehículo, incluir una lista de tareas, repuestos utilizados y horas trabajadas. Carga de imágenes: Permite al personal del taller adjuntar fotografías del vehículo, del trabajo realizado o de cualquier otra evidencia relevante.',
            text4: 'Elaborar presupuestos y facturas',
            desciption4: 'Personaliza presupuestos con el desglose de mano de obra, repuestos, costos adicionales e impuestos. Envía presupuestos electrónicos: Comparte los presupuestos con los clientes por correo electrónico o WhatsApp para su aprobación rápida. Emite facturas digitales: Genera y envía facturas electrónicas con validez legal, mejorando la eficiencia administrativa',
            text5: 'Digitaliza tus procesos',
            desciption5: 'Genera ordenes de trabajo personalizadas con detalles del vehículo, cliente, servicio solicitado, presupuesto, fecha y hora de la visita, etc. Agiliza la reparación: Asigna tareas a los mecánicos, rastrea el progreso de las reparaciones y notifica al cliente sobre el estado del trabajo. Mejora la comunicación: Mantén al cliente informado sobre el avance de la reparación, envía fotos y videos del proceso, y ofrece un servicio transparente. Registro del trabajo realizado: permite al personal del taller registrar los trabajos realizados en el vehículo, incluir una lista de tareas, repuestos imágenes: Permite al personal del taller adjuntar fotografías del vehículo, del trabajo realizado o de cualquier otra evidencia relevante.',

        },
        en: {
            title: 'CarCheck',
            subtitle: 'Our custom application allows you to manage your workshop comprehensively, optimizing your time and maximizing your profitability.',
            text1: 'Manage Clients',
            desciption1: 'Our app helps you organize and manage client information, improve customer service, and optimize your business. Create complete profiles with all your clients\' information, access their history in real-time, and offer personalized service. Contact your clients directly from the app and maintain smooth communication. Download our app today and start enjoying its benefits.',
            text2: 'Manage Vehicles',
            desciption2: 'The process of registering and updating vehicle information is essential for maintaining precise control of the automotive fleet. This involves storing details such as make, model, license plate, mileage, and even a detailed service history. Additionally, the ability to capture images of the vehicle upon entry provides invaluable visual documentation, allowing for quick and accurate identification of the vehicle\'s condition at different times. This combination of data and images facilitates efficient fleet management, ensuring proper maintenance and informed decision-making.',
            text3: 'Create and Manage Work Orders',
            desciption3: 'Digitize your processes: Generate personalized work orders with details of the vehicle, client, requested service, budget, date, and time of the visit, etc. Streamline repairs: Assign tasks to mechanics, track repair progress, and notify the client about the job status. Improve communication: Keep the client informed about the repair progress, send photos and videos of the process, and offer transparent service. Record the work done: Allow workshop staff to record the work done on the vehicle, including a list of tasks, parts used, and hours worked. Image upload: Allow workshop staff to attach photos of the vehicle, the work done, or any other relevant evidence.',
            text4: 'Prepare Estimates and Invoices',
            desciption4: 'Customize estimates with a breakdown of labor, parts, additional costs, and taxes. Send electronic estimates: Share estimates with clients via email or WhatsApp for quick approval. Issue digital invoices: Generate and send electronic invoices with legal validity, improving administrative efficiency.',
            text5: 'Digitize Your Processes',
            desciption5: 'Generate personalized work orders with details of the vehicle, client, requested service, budget, date, and time of the visit, etc. Streamline repairs: Assign tasks to mechanics, track repair progress, and notify the client about the job status. Improve communication: Keep the client informed about the repair progress, send photos and videos of the process, and offer transparent service. Record the work done: Allow workshop staff to record the work done on the vehicle, including a list of tasks, parts used, and hours worked. Image upload: Allow workshop staff to attach photos of the vehicle, the work done, or any other relevant evidence.',
        },

    }
    return (
        <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                {texts[language].title}
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                {texts[language].subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <div className="flex justify-center">
                        <Image
                            className="max-w-[48rem] w-full rounded-xl bg-gray-400 shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
                            src="/carcheck.webp"
                            alt="carcheck"
                            title="carcheck"
                            width={612}
                            height={612}
                        ></Image>
                    </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-200 lg:max-w-lg">


                            <h3 className="text-2xl">{texts[language].text1}</h3>
                            <br />
                            <p>
                                {texts[language].desciption1}
                                <br />
                                <br />
                            </p>

                            <h3 className="text-2xl">{texts[language].text2}</h3>

                            <p className="mt-6">
                                {texts[language].desciption2}
                                <br />
                                <br />
                            </p>

                            <h2 className="text-2xl">{texts[language].text3}</h2>

                            <p className="mt-6">
                                {texts[language].desciption3}
                                <br />
                                <br />
                            </p>

                            <h2 className="text-2xl">{texts[language].text4}</h2>

                            <p className="mt-6">
                                {texts[language].desciption4}
                                <br />
                                <br />
                            </p>

                            <h2 className="text-2xl">{texts[language].text5}</h2>

                            <p className="mt-6">
                                {texts[language].desciption5}
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
