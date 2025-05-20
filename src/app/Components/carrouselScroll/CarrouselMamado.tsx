import Link from "next/link";
import Image from "next/image";

export default function CarrouselMamado() {
  return (
    <section className="">
      <div className="h-[37rem] ">
        <div className="container    px-6 pt-7 pb-0 mx-auto sm:pt-0 sm:pb-12 ">
          <h1 className="text-4xl pt-16  font-semibold text-center  capitalize lg:text-6xl text-white">
            Nuestros Servicios
          </h1>

          <div className="flex justify-center mx-auto mt-6">
            <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="container px-6 mx-auto -mt-72 sm:-mt-80 md:-mt-96">
        <div className="grid grid-cols-1 gap-8 mt-0 xl:mt-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
            <Image
              className="object-cover w-full rounded-sm aspect-square"
              src="/amedida.jpg"
              alt="apps a medida"
              title="apps a medida"
              width={2000}
              height={2000}
            ></Image>

            <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
              Aplicaciones a medida
            </h1>

            <p className="mt-2   text-gray-300 text-center">
              Desarrollamos la aplicación que necesites, con los mejores tiempos
              de entrega.
            </p>

            <div className="flex mt-3 -mx-2"></div>
          </div>

          <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
            <Image
              className="object-cover w-full rounded-sm aspect-square"
              src="/desarrollado.jpg"
              alt="apps disenadas"
              title="apps disenadas"
              width={2000}
              height={2000}
            ></Image>

            <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
              Aplicaciones Disenadas
            </h1>

            <p className="mt-2 text-gray-300 text-center">
              Disponemos de aplicaciones desarrolladas para que implementes en
              tu empresa.
            </p>

            <div className="flex mt-3 -mx-2"></div>
          </div>

          <div className="flex flex-col items-center p-4 border sm:p-6 rounded-sm dark:border-gray-700">
            <Image
              className="object-cover w-full rounded-sm aspect-square"
              src="/webdevelopment.webp"
              alt="desarrollo web"
              title="desarrollo web"
              width={2000}
              height={2000}
            ></Image>

            <h1 className="mt-4 text-2xl font-semibold text-white">
              Desarrollo Web
            </h1>

            <p className="mt-2 text-gray-300 text-center">
              Desarrollamos webs para tu empresa, con los mejores tiempos de
              entrega.
            </p>

            <div className="flex mt-3 -mx-2"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-8 pt-8 ">
        <Link
          href="/servicios"
          className="inline-block rounded bg-blue-500 px-[4rem] py-3 text-sm font-medium text-white transition hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Conocer Mas
        </Link>
      </div>
    </section>
  );
}
