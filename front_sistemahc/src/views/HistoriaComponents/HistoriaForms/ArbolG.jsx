import React, { useEffect, useState } from "react";
import historiaService from "../../../services/historiaService";

const ArabolG = ({ historiaId }) => {
  const [arbolG, setArbolG] = useState("load");
  const [fotoSubida, setFotoSubida] = useState();
  const [editarImagen, setEditarImagen] = useState(false);
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

  const actualizarAG = async () => {
    try {
      const formData = new FormData();
      formData.append("fileHC", fotoSubida);
      await historiaService.actualizarFoto(historiaId, formData);
      setArbolG("");
      setEditarImagen(false);
    } catch (error) {
      setShowError(true);
      console.error(error);
    } finally {
      getApartado();
    }
  };

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
          <div className="h-[60vh] w-full flex items-center justify-center">
            <a
              href={
                arbolG
                  ? import.meta.env.VITE_URL_BACK_SERVICE + arbolG
                  : "/imagePlaceholder.jpg"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  arbolG
                    ? import.meta.env.VITE_URL_BACK_SERVICE + arbolG
                    : "/imagePlaceholder.jpg"
                }
                alt="Árbol genealógico"
                onError={(e) => (e.target.src = "/imagePlaceholder.jpg")}
                className="h-[50vh] object-cover rounded-md shadow-sm"
              />
            </a>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="bg-sky-100 dark:bg-sky-900 px-16 py-5 rounded-xl">
              <label
                htmlFor="persona.foto"
                className="mb-1 text-base font-bold text-gray-700 dark:text-gray-300"
              >
                Actualizar imagen:
              </label>
              <button
                className={`${
                  editarImagen
                    ? "bg-rose-500 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600"
                    : "bg-sky-500 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
                } text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md mt-2`}
                onClick={() => setEditarImagen(!editarImagen)}
              >
                {editarImagen ? "Cancelar" : "Actualizar"}
              </button>
              {editarImagen && (
                <>
                  <div className="flex items-center justify-center w-full mt-2">
                    <label
                      htmlFor="persona.foto"
                      className="flex flex-col items-center justify-center w-full px-4 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-8 pb-6">
                        <svg
                          className="w-8 h-8 mb-0 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        {fotoSubida?.name ? (
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-bold">{fotoSubida.name}</span>
                          </p>
                        ) : (
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Haga clic para subir
                            </span>{" "}
                            o arrastre y suelte la imagen
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFotoSubida(e.currentTarget.files[0])
                        }
                        id="persona.foto"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <button
                    className="bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-sm shadow-lg font-bold py-2 px-2 w-full rounded-md mt-3"
                    onClick={() => actualizarAG()}
                  >
                    Actualizar Imagen
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArabolG;
