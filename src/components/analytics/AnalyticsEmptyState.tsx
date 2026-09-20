import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, PlusCircle, RotateCcw } from "lucide-react";

interface AnalyticsEmptyStateProps {
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const AnalyticsEmptyState: React.FC<AnalyticsEmptyStateProps> = ({
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs text-center max-w-lg mx-auto space-y-4 my-8">
      <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-3xl flex items-center justify-center mx-auto border border-teal-100 dark:border-teal-800 shadow-2xs">
        <BarChart3 className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Report Data Available
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {isFiltered
            ? "No civic complaints match your active filter criteria (date range, category, status, priority)."
            : "No reports currently exist in this session. Submit a new report to start generating impact insights."}
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        {isFiltered ? (
          <button
            onClick={onResetFilters}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        ) : (
          <Link
            to="/report-issue"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" /> File New Report
          </Link>
        )}
      </div>
    </div>
  );
};
