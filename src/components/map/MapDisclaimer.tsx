import React from "react";
import { Info } from "lucide-react";

export const MapDisclaimer: React.FC = () => {
  return (
    <div className="bg-indigo-50/90 border border-indigo-200/80 p-3 rounded-2xl text-xs text-indigo-950 flex items-start gap-2.5 shadow-2xs">
      <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <span className="font-bold text-indigo-950 block">Civic GIS Map</span>
        <p className="text-[11px] text-indigo-800 leading-relaxed font-normal">
          Map markers represent verified citizen-submitted issue reports and civic hotspots across municipalities. OpenStreetMap tiles are provided for geographical visualization.
        </p>
      </div>
    </div>
  );
};
