'use client'
import Form from "../Components/Forms/Form";
import MoovingLogos from "../Components/MoovingLogos/MoovingLogos";
import { AppleCardsCarouselDemo } from "../Components/ServicesDisplay/Popup";
import Nav from "../Components/nav/Nav";
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo";
import { Hero } from "./Hero";
import { PricingSection } from "./PricingSection";
import { TutorialVideos } from "./TutorialVideos";

import { WhyBuyCarCheck } from "./WhyBuyCarcheck";



export default function () {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-black">
            <Nav page={"servicios"}></Nav>
            <Hero></Hero>
            <WhyBuyCarCheck></WhyBuyCarCheck>
            <AppleCardsCarouselDemo></AppleCardsCarouselDemo>          
            <TutorialVideos></TutorialVideos>
            <PricingSection></PricingSection>
            <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
            <Form service={"Carchek"}></Form>        
        </div>
    );
}