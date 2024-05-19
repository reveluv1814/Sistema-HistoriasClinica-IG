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
import ButtonPDF from "../../components/ButtonPDF";

const Historia = ({ atras }) => {
  //consigue el id de params
  const { id } = useParams();
  const navigate = useNavigate();
  const [historia, setHistoria] = useState(null);
  useEffect(() => {
    const getHistoria = async () => {
      try {
        const historiaFetch = await historiaService.historiaPaciente(id);
        setHistoria(historiaFetch.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHistoria();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between">
        <a
          onClick={() => navigate(atras)}
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
        {historia !== null && (
          <ButtonPDF historiaData={historia.historia} />
        )}
      </div>

      {historia === null ? (
        <p className="text-3xl mt-5 dark:text-white">Cargando...</p>
      ) : (
        <>
          <Pacientes paciente={historia.historia.paciente} />
          <AntecedenteF antecedenteF={historia.historia.antecedenteF} />
          <AntecedenteP antecedenteP={historia.historia.antecedenteP} />
          <ComposicionF composicionesF={historia.historia.composicionesF} />
          <div className="p-4">
            <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-700">
              <div className="flex flex-col w-full">
                <h2 className="text-2xl font-semibold mb-1 dark:text-gray-300">
                  Árbol Genealógico
                </h2>
                <hr className="mb-4 border border-sky-700 shadow dark:border-sky-800" />
                <div className="flex items-center justify-center w-full">
                  <div className=" h-96 w-96">
                    <a
                      href={
                        historia.historia.arbolGene
                          ? import.meta.env.VITE_URL_BACK_SERVICE +
                            historia.historia.arbolGene
                          : "/imagePlaceholder.jpg"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={
                          historia.historia.arbolGene
                            ? import.meta.env.VITE_URL_BACK_SERVICE +
                              historia.historia.arbolGene
                            : "/imagePlaceholder.jpg"
                        }
                        alt="Árbol genealógico"
                        onError={(e) =>
                          (e.target.src = "/imagePlaceholder.jpg")
                        }
                        className=" object-cover rounded-md shadow-sm"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ExploracionF exploracionF={historia.historia.exploracionF} />
          <Cita citas={historia.historia.citas} />
          <Laboratorio laboratoristas={historia.historia.resultadosLabo} />
        </>
      )}
    </>
  );
};

export default Historia;
