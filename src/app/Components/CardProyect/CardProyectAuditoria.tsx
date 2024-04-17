import Image from "next/image";

export default function () {
    return (
        <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-left text-white sm:text-5xl">
                               Audit 
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                ¿Estás listo para llevar tu negocio al siguiente
                                nivel? Nuestra App te permite realizar
                                auditorías eficientes y completas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <div className="flex justify-center">
                        <Image
                            className="max-w-[48rem] w-full rounded-xl bg-gray-400 shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
                            src="/auditoria.jpeg"
                            alt="auditorias"
                            title="auditorias"
                            width={812}
                            height={812}
                        ></Image>
                    </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-200 lg:max-w-lg">
                            <h2 className="text-2xl">
                                Porque necesitas aplicaciones a medida:
                            </h2>
                            <br />
                            <h3>Responder auditorías</h3>
                            <br />
                            <p>
                                Permite a los usuarios completar las auditorías
                                asignadas, respondiendo preguntas o
                                seleccionando opciones de un conjunto de ítems
                                predefinidos. Cargar imágenes: Facilita la
                                incorporación de evidencia visual para respaldar
                                los hallazgos de la auditoría, como fotos de
                                instalaciones, documentos o productos
                                defectuosos. Generar planes de acción: Permite
                                crear planes de acción detallados para abordar
                                las no conformidades identificadas en la
                                auditoría, asignando responsabilidades, plazos y
                                recursos. Descargar PDF con la información:
                                Genera un informe en formato PDF que resume los
                                resultados de la auditoría, incluyendo las
                                respuestas, las imágenes adjuntas y los planes
                                de acción establecidos.
                                <br />
                                <br />
                            </p>
                            <h3>Registrar auditores</h3>

                            <p className="mt-6">
                                Permite crear perfiles de los auditores,
                                incluyendo su nombre, fotografía, información de
                                contacto y datos de capacitación. Auditorías a
                                cargo: Asigna las auditorías pendientes a los
                                auditores responsables, facilitando la
                                organización y seguimiento del trabajo. Planes
                                de acción a cargo: Muestra los planes de acción
                                asignados a cada auditor, permitiéndoles
                                realizar un seguimiento de su progreso y tomar
                                las medidas necesarias para su implementación.
                                <br />
                                <br />
                            </p>

                            <h2>Registrar auditorías</h2>

                            <p className="mt-6">
                                Define las plantillas o modelos de auditoría que
                                se utilizarán, especificando las preguntas o
                                ítems que se deben responder en cada auditoría.
                                Auditorías reutilizables: Permite crear modelos
                                de auditoría estandarizados que se pueden
                                reutilizar para diferentes áreas o procesos,
                                asegurando la consistencia y eficiencia en las
                                evaluaciones.
                                <br />
                                <br />
                            </p>
                            <h2>Registrar preguntas</h2>

                            <p className="mt-6">
                                Define las preguntas o ítems específicos que se
                                incluirán en cada modelo de auditoría,
                                permitiendo personalizar las evaluaciones según
                                las necesidades de cada caso.
                                <br />
                                <br />
                            </p>
                            <h2>Categorizar ítems</h2>

                            <p className="mt-6">
                                Permite organizar las preguntas o ítems en
                                categorías temáticas, facilitando la navegación
                                y el análisis de los resultados de la auditoría.
                                <br />
                                <br />
                            </p>
                            <h2>Generar informes</h2>

                            <p className="mt-6">
                                Crea reportes personalizados que resumen los
                                datos de las auditorías realizadas, incluyendo
                                indicadores clave como el número de auditorías
                                completadas, las no conformidades identificadas
                                y el avance en la implementación de planes de
                                acción. Filtros y segmentación: Permite filtrar
                                los datos por diferentes criterios, como fecha
                                de auditoría, área auditada, auditor responsable
                                o tipo de no conformidad, para obtener
                                información más específica y relevante.
                                Visualización de datos: Presenta los resultados
                                de las auditorías en gráficos y tablas
                                dinámicas, facilitando la comprensión y el
                                análisis de la información. En conjunto, estos
                                módulos ofrecen una solución integral para la
                                gestión de auditorías internas, permitiendo a
                                las organizaciones:
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
