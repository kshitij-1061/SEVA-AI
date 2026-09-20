import React from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Zap,
} from "lucide-react";
import type { OverviewMetrics } from "../../types/analytics";

interface AnalyticsKpiCardsProps {
  metrics: OverviewMetrics;
}

export const AnalyticsKpiCards: React.FC<AnalyticsKpiCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total Reports */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Total Reports</span>
          <FileText className="w-4 h-4 text-blue-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {metrics.totalReports}
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
          Matching filters
        </span>
      </div>

      {/* 2. Active Reports */}
      <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Active</span>
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="text-2xl font-extrabold text-amber-900 dark:text-amber-300">
          {metrics.activeReports}
        </div>
        <span className="text-[10px] text-amber-700/70 dark:text-amber-400/70 mt-1 block">
          Pending / In-progress
        </span>
      </div>

      {/* 3. Resolved Reports */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Resolved</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-300">
          {metrics.resolvedReports}
        </div>
        <span className="text-[10px] text-emerald-700/70 dark:text-emerald-400/70 mt-1 block">
          Fixed on ground
        </span>
      </div>

      {/* 4. Resolution Rate */}
      <div className="bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between text-teal-700 dark:text-teal-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Resolution Rate</span>
          <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </div>
        <div className="text-2xl font-extrabold text-teal-900 dark:text-teal-300">
          {metrics.totalReports > 0 ? `${metrics.resolutionRate}%` : "No data"}
        </div>
        <span className="text-[10px] text-teal-700/70 dark:text-teal-400/70 mt-1 block truncate">
          Resolved / Total × 100
        </span>
      </div>

      {/* 5. High / Urgent Priority */}
      <div className="bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between text-rose-700 dark:text-rose-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">High / Urgent</span>
          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
        </div>
        <div className="text-2xl font-extrabold text-rose-900 dark:text-rose-300">
          {metrics.highPriorityReports}
        </div>
        <span className="text-[10px] text-rose-700/70 dark:text-rose-400/70 mt-1 block truncate">
          High & Urgent issues
        </span>
      </div>

      {/* 6. Average Resolution Time */}
      <div className="bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-purple-700 dark:text-purple-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Avg Speed</span>
          <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="text-base font-extrabold text-purple-900 dark:text-purple-300 truncate">
          {metrics.averageResolutionTimeFormatted}
        </div>
        <span className="text-[10px] text-purple-700/70 dark:text-purple-400/70 mt-1 block truncate">
          Created to Resolved
        </span>
      </div>
    </div>
  );
};
