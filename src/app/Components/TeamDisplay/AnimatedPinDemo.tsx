"use client";
import React from "react";
import { PinContainer } from "./PinContainer";


export function AnimatedPinDemo() {
  return (
<div className="flex flex-col align-middle justify-center text-center ">
    <h3 className="text-5xl font-bold">Nuestro Equipo</h3>
    <div className="flex">
    <div className="h-[40rem] w-full flex items-center justify-center ">
      <PinContainer
        title="www.linkedin.com/in/agustin-luque"
        href="www.linkedin.com/in/agustin-luque"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Agustin Luque
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Encargado de Marqueting
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 justify-center align-middle">
            <img src="https://media.licdn.com/dms/image/C5603AQGlTwZFpZBfJw/profile-displayphoto-shrink_100_100/0/1657810751693?e=1716422400&v=beta&t=CKtK5BJ08Mbrr46_KE_ErF0rp2vJPG35qyxduj94YMk"></img>
          </div>
        </div>
      </PinContainer>
    </div>

    <div className="h-[40rem] w-full flex items-center justify-center ">
      <PinContainer
        title="www.linkedin.com/in/agustin-luque"
        href="www.linkedin.com/in/agustin-luque"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Francisco Martos
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Cto
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 justify-center align-middle">
            <img src="https://media.licdn.com/dms/image/C4D03AQH0aFGTgJ5oIw/profile-displayphoto-shrink_400_400/0/1651499247817?e=1716422400&v=beta&t=qz5NUaV_QPS-gWOMa8JbTd66F9oLNlO8qmz-Jd6DSmM"></img>
          </div>
        </div>
      </PinContainer>
    </div>

    <div className="h-[40rem] w-full flex items-center justify-center ">
      <PinContainer
        title="www.linkedin.com/in/agustin-luque"
        href="www.linkedin.com/in/agustin-luque"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Haik kilic
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              El lindo
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 justify-center align-middle">
            <img src="https://media.licdn.com/dms/image/C4D03AQHn8uNxGpHhYA/profile-displayphoto-shrink_400_400/0/1650166774598?e=1716422400&v=beta&t=DlnalWBwibYTQzXsT1uvMPQe2j0Pwet2WuAJOvCg3rE"></img>
          </div>
        </div>
      </PinContainer>
    </div>


    </div>

    </div>
  );
}
