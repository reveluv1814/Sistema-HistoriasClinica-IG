import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Instituto de Genetica</h1>
      <ul>
        <li>
          <Link to={"/"}>inicio</Link>
        </li>
        <li>
          <Link to={"http://genetica.fment.umsa.bo"}>ver mas</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
