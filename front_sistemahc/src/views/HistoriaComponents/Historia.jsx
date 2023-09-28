import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import historiaService from "./../../services/historiaService";
import Pacientes from "./Pacientes";
import AntecedenteF from "./AntecedenteF";
import AntecedenteP from "./AntecedentesP";
import ComposicionF from "./ComposicionF";
import ExploracionF from "./ExploracionF";
import Cita from "./Cita";
import Laboratorio from "./Laboratorio";

const Historia = () => {
  //consigue el id de params
  const { id } = useParams();
  const navigate = useNavigate();
  const [historia, setHistoria] = useState(null);
  useEffect(() => {
    const getHistoria = async () => {
      try {
        const historiaFetch = await historiaService.historiaPaciente(id);
        //console.log(historiaFetch.data);
        setHistoria(historiaFetch.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHistoria();
  }, []);

  return (
    <>
      <div>Historia</div>
      <a
        onClick={() => navigate("/personal/pacientes")}
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-indigo-600 rounded-lg shadow-md group cursor-pointer bg-indigo-500 dark:bg-indigo-800 dark:border-indigo-900"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-400 dark:bg-indigo-700 group-hover:translate-x-0 ease">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          Atrás
        </span>
        <span className="relative invisible">Atrás</span>
      </a>
      {historia === null ? (
        <p className="text-3xl mt-5 dark:text-white">Cargando...</p>
      ) : (
        <>
          {/* <p>los valores aqui:{JSON.stringify(historia)}</p> */}
          <Pacientes paciente={historia.historia.paciente} />
          <AntecedenteF antecedenteF={historia.historia.antecedenteF} />
          <AntecedenteP antecedenteP={historia.historia.antecedenteP} />
          <ComposicionF composicionesF={historia.historia.composicionesF} />
          <div className="p-4">
            <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-500">
              <div className="flex flex-col w-full">
                <h2 className="text-2xl font-semibold mb-1">
                  Arbol Genealógico
                </h2>
                <hr className="mb-4 border border-sky-700 shadow" />
                <div className="flex items-center justify-center w-full">
                  <div className=" h-96 w-96">
                    <img
                      src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg"
                      alt=""
                      className="max-h-full max-w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ExploracionF exploracionF={historia.historia.exploracionF}/>
          <Cita citas={historia.historia.citas}/>
          <Laboratorio laboratoristas={historia.historia.laboratoristas}/>
          {console.log(historia.historia.citas)}
        </>
      )}
    </>
  );
};

export default Historia;
