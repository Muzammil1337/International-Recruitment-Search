import { useState } from "react";
import html2pdf from "html2pdf.js";

const Employeer = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://resumeapi-git-main-muzammils-projects-766d0e6c.vercel.app/search_cvs_by_job_title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_title: jobTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch CVs");
      }

      const data = await response.json();
      setCvs(data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (cv) => {
    console.log(cv);
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
    <div className="border-2 rounded-lg w-[60%] h-[60%] flex flex-col items-center my-4 py-4">
      <h1 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Hello Employer.
      </h1>
      <p className="text-lg">
        Search for candidates using our ATS system.
      </p>

      <div className="my-4 w-full px-4">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title (e.g., Backend Developer)"
          className="border rounded px-2 py-1 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {cvs.length > 0 && (
        <div className="w-full px-4 mt-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <ul>
            {cvs.map((cv, index) => (
              <li key={index} className="my-2">
                <a href="#" className="cv-link" onClick={() => handleDownload(cv)}>
                  {cv.email}'s CV ({index + 1})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Employeer;
