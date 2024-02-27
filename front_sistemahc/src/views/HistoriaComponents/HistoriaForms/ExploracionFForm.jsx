import React, { useEffect, useState } from "react";
import historiaService from "../../../services/historiaService";
import ExFisicoForm from "./ExploracionFForms/ExFisicoForm";
import SteppExpFisica from "./../../../components/SteppExpFisica";

const ExploracionFForm = ({ historiaId }) => {
  const [exploracionF, setExploracionF] = useState("load");

  /*carga el apartado */
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setExploracionF(historiaFetch.data.exploracionF);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApartado();
  }, []);

  return (
    <div className="h-2/4">
      {exploracionF === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white h-2/4">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-semibold text-xl dark:text-zinc-200 max-xl:text-xs">
            Exploración Física
          </h4>
          <hr className="mb-0 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200/60 max-w-lg" />
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full p-4">
              {/* ExFisico */}
              <div>
                <ExFisicoForm historiaId={historiaId} expComplementarias={getApartado}/>
              </div>
              {exploracionF && (
                <div className="mt-4">
                  <h3 className="font-semibold dark:text-zinc-200 max-md:text-sm">
                    Exploraciones complementarias
                  </h3>
                  <hr className="mb-2 border-0 h-px  bg-gray-400  shadow w-full dark:bg-gray-300/60" />
                  <SteppExpFisica expFisicaId={exploracionF.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploracionFForm;
