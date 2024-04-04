import { div } from "three/examples/jsm/nodes/Nodes.js";
import ContactCardImg from "./ContactCardImg";
import NavBar from "../Components/nav/NavBar";
import Nav from "../Components/nav/Nav";
export default function () {
    return (
        <div>
            <Nav page={"contact"}></Nav>
           <ContactCardImg></ContactCardImg> 
        </div>
        
    );
}
