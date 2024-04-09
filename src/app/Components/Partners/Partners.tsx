export default function () {
    return (
        <section className="py-24 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <span className="text-blue-600 text-center font-medium mb-4 block">
                        Nuestros Clientes
                    </span>
                    <h1 className="text-4xl text-white text-center font-bold">
                        Quienes confian en nosotros
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2  xl:grid-cols-4">
                    <a
                        href="https://www.matrimonios.cl/animacion-de-eventos/charlatanes--e132277"
                        className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img src="/Charlatanes_Prod_Logo.png" alt="logo" className=" h-[13rem]" />
                    </a>
                    <a
                        href="https://www.facebook.com/Inaebnitautomotriz/?locale=es_LA"
                        className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img src="/In_Aebnit_logo.png" alt="logo" className=" h-[13rem]" />
                    </a>
                    <a
                        href="https://alfonsolozita.com"
                        className="flex justify-center items-center border border-solid border-gray-200  shadow-sm h-24 rounded-2xl"
                    >
                        <img src="/alfonsoLogo.png" alt="logo" className="" />
                    </a>
                    <a
                        href="https://www.facebook.com/CarRefinishesKolor/?locale=es_LA"
                        className="flex justify-center  items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                    >
                        <img
                            src="/Car_Refinishes_Logo.png"
                            alt="logo"
                            className=" h-[11rem]"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
