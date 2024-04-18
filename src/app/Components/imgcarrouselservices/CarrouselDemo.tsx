import { List } from "postcss/lib/list"
import Carousel from "./Carrousel"

interface CarrouselDemoProps{
    slides: string[];
}

export default function ({slides}: CarrouselDemoProps) {
    let imgs = slides
  return (
    <div className="flex justify-center px-[3rem] pb-[10rem] items-center  bg-black">
      <div className="max-w-lg">
        <Carousel autoSlide={true} >
          {[...imgs.map((s: string | undefined) => (
            <img src={s} />
          )), ]}
        </Carousel>

      </div>
    </div>
  )
}

