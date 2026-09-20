import React from "react";
import { Info, Sparkles } from "lucide-react";

export const DemoBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-xs">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Hackathon Demo
          </span>
          <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-900">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>Demo Environment:</strong> Simulated authentication & fictional data for presentation purposes.
            </span>
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
          No real passkeys or government credentials stored
        </span>
      </div>
    </div>
  );
};
