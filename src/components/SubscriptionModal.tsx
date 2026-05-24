import React, { useState } from "react";
import { Sparkles, Check, CreditCard, Shield, Zap, X, Trophy } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: () => void;
  isPremium: boolean;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubscribeSuccess,
  isPremium,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");

  if (!isOpen) return null;

  const handleCheckoutSimulate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSubscribeSuccess();
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div id="sub-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div id="sub-modal" className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-sky-500/30 bg-stone-950 text-white shadow-2xl transition-all">
        
        {/* Decorative Sky Blue Light Core */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-sky-450/10 blur-3xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          id="btn-close-sub"
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-stone-900 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {success ? (
          <div id="sub-success-view" className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-semibold text-sky-450 text-sky-400">Welcome to House Venture Elite!</h3>
            <p className="mt-2 text-stone-400">
              Your account has been upgraded to our premium executive suite.
            </p>
            <div className="mt-6 font-mono text-xs text-sky-500/60">
              STATUS: PRO_ACCESS_ENABLED // TRANSACTION_OK
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div id="sub-header" className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles size={14} />
              <span>Premium Career Acceleration Suite</span>
            </div>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white font-sans">
              Unlock Elite Executive <span className="text-sky-400 font-serif font-light italic">Access</span>
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              Transform standard summaries into high-performance, metrics-backed documents designed for human executives and premium ATS algorithms.
            </p>

            {/* Toggle Plan Selection */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-lg bg-stone-900 p-1 border border-stone-800">
                <button
                  onClick={() => setSelectedPlan("monthly")}
                  className={`rounded-md px-4 py-1.5 text-xs font-medium transition-all ${
                    selectedPlan === "monthly"
                      ? "bg-sky-500 text-slate-950 shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  Monthly Plan
                </button>

                <button
                  onClick={() => setSelectedPlan("annual")}
                  className={`relative rounded-md px-4 py-1.5 text-xs font-medium transition-all ${
                    selectedPlan === "annual"
                      ? "bg-sky-500 text-slate-950 shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  Annual (Save 40%)
                  <span className="absolute -top-3 -right-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider animate-pulse">
                    Hot
                  </span>
                </button>
              </div>
            </div>

            {/* Grid Features */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core Offer Checklist */}
              <div className="space-y-3 bg-stone-950/50 p-4 rounded-xl border border-stone-900">
                <h4 className="text-sm font-semibold text-stone-200">What’s Included:</h4>
                <ul className="space-y-2.5 text-stone-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>Unlimited Resume Templates (Executive, Modern, Minimal, ATS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>Unlimited AI Bullet Point Generations & Refinement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>Real-Time Job-Description ATS Scan & Scoring Matrix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>Tailored Executive Cover Letter AI Compiler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>Instant High-Quality Print Styles and PDF Generation export</span>
                  </li>
                </ul>
              </div>

              {/* Enterprise Billing Detail */}
              <div className="flex flex-col justify-between bg-stone-900/60 p-6 rounded-xl border border-sky-500/20">
                <div>
                  <div className="text-stone-400 text-xs font-mono uppercase">House Venture Resumes</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {selectedPlan === "monthly" ? "$25" : "$15"}
                    </span>
                    <span className="text-stone-400 text-sm">/ month</span>
                  </div>
                  <p className="mt-1 text-xs text-sky-400/80">
                    {selectedPlan === "annual" ? "Billed annually ($180) most popular plan" : "Cancel anytime with one-click."}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleCheckoutSimulate}
                    disabled={loading}
                    id="btn-trigger-checkout"
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-500 py-3 text-sm font-bold text-slate-950 hover:bg-sky-450 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-1.5 font-mono text-xs">
                        <Zap className="animate-spin text-slate-950" size={14} />
                        CONNECTING SECURE HV GATEWAY...
                      </span>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        <span>Subscribe & Upgrade Now</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-stone-550 font-mono">
                    <Shield size={10} />
                    <span>Secure 256-bit payment simulation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Footer Assurance */}
            <div className="mt-6 border-t border-stone-900 pt-4 text-center text-xs text-stone-550 flex items-center justify-center gap-4">
              <span>7-Day Refund Promise</span>
              <span>•</span>
              <span>Unlimited Drafts Always Free</span>
              <span>•</span>
              <span>No Credit Card Leak Risks</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
