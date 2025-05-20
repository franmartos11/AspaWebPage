"use client";
import Form from "../Components/Forms/Form";
import { MacbookScrollDemo } from "../Components/MackBookScroll/MacbookScrollDemo";
import Nav from "../Components/nav/Nav";
import { BentoGrid2 } from "./BentoGrid2/BentoGrid2";
import { CarouselDemo } from "./carrousel/carrouselDemo";
import { WorldMapDemo } from "./WorldMap/WorldMapDemo";

export default function () {
  return (
    <div>
      <Nav page={"servicios"}></Nav>
      <MacbookScrollDemo></MacbookScrollDemo>
      <BentoGrid2></BentoGrid2>
      <WorldMapDemo></WorldMapDemo>
      <CarouselDemo></CarouselDemo>
      <Form service="Pag-web"></Form>
    </div>
  );
}
