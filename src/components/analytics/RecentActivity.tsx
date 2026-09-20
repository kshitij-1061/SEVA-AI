import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { RecentActivityItem } from "../../types/analytics";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-center">
        <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Activity log will populate as report status timeline events are created.
        </p>
      </div>
    );
  }

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-amber-500";
      case "acknowledged":
        return "bg-blue-500";
      case "in_progress":
        return "bg-purple-500";
      case "resolved":
        return "bg-emerald-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Recent Demo Activity</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Audit trail of report status updates and timeline events
          </p>
        </div>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded font-mono">
          Live Session Feed
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3 p-3 bg-slate-50/70 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs"
          >
            <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${getStatusDotColor(act.status)}`} />

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <Link
                  to={`/reports/${act.reportId}`}
                  className="font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors line-clamp-1"
                >
                  <span className="font-mono text-teal-600 dark:text-teal-400 mr-1.5">[{act.reportId}]</span>
                  {act.title}
                </Link>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap font-mono">
                  {act.timeAgo}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-snug">
                {act.description}
              </p>

              <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-400">
                <span className="capitalize font-semibold text-slate-500 dark:text-slate-400">
                  Actor: {act.actor}
                </span>
                <span>•</span>
                <span className="uppercase font-mono font-bold text-slate-600 dark:text-slate-300">
                  {act.status.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
