import { Link } from "react-router-dom";
import "./../style.css";

function Footer() {
  return (
    <div className="flex justify-between p-2 h-32 textPop footer mt-[10%]">
      <div className="flex items-center p-7 ml-28">
        <div
          className="w-24 h-24 bg-cover bg-center logofooter"
          onClick={() =>
            (window.location =
              "https://www.facebook.com/profile.php?id=100071293437108")
          }
        ></div>
        <div className=" border-l-2 border-white ml-5 pl-2 leading-5 text-sm text-white">
          <p className="font-normal">Instituto de Genetica</p>
          <p className="font-thin">
            Avenida Saavedra 2246, Miraflores,
            <br />
            Edificio de la Facultad de Medicina Piso 9
          </p>
          <p className="font-light">
            Telefono: 2 2229613 <br />
            La Paz - Boliivia
          </p>
        </div>
      </div>
      <div className="flex items-center mr-28 text-white">
        <h2 className="font-extralight">©️ Copyright 2023 <Link to={"https://www.linkedin.com/in/neil-graneros/"} className="underline" >Neil Graneros</Link></h2>
      </div>
    </div>
  );
}

export default Footer;
