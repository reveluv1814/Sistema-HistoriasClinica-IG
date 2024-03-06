import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../components/TablePagination";
import pacienteService from "./../../services/pacienteService";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  const columnas = [
    { key: "id", label: "COD" },
    { key: "persona.nombreCompleto", label: "NOMBRE COMPLETO" },
    { key: "persona.ci", label: "CI" },
    { key: "edad", label: "EDAD" },
    { key: "persona.telefono", label: "CEL/TEL" },
    { key: "sexo", label: "SEXO" },
    { key: "personalAd[0].persona.nombreCompleto", label: "CREADO POR" },
    { key: "createdAt", label: "CRADO EN" },
  ];
  useEffect(() => {
    getPacientes();
  }, [q]);

  //FUNCIONES
  const getPacientes = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await pacienteService.listarLaboratorista(q, nroPage, limit);
   /*  console.log(data.pacientes);
    console.log("TOTAL:", data.pacientes.count);
    console.log("Registros:", data.pacientes.rows);  */
    setTotal(data.pacientes.count);
    setPacientes(data.pacientes.rows);
  };
  const funBuscar = (e) => {
    setq(e.target.value);
  };

  const handleHistoria = async (datos) => {
    try {
      navigate(`/laboratorista/historia/${datos.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Pacientes
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          Aqui se encuentran todos los <b>pacientes</b> registrados en el
          sistema.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-inter font-normal text-xs text-slate-600 dark:text-gray-100">
          Buscar por <b>Carnet de Identidad (CI)</b>
        </p>
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(e) => funBuscar(e)}
            className="w-96 py-2 pl-12 pr-4 text-gray-500 border-gray-200 rounded-md outline-none bg-gray-50 focus:bg-white focus:border-sky-600 dark:bg-slate-700 dark:border-indigo-900 dark:text-gray-300 dark:focus:border-indigo-900"
          />
        </div>
      </div>

      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto dark:border-slate-700 ">
        <TablePagination
          columnas={columnas}
          datos={pacientes}
          total={total}
          page={page}
          fetchData={getPacientes}
          handleHistoria={handleHistoria}
          personalMedico={true}
        ></TablePagination>
      </div>
    </>
  );
};

export default Pacientes;
