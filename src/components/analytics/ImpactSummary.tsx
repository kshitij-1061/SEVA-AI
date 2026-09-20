import React from "react";
import { HeartHandshake } from "lucide-react";
import type { OverviewMetrics } from "../../types/analytics";

interface ImpactSummaryProps {
  metrics: OverviewMetrics;
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({ metrics }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
        <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            SevaFix Civic Impact Summary
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Factual community resolution footprint calculated from reports in this demo environment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-teal-50/60 dark:bg-teal-950/20 rounded-2xl border border-teal-200/60 dark:border-teal-900/40 text-center">
          <div className="text-2xl font-black text-teal-800 dark:text-teal-300">
            {metrics.totalReports}
          </div>
          <div className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-0.5">
            Community Issues Reported
          </div>
        </div>

        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 text-center">
          <div className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
            {metrics.resolvedReports}
          </div>
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
            Issues Resolved
          </div>
        </div>

        <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 text-center">
          <div className="text-2xl font-black text-blue-800 dark:text-blue-300">
            {metrics.totalReports > 0 ? `${metrics.resolutionRate}%` : "0%"}
          </div>
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
            Resolution Rate
          </div>
        </div>

        <div className="p-4 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 text-center">
          <div className="text-2xl font-black text-rose-800 dark:text-rose-300">
            {metrics.highPriorityReports}
          </div>
          <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 mt-0.5">
            High / Urgent Priority
          </div>
        </div>
      </div>
    </div>
  );
};
