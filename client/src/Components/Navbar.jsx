import { Link } from "react-router-dom";
import "./../style.css";

function Navbar() {
  return (
    <div className="bg-zinc-100  shadow-lg flex justify-between p-2 h-32 textPop ">
      <div className="flex items-center p-7 ml-28">
        <div
          className="w-20 h-20 bg-cover bg-center logo"
          onClick={() =>
            (window.location =
              "https://www.facebook.com/profile.php?id=100071293437108")
          }
        ></div>
        <div className=" border-l-2 border-black ml-5 pl-2 font-normal text-2xl leading-6 tracking-wider">
          <h1>
            Instituto <br /> de <br /> Genetica
          </h1>
        </div>
      </div>
      <div className="flex items-center mr-28">
        <ul className="flex font-normal text-center text-2xl ">
          <li className="mr-7 linav pb-1 textnav bg-zinc-100">
            <Link to={"/"}>Inicio</Link>
          </li>
          <li className="mr-7 linav pb-1 border-b-2 textnav">
            <Link to={"http://genetica.fment.umsa.bo"}>Ver mas</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
