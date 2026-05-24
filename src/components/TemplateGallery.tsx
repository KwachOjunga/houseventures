import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Columns, Sparkles, Award, Eye, FileText, LayoutTemplate, Star, Crown } from "lucide-react";
import { ResumeData } from "../types";

export interface TemplateGalleryProps {
  activeTemplate: "executive" | "modern" | "minimalist" | "ats" | "creative" | "chic" | "emerald";
  onSelectTemplate: (template: "executive" | "modern" | "minimalist" | "ats" | "creative" | "chic" | "emerald") => void;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
}

interface TemplateOption {
  id: "executive" | "modern" | "minimalist" | "ats" | "creative" | "chic" | "emerald";
  name: string;
  tagline: string;
  audience: string;
  isPremium: boolean;
  badge: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "executive",
    name: "Flagship Executive",
    tagline: "Ultra-luxury traditional corporate format with top accent pin.",
    audience: "C-Suite, Vice Presidents, Senior Directors",
    isPremium: false,
    badge: "Industry Favorite"
  },
  {
    id: "modern",
    name: "Apex Modern",
    tagline: "Solid dark header block designed for tech and product roles.",
    audience: "Software Engineers, Product Managers, Tech Leads",
    isPremium: false,
    badge: "Popular"
  },
  {
    id: "minimalist",
    name: "Serif Minimalist",
    tagline: "Spacious literary serif typeface centering the profile identity.",
    audience: "Academics, Researchers, Consultants, Writers",
    isPremium: false,
    badge: "Cleanest"
  },
  {
    id: "ats",
    name: "ATS Fortress Classic",
    tagline: "Text-optimized layout engineered to pass rigid machine parsing.",
    audience: "Defense, Finance, Standard Enterprise roles",
    isPremium: false,
    badge: "Machine Proof"
  },
  {
    id: "creative",
    name: "Split Creative Column",
    tagline: "Vibrant dual-column layout dividing skills and work timelines.",
    audience: "UX Designers, Digital Directors, Creatives",
    isPremium: true,
    badge: "Premium Dual"
  },
  {
    id: "chic",
    name: "Editorial Chic",
    tagline: "Premium warm off-white canvas with classic boutique styling.",
    audience: "Advisors, Luxury, Arts, Fashion Professionals",
    isPremium: true,
    badge: "Boutique Choice"
  },
  {
    id: "emerald",
    name: "Emerald Horizon",
    tagline: "Sleek sans-serif outline enriched with nature-tone borders.",
    audience: "Sustainability, Biotech, Healthcare Leaders",
    isPremium: true,
    badge: "New Release"
  }
];

export default function TemplateGallery({
  activeTemplate,
  onSelectTemplate,
  isPremium,
  onUnlockPremium
}: TemplateGalleryProps) {
  
  const handleSelect = (tmpl: TemplateOption) => {
    if (tmpl.isPremium && !isPremium) {
      if (onUnlockPremium) onUnlockPremium();
      return;
    }
    onSelectTemplate(tmpl.id);
  };

  // Thumbnail Micro-Render based on structural identity of templates
  const renderMicroLayout = (id: typeof activeTemplate) => {
    switch (id) {
      case "executive":
        return (
          <div className="w-full h-24 bg-white rounded border border-stone-200 p-2 flex flex-col justify-between relative overflow-hidden shadow-inner select-none">
            {/* Top gold-stone strip */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-stone-900"></div>
            
            {/* Heading zone */}
            <div className="space-y-1 mt-1">
              <div className="h-1.5 w-1/2 bg-stone-900 rounded-sm"></div>
              <div className="h-[3px] w-1/4 bg-sky-500 rounded-sm"></div>
            </div>

            {/* Inner lines resembling sections */}
            <div className="space-y-1.5 flex-1 mt-3">
              <div className="h-0.5 w-full bg-stone-250 rounded-sm"></div>
              <div className="space-y-1 pl-2">
                <div className="h-1 w-3/4 bg-stone-200 rounded-sm"></div>
                <div className="h-[3px] w-full bg-stone-150 rounded-sm"></div>
                <div className="h-[3px] w-[90%] bg-stone-150 rounded-sm"></div>
              </div>
            </div>

            {/* Micro contact items */}
            <div className="flex gap-1 pt-1 border-t border-stone-100 justify-between items-center text-[5px] text-stone-400 font-mono scale-[0.9] origin-left">
              <span>● London, UK</span>
              <span>● email@domain</span>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="w-full h-24 bg-white rounded border border-stone-200 flex flex-col relative overflow-hidden shadow-inner select-none">
            {/* Massive dark top block */}
            <div className="bg-stone-900 p-2 text-white h-9 flex flex-col justify-end space-y-1">
              <div className="h-1.5 w-2/3 bg-white rounded-sm"></div>
              <div className="h-[3px] w-1/3 bg-sky-400 rounded-sm"></div>
            </div>

            {/* Body */}
            <div className="p-2 space-y-2 flex-1 mt-1">
              <div className="h-[4px] w-full bg-stone-250 rounded-sm"></div>
              <div className="space-y-1 pl-2">
                <div className="h-[3px] w-[80%] bg-stone-150 rounded-sm"></div>
                <div className="h-[2px] w-[95%] bg-stone-100 rounded-sm"></div>
              </div>
            </div>
          </div>
        );

      case "minimalist":
        return (
          <div className="w-full h-24 bg-stone-50 rounded border border-stone-200 p-2.5 flex flex-col justify-between items-center relative overflow-hidden shadow-inner select-none font-serif">
            {/* Centered identity */}
            <div className="text-center space-y-1 w-full flex flex-col items-center">
              <div className="h-1.5 w-1/3 bg-stone-850 rounded-sm"></div>
              <div className="h-[2px] w-1/4 bg-stone-400 rounded-sm"></div>
            </div>

            {/* Center paragraphs */}
            <div className="space-y-1.5 w-full mt-3 flex-1 flex flex-col items-center">
              <div className="h-0.5 w-[90%] bg-stone-250"></div>
              <div className="h-1 w-3/4 bg-stone-200"></div>
              <div className="h-[3px] w-[85%] bg-stone-150"></div>
              <div className="h-[3px] w-[80%] bg-stone-150"></div>
            </div>
          </div>
        );

      case "ats":
        return (
          <div className="w-full h-24 bg-white rounded border border-stone-200 p-2 flex flex-col justify-between relative overflow-hidden shadow-inner select-none font-sans">
            {/* Straight block and machine tags */}
            <div className="text-center space-y-1.5">
              <div className="h-2 w-1/2 bg-stone-900 mx-auto rounded-sm"></div>
              <div className="h-[4px] w-3/4 bg-stone-400 mx-auto rounded-sm"></div>
            </div>

            {/* Regular horizontal grids */}
            <div className="space-y-2 flex-1 mt-2.5">
              <div className="h-[3px] w-full bg-stone-300"></div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="space-y-1">
                  <div className="h-[4px] w-full bg-stone-200"></div>
                  <div className="h-[3px] w-[80%] bg-stone-150"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-[4px] w-[90%] bg-stone-200"></div>
                  <div className="h-[3px] w-[85%] bg-stone-150"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="w-full h-24 bg-white rounded border border-stone-200 flex relative overflow-hidden shadow-inner select-none">
            {/* Sidebar Left panel */}
            <div className="w-8 bg-stone-100 flex-none h-full border-r border-stone-200 p-1 space-y-2">
              <div className="h-1.5 w-full bg-sky-500 rounded-sm"></div>
              <div className="space-y-1">
                <div className="h-[3px] w-full bg-stone-300 rounded-sm"></div>
                <div className="h-[3px] w-[80%] bg-stone-300 rounded-sm"></div>
              </div>
            </div>
            
            {/* Main Area Right panel */}
            <div className="flex-1 p-2 space-y-2">
              <div className="h-2 w-1/2 bg-stone-900 rounded-sm"></div>
              <div className="h-0.5 w-full bg-stone-250"></div>
              <div className="space-y-1">
                <div className="h-[3px] w-full bg-stone-200"></div>
                <div className="h-[3px] w-[90%] bg-stone-150"></div>
                <div className="h-[2px] w-[95%] bg-stone-100"></div>
              </div>
            </div>
          </div>
        );

      case "chic":
        return (
          <div className="w-full h-24 bg-[#FAF8F5] rounded border border-stone-300 p-2.5 flex flex-col justify-between relative overflow-hidden shadow-inner select-none font-serif">
            {/* Chic aesthetic style */}
            <div className="text-center space-y-1 border-b border-amber-800/15 pb-1">
              <div className="h-[1.5px] w-1/4 bg-amber-800/50 mx-auto"></div>
              <div className="h-1.5 w-1/2 bg-stone-850 mx-auto rounded-sm"></div>
            </div>

            {/* Central elements card representation */}
            <div className="space-y-1.5 flex-1 mt-2.5">
              <div className="h-1 w-2/3 bg-[#E7E2DA] rounded-sm"></div>
              <p className="h-[2px] w-full bg-[#EAE5DC]"></p>
              <p className="h-[2px] w-4/5 bg-[#EAE5DC]"></p>
            </div>
          </div>
        );

      case "emerald":
        return (
          <div className="w-full h-24 bg-white rounded border border-emerald-100 flex flex-col justify-between relative overflow-hidden shadow-inner select-none">
            {/* Solid Emerald Accent Line on left */}
            <div className="absolute left-0 top-0 w-[4px] h-full bg-emerald-800"></div>

            <div className="pl-3 p-2 space-y-2 flex-1">
              <div className="space-y-1">
                <div className="h-2 w-1/3 bg-emerald-850 rounded-sm"></div>
                <div className="h-[3px] w-1/4 bg-emerald-700/60 rounded-sm"></div>
              </div>

              <div className="space-y-2.5 mt-2">
                <div className="h-[3px] w-full bg-stone-250"></div>
                <div className="space-y-1.5">
                  <div className="h-[4px] w-[90%] bg-stone-200"></div>
                  <div className="h-[3px] w-full bg-emerald-500/10"></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="cv-gallery-studio" className="bg-slate-900/80 rounded-xl border border-slate-800/60 p-4 space-y-3.5 print:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"></div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 text-sky-400">
              <LayoutTemplate size={13} />
              Aesthetic CV Architect Gallery
            </span>
            <p className="text-[10px] text-slate-300">Select an expert style template to hot-reload your blueprint metrics instantly.</p>
          </div>
        </div>

        {isPremium && (
          <div className="text-[10px] bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white font-black px-2 py-0.5 rounded flex items-center gap-1">
            <Crown size={10} className="fill-white" />
            <span>UNLOCKED ALL CHEF DESIGNS</span>
          </div>
        )}
      </div>

      {/* Grid cabinet scroll view */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {TEMPLATE_OPTIONS.map((tmpl) => {
          const active = activeTemplate === tmpl.id;
          const locked = tmpl.isPremium && !isPremium;

          return (
            <motion.button
              key={tmpl.id}
              type="button"
              onClick={() => handleSelect(tmpl)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-2 rounded-xl transition-all text-left flex flex-col justify-between border relative min-h-[175px] group ${
                active
                  ? "bg-slate-950 border-sky-400 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/5 text-white"
                  : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300"
              }`}
            >
              {/* Premium gating stamp indicator */}
              {locked && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-sky-400 to-blue-500 text-[8px] font-extrabold text-white px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5 z-10 shadow">
                  <Crown size={8} className="fill-white" />
                  <span>Pro</span>
                </div>
              )}

              {/* Theme Mini-Render preview container */}
              <div className="relative w-full mb-2">
                {renderMicroLayout(tmpl.id)}
                
                {active && (
                  <div className="absolute inset-0 bg-sky-500/5 rounded flex items-center justify-center backdrop-blur-[0.5px]">
                    <div className="bg-sky-400 text-slate-950 rounded-full p-1 shadow-md scale-90">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Template details summary block */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-black tracking-tight leading-tight block ${
                    active ? "text-sky-300 font-bold" : "text-slate-200"
                  }`}>
                    {tmpl.name}
                  </span>
                </div>

                <div className="h-9 overflow-hidden">
                  <p className="text-[8.5px] leading-relaxed text-slate-400 group-hover:text-slate-300">
                    {tmpl.tagline}
                  </p>
                </div>

                {/* Micro target demographics info */}
                <div className="pt-1.5 border-t border-slate-800/85 flex justify-between items-center text-[7.5px] text-slate-500 font-mono">
                  <span className="truncate max-w-[90px]">{tmpl.audience.split(",")[0]}</span>
                  {active && <span className="text-sky-400 text-[8px] font-bold">ACTIVE</span>}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
