import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Search,
  PlusCircle,
  FileCheck2,
} from "lucide-react";

interface LandingPageProps {
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI-Powered Civic & Public Service Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Solve problems. Discover government schemes. <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Improve your community.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            “Tell us what you need. We’ll help you find what to do next.”
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/ai"
              className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all text-xs sm:text-sm flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              Ask SevaAI Assistant
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/report-issue"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-teal-400" />
              Report a Problem
            </Link>

            <Link
              to="/services"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-amber-400" />
              Find Public Schemes
            </Link>
          </div>

          <div className="max-w-2xl mx-auto mt-10 p-5 bg-slate-800/90 rounded-2xl border border-slate-700 text-left shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-700/80 pb-2">
              <span className="flex items-center gap-1.5 font-semibold text-teal-300">
                <MessageSquare className="w-4 h-4" /> SevaAI Natural Understanding
              </span>
              <span className="text-[10px] bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded border border-teal-700">
                Hindi / Hinglish / English
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-200">
                <span className="text-slate-400 font-mono">User prompt: </span>
                <span className="italic font-medium">“There is a large pothole outside my college and bikes are having difficulty passing.”</span>
              </div>

              <div className="bg-teal-950/40 p-3 rounded-xl border border-teal-500/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Classification Output:
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Priority: High
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono pt-1">
                  <div>• Intent: <strong className="text-white">Report Issue</strong></div>
                  <div>• Category: <strong className="text-white">Road Infrastructure</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How SevaFix Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No departments to memorize, no complex directory codes — just state your need in plain language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: "1", title: "Describe Need", desc: "Type in English, Hindi, or Hinglish what you need or what broke.", icon: MessageSquare },
            { step: "2", title: "AI Analyzes", desc: "SevaAI extracts intent, urgency, and category automatically.", icon: Sparkles },
            { step: "3", title: "Suggests Action", desc: "Routes directly to report creation or verified service finder.", icon: CheckCircle2 },
            { step: "4", title: "Submit Report", desc: "Pre-filled forms with photos & GPS coordinates.", icon: PlusCircle },
            { step: "5", title: "Track Result", desc: "Live progress timeline from inspection to resolution.", icon: FileCheck2 },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center group hover:border-teal-500/50 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full mb-1">
                  Step 0{item.step}
                </span>
                <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Counters Preview */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-4xl font-extrabold text-teal-400">1,284</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Issues Reported</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400">847</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Issues Resolved</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-400">2,391</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Services Discovered</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-800">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400">1,876</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Citizens Helped</div>
          </div>
        </div>
      </section>

      {/* Role Access Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Multi-Role Platform Access
            </div>
            <h3 className="text-2xl font-bold">Ready to test authentication & role switching?</h3>
            <p className="text-xs text-teal-100 max-w-xl">
              Log in with credentials or switch roles instantly between Citizen, Administrator, and Department Officer.
            </p>
          </div>

          <div className="flex gap-3">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="px-5 py-3 bg-white text-teal-900 font-bold rounded-xl text-xs shadow-md hover:bg-slate-100 transition-all"
              >
                View Profile & Roles ({user?.role.toUpperCase()})
              </Link>
            ) : (
              <button
                onClick={() => onOpenAuth("login")}
                className="px-6 py-3 bg-white text-teal-900 font-bold rounded-xl text-xs shadow-md hover:bg-slate-100 transition-all"
              >
                Sign In to Account
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
