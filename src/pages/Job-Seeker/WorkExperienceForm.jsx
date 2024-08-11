import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { UserFormContext } from "../../context/FormContext";

const WorkExperienceForm = () => {
  const { data, updateUserInformation } = useContext(UserFormContext);

  const handleExperienceChange = (event, index) => {
    const { name, value } = event.target;
    updateUserInformation({
      WorkExperience: data.WorkExperience.map((experience, i) =>
        i === index ? { ...experience, [name]: value } : experience
      ),
    });
  };

  const addWorkExperience = () => {
    updateUserInformation({
      WorkExperience: [
        ...data.WorkExperience,
        {
          company: "",
          position: "",
          startDate: new Date(),
          endDate: null,
          description: "",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    updateUserInformation({
      WorkExperience: data.WorkExperience.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="lg:w-1/2 w-[80%] my-4">
      {data.WorkExperience.map((experience, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg mb-2 py-2 font-bold">
            Work Experience {index + 1}
          </h2>
          <div className="space-y-6">
            {/* Company */}
            <label
              htmlFor={`company-${index}`}
              className="relative block w-full"
            >
              <input
                type="text"
                id={`company-${index}`}
                name="company"
                value={experience.company}
                onChange={(event) => handleExperienceChange(event, index)}
                className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
                required
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform peer-focus:scale-0">
                Company:
              </span>
            </label>
            {/* Position */}
            <label
              htmlFor={`position-${index}`}
              className="relative block w-full"
            >
              <input
                type="text"
                id={`position-${index}`}
                name="position"
                value={experience.position || ""}
                onChange={(event) => handleExperienceChange(event, index)}
                className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform peer-focus:scale-0 ">
                Position:
              </span>
            </label>
            {/* Role-description */}
            <label
              htmlFor={`startDate-${index}`}
              className="relative block w-full"
            >
              <input
                type="text"
                id={`description-${index}`}
                name="description"
                value={experience.description || ""}
                onChange={(event) => handleExperienceChange(event, index)}
                className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform peer-focus:scale-0">
                Description
              </span>
            </label>
            {/* Start Date */}
            <label
              htmlFor={`startDate-${index}`}
              className="relative block w-full"
            >
              <input
                type="date"
                id={`startDate-${index}`}
                name="startDate"
                value={experience.startDate || ""}
                onChange={(event) => handleExperienceChange(event, index)}
                className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform peer-focus:scale-0">
                Start Date:
              </span>
            </label>
            {/* End Date */}
            <label
              htmlFor={`startDate-${index}`}
              className="relative block w-full"
            >
              <input
                type="date"
                id={`endDate-${index}`}
                name="endDate"
                value={experience.endDate || ""}
                onChange={(event) => handleExperienceChange(event, index)}
                className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
              />
              <span className="absolute left-2 top-0 -translate-y-1/2 scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform peer-focus:scale-0">
                End Date:
              </span>
            </label>
          </div>

          <Button
            onClick={() => removeWorkExperience(index)}
            color="error"
            auto
          >
            Remove Experience
          </Button>
        </div>
      ))}
      <Button onClick={addWorkExperience} color="success" auto>
        Add Experience
      </Button>
    </div>
  );
};

export default WorkExperienceForm;
