import Image from "next/image";

export default function CarrouselMamado() {
    return (
        <section className="">
            <div className="h-[20rem]">
                
            </div>
            <div className="container px-6 mx-auto -mt-72 sm:-mt-80 md:-mt-96">
                <div className="grid grid-cols-1 gap-8 mt-0 xl:mt-1 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
                        <Image
                            className="object-cover w-full rounded-sm aspect-square"
                            src="/amedida.jpg"
                            alt=""
                            width={2000}
                            height={2000}
                        ></Image>
                        <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                            Aplicaciones a medida
                        </h1>
                        <p className="mt-2   text-gray-300 text-center">
                            Desarrollamos la aplicación que necesites, con los mejores tiempos de entrega. 
                        </p>
                        <div className="flex mt-3 -mx-2">
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
                        <Image
                            className="object-cover w-full rounded-sm aspect-square"
                            src="/desarrollado.jpg"
                            alt=""
                            width={2000}
                            height={2000}
                        ></Image>

                        <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                            Aplicaciones Disenadas
                        </h1>

                        <p className="mt-2 text-gray-300 text-center">
                            Disponemos de aplicaciones desarrolladas para que implementes en tu empresa.
                        </p>

                        <div className="flex mt-3 -mx-2">
                            
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
                        <Image
                            className="object-cover w-full rounded-sm aspect-square"
                            src="/webdevelopment.webp"
                            alt=""
                            width={2000}
                            height={2000}
                        ></Image>

                        <h1 className="mt-4 text-2xl font-semibold text-white">
                            Desarrollo  Web
                        </h1>

                        <p className="mt-2 text-gray-300 text-center">
                            Desarrollamos webs para tu empresa, con los mejores tiempos de entrega.
                        </p>

                        <div className="flex mt-3 -mx-2">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}