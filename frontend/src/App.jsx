
import React , { useState } from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Home";
import ResumeList from "./Components/ResumeList";
import AuthPage from "./pages/AuthPage";
import Upload from "./pages/Upload";
import "./App.css"
import Resume from "./pages/Resume";
import FileUploader from "./Components/FileUploader";




export default function App() {
  const [username, setUser] = useState(null);

  const PrivateRoute = ({ children }) => {
    return username ? children : <Navigate to="/auth" />;
  };
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage onLogin={setUser} />} />
      <Route path="/" 
      element={
         <PrivateRoute> 
           <Home user={username} />  
            </PrivateRoute>
      } 
      />
      <Route path="/resumes" element={<ResumeList />} />
     
     <Route path="/upload" element={<Upload />} />
     <Route path="/f" element={<FileUploader />} />
     <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}

// ...
{/* <Route path="/upload" element={<Upload />} /> */}