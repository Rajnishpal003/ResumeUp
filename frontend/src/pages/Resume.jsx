import React from "react";
import { useLocation, Link } from "react-router-dom";
import Summary from "../Components/Summary";
import ATS from "../Components/ATS";
import Details from "../Components/Details";

const Resume = () => {
  const location = useLocation();
  const feedback = location.state?.feedback;

  if (!feedback) {
    return (
      <main className="p-6">
        <p>No feedback available. Please upload and analyze a resume first.</p>
        <Link to="/" className="text-blue-600 underline">Go to Upload</Link>
      </main>
    );
  }

  return (
    <main className="!pt-0 p-6 max-w-4xl mx-auto ">
      <nav className="resume-nav mb-6">
        <Link to="/upload" className="back-button flex items-center gap-2">
          <img src="/icons/back.svg" alt="back" className="w-4 h-4" />
          <span className="text-gray-800 text-sm font-semibold">Back to Upload</span>
        </Link>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Resume Review</h1>

      <Summary feedback={feedback} />
      <div className="my-8" />
      <ATS score={feedback.ATS.score} suggestions={feedback.ATS.suggestions} />
      <div className="my-8" />
      <Details feedback={feedback} />
    </main>
  );
};

export default Resume;
