import React, { useState } from "react";

const Stepp2 = () => {
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
      <div>
        <ul aria-label="Steps" className="flex items-center">
          {stepsLine.stpesCount.map((item, idx) => (
            <li
              aria-current={stepsLine.currentStep == idx + 1 ? "step" : false}
              className="flex-1 last:flex-none flex items-center"
              key={idx}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex-none flex items-center justify-center dark:border-indigo-500 ${
                  stepsLine.currentStep > idx + 1
                    ? "bg-sky-300 border-sky-400 dark:bg-indigo-400 dark:border-indigo-500"
                    : "" || stepsLine.currentStep == idx + 1
                    ? "border-sky-400 dark:border-indigo-500"
                    : ""
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full bg-sky-400 dark:bg-indigo-400 ${
                    stepsLine.currentStep != idx + 1 ? "hidden" : ""
                  }`}
                ></span>
                {stepsLine.currentStep > idx + 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white dark:text-indigo-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <hr
                className={`w-full border dark:border-indigo-400 ${
                  idx + 1 == stepsLine.stpesCount.length
                    ? "hidden"
                    : "" || stepsLine.currentStep > idx + 1
                    ? "border-sky-400 dark:border-indigo-500"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* contenido */}
      <div>
        {step === 1 && <div>step 1</div>}
        {step === 2 && <div>step 2</div>}
        {step === 3 && <div>step 3</div>}
        {step === 4 && <div>step 4</div>}
      </div>
      {/* botones */}
      <div>
        {step === 1 && (
          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleNext()}
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Siguiente
            </button>
          </div>
        )}
        {step >= 2 && step < stepsLine.stpesCount.length && (
          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleBack()}
              className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-md"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => handleNext()}
              className="ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-2 rounded-md"
            >
              Siguiente
            </button>
          </div>
        )}
        {step === stepsLine.stpesCount.length && (
          <>
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleBack()}
                className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-2 rounded-md"
              >
                Atrás
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stepp2;
