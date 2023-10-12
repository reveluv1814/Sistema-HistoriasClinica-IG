import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import historiaService from "./../../../services/historiaService";
import Paciente from "./../Pacientes";
import Resumenes from "./../Cita";

function HistoriaForm() {
  const { id } = useParams();
  //estados
  const [historia, setHistoria] = useState(null);

  //funcion que hace get de la historia
  useEffect(() => {
    const getHistoria = async () => {
      try {
        const historiaFetch = await historiaService.historiaFormList(id);
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
      <div>HistoriaForm</div>
      <div>
        el id es ={">"} {id}{" "}
      </div>
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
          <Formik
            enableReinitialize
            initialValues={historiaValue}
            //validationSchema={validationSchema}
            //onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              touched,
              isValidating,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit} className="flex flex-col px-7 ">
                <Field type="date" />
                <p>los{JSON.stringify(historiaValue)}</p>
              </Form>
            )}
          </Formik>
          <Resumenes citas={historia.historia.citas}/>
        </>
      )}
    </>
  );
}

export default HistoriaForm;
