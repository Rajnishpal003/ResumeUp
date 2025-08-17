import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";

// Mapping function remains unchanged
const mapHuggingFaceResponseToFeedback = (hfResponse) => {
  const { candidate_labels: labels, scores } = hfResponse;

  const normScores = scores.map((s) => Math.round(s * 100));
  const defaultTips = [
    { type: "good", tip: "Relevant skills detected." },
    { type: "bad", tip: "Consider adding more industry keywords." },
  ];

  return {
    overallScore:
      normScores.length > 0
        ? Math.round(normScores.reduce((a, b) => a + b, 0) / normScores.length)
        : 0,
    toneAndStyle: { score: normScores[0] || 50, tips: defaultTips },
    content: { score: normScores[1] || 50, tips: defaultTips },
    structure: { score: normScores[2] || 50, tips: defaultTips },
    skills: { score: normScores[3] || 50, tips: defaultTips },
    ATS: { score: normScores[0] || 50, suggestions: defaultTips },
  };
};

const Upload = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Form inputs state
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setFeedback(null);
  };

  const extractTextFromPDF = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item) => item.str);
            text += strings.join(" ") + "\n";
          }
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
    });

  const apiToken = import.meta.env.VITE_HF_API_TOKEN;
  if (!apiToken) {
    console.error("API token missing! Check your .env file and restart dev server.");
  }

  const analyzeResume = async (text, jobTitleInput, jobDescriptionInput) => {
    setIsProcessing(true);
    setStatusText("Analyzing resume...");

    try {
      const candidateLabels = [];
      if (jobTitleInput.trim()) candidateLabels.push(jobTitleInput.trim());
      if (jobDescriptionInput.trim()) candidateLabels.push(jobDescriptionInput.trim());
      if (candidateLabels.length === 0) candidateLabels.push("software engineer");

      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: text,
            parameters: { candidate_labels: candidateLabels },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setFeedback({ error: data.error });
      } else if (data.labels && data.scores) {
        const mappedFeedback = mapHuggingFaceResponseToFeedback(data);
        setFeedback(mappedFeedback);
        navigate("/resume", { state: { feedback: mappedFeedback } });
      } else {
        setFeedback({ error: "Could not get proper analysis from API." });
      }
    } catch (error) {
      setFeedback({ error: "Failed to analyze resume: " + error.message });
    } finally {
      setIsProcessing(false);
      setStatusText("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a resume first!");
      return;
    }

    try {
      const text = await extractTextFromPDF(file);
      await analyzeResume(text, jobTitle, jobDescription);
    } catch (err) {
      setFeedback({ error: "Error processing resume: " + err.message });
    }
  };

  return (
    <main className="bg-[url('/images/bg-main1.jpg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" alt="Processing..." />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}

          {feedback?.error && (
            <div className="mt-6 bg-red-100 text-red-800 p-4 rounded">
              <strong>Error:</strong> {feedback.error}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
