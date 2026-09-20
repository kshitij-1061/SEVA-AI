import React from "react";
import type { VisionObservation } from "../types";
import { AlertTriangle, Wrench, Trees, Box, Info } from "lucide-react";

interface VisionObservationListProps {
  observations: VisionObservation[];
}

export const VisionObservationList: React.FC<VisionObservationListProps> = ({ observations }) => {
  const getTypeBadge = (type: VisionObservation["type"]) => {
    switch (type) {
      case "damage":
        return { label: "Damage", icon: Wrench, bg: "bg-rose-50 text-rose-700 border-rose-200" };
      case "hazard":
        return { label: "Hazard", icon: AlertTriangle, bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "environment":
        return { label: "Environment", icon: Trees, bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "object":
        return { label: "Object", icon: Box, bg: "bg-blue-50 text-blue-700 border-blue-200" };
      default:
        return { label: "General", icon: Info, bg: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
        Visual AI Observations ({observations.length})
      </span>
      <div className="space-y-1.5">
        {observations.map((obs) => {
          const badge = getTypeBadge(obs.type);
          const Icon = badge.icon;
          return (
            <div
              key={obs.id}
              className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-start gap-2 shadow-2xs"
            >
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 shrink-0 mt-0.5 ${badge.bg}`}>
                <Icon className="w-2.5 h-2.5" />
                {badge.label}
              </span>
              <p className="text-slate-700 leading-normal flex-1">{obs.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
