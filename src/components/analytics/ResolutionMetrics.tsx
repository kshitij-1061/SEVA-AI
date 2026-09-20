import React from "react";
import { CheckCircle2, Clock, Zap, ShieldCheck } from "lucide-react";
import type { OverviewMetrics } from "../../types/analytics";

interface ResolutionMetricsProps {
  metrics: OverviewMetrics;
}

export const ResolutionMetrics: React.FC<ResolutionMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold tracking-tight">Resolution Performance</h3>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2.5 py-0.5 rounded border border-slate-700">
          Turnaround Metrics
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric 1: Resolution Rate */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-bold text-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Overall Resolution Rate</span>
            <div className="text-2xl font-extrabold text-white mt-0.5">
              {metrics.totalReports > 0 ? `${metrics.resolutionRate}%` : "No data"}
            </div>
            <span className="text-[11px] text-slate-400">
              {metrics.resolvedReports} of {metrics.totalReports} reports resolved
            </span>
          </div>
        </div>

        {/* Metric 2: Average Resolution Speed */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 font-bold text-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Average Resolution Speed</span>
            <div className="text-2xl font-extrabold text-white mt-0.5">
              {metrics.averageResolutionTimeFormatted}
            </div>
            <span className="text-[11px] text-slate-400">
              Measured from creation to resolved status timestamp
            </span>
          </div>
        </div>
      </div>

      {/* Explanatory Note */}
      <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <strong>Resolution Time Standard:</strong> Resolution time is computed strictly for complaints where status has transitioned to <span className="text-emerald-400 font-mono">resolved</span>. Unresolved issues are not included in time calculations to avoid skewing averages.
        </p>
      </div>
    </div>
  );
};
