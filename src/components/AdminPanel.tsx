import React, { useState } from "react";
import { 
  Users, BarChart3, DollarSign, Award, Settings, 
  RotateCcw, Sliders, Play, TrendingUp, Sparkles, AlertTriangle 
} from "lucide-react";

interface AdminPanelProps {
  onClearResumes: () => void;
  onSeedResumes: () => void;
  isPremium: boolean;
  onSetPremium: (status: boolean) => void;
  totalResumesCount: number;
}

export default function AdminPanel({
  onClearResumes,
  onSeedResumes,
  isPremium,
  onSetPremium,
  totalResumesCount,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"metrics" | "features">("metrics");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const triggerNotify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  // Funnel steps
  const funnelSteps = [
    { name: "Organic SEO Visitor Base", count: 85200, pct: "100%" },
    { name: "Initiated Guided Onboarding Wizard", count: 48900, pct: "57.3%" },
    { name: "Completed High-Fidelity Draft Resume", count: 18400, pct: "37.6%" },
    { name: "Scanned in ATS Optimization Engine", count: 7200, pct: "39.1%" },
    { name: "Upgraded to Premium Elite Tier", count: 1950, pct: "27.1%" },
  ];

  const templatePopularity = [
    { name: "Executive Slate (Premium Blue/Gold)", usage: 48, color: "bg-sky-500" },
    { name: "Modern Gold (Dark Chic UI Style)", usage: 28, color: "bg-sky-400" },
    { name: "ATS Classic (Strict White Single Column)", usage: 14, color: "bg-stone-550" },
    { name: "Minimalist Chalk (Serif Typo Layout)", usage: 10, color: "bg-stone-300" },
  ];

  return (
    <div id="admin-panel" className="bg-stone-950/20 p-4 sm:p-6 rounded-2xl border border-stone-900">
      
      {/* Admin header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-900 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-xs text-red-500 uppercase tracking-widest font-bold">Internal Operations console</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1 font-sans">
            House Venture <span className="text-sky-400 font-serif italic">Management Hub</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Admin oversight, user acquisition rates, systemic seed parameters, and SaaS business operations.
          </p>
        </div>

        {/* Console Switch Tabs */}
        <div className="flex bg-stone-900/60 p-1 rounded-lg border border-stone-800">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "metrics" ? "bg-sky-500 text-slate-950" : "text-stone-400 hover:text-white"
            }`}
          >
            <BarChart3 size={12} />
            Metri-Telemetry
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "features" ? "bg-stone-800 text-sky-450 border border-sky-500/20" : "text-stone-400 hover:text-white"
            }`}
          >
            <Settings size={12} />
            Feature Matrix
          </button>
        </div>
      </div>

      {successMsg && (
        <div id="admin-success-banner" className="mt-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
          SUCCESS: {successMsg}
        </div>
      )}

      {activeTab === "metrics" ? (
        <div id="admin-metrics-view" className="space-y-6 mt-6">
          
          {/* Main Stat KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 bg-stone-900/30 rounded-xl border border-stone-900 select-none">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase">Active Subscribers</span>
                <Users size={14} className="text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">1,950</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp size={10} />
                <span>+18.4% MoM rate</span>
              </div>
            </div>

            <div className="p-4 bg-stone-900/30 rounded-xl border border-stone-900 select-none">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase">MRR Valuation</span>
                <DollarSign size={14} className="text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">$29,250</div>
              <div className="text-[10px] text-sky-400 mt-1">
                <span>Annualized ARR: $351.0K</span>
              </div>
            </div>

            <div className="p-4 bg-stone-900/30 rounded-xl border border-stone-900 select-none">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase">System Resumes</span>
                <Award size={14} className="text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">
                {Math.max(1284, 1284 + totalResumesCount)}
              </div>
              <div className="text-[10px] text-stone-550 mt-1">
                <span>Active local draft: {totalResumesCount}</span>
              </div>
            </div>

            <div className="p-4 bg-stone-900/30 rounded-xl border border-stone-900 select-none">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400 uppercase">Avg. ATS Core Score</span>
                <Sparkles size={14} className="text-sky-400 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-sky-450 text-white mt-2">78.5%</div>
              <div className="text-[10px] text-emerald-400 mt-1">
                <span>Baseline standard target: 80%</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Conversion Funnel Widget */}
            <div className="p-5 bg-stone-900/20 rounded-xl border border-stone-900 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                <h3 className="text-sm font-semibold text-white tracking-wide">Acquisition & Conversion Funnel Analytics</h3>
                <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded font-mono">Q2 Cohort</span>
              </div>
              <div className="space-y-3.5">
                {funnelSteps.map((step, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-300 font-medium">{step.name}</span>
                      <div className="space-x-2 text-stone-400">
                        <span className="font-mono">{step.count.toLocaleString()} Users</span>
                        <span className="text-sky-400 font-bold font-mono">({step.pct})</span>
                      </div>
                    </div>
                    {/* Progress slider representation */}
                    <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-sky-600 to-sky-400 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${parseFloat(step.pct) ? parseFloat(step.pct) : 5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template distributions */}
            <div className="p-5 bg-stone-900/20 rounded-xl border border-stone-900 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                <h3 className="text-sm font-semibold text-white tracking-wide">Premium Template Deployment Ratios</h3>
                <span className="text-[10px] text-stone-500 font-mono">Real-time Telemetry</span>
              </div>
              <div className="space-y-4">
                {templatePopularity.map((tmpl, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    {/* Circle chart */}
                    <div className="w-12 text-right">
                      <span className="font-mono text-sm font-bold text-white">{tmpl.usage}%</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-xs text-stone-400 block">{tmpl.name}</span>
                      <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                        <div className={`h-full ${tmpl.color} rounded-full`} style={{ width: `${tmpl.usage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-stone-550 border-t border-stone-900 pt-3">
                * Note: Standard ATS Single Column has climbed 4% because recruiters increasingly leverage strict JSON parsers.
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div id="admin-features-view" className="mt-6 space-y-6">
          
          <div className="p-4 bg-sky-500/10 text-sky-450 rounded-lg border border-sky-500/20 text-xs flex gap-3 animate-pulse">
            <AlertTriangle className="shrink-0 mt-0.5 text-sky-450" size={16} />
            <div>
              <p className="font-bold uppercase font-mono">Interactive Developer Sandbox Notice</p>
              <p className="mt-1 text-sky-400">
                You possess full authorization to bypass monetization tier thresholds, simulate bulk seed entries, or wipe systemic browser cache states directly via the active sliders below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SaaS Tier Override */}
            <div className="p-5 bg-stone-900/20 rounded-xl border border-stone-900 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="text-sky-400" size={16} />
                Subscription Status Override
              </h3>
              <p className="text-xs text-stone-400">
                Quickly override local client subscription attributes. Use this flag to check Premium workflows (such as full ATS keyword scanners and cover letter creations) without entering payments details.
              </p>
              <div className="flex items-center justify-between p-3.5 bg-stone-900 rounded-lg border border-stone-800">
                <span className="text-xs font-mono tracking-wider font-semibold text-stone-300">
                  CURRENT PASS STATE: {isPremium ? "🔴 ELITE PREMIUM" : "⚪ STANDARD TRIAL"}
                </span>
                <button
                  onClick={() => {
                    onSetPremium(!isPremium);
                    triggerNotify(`System tier state modified to ${!isPremium ? "Elite Premium" : "Free Trial"}.`);
                  }}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    isPremium ? "bg-stone-850 text-stone-300 hover:text-white" : "bg-sky-500 text-slate-950 hover:bg-sky-400"
                  }`}
                >
                  {isPremium ? "Reset to Free" : "Grant Pro Pass"}
                </button>
              </div>
            </div>

            {/* Simulated Database and Seed Triggers */}
            <div className="p-5 bg-stone-900/20 rounded-xl border border-stone-900 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Play className="text-sky-400" size={16} />
                Mass Resume Seeder
              </h3>
              <p className="text-xs text-stone-400">
                Populate local client environments instantly with senior, metricsurized profiles (e.g. Chief Product Officer, Lead AI Infrastructure Architect) to witness high-match score live-previews.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    onSeedResumes();
                    triggerNotify("Seeded multiple pro-grade executive portfolios.");
                  }}
                  id="btn-seed-data"
                  className="px-4 py-2 border border-sky-500/20 hover:border-sky-500/50 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded text-xs font-semibold cursor-pointer transition-all"
                >
                  Seed Portfolio Samples
                </button>
                <button
                  onClick={() => {
                    onClearResumes();
                    triggerNotify("Cleared all local drafts.");
                  }}
                  id="btn-clear-data"
                  className="px-4 py-2 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500 bg-stone-900 text-red-400 rounded text-xs font-semibold cursor-pointer transition-all"
                >
                  Clear All Local Drafts
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
