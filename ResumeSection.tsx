import React, { useState, useMemo } from 'react';
import Section from './Section';
import { PROFILE, SKILLS, EXPERIENCES, CERTIFICATES, RESUME_KEYWORDS } from '../constants';
import { Download, FileText, Search, CheckCircle, Sparkles, User, Briefcase, GraduationCap } from 'lucide-react';

const ResumeSection: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [showMatcher, setShowMatcher] = useState(false);

  // Simple keyword matching logic
  const matchResults = useMemo(() => {
    if (!jobDescription.trim()) return { score: 0, matches: [] };
    
    const jdWords = jobDescription.toLowerCase().split(/[\s,./?!\(\)]+/);
    const matches = RESUME_KEYWORDS.filter(keyword => 
      jdWords.includes(keyword.toLowerCase())
    );
    
    const score = Math.round((matches.length / Math.min(jdWords.length / 10, RESUME_KEYWORDS.length)) * 100);
    return { score: Math.min(score, 100), matches };
  }, [jobDescription]);

  const handlePrint = () => {
    window.print();
  };

  const highlightKeyword = (text: string) => {
    if (!jobDescription.trim()) return text;
    const regex = new RegExp(`(${matchResults.matches.join('|')})`, 'gi');
    if (matchResults.matches.length === 0) return text;

    const parts = text.split(regex);
    return parts.map((part, i) => 
      matchResults.matches.some(m => m.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="bg-teal-200 dark:bg-teal-900/50 text-teal-900 dark:text-teal-100 px-0.5 rounded font-bold transition-all">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <Section id="resume" className="py-20 no-print">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Resume & Strategy</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Tailor my profile to your specific job requirements.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowMatcher(!showMatcher)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500 transition-all shadow-sm"
            >
              <Search className="h-5 w-5" />
              {showMatcher ? 'Hide Matcher' : 'Test JD Match'}
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 transform active:scale-95"
            >
              <Download className="h-5 w-5" />
              Download Full PDF
            </button>
          </div>
        </div>

        {/* ATS Keyword Matcher Utility */}
        {showMatcher && (
          <div className="mb-12 p-6 md:p-8 bg-slate-900 rounded-2xl border border-slate-800 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-teal-400" />
              <h3 className="text-xl font-bold text-white">ATS Keyword Optimizer</h3>
            </div>
            
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your target Job Description here to see the match percentage..."
              className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none mb-6 placeholder:text-slate-500"
            />

            {jobDescription.trim() && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                      <circle 
                        cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        className="text-teal-500"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - matchResults.score / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">
                      {matchResults.score}%
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Match Score</h4>
                    <p className="text-slate-400 text-xs uppercase tracking-widest font-black">ATS Relevance Index</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300">Key Matches Found:</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResults.matches.map(m => (
                      <span key={m} className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-md text-[10px] font-bold uppercase">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RESUME PREVIEW (WHAT THE USER SEES ON WEB) */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden group">
          {/* Decorative Background Icon */}
          <FileText className="absolute -right-12 -bottom-12 h-64 w-64 text-slate-100 dark:text-slate-800/50 -rotate-12 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg flex-shrink-0">
               <img src={PROFILE.profileImage} alt={PROFILE.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{PROFILE.name}</h3>
              <p className="text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-sm mb-4">{PROFILE.title}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <User className="h-4 w-4 text-teal-500" /> {PROFILE.location}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Briefcase className="h-4 w-4 text-teal-500" /> {EXPERIENCES.length} Key Roles Listed
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="h-4 w-4 text-teal-500" /> IT National Diploma
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" /> ATS Optimized Document
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 italic text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                "{highlightKeyword(PROFILE.bio.substring(0, 180))}..."
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
             <button 
               onClick={handlePrint}
               className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-2"
             >
               View Full Experience & Download PDF <Download className="h-4 w-4" />
             </button>
          </div>
        </div>

        {/* FULL PROFESSIONAL DOCUMENT (HIDDEN ON SCREEN, VISIBLE ON PRINT) */}
        <div id="resume-document" className="hidden-on-screen">
          {/* Header */}
          <div className="resume-header">
            <div>
              <h1 className="resume-name">{PROFILE.name}</h1>
              <p className="resume-title">{PROFILE.title}</p>
            </div>
            <div className="resume-contact">
              <p>{PROFILE.location}</p>
              <p>{PROFILE.email}</p>
              <p>{PROFILE.phone}</p>
              <p>{PROFILE.linkedin}</p>
            </div>
          </div>

          <div className="resume-body">
            <section className="resume-section">
              <h3 className="resume-section-title">Professional Summary</h3>
              <p className="resume-text">{PROFILE.bio}</p>
            </section>

            <section className="resume-section">
              <h3 className="resume-section-title">Professional Experience</h3>
              <div className="resume-experience-list">
                {EXPERIENCES.map(exp => (
                  <div key={exp.id} className="resume-experience-item">
                    <div className="resume-exp-header">
                      <h4 className="resume-exp-role">{exp.role}</h4>
                      <span className="resume-exp-date">{exp.period}</span>
                    </div>
                    <p className="resume-exp-company">{exp.company} • {exp.location}</p>
                    <ul className="resume-exp-bullets">
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <h3 className="resume-section-title">Technical Skills</h3>
              <div className="resume-skills-grid">
                {SKILLS.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="resume-skill-cat">{cat.category}</h4>
                    <p className="resume-skill-list">{cat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <h3 className="resume-section-title">Education</h3>
              <div className="resume-experience-item">
                <h4 className="resume-exp-role">National Diploma in Information Technology</h4>
                <p className="resume-exp-company">Rosebank College • 2024</p>
              </div>
            </section>

            <section className="resume-section">
              <h3 className="resume-section-title">Certifications</h3>
              <ul className="resume-exp-bullets">
                {CERTIFICATES.slice(0, 6).map(cert => (
                  <li key={cert.id}><strong>{cert.title}</strong> - {cert.issuer} ({cert.issueDate})</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        /* Screen View Logic */
        .hidden-on-screen {
          display: none;
        }

        /* Print/PDF Logic */
        @media print {
          .no-print { display: none !important; }
          .hidden-on-screen { display: block !important; }
          
          body { 
            background: white !important; 
            color: black !important;
            font-family: 'Times New Roman', serif;
          }
          
          #resume-document {
            padding: 40px;
            max-width: 900px;
            margin: auto;
          }

          .resume-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
            margin-bottom: 25px;
          }

          .resume-name { font-size: 28pt; font-weight: bold; margin: 0; }
          .resume-title { font-size: 14pt; color: #444; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
          .resume-contact { text-align: right; font-size: 10pt; color: #555; }
          
          .resume-section { margin-bottom: 25px; page-break-inside: avoid; }
          .resume-section-title { 
            font-size: 12pt; 
            font-weight: bold; 
            text-transform: uppercase; 
            border-bottom: 1px solid #ccc; 
            padding-bottom: 5px; 
            margin-bottom: 10px;
            color: #222;
          }

          .resume-text { font-size: 11pt; line-height: 1.5; color: #333; text-align: justify; }
          
          .resume-experience-item { margin-bottom: 15px; }
          .resume-exp-header { display: flex; justify-content: space-between; }
          .resume-exp-role { font-size: 11pt; font-weight: bold; margin: 0; }
          .resume-exp-date { font-size: 10pt; font-style: italic; }
          .resume-exp-company { font-size: 10pt; font-weight: bold; color: #555; margin: 2px 0 5px 0; }
          
          .resume-exp-bullets { margin: 5px 0 0 20px; padding: 0; }
          .resume-exp-bullets li { font-size: 10pt; margin-bottom: 3px; list-style-type: square; }
          
          .resume-skills-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; }
          .resume-skill-cat { font-size: 10pt; font-weight: bold; margin-bottom: 2px; }
          .resume-skill-list { font-size: 10pt; color: #444; }
        }
      `}</style>
    </Section>
  );
};

export default ResumeSection;