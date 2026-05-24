import React, { useState } from "react";
import { ResumeData, Experience, Education, Skill, Project, Certification, Language, Achievement } from "../types";
import { 
  Sparkles, Check, Trash2, Plus, ArrowLeft, ArrowRight, CornerDownRight, 
  HelpCircle, AlignLeft, Briefcase, GraduationCap, Award, Languages, ListOrdered, ChevronUp, ChevronDown 
} from "lucide-react";

interface ResumeBuilderProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  isPremium: boolean;
  onUnlockPremium: () => void;
}

export default function ResumeBuilder({ data, onChange, isPremium, onUnlockPremium }: ResumeBuilderProps) {
  const [step, setStep] = useState<number>(0);
  
  // AI Inline Assist States
  const [pollingAI, setPollingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [polishLoading, setPolishLoading] = useState(false);

  // Temporary item inputs
  const [newExp, setNewExp] = useState<Omit<Experience, "id">>({
    company: "",
    role: "",
    location: "",
    duration: "",
    description: []
  });
  const [tempBullet, setTempBullet] = useState("");

  const [newEdu, setNewEdu] = useState<Omit<Education, "id">>({
    school: "",
    degree: "",
    field: "",
    location: "",
    duration: "",
    description: ""
  });

  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: "Technical",
    level: "Intermediate"
  });

  const [newProj, setNewProj] = useState<Omit<Project, "id">>({
    name: "",
    role: "",
    duration: "",
    description: "",
    technologies: ""
  });

  const [newCert, setNewCert] = useState<Omit<Certification, "id">>({
    name: "",
    issuer: "",
    year: ""
  });

  const [newLang, setNewLang] = useState<Omit<Language, "id">>({
    name: "",
    proficiency: "Professional"
  });

  const [newAch, setNewAch] = useState<Omit<Achievement, "id">>({
    title: "",
    description: "",
    metric: ""
  });

  const stepsList = [
    { title: "Career Level", icon: ListOrdered },
    { title: "Contact", icon: HelpCircle },
    { title: "Summary", icon: AlignLeft },
    { title: "Experience", icon: Briefcase },
    { title: "Education", icon: GraduationCap },
    { title: "Core Skills", icon: Award },
    { title: "Sections Highlight", icon: Languages },
    { title: "Layout Order", icon: ListOrdered }
  ];

  const updatePersonalInfo = (key: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [key]: value
      }
    });
  };

  // 1. Suggest dynamic bullets for current work role using AI
  const handleFetchBulletsAISuggestions = async () => {
    const roleOfInterest = newExp.role || data.personalInfo.targetTitle || "Software Engineer";
    setPollingAI(true);
    setAiSuggestions([]);
    try {
      const res = await fetch("/api/resume/suggest-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleOfInterest, level: data.careerLevel })
      });
      if (res.ok) {
        const payload = await res.json();
        setAiSuggestions(payload.bullets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPollingAI(false);
    }
  };

  // 2. Polish Professional Summary on demand
  const handlePolishProfessionalSummary = async () => {
    if (!data.summary) return;
    setPolishLoading(true);
    try {
      const res = await fetch("/api/resume/polish-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: data.summary, type: "summary", role: data.personalInfo.targetTitle })
      });
      if (res.ok) {
        const payload = await res.json();
        onChange({ ...data, summary: payload.polished || data.summary });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPolishLoading(false);
    }
  };

  // Experience actions
  const addExperience = () => {
    if (!newExp.company || !newExp.role) return;
    const finalItem: Experience = {
      ...newExp,
      id: Date.now().toString()
    };
    onChange({
      ...data,
      experiences: [...data.experiences, finalItem]
    });
    setNewExp({ company: "", role: "", location: "", duration: "", description: [] });
    setAiSuggestions([]);
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(e => e.id !== id)
    });
  };

  const addBulletToNewExp = (bulletText: string) => {
    if (!bulletText.trim()) return;
    setNewExp({
      ...newExp,
      description: [...newExp.description, bulletText.trim()]
    });
    setTempBullet("");
  };

  const removeBulletFromNewExp = (idx: number) => {
    setNewExp({
      ...newExp,
      description: newExp.description.filter((_, i) => i !== idx)
    });
  };

  // Education actions
  const addEducation = () => {
    if (!newEdu.school || !newEdu.degree) return;
    onChange({
      ...data,
      education: [...data.education, { ...newEdu, id: Date.now().toString() }]
    });
    setNewEdu({ school: "", degree: "", field: "", location: "", duration: "", description: "" });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  // Skills
  const addSkill = () => {
    if (!newSkill.name) return;
    onChange({
      ...data,
      skills: [...data.skills, { ...newSkill, id: Date.now().toString() }]
    });
    setNewSkill({ name: "", category: "Technical", level: "Expert" });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  // Section items additions
  const addProject = () => {
    if (!newProj.name) return;
    onChange({
      ...data,
      projects: [...data.projects, { ...newProj, id: Date.now().toString() }]
    });
    setNewProj({ name: "", role: "", duration: "", description: "", technologies: "" });
  };

  const addCertification = () => {
    if (!newCert.name) return;
    onChange({
      ...data,
      certifications: [...data.certifications, { ...newCert, id: Date.now().toString() }]
    });
    setNewCert({ name: "", issuer: "", year: "" });
  };

  const addLanguage = () => {
    if (!newLang.name) return;
    onChange({
      ...data,
      languages: [...data.languages, { ...newLang, id: Date.now().toString() }]
    });
    setNewLang({ name: "", proficiency: "Professional" });
  };

  const addAchievement = () => {
    if (!newAch.title) return;
    onChange({
      ...data,
      achievements: [...data.achievements, { ...newAch, id: Date.now().toString() }]
    });
    setNewAch({ title: "", description: "", metric: "" });
  };

  // Layout Sort Controls
  const moveSection = (index: number, direction: "up" | "down") => {
    const list = [...data.sectionOrder];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    onChange({
      ...data,
      sectionOrder: list
    });
  };

  // Adaptive advice depending on career selection
  const renderCareerAdaptiveNotes = () => {
    if (data.careerLevel === "Student" || data.careerLevel === "Graduate") {
      return (
        <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-500/20 text-xs text-sky-400 space-y-1">
          <p className="font-bold uppercase tracking-wider font-mono">Academic Achievement Advice</p>
          <p className="leading-relaxed">
            Because your career metrics log is under 2 years, we highly recommend highlighting academic achievements, volunteer leaderships, and high-fidelity highlight projects above standard work descriptions.
          </p>
        </div>
      );
    } else if (data.careerLevel === "Executive") {
      return (
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
          <p className="font-bold uppercase tracking-wider font-mono text-sky-400">Executive Precision Metrics</p>
          <p className="leading-relaxed">
            Prioritize high-impact business ratios: Quantify fiscal values handled (e.g. CapEx, ARR), team scales managed, digital transformations spearheaded, and structural turnarounds achieved. Avoid generic chore task definitions.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="builder-stepper" className="space-y-6">
      
      {/* Onboarding progress steps list */}
      <div className="overflow-x-auto print:hidden">
        <div className="flex gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-900 min-w-max">
          {stepsList.map((st, idx) => {
            const Icon = st.icon;
            const active = idx === step;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setStep(idx)}
                className={`flex items-center gap-1.5 py-2 px-3.5 text-xs font-mono font-bold tracking-widest uppercase rounded-lg transition-all ${
                  active 
                    ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/15" 
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <span className="text-[10px] tracking-normal font-sans text-slate-950 font-black">{idx + 1}.</span>
                <span>{st.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper Content forms */}
      <div id="step-content-box" className="p-5 sm:p-6 bg-stone-950/20 rounded-2xl border border-stone-900 min-h-[400px]">
        
        {step === 0 && (
          <div id="step-0-career-level" className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Empower Your Executive Trajectory</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Select your designated experience tier. House Venture adapts systemic template formatting, target keyword parameters, and AI guidance loops to match recruiters expectations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(["Student", "Graduate", "Professional", "Executive"] as const).map((lvl) => {
                const active = data.careerLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onChange({ ...data, careerLevel: lvl })}
                    className={`p-4 h-24 rounded-xl border flex flex-col justify-between text-left transition-all ${
                      active
                        ? "bg-sky-500 border-sky-500 text-slate-950 shadow-lg"
                        : "bg-stone-900 border-stone-850 text-white hover:border-sky-500/40"
                    }`}
                  >
                    <span className="text-xs font-mono tracking-widest uppercase font-bold text-stone-500">Tier Profile</span>
                    <span className="text-sm font-extrabold tracking-tight">{lvl}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              {renderCareerAdaptiveNotes()}
            </div>
          </div>
        )}

        {step === 1 && (
          <div id="step-1-contact-info" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Contact Information Matrix</h3>
              <p className="text-xs text-stone-400 mt-1">
                Establish primary touchpoints. Recruiters rely on standard identifiers to initiate consultative calls.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Full Legal Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                  placeholder="e.g. Sterling Hunt"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Target Industry Title</label>
                <input
                  type="text"
                  value={data.personalInfo.targetTitle}
                  onChange={(e) => updatePersonalInfo("targetTitle", e.target.value)}
                  placeholder="e.g. Chief Product Architect"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Email Address ID</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder="hunt@houseventure.com"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Direct Phone Number</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder="+1 (555) 720-1950"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Physical Location Base</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                  placeholder="London, UK or San Francisco, CA"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">LinkedIn URL Link</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/sterling-hunt"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-mono uppercase text-stone-500 font-bold">Portfolio / Enterprise Website</label>
                <input
                  type="text"
                  value={data.personalInfo.website}
                  onChange={(e) => updatePersonalInfo("website", e.target.value)}
                  placeholder="sterlinghunt.co"
                  className="w-full rounded-lg bg-stone-900 border border-stone-800 p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div id="step-2-summary-polish" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white font-sans">Professional Summary Hook</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Condense your executive legacy, specific core value offerings, and key functional quotas here.
                </p>
              </div>

              {data.summary && (
                <button
                  onClick={handlePolishProfessionalSummary}
                  disabled={polishLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-slate-950 hover:border-sky-500 transition-all text-[11px] font-bold font-mono uppercase active:scale-95 disabled:opacity-50"
                >
                  <Sparkles size={11} className={polishLoading ? "animate-spin" : ""} />
                  <span>AI Polish summary</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              <textarea
                rows={6}
                value={data.summary}
                onChange={(e) => onChange({ ...data, summary: e.target.value })}
                placeholder="Example: High-performing Executive with 10+ years directing complex cloud-centric migrations and platform transformations. Spearheaded microservices refactorizations cutting computing expenses by 42% YoY ($180K)."
                className="w-full rounded-lg bg-stone-900 border border-stone-800 p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div id="step-3-exp-builder" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Professional Work History</h3>
              <p className="text-xs text-stone-400 mt-1">
                Enter your key corporate engagements. Prioritize roles showing leadership trajectories.
              </p>
            </div>

            {/* Existing experiences list */}
            {data.experiences.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-[10px] text-stone-550 font-mono tracking-widest uppercase font-bold">Recorded Engagements ({data.experiences.length})</span>
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl border border-stone-900 bg-stone-900/40 flex justify-between items-start gap-4">
                    <div>
                      <div className="font-bold text-xs text-white">
                        {exp.role} — <span className="text-sky-400">{exp.company}</span>
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 mt-0.5">{exp.duration} | {exp.location}</div>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-400 mt-2">
                        {exp.description.map((bul, idx) => (
                           <li key={idx}>"{bul}"</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 rounded bg-stone-950 text-stone-450 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input experience form */}
            <div className="p-4 rounded-xl border border-stone-900 bg-stone-955/40 space-y-4">
              <span className="text-[10px] text-sky-400 font-mono tracking-widest uppercase font-bold">New Work Entry Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name (e.g. Stripe)"
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Professional Role (e.g. Staff Developer)"
                  value={newExp.role}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Engagement Duration (e.g. 2021 - Present or May 2025)"
                  value={newExp.duration}
                  onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Location Base (e.g. London, UK)"
                  value={newExp.location}
                  onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Bullet builder inside Experience */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">Quantify Impact (Bullet points list)</span>
                  <button
                    onClick={handleFetchBulletsAISuggestions}
                    disabled={pollingAI}
                    className="flex items-center gap-1 text-[10px] font-mono text-sky-450 hover:text-sky-300 font-bold uppercase transition-all"
                  >
                    <Sparkles size={11} className={pollingAI ? "animate-spin" : ""} />
                    Suggest Bullet options
                  </button>
                </div>

                {/* Suggested bullet points */}
                {aiSuggestions.length > 0 && (
                  <div className="p-3 bg-stone-900/60 rounded-xl border border-sky-550/10 space-y-2 max-h-52 overflow-y-auto">
                    <span className="text-[9px] font-mono uppercase text-sky-550 block">AI Suggestions: Select to Import</span>
                    {aiSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => addBulletToNewExp(sug)}
                        className="w-full text-left p-2 rounded hover:bg-stone-900 border border-dashed border-stone-800 flex gap-2 items-start text-[11px] text-stone-300 transition-colors"
                      >
                        <Plus size={11} className="text-sky-400 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Submitting custom bullets */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter manual bullet (e.g. Managed team of 4...)"
                    value={tempBullet}
                    onChange={(e) => setTempBullet(e.target.value)}
                    className="flex-1 rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={() => addBulletToNewExp(tempBullet)}
                    className="px-3 bg-stone-900 text-stone-300 text-xs rounded-lg hover:bg-stone-850"
                  >
                    Add Bullet
                  </button>
                </div>

                {newExp.description.length > 0 && (
                  <ul className="space-y-1 bg-stone-900/40 p-2.5 rounded-lg">
                    {newExp.description.map((b, i) => (
                      <li key={i} className="flex justify-between items-center text-[11px] text-stone-300 pl-2 border-l border-sky-500/50">
                        <span>"{b}"</span>
                        <button
                          onClick={() => removeBulletFromNewExp(i)}
                          className="text-stone-550 hover:text-red-400 text-[10px] font-sans px-1"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold tracking-widest uppercase rounded-lg active:scale-95 transition-all"
              >
                Save Experience Engagement
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div id="step-4-edu-builder" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Educational Qualifications</h3>
              <p className="text-xs text-stone-400 mt-1">
                Establish intellectual foundations. Specify your schools, degrees, and focus domains.
              </p>
            </div>

            {data.education.length > 0 && (
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-3.5 rounded-xl border border-stone-900 bg-stone-900/40 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xs text-white">
                        {edu.degree} in {edu.field}
                      </div>
                      <div className="text-[10px] font-mono text-stone-550 mt-0.5">{edu.school} • {edu.duration}</div>
                    </div>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="p-1.5 rounded bg-stone-950 text-stone-450 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl border border-stone-900 bg-stone-950/40 space-y-4">
              <span className="text-[10px] text-sky-400 font-mono tracking-widest uppercase font-bold">New Education Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="School / University Name"
                  value={newEdu.school}
                  onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Degree (e.g. Master of Business Administration)"
                  value={newEdu.degree}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Field of Study (e.g. Computer Science)"
                  value={newEdu.field}
                  onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Duration Years (e.g. 2018 - 2022)"
                  value={newEdu.duration}
                  onChange={(e) => setNewEdu({ ...newEdu, duration: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Boston, MA)"
                  value={newEdu.location}
                  onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Extra Honors / Achievements (Optional)"
                  value={newEdu.description}
                  onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="button"
                onClick={addEducation}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold tracking-widest uppercase rounded-lg transition-all"
              >
                Save Education Entry
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div id="step-5-skills-categorizer" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Core Competencies Grid</h3>
              <p className="text-xs text-stone-400 mt-1">
                Map out technical stack alignments, functional managements expertise, and highly collaborative soft traits.
              </p>
            </div>

            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((sk) => (
                  <span
                    key={sk.id}
                    className="text-xs border border-stone-800 bg-stone-900 p-2 rounded-lg flex items-center gap-2"
                  >
                    <span>{sk.name}</span>
                    <span className="text-[10px] text-stone-550 font-mono">({sk.category} • {sk.level})</span>
                    <button
                      onClick={() => removeSkill(sk.id)}
                      className="text-stone-550 hover:text-red-400 text-[10px] ml-1.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl border border-stone-900 bg-stone-950/40 space-y-4">
              <span className="text-[10px] text-sky-400 font-mono tracking-widest uppercase font-bold">New Competency Tag Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Skill Label (e.g. React.js)"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Management">Management / Fiscal</option>
                  <option value="Soft Skills">Soft / Behavioral</option>
                  <option value="Other">Other Category</option>
                </select>

                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                  className="rounded-lg bg-stone-900 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Beginner">Beginner / Intermediate</option>
                  <option value="Intermediate">Intermediate Advanced</option>
                  <option value="Expert">Subject Matter Expert</option>
                  <option value="Elite">Elite (Executive Signature)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={addSkill}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold tracking-widest uppercase rounded-lg transition-all"
              >
                Save Skill Competency Tag
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div id="step-6-extra-sections" className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Strategic Document Modules</h3>
              <p className="text-xs text-stone-400 mt-1">
                Incorporate premium markers such as Highlight Projects, Languages, and Certifications directly to satisfy strict recruiter audits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Highlight projects */}
              <div className="space-y-3 p-4 bg-stone-900/35 rounded-xl border border-stone-900">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider text-sky-450">
                  <CornerDownRight size={12} />
                  Highlight Projects ({data.projects.length})
                </span>
                <input
                  type="text"
                  placeholder="Project Name (e.g. Apollo Telemetry)"
                  value={newProj.name}
                  onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
                  className="w-full rounded-lg bg-stone-950 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <textarea
                  placeholder="Detail impact metrics and outcomes achieved."
                  rows={2}
                  value={newProj.description}
                  onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={addProject}
                  className="w-full py-1.5 bg-stone-950 hover:bg-stone-900 text-stone-200 text-[11px] font-bold tracking-widest uppercase rounded border border-stone-800 transition-all font-mono"
                >
                  Save Project Item
                </button>
              </div>

              {/* Achievements with quantifiable metrics */}
              <div className="space-y-3 p-4 bg-stone-900/35 rounded-xl border border-stone-900">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider text-sky-450">
                  <CornerDownRight size={12} />
                  Key Achievements ({data.achievements.length})
                </span>
                <input
                  type="text"
                  placeholder="Title (e.g. Sales Representative Award)"
                  value={newAch.title}
                  onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                  className="w-full rounded-lg bg-stone-950 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newAch.description}
                  onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Focus Metric (e.g. +42% MoM or $3.2M secured)"
                  value={newAch.metric}
                  onChange={(e) => setNewAch({ ...newAch, metric: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="w-full py-1.5 bg-stone-950 hover:bg-stone-900 text-stone-200 text-[11px] font-bold tracking-widest uppercase rounded border border-stone-800 transition-all font-mono"
                >
                  Save Key Achievement
                </button>
              </div>

              {/* Certifications and Licensures */}
              <div className="space-y-3 p-4 bg-stone-900/35 rounded-xl border border-stone-900">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider text-sky-450">
                  <CornerDownRight size={12} />
                  Certifications ({data.certifications.length})
                </span>
                <input
                  type="text"
                  placeholder="Certification Label (e.g. AWS Solutions Architect)"
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Issuer (e.g. Amazon Web Services, year: 2026)"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={addCertification}
                  className="w-full py-1.5 bg-stone-955 hover:bg-stone-900 text-stone-200 text-[11px] font-bold tracking-widest uppercase rounded border border-stone-800 transition-all font-mono"
                >
                  Save Certification
                </button>
              </div>

              {/* Languages */}
              <div className="space-y-3 p-4 bg-stone-900/35 rounded-xl border border-stone-900">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider text-sky-450">
                  <CornerDownRight size={12} />
                  Languages ({data.languages.length})
                </span>
                <input
                  type="text"
                  placeholder="Language Label (e.g. English)"
                  value={newLang.name}
                  onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <select
                  value={newLang.proficiency}
                  onChange={(e) => setNewLang({ ...newLang, proficiency: e.target.value as any })}
                  className="w-full rounded-lg bg-stone-955 border border-stone-800 p-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                </select>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="w-full py-1.5 bg-stone-955 hover:bg-stone-900 text-stone-200 text-[11px] font-bold tracking-widest uppercase rounded border border-stone-800 transition-all font-mono"
                >
                  Save Language Tag
                </button>
              </div>

            </div>
          </div>
        )}

        {step === 7 && (
          <div id="step-7-section-order" className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Layout Section Reorganizer</h3>
              <p className="text-xs text-stone-400 mt-1">
                Customize structural positioning values. Executives frequently place Core Competencies above Academic history. Click Move constraints below to re-stack.
              </p>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              {data.sectionOrder.map((sec, idx) => (
                <div
                  key={sec}
                  className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between"
                >
                  <span className="text-xs font-mono font-bold uppercase text-stone-300">
                    {idx + 1}. {sec.replace("_", " ")}
                  </span>
                  
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => moveSection(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded bg-stone-950 text-stone-400 hover:text-sky-400 disabled:opacity-20 disabled:hover:text-stone-400 transition-all"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(idx, "down")}
                      disabled={idx === data.sectionOrder.length - 1}
                      className="p-1 rounded bg-stone-950 text-stone-400 hover:text-sky-400 disabled:opacity-20 disabled:hover:text-stone-400 transition-all"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Manual progression controls footer block */}
      <div className="flex items-center justify-between border-t border-stone-900 pt-5 print:hidden">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 px-4 py-2 hover:bg-stone-900 text-xs font-mono font-bold text-stone-400 hover:text-white rounded-lg transition-all disabled:opacity-20"
        >
          <ArrowLeft size={14} />
          <span>Back Step</span>
        </button>

        <button
          onClick={() => setStep(prev => Math.min(stepsList.length - 1, prev + 1))}
          disabled={step === stepsList.length - 1}
          className="flex items-center gap-1 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-xs font-mono font-bold text-sky-400 hover:text-white border border-sky-500/10 rounded-lg transition-all disabled:opacity-25"
        >
          <span>Next Step</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
