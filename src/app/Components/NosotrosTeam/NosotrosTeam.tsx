"use client";
import { useState } from "react";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export default function () {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const { language } = useLanguage("es");
  // estan los estados en folsa para cancelar la animacion on hover
  const texts = {
    es: {
      op1: "Nuestro Equipo",
      op2: "No somos solo una empresa, somos un equipo apasionado por lo que hacemos.",
    },
    en: {
      op1: "Our Team",
      op2: "We are not just a company, we are a team passionate about what we do.",
    },
  };

  return (
    <div className="pt-[5rem]">
      <div className="flex flex-wrap mb-5 justify-center text-center">
        <div className="w-full lg:w-6/12 px-4">
          <div className="container px-6 pt-7 pb-0 mx-auto sm:pt-0">
            <h2 className="text-4xl font-semibold text-center capitalize lg:text-6xl text-white">
              {texts[language].op1}
            </h2>
            <div className="flex justify-center mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>
          <p className="text-gray-400 text-lg font-light pt-[1rem]">
            {texts[language].op2}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pb-[10rem]">
        <div className="container max-w-7xl px-4">
          <div className="flex flex-wrap justify-center pt-[2rem] gap-8">
            {/* Francisco */}
            <div className="w-full md:w-5/12 lg:w-4/12 px-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.linkedin.com/in/francisco-martos-7a8850226/"
                  title="link"
                >
                  <img
                    className="object-cover w-[25rem] h-[27rem] rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                    alt="persona img"
                    title="persona img"
                    src={hovered1 ? "/franPjAspa.png" : "/fran.jpeg"}
                    onMouseEnter={() => setHovered1(false)}
                    onMouseLeave={() => setHovered1(false)}
                  />
                </a>
                <div className="text-center mt-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Francisco Martos</h3>
                  <div className="font-light mb-2">CTO</div>
                  <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="https://www.linkedin.com/in/francisco-martos-7a8850226/"
                      title="link"
                      className="flex rounded-full justify-center hover:bg-blue-600 pt-2 h-10 w-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 30 30"
                        fill="currentColor"
                        className="h-6"
                      >
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Haik */}
            <div className="w-full md:w-5/12 lg:w-4/12 px-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.linkedin.com/in/haik-kilic/?originalSubdomain=ar"
                  title="link"
                >
                  <img
                    className="object-cover w-[25rem] h-[27rem] rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                    alt="persona img"
                    title="persona img"
                    src={hovered2 ? "/haikPjAspa.png" : "/haik.jpeg"}
                    onMouseEnter={() => setHovered2(false)}
                    onMouseLeave={() => setHovered2(false)}
                  />
                </a>
                <div className="text-center mt-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Haik Kilic</h3>
                  <div className="font-light mb-2">CEO</div>
                  <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="https://www.linkedin.com/in/haik-kilic/?originalSubdomain=ar"
                      title="link"
                      className="flex rounded-full justify-center hover:bg-blue-600 pt-2 h-10 w-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 30 30"
                        fill="currentColor"
                        className="h-6"
                      >
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
