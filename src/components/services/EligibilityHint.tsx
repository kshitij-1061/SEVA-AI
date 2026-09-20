import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface EligibilityHintProps {
  hints: string[];
}

export const EligibilityHint: React.FC<EligibilityHintProps> = ({ hints }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Eligibility & Requirements Guidance</span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
        Eligibility shown here is an informational guide to help you assess potential fit. Check the official source for current requirements and income limits.
      </p>

      <div className="space-y-2 pt-1">
        {hints.map((hint, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
