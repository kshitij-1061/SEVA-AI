import React from "react";
import { Info } from "lucide-react";

export const ServiceDisclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border border-amber-200/80 p-3.5 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <span className="font-bold text-amber-950 block">Demo Service Directory</span>
        <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
          This prototype directory uses a curated demonstration dataset to show how SevaAI routes citizen requests. Eligibility shown here is an informational guide only. Check the official government source for current requirements.
        </p>
      </div>
    </div>
  );
};
