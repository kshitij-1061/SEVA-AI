import React from "react";
import { ExternalLink, Building2 } from "lucide-react";

interface ServiceSourceProps {
  officialSource?: {
    name: string;
    url?: string;
  };
  sourceType: "verified" | "demo";
}

export const ServiceSource: React.FC<ServiceSourceProps> = ({ officialSource, sourceType }) => {
  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-md border border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold">Official Reference Source</span>
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
            sourceType === "verified"
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
          }`}
        >
          {sourceType === "verified" ? "Verified Portal" : "Demo Prototype Directory"}
        </span>
      </div>

      <div className="text-xs space-y-1">
        <div className="font-bold text-slate-100 text-sm">{officialSource?.name || "State & Central Service Directory"}</div>
        <p className="text-slate-400 text-[11px] font-light">
          {officialSource?.url
            ? "Visit the official government portal below to verify eligibility and submit applications."
            : "This entry is included for prototype demonstration purposes."}
        </p>
      </div>

      {officialSource?.url ? (
        <a
          href={officialSource.url}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <span>Continue to Official Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      ) : (
        <div className="p-2.5 bg-slate-800 rounded-xl text-[11px] text-slate-400 text-center italic border border-slate-700">
          Demo directory reference — no external link attached
        </div>
      )}
    </div>
  );
};
