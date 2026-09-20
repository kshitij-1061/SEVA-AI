import React from "react";
import { SevaAIAssistant } from "../components/SevaAIAssistant";
import { Sparkles, Info } from "lucide-react";

export const SevaAIPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-lg border border-teal-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold border border-teal-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Module 2: AI Action Router
          </div>
          <h1 className="text-2xl font-bold tracking-tight">SevaAI Citizen Intelligence Engine</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            State your complaint or requirement in natural language. SevaAI classifies intent, priority, language, and sub-issues, and routes you directly into the workflow.
          </p>
        </div>

        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-xs text-slate-300 flex items-center gap-2 shrink-0">
          <Info className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Supports English, Hindi & Hinglish</span>
        </div>
      </div>

      {/* Main Assistant Embed */}
      <SevaAIAssistant />
    </div>
  );
};
