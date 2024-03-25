import { CardHome } from "./CardHome";
import { CardHome2 } from "./CardHome2";
import { CardHome3 } from "./CardHome3";

export default function () {
    return (
        <div className="container mx-auto px-4 py-16">
            <p className="text-5xl font-bold text-center mb-12">
                EN QUE NOS DIFERENCIAMOS
            </p>
            <div className="flex flex-wrap justify-evenly items-center">
                <CardHome></CardHome>
                <CardHome2></CardHome2>
            </div>
            <CardHome3></CardHome3>
        </div>
    );
}
