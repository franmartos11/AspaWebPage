import { CardHome } from "./CardHome";
import { CardHome2 } from "./CardHome2";
import { CardHome3 } from "./CardHome3";

export default function () {
    return (
        <div className="container mx-auto px-4 pt-[15rem] py-[6rem]">
            <div className="container    px-6 pt-7 pb-0 mx-auto sm:pt-0  ">
                <h3 className="text-4xl pt-16  font-semibold text-center  capitalize lg:text-6xl text-white">
                    En Que Nos Diferenciamos
                </h3>

                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
            </div>
            <div className="flex flex-wrap justify-evenly items-center">
                <CardHome></CardHome>
                <CardHome3></CardHome3>
                <CardHome2></CardHome2>
            </div>
        </div>
    );
}
