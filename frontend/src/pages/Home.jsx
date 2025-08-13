import React, { useEffect, useState } from "react";
import { Link , } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ResumeList from "../Components/ResumeList";
import { resume as sampleResumes } from "../data/data"; // import your static resumes
import About from "./About"
export default function Home() {
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    // Just load from static data for now
    setResumeList(sampleResumes);
  }, []);

  return (
    <main className="bg-[url('/images/bg-main1.jpg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {resumeList.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {resumeList.length > 0 && (
          <ResumeList resumes={resumeList} />
        )}

        {resumeList.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
        <About/>
      </section>
    </main>
  );
}
