export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  duration: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "Technical" | "Management" | "Soft Skills" | "Other";
  level: "Beginner" | "Intermediate" | "Expert" | "Elite";
}

export interface Project {
  id: string;
  name: string;
  role: string;
  duration: string;
  description: string;
  technologies: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Conversational";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string; // e.g. "Increased sales by 42%"
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  careerLevel: "Student" | "Graduate" | "Professional" | "Executive";
  template: "executive" | "modern" | "minimalist" | "ats" | "creative" | "chic" | "emerald";
  personalInfo: {
    fullName: string;
    targetTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  sectionOrder: string[]; // for section sorting
}

export interface ATSAnalysisResult {
  score: number;
  grammarRating: string;
  keywordsRating: string;
  actionVerbsRating: string;
  metricsScore: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  improvedSummary?: string;
}

export interface CoverLetterResult {
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  date: string;
  subject: string;
  letterContent: string;
}
