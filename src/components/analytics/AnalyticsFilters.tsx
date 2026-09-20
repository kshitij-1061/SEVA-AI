import React from "react";
import { Filter, Calendar, Search, RotateCcw } from "lucide-react";
import type { AnalyticsFilters as FiltersType, DateRangeOption } from "../../types/analytics";
import type { UserRole, ReportStatus } from "../../types";

interface AnalyticsFiltersProps {
  filters: FiltersType;
  onFilterChange: (updates: Partial<FiltersType>) => void;
  onResetFilters: () => void;
  categories: string[];
  departments: string[];
  userRole: UserRole;
}

export const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  departments,
  userRole,
}) => {
  const dateRanges: { id: DateRangeOption; label: string }[] = [
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
    { id: "90d", label: "90 Days" },
    { id: "all", label: "All Time" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Date Range Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" /> Date:
          </span>
          {dateRanges.map((dr) => (
            <button
              key={dr.id}
              onClick={() => onFilterChange({ dateRange: dr.id })}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filters.dateRange === dr.id
                  ? "bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {dr.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search report title, ID, category..."
            value={filters.searchQuery || ""}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Secondary Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </div>

        {/* Category Filter */}
        <select
          value={filters.category || "all"}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filters.status || "all"}
          onChange={(e) => onFilterChange({ status: e.target.value as ReportStatus | "all" })}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="submitted">Submitted</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority || "all"}
          onChange={(e) => onFilterChange({ priority: e.target.value as FiltersType["priority"] })}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Department Filter (Admin only) */}
        {userRole === "admin" && (
          <select
            value={filters.department || "all"}
            onChange={(e) => onFilterChange({ department: e.target.value })}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={onResetFilters}
          className="ml-auto text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset all filters to default"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
        </button>
      </div>
    </div>
  );
};
