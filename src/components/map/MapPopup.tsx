import React from "react";
import type { MapItem } from "../../services/map/types";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building, Flame, X } from "lucide-react";

interface MapPopupProps {
  item: MapItem;
  onClose?: () => void;
}

export const MapPopup: React.FC<MapPopupProps> = ({ item, onClose }) => {
  if (item.type === "report") {
    const statusBadges = {
      submitted: "bg-amber-100 text-amber-800 border-amber-200",
      acknowledged: "bg-blue-100 text-blue-800 border-blue-200",
      in_progress: "bg-teal-100 text-teal-800 border-teal-200",
      resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
      rejected: "bg-rose-100 text-rose-800 border-rose-200",
    };

    const priorityColors = {
      low: "bg-slate-100 text-slate-700",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-amber-100 text-amber-800",
      urgent: "bg-rose-100 text-rose-800",
    };

    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-3 max-w-sm text-xs">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <span className="font-mono font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            {item.reportId}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${statusBadges[item.status]}`}>
              {item.status.replace("_", " ")}
            </span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 block">{item.category}</span>
          <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug">{item.title}</h4>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{item.location.address || item.location.city}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Urgency Priority:</span>
            <span className={`font-bold px-2 py-0.5 rounded uppercase text-[10px] ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          </div>

          {item.department && (
            <div className="flex items-center justify-between text-slate-500">
              <span>Department:</span>
              <span className="font-semibold text-slate-800">{item.department}</span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">{item.createdAt}</span>
          <Link
            to={`/report/${item.reportId}`}
            className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1"
          >
            <span>View Full Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (item.type === "service") {
    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-3 max-w-sm text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
            <Building className="w-3 h-3 text-purple-600" /> Public Service
          </span>
          <span className="text-[10px] font-semibold text-slate-500">{item.category}</span>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h4>
          <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{item.location.address || item.location.city}</span>
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <Link
            to={`/services/${item.serviceId}`}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1"
          >
            <span>View Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Hotspot Cluster
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-3 max-w-sm text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
          <Flame className="w-3 h-3 text-pink-600" /> Community Issue Cluster
        </span>
        <span className="text-xs font-extrabold text-slate-900 font-mono">
          {item.issueCount} Reports
        </span>
      </div>

      <div>
        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Multiple civic complaints grouped spatially within ~{item.radiusMeters}m radius.
        </p>
      </div>

      <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px]">
        <span className="font-bold text-slate-700 block">Clustered Report IDs:</span>
        <div className="flex flex-wrap gap-1 font-mono text-[10px]">
          {item.reportIds.map((rid) => (
            <Link
              key={rid}
              to={`/report/${rid}`}
              className="bg-white hover:bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded border border-slate-200 hover:border-teal-300"
            >
              {rid}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
