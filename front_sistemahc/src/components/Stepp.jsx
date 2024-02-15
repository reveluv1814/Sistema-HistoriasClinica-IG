import React, { useState } from "react";
import "./../layouts/css/additional-styles/stepper.css";
import AntecedenteFForm from "./../views/HistoriaComponents/HistoriaForms/AntecedenteFForm";
import MotivoConsulta from "./../views/HistoriaComponents/HistoriaForms/MotivoConsulta";
import AntecedentesPForm from "./../views/HistoriaComponents/HistoriaForms/AntecedentesPForm";
import ComposicionFForm from "./../views/HistoriaComponents/HistoriaForms/ComposicionFForm";
import ArbolG from "./../views/HistoriaComponents/HistoriaForms/ArbolG";
import ExploracionFForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForm";
import FinalConsulta from "./../views/HistoriaComponents/HistoriaForms/FinalConsulta";

const Stepp = ({ historia, consultaId }) => {
  const [step, setStep] = useState(1);
  const [stepsLine, setStepLine] = useState({
    stpesCount: [1, 2, 3, 4, 5, 6, 7],
    currentStep: 1,
  });
  const text = [
    "Antecedentes Familiares",
    "Motivo de Consulta",
    "Antecedentes Personales",
    "Composición de la Familia",
    "Arbol Genealógico",
    "Examen Físico",
    "Final Consulta",
  ];
  const handleNext = () => {
    if (step < stepsLine.stpesCount.length) {
      setStep(step + 1);
      setStepLine((prevState) => ({
        ...prevState,
        currentStep: step + 1,
      }));
    }
    //console.log(step);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setStepLine((prevState) => ({
        ...prevState,
        currentStep: step - 1,
      }));
    }
    //console.log(step);
  };
  const clickOption = (index) => {
    setStep(index);
  };
  return (
    <div>
      {/* numeros de prueba */}
      <div className="numbers ">
        {stepsLine.stpesCount.map((_, index) => (
          <React.Fragment key={`Step ${index + 1}`}>
            <div
              className={step === index + 1 ? "active" : "dark:bg-zinc-500"}
              onClick={() => clickOption(index + 1)}
            >
              <span className="text-sm max-xl:text-xs max-lg:font-light">
                {text[index]}
              </span>
            </div>
            <hr
              className={`w-12 mt-6 border dark:border-indigo-400 ${
                index + 1 == stepsLine.stpesCount.length
                  ? "hidden"
                  : "" || stepsLine.currentStep > index + 1
                  ? " dark:bg-emerald-700 h-2 shadow-lg bg-emerald-500 border-emerald-400 dark:border-emerald-500"
                  : ""
              }`}
            />
          </React.Fragment>
        ))}
      </div>

      {/* contenido */}
      <div>
        {step === 1 && <AntecedenteFForm historiaId={historia.id} />}
        {step === 2 && <MotivoConsulta consultaId={consultaId} />}
        {step === 3 && <AntecedentesPForm historiaId={historia.id} />}
        {step === 4 && <ComposicionFForm historiaId={historia.id}/>}
        {step === 5 && <ArbolG historiaId={historia.id}/>}
        {step === 6 && <ExploracionFForm />}
        {step === 7 && <FinalConsulta />}
      </div>
      {/* botones prueba */}
      <div className="buttons">
        <button
          className={step > 1 ? "active" : "noactive"}
          onClick={() => handleBack()}
        >
          <span>Atrás</span>
        </button>
        <button
          className={step < stepsLine.stpesCount.length ? "active" : "noactive"}
          onClick={() => handleNext()}
        >
          <span>Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default Stepp;
