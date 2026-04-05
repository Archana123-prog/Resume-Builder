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

        {/* BOLD TEMPLATE */}
        {template === 'bold' && (
          <div className="bold-layout">
            <div className="bold-hero">
              {personal.photo && <img src={personal.photo} alt={personal.name} className="bold-photo" />}
              <div className="bold-name-block">
                <h1>{personal.name || 'YOUR NAME'}</h1>
                <div className="bold-title-bar">{personal.title || 'YOUR TITLE'}</div>
              </div>
            </div>
            <div className="bold-contact-bar">
              {[personal.email, personal.phone, personal.location].filter(Boolean).map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
            <div className="bold-body">
              <div className="bold-main">
                {personal.summary && (
                  <div className="bold-section">
                    <h2><span>PROFILE</span></h2>
                    <p>{personal.summary}</p>
                  </div>
                )}
                {hasContent(experience) && (
                  <div className="bold-section">
                    <h2><span>EXPERIENCE</span></h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="bold-entry">
                        <div className="bold-entry-head">
                          <span className="bold-role">{exp.role}</span>
                          <span className="bold-company">{exp.company}</span>
                          <span className="bold-dates">{exp.startDate}{exp.startDate ? '–' : ''}{exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        {exp.description && <ul className="bold-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="bold-section">
                    <h2><span>PROJECTS</span></h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="bold-entry">
                        <div className="bold-entry-head"><span className="bold-role">{proj.name}</span><span className="bold-company">{proj.tech}</span></div>
                        {proj.description && <p>{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bold-side">
                {hasContent(education) && (
                  <div className="bold-side-section">
                    <h3>EDUCATION</h3>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="bold-side-entry">
                        <div className="bold-side-title">{edu.degree}</div>
                        <div>{edu.institution}</div>
                        <div className="bold-side-meta">{edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(skills) && (
                  <div className="bold-side-section">
                    <h3>SKILLS</h3>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="bold-skill-block">
                        {s.category && <div className="bold-skill-cat">{s.category}</div>}
                        <div className="bold-skill-list">{s.items.split(',').map((sk, i) => <span key={i} className="bold-skill-tag">{sk.trim()}</span>)}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="bold-side-section">
                    <h3>CERTS</h3>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="bold-side-entry">
                        <div className="bold-side-title">{c.name}</div>
                        <div className="bold-side-meta">{c.issuer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

        {/* CORPORATE TEMPLATE */}
        {template === 'corporate' && (
          <div className="corporate-layout">
            <div className="corporate-header">
              <div>
                <h1>{personal.name || 'Your Name'}</h1>
                <p className="corporate-title">{personal.title || 'Corporate Leader'}</p>
                <div className="corporate-contact">{[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(' | ')}</div>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="corporate-photo" />}
            </div>
            {personal.summary && (
              <div className="corporate-summary">
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="corporate-grid">
              <div className="corporate-main">
                {hasContent(experience) && (
                  <div className="corporate-section">
                    <h2>Experience</h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="corporate-entry">
                        <div className="corporate-entry-header">
                          <div>
                            <div className="corporate-role">{exp.role}</div>
                            <div className="corporate-company">{exp.company}</div>
                          </div>
                          <div className="corporate-dates">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        {exp.description && <ul className="corporate-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="corporate-section">
                    <h2>Key Projects</h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="corporate-project-item">
                        <div className="corporate-project-name">{proj.name}</div>
                        {proj.tech && <div className="corporate-project-tech">{proj.tech}</div>}
                        {proj.description && <p className="corporate-project-desc">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <aside className="corporate-side">
                {hasContent(education) && (
                  <div className="corporate-section">
                    <h2>Education</h2>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="corporate-edu-item">
                        <div className="corporate-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                        <div className="corporate-edu-school">{edu.institution}</div>
                        <div className="corporate-edu-dates">{edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(skills) && (
                  <div className="corporate-section">
                    <h2>Skills</h2>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="corporate-skill-group">
                        {s.category && <div className="corporate-skill-category">{s.category}</div>}
                        <div className="corporate-skill-list">{s.items.split(',').map((sk, i) => (<span key={i} className="corporate-skill-item">{sk.trim()}</span>))}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="corporate-section">
                    <h2>Certifications</h2>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="corporate-cert-item">
                        <div className="corporate-cert-name">{c.name}</div>
                        <div className="corporate-cert-issuer">{c.issuer}</div>
                        <div className="corporate-cert-date">{c.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {/* CONSULTANT TEMPLATE */}
        {template === 'consultant' && (
          <div className="consultant-layout">
            <div className="consultant-top">
              <h1 className="consultant-name">{personal.name || 'Your Name'}</h1>
              <p className="consultant-title">{personal.title || 'Consultant'}</p>
              <div className="consultant-contact">{[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).join(' • ')}</div>
            </div>
            {personal.summary && (
              <div className="consultant-summary"><p>{personal.summary}</p></div>
            )}
            <div className="consultant-body">
              <div className="consultant-left">
                {hasContent(experience) && (
                  <div className="consultant-section">
                    <h2>Professional Experience</h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="consultant-entry">
                        <div className="consultant-entry-header">
                          <div className="consultant-role">{exp.role}</div>
                          <div className="consultant-dates">{exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        <div className="consultant-company">{exp.company}</div>
                        {exp.description && <ul className="consultant-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="consultant-section">
                    <h2>Selected Projects</h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="consultant-project">
                        <div className="consultant-project-name">{proj.name}</div>
                        <div className="consultant-project-tech">{proj.tech}</div>
                        {proj.description && <p className="consultant-project-desc">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <aside className="consultant-right">
                {hasContent(skills) && (
                  <div className="consultant-section">
                    <h2>Skills</h2>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="consultant-skill-group">
                        {s.category && <div className="consultant-skill-category">{s.category}</div>}
                        <div className="consultant-skill-list">{s.items.split(',').map((sk, i) => (<span key={i} className="consultant-skill-item">{sk.trim()}</span>))}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(education) && (
                  <div className="consultant-section">
                    <h2>Education</h2>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="consultant-edu-item">
                        <div className="consultant-edu-degree">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
                        <div className="consultant-edu-school">{edu.institution}</div>
                        <div className="consultant-edu-dates">{edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="consultant-section">
                    <h2>Certifications</h2>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="consultant-cert-item">
                        <div className="consultant-cert-name">{c.name}</div>
                        <div className="consultant-cert-details">{c.issuer} • {c.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {/* CREATIVE TEMPLATE */}
        {template === 'creative' && (
          <div className="creative-layout">
            <div className="creative-header">
              <div className="creative-name-section">
                <h1 className="creative-name">{personal.name || 'Your Name'}</h1>
                <div className="creative-title">{personal.title || 'Creative Professional'}</div>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="creative-photo" />}
            </div>
            <div className="creative-contact-strip">
              {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).join(' • ')}
            </div>
            {personal.summary && (
              <div className="creative-summary">
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="creative-body">
              {hasContent(experience) && (
                <div className="creative-section">
                  <h2 className="creative-section-title">Experience</h2>
                  {experience.map(exp => exp.company && (
                    <div key={exp.id} className="creative-exp-item">
                      <div className="creative-exp-header">
                        <div className="creative-exp-role">{exp.role}</div>
                        <div className="creative-exp-company">{exp.company}</div>
                        <div className="creative-exp-dates">
                          {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      {exp.description && <ul className="creative-bullets">{formatDesc(exp.description)}</ul>}
                    </div>
                  ))}
                </div>
              )}
              <div className="creative-bottom-row">
                <div className="creative-left-col">
                  {hasContent(education) && (
                    <div className="creative-section">
                      <h2 className="creative-section-title">Education</h2>
                      {education.map(edu => edu.institution && (
                        <div key={edu.id} className="creative-edu-item">
                          <div className="creative-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                          <div className="creative-edu-school">{edu.institution}</div>
                          <div className="creative-edu-year">{edu.endDate}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {hasContent(projects) && (
                    <div className="creative-section">
                      <h2 className="creative-section-title">Projects</h2>
                      {projects.map(proj => proj.name && (
                        <div key={proj.id} className="creative-project-item">
                          <div className="creative-project-name">{proj.name}</div>
                          {proj.tech && <div className="creative-project-tech">{proj.tech}</div>}
                          {proj.description && <p className="creative-project-desc">{proj.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="creative-right-col">
                  {hasContent(skills) && (
                    <div className="creative-section">
                      <h2 className="creative-section-title">Skills</h2>
                      {skills.map(s => s.items && (
                        <div key={s.id} className="creative-skill-group">
                          {s.category && <h3 className="creative-skill-category">{s.category}</h3>}
                          <div className="creative-skill-tags">
                            {s.items.split(',').map((sk, i) => (
                              <span key={i} className="creative-skill-tag">{sk.trim()}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {hasContent(certifications) && (
                    <div className="creative-section">
                      <h2 className="creative-section-title">Certifications</h2>
                      {certifications.map(c => c.name && (
                        <div key={c.id} className="creative-cert-item">
                          <div className="creative-cert-name">{c.name}</div>
                          <div className="creative-cert-details">{c.issuer} • {c.date}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TECH TEMPLATE */}
        {template === 'tech' && (
          <div className="tech-layout">
            <div className="tech-header">
              <div className="tech-header-left">
                <h1 className="tech-name">{personal.name || 'Your Name'}</h1>
                <div className="tech-title">{personal.title || 'Tech Professional'}</div>
                <div className="tech-contact">
                  {[personal.email, personal.phone, personal.location].filter(Boolean).join(' | ')}
                </div>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="tech-photo" />}
            </div>
            {personal.summary && (
              <div className="tech-summary">
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="tech-grid">
              <div className="tech-main">
                {hasContent(experience) && (
                  <div className="tech-section">
                    <h2>Experience</h2>
                    {experience.map(exp => exp.company && (
                      <div key={exp.id} className="tech-exp-item">
                        <div className="tech-exp-header">
                          <div className="tech-exp-role">{exp.role}</div>
                          <div className="tech-exp-company">{exp.company}</div>
                          <div className="tech-exp-dates">
                            {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                        {exp.description && <ul className="tech-bullets">{formatDesc(exp.description)}</ul>}
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(projects) && (
                  <div className="tech-section">
                    <h2>Projects</h2>
                    {projects.map(proj => proj.name && (
                      <div key={proj.id} className="tech-project-item">
                        <div className="tech-project-header">
                          <span className="tech-project-name">{proj.name}</span>
                          {proj.tech && <span className="tech-project-stack">[{proj.tech}]</span>}
                        </div>
                        {proj.description && <p className="tech-project-desc">{proj.description}</p>}
                        {proj.link && <a href={proj.link} className="tech-link" target="_blank" rel="noreferrer">🔗</a>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="tech-sidebar">
                {hasContent(education) && (
                  <div className="tech-section">
                    <h2>Education</h2>
                    {education.map(edu => edu.institution && (
                      <div key={edu.id} className="tech-edu-item">
                        <div className="tech-edu-degree">{edu.degree}</div>
                        <div className="tech-edu-field">{edu.field}</div>
                        <div className="tech-edu-school">{edu.institution}</div>
                        <div className="tech-edu-year">{edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(skills) && (
                  <div className="tech-section">
                    <h2>Technical Skills</h2>
                    {skills.map(s => s.items && (
                      <div key={s.id} className="tech-skill-group">
                        {s.category && <div className="tech-skill-category">{s.category}</div>}
                        <div className="tech-skill-bars">
                          {s.items.split(',').map((sk, i) => (
                            <div key={i} className="tech-skill-bar">
                              <span className="tech-skill-name">{sk.trim()}</span>
                              <div className="tech-skill-fill" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasContent(certifications) && (
                  <div className="tech-section">
                    <h2>Certifications</h2>
                    {certifications.map(c => c.name && (
                      <div key={c.id} className="tech-cert-item">
                        <div className="tech-cert-name">{c.name}</div>
                        <div className="tech-cert-issuer">{c.issuer}</div>
                        <div className="tech-cert-date">{c.date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* EXECUTIVE TEMPLATE */}
        {template === 'executive' && (
          <div className="executive-layout">
            <div className="executive-header">
              <div className="executive-header-content">
                <h1 className="executive-name">{personal.name || 'Your Name'}</h1>
                <div className="executive-title">{personal.title || 'Executive Position'}</div>
                <div className="executive-contact">
                  {[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).join(' • ')}
                </div>
              </div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="executive-photo" />}
            </div>
            {personal.summary && (
              <div className="executive-summary">
                <h2>Executive Summary</h2>
                <p>{personal.summary}</p>
              </div>
            )}
            <div className="executive-content">
              {hasContent(experience) && (
                <div className="executive-section">
                  <h2>Professional Experience</h2>
                  {experience.map(exp => exp.company && (
                    <div key={exp.id} className="executive-exp-item">
                      <div className="executive-exp-header">
                        <div className="executive-exp-role">{exp.role}</div>
                        <div className="executive-exp-company">{exp.company}</div>
                        <div className="executive-exp-dates">
                          {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      {exp.description && <ul className="executive-bullets">{formatDesc(exp.description)}</ul>}
                    </div>
                  ))}
                </div>
              )}
              <div className="executive-bottom">
                <div className="executive-left">
                  {hasContent(education) && (
                    <div className="executive-section">
                      <h2>Education</h2>
                      {education.map(edu => edu.institution && (
                        <div key={edu.id} className="executive-edu-item">
                          <div className="executive-edu-degree">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</div>
                          <div className="executive-edu-school">{edu.institution}</div>
                          <div className="executive-edu-details">
                            {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                            {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {hasContent(projects) && (
                    <div className="executive-section">
                      <h2>Key Projects</h2>
                      {projects.map(proj => proj.name && (
                        <div key={proj.id} className="executive-project-item">
                          <div className="executive-project-name">{proj.name}</div>
                          {proj.tech && <div className="executive-project-tech">{proj.tech}</div>}
                          {proj.description && <p className="executive-project-desc">{proj.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="executive-right">
                  {hasContent(skills) && (
                    <div className="executive-section">
                      <h2>Core Competencies</h2>
                      {skills.map(s => s.items && (
                        <div key={s.id} className="executive-skill-group">
                          {s.category && <h3 className="executive-skill-category">{s.category}</h3>}
                          <ul className="executive-skill-list">
                            {s.items.split(',').map((sk, i) => (
                              <li key={i}>{sk.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {hasContent(certifications) && (
                    <div className="executive-section">
                      <h2>Professional Certifications</h2>
                      {certifications.map(c => c.name && (
                        <div key={c.id} className="executive-cert-item">
                          <div className="executive-cert-name">{c.name}</div>
                          <div className="executive-cert-details">{c.issuer} • {c.date}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIMPLE TEMPLATE */}
        {template === 'simple' && (
          <div className="simple-layout">
            <div className="simple-header">
              <h1 className="simple-name">{personal.name || 'Your Name'}</h1>
              <div className="simple-title">{personal.title || 'Professional'}</div>
              {personal.photo && <img src={personal.photo} alt={personal.name} className="simple-photo" />}
            </div>
            <div className="simple-contact">
              {[personal.email, personal.phone, personal.location, personal.website].filter(Boolean).join(' • ')}
            </div>
            {personal.summary && (
              <div className="simple-section">
                <h2>About</h2>
                <p className="simple-text">{personal.summary}</p>
              </div>
            )}
            {hasContent(experience) && (
              <div className="simple-section">
                <h2>Experience</h2>
                {experience.map(exp => exp.company && (
                  <div key={exp.id} className="simple-exp-item">
                    <div className="simple-exp-header">
                      <span className="simple-exp-role">{exp.role}</span>
                      <span className="simple-exp-company">at {exp.company}</span>
                      <span className="simple-exp-dates">
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <ul className="simple-bullets">{formatDesc(exp.description)}</ul>}
                  </div>
                ))}
              </div>
            )}
            {hasContent(education) && (
              <div className="simple-section">
                <h2>Education</h2>
                {education.map(edu => edu.institution && (
                  <div key={edu.id} className="simple-edu-item">
                    <div className="simple-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                    <div className="simple-edu-school">{edu.institution}</div>
                    <div className="simple-edu-dates">
                      {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hasContent(skills) && (
              <div className="simple-section">
                <h2>Skills</h2>
                {skills.map(s => s.items && (
                  <div key={s.id} className="simple-skill-group">
                    {s.category && <h3 className="simple-skill-category">{s.category}</h3>}
                    <div className="simple-skill-list">
                      {s.items.split(',').map((sk, i) => (
                        <span key={i} className="simple-skill-item">{sk.trim()}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {hasContent(projects) && (
              <div className="simple-section">
                <h2>Projects</h2>
                {projects.map(proj => proj.name && (
                  <div key={proj.id} className="simple-project-item">
                    <div className="simple-project-name">{proj.name}</div>
                    {proj.tech && <div className="simple-project-tech">{proj.tech}</div>}
                    {proj.description && <p className="simple-project-desc">{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {hasContent(certifications) && (
              <div className="simple-section">
                <h2>Certifications</h2>
                {certifications.map(c => c.name && (
                  <div key={c.id} className="simple-cert-item">
                    <div className="simple-cert-name">{c.name}</div>
                    <div className="simple-cert-details">{c.issuer} • {c.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}