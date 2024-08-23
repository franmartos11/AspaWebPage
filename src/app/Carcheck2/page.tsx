'use client'
import { TracingBeamCarcheck } from "../Components/TricingBean/TracingBeamCarcheck";
import Nav from "../Components/nav/Nav";
import { HeroScrollDemoCarcheck } from "./HeroScrollDemoCarcheck";

import { FeaturesSectionDemo } from "./Showcomp";
import { FeaturesSectionDemo2 } from "./servicios";


export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <HeroScrollDemoCarcheck></HeroScrollDemoCarcheck>
            
            <FeaturesSectionDemo2></FeaturesSectionDemo2>
            
            <FeaturesSectionDemo></FeaturesSectionDemo>
        </div>
    );
}