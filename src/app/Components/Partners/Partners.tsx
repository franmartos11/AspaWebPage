export default function () {
    return (
        <section className="py-24 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <h2 className="text-blue-600 text-center font-medium mb-4 block">
                        Nuestros Clientes
                    </h2>
                    <h3 className="text-4xl text-white text-center font-bold">
                        Quienes confian en nosotros
                    </h3>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2  xl:grid-cols-4">
                    <a
                        title="link"
                        target="_blank"
                        href="https://www.instagram.com/charlatanes.prod/"
                        className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/charlatanes-logo.png"
                            alt="logo"
                            title="logo"
                            className=" h-[4rem]"
                        />
                    </a>
                    <a
                        title="link"
                        target="_blank"
                        href="https://www.facebook.com/Inaebnitautomotriz/?locale=es_LA"
                        className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/In_Aebnit_logo.png"
                            alt="logo"
                            title="logo"
                            className=" h-[13rem]"
                        />
                    </a>
                    <a
                        title="link"
                        target="_blank"
                        href="https://alfonsolozita.com"
                        className="flex justify-center items-center border border-solid border-gray-200  shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/alfonso-logo.png"
                            alt="logo"
                            title="logo"
                            className=" h-[4.4rem]"
                        />
                    </a>
                    <a
                        title="link"
                        target="_blank"
                        href="https://www.facebook.com/CarRefinishesKolor/?locale=es_LA"
                        className="flex justify-center  items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/Car_Refinishes_Logo.png"
                            alt="logo"
                            title="logo"
                            className=" h-[11rem]"
                        />
                    </a>
                    <a
                        title="link"
                        target="_blank"
                        href="https://www.instagram.com/m.nortebosch/?hl=es"
                        className="flex justify-center  items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/servicios-norte-logo.png"
                            title="logo"
                            alt="logo"
                            className=" h-[5rem]"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
