import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import citaService from "./../../services/citaService";
import Modal from "../../components/Modal";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [modalDeleteCita, setModalDeleteCita] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const navigate = useNavigate();

  const fetchCitas = async () => {
    try {
      const idUserProfile = localStorage.getItem("id");
      const { data } = await citaService.listar(idUserProfile);
      setCitas(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCitas();
  }, []);
  //funciones
  const deleteCitaFun = () => {
    setModalDeleteCita(false);
  };
  const deleteCita = async () => {
    if (modalDeleteCita) {
      try {
        await citaService.eliminar(deleteId);
        fetchCitas();
        setModalDeleteCita(false);
        setDeleteId(0);
      } catch (error) {
        alert("Ocurrió un problema al intentar eliminar");
        console.log(error);
      }
    }
  };
  const idCitaDelete = async (data) => {
    setDeleteId(data.id);
    setModalDeleteCita(true);
  };
  //edit
  const handleEdit = async (datos) => {
    try {
      navigate(`/personal/editCita/${datos.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Citas
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          En esta sección, encontrarás todas las <b>citas</b> que se registraron
          en el sistema y que están <b>programadas para ser atendidas</b>, así
          como aquellas que aún <b>no han sido atendidas</b>.
        </p>
      </div>
      <div className="container mx-auto px-4 py-5 bg-cyan-600  dark:bg-slate-400  rounded-xl mt-5">
        <div
          className={"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 "}
        >
          {!citas.citas || citas.citas.length === 0 ? (
            <p className="text-white">No hay Citas registradas ...</p>
          ) : (
            citas.citas.map((cita, index) => {
              const fecha = new Date(cita.fecha);
              const dia = fecha.getUTCDate().toString().padStart(2, "0");
              const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
              const año = fecha.getUTCFullYear();
              return (
                <div
                  key={index}
                  className="bg-sky-100 dark:bg-slate-800 p-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.4)] hover:bg-slate-100 hover:scale-105 transition-transform cursor-pointer"
                >
                  {/* Renderiza el contenido de cada elemento aquí  */}
                  <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 ">
                    <div>
                      <b className="text-gray-600 text-xl dark:text-gray-200">
                        Fecha:
                      </b>{" "}
                      {`${dia}/${mes}/${año}`}
                    </div>
                    <div>
                      <b className="text-gray-600 text-xl dark:text-gray-200">
                        Hora:
                      </b>{" "}
                      {cita.hora.slice(0, 5)}
                    </div>
                  </div>
                  <p className="mb-2">
                    <b className="text-gray-800 dark:text-gray-400">
                      Paciente:
                    </b>{" "}
                    {cita.paciente.persona.nombreCompleto}
                  </p>
                  <p className="mb-2">
                    <b className="text-gray-800 dark:text-gray-400">Doctor:</b>{" "}
                    {cita.doctor.persona.nombreCompleto}
                  </p>
                  <p className="italic text-sm">
                    <b className="text-gray-700 dark:text-gray-400">
                      Creado Por:
                    </b>{" "}
                    {cita.personalAd.persona.nombreCompleto}
                  </p>
                  <div className="flex flex-row items-center justify-center mt-2">
                    <button
                      className=" text-sm bg-rose-500 py-2 px-4 rounded-lg mr-2 text-gray-100 hover:bg-rose-600 hover:text-white "
                      onClick={() => idCitaDelete(cita)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="text-sm bg-sky-500 py-2 px-4 rounded-lg ml-2 text-gray-100 hover:bg-sky-600 hover:text-white "
                      onClick={() => handleEdit(cita)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Modal
        modalOpen={modalDeleteCita}
        setOpenModal={deleteCitaFun}
        title={"Eliminar Cita?"}
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
          Desea Eliminar la Cita seleccionada?
        </h4>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => deleteCitaFun()}
            className="bg-rose-600 text-white px-1 py-2 rounded-md text-base font-medium mr-2 hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteCita()}
            className="bg-blue-500 text-white px-1 py-2 rounded-md text-base font-medium ml-2 hover:bg-blue-400"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Citas;
