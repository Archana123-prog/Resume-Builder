import React from 'react';
import './ResumePreview.css';

export default function ResumePreview({ data, template, fullscreen }) {
  const { personal, experience, education, skills, projects, certifications } = data;

  const formatDesc = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const clean = line.replace(/^•\s*/, '').trim();
      if (!clean) return null;
      return <li key={i}>{clean}</li>;
    }).filter(Boolean);
  };

  const hasContent = (arr) => arr && arr.some(item => Object.values(item).some(v => v && v !== item.id));

  return (
    <div className={`resume-wrapper template-${template} ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="resume-page" id="resume-page">

        {/* MODERN TEMPLATE */}
        {template === 'modern' && (
          <div className="modern-layout">
            <div className="modern-sidebar">
              {personal.photo && (
                <div className="modern-photo-wrap">
                  <img src={personal.photo} alt={personal.name} className="modern-photo" />
                </div>
              )}
              <div className="modern-name-block">
                <h1>{personal.name || 'Your Name'}</h1>
                <p className="modern-title">{personal.title || 'Job Title'}</p>
              </div>
              <div className="modern-contact">
                {personal.email && <div>✉ {personal.email}</div>}
                {personal.phone && <div>📞 {personal.phone}</div>}
                {personal.location && <div>📍 {personal.location}</div>}
                {personal.website && <div>🌐 {personal.website}</div>}
                {personal.linkedin && <div>in {personal.linkedin}</div>}
              </div>
              {hasContent(skills) && (
                <div className="modern-sidebar-section">
                  <h3>Skills</h3>
                  {skills.map(s => s.items && (
                    <div key={s.id} className="modern-skill-group">
                      {s.category && <div className="skill-cat">{s.category}</div>}
                      <div className="skill-pills">
                        {s.items.split(',').map((sk, i) => (
                          <span key={i} className="skill-pill">{sk.trim()}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {hasContent(certifications) && (
                <div className="modern-sidebar-section">
                  <h3>Certifications</h3>
                  {certifications.map(c => c.name && (
                    <div key={c.id} className="cert-item">
                      <div className="cert-name">{c.name}</div>
                      <div className="cert-meta">{c.issuer} {c.date && `· ${c.date}`}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modern-main">
              {personal.summary && (
                <section>
                  <h2 className="section-heading">Summary</h2>
                  <p className="summary-text">{personal.summary}</p>
                </section>
              )}
              {hasContent(experience) && (
                <section>
                  <h2 className="section-heading">Experience</h2>
                  {experience.map(exp => exp.company && (
                    <div key={exp.id} className="exp-item">
                      <div className="exp-header">
                        <div>
                          <div className="exp-role">{exp.role}</div>
                          <div className="exp-company">{exp.company}</div>
                        </div>
                        <div className="exp-dates">
                          {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      {exp.description && <ul className="exp-bullets">{formatDesc(exp.description)}</ul>}
                    </div>
                  ))}
                </section>
              )}
              {hasContent(education) && (
                <section>
                  <h2 className="section-heading">Education</h2>
                  {education.map(edu => edu.institution && (
                    <div key={edu.id} className="edu-item">
                      <div className="exp-header">
                        <div>
                          <div className="exp-role">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                          <div className="exp-company">{edu.institution}</div>
                        </div>
                        <div className="exp-dates">
                          {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                          {edu.gpa && <div>GPA: {edu.gpa}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}
              {hasContent(projects) && (
                <section>
                  <h2 className="section-heading">Projects</h2>
                  {projects.map(proj => proj.name && (
                    <div key={proj.id} className="proj-item">
                      <div className="proj-header">
                        <span className="proj-name">{proj.name}</span>
                        {proj.tech && <span className="proj-tech">{proj.tech}</span>}
                        {proj.link && <a href={proj.link} className="proj-link" target="_blank" rel="noreferrer">↗</a>}
                      </div>
                      {proj.description && <p className="proj-desc">{proj.description}</p>}
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        )}

        {/* CLASSIC TEMPLATE */}
        {template === 'classic' && (
          <div className="classic-layout">
            <div className="classic-header">
              {personal.photo && <img src={personal.photo} alt={personal.name} className="classic-photo" />}
              <div className="classic-header-info">
                <h1>{personal.name || 'Your Name'}</h1>
                <p className="classic-title">{personal.title}</p>
                <div className="classic-contact">
                  {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join('  |  ')}
                </div>
              </div>
            </div>
            <hr className="classic-rule" />
            {personal.summary && <><div className="classic-section-title">OBJECTIVE</div><p className="classic-text">{personal.summary}</p></>}
            {hasContent(experience) && (
              <>
                <div className="classic-section-title">EXPERIENCE</div>
                {experience.map(exp => exp.company && (
                  <div key={exp.id} className="classic-entry">
                    <div className="classic-entry-header">
                      <strong>{exp.role}</strong> — {exp.company}
                      <span className="classic-dates">{exp.startDate}{exp.startDate ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <ul className="classic-bullets">{formatDesc(exp.description)}</ul>}
                  </div>
                ))}
              </>
            )}
            {hasContent(education) && (
              <>
                <div className="classic-section-title">EDUCATION</div>
                {education.map(edu => edu.institution && (
                  <div key={edu.id} className="classic-entry">
                    <div className="classic-entry-header">
                      <strong>{edu.degree}</strong>{edu.field ? ` in ${edu.field}` : ''} — {edu.institution}
                      <span className="classic-dates">{edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}</span>
                    </div>
                    {edu.gpa && <div className="classic-text">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </>
            )}
            {hasContent(skills) && (
              <>
                <div className="classic-section-title">SKILLS</div>
                {skills.map(s => s.items && (
                  <div key={s.id} className="classic-text">
                    {s.category && <strong>{s.category}: </strong>}{s.items}
                  </div>
                ))}
              </>
            )}
            {hasContent(projects) && (
              <>
                <div className="classic-section-title">PROJECTS</div>
                {projects.map(proj => proj.name && (
                  <div key={proj.id} className="classic-entry">
                    <div className="classic-entry-header"><strong>{proj.name}</strong>{proj.tech && ` · ${proj.tech}`}</div>
                    {proj.description && <p className="classic-text">{proj.description}</p>}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* MINIMAL TEMPLATE */}
        {template === 'minimal' && (
          <div className="minimal-layout">
            <div className="minimal-header">
              <div>
                <h1>{personal.name || 'Your Name'}</h1>
                <p className="minimal-title">{personal.title}</p>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="minimal-photo" />}
            </div>
            <div className="minimal-contact">
              {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).join(' · ')}
            </div>
            {personal.summary && <p className="minimal-summary">{personal.summary}</p>}
            <div className="minimal-divider" />
            {hasContent(experience) && (
              <div className="minimal-section">
                <h2>Experience</h2>
                {experience.map(exp => exp.company && (
                  <div key={exp.id} className="minimal-entry">
                    <div className="minimal-entry-top">
                      <span className="minimal-role">{exp.role}, <em>{exp.company}</em></span>
                      <span className="minimal-dates">{exp.startDate}{exp.startDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <ul className="minimal-bullets">{formatDesc(exp.description)}</ul>}
                  </div>
                ))}
              </div>
            )}
            {hasContent(education) && (
              <div className="minimal-section">
                <h2>Education</h2>
                {education.map(edu => edu.institution && (
                  <div key={edu.id} className="minimal-entry">
                    <div className="minimal-entry-top">
                      <span className="minimal-role">{edu.degree}{edu.field ? `, ${edu.field}` : ''} — <em>{edu.institution}</em></span>
                      <span className="minimal-dates">{edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hasContent(skills) && (
              <div className="minimal-section">
                <h2>Skills</h2>
                {skills.map(s => s.items && (
                  <div key={s.id} className="minimal-skills-row">
                    {s.category && <span className="minimal-skill-cat">{s.category}:</span>}
                    <span>{s.items}</span>
                  </div>
                ))}
              </div>
            )}
            {hasContent(projects) && (
              <div className="minimal-section">
                <h2>Projects</h2>
                {projects.map(proj => proj.name && (
                  <div key={proj.id} className="minimal-entry">
                    <div className="minimal-entry-top">
                      <span className="minimal-role">{proj.name}{proj.tech && ` · ${proj.tech}`}</span>
                    </div>
                    {proj.description && <p className="minimal-proj-desc">{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ELEGANT TEMPLATE */}
        {template === 'elegant' && (
          <div className="elegant-layout">
            <div className="elegant-header">
              {personal.photo && <img src={personal.photo} alt={personal.name} className="elegant-photo" />}
              <div className="elegant-name">
                <h1>{personal.name || 'Your Name'}</h1>
                <div className="elegant-title">{personal.title}</div>
                <div className="elegant-contact">
                  {[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).join('  ·  ')}
                </div>
              </div>
            </div>
            {personal.summary && (
              <div className="elegant-summary-block">
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="elegant-columns">
              <div className="elegant-left">
                {hasContent(experience) && (
                  <div className="elegant-section">
                    <h2>Experience</h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="elegant-entry">
                        <div className="elegant-entry-title">{exp.role}</div>
                        <div className="elegant-entry-sub">{exp.company} &nbsp;·&nbsp; {exp.startDate}{exp.startDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                        {exp.description && <ul className="elegant-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="elegant-section">
                    <h2>Projects</h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="elegant-entry">
                        <div className="elegant-entry-title">{proj.name} {proj.tech && <span className="elegant-tech">· {proj.tech}</span>}</div>
                        {proj.description && <p className="elegant-desc">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="elegant-right">
                {hasContent(education) && (
                  <div className="elegant-section">
                    <h2>Education</h2>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="elegant-entry">
                        <div className="elegant-entry-title">{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                        <div className="elegant-entry-sub">{edu.institution} · {edu.endDate}</div>
                        {edu.gpa && <div className="elegant-desc">GPA: {edu.gpa}</div>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(skills) && (
                  <div className="elegant-section">
                    <h2>Skills</h2>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="elegant-entry">
                        {s.category && <div className="elegant-entry-title">{s.category}</div>}
                        <div className="elegant-skill-pills">
                          {s.items.split(',').map((sk, i) => <span key={i} className="elegant-pill">{sk.trim()}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="elegant-section">
                    <h2>Certifications</h2>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="elegant-entry">
                        <div className="elegant-entry-title">{c.name}</div>
                        <div className="elegant-entry-sub">{c.issuer} · {c.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PROFESSIONAL TEMPLATE */}
        {template === 'professional' && (
          <div className="professional-layout">
            <div className="professional-header">
              <div className="professional-header-content">
                <h1>{personal.name || 'Your Name'}</h1>
                <p className="professional-title">{personal.title || 'Professional Title'}</p>
                <div className="professional-contact">
                  {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(' | ')}
                </div>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="professional-photo" />}
            </div>
            {personal.summary && (
              <div className="professional-section">
                <h2>Professional Summary</h2>
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="professional-content">
              <div className="professional-left">
                {hasContent(experience) && (
                  <div className="professional-section">
                    <h2>Work Experience</h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="professional-entry">
                        <div className="professional-entry-header">
                          <div>
                            <div className="professional-role">{exp.role}</div>
                            <div className="professional-company">{exp.company}</div>
                          </div>
                          <div className="professional-dates">
                            {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                        {exp.description && <ul className="professional-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="professional-section">
                    <h2>Projects</h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="professional-project">
                        <div className="professional-project-header">
                          <span className="professional-project-name">{proj.name}</span>
                          {proj.tech && <span className="professional-project-tech">({proj.tech})</span>}
                        </div>
                        {proj.description && <p className="professional-project-desc">{proj.description}</p>}
                        {proj.link && <a href={proj.link} className="professional-link" target="_blank" rel="noreferrer">View Project</a>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="professional-right">
                {hasContent(education) && (
                  <div className="professional-section">
                    <h2>Education</h2>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="professional-edu-item">
                        <div className="professional-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                        <div className="professional-edu-school">{edu.institution}</div>
                        <div className="professional-edu-dates">
                          {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                          {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(skills) && (
                  <div className="professional-section">
                    <h2>Skills</h2>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="professional-skill-group">
                        {s.category && <div className="professional-skill-category">{s.category}</div>}
                        <div className="professional-skill-list">
                          {s.items.split(',').map((sk, i) => (
                            <span key={i} className="professional-skill-item">{sk.trim()}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="professional-section">
                    <h2>Certifications</h2>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="professional-cert-item">
                        <div className="professional-cert-name">{c.name}</div>
                        <div className="professional-cert-issuer">{c.issuer}</div>
                        <div className="professional-cert-date">{c.date}</div>
                        {c.link && <a href={c.link} className="professional-link" target="_blank" rel="noreferrer">Verify</a>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}