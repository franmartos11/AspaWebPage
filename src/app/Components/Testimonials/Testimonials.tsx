export default function () {
    return (
        <div>
            <section className="max-w-5xl mx-auto w-full px-10 py-10">
                <div className="flex items-center justify-center flex-col gap-y-2 py-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-md mx-auto text-center text-white">
                        Lo que nuestros 
                        <span className="text-[#3b82f6]"> clientes</span> dicen sobre nosotros
                    </h2>
                    <p className="text-lg font-medium text-slate-400/70">
                        Descubre como nuestro servicio puede ayudarte
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">
                    <div className="border p-7 rounded-xl bg-neutral-950 drop-shadow-md border-neutral-800/50 col-span-2 flex flex-col gap-y-10 justify-between">
                        <div className="flex flex-col gap-y-3.5">
                            <p className="font-bold text-xl text-white">
                            Alineación perfecta con los objetivos, incluso a distancia.
                            </p>
                            <p className="font-medium text-white">
                            ASPA se ha podido alinear con los objetivos de mi proyecto, incluso estando en continentes diferente. Las reuniones y servicios entregados han sido a tiempo y del mejor nivel! Los recomiendo!
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <img
                                src="https://randomuser.me/api/portraits/women/43.jpg"
                                alt="Emily Smith"
                                className="h-10 w-10"
                            />
                            <p className="pt-2 text-sm font-semibold text-white">
                                C. Gonzales
                            </p>
                            <p className="text-sm font-medium text-slate-100/70">
                                Dueno de Charlatanes
                            </p>
                        </div>
                    </div>
                    <div className="border p-7 rounded-xl bg-neutral-950 drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between">
                        <div className="flex flex-col gap-y-3.5">
                            <p className="font-bold text-xl text-white">
                                Excellent product features
                            </p>
                            <p className="font-medium text-white">
                                The features offered by our service are
                                outstanding. They have greatly improved our
                                workflow and efficiency.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <img
                                src="https://randomuser.me/api/portraits/men/34.jpg"
                                alt="Michael Johnson"
                                className="h-10 w-10"
                            />
                            <p className="pt-2 text-sm font-semibold text-white">
                                Michael Johnson
                            </p>
                            <p className="text-sm font-medium text-slate-100/70">
                                CEO at XYZ Corporation
                            </p>
                        </div>
                    </div>
                    <div className="border p-7 rounded-xl bg-neutral-950 drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between">
                        <div className="flex flex-col gap-y-3.5">
                            <p className="font-bold text-xl text-white">
                                Seamless integration process
                            </p>
                            <p className="font-medium text-white">
                                Integrating our systems with our service was
                                smooth and hassle-free. The support team guided
                                us through every step of the process.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <img
                                src="https://randomuser.me/api/portraits/women/71.jpg"
                                alt="Sarah Brown"
                                className="h-10 w-10"
                            />
                            <p className="pt-2 text-sm font-semibold text-white">
                                Sarah Brown
                            </p>
                            <p className="text-sm font-medium text-slate-100/70">
                                CTO at XYZ Corporation
                            </p>
                        </div>
                    </div>
                    <div className="border p-7 rounded-xl bg-neutral-950 drop-shadow-md border-neutral-800/50 col-span-2 flex flex-col gap-y-10 justify-between">
                        <div className="flex flex-col gap-y-3.5">
                            <p className="font-bold text-xl text-white">
                                Eficiencia al trabajar
                            </p>
                            <p className="font-medium text-white">
                            El trabajo de todo ASPA TEAM es eficiente, 
                            a tiempo, organizado y totalmente personalizado,
                             recomiendo ampliamente.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <img
                                src="https://randomuser.me/api/portraits/men/71.jpg"
                                alt="James White"
                                className="h-10 w-10"
                            />
                            <p className="pt-2 text-sm font-semibold text-white">
                            Ignacio Fontaine
                            </p>
                            <p className="text-sm font-medium text-slate-100/70">
                                Cliente Aspa Audit
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
