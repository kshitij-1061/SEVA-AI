import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Building, Flame, LocateFixed } from "lucide-react";

export const MapLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm text-xs overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-800 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-teal-600" /> Map Legend
        </span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
      </button>

      {isOpen && (
        <div className="p-3 space-y-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shrink-0" />
            <span className="text-slate-700 font-medium">Submitted Report</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
            <span className="text-slate-700 font-medium">Acknowledged</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-block shrink-0" />
            <span className="text-slate-700 font-medium">In Progress Work</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span className="text-slate-700 font-medium">Resolved Issue</span>
          </div>

          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-slate-700 font-medium">Public Service Center</span>
          </div>

          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span className="text-slate-700 font-medium">Community Issue Cluster</span>
          </div>

          <div className="flex items-center gap-2">
            <LocateFixed className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="text-slate-700 font-medium">Your Location</span>
          </div>
        </div>
      )}
    </div>
  );
};
