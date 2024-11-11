'use client'
import { CardHoverEffectDemo } from "../Components/ServicesDisplay/CardHoverEffectDemo";
import { AppleCardsCarouselDemo } from "../Components/ServicesDisplay/Popup";
import Nav from "../Components/nav/Nav";
import { HeroScrollDemoCarcheck } from "./HeroScrollDemoCarcheck";



export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <HeroScrollDemoCarcheck></HeroScrollDemoCarcheck>
            <CardHoverEffectDemo></CardHoverEffectDemo>
            <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
        </div>
    );
}