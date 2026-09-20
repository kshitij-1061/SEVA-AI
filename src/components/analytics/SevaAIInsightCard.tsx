import React from "react";
import { Sparkles } from "lucide-react";

interface SevaAIInsightCardProps {
  insightText: string;
}

export const SevaAIInsightCard: React.FC<SevaAIInsightCardProps> = ({ insightText }) => {
  return (
    <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-5 rounded-2xl shadow-sm border border-teal-800/60 flex items-start gap-3.5">
      <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>

      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-teal-300 tracking-wide uppercase flex items-center gap-1.5">
            SevaAI Executive Insight — Demo
          </span>
          <span className="text-[10px] text-teal-200/70 bg-teal-950/60 font-mono px-2 py-0.5 rounded border border-teal-800">
            Factual Dataset Analysis
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {insightText}
        </p>
      </div>
    </div>
  );
};
