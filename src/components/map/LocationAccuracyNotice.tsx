import React from "react";
import { ShieldCheck } from "lucide-react";

export const LocationAccuracyNotice: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-2xl text-[11px] text-slate-600 flex items-start gap-2">
      <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-slate-800">Location Privacy</span>
        <p className="mt-0.5 leading-tight">
          SevaFix only uses your location when you explicitly choose to share it. This prototype does not track you or send coordinates to external databases.
        </p>
      </div>
    </div>
  );
};
