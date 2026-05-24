import React from "react";
import { ResumeData } from "../types";
import { Phone, Mail, MapPin, Linkedin, Globe, Calendar, Award, Star, ListOrdered } from "lucide-react";

interface TemplateRendererProps {
  data: ResumeData;
  sectionOrder?: string[];
}

export default function TemplateRenderer({ data, sectionOrder }: TemplateRendererProps) {
  const activeOrder = sectionOrder || data.sectionOrder || [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "achievements"
  ];

  // Helper selectors
  const { fullName, targetTitle, email, phone, location, linkedin, website } = data.personalInfo;

  // Global styled heading renderer to keep sections unified but distinct
  const renderHeading = (title: string) => {
    let style = "text-sm font-semibold uppercase tracking-wider border-b border-stone-200 pb-1 text-stone-900 font-sans";
    if (data.template === "emerald") {
      style = "text-xs font-extrabold uppercase tracking-widest border-b border-emerald-900/30 pb-1 text-emerald-800 font-sans";
    } else if (data.template === "chic") {
      style = "text-[11px] font-bold uppercase tracking-[0.25em] border-b border-amber-800/25 pb-1 text-stone-950 font-serif";
    } else if (data.template === "creative") {
      style = "text-xs font-bold uppercase tracking-widest border-b border-stone-300 pb-1 text-stone-900 font-mono";
    } else if (data.template === "minimalist") {
      style = "text-xs font-semibold uppercase tracking-widest border-b border-stone-100 pb-1 text-stone-950 font-serif";
    }
    return (
      <h3 className={style}>
        {title}
      </h3>
    );
  };

  // Render components based on section identifier
  const renderSection = (sec: string) => {
    const isChic = data.template === "chic";
    const bodyFontClass = isChic || data.template === "minimalist" ? "font-serif text-stone-850" : "font-sans text-stone-700";

    switch (sec) {
      case "summary":
        if (!data.summary) return null;
        return (
          <div key={sec} className="print-section px-1 mb-5">
            {renderHeading("Professional Summary")}
            {isChic ? (
              <div className="mt-4 px-3 py-1 border-l-2 border-amber-800/20 italic text-stone-800 text-xs leading-relaxed font-serif">
                "{data.summary}"
              </div>
            ) : (
              <p className={`text-xs leading-relaxed mt-2.5 ${bodyFontClass}`}>
                {data.summary}
              </p>
            )}
          </div>
        );

      case "experience":
        if (data.experiences.length === 0) return null;
        return (
          <div key={sec} className="print-section px-1 mb-5">
            {renderHeading("Work Experience")}
            <div className="mt-3 space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-xs text-stone-950 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>
                      {exp.role} — <span className="font-normal text-stone-600">{exp.company}</span>
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">{exp.duration}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-stone-500 font-mono">
                    <span>{exp.location}</span>
                  </div>
                  <ul className={`list-disc pl-4 space-y-1 mt-1.5 text-xs ${bodyFontClass}`}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (data.education.length === 0) return null;
        return (
          <div key={sec} className="print-section px-1 mb-5">
            {renderHeading("Education")}
            <div className="mt-3 space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-xs text-stone-950 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>
                      {edu.degree} in {edu.field}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">{edu.duration}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-stone-500 font-mono">
                    <span>{edu.school}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p className={`text-xs text-stone-600 italic mt-1 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (data.skills.length === 0) return null;
        // Group skills by category
        const groupedSkills = data.skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {} as Record<string, typeof data.skills>);

        const badgeBgClass = 
          data.template === "emerald" ? "bg-emerald-50 text-emerald-950 border-emerald-100" :
          data.template === "chic" ? "bg-amber-500/5 text-stone-900 border-amber-800/10" :
          "bg-stone-100 text-stone-850 border-stone-200/50";

        return (
          <div key={sec} className="print-section px-1 mb-4">
            {renderHeading("Core Competencies & Skills")}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(groupedSkills).map(([cat, sks]) => (
                <div key={cat} className="space-y-1">
                  <div className="text-[9px] font-mono tracking-widest font-bold text-stone-500 uppercase">{cat}</div>
                  <div className="flex flex-wrap gap-1">
                    {sks.map((sk) => (
                      <span
                        key={sk.id}
                        className={`text-xs font-sans px-2 py-0.5 rounded border ${badgeBgClass}`}
                      >
                        {sk.name}{" "}
                        <span className="text-[9px] text-stone-400 font-mono">({sk.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (data.projects.length === 0) return null;
        return (
          <div key={sec} className="print-section px-1 mb-5">
            {renderHeading("Highlight Projects")}
            <div className="mt-3 space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-stone-950 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>
                      {proj.name} <span className="text-stone-500 font-normal">({proj.role})</span>
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">{proj.duration}</span>
                  </div>
                  {proj.technologies && (
                    <div className="text-[9px] text-sky-600 font-mono">Tech: {proj.technologies}</div>
                  )}
                  <p className={`leading-relaxed ${bodyFontClass}`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (data.certifications.length === 0) return null;
        return (
          <div key={sec} className="print-section px-1 mb-4">
            {renderHeading("Certifications")}
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center bg-stone-50/50 p-2 rounded border border-stone-100">
                  <span className={`font-medium text-stone-900 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>{cert.name}</span>
                  <span className="font-mono text-[10px] text-stone-500 ml-2 shrink-0">
                    {cert.issuer} • {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (data.languages.length === 0) return null;
        return (
          <div key={sec} className="print-section px-1 mb-4">
            {renderHeading("Languages")}
            <div className="mt-2 flex flex-wrap gap-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-xs bg-stone-50 border border-stone-200/50 px-2.5 py-1 rounded flex items-center gap-1.5">
                  <span className={`font-semibold text-stone-900 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>{lang.name}</span>
                  <span className="text-stone-500 text-[10px] font-mono">({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (data.achievements.length === 0) return null;
        
        const achBgClass = 
          data.template === "emerald" ? "bg-emerald-500/5 border-emerald-800/15" :
          data.template === "chic" ? "bg-amber-500/5 border-amber-800/10" :
          "bg-sky-500/5 border-sky-500/10";
          
        const achIconColor =
          data.template === "emerald" ? "text-emerald-700" :
          data.template === "chic" ? "text-amber-800" :
          "text-sky-600";

        return (
          <div key={sec} className="print-section px-1 mb-4">
            {renderHeading("Key Achievements")}
            <div className="mt-2.5 space-y-1.5 text-xs text-stone-700">
              {data.achievements.map((ach) => (
                <div key={ach.id} className={`flex gap-2 items-start p-2 rounded border ${achBgClass}`}>
                  <Award size={14} className={`${achIconColor} mt-0.5 shrink-0`} />
                  <div>
                    <span className={`font-bold text-stone-950 ${isChic || data.template === "minimalist" ? "font-serif" : "font-sans"}`}>{ach.title}: </span>
                    <span className={bodyFontClass}>{ach.description}</span>
                    {ach.metric && (
                      <span className={`${achIconColor} font-semibold text-[10px] block font-mono mt-0.5`}>
                        Impact metric: {ach.metric}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderExecutive = () => {
    return (
      <div className="bg-white p-6 sm:p-10 text-stone-900 border border-stone-200 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-sans">
        {/* Luxury top accent stripe */}
        <div className="h-2 w-full bg-stone-950 -mt-10 mb-6 mx-auto"></div>
        <div className="flex flex-col md:flex-row md:justify-between border-b-2 border-stone-950 pb-6 mb-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-stone-950 font-sans">
              {fullName || "EXECUTIVE CANDIDATE"}
            </h1>
            <p className="text-sm font-mono tracking-widest uppercase text-sky-600 font-semibold">
              {targetTitle || "STRATEGIC LEADERSHIP / MANAGEMENT"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1 text-[11px] text-stone-600 font-mono text-center md:text-right">
            {email && <div className="flex items-center justify-center md:justify-end gap-1"><Mail size={10} /> {email}</div>}
            {phone && <div className="flex items-center justify-center md:justify-end gap-1"><Phone size={10} /> {phone}</div>}
            {location && <div className="flex items-center justify-center md:justify-end gap-1"><MapPin size={10} /> {location}</div>}
            {linkedin && <div className="flex items-center justify-center md:justify-end gap-1"><Linkedin size={10} /> {linkedin}</div>}
            {website && <div className="flex items-center justify-center md:justify-end gap-1"><Globe size={10} /> {website}</div>}
          </div>
        </div>
        <div className="space-y-6">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  const renderModern = () => {
    return (
      <div className="bg-white p-6 sm:p-8 text-stone-900 border border-stone-200 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-sans">
        <div className="mb-6 bg-stone-950 text-white p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-3xl font-extrabold text-white font-sans">{fullName || "EXECUTIVE PORTFOLIO"}</h1>
            <p className="text-sky-400 text-xs font-mono uppercase tracking-widest font-bold">{targetTitle || "DESIGNATED TRAJECTORY"}</p>
          </div>
          <div className="space-y-1 block text-stone-400 text-[10px] font-mono text-center sm:text-right">
            {email && <p className="hover:text-white">{email}</p>}
            {phone && <p className="hover:text-white">{phone}</p>}
            {location && <p className="hover:text-white">{location}</p>}
            {linkedin && <p className="hover:text-white">{linkedin}</p>}
          </div>
        </div>
        <div className="space-y-6 font-sans">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  const renderMinimalist = () => {
    return (
      <div className="bg-white p-6 sm:p-8 text-stone-900 border border-stone-200 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-serif">
        <div className="text-center space-y-2 border-b border-stone-100 pb-5 mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-950 font-serif lowercase italic">
            {fullName || "unnamed expert"}
          </h1>
          <p className="text-stone-500 font-mono text-xs uppercase tracking-wider">{targetTitle || "strategic professional"}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-stone-400 font-mono uppercase">
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
            {location && <span>{location}</span>}
            {linkedin && <span>{linkedin}</span>}
          </div>
        </div>
        <div className="space-y-6 font-serif">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  const renderATSClassic = () => {
    return (
      <div className="bg-white p-6 sm:p-8 text-stone-900 border border-stone-100 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-sans">
        <div className="text-center space-y-1 mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-black">{fullName?.toUpperCase() || "CANDIDATE PROFILE"}</h1>
          <p className="text-xs font-semibold uppercase text-stone-700">{targetTitle}</p>
          <div className="text-[11px] text-stone-600 font-sans space-x-1">
            <span>{email}</span>
            <span>|</span>
            <span>{phone}</span>
            <span>|</span>
            <span>{location}</span>
            {linkedin && (
              <>
                <span>|</span>
                <span>{linkedin}</span>
              </>
            )}
            {website && (
              <>
                <span>|</span>
                <span>{website}</span>
              </>
            )}
          </div>
        </div>
        <div className="space-y-5 font-sans">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  // NEW TEMPLATE 1: Creative Dual-Column Sidebar Layout
  const renderCreative = () => {
    // Custom partitions
    const sidebarSections = ["skills", "education", "certifications", "languages"];
    const mainSections = ["summary", "experience", "projects", "achievements"];

    const leftSections = activeOrder.filter((sec) => sidebarSections.includes(sec));
    const rightSections = activeOrder.filter((sec) => mainSections.includes(sec));

    return (
      <div className="bg-white text-stone-900 border border-stone-200 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto flex flex-col font-sans print:border-none print:shadow-none print:p-0">
        {/* Full-width block Header */}
        <div className="bg-stone-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-black text-white font-sans uppercase tracking-tight">{fullName || "CREATIVE CANDIDATE"}</h1>
            <p className="text-xs font-mono uppercase tracking-[0.2em] font-extrabold text-sky-400">{targetTitle || "PRODUCT & DESIGN EXPERT"}</p>
          </div>
          <div className="text-[10px] font-mono text-stone-300 space-y-1 text-center sm:text-right">
            {email && <p className="flex items-center justify-center sm:justify-end gap-1"><Mail size={10} className="text-sky-400" /> {email}</p>}
            {phone && <p className="flex items-center justify-center sm:justify-end gap-1"><Phone size={10} className="text-sky-400" /> {phone}</p>}
            {location && <p className="flex items-center justify-start sm:justify-end gap-1"><MapPin size={10} className="text-sky-400" /> {location}</p>}
          </div>
        </div>

        {/* 2-Columns Layout Grid Body */}
        <div className="grid grid-cols-12 flex-1">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-5 bg-stone-50/80 border-r border-stone-150 p-5 sm:p-6 space-y-6">
            {leftSections.map((sec) => renderSection(sec))}
          </div>

          {/* Main area */}
          <div className="col-span-12 md:col-span-7 p-5 sm:p-6 space-y-6">
            {rightSections.map((sec) => renderSection(sec))}
          </div>
        </div>
      </div>
    );
  };

  // NEW TEMPLATE 2: Chic Premium Editorial Serifs
  const renderChic = () => {
    return (
      <div className="bg-[#FAF8F5] p-6 sm:p-10 text-stone-900 border border-stone-300 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-serif">
        <div className="text-center space-y-3 mb-8 border-b border-stone-200/55 pb-6">
          <div className="text-[9px] font-mono tracking-[0.25em] text-amber-800 uppercase font-bold">
            ESTABLISHED SPECIALIST RESUME
          </div>
          <h1 className="text-4xl text-stone-950 font-light italic font-serif leading-none tracking-tight">
            {fullName || "CHIC CANDIDATE"}
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-stone-600">
            {targetTitle || "STRATEGIST & OPERATIONS LEADER"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-500 font-serif pt-1">
            {email && <span className="flex items-center gap-1 font-sans text-[10px]"><Mail size={9} className="text-amber-800/60" /> {email}</span>}
            {phone && <span className="flex items-center gap-1 font-sans text-[10px]"><Phone size={9} className="text-amber-800/60" /> {phone}</span>}
            {location && <span className="flex items-center gap-1 font-sans text-[10px]"><MapPin size={9} className="text-amber-800/60" /> {location}</span>}
            {linkedin && <span className="flex items-center gap-1 font-sans text-[10px]"><Linkedin size={9} className="text-amber-800/60" /> {linkedin}</span>}
          </div>
        </div>

        <div className="space-y-6 font-serif">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  // NEW TEMPLATE 3: Elegant Emerald Green Accents
  const renderEmerald = () => {
    return (
      <div className="bg-white p-6 sm:p-10 text-stone-900 border border-stone-200 shadow-sm max-w-[210mm] min-h-[297mm] mx-auto print:border-none print:shadow-none print:p-0 font-sans">
        {/* Dynamic top emerald stripe */}
        <div className="h-2 w-full bg-emerald-800 -mt-10 mb-6 mx-auto"></div>

        <div className="flex flex-col md:flex-row md:justify-between items-start border-l-4 border-emerald-800 pl-4 py-1.5 mb-8">
          <div className="space-y-1 text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-950 font-sans">
              {fullName || "EXECUTIVE TARGET"}
            </h1>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-800 font-black">
              {targetTitle || "DESIGNATED TRAJECTORY"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1 text-[10px] text-stone-600 font-mono text-left md:text-right">
            {email && <div className="flex items-center justify-start md:justify-end gap-1"><Mail size={10} className="text-emerald-700" /> {email}</div>}
            {phone && <div className="flex items-center justify-start md:justify-end gap-1"><Phone size={10} className="text-emerald-700" /> {phone}</div>}
            {location && <div className="flex items-center justify-start md:justify-end gap-1"><MapPin size={10} className="text-emerald-700" /> {location}</div>}
            {linkedin && <div className="flex items-center justify-start md:justify-end gap-1"><Linkedin size={10} className="text-emerald-700" /> {linkedin}</div>}
          </div>
        </div>

        <div className="space-y-6 font-sans text-stone-750">
          {activeOrder.map((sectionId) => renderSection(sectionId))}
        </div>
      </div>
    );
  };

  switch (data.template) {
    case "modern":
      return renderModern();
    case "minimalist":
      return renderMinimalist();
    case "ats":
      return renderATSClassic();
    case "creative":
      return renderCreative();
    case "chic":
      return renderChic();
    case "emerald":
      return renderEmerald();
    case "executive":
    default:
      return renderExecutive();
  }
}
