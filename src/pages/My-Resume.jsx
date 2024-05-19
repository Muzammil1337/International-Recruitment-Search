import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { calculateMonths, calculateYears } from "../lib/lib";

export default function MyResume() {
  const { data } = useContext(AuthContext);

  const spanText = "text-sm font-medium text-slate-700";
  const paraText = "text-sm";

  return (
    <div id="resume" className="container mx-auto max-w-3xl px-8 py-4 bg-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {data.PersonalInfo.name}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 text-center text-gray-600 text-sm">
          <p className={paraText}>
            <span className={spanText}>Contact No:</span>{" "}
            {data.PersonalInfo.phone}
          </p>
          <p className={paraText}>
            <span className={spanText}>Email:</span> {data.PersonalInfo.email}
          </p>
          <p className={paraText}>
            <span className={spanText}>Address:</span>{" "}
            {data.PersonalInfo.address}
          </p>

          <p className={paraText}>
            <span className={spanText}>Website:</span>{" "}
            {data.PersonalInfo.website}
          </p>
          <p className={paraText}>
            <span className={spanText}>Github:</span> {data.PersonalInfo.github}
          </p>
          <p className={paraText}>
            <span className={spanText}>LinkedIn:</span>{" "}
            {data.PersonalInfo.linkedIn}
          </p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold uppercase mb-2">
          Summary Statement
        </h2>
        <p className={paraText}>
          {/* Your summary statement goes here */}
          {data.summary}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold uppercase mb-2">
          Relevant Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-md font-medium mb-2">My Skills</h3>
            <ul className="list-disc ml-6">
              {/* Map over relevant skills here */}
              {data.Skills.map((skills) => (
                <li className={paraText} key={skills}>
                  {skills.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Add more skill categories as needed */}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold uppercase mb-2">Work History</h2>
        {data.WorkExperience.map((exp, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <div>
              <p className="font-medium">{exp.position}</p>
              <p className="text-sm text-gray-600">{exp.company}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-sm text-gray-600">
                {calculateMonths(exp.startDate, exp.endDate)} months
              </p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold uppercase mb-2">Education</h2>
        {data.Education.map((edu, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <div>
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="text-sm text-gray-600">
                {calculateYears(edu.startDate, edu.endDate)} years
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
