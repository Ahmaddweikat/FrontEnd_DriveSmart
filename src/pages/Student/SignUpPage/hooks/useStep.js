import { useState } from "react";

const useStep = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return { currentStep, handleNextStep, handleBackStep };
};

export default useStep;
