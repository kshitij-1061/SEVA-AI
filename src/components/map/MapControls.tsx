import React from "react";
import { LocateFixed, RotateCcw, Loader2 } from "lucide-react";
import { useMap } from "../../context/MapContext";

export const MapControls: React.FC = () => {
  const { requestUserLocation, resetMap, isLocating } = useMap();

  return (
    <div className="flex flex-col gap-2 shadow-md rounded-2xl bg-white p-1.5 border border-slate-200">
      <button
        type="button"
        onClick={() => requestUserLocation()}
        disabled={isLocating}
        className="p-2 hover:bg-teal-50 text-slate-700 hover:text-teal-700 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-1.5"
        title="Use My Location"
      >
        {isLocating ? (
          <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
        ) : (
          <LocateFixed className="w-4 h-4 text-teal-600" />
        )}
      </button>

      <button
        type="button"
        onClick={resetMap}
        className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl transition-colors text-xs flex items-center justify-center"
        title="Reset map filters and center"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
