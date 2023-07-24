import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import personalService from "./../../services/personalService";
import FormAddUser from "./formAddUser";
import Modal from "../../components/Modal";

const Personal = () => {
  const [personalAd, setPersonalAd] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);
  const [addPersonal, setAddPersonal] = useState(false);

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
  }, [q]);
  const closeAddUser = () => {
    setAddPersonal(false);
  };
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
  const funBuscar = (e) => {
    setq(e.target.value);
  };
  const personalValue = {
    usuario: {
      email: "",
      password: "",
      rol: "personalAdmin",
    },
    persona: {
      nombre: "",
      apellidoMaterno: "",
      apellidoPaterno: "",
      ci: "",
      telefono: "",
      direccion: "",
      foto: "http://placehold.it/32x32",
      es_persona: false,
    },
    personalAdmin: {
      cargo: "",
    },
  };
  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter">
          Personal Administrativo
        </h3>
        <p className="text-gray-600 mt-2">
          Aqui se encuentran todos los miembros del{" "}
          <b>personal administrativo</b> registrados en el sistema.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-inter font-normal text-xs text-slate-600">
          Buscar por <b>Apellido Paterno</b>
        </p>
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
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
            className="w-96 py-2 pl-12 pr-4 text-gray-500 border-gray-200 rounded-md outline-none bg-gray-50 focus:bg-white focus:border-sky-600"
          />
        </div>
      </div>
      <button
        className="flex flex-row ml-auto bg-blue-500 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600"
        onClick={() => setAddPersonal(!addPersonal)}
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
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto">
        <TablePagination
          columnas={columnas}
          datos={personalAd}
          total={total}
          page={page}
          fetchData={getPersonalAd}
        ></TablePagination>
        <Modal
          modalOpen={addPersonal}
          setOpenModal={closeAddUser}
          title={"Agregar Personal Administrativo"}
          contenido={" shadow shadow-blue-500/40"}
        >
          <FormAddUser
            setOpenModal={closeAddUser}
            userValue={personalValue}
            userService={personalService}
            listar= {getPersonalAd}
          />
        </Modal>
      </div>
    </>
  );
};

export default Personal;
