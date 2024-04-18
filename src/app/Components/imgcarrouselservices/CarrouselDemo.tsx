import Carousel from "./Carrousel"


const slides = [
  "/carcheck.png",
  "/carcheck.png",
  "/carcheck.png",
  "/carcheck.png",
]


export default function () {

  return (
    <div className="flex justify-center px-[3rem] pb-[10rem] items-center  bg-black">
      <div className="max-w-lg">
        <Carousel autoSlide={true} >
          {[...slides.map((s) => (
            <img src={s} />
          )), ]}
        </Carousel>

      </div>
    </div>
  )
}

