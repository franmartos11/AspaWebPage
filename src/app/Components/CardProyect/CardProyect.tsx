import Image from "next/image";
export default function CardProyect() {
    return (
        <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                                CarCheck
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                Olvídate de los procesos manuales y las
                                herramientas desorganizadas. Nuestra aplicación
                                personalizada te permite gestionar tu taller de
                                forma integral, optimizando tu tiempo y
                                maximizando tu rentabilidad.
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
                            <h2 className="text-2xl">
                                Con nuestra aplicación podrás:
                            </h2>
                            <br />
                            <h3>Gestionar clientes</h3>
                            <br />
                            <p>
                                La app te ayuda a organizar y gestionar la
                                información de tus clientes, mejorar la atención
                                al cliente y optimizar tu negocio. Crea perfiles
                                completos con toda la información de tus
                                clientes, accede a su historial en tiempo real y
                                ofrece un servicio personalizado. Contacta a tus
                                clientes directamente desde la app y mantén una
                                comunicación fluida. Descarga mi app hoy mismo y
                                comienza a disfrutar de sus beneficios.
                                <br />
                                <br />
                            </p>
                            <h3>Administrar vehículos</h3>

                            <p className="mt-6">
                                El proceso de registro y actualización de
                                información de vehículos es fundamental para
                                mantener un control preciso de la flota
                                automotriz. Esto implica almacenar detalles como
                                marca, modelo, matrícula, kilometraje e incluso
                                un historial detallado de servicios. Además, la
                                capacidad de capturar imágenes del vehículo en
                                el momento del ingreso proporciona una
                                documentación visual invaluable, permitiendo una
                                identificación rápida y precisa del estado del
                                vehículo en diferentes momentos. Esta
                                combinación de datos y imágenes facilita la
                                gestión eficiente de la flota, asegurando un
                                mantenimiento adecuado y una toma de decisiones
                                informada.
                                <br />
                                <br />
                            </p>

                            <h2>Crear y gestionar ordenes de trabajo</h2>

                            <p className="mt-6">
                                Digitaliza tus procesos: Genera ordenes de
                                trabajo personalizadas con detalles del
                                vehículo, cliente, servicio solicitado,
                                presupuesto, fecha y hora de la visita, etc.
                                Agiliza la reparación: Asigna tareas a los
                                mecánicos, rastrea el progreso de las
                                reparaciones y notifica al cliente sobre el
                                estado del trabajo. Mejora la comunicación:
                                Mantén al cliente informado sobre el avance de
                                la reparación, envía fotos y videos del proceso,
                                y ofrece un servicio transparente. Registro del
                                trabajo realizado: permite al personal del
                                taller registrar los trabajos realizados en el
                                vehículo, incluir una lista de tareas, repuestos
                                utilizados y horas trabajadas. Carga de
                                imágenes: Permite al personal del taller
                                adjuntar fotografías del vehículo, del trabajo
                                realizado o de cualquier otra evidencia
                                relevante.
                                <br />
                                <br />
                            </p>
                            <h2> Elaborar presupuestos y facturas</h2>

                            <p className="mt-6">
                                Personaliza presupuestos con el desglose de mano
                                de obra, repuestos, costos adicionales e
                                impuestos. Envía presupuestos electrónicos:
                                Comparte los presupuestos con los clientes por
                                correo electrónico o WhatsApp para su aprobación
                                rápida. Emite facturas digitales: Genera y envía
                                facturas electrónicas con validez legal,
                                mejorando la eficiencia administrativa
                                <br />
                                <br />
                            </p>
                            <h2>Digitaliza tus procesos</h2>

                            <p className="mt-6">
                                Genera ordenes de trabajo personalizadas con
                                detalles del vehículo, cliente, servicio
                                solicitado, presupuesto, fecha y hora de la
                                visita, etc. Agiliza la reparación: Asigna
                                tareas a los mecánicos, rastrea el progreso de
                                las reparaciones y notifica al cliente sobre el
                                estado del trabajo. Mejora la comunicación:
                                Mantén al cliente informado sobre el avance de
                                la reparación, envía fotos y videos del proceso,
                                y ofrece un servicio transparente. Registro del
                                trabajo realizado: permite al personal del
                                taller registrar los trabajos realizados en el
                                vehículo, incluir una lista de tareas, repuestos
                                utilizados y horas trabajadas. Carga de
                                imágenes: Permite al personal del taller
                                adjuntar fotografías del vehículo, del trabajo
                                realizado o de cualquier otra evidencia
                                relevante.
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
