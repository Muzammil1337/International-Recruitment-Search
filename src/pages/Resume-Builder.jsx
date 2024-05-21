import { Button } from "@nextui-org/react";
import { useState } from "react";
import JobSeekerForm from "./Job-Seeker/seeker-form";
import Employeer from "./Employer/Employeer";

const ResumeBuilder = () => {
  const [isClick, setIsClick] = useState(null);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-4xl text-center font-bold antialiased my-4">
        Welcome to Resume builder, Dear Arham
      </h1>
      <p className="text-lg font-semibold">
        Here you can build your own resume.
      </p>

      <div className="space-x-4">
        <Button color="primary" size="lg" onClick={() => setIsClick(0)}>
          Employeer
        </Button>
        <Button
          color="primary"
          variant="bordered"
          size="lg"
          onClick={() => setIsClick(1)}
        >
          Job Seeker
        </Button>
      </div>

      {isClick === 0 && <Employeer />}
      {isClick === 1 && <JobSeekerForm />}
    </div>
  );
};

export default ResumeBuilder;
