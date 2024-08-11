import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { calculateMonths, calculateYears } from "../lib/lib";
import bard from "../assets/bard.gif";
export default function MyResume() {
  const { data: contextData, loadData } = useContext(AuthContext); // Get initial data
  const [data, setData] = useState(contextData); // Local state for data

  useEffect(() => {
    // Update local state when data from context changes
    if (!loadData && contextData) {
      setData(contextData);
    }
  }, [contextData, loadData]);

  if (loadData || !data || !data.PersonalInfo) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src={bard} alt="" className="w-10 h-10 animate-pulse" />
      </div>
    );
  }

  const spanText = "text-sm font-medium text-slate-700";
  const linkText = "hover:text-blue-500 hover:underline";
  const paraText = "text-sm";

  const { PersonalInfo, summary, Skills, WorkExperience, Education } = data;

  return (
    <div id="resume" className="container mx-auto max-w-3xl px-8 py-4 bg-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {PersonalInfo.name}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 text-center text-gray-600 text-sm">
          <p className={paraText}>
            <span className={spanText}>Contact No:</span> {PersonalInfo.phone}
          </p>
          <p className={paraText}>
            <span className={spanText}>Email:</span> {data.PersonalInfo.email}
          </p>
          <p className={paraText}>
            <span className={spanText}>Address:</span> {PersonalInfo.address}
          </p>

          <p className={paraText}>
            <span className={spanText}>Website:</span>{" "}
            <button className={linkText}>{PersonalInfo.website}</button>
          </p>
          <p className={paraText}>
            <span className={spanText}>Github:</span>{" "}
            <button className={linkText}>{PersonalInfo.github}</button>
          </p>
          <p className={paraText}>
            <span className={spanText}>LinkedIn:</span>{" "}
            <button className={linkText}>{PersonalInfo.linkedIn}</button>
          </p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold uppercase mb-2">
          Summary Statement
        </h2>
        <p className={paraText}>
          {/* Your summary statement goes here */}
          {summary}
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
              {Skills.map((skills) => (
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
        {WorkExperience.map((exp, index) => (
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
        {Education.map((edu, index) => (
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
