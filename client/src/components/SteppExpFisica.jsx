import React, { useState } from "react";
import "./../layouts/css/additional-styles/stepperExFisico.css";
import CraneoFForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/CraneoFForm";
import OrejasForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/OrejasForm";
import OjosForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/OjosForm";
import NarizForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/NarizForm";
import MaxManForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/MaxManForm";
import BocaForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/BocaForm";
import CuelloForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/CuelloForm";
import ToraxForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/ToraxForm";
import ColumnaForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/ColumnaForm";
import AbdomenForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/AbdomenForm";
import MiembrosForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/MiembrosForm";
import GenitalesForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/GenitalesForm";
import TejidoForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/TejidoForm";
import MusculaturaForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/MusculaturaForm";
import PielAnexosForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/PielAnexosForm";
import ExNeurologicoForm from "./../views/HistoriaComponents/HistoriaForms/ExploracionFForms/ExNeurologicoForm";

const Stepp = ({ expFisicaId }) => {
  const [step, setStep] = useState(1);
  const [stepsLine, setStepLine] = useState({
    stpesCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    currentStep: 1,
  });
  const text = [
    "Craneo-Facial",
    "Orejas",
    "Ojos",
    "Nariz",
    "Maxilar y Mandíbula",
    "Boca",
    "Cuello",
    "Tórax",
    "Columna",
    "Abdomen",
    "Miembros",
    "Genitales Externos",
    "Tejido Celular Subcutáneo",
    "Musculatura",
    "Piel y Anexos",
    "Exámen Neurológico",
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
      <div className="numbersExp">
        {stepsLine.stpesCount.map((_, index) => (
          <React.Fragment key={`Step ${index + 1}`}>
            <div
              className={
                step === index + 1
                  ? "activeExp dark:bg-[#6A99CB]"
                  : "dark:bg-zinc-500"
              }
              onClick={() => clickOption(index + 1)}
            >
              <span className=" max-lg:font-light">{text[index]}</span>
            </div>
            <hr
              className={`w-5 mt-auto mb-auto border dark:border-indigo-400 ${
                index + 1 == stepsLine.stpesCount.length
                  ? "hidden"
                  : "" || stepsLine.currentStep > index + 1
                  ? " dark:bg-emerald-700 shadow-lg h-1 bg-emerald-500 border-emerald-400 dark:border-emerald-500"
                  : ""
              }`}
            />
          </React.Fragment>
        ))}
      </div>

      {/* contenido */}
      <div>
        {step === 1 && <CraneoFForm expFisicaId={expFisicaId} />}
        {step === 2 && <OrejasForm expFisicaId={expFisicaId} />}
        {step === 3 && <OjosForm expFisicaId={expFisicaId} />}
        {step === 4 && <NarizForm expFisicaId={expFisicaId} />}
        {step === 5 && <MaxManForm expFisicaId={expFisicaId} />}
        {step === 6 && <BocaForm expFisicaId={expFisicaId} />}
        {step === 7 && <CuelloForm expFisicaId={expFisicaId} />}
        {step === 8 && <ToraxForm expFisicaId={expFisicaId} />}
        {step === 9 && <ColumnaForm expFisicaId={expFisicaId} />}
        {step === 10 && <AbdomenForm expFisicaId={expFisicaId} />}
        {step === 11 && <MiembrosForm expFisicaId={expFisicaId} />}
        {step === 12 && <GenitalesForm expFisicaId={expFisicaId} />}
        {step === 13 && <TejidoForm expFisicaId={expFisicaId} />}
        {step === 14 && <MusculaturaForm expFisicaId={expFisicaId} />}
        {step === 15 && <PielAnexosForm expFisicaId={expFisicaId} />}
        {step === 16 && <ExNeurologicoForm expFisicaId={expFisicaId} />}
      </div>
      {/* botones prueba */}
      <div className="buttonsExp">
        <button
          className={step > 1 ? "activeExp dark:bg-[#7077A1]" : "noactiveExp"}
          onClick={() => handleBack()}
        >
          <span>Atrás</span>
        </button>
        <button
          className={
            step < stepsLine.stpesCount.length ? "activeExp dark:bg-[#7077A1]" : "noactiveExp"
          }
          onClick={() => handleNext()}
        >
          <span>Siguiente</span>
        </button>
      </div>
    </div>
  );
};

export default Stepp;
