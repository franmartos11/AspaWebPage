import Image from "next/image";

export default function () {
    return (
        <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-left text-white sm:text-5xl">
                                Auditorias
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-gray-100">
                                ¿Estás listo para llevar tu negocio al siguiente
                                nivel con una app a medida? Contacta con
                                nosotros y te ayudaremos a crear una app que
                                cumpla con tus necesidades y te impulse hacia el
                                éxito.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <div className="flex justify-center">
                        <Image
                            className="max-w-[48rem] w-full rounded-xl bg-gray-400 shadow-xl ring-1 ring-gray-400/10 sm:max-w-[57rem]"
                            src="/apps-a-medida-3.jpg"
                            alt="apps a medida"
                            title="apps a medida"
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
                            <h3>Soluciones personalizadas</h3>
                            <br />
                            <p>
                                Olvídate de las limitaciones de las apps
                                genéricas. Con una app a medida, obtienes una
                                solución que se adapta perfectamente a las
                                necesidades específicas de tu negocio y a los
                                flujos de trabajo de tus empleados.
                                <br />
                                <br />
                            </p>
                            <h3>Eficiencia y productividad</h3>

                            <p className="mt-6">
                                Una app a medida puede automatizar tareas
                                repetitivas, optimizar procesos y eliminar la
                                necesidad de personal para ciertas actividades.
                                Esto te permite ahorrar tiempo y dinero, y
                                aumentar la productividad de tu equipo.
                                <br />
                                <br />
                            </p>

                            <h2>Mayor satisfacción del cliente</h2>

                            <p className="mt-6">
                                Una app intuitiva, fácil de usar y que ofrece
                                una experiencia personalizada a tus clientes,
                                aumenta su satisfacción y fidelización.
                                <br />
                                <br />
                            </p>
                            <h2>Ventaja competitiva</h2>

                            <p className="mt-6">
                                En un mercado cada vez más competitivo, una app
                                a medida te permite diferenciarte de tus
                                competidores y ofrecer un valor único a tus
                                clientes.
                                <br />
                                <br />
                            </p>
                            <h2>Escalabilidad</h2>

                            <p className="mt-6">
                                A medida que tu negocio crece, tu app a medida
                                también puede crecer contigo. Se adapta a tus
                                necesidades cambiantes y te permite seguir
                                ofreciendo una experiencia de usuario
                                excepcional.
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
