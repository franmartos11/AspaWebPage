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
                            alt=""
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
                                Crea y actualiza perfiles de clientes: Almacena
                                información completa, historial de vehículos y
                                servicios, preferencias de contacto, y más.
                                Agiliza la atención al cliente: Accede a la
                                información del cliente en tiempo real, consulta
                                su historial y preferencias, y ofrece un
                                servicio personalizado. Fideliza a tus clientes:
                                Implementa programas de fidelización, envía
                                recordatorios de citas y ofertas personalizadas,
                                y mejora la satisfacción de tus clientes.
                                <br />
                                <br />
                            </p>
                            <h3>Administrar vehículos</h3>
                            
                            <p className="mt-6">
                                Registra y actualiza información de vehículos:
                                Almacena datos como marca, modelo, matrícula,
                                kilometraje, VIN, historial de servicios y más.
                                Programa citas y gestiona la agenda: Visualiza
                                la disponibilidad del taller, asigna citas a los
                                mecánicos y envía recordatorios automáticos a
                                los clientes. Optimiza el control de stock:
                                Monitorea el inventario de repuestos, recibe
                                alertas de bajo stock y agiliza la gestión de
                                pedidos.
                                <br />
                                <br />
                            </p>

                            <h2>Crear y gestionar ordenes de trabajo</h2>
                            
                            <p className="mt-6">
                                Digitaliza tus procesos: Genera ordenes de
                                trabajo personalizadas con detalles del
                                vehículo, cliente, servicio solicitado,
                                presupuesto y fecha de entrega. Agiliza la
                                reparación: Asigna tareas a los mecánicos,
                                rastrea el progreso de las reparaciones y
                                notifica al cliente sobre el estado del trabajo.
                                Mejora la comunicación: Mantén al cliente
                                informado sobre el avance de la reparación,
                                envía fotos y videos del proceso, y ofrece un
                                servicio transparente.
                                <br />
                                <br />
                            </p>
                            <h2> Elaborar presupuestos y facturas</h2>
                            
                            <p className="mt-6">
                                Genera presupuestos detallados: Personaliza
                                presupuestos con el desglose de mano de obra,
                                repuestos, costos adicionales e impuestos. Envía
                                presupuestos electrónicos: Comparte los
                                presupuestos con los clientes por correo
                                electrónico o WhatsApp para su aprobación
                                rápida. Emite facturas digitales: Genera y envía
                                facturas electrónicas con validez legal,
                                mejorando la eficiencia administrativa
                                <br />
                                <br />
                            </p>
                            <h2>Personalización a tu medida</h2>
                            
                            <p className="mt-6">
                                Adapta la aplicación a las necesidades de tu
                                taller: Configura campos, permisos, flujos de
                                trabajo, informes y notificaciones para
                                optimizar tu operación. Integra tu marca:
                                Personaliza la interfaz con tu logo, colores y
                                diseño para ofrecer una experiencia única a tus
                                clientes. Escalabilidad: Adapta la aplicación al
                                tamaño y crecimiento de tu taller, con planes
                                flexibles que se ajustan a tus necesidades.
                                <br />
                                <br />
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
