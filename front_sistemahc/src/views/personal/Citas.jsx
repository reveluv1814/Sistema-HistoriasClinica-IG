import { useEffect, useState } from "react";
import citaService from "./../../services/citaService";

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    async function fetchCitas() {
      try {
        const idUserProfile = localStorage.getItem("id");

        const { data } = await citaService.listar(idUserProfile);
        //console.log(data);
        setCitas(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCitas();
  }, []);
  //funciones

  return (
    <>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Citas
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          En esta sección, encontrarás todas las <b>citas</b> que has registrado
          en el sistema y que están programadas para ser atendidas, así como
          aquellas que aún no han sido atendidas.
        </p>
      </div>
      <div className="container mx-auto px-4 py-5 bg-cyan-600  dark:bg-slate-400  rounded-xl mt-5">
        <div
          className={"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 "}
        >
          {citas.map((cita, index) => (
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
                  {new Date(cita.fecha).toLocaleDateString()}
                </div>
                <div>
                  <b className="text-gray-600 text-xl dark:text-gray-200">
                    Hora:
                  </b>{" "}
                  {cita.hora.slice(0, 5)}
                </div>
              </div>
              <p className="mb-2">
                <b className="text-gray-800 dark:text-gray-400">Paciente:</b>{" "}
                {cita.paciente.persona.nombreCompleto}
              </p>
              <p className="mb-2">
                <b className="text-gray-800 dark:text-gray-400">Doctor:</b>{" "}
                {cita.doctor.persona.nombreCompleto}
              </p>
              <p className="italic text-sm">
                <b className="text-gray-700 dark:text-gray-400">Creado Por:</b>{" "}
                {cita.personalAd.persona.nombreCompleto}
              </p>
              {/* <p>{JSON.stringify(cita)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Citas;
