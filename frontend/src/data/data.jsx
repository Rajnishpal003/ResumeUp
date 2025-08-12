
import resume1Img from "../../public/images/resume_01.png";
import resume2Img from "../../public/images/resume_02.png";
import resume3Img from "../../public/images/resume_03.png";

export const resume = [
  { 
     
    id: "1",
    companyName: "Acme Corp",
    jobTitle: "Frontend Developer",
    imagePath: resume1Img,
    resumePath: "/resumes/resume1.pdf",
    feedback: {
      overallScore: 85,
      ATS: { score: 90, tips: [{ type: "good", tip: "Well-structured" }] },
      toneAndStyle: {
        score: 80,
        tips: [{ type: "improve", tip: "More concise", explanation: "Remove filler words" }]
      },
      content: { score: 85, tips: [] },
      structure: { score: 80, tips: [] },
      skills: { score: 88, tips: [] }
    }
  },
  {
    id: "2",
    companyName: "Acme Corp",
    jobTitle: "Frontend Developer",
    imagePath: resume2Img,
    resumePath: "/resumes/resume1.pdf",
    feedback: {
      overallScore: 80,
      ATS: { score: 90, tips: [{ type: "good", tip: "Well-structured" }] },
      toneAndStyle: {
        score: 80,
        tips: [{ type: "improve", tip: "More concise", explanation: "Remove filler words" }]
      },
      content: { score: 85, tips: [] },
      structure: { score: 80, tips: [] },
      skills: { score: 88, tips: [] }
    }
  },
  {
    id: "3",
    companyName: "Acme Corp",
    jobTitle: "Frontend Developer",
    imagePath: resume3Img,
    resumePath: "/resumes/resume1.pdf",
    feedback: {
      overallScore: 85,
      ATS: { score: 75, tips: [{ type: "good", tip: "Well-structured" }] },
      toneAndStyle: {
        score: 80,
        tips: [{ type: "improve", tip: "More concise", explanation: "Remove filler words" }]
      },
      content: { score: 85, tips: [] },
      structure: { score: 80, tips: [] },
      skills: { score: 88, tips: [] }
    }
  }
];
