import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import historiaService from "./../../../services/historiaService";
import Paciente from "./../Pacientes";
import Stepp from "../../../components/Stepp";
function HistoriaForm() {
  const { historiaId } = useParams();
  const { consultaId } = useParams();

  const [historia, setHistoria] = useState(null);

  //funcion que hace get de la historia
  useEffect(() => {
    const getHistoria = async () => {
      try {
        const historiaFetch = await historiaService.historiaFormList(
          historiaId
        );
        console.log(historiaFetch.data);
        setHistoria(historiaFetch.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHistoria();
  }, []);
  //inica los valores con el get
  let historiaValue;
  if (historia != null) {
    historiaValue = {
      arbolGene: historia.historia.arbolGene,
      antecedenteF: historia.historia.antecedenteF,
      antecedenteP: historia.historia.antecedenteP,
      composicionesF: historia.historia.composicionesF,
      exploracionF: historia.historia.exploracionF,
      laboratoristas: historia.historia.laboratoristas,
    };
  }

  //funciones
  return (
    <>
      {historia === null ? (
        <p className="text-3xl mt-5 dark:text-white">Cargando...</p>
      ) : (
        <>
          <div>
            <h2 className="font-inter text-3xl font-semibold">
              Historia Clínica
            </h2>
            <hr className=" h-px my-2 bg-gray-300 border-0 dark:bg-gray-700 shadow-lg" />
          </div>
          <Paciente paciente={historia.historia.paciente} />
          <div className=" p-4">
            <div className="border rounded-md p-3 shadow-md bg-zinc-100 dark:bg-stone-800 dark:border-stone-700">
              <Stepp historia={historia.historia} consultaId={consultaId} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HistoriaForm;
