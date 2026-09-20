import React from "react";
import type { CivicReport } from "../types";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Sparkles, ArrowRight } from "lucide-react";

interface ReportCardProps {
  report: CivicReport;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const statusBadges: { [key: string]: { label: string; bg: string } } = {
    submitted: { label: "Submitted", bg: "bg-slate-100 text-slate-800 border-slate-200" },
    acknowledged: { label: "Acknowledged", bg: "bg-amber-100 text-amber-800 border-amber-200" },
    in_progress: { label: "In Progress", bg: "bg-teal-100 text-teal-800 border-teal-200" },
    resolved: { label: "Resolved", bg: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    rejected: { label: "Rejected", bg: "bg-rose-100 text-rose-800 border-rose-200" },
  };

  const priorityColors = {
    low: "text-slate-600 bg-slate-50 border-slate-200",
    medium: "text-blue-700 bg-blue-50 border-blue-200",
    high: "text-amber-700 bg-amber-50 border-amber-200",
    urgent: "text-rose-700 bg-rose-50 border-rose-200",
  };

  const statusBadge = statusBadges[report.status] || statusBadges.submitted;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-500/40 transition-all p-5 flex flex-col justify-between space-y-4 group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {report.id}
            </span>
            {report.aiGenerated && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${statusBadge.bg}`}>
            {statusBadge.label}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
          {report.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {report.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{report.location.address || report.location.city}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{report.createdAt.split(" ")[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${priorityColors[report.priority]}`}>
            {report.priority} Priority
          </span>

          <Link
            to={`/report/${report.id}`}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
