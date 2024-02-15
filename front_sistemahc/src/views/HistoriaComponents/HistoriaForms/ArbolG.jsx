import React, { useEffect, useState } from "react";
import historiaService from "../../../services/historiaService";

const ArabolG = ({ historiaId }) => {
  const [arbolG, setArbolG] = useState("load");
  const getApartado = async () => {
    try {
      const historiaFetch = await historiaService.verApartados(historiaId);
      setArbolG(historiaFetch.data.arbolGene);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApartado();
  }, []);
  return (
    <>
      {arbolG === "load" ? (
        <h2 className="p-3 font-inter text-gray-500 dark:text-white">
          Cargando ....
        </h2>
      ) : (
        <div className="bg-indigo-200 dark:bg-sky-800 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg mt-3 py-4">
          <h4 className="text-center font-inter font-semibold text-xl dark:text-zinc-200 max-xl:text-xs">
            Árbol Genealógico
          </h4>
          <hr className="mb-3 ml-auto mr-auto border border-sky-700 shadow dark:border-zinc-200/60 max-w-lg" />
          <div className=" h-96 w-full flex items-center justify-center">
            <img
              src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg"
              alt=""
              className="max-h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArabolG;
