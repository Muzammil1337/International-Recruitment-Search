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

import axios from 'axios';

const steps = [
  { title: "Personal Information", content: <PersonalInfoForm /> },
  { title: "Summary", content: <UserSummaryForm /> },
  { title: "Work Experience", content: <WorkExperienceForm /> },
  { title: "Education", content: <EducationForm /> },
  { title: "Skills", content: <UserSkillsForm /> },
];


const JobSeekerForm = () => {
  const { currentStepIndex, step, next, prev,goTo } = UseMultiForm(steps);
  const { data, updateUserInformation } = useContext(UserFormContext);

  const calculateProgress = () => {
    return (currentStepIndex + 1) / steps.length;
  };
  const { AddToDatabase } = useContext(UserFormContext);
  const { id } = useContext(AuthContext);
  const API_URL = 'https://resumeapi-git-main-muzammils-projects-766d0e6c.vercel.app/process';


  const generateResume = async (prompt,email) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      var resumeContent = data.result;
      let jsonObject = JSON.parse(resumeContent);
      console.log(jsonObject);
      const dataR = {
        resume: resumeContent,
        email: email
      };
    
      try {
        const response = await fetch('https://resumeapi-git-main-muzammils-projects-766d0e6c.vercel.app/add_resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataR)
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
           // Generate HTML content
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
      <h1>${jsonObject.contact_information.name}</h1>
      <div class="contact-info">
        <p>Email: ${jsonObject.contact_information.email}</p>
        <p>Phone: ${jsonObject.contact_information.phone}</p>
        <p>Address: ${jsonObject.contact_information.address}</p>
        <p>Website: <a href="${jsonObject.contact_information.website}">${jsonObject.contact_information.website}</a></p>
        <p>GitHub: <a href="${jsonObject.contact_information.github}">${jsonObject.contact_information.github}</a></p>
      </div>

      <div class="section">
        <h2 class="section-title">Summary</h2>
        <p>${jsonObject.summary}</p>
      </div>

      <div class="section">
        <h2 class="section-title">Work Experience</h2>
        ${jsonObject.work_experience.map(exp => `
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
        ${jsonObject.education.map(edu => `
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
          ${jsonObject.skills.map(skill => `<li>${skill}</li>`).join('')}
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
        alert("CV Successfully Created and Exported");
        goTo(0);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    
      } catch (error) {
        alert("AI Server too much busy or overload");
        console.error('Error fetching data:', error);
      }
    };
  

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (currentStepIndex === steps.length - 1) {
      const prompt = `ME:
      ME:       Name: muzammil      Email: muzzammilayoub@gmail.com      Phone: 121323123123      Address: ABC Road      Website: www.muzammil.com      GitHub: www.github.com/muzammil      LinkedIn:       Summary:      I am a freelance developer      Professional Experience:            Fiverr      Level 2 Seller      01/07/2024 - 29/07/2024      - Doing freelancing on fiverr for 1 year            Education:            ABC University      BSCS      01/07/2024 - 29/07/2024            Skills:      - Programming      make ATS resume of around 1500 words for it and and cover these headings       -Contact Information      -Summary or Objective (optional)      -Work Experience      -Education      -Skills      Generate ATS CV of about 800 words for above data in json format and add more details in it like details about expereince and extended summary, details about skills and institution      
      Assistant: Here is your CV data in json format 
      {
      "contact_information": {
        "name": "Muzammil",
        "email": "muzzammilayoub@gmail.com",
        "phone": "121-323-123123",
        "address": "ABC Road",
        "website": "http://www.muzammil.com",
        "github": "http://www.github.com/muzammil",
        "linkedin": ""
      },
      "summary": "I am a dedicated and highly motivated freelance developer with over a year of experience on Fiverr as a Level 2 Seller. Skilled in various programming languages and technologies, I have successfully delivered numerous projects, ensuring client satisfaction and quality results. My strong technical skills, coupled with effective communication and problem-solving abilities, make me a valuable asset in any development team.",
      "work_experience": [
        {
          "company": "Fiverr",
          "position": "Level 2 Seller",
          "start_date": "01/07/2023",
          "end_date": "29/07/2024",
          "responsibilities": [
            "Delivered high-quality freelance projects to clients across various industries.",
            "Maintained a high level of client satisfaction, resulting in positive reviews and repeat business.",
            "Managed project timelines and deliverables efficiently, ensuring timely completion of tasks.",
            "Collaborated with clients to understand their requirements and provide customized solutions.",
            "Developed and maintained strong professional relationships with clients."
          ]
        }
      ],
      "education": [
        {
          "institution": "ABC University",
          "degree": "Bachelor of Science in Computer Science (BSCS)",
          "start_date": "01/07/2020",
          "end_date": "29/07/2024",
          "details": [
            "Graduated with honors, achieving a GPA of 3.8/4.0.",
            "Completed coursework in software development, data structures, algorithms, and database management.",
            "Participated in various coding competitions and hackathons, securing top positions.",
            "Worked on multiple academic projects, gaining hands-on experience in full-stack development."
          ]
        }
      ],
      "skills": [
        "Programming Languages: Python, Java, JavaScript, C++",
        "Web Development: HTML, CSS, React, Node.js",
        "Database Management: MySQL, MongoDB",
        "Version Control: Git, GitHub",
        "Problem-Solving: Strong analytical and debugging skills",
        "Communication: Excellent verbal and written communication skills",
        "Project Management: Ability to manage multiple projects simultaneously and meet deadlines"
      ]
    }
      Generate me another one with these details

      Name: ${data.PersonalInfo.name}
      Email: ${data.PersonalInfo.email}
      Phone: ${data.PersonalInfo.phone}
      Address: ${data.PersonalInfo.address}
      Website: ${data.PersonalInfo.website}
      GitHub: ${data.PersonalInfo.github}
      LinkedIn: ${data.PersonalInfo.linkedin}

      Summary:
      ${data.summary}

      Professional Experience:

      ${data.WorkExperience.map(exp => `
      ${exp.company}
      ${exp.position}
      ${new Date(exp.startDate).toLocaleDateString()} - ${new Date(exp.endDate).toLocaleDateString()}
      - ${exp.description}
      `).join('\n')}

      Education:

      ${data.Education.map(edu => `
      ${edu.institution}
      ${edu.degree}
      ${new Date(edu.startDate).toLocaleDateString()} - ${new Date(edu.endDate).toLocaleDateString()}
      `).join('\n')}

      Skills:
      ${data.Skills.map(skill => `- ${skill.name}`).join('\n')}
      make ATS resume of around 1500 words for it and and cover these headings 
      -Contact Information
      -Summary or Objective (optional)
      -Work Experience
      -Education
      -Skills
      Generate ATS CV of about 800 words for above data in json format and add more details in it like details about expereince and extended summary, details about skills and institution
      Assistant: Here is your CV data in json format
      
      `;
      generateResume(prompt,data.PersonalInfo.email);
      
      console.log(data);
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
