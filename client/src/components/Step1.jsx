import React, { useState } from "react";
import "./../layouts/css/additional-styles/stepper.css";

const Stepp1 = () => {
  const [step, setStep] = useState(1);
  const [stepsLine, setStepLine] = useState({
    stpesCount: [1, 2, 3, 4],
    currentStep: 1,
  });
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
  return (
    <div>
      {/* numeros */}
      <div className="numbers">
        {stepsLine.stpesCount.map((_, index) => (
          <React.Fragment key={`Step ${index + 1}`}>
            <div
              
              className={step === index + 1 ? "active" : ""}
            >
              {index + 1}
            </div>
            <hr
            
              className={`w-full border dark:border-indigo-400 ${
                index + 1 == stepsLine.stpesCount.length
                  ? "hidden"
                  : "" || stepsLine.currentStep > index + 1
                  ? "border-sky-400 dark:border-indigo-500 h-2 bg-orange-500"
                  : ""
              }`}
            />
          </React.Fragment>
        ))}
      </div>
      {/* contenido */}
      <div>
        {step === 1 && <div>step 1 f</div>}
        {step === 2 && <div>step 2 f</div>}
        {step === 3 && <div>step 3 f</div>}
        {step === 4 && <div>step 4 f</div>}
      </div>
      {/* botones */}
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

export default Stepp1;
