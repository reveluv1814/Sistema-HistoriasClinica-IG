import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import personalService from "./../../services/personalService";

const Personal = () => {
  const [personalAd, setPersonalAd] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);
  const columnas = [
    { key: "id", label: "COD" },
    { key: "persona.apellidoPaterno", label: "APELLIDO PATERNO." },
    { key: "persona.apellidoMaterno", label: "APELLIDO MATERNO." },
    { key: "persona.nombre", label: "NOMBRE" },
    { key: "persona.ci", label: "CI" },
    { key: "usuario.email", label: "CORREO ELECTRONICO" },
    { key: "cargo", label: "CARGO" },
    { key: "usuario.createdAt", label: "CREADO EN" },
  ];
  useEffect(() => {
    getPersonalAd();
  }, []);
  //FUNCIONES
  const getPersonalAd = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await personalService.listar(q, nroPage, limit);
    console.log(data.personal);
    console.log("TOTAL:", data.personal.count);
    console.log("Registros:", data.personal.rows);
    setTotal(data.personal.count);
    setPersonalAd(data.personal.rows);
  };
  return (
    <>
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter">
          Personal Administrativo
        </h3>
        <p className="text-gray-600 mt-2">
          Aqui se encuentran todos los miembros del <b>personal administrativo</b> registrados en el sistema.
        </p>
      </div>
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
        <TablePagination
          columnas={columnas}
          datos={personalAd}
          total={total}
          page={page}
          fetchData={getPersonalAd}
        ></TablePagination>
      </div>
    </>
  );
};

export default Personal