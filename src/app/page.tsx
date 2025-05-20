"use client";
import { HeroHome } from "./Components/HeroHome/HeroHome";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Nav from "./Components/nav/Nav";
import { HeroScrollDemo } from "./Components/Tablet/HeroScrollDemo";
import { TabsDemo } from "./Components/tabs/TabsDemo";
import MoovingLogos from "./Components/MoovingLogos/MoovingLogos";
import NosotrosTeam from "./Components/NosotrosTeam/NosotrosTeam";

export default function Home() {
  return (
    <div className="bg-black">
      <Nav page={"home"}></Nav>
      <HeroHome></HeroHome>
      <HeroScrollDemo></HeroScrollDemo>
      <TabsDemo></TabsDemo>
      <CardHomeTriple></CardHomeTriple>
      <NosotrosTeam></NosotrosTeam>
      <MoovingLogos></MoovingLogos>
    </div>
  );
}
