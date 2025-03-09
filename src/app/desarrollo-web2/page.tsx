'use client'
import CardProyectWeb from "../Components/CardProyect/CardProyectWebs";
import Form from "../Components/Forms/Form";
import { BentoGridDemo } from "../Components/Grid/BentoGridDemo";
import { MacbookScrollDemo } from "../Components/MackBookScroll/MacbookScrollDemo";
import MoovingLogos from "../Components/MoovingLogos/MoovingLogos";
import Nav from "../Components/nav/Nav";
import { BentoGrid2 } from "./BentoGrid2/BentoGrid2";
import { CarouselDemo } from "./carrousel/carrouselDemo";
import { GlowingEffect } from "./GlowingEffectCards/GlowingEffect";
import { GlowingEffectDemo } from "./GlowingEffectCards/GlowingEffectDemo";
import { WorldMapDemo } from "./WorldMap/WorldMapDemo";

export default function () {
   
    
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <MacbookScrollDemo></MacbookScrollDemo>
            <WorldMapDemo></WorldMapDemo>
            <CarouselDemo></CarouselDemo>
            <BentoGrid2></BentoGrid2>
            
            
            <Form service="Pag-web"></Form>
        </div>
    )

}