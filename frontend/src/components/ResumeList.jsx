import React from "react";
import ResumeCard from "./ResumeCard";

const ResumeList = ({ resumes }) => {
  if (!resumes || resumes.length === 0) {
    return <p>No resumes to display.</p>;
  }

  return (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
};

export default ResumeList;
