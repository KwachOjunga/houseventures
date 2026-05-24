import React, { useState } from "react";
import { Search, Briefcase, Copy, Check, Star, CornerDownRight, ArrowRight, TrendingUp } from "lucide-react";

interface GrowthSEOProps {
  onLoadPredefined: (presetKey: string) => void;
}

export default function GrowthSEO({ onLoadPredefined }: GrowthSEOProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const seoRoles = [
    {
      id: "ai-engineer",
      slug: "staff-ai-infrastructure-architect-resume",
      title: "Staff AI Infrastructure Architect",
      department: "Technology & AI",
      volume: "12,400 monthly searches",
      keywords: ["LLM Orchestration", "Kubernetes Clustering", "VRAM Optimization", "CUDA", "TensorRT", "CI/CD GPU pipelines"],
      impactMetric: "Reduced LLM prompt evaluation latency by 38% and cut GPU operational overhead by $240K.",
      bulletExemplar: "Spearheaded modular containerization of highly distributed training loops across clusters of 128+ NVIDIA H100s, generating a 2.4x enhancement in checkpoint saving speed."
    },
    {
      id: "vp-product",
      slug: "vp-of-enterprise-product-growth-resume",
      title: "Vice President of Product Growth",
      department: "Product Management",
      volume: "8,900 monthly searches",
      keywords: ["A/B Multivariate Testing", "Funnel Telemetry", "User Churn Prevention", "Cohort Monetization", "Enterprise Scaling"],
      impactMetric: "Engineered core monetization flow restructure, increasing checkout pipeline checkout rates by 14.5% MoM.",
      bulletExemplar: "Directed end-to-end roadmap prioritizations across 4 cross-functional growth squads, delivering the modular telemetry dashboard 3 weeks ahead of initial target launch."
    },
    {
      id: "chief-sales",
      slug: "chief-commercial-sales-officer-resume",
      title: "Chief Sales Executive (Commercial)",
      department: "Enterprise Sales",
      volume: "7,100 monthly searches",
      keywords: ["Consultative Sales Cycle", "Multi-year Renewals", "Enterprise Account Growth", "ARR Pipeline Acceleration"],
      impactMetric: "Delivered standard regional sales quota achievements representing 138% of designated targets.",
      bulletExemplar: "Structured and negotiated a flagship $4.2M multi-year commercial site license expansion with 3 Fortune-100 financial service partners."
    },
    {
      id: "growth-marketing",
      slug: "head-of-programmatic-seo-growth-marketing-resume",
      title: "Head of Programmatic Growth Marketing",
      department: "Growth & Marketing",
      volume: "5,800 monthly searches",
      keywords: ["Programmatic SEO", "Scalable Sitemap Structures", "Dynamic Landing Pages", "CPA Optimization", "MQL Generation"],
      impactMetric: "Engineered organic search page expansion strategy that unlocked 420K monthly unique clicks in 6 months.",
      bulletExemplar: "Optimized programmatic page build queries to reduce index load latency, lifting mobile click-through conversion by 22%."
    },
    {
      id: "cto-executive",
      slug: "chief-technology-officer-enterprise-digital-transformation",
      title: "Chief Technology Officer (CTO)",
      department: "Executive C-Suite",
      volume: "11,500 monthly searches",
      keywords: ["Digital Transformation", "Legacy Refactoring", "Global Scalability", "Multi-million Dollar CapEx", "Engineering Upskilling"],
      impactMetric: "Directed tech migration backing 8M+ active users, eliminating redundant cloud hosting costs to reclaim $1.4M.",
      bulletExemplar: "Re-architected enterprise legacy banking framework into atomic, secure web services, elevating transaction success rates to 99.99% reliability."
    }
  ];

  const handleCopyExemplar = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredRoles = seoRoles.filter(role => 
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div id="growth-seo-directory" className="space-y-6">
      
      {/* Search Header Hero area */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-900 bg-stone-950 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1 bg-stone-900 px-2.5 py-1 rounded-full border border-stone-800 text-[10px] text-sky-400 font-mono tracking-widest uppercase mb-4">
            <TrendingUp size={10} />
            <span>SEO Lead Acquisition Directory</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            Programmatic Career <span className="text-sky-400 font-serif font-light italic">Playbooks</span>
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Search our highly indexed industry guide layouts built specifically to satisfy programmatic Google search crawls and enterprise ATS parser requirements. Click any template to load its blueprint dataset instantly.
          </p>

          <div className="mt-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
            <input
              type="text"
              placeholder="Search roles, keyword benchmarks (e.g. LLM, Kubernetes, Sales)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-800 bg-stone-900 text-sm text-white focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Grid of SEO guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoles.map(role => (
          <div 
            key={role.id} 
            className="flex flex-col justify-between p-5 rounded-2xl bg-stone-955 border border-stone-900 hover:border-sky-500/20 transition-all flex-1"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 border-b border-stone-900 pb-2.5">
                <span className="font-mono">{role.department}</span>
                <span className="font-sans italic">{role.volume}</span>
              </div>

              {/* Title & SEO URL mock info */}
              <h3 className="text-lg font-bold text-white mt-3 font-sans">{role.title}</h3>
              <p className="text-[10px] font-mono text-stone-500 mt-1 select-all hover:text-sky-400/80 transition-all">
                houseventure.com/resumes/example/{role.slug}/
              </p>

              {/* Core metrics badge */}
              <div className="mt-4 p-3 bg-stone-900 rounded-lg border border-stone-800 flex items-start gap-2.5">
                <Star size={14} className="text-sky-400 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-mono text-[10px] uppercase text-stone-500 font-bold">Key Performance Metric Focus:</div>
                  <p className="mt-1 text-stone-300 font-sans leading-relaxed">{role.impactMetric}</p>
                </div>
              </div>

              {/* Important ATS Keywords */}
              <div className="mt-4">
                <div className="text-[10px] font-mono uppercase text-stone-500 font-bold mb-1.5">Primary Target Keywords:</div>
                <div className="flex flex-wrap gap-1.5">
                  {role.keywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] bg-stone-900 text-stone-300 border border-stone-800 rounded px-2 py-0.5 font-sans"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exemplar Bullet Point */}
              <div className="mt-4 space-y-1 bg-stone-950/40 p-3 rounded-lg border border-stone-900">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-550 uppercase flex items-center gap-1">
                    <CornerDownRight size={10} />
                    Elite Bullet Highlight
                  </span>
                  <button
                    onClick={() => handleCopyExemplar(role.bulletExemplar, role.id)}
                    className="flex items-center gap-1 text-[10px] font-mono text-stone-400 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    {copiedId === role.id ? (
                      <>
                        <Check size={10} className="text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={10} />
                        Copy Bullet
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-sans text-stone-400 leading-relaxed italic mt-1 font-sans">
                  "{role.bulletExemplar}"
                </p>
              </div>

            </div>

            {/* Action Import */}
            <div className="mt-6 pt-4 border-t border-stone-900">
              <button
                onClick={() => onLoadPredefined(role.id)}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-stone-900 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/20 hover:border-sky-500 transition-all active:scale-95 cursor-pointer font-sans"
              >
                <span>Import and Pre-Fill Active Template</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
