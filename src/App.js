import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: ""
  });

  return (
    <div className="container">
      <h1>Resume Builder</h1>

      <div className="main">
        <ResumeForm data={data} setData={setData} />
        <ResumePreview data={data} />
      </div>
    </div>
  );
}

export default App;