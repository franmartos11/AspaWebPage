import { CardHome } from "./CardHome";
import { CardHome2 } from "./CardHome2";
import { CardHome3 } from "./CardHome3";

export default function(){
    return(
        <div className="p-[10rem] pt-[30rem]">
            <p className="text-5xl font-bold">EN QUE NOS DIFERENCIAMOS</p>
        
        <div className="flex justify-around  align-middle ">
            <CardHome></CardHome>
            <CardHome2></CardHome2>
            <CardHome3></CardHome3>
        </div>
        </div>
    )
}