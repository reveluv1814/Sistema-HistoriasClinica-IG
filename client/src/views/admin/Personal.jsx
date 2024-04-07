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
  const [editFlag, setEditFlag] = useState(false);
  const [idPersonalEdit, setIdPersonalEdit] = useState(0);
  const [deletePersonal, setDeletePersonal] = useState(false);
  const [deletePersonalId, setDeletePersonalId] = useState(0);
  const [showPersonal, setShowPersonal] = useState({});
  const [showPersonalModal, setShowPersonalModal] = useState(false);

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
  const deletePersonalFun = () => {
    setDeletePersonal(false);
  };
  const [personalValue, setPersonalValue] = useState({});
  //FUNCIONES
  const getPersonalAd = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await personalService.listar(q, nroPage, limit);
    setTotal(data.personal.count);
    setPersonalAd(data.personal.rows);
  };
  const funBuscar = (e) => {
    setq(e.target.value);
  };
  const handleShow = async (datos) => {
    try {
      const { data } = await personalService.mostrar(datos.id);
      setShowPersonal(data);
      setShowPersonalModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const addPersonalAd = () => {
    setPersonalValue({
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
        foto: "",
        es_persona: false,
      },
      personalAdmin: {
        cargo: "",
      },
    });
    setEditFlag(false);
    setAddPersonal(!addPersonal);
  };
  const editPersonal = async (id) => {
    try {
      const { data } = await personalService.mostrar(id);
      setPersonalValue({
        usuario: {
          email: data.personalAdmin.usuario.email,
          password: data.personalAdmin.usuario.password,
          rol: data.personalAdmin.usuario.rol,
        },
        persona: {
          nombre: data.personalAdmin.persona.nombre,
          apellidoMaterno: data.personalAdmin.persona.apellidoMaterno,
          apellidoPaterno: data.personalAdmin.persona.apellidoPaterno,
          ci: data.personalAdmin.persona.ci,
          telefono: data.personalAdmin.persona.telefono,
          direccion: data.personalAdmin.persona.direccion,
          foto: data.personalAdmin.persona.foto,
        },
        personalAdmin: {
          cargo: data.personalAdmin.cargo,
        },
      });
      setIdPersonalEdit(id);
      setEditFlag(true);
      setAddPersonal(!addPersonal);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteId = async (datos) => {
    setDeletePersonalId(datos.id);
    setDeletePersonal(true);
  };
  const handleDelete = async () => {
    if (deletePersonal) {
      try {
        await personalService.eliminar(deletePersonalId);
        getPersonalAd();
        setDeletePersonal(false);
        setDeletePersonalId(0);
      } catch (error) {
        alert("Ocurrió un problema al intentar eliminar");
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Personal Administrativo
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          Aqui se encuentran todos los miembros del{" "}
          <b>personal administrativo</b> registrados en el sistema.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-inter font-normal text-xs text-slate-600 dark:text-gray-100">
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
            className="w-96 py-2 pl-12 pr-4 text-gray-500 border-gray-200 rounded-md outline-none bg-gray-50 focus:bg-white focus:border-sky-600 dark:bg-slate-700 dark:border-indigo-900 dark:text-gray-300 dark:focus:border-indigo-900"
          />
        </div>
      </div>
      <button
        className="flex flex-row ml-auto bg-blue-500 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={addPersonalAd}
      >
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            className="w-8 h-10 p-1 bg-blue-600 dark:bg-blue-700 text-white mr-2 rounded-tl-md rounded-bl-md"
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
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto dark:border-slate-700">
        <TablePagination
          columnas={columnas}
          datos={personalAd}
          total={total}
          page={page}
          fetchData={getPersonalAd}
          handleEdit={editPersonal}
          handleDelete={deleteId}
          handleShow={handleShow}
        ></TablePagination>
        <Modal
          modalOpen={addPersonal}
          setOpenModal={closeAddUser}
          title={
            editFlag
              ? "Editar Personal Administrativo"
              : "Agregar Personal Administrativo"
          }
          contenido={" shadow shadow-blue-500/40"}
        >
          <FormAddUser
            setOpenModal={closeAddUser}
            userValue={personalValue}
            userService={personalService}
            listar={getPersonalAd}
            editUser={editFlag}
            idEdit={idPersonalEdit}
            rol="personalAdmin"
          />
        </Modal>
        <Modal
          modalOpen={deletePersonal}
          setOpenModal={deletePersonalFun}
          title={"Eliminar Personal Administrativo?"}
          contenido={" shadow shadow-rose-500/40"}
        >
          <div className="flex justify-center items-center text-rose-800 dark:text-rose-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h4 className="text-center text-gray-700 text-lg font-medium dark:text-gray-300">
            Desea Eliminar al Personal Administrativo seleccionado?
          </h4>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => deletePersonalFun()}
              className="bg-rose-600 text-white px-1 py-2 rounded-md text-base font-medium mr-2 hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete()}
              className="bg-blue-500 text-white px-1 py-2 rounded-md text-base font-medium ml-2 hover:bg-blue-400"
            >
              Aceptar
            </button>
          </div>
        </Modal>
        <Modal
          modalOpen={showPersonalModal}
          setOpenModal={() => setShowPersonalModal(false)}
          title={"Personal Administrativo"}
          contenido={" shadow shadow-sky-500/40"}
        >
          <div className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-4 dark:bg-slate-800/50 ">
              <img
                className="w-20 h-20 xl:w-24 xl:h-24 rounded-full mx-auto mb-4"
                src={
                  showPersonal.personalAdmin?.persona?.foto
                    ? import.meta.env.VITE_URL_BACK_SERVICE +
                      showPersonal.personalAdmin.persona.foto
                    : "/personal-default.jpg"
                }
                onError={(e) => (e.target.src = "/personal-default.jpg")}
                alt={`${showPersonal.personalAdmin?.persona?.nombre} ${showPersonal.personalAdmin?.persona?.apellidoPaterno}`}
              />
              <h3 className="text-base xl:text-lg font-semibold capitalize">
                {showPersonal.personalAdmin?.persona?.nombre}{" "}
                {showPersonal.personalAdmin?.persona?.apellidoPaterno}{" "}
                {showPersonal.personalAdmin?.persona?.apellidoMaterno}
              </h3>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300 mt-2">
                <strong>CI:</strong> {showPersonal.personalAdmin?.persona?.ci}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Dirección:</strong>{" "}
                {showPersonal.personalAdmin?.persona?.direccion}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Teléfono:</strong>{" "}
                {showPersonal.personalAdmin?.persona?.telefono}
              </p>
              <hr className="border-t-2 bg-gray-700 my-2 dark:border-t-gray-600" />
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Email:</strong>{" "}
                {showPersonal.personalAdmin?.usuario?.email}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Rol:</strong> {showPersonal.personalAdmin?.usuario?.rol}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Fecha de creación:</strong>{" "}
                {showPersonal.personalAdmin?.usuario?.createdAt}
              </p>
              <hr className="border-t-2 bg-gray-700 my-2 dark:border-t-gray-600" />
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Cargo:</strong> {showPersonal.personalAdmin?.cargo}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Personal;
