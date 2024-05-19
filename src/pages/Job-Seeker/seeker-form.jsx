import { Button } from "@nextui-org/react";
import UseMultiForm from "../../components/UseMultiForm";
import EducationForm from "./EducationForm";
import PersonalInfoForm from "./PersonalInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserFormContext } from "../../context/FormContext";
import UserSkillsForm from "./User-Skills";
import UserSummaryForm from "./User-Summary-Section";

const steps = [
  { title: "Personal Information", content: <PersonalInfoForm /> },
  { title: "Summary", content: <UserSummaryForm /> },
  { title: "Work Experience", content: <WorkExperienceForm /> },
  { title: "Education", content: <EducationForm /> },
  { title: "Skills", content: <UserSkillsForm /> },
];

const JobSeekerForm = () => {
  const { currentStepIndex, step, next, prev } = UseMultiForm(steps);

  const calculateProgress = () => {
    return (currentStepIndex + 1) / steps.length;
  };
  const { AddToDatabase } = useContext(UserFormContext);
  const { id } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStepIndex === steps.length - 1) {
      // Adjusted to check for the last step
      AddToDatabase(id);
    } else {
      next();
    }
  };
  return (
    <div className="border-2 rounded-lg md:w-full lg:w-[70%] flex flex-col items-center my-4 py-4">
      <h1 className="font-bold text-xl bg-gradient-to-tr from-pink-500 to-yellow-500 text-transparent bg-clip-text">
        Hello Job Seeker.
      </h1>
      <p className="lg:text-lg my-4 px-4 text-base">
        Fill the requirements in order to get your resume ready.
      </p>

      {/* Progress indicator as SVG circle */}
      <svg width="100" height="50" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${calculateProgress() * 283} ${
            283 - calculateProgress() * 283
          }`}
        />
      </svg>

      <h2 className="text-3xl my-4 bg-gradient-to-tr from-pink-500 to-yellow-500 p-4 rounded-lg text-white">
        {step.title}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        {step.content}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4 gap-6">
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            disabled={currentStepIndex === 0}
            onClick={prev}
          >
            Previous
          </Button>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            type="submit"
          >
            {currentStepIndex === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobSeekerForm;
