import Image from "next/image";
export default function CardProyectImgGrid() {
  return (
    <div className="flex items-center justify-center ">
      <div className="container px-5 py-0 lg:px-32 lg:pt-0 lg:pb-[8rem]">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/slider-img-e1690579354218.jpg"
                width={612}
                height={612}
              ></Image>
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2024/01/lote-13-1-scaled-800x533.jpg"
                width={612}
                height={612}
              ></Image>
            </div>

            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/laguna.jpg"
                width={612}
                height={612}
              ></Image>
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/atardeceres.png"
                width={612}
                height={612}
              ></Image>
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/pinares-e1690579305107.jpg"
                width={612}
                height={612}
              ></Image>
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                title="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://dosarroyoseldurazno.com.ar/wp-content/uploads/2023/03/arroyos.jpg"
                width={612}
                height={612}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
