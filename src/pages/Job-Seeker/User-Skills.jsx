import { useContext } from "react";
import { UserFormContext } from "../../context/FormContext";
import { Button } from "@nextui-org/react";

export default function UserSkillsForm() {
  const { data, updateUserInformation } = useContext(UserFormContext);

  const handleAddSkills = () => {
    updateUserInformation({
      Skills: [...data.Skills, { name: "" }],
    });
  };

  const handleSkillsChange = (event, index) => {
    const { name, value } = event.target;
    updateUserInformation({
      Skills: data.Skills.map((skill, i) =>
        i === index ? { ...skill, [name]: value } : skill
      ),
    });
  };

  const handleRemoveSkills = (index) => {
    if (data.Skills.length > 1) {
      updateUserInformation({
        Skills: data.Skills.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="lg:w-1/2 w-[80%] my-4">
      {data.Skills.map((skill, index) => (
        <div key={index} className="mb-4">
          <h1 className="text-lg pb-6 font-bold">Skills {index + 1}</h1>
          <label htmlFor={`skills-${index}`} className="relative block w-full">
            <input
              type="text"
              id={`skills-${index}`}
              name="name"
              value={skill.name}
              onChange={(event) => handleSkillsChange(event, index)}
              className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
            />
            <span
              className="absolute left-2 top-0 -translate-y-1/2
                scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
                peer-focus:scale-0"
            >
              Skills Name:
            </span>
          </label>

          <br />
          {index > 0 && (
            <Button onClick={() => handleRemoveSkills(index)} color="danger">
              Remove Skills
            </Button>
          )}
        </div>
      ))}
      <Button onClick={handleAddSkills} color="success">
        Add Skills
      </Button>
    </div>
  );
}
