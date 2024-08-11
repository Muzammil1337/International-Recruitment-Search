import { useState } from "react";

const UseMultiForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const prev = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index) => {
    setCurrentStepIndex(index);
  };


  return { currentStepIndex, step: steps[currentStepIndex], next, prev, goTo };
};

export default UseMultiForm;
