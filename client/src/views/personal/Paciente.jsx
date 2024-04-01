import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../components/TablePagination";
import Modal from "../../components/Modal";
import pacienteService from "./../../services/pacienteService";
import FormAddPaciente from "./FormAddPaciente";

const Paciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");
  const [limit, setLimit] = useState(10);
  const [pacienteValue, setPacienteValue] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const [idPacienteEdit, setIdPacienteEdit] = useState(0);
  const [modalAddPaciente, setModalAddPaciente] = useState(false);
  const [modalDeletePaciente, setModalDeletePaciente] = useState(false);
  const [deletePacienteId, setDeletePacienteId] = useState(0);

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
  const closeAddPaciente = () => {
    setModalAddPaciente(false);
  };
  const deletePacienteFun = () => {
    setModalDeletePaciente(false);
  };
  //FUNCIONES
  const getPacientes = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await pacienteService.listar(q, nroPage, limit);
    /* console.log(data.pacientes);
    console.log("TOTAL:", data.pacientes.count);
    console.log("Registros:", data.pacientes.rows); */
    setTotal(data.pacientes.count);
    setPacientes(data.pacientes.rows);
  };
  const funBuscar = (e) => {
    setq(e.target.value);
  };
  const funAddValuePaciente = () => {
    const idUserProfile = localStorage.getItem("id");
    setPacienteValue({
      persona: {
        nombre: "",
        apellidoMaterno: "",
        apellidoPaterno: "",
        ci: "",
        telefono: "",
        direccion: "",
        foto: "https://static.simpsonswiki.com/images/2/26/Prom_Time_Homer.png",
        es_persona: true,
      },
      paciente: {
        fechanac: "",
        sexo: "",
        raza: "",
        procedencia: "",
        residencia: "",
      },
      personalAdmin: {
        personalAd_Id: idUserProfile,
      },
    });
    setEditFlag(false);
    setModalAddPaciente(!modalAddPaciente);
  };
  const editPaciente = async (id) => {
    try {
      const { data } = await pacienteService.mostrar(id);
      setPacienteValue({
        persona: {
          nombre: data.paciente.persona.nombre,
          apellidoMaterno: data.paciente.persona.apellidoMaterno,
          apellidoPaterno: data.paciente.persona.apellidoPaterno,
          ci: data.paciente.persona.ci,
          telefono: data.paciente.persona.telefono,
          direccion: data.paciente.persona.direccion,
          foto: data.paciente.persona.foto,
        },
        paciente: {
          fechanac: data.paciente.fechanac.substring(0, 10),
          sexo: data.paciente.sexo,
          raza: data.paciente.raza,
          procedencia: data.paciente.procedencia,
          residencia: data.paciente.residencia,
        },
        /* personalAdmin: {
          personalAd_Id: 11,
        }, */
      });
      setIdPacienteEdit(id);
      setEditFlag(true);
      setModalAddPaciente(!modalAddPaciente);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteId = async (datos) => {
    setDeletePacienteId(datos.id);
    setModalDeletePaciente(true);
  };
  const handleDelete = async () => {
    if (modalDeletePaciente) {
      try {
        await pacienteService.eliminar(deletePacienteId);
        getPacientes();
        setModalDeletePaciente(false);
        setDeletePacienteId(0);
      } catch (error) {
        alert("Ocurrió un problema al intentar eliminar");
        console.log(error);
      }
    }
  };
  const handleCita = async (datos) => {
    try {
      navigate(`/personal/addCita/${datos.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleHistoria = async (datos) => {
    try {
      navigate(`/personal/historia/${datos.id}`);
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
      <button
        className="flex flex-row ml-auto bg-blue-500 dark:bg-blue-600 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 "
        onClick={funAddValuePaciente}
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
        Añadir Paciente
      </button>

      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto dark:border-slate-700 ">
        <TablePagination
          columnas={columnas}
          datos={pacientes}
          total={total}
          page={page}
          fetchData={getPacientes}
          handleEdit={editPaciente}
          //handleDelete={deleteId}
          handleCita={handleCita}
          handleHistoria={handleHistoria}
          accionesFlag={true}
        ></TablePagination>
        <Modal
          modalOpen={modalAddPaciente}
          setOpenModal={closeAddPaciente}
          title={editFlag ? "Editar Paciente" : "Agregar Paciente"}
          contenido={" shadow shadow-blue-500/40"}
        >
          <FormAddPaciente
            setOpenModal={closeAddPaciente}
            pacienteValue={pacienteValue}
            pacienteService={pacienteService}
            listar={getPacientes}
            editPaciente={editFlag}
            idEdit={idPacienteEdit}
          />
        </Modal>
        <Modal
          modalOpen={modalDeletePaciente}
          setOpenModal={deletePacienteFun}
          title={"Eliminar Paciente?"}
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
            Desea Eliminar al Paciente seleccionado?
          </h4>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => deletePacienteFun()}
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
      </div>
    </>
  );
};

export default Paciente;
