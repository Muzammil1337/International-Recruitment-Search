import { useContext } from "react";
import { UserFormContext } from "../../context/FormContext";
import { Button } from "@nextui-org/react";

const EducationForm = () => {
  const { data, updateUserInformation } = useContext(UserFormContext);

  const handleAddEducation = () => {
    updateUserInformation({
      Education: [
        ...data.Education,
        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    updateUserInformation({
      Education: data.Education.map((education, i) =>
        i === index ? { ...education, [name]: value } : education
      ),
    });
  };

  const handleRemoveEducation = (index) => {
    if (data.Education.length > 1) {
      updateUserInformation({
        Education: data.Education.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="lg:w-1/2 w-[80%] my-4">
      {data.Education.map((education, index) => (
        <div key={index} className="mb-4">
          <h1 className="text-lg pb-6 font-bold">Education {index + 1}</h1>
          <label
            htmlFor={`institution-${index}`}
            className="relative block w-full"
          >
            <input
              type="text"
              id={`institution-${index}`}
              name="institution"
              value={education.institution}
              onChange={(event) => handleEducationChange(event, index)}
              className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
            />
            <span
              className="absolute left-2 top-0 -translate-y-1/2
              scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
              peer-focus:scale-0
              "
            >
              Institution:
            </span>
          </label>

          <br />
          <label htmlFor={`degree-${index}`} className="relative block w-full">
            <input
              type="text"
              id={`degree-${index}`}
              name="degree"
              value={education.degree}
              onChange={(event) => handleEducationChange(event, index)}
              className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
            />
            <span
              className="absolute left-2 top-0 -translate-y-1/2
              scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
              peer-focus:scale-0
              "
            >
              Degree:
            </span>
          </label>

          <br />
          <label
            htmlFor={`startDate-${index}`}
            className="relative block w-full"
          >
            <input
              type="date"
              id={`startDate-${index}`}
              name="startDate"
              value={education.startDate}
              onChange={(event) => handleEducationChange(event, index)}
              className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
            />
            <span
              className="absolute left-2 top-0 -translate-y-1/2
              scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
              peer-focus:scale-0
              "
            >
              Start Date:
            </span>
          </label>

          <br />
          <label htmlFor={`endDate-${index}`} className="relative block w-full">
            <input
              type="date"
              id={`endDate-${index}`}
              name="endDate"
              value={education.endDate}
              onChange={(event) => handleEducationChange(event, index)}
              className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
            />
            <span
              className="absolute left-2 top-0 -translate-y-1/2
              scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
              peer-focus:scale-0
              "
            >
              End Date (Optional):
            </span>
          </label>

          <br />
          {index > 0 && (
            <Button onClick={() => handleRemoveEducation(index)} color="danger">
              Remove Education
            </Button>
          )}
        </div>
      ))}
      <Button onClick={handleAddEducation} color="success">
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;
