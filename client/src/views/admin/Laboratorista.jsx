import { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import Modal from "../../components/Modal";
import FormAddUser from "./formAddUser";
import laboratoristaService from "./../../services/laboratoristaService";

const Laboratorista = () => {
  const [laboratorista, setLaboratorista] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);
  const [addLabo, setAddLabo] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [idLaboEdit, setIdLaboEdit] = useState(0);
  const [deleteLabo, setDeleteLabo] = useState(false);
  const [deleteLaboId, setDeleteLaboId] = useState(0);
  const [showLaboratorista, setShowLaboratorista] = useState({});
  const [showLaboModal, setShowLaboModal] = useState(false);
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
  }, [q]);
  const closeAddUser = () => {
    setAddLabo(false);
  };
  const deleteLaboFun = () => {
    setDeleteLabo(false);
  };
  const [laboValue, setLaboValue] = useState({});
  //FUNCIONES
  const getLaboratoristas = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await laboratoristaService.listar(q, nroPage, limit);
    setTotal(data.laboratoristas.count);
    setLaboratorista(data.laboratoristas.rows);
  };
  const funBuscar = (e) => {
    setq(e.target.value);
  };
  const handleShow = async (datos) => {
    try {
      const { data } = await laboratoristaService.mostrar(datos.id);
      setShowLaboratorista(data);
      setShowLaboModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const addLabora = () => {
    setLaboValue({
      usuario: {
        email: "",
        password: "",
        rol: "laboratorista",
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
      laboratorista: {
        especialidad: "",
        matriculaProf: "",
      },
    });
    setEditFlag(false);
    setAddLabo(!addLabo);
  };
  const editLabo = async (id) => {
    try {
      const { data } = await laboratoristaService.mostrar(id);
      setLaboValue({
        usuario: {
          email: data.laboratorista.usuario.email,
          password: data.laboratorista.usuario.password,
          rol: data.laboratorista.usuario.rol,
        },
        persona: {
          nombre: data.laboratorista.persona.nombre,
          apellidoMaterno: data.laboratorista.persona.apellidoMaterno,
          apellidoPaterno: data.laboratorista.persona.apellidoPaterno,
          ci: data.laboratorista.persona.ci,
          telefono: data.laboratorista.persona.telefono,
          direccion: data.laboratorista.persona.direccion,
          foto: data.laboratorista.persona.foto,
        },
        laboratorista: {
          especialidad: data.laboratorista.especialidad,
          matriculaProf: data.laboratorista.matriculaProf,
        },
      });
      setIdLaboEdit(id);
      setEditFlag(true);
      setAddLabo(!addLabo);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteId = async (datos) => {
    setDeleteLaboId(datos.id);
    setDeleteLabo(true);
  };
  const handleDelete = async () => {
    if (deleteLabo) {
      try {
        await laboratoristaService.eliminar(deleteLaboId);
        getLaboratoristas();
        setDeleteLabo(false);
        setDeleteLaboId(0);
      } catch (error) {
        alert("Ocurrió un problema al intentar eliminar");
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Laboratoristas
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          Aqui se encuentran todos los <b>laboratoristas</b> registrados en el
          sistema.
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
        className="flex flex-row ml-auto bg-blue-500 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600 dark:to-blue-600 dark:hover:bg-blue-700"
        onClick={addLabora}
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
          datos={laboratorista}
          total={total}
          page={page}
          fetchData={getLaboratoristas}
          handleEdit={editLabo}
          handleDelete={deleteId}
          handleShow={handleShow}
        ></TablePagination>
        <Modal
          modalOpen={addLabo}
          setOpenModal={closeAddUser}
          title={editFlag ? "Editar Laboratista" : "Agregar Laboratista"}
          contenido={" shadow shadow-blue-500/40"}
        >
          <FormAddUser
            setOpenModal={closeAddUser}
            userValue={laboValue}
            userService={laboratoristaService}
            listar={getLaboratoristas}
            editUser={editFlag}
            idEdit={idLaboEdit}
            rol="laboratorista"
          />
        </Modal>
        <Modal
          modalOpen={deleteLabo}
          setOpenModal={deleteLaboFun}
          title={"Eliminar Laboratorista?"}
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
            Desea Eliminar al Laboratorista seleccionado?
          </h4>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => deleteLaboFun()}
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
          modalOpen={showLaboModal}
          setOpenModal={() => setShowLaboModal(false)}
          title={"Laboratorista"}
          contenido={" shadow shadow-sky-500/40"}
        >
          <div className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-4 dark:bg-slate-800/50">
              <img
                className="w-20 h-20 xl:w-24 xl:h-24 rounded-full mx-auto mb-4"
                src={
                  showLaboratorista.laboratorista?.persona?.foto
                    ? import.meta.env.VITE_URL_BACK_SERVICE +
                      showLaboratorista.laboratorista.persona.foto
                    : "/laboratorista-default.jpg"
                }
                onError={(e) => (e.target.src = "/laboratorista-default.jpg")}
                alt={`${showLaboratorista.laboratorista?.persona?.nombre} ${showLaboratorista.laboratorista?.persona?.apellidoPaterno}`}
              />
              <h3 className="text-base xl:text-lg font-semibold capitalize">
                {showLaboratorista.laboratorista?.persona?.nombre}{" "}
                {showLaboratorista.laboratorista?.persona?.apellidoPaterno}{" "}
                {showLaboratorista.laboratorista?.persona?.apellidoMaterno}
              </h3>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>CI:</strong>{" "}
                {showLaboratorista.laboratorista?.persona?.ci}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Dirección:</strong>{" "}
                {showLaboratorista.laboratorista?.persona?.direccion}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Teléfono:</strong>{" "}
                {showLaboratorista.laboratorista?.persona?.telefono}
              </p>
              <hr className="border-t-2 bg-gray-700 my-2 dark:border-t-gray-600" />
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Email:</strong>{" "}
                {showLaboratorista.laboratorista?.usuario?.email}
              </p>

              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Rol:</strong>{" "}
                {showLaboratorista.laboratorista?.usuario?.rol}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Fecha de creación:</strong>{" "}
                {showLaboratorista.laboratorista?.usuario?.createdAt}
              </p>
              <hr className="border-t-2 bg-gray-700 my-2 dark:border-t-gray-600" />
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Especialidad:</strong>{" "}
                {showLaboratorista.laboratorista?.especialidad}
              </p>
              <p className="text-gray-700 text-sm xl:text-base dark:text-gray-300">
                <strong>Matrícula Profesional:</strong>{" "}
                {showLaboratorista.laboratorista?.matriculaProf}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Laboratorista;
