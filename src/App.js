import React, { useState, useEffect } from 'react';
import './App.css';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

const defaultData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
    photo: null,
  },
  experience: [
    { id: 1, company: '', role: '', startDate: '', endDate: '', current: false, description: '' }
  ],
  education: [
    { id: 1, institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }
  ],
  skills: [
    { id: 1, category: 'Technical', items: '' },
    { id: 2, category: 'Soft Skills', items: '' },
  ],
  projects: [
    { id: 1, name: '', description: '', tech: '', link: '' }
  ],
  certifications: [
    { id: 1, name: '', issuer: '', date: '', link: '' }
  ],
};

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeBuilderData');
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem('resumeTemplate') || 'modern';
  });

  const [activeTab, setActiveTab] = useState('edit');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const toSave = { ...resumeData, personal: { ...resumeData.personal, photo: null } };
      localStorage.setItem('resumeBuilderData', JSON.stringify(toSave));
    } catch {}
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resumeTemplate', activeTemplate);
  }, [activeTemplate]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      setResumeData(defaultData);
      localStorage.removeItem('resumeBuilderData');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">ResumeForge</span>
          </div>
        </div>

        <nav className="header-tabs">
          <button
            className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <span>✏️</span> Edit
          </button>
          <button
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <span>👁️</span> Preview
          </button>
        </nav>

        <div className="header-actions">
          <button className="btn-save" onClick={handleSave}>
            {saved ? '✓ Saved!' : '💾 Save'}
          </button>
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-print" onClick={() => { setActiveTab('preview'); setTimeout(() => window.print(), 300); }}>
            🖨️ Export PDF
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'edit' ? (
          <div className="editor-layout">
            <ResumeForm
              data={resumeData}
              setData={setResumeData}
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
            />
            <div className="preview-panel">
              <div className="preview-label">Live Preview</div>
              <div className="preview-scroll">
                <ResumePreview data={resumeData} template={activeTemplate} />
              </div>
            </div>
          </div>
        ) : (
          <div className="fullscreen-preview">
            <ResumePreview data={resumeData} template={activeTemplate} fullscreen />
          </div>
        )}
      </main>
    </div>
  );
}