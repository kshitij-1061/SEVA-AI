import React from "react";
import type { ServiceMatch } from "../../services/serviceFinder/types";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ServiceMatchExplanationProps {
  match: ServiceMatch;
}

export const ServiceMatchExplanation: React.FC<ServiceMatchExplanationProps> = ({ match }) => {
  const matchBadges = {
    strong: { label: "Strong Match", bg: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    moderate: { label: "Likely Relevant", bg: "bg-teal-100 text-teal-800 border-teal-300" },
    possible: { label: "Possible Match", bg: "bg-amber-100 text-amber-800 border-amber-300" },
  };

  const badge = matchBadges[match.matchType] || matchBadges.possible;

  return (
    <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-3 text-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-bold text-teal-950 flex items-center gap-1.5 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Why this service may be relevant:
        </span>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${badge.bg}`}>
          {badge.label}
        </span>
      </div>

      <ul className="space-y-1 text-slate-700 text-[11px]">
        {match.reasons.map((reason, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
