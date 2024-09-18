import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export default function () {
    const { language, setLanguage } = useLanguage('es');
    const texts = {
        es: {
            title: 'Auditoria',
            subtitle: '¿Estás listo para llevar tu negocio al siguiente nivel? Nuestra App te permite realizar auditorías eficientes y completas.',

            text1: 'Responder auditorías',
            desciption1: 'Permite a los usuarios completar las auditorías asignadas, respondiendo preguntas o seleccionando opciones de un conjunto de ítems predefinidos. Cargar imágenes: Facilita la incorporación de evidencia visual para respaldar los hallazgos de la auditoría, como fotos de instalaciones, documentos o productos defectuosos. Generar planes de acción: Permite crear planes de acción detallados para abordar las no conformidades identificadas en la auditoría, asignando responsabilidades, plazos y recursos. Descargar PDF con la información: Genera un informe en formato PDF que resume los resultados de la auditoría, incluyendo las respuestas, las imágenes adjuntas y los planes de acción establecidos.',
            text2: 'Registrar auditores',
            desciption2: 'Permite crear perfiles de los auditores, incluyendo su nombre, fotografía, información de contacto y datos de capacitación. Auditorías a cargo: Asigna las auditorías pendientes a los auditores responsables, facilitando la organización y seguimiento del trabajo. Planes de acción a cargo: Muestra los planes de acción asignados a cada auditor, permitiéndoles realizar un seguimiento de su progreso y tomar las medidas necesarias para su implementación.',
            text3: 'Registrar auditorías',
            desciption3: 'Define las plantillas o modelos de auditoría que se utilizarán, especificando las preguntas o ítems que se deben responder en cada auditoría. Auditorías reutilizables: Permite crear modelos de auditoría estandarizados que se pueden reutilizar para diferentes áreas o procesos, asegurando la consistencia y eficiencia en las evaluaciones.',
            text4: 'Registrar preguntas',
            desciption4: 'Define las preguntas o ítems específicos que se incluirán en cada modelo de auditoría, permitiendo personalizar las evaluaciones según las necesidades de cada caso.',
            text5: 'Categorizar ítems',
            desciption5: 'Permite organizar las preguntas o ítems en categorías temáticas, facilitando la navegación y el análisis de los resultados de la auditoría.',
            text6: 'Generar informes',
            desciption6: 'Crea reportes personalizados que resumen los datos de las auditorías realizadas, incluyendo indicadores clave como el número de auditorías completadas, las no conformidades identificadas y el avance en la implementación de planes de acción. Filtros y segmentación: Permite filtrar los datos por diferentes criterios, como fecha de auditoría, área auditada, auditor responsable o tipo de no conformidad, para obtener información más específica y relevante. Visualización de datos: Presenta los resultados de las auditorías en gráficos y tablas dinámicas, facilitando la comprensión y el análisis de la información. En conjunto, estos módulos ofrecen una solución integral para la gestión de auditorías internas.',

        },
        en: {
            title: "Audit",
            subtitle: "Ready to take your business to the next level? Our app allows you to conduct efficient and comprehensive audits.",

            text1: 'Conduct Audits',
            desciption1: 'Allows users to complete assigned audits by answering questions or selecting options from a set of predefined items. Upload Images: Facilitates the inclusion of visual evidence to support audit findings, such as photos of facilities, documents, or defective products. Generate Action Plans: Enables the creation of detailed action plans to address non-conformities identified in the audit, assigning responsibilities, deadlines, and resources. Download PDF with Information: Generates a PDF report summarizing the audit results, including responses, attached images, and established action plans.',
            text2: 'Register Auditors',
            desciption2: 'Allows the creation of auditor profiles, including their name, photo, contact information, and training data. Assigned Audits: Assigns pending audits to responsible auditors, facilitating the organization and tracking of work. Assigned Action Plans: Shows the action plans assigned to each auditor, allowing them to track progress and take necessary measures for implementation.',
            text3: 'Register Audits',
            desciption3: 'Defines the templates or audit models to be used, specifying the questions or items to be answered in each audit. Reusable Audits: Allows the creation of standardized audit models that can be reused for different areas or processes, ensuring consistency and efficiency in evaluations.',
            text4: 'Register Questions',
            desciption4: 'Defines the specific questions or items to be included in each audit model, allowing customization of evaluations according to the needs of each case.',
            text5: 'Categorize Items',
            desciption5: 'Allows the organization of questions or items into thematic categories, facilitating navigation and analysis of audit results.',
            text6: 'Generate Reports',
            desciption6: 'Creates customized reports summarizing the data from completed audits, including key indicators such as the number of completed audits, identified non-conformities, and progress in implementing action plans. Filters and Segmentation: Allows filtering data by different criteria, such as audit date, audited area, responsible auditor, or type of non-conformity, to obtain more specific and relevant information. Data Visualization: Presents audit results in dynamic charts and tables, facilitating the understanding and analysis of information. Together, these modules offer a comprehensive solution for managing internal audits.'
        },

    }
    return (
        <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-left text-white sm:text-5xl">
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
                            <br />
                            <h3>{texts[language].text1}</h3>
                            <br />
                            <p>
                                {texts[language].desciption1}
                                <br />
                                <br />
                            </p>
                            <h3>{texts[language].text2}</h3>

                            <p className="mt-6">
                                {texts[language].desciption2}
                                <br />
                                <br />
                            </p>

                            <h2>{texts[language].text3}</h2>

                            <p className="mt-6">
                                {texts[language].desciption3}
                                <br />
                                <br />
                            </p>
                            <h2>{texts[language].text4}</h2>

                            <p className="mt-6">
                                {texts[language].desciption4}
                                <br />
                                <br />
                            </p>
                            <h2>{texts[language].text5}</h2>

                            <p className="mt-6">
                                {texts[language].desciption5}
                                <br />
                                <br />
                            </p>
                            <h2>{texts[language].text6}</h2>

                            <p className="mt-6">
                                {texts[language].desciption6}
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
