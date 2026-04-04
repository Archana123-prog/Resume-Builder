import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumePreview({ data }) {
  const resumeRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("resume.pdf");
  };

  return (
    <div className="preview-section">
      <div className="preview" ref={resumeRef}>
        <h2>{data.name}</h2>
        <p>{data.email} | {data.phone}</p>

        <h3>Education</h3>
        <p>{data.education}</p>

        <h3>Skills</h3>
        <p>{data.skills}</p>

        <h3>Experience</h3>
        <p>{data.experience}</p>
      </div>

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default ResumePreview;