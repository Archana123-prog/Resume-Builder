import React from "react";

function ResumeForm({ data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="form">
      <h2>Enter Details</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <textarea name="education" placeholder="Education" onChange={handleChange} />
      <textarea name="skills" placeholder="Skills" onChange={handleChange} />
      <textarea name="experience" placeholder="Experience" onChange={handleChange} />
    </div>
  );
}

export default ResumeForm;