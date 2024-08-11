import { Button } from "@nextui-org/react";
import {useContext, useEffect, useState } from "react";
import JobSeekerForm from "./Job-Seeker/seeker-form";
import Employeer from "./Employer/Employeer";
import { AuthContext } from "../context/AuthContext";

const ResumeBuilder = () => {
  const [isClick, setIsClick] = useState(null);
  const { userEmail, isLogged } = useContext(AuthContext);
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    // Fetch the user's CVs when the component mounts
    const fetchCvs = async () => {
      try {
        const response = await fetch("https://resumeapi-git-main-muzammils-projects-766d0e6c.vercel.app/get_resume_by_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch CVs");
        }

        const data = await response.json();
        setCvs(data);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchCvs();
  }, []);

  const handleDownload = (cv) => {
    const resumeData = JSON.parse(cv.resume);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1, h2, h3 {
            margin-bottom: 0;
          }
          p, ul {
            margin-top: 5px;
            margin-bottom: 15px;
          }
          .contact-info p {
            margin: 5px 0;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${resumeData.contact_information.name}</h1>
        <div class="contact-info">
          <p>Email: ${resumeData.contact_information.email}</p>
          <p>Phone: ${resumeData.contact_information.phone}</p>
          <p>Address: ${resumeData.contact_information.address}</p>
          <p>Website: <a href="${resumeData.contact_information.website}">${resumeData.contact_information.website}</a></p>
          <p>GitHub: <a href="${resumeData.contact_information.github}">${resumeData.contact_information.github}</a></p>
        </div>

        <div class="section">
          <h2 class="section-title">Summary</h2>
          <p>${resumeData.summary}</p>
        </div>

        <div class="section">
          <h2 class="section-title">Work Experience</h2>
          ${resumeData.work_experience.map(exp => `
            <div>
              <h3>${exp.position} at ${exp.company}</h3>
              <p>${exp.start_date} - ${exp.end_date}</p>
              <ul>
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2 class="section-title">Education</h2>
          ${resumeData.education.map(edu => `
            <div>
              <h3>${edu.degree} from ${edu.institution}</h3>
              <p>${edu.start_date} - ${edu.end_date}</p>
              <ul>
                ${edu.details.map(detail => `<li>${detail}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2 class="section-title">Skills</h2>
          <ul>
            ${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
      </body>
      </html>
    `;

    // Convert HTML to a blob
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a download link for the HTML file
    const htmlLink = document.createElement('a');
    htmlLink.href = URL.createObjectURL(blob);
    htmlLink.download = 'resume.html';
    htmlLink.textContent = 'Download your resume (HTML)';
    htmlLink.click();
  };


  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-4xl text-center font-bold antialiased my-4">
        Welcome to Resume builder
      </h1>
      <p className="text-lg font-semibold">
        Here you can build your own resume.
      </p>
      <div className="space-x-4">
      {cvs.length > 0 && (
        <div className="w-full px-4 mb-4">
          <h2 className="text-2xl font-bold">Your Recent Uploaded CVs</h2>
          <ul>
            {cvs.map((cv, index) => (
              <li key={index}>
                <a href="#" className="cv-link" onClick={() => handleDownload(cv)}>
                  {cv.email}'s CV ({index+1})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

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
