import React from "react";
import { ListOrdered } from "lucide-react";

interface ApplicationStepsProps {
  steps: string[];
}

export const ApplicationSteps: React.FC<ApplicationStepsProps> = ({ steps }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
        <ListOrdered className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>How to Proceed & Application Steps</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <div className="w-7 h-7 bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              0{idx + 1}
            </div>
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-800 leading-relaxed font-medium">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
