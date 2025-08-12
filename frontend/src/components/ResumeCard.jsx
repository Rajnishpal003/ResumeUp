import React from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }) => {
  if (!resume) return null;

  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const resumeUrl = imagePath; // directly use imagePath

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header flex justify-between items-center">
        <div className="flex flex-col gap-2">
          {companyName ? (
            <h2 className="!text-black font-bold break-words">{companyName}</h2>
          ) : null}
          {jobTitle ? (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          ) : null}
          {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
