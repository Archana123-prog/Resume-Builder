import React, { useState, useRef } from 'react';
import { generateSummary, generateJobDescription, suggestSkills, generateProjectDescription } from './geminiService';

const TEMPLATES = [
  { id: 'modern', label: 'Modern', color: '#2563eb' },
  { id: 'classic', label: 'Classic', color: '#1a1a1a' },
  { id: 'minimal', label: 'Minimal', color: '#6b7280' },
  { id: 'bold', label: 'Bold', color: '#dc2626' },
  { id: 'elegant', label: 'Elegant', color: '#7c3aed' },
  { id: 'professional', label: 'Professional', color: '#059669' },
  { id: 'creative', label: 'Creative', color: '#f59e0b' },
  { id: 'tech', label: 'Tech', color: '#0891b2' },
  { id: 'executive', label: 'Executive', color: '#7c2d12' },
  { id: 'simple', label: 'Simple', color: '#64748b' },
];

const SECTIONS = ['Personal', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications'];

export default function ResumeForm({ data, setData, activeTemplate, setActiveTemplate }) {
  const [section, setSection] = useState('Personal');
  const [loading, setLoading] = useState({});
  const photoRef = useRef();

  const update = (path, value) => {
    setData(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = Array.isArray(obj[keys[i]]) ? [...obj[keys[i]]] : { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateList = (key, index, field, value) => {
    setData(prev => {
      const arr = [...prev[key]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };

  const addItem = (key, template) => {
    setData(prev => ({
      ...prev,
      [key]: [...prev[key], { id: Date.now(), ...template }]
    }));
  };

  const removeItem = (key, id) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(i => i.id !== id)
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update('personal.photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const generatePersonalSummary = async () => {
    setLoading(prev => ({ ...prev, summary: true }));
    try {
      const summary = await generateSummary(data.personal, data.experience, data.skills);
      update('personal.summary', summary);
    } catch (error) {
      const errorMsg = error.message || 'Failed to generate summary';
      alert(`❌ ${errorMsg}\n\nMake sure your API key is valid and the Generative AI API is enabled.`);
    }
    setLoading(prev => ({ ...prev, summary: false }));
  };

  const generateExperienceDescription = async (index) => {
    const exp = data.experience[index];
    setLoading(prev => ({ ...prev, [`exp-${exp.id}`]: true }));
    try {
      const description = await generateJobDescription(exp, data.skills);
      updateList('experience', index, 'description', description);
    } catch (error) {
      const errorMsg = error.message || 'Failed to generate job description';
      alert(`❌ ${errorMsg}\n\nMake sure your API key is valid and the Generative AI API is enabled.`);
    }
    setLoading(prev => ({ ...prev, [`exp-${exp.id}`]: false }));
  };

  const generateSkillSuggestions = async () => {
    setLoading(prev => ({ ...prev, skills: true }));
    try {
      const suggestions = await suggestSkills(data.experience, data.skills);
      // Parse the suggestions and add them to skills
      const lines = suggestions.split('\n');
      const newSkills = [...data.skills];

      lines.forEach(line => {
        if (line.includes(':')) {
          const [category, items] = line.split(':');
          const trimmedCategory = category.trim();
          const trimmedItems = items.trim();

          // Check if category already exists
          const existingCategory = newSkills.find(skill => skill.category.toLowerCase() === trimmedCategory.toLowerCase());
          if (existingCategory) {
            // Append to existing category
            const currentItems = existingCategory.items ? existingCategory.items.split(', ') : [];
            const newItems = trimmedItems.split(', ');
            const combined = [...new Set([...currentItems, ...newItems])].join(', ');
            existingCategory.items = combined;
          } else {
            // Add new category
            newSkills.push({ id: Date.now() + Math.random(), category: trimmedCategory, items: trimmedItems });
          }
        }
      });

      setData(prev => ({ ...prev, skills: newSkills }));
    } catch (error) {
      const errorMsg = error.message || 'Failed to suggest skills';
      alert(`❌ ${errorMsg}\n\nMake sure your API key is valid and the Generative AI API is enabled.`);
    }
    setLoading(prev => ({ ...prev, skills: false }));
  };

  const generateProjectDesc = async (index) => {
    const proj = data.projects[index];
    setLoading(prev => ({ ...prev, [`proj-${proj.id}`]: true }));
    try {
      const description = await generateProjectDescription(proj);
      updateList('projects', index, 'description', description);
    } catch (error) {
      const errorMsg = error.message || 'Failed to generate project description';
      alert(`❌ ${errorMsg}\n\nMake sure your API key is valid and the Generative AI API is enabled.`);
    }
    setLoading(prev => ({ ...prev, [`proj-${proj.id}`]: false }));
  };

  return (
    <aside className="form-panel">
      {/* Template Switcher */}
      <div className="template-switcher">
        <div className="section-label">🎨 Template</div>
        <div className="template-grid">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              className={`template-card ${activeTemplate === t.id ? 'active' : ''}`}
              style={{ '--tcolor': t.color }}
              onClick={() => setActiveTemplate(t.id)}
            >
              <span className="template-dot" style={{ background: t.color }} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Nav */}
      <nav className="section-nav">
        {SECTIONS.map(s => (
          <button
            key={s}
            className={`section-nav-btn ${section === s ? 'active' : ''}`}
            onClick={() => setSection(s)}
          >
            {s}
          </button>
        ))}
      </nav>

      {/* Sections */}
      <div className="form-body">

        {/* PERSONAL */}
        {section === 'Personal' && (
          <div className="form-section">
            <div className="photo-upload-area" onClick={() => photoRef.current.click()}>
              {data.personal.photo
                ? <img src={data.personal.photo} alt="profile" className="photo-preview" />
                : <div className="photo-placeholder"><span>📷</span><br />Upload Photo</div>
              }
              <input ref={photoRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
            </div>

            {[
              ['Name', 'name', 'text', 'Full Name'],
              ['Job Title', 'title', 'text', 'e.g. Frontend Developer'],
              ['Email', 'email', 'email', 'you@email.com'],
              ['Phone', 'phone', 'tel', '+1 234 567 8900'],
              ['Location', 'location', 'text', 'City, Country'],
              ['Website', 'website', 'url', 'https://yoursite.com'],
              ['LinkedIn', 'linkedin', 'url', 'linkedin.com/in/yourname'],
            ].map(([label, key, type, placeholder]) => (
              <div className="field-group" key={key}>
                <label>{label}</label>
                <input
                  type={type}
                  value={data.personal[key] || ''}
                  placeholder={placeholder}
                  onChange={e => update(`personal.${key}`, e.target.value)}
                />
              </div>
            ))}

            <div className="field-group">
              <label>Professional Summary</label>
              <textarea
                rows={4}
                value={data.personal.summary || ''}
                placeholder="Write a compelling 2-3 sentence summary..."
                onChange={e => update('personal.summary', e.target.value)}
              />
              <button
                className="ai-generate-btn"
                onClick={generatePersonalSummary}
                disabled={loading.summary}
              >
                {loading.summary ? '🤖 Generating...' : '🤖 Generate with AI'}
              </button>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {section === 'Experience' && (
          <div className="form-section">
            {data.experience.map((exp, i) => (
              <div className="list-card" key={exp.id}>
                <div className="card-header">
                  <span>Experience #{i + 1}</span>
                  {data.experience.length > 1 && (
                    <button className="remove-btn" onClick={() => removeItem('experience', exp.id)}>✕</button>
                  )}
                </div>
                {[
                  ['Company', 'company', 'Acme Corp'],
                  ['Job Title', 'role', 'Software Engineer'],
                  ['Start Date', 'startDate', 'Jan 2022'],
                  ['End Date', 'endDate', 'Present'],
                ].map(([label, key, ph]) => (
                  <div className="field-group" key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={exp[key] || ''}
                      placeholder={ph}
                      onChange={e => updateList('experience', i, key, e.target.value)}
                    />
                  </div>
                ))}
                <div className="field-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current || false}
                      onChange={e => updateList('experience', i, 'current', e.target.checked)}
                    />
                    {' '}Currently working here
                  </label>
                </div>
                <div className="field-group">
                  <label>Description (use • for bullet points)</label>
                  <textarea
                    rows={4}
                    value={exp.description || ''}
                    placeholder="• Led team of 5 engineers&#10;• Built REST APIs with Node.js&#10;• Improved performance by 40%"
                    onChange={e => updateList('experience', i, 'description', e.target.value)}
                  />
                  <button
                    className="ai-generate-btn"
                    onClick={() => generateExperienceDescription(i)}
                    disabled={loading[`exp-${exp.id}`]}
                  >
                    {loading[`exp-${exp.id}`] ? '🤖 Generating...' : '🤖 Generate with AI'}
                  </button>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('experience', { company: '', role: '', startDate: '', endDate: '', current: false, description: '' })}>
              + Add Experience
            </button>
          </div>
        )}

        {/* EDUCATION */}
        {section === 'Education' && (
          <div className="form-section">
            {data.education.map((edu, i) => (
              <div className="list-card" key={edu.id}>
                <div className="card-header">
                  <span>Education #{i + 1}</span>
                  {data.education.length > 1 && (
                    <button className="remove-btn" onClick={() => removeItem('education', edu.id)}>✕</button>
                  )}
                </div>
                {[
                  ['Institution', 'institution', 'University Name'],
                  ['Degree', 'degree', 'Bachelor of Science'],
                  ['Field of Study', 'field', 'Computer Science'],
                  ['Start Date', 'startDate', '2018'],
                  ['End Date', 'endDate', '2022'],
                  ['GPA', 'gpa', '3.8 / 4.0'],
                ].map(([label, key, ph]) => (
                  <div className="field-group" key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={edu[key] || ''}
                      placeholder={ph}
                      onChange={e => updateList('education', i, key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })}>
              + Add Education
            </button>
          </div>
        )}

        {/* SKILLS */}
        {section === 'Skills' && (
          <div className="form-section">
            {data.skills.map((skill, i) => (
              <div className="list-card" key={skill.id}>
                <div className="card-header">
                  <span>Skill Group #{i + 1}</span>
                  {data.skills.length > 1 && (
                    <button className="remove-btn" onClick={() => removeItem('skills', skill.id)}>✕</button>
                  )}
                </div>
                <div className="field-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={skill.category || ''}
                    placeholder="e.g. Technical, Languages"
                    onChange={e => updateList('skills', i, 'category', e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={skill.items || ''}
                    placeholder="React, Node.js, Python, SQL"
                    onChange={e => updateList('skills', i, 'items', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('skills', { category: '', items: '' })}>
              + Add Skill Group
            </button>
            <button
              className="ai-generate-btn"
              onClick={generateSkillSuggestions}
              disabled={loading.skills}
              style={{ marginTop: '10px' }}
            >
              {loading.skills ? '🤖 Suggesting...' : '🤖 Suggest Skills with AI'}
            </button>
          </div>
        )}

        {/* PROJECTS */}
        {section === 'Projects' && (
          <div className="form-section">
            {data.projects.map((proj, i) => (
              <div className="list-card" key={proj.id}>
                <div className="card-header">
                  <span>Project #{i + 1}</span>
                  {data.projects.length > 1 && (
                    <button className="remove-btn" onClick={() => removeItem('projects', proj.id)}>✕</button>
                  )}
                </div>
                {[
                  ['Project Name', 'name', 'My Awesome App'],
                  ['Tech Stack', 'tech', 'React, Node.js, MongoDB'],
                  ['Live Link', 'link', 'https://github.com/...'],
                ].map(([label, key, ph]) => (
                  <div className="field-group" key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={proj[key] || ''}
                      placeholder={ph}
                      onChange={e => updateList('projects', i, key, e.target.value)}
                    />
                  </div>
                ))}
                <div className="field-group">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    value={proj.description || ''}
                    placeholder="What did you build and why?"
                    onChange={e => updateList('projects', i, 'description', e.target.value)}
                  />
                  <button
                    className="ai-generate-btn"
                    onClick={() => generateProjectDesc(i)}
                    disabled={loading[`proj-${proj.id}`]}
                  >
                    {loading[`proj-${proj.id}`] ? '🤖 Generating...' : '🤖 Generate with AI'}
                  </button>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('projects', { name: '', description: '', tech: '', link: '' })}>
              + Add Project
            </button>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {section === 'Certifications' && (
          <div className="form-section">
            {data.certifications.map((cert, i) => (
              <div className="list-card" key={cert.id}>
                <div className="card-header">
                  <span>Certification #{i + 1}</span>
                  {data.certifications.length > 1 && (
                    <button className="remove-btn" onClick={() => removeItem('certifications', cert.id)}>✕</button>
                  )}
                </div>
                {[
                  ['Name', 'name', 'AWS Solutions Architect'],
                  ['Issuer', 'issuer', 'Amazon Web Services'],
                  ['Date', 'date', 'March 2023'],
                  ['Credential Link', 'link', 'https://...'],
                ].map(([label, key, ph]) => (
                  <div className="field-group" key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={cert[key] || ''}
                      placeholder={ph}
                      onChange={e => updateList('certifications', i, key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('certifications', { name: '', issuer: '', date: '', link: '' })}>
              + Add Certification
            </button>
          </div>
        )}

      </div>
    </aside>
  );
}