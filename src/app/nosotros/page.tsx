"use client";
import AboutMeEvents from "../Components/AboutMeEvents/AboutMeEvents";
import ImageWithContent from "../Components/ImageWithContent/ImageWithContent";
import ImageWithContent2 from "../Components/ImageWithContent/ImageWithContent2";
import MoovingLogos from "../Components/MoovingLogos/MoovingLogos";
import NosotrosTeam from "../Components/NosotrosTeam/NosotrosTeam";
import Nav from "../Components/nav/Nav";

export default function () {
  return (
    <div className="bg-black">
      <Nav page={"nosotros"}></Nav>
      <NosotrosTeam></NosotrosTeam>
      <ImageWithContent2></ImageWithContent2>
      <ImageWithContent></ImageWithContent>
      <AboutMeEvents></AboutMeEvents>
      <MoovingLogos></MoovingLogos>
    </div>
  );
}
