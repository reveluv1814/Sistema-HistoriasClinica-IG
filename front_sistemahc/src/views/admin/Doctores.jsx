import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import Modal from "../../components/Modal";
import doctorService from "./../../services/doctorService";
import FormAddUser from './formAddUser'

const Doctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);
  const [addDoctor, setAddDoctor] = useState(false);

  const columnas = [
    { key: "id", label: "COD" },
    { key: "persona.apellidoPaterno", label: "APELLIDO PATERNO." },
    { key: "persona.apellidoMaterno", label: "APELLIDO MATERNO." },
    { key: "persona.nombre", label: "NOMBRE" },
    { key: "persona.ci", label: "CI" },
    { key: "usuario.email", label: "CORREO ELECTRONICO" },
    { key: "unidad", label: "UNIDAD" },
    { key: "usuario.createdAt", label: "CREADO EN" },
  ];
  useEffect(() => {
    getDoctores();
  }, []);
  const closeAddUser = () => {
    setAddDoctor(false);
  };
  //FUNCIONES
  const getDoctores = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await doctorService.listar(q, nroPage, limit);
    console.log(data.doctores);
    console.log("TOTAL:", data.doctores.count);
    console.log("Registros:", data.doctores.rows);
    setTotal(data.doctores.count);
    setDoctores(data.doctores.rows);
  };
  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter">
          Doctores
        </h3>
        <p className="text-gray-600 mt-2">
          Aqui se encuentran todos los <b>doctores</b> registrados en el
          sistema.
        </p>
        <button
          className="flex flex-row ml-auto bg-blue-500 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600"
          onClick={() => setAddDoctor(!addDoctor)}
        >
          <div className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              className="w-8 h-10 p-1 bg-blue-600  text-white mr-2 rounded-tl-md rounded-bl-md"
              viewBox="0 0 640 512"
            >
              <path
                d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                fill="currentColor"
              />
            </svg>
          </div>
          Añadir usuario
        </button>
      </div>
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
        <TablePagination
          columnas={columnas}
          datos={doctores}
          total={total}
          page={page}
          fetchData={getDoctores}
        ></TablePagination>
        <Modal modalOpen={addDoctor} setOpenModal={closeAddUser} title={"Agregar Doctor"} contenido={" shadow shadow-blue-500/40"}>
          <FormAddUser setOpenModal={closeAddUser}/>
        </Modal>
      </div>
    </>
  );
};

export default Doctores;
