import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight, Flame, Map } from "lucide-react";
import type { LocationHotspot as HotspotItem } from "../../types/analytics";

interface LocationHotspotsProps {
  hotspots: HotspotItem[];
  activeCategory?: string;
  activeStatus?: string;
}

export const LocationHotspots: React.FC<LocationHotspotsProps> = ({
  hotspots,
  activeCategory = "all",
  activeStatus = "all",
}) => {
  const navigate = useNavigate();

  const handleOpenMap = () => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "all") {
      params.set("category", activeCategory);
    }
    if (activeStatus && activeStatus !== "all") {
      params.set("status", activeStatus);
    }

    const queryStr = params.toString();
    navigate(`/map${queryStr ? `?${queryStr}` : ""}`);
  };

  if (!hotspots || hotspots.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center space-y-3">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Issue Hotspots</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Location insights will appear when reports include valid map coordinates.
          </p>
        </div>
        <button
          onClick={handleOpenMap}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-xs cursor-pointer"
        >
          <Map className="w-3.5 h-3.5" /> Open Civic Map
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Geographic Issue Hotspots</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Clustered complaint density from valid GPS report coordinates
          </p>
        </div>

        <button
          onClick={handleOpenMap}
          className="px-3 py-1.5 bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 border border-teal-200 dark:border-teal-800 cursor-pointer"
        >
          <span>Open Full Map</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {hotspots.slice(0, 6).map((item, idx) => (
          <div
            key={`hotspot-${idx}`}
            onClick={handleOpenMap}
            className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 hover:border-teal-500/60 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">{item.address}</span>
              </div>
              <span className="text-[10px] bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 shrink-0">
                {item.count} report{item.count === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {item.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-700"
                >
                  {cat}
                </span>
              ))}
              {item.categories.length > 2 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{item.categories.length - 2} more
                </span>
              )}
            </div>

            <div className="text-[10px] text-slate-400 font-mono mt-2">
              GPS: {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)} ({item.city})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
