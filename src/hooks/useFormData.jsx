import { useState } from "react";

const useFormData = () => {
  const [formData, setFormData] = useState({
    personalInfo: {}, // Initial state for personal info
    workExperience: [], // Array for work experiences
    education: [], // Array for education entries
  });

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data, // Update specific step's data
    }));
  };

  return { formData, updateFormData };
};

export default useFormData;
