import React from "react";
import { Sparkles, Edit3, CheckCircle2 } from "lucide-react";

interface AIReportBannerProps {
  category: string;
  issueType: string;
  priority: string;
  confidence?: number;
  onEditClick?: () => void;
}

export const AIReportBanner: React.FC<AIReportBannerProps> = ({
  category,
  issueType,
  priority,
  confidence,
  onEditClick,
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-teal-700/60 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-500/40">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-teal-300 tracking-tight">
                ✨ SevaAI Pre-Filled Report
              </span>
              {confidence && (
                <span className="bg-teal-500/30 text-teal-200 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-500/40">
                  {Math.round(confidence * 100)}% Confidence
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              SevaAI understood your prompt and pre-selected the <strong>{category}</strong> ({issueType}) classification with <strong>{priority.toUpperCase()}</strong> priority.
            </p>
          </div>
        </div>

        {onEditClick && (
          <button
            onClick={onEditClick}
            type="button"
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Information
          </button>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-teal-200/80 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span>All AI suggestions are fully editable before final submission.</span>
      </div>
    </div>
  );
};
