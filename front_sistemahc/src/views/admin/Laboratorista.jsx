import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import laboratoristaService from "./../../services/laboratoristaService";

const Laboratorista = () => {
  const [laboratorista, setLaboratorista] = useState([]);
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
    { key: "especialidad", label: "ESPECIALIDAD" },
    { key: "usuario.email", label: "CORREO ELECTRONICO" },
    { key: "usuario.createdAt", label: "CREADO EN" },
  ];
  useEffect(() => {
    getLaboratoristas();
  }, []);
  //FUNCIONES
  const getLaboratoristas = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await laboratoristaService.listar(q, nroPage, limit);
    console.log(data.laboratoristas);
    console.log("TOTAL:", data.laboratoristas.count);
    console.log("Registros:", data.laboratoristas.rows);
    setTotal(data.laboratoristas.count);
    setLaboratorista(data.laboratoristas.rows);
  };
  return (
    <>
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter">
        Laboratoristas
        </h3>
        <p className="text-gray-600 mt-2">
          Aqui se encuentran todos los <b>laboratoristas</b> registrados en el sistema.
        </p>
      </div>
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
        <TablePagination
          columnas={columnas}
          datos={laboratorista}
          total={total}
          page={page}
          fetchData={getLaboratoristas}
        ></TablePagination>
      </div>
    </>
  );
};

export default Laboratorista