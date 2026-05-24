import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Check, Plus, Trash2, Copy, FileText, Layout, Award, 
  ShieldCheck, Undo2, Redo2, Layers, Printer, ArrowRight, ChevronDown, 
  Settings, LogOut, Trophy, HelpCircle, BarChart3, Star, Zap, Save 
} from "lucide-react";
import { ResumeData } from "./types";
import TemplateRenderer from "./components/Templates";
import ResumeBuilder from "./components/ResumeBuilder";
import AIEngine from "./components/AIEngine";
import GrowthSEO from "./components/GrowthSEO";
import AdminPanel from "./components/AdminPanel";
import SubscriptionModal from "./components/SubscriptionModal";
import TemplateGallery from "./components/TemplateGallery";
import { LayoutTemplate } from "lucide-react";

// Seed / Initial Empty Resume Template
const DEFAULT_RESUME: ResumeData = {
  id: "draft-1",
  title: "Flagship Executive Draft",
  updatedAt: new Date().toLocaleString(),
  careerLevel: "Executive",
  template: "executive",
  personalInfo: {
    fullName: "Sterling Hunt",
    targetTitle: "Chief Product Officer",
    email: "sterling.hunt@houseventure.com",
    phone: "+1 (555) 720-1950",
    location: "London, UK",
    linkedin: "linkedin.com/in/sterling-hunt",
    website: "sterlinghunt.co"
  },
  summary: "Accomplished Product Executive backed by 12+ years directing end-to-end product development life cycles and platform monetizations. Spearheaded the digital overhaul of a legacy enterprise transaction utility, elevating user engagement index by 42% while trimming monthly VPS compute storage spends by $180K annually.",
  experiences: [
    {
      id: "exp-1",
      company: "House Venture Products",
      role: "VP of Product Engineering",
      location: "London, UK",
      duration: "2022 - Present",
      description: [
        "Directed end-to-end strategy, telemetry setups, and product features delivery across 4 cross-functional development squads.",
        "Refined checkout pipeline code flows to drop transaction checkout bottlenecks, driving a 14.5% uptick in MoM trial-to-subscriber conversions.",
        "Spearheaded database indexing structures across distributed PostgreSQL clusters, slashing global average API query times from 420ms to 85ms."
      ]
    },
    {
      id: "exp-2",
      company: "Aether Global Systems",
      role: "Lead Platform Strategist",
      location: "New York, NY",
      duration: "2018 - 2022",
      description: [
        "Pioneered secure monolithic migrations to Kubernetes environments, improving delivery build speed by 2.4x.",
        "Negotiated custom enterprise terms with cloud hosting vendors, trimming CapEx operations costs by $240K annually."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Imperial College London",
      degree: "Master of Science",
      field: "Advanced Software Architectures",
      location: "London, UK",
      duration: "2015 - 2017",
      description: "Graduated with Dean's Honors List distinction"
    }
  ],
  skills: [
    { id: "sk-1", name: "Strategic Roadmap Priorities", category: "Management", level: "Elite" },
    { id: "sk-2", name: "A/B Multivariate Testing", category: "Technical", level: "Expert" },
    { id: "sk-3", name: "PostgreSQL Analytics", category: "Technical", level: "Expert" },
    { id: "sk-4", name: "Cross-functional Leadership", category: "Soft Skills", level: "Elite" }
  ],
  projects: [
    {
      id: "p-1",
      name: "Helios Checkout Integration",
      role: "Product Owner",
      duration: "2023",
      description: "Re-engineered secure commercial checkout systems processing upwards of $12M in gross transactions annually.",
      technologies: "React, Node, Redis, PostgreSQL"
    }
  ],
  certifications: [
    { id: "c-1", name: "Certified Scrum Product Owner (CSPO)", issuer: "Scrum Alliance", year: "2021" }
  ],
  languages: [
    { id: "l-1", name: "English", proficiency: "Native" }
  ],
  achievements: [
    { id: "a-1", title: "Corporate Acceleration Award", description: "Secured high-priority enterprise software licenses with 3 bank partners", metric: "$4.2M gross ARR" }
  ],
  sectionOrder: ["summary", "experience", "skills", "projects", "education", "certifications", "languages", "achievements"]
};

// Alternative Preset templates for direct cloning, preventing blank page syndrome
const MOCK_PRESETS: Record<string, ResumeData> = {
  "ai-engineer": {
    id: "preset-ai",
    title: "AI Engineer Preset",
    updatedAt: new Date().toLocaleString(),
    careerLevel: "Professional",
    template: "modern",
    personalInfo: {
      fullName: "Aris Thorne",
      targetTitle: "Staff AI Infrastructure Architect",
      email: "aris.thorne@houseventure.com",
      phone: "+1 (555) 902-1240",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/aris-thorne",
      website: "arisai.dev"
    },
    summary: "Expert Artificial Intelligence Architect specializing in deploying high-availability LLMs and optimized training clustering. Reduced prompt processing latency parameters by 38% using hardware tensor compiles.",
    experiences: [
      {
        id: "exp-ai-1",
        company: "Synthetica AI Research",
        role: "Senior CUDA Clusters Specialist",
        location: "Oakland, CA",
        duration: "2023 - Present",
        description: [
          "Coordinated distributed CUDA checkpoints saving schedules across clusters of 128+ GPU cells, maximizing checkpoint saving rate by 2.4x.",
          "Configured modular Kubernetes clusters managing multi-tenant LLM weights caching, conserving $120K in cloud compute spend parameters."
        ]
      }
    ],
    education: [
      { id: "edu-ai-1", school: "Stanford University", degree: "Bachelor of Science", field: "Computer Science", location: "Palo Alto, CA", duration: "2019 - 2023", description: "Focus area: Machine Learning Telemetry" }
    ],
    skills: [
      { id: "sk-ai-1", name: "LLM Orchestration", category: "Technical", level: "Elite" },
      { id: "sk-ai-2", name: "TensorRT Compile Scheduling", category: "Technical", level: "Expert" },
      { id: "sk-ai-3", name: "VRAM Optimization Strategy", category: "Technical", level: "Expert" }
    ],
    projects: [
      { id: "proj-ai-1", name: "Atlas Model Compiler", role: "Pioneering Engineer", duration: "2024", description: "Deployed custom quantization models reducing raw memory load guidelines from 48GB to 12GB.", technologies: "vLLM, Python, PyTorch, Docker" }
    ],
    certifications: [
      { id: "cert-ai-1", name: "NVIDIA Certified GPU Architect", issuer: "Nvidia Academy", year: "2024" }
    ],
    languages: [{ id: "lang-ai-1", name: "English", proficiency: "Fluent" }],
    achievements: [{ id: "ach-ai-1", title: "Innovation of the Year", description: "Designed local custom weight slicing tool", metric: "Reduced LLM lag by 38%" }],
    sectionOrder: ["summary", "experience", "skills", "projects", "education"]
  },
  "vp-product": {
    id: "preset-vp",
    title: "C-Suite Executive Preset",
    updatedAt: new Date().toLocaleString(),
    careerLevel: "Executive",
    template: "executive",
    personalInfo: {
      fullName: "Evelyn Vance",
      targetTitle: "VP of Enterprise Product Growth",
      email: "evance@houseventure.com",
      phone: "+1 (555) 480-8900",
      location: "Boston, MA",
      linkedin: "linkedin.com/in/evelyn-vance-growth",
      website: "evelynvance.co"
    },
    summary: "High-performing Senior Product Executive recognized for driving multivariate landing strategies, analytics integrations, and enterprise conversions. Handled $14M CapEx annual product portfolios.",
    experiences: [
      {
        id: "exp-vp-1",
        company: "Vanguard Platform Sol",
        role: "VP of Product and Growth Strategy",
        location: "Boston, MA",
        duration: "2021 - Present",
        description: [
          "Coordinated digital roadmap prioritisations for 4 growth design squads, launching target checkout flows 3 weeks ahead of scheduled delivery.",
          "Orchestrated A/B experimental testing sequences, elevating customer active retainment thresholds by 11.5% and mitigating ARR churn by $1.2M."
        ]
      }
    ],
    education: [
      { id: "edu-vp-1", school: "Harvard Business School", degree: "MBA", field: "Strategic Organization", location: "Cambridge, MA", duration: "2018 - 2020", description: "Graduated with Executive Scholar Honors" }
    ],
    skills: [
      { id: "sk-vp-1", name: "Product Monetization", category: "Technical", level: "Elite" },
      { id: "sk-vp-2", name: "Cohort Retention Analytics", category: "Technical", level: "Expert" }
    ],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
    sectionOrder: ["summary", "experience", "education", "skills"]
  }
};

export default function App() {
  // SaaS states
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string>("draft-1");
  const [activeTab, setActiveTab] = useState<"wizard" | "ai" | "seo" | "admin">("wizard");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showSubModal, setShowSubModal] = useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(true);

  // Undo / Redo visual history stacks
  const [history, setHistory] = useState<ResumeData[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Notification banners
  const [copiedTXT, setCopiedTXT] = useState<boolean>(false);
  const [autosaveFlashing, setAutosaveFlashing] = useState<boolean>(false);

  // Initialize draft list
  useEffect(() => {
    const saved = localStorage.getItem("hv_resumes");
    const activeId = localStorage.getItem("hv_active_id");
    const premiumState = localStorage.getItem("hv_premium_state");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResumes(parsed);
          if (activeId && parsed.some(r => r.id === activeId)) {
            setActiveResumeId(activeId);
          } else {
            setActiveResumeId(parsed[0].id);
          }
        } else {
          setResumes([DEFAULT_RESUME]);
        }
      } catch (e) {
        setResumes([DEFAULT_RESUME]);
      }
    } else {
      setResumes([DEFAULT_RESUME]);
    }

    if (premiumState === "true") {
      setIsPremium(true);
    }
  }, []);

  // Save drafts to localStorage with autosave flashing indicator
  const syncToLocalStorage = (list: ResumeData[], activeId: string) => {
    localStorage.setItem("hv_resumes", JSON.stringify(list));
    localStorage.setItem("hv_active_id", activeId);
    setAutosaveFlashing(true);
    setTimeout(() => setAutosaveFlashing(false), 800);
  };

  const getActiveResume = (): ResumeData => {
    return resumes.find(r => r.id === activeResumeId) || resumes[0] || DEFAULT_RESUME;
  };

  const updateActiveResume = (updated: ResumeData) => {
    const revisedList = resumes.map(r => r.id === activeResumeId ? { ...updated, updatedAt: new Date().toLocaleString() } : r);
    setResumes(revisedList);
    syncToLocalStorage(revisedList, activeResumeId);

    // Update historic frames
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(revisedList);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  // Multiple resumes management
  const handleCreateNewResume = () => {
    const newId = `draft-${Date.now()}`;
    const newDraft: ResumeData = {
      ...DEFAULT_RESUME,
      id: newId,
      title: `Executive Draft Portfolio #${resumes.length + 1}`,
      updatedAt: new Date().toLocaleString()
    };
    const updatedList = [...resumes, newDraft];
    setResumes(updatedList);
    setActiveResumeId(newId);
    syncToLocalStorage(updatedList, newId);
  };

  const handleCloneResume = () => {
    const active = getActiveResume();
    const newId = `clone-${Date.now()}`;
    const cloned: ResumeData = {
      ...active,
      id: newId,
      title: `${active.title} (Clone)`,
      updatedAt: new Date().toLocaleString()
    };
    const updatedList = [...resumes, cloned];
    setResumes(updatedList);
    setActiveResumeId(newId);
    syncToLocalStorage(updatedList, newId);
  };

  const handleDeleteResume = (idToDelete: string) => {
    if (resumes.length === 1) return; // Keep at least one active draft
    const updatedList = resumes.filter(r => r.id !== idToDelete);
    setResumes(updatedList);
    const nextActive = updatedList[0].id;
    setActiveResumeId(nextActive);
    syncToLocalStorage(updatedList, nextActive);
  };

  // Presets load triggers (cloning preset directly to the user active draft)
  const handleImportPredefinedPreset = (key: string) => {
    const templateData = MOCK_PRESETS[key];
    if (templateData) {
      updateActiveResume({
        ...templateData,
        id: activeResumeId, // Preserve the id
        title: `Pre-fill: ${templateData.title}`
      });
      setActiveTab("wizard"); // Go straight to the builder
    }
  };

  // Undo / Redo mechanics
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const prevList = history[prevIdx];
      setResumes(prevList);
      setHistoryIndex(prevIdx);
      localStorage.setItem("hv_resumes", JSON.stringify(prevList));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const nextList = history[nextIdx];
      setResumes(nextList);
      setHistoryIndex(nextIdx);
      localStorage.setItem("hv_resumes", JSON.stringify(nextList));
    }
  };

  // Premium toggle
  const handleTogglePremiumStateStatus = (status: boolean) => {
    setIsPremium(status);
    localStorage.setItem("hv_premium_state", status ? "true" : "false");
  };

  // Raw plain text copy trigger
  const handleExportTextToClipboard = () => {
    const active = getActiveResume();
    const exprs = active.experiences.map(e => `[${e.duration}] ${e.role} at ${e.company} (${e.location})\n- ${e.description.join("\n- ")}`).join("\n\n");
    const edus = active.education.map(ed => `[${ed.duration}] ${ed.degree} focused on ${ed.field} at ${ed.school} (${ed.location})`).join("\n");
    const sks = active.skills.map(s => `${s.name} (${s.level})`).join(", ");

    const textToCopy = `
${active.personalInfo.fullName.toUpperCase()}
${active.personalInfo.targetTitle}
${active.personalInfo.email} | ${active.personalInfo.phone} | ${active.personalInfo.location}
Website: ${active.personalInfo.website} | LinkedIn: ${active.personalInfo.linkedin}

PROFESSIONAL SUMMARY:
${active.summary}

WORK HISTORY:
${exprs}

CORE COMPETENCIES:
${sks}

EDUCATION:
${edus}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopiedTXT(true);
    setTimeout(() => setCopiedTXT(false), 1500);
  };

  const currentResume = getActiveResume();

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      
      {/* Platform Header */}
      <header id="builder-header" className="no-print border-b border-slate-900 bg-[#070e1e]/85 backdrop-blur px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 z-10 sticky top-0">
        
        {/* Identity & title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-slate-950 font-serif font-extrabold text-xl shadow-lg ring-1 ring-sky-500/20 select-none">
            H
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider uppercase flex items-center gap-1.5 text-white">
              <span>House Venture</span>
              <span className="text-sky-400 font-serif italic font-light lowercase tracking-normal text-sm border-l border-slate-800 pl-2">resumes</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-slate-400 capitalize">Career Development Suite</span>
            </div>
          </div>
        </div>

        {/* Live Autosave indicators & Switcher controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
          
          {/* Autosave flag */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <Save size={10} className={autosaveFlashing ? "text-sky-400 animate-spin" : ""} />
            <span>{autosaveFlashing ? "AUTOSAVE SECURE" : "AUTOSAVE ACTIVE"}</span>
          </div>

          {/* SaaS Active Tier badge */}
          {isPremium ? (
            <div className="flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 px-3 py-1 text-xs font-semibold text-sky-400">
              <Trophy size={11} className="text-sky-400 animate-pulse" />
              <span>Elite Partner Member</span>
            </div>
          ) : (
            <button
              onClick={() => setShowSubModal(true)}
              id="header-btn-upgrade"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-350 hover:to-blue-400 text-white px-3.5 py-1 text-xs font-bold active:scale-95 transition-all shadow-md"
            >
              <Zap size={11} className="fill-white" />
              <span>Upgrade Elite</span>
            </button>
          )}

          {/* Separation line */}
          <span className="h-5 w-px bg-slate-800 hidden sm:block"></span>

          {/* Direct Sandbox Admin Trigger */}
          <button
            onClick={() => {
              setActiveTab("admin");
              const el = document.getElementById("admin-panel");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="p-1 px-2.5 hover:bg-slate-900 text-[10.5px] text-slate-400 hover:text-sky-400 uppercase tracking-widest border border-slate-800 rounded hover:border-sky-500/10 font-mono transition-all"
          >
            Admin Ops
          </button>
        </div>
      </header>

      {/* Main split work-desk container */}
      <main className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        
        {/* Left column sidebar lists and forms panel */}
        <div id="builder-sidebar" className="no-print w-full xl:w-[500px] xl:border-r border-slate-900 bg-slate-900/10 overflow-y-auto flex flex-col shrink-0">
          
          {/* Draft switcher section */}
          <div id="resume-drafts-bar" className="p-4 bg-slate-950/30 border-b border-slate-900 flex items-center justify-between gap-2.5">
            
            <div className="flex items-center gap-2 max-w-xs flex-1">
              <span className="text-xs text-slate-400 font-mono font-bold uppercase shrink-0">Portfolio:</span>
              <select
                value={activeResumeId}
                onChange={(e) => {
                  setActiveResumeId(e.target.value);
                  localStorage.setItem("hv_active_id", e.target.value);
                }}
                className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-sky-500 max-w-full font-bold"
              >
                {resumes.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCreateNewResume}
                title="Create New Draft"
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 hover:text-sky-400 transition-colors text-white"
              >
                <Plus size={13} />
              </button>
              <button
                onClick={handleCloneResume}
                title="Clone Active Draft"
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 hover:text-sky-400 transition-colors text-white"
              >
                <Layers size={13} />
              </button>
              <button
                onClick={() => handleDeleteResume(activeResumeId)}
                title="Delete Current Draft"
                disabled={resumes.length === 1}
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 hover:text-red-400 transition-colors text-white disabled:opacity-20"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Quick interactive historical Undo / Redo board */}
          <div id="undo-redo-panel" className="px-4 py-2 bg-slate-950/10 border-b border-slate-900/60 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Active Controls:</span>
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1 rounded bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-20 transition-all font-mono text-[9px] flex items-center gap-1"
            >
              <Undo2 size={10} />
              <span>Undo</span>
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1 rounded bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white disabled:opacity-20 transition-all font-mono text-[9px] flex items-center gap-1"
            >
              <Redo2 size={10} />
              <span>Redo</span>
            </button>
          </div>

          {/* Core workspace switcher triggers */}
          <nav className="p-4 flex gap-1 bg-slate-950/40 border-b border-slate-900">
            <button
              onClick={() => setActiveTab("wizard")}
              className={`flex-1 flex flex-col py-1.5 items-center justify-center rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "wizard" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers size={14} className="mb-0.5" />
              <span>Wizard</span>
            </button>
            <button
              onClick={() => {
                if (!isPremium) {
                  setShowSubModal(true);
                  return;
                }
                setActiveTab("ai");
              }}
              className={`flex-1 flex flex-col py-1.5 items-center justify-center rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "ai" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles size={14} className="mb-0.5 text-sky-400" />
              <span className="flex items-center gap-0.5 animate-pulse">
                <span>AI Core</span>
                {!isPremium && <span className="text-[7px] bg-sky-500 text-slate-950 px-1 py-0.2 rounded-full font-sans font-black uppercase">Pro</span>}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`flex-1 flex flex-col py-1.5 items-center justify-center rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "seo" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <Star size={14} className="mb-0.5" />
              <span>SEO Guides</span>
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 flex flex-col py-1.5 items-center justify-center rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "admin" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 size={14} className="mb-0.5" />
              <span>Oversight</span>
            </button>
          </nav>

          {/* Left area view switcher route rendering */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "wizard" && (
                <ResumeBuilder
                  data={currentResume}
                  onChange={updateActiveResume}
                  isPremium={isPremium}
                  onUnlockPremium={() => setShowSubModal(true)}
                />
              )}

              {activeTab === "ai" && (
                <AIEngine
                  resumeData={currentResume}
                  isPremium={isPremium}
                  onUnlockPremium={() => setShowSubModal(true)}
                />
              )}

              {activeTab === "seo" && (
                <GrowthSEO onLoadPredefined={handleImportPredefinedPreset} />
              )}

              {activeTab === "admin" && (
                <AdminPanel
                  onClearResumes={() => {
                    setResumes([DEFAULT_RESUME]);
                    setActiveResumeId(DEFAULT_RESUME.id);
                    syncToLocalStorage([DEFAULT_RESUME], DEFAULT_RESUME.id);
                  }}
                  onSeedResumes={() => {
                    const dynamicAdded = [...resumes, { ...MOCK_PRESETS["ai-engineer"], id: `seed-ai-${Date.now()}` }, { ...MOCK_PRESETS["vp-product"], id: `seed-vp-${Date.now()}` }];
                    setResumes(dynamicAdded);
                    syncToLocalStorage(dynamicAdded, activeResumeId);
                  }}
                  isPremium={isPremium}
                  onSetPremium={handleTogglePremiumStateStatus}
                  totalResumesCount={resumes.length}
                />
              )}
            </motion.div>
          </div>

        </div>

        {/* Right column live template canvas preview area */}
        <div id="preview-panel" className="flex-1 bg-[#0a0f1d] overflow-y-auto flex flex-col">
          
          {/* Preview action board */}
          <div className="no-print bg-[#080d19] p-4 border-b border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
            
            {/* Gallery Drawer Toggle Button instead of simple row */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGallery(!showGallery)}
                title="Open Interactive Design Studio & Live Template Gallery"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider transition-all duration-300 active:scale-95 ${
                  showGallery
                    ? "bg-sky-500 text-slate-950 border-sky-450 shadow-md shadow-sky-500/10"
                    : "bg-slate-900 text-slate-300 border-slate-850 hover:text-white hover:border-slate-750"
                }`}
              >
                <LayoutTemplate size={13} className={showGallery ? "text-slate-950" : "text-sky-400"} />
                <span>DESIGN STUDIO GALLERY</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-sans ${
                  showGallery ? "bg-slate-950 text-sky-450" : "bg-slate-800 text-slate-400"
                }`}>
                  7
                </span>
              </button>
            </div>

            {/* Print and Export actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleExportTextToClipboard}
                title="Export values as Plain Text"
                className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-400 hover:text-white transition-all active:scale-95"
              >
                {copiedTXT ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedTXT ? "COPIED" : "EXPORT TXT"}</span>
              </button>

              <button
                onClick={() => window.print()}
                title="Save Portfolio as PDF using standard browser print utility"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-mono font-bold hover:bg-sky-400 tracking-wider transition-all active:scale-95 shadow-md shadow-sky-500/10"
              >
                <Printer size={13} />
                <span>PRINT / PDF EXPORT</span>
              </button>
            </div>
          </div>

          {/* Real render workspace canvas wrapper */}
          <div className="flex-1 p-4 sm:p-6 xl:p-8 overflow-y-auto w-full max-w-[1240px] mx-auto print:p-0 print:max-w-full space-y-6">
            
            {showGallery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full"
              >
                <TemplateGallery
                  activeTemplate={currentResume.template}
                  onSelectTemplate={(tmpl) => updateActiveResume({ ...currentResume, template: tmpl })}
                  isPremium={isPremium}
                  onUnlockPremium={() => setShowSubModal(true)}
                />
              </motion.div>
            )}

            <div id="preview-container" className="shadow-2xl rounded-xl overflow-hidden bg-white max-w-[210mm] mx-auto print:shadow-none print:rounded-none">
              <TemplateRenderer data={currentResume} />
            </div>
          </div>

        </div>

      </main>

      {/* Popups subscription gating modal */}
      <SubscriptionModal
        isOpen={showSubModal}
        onClose={() => setShowSubModal(false)}
        onSubscribeSuccess={() => handleTogglePremiumStateStatus(true)}
        isPremium={isPremium}
      />

    </div>
  );
}
