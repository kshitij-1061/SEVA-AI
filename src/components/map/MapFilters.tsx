import React, { useState } from "react";
import { useMap } from "../../context/MapContext";
import { Filter, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export const CATEGORIES = [
  "All",
  "Road Infrastructure",
  "Street Lighting",
  "Waste Management",
  "Water Supply",
  "Drainage",
  "Public Sanitation",
  "Traffic & Transport",
  "Parks & Public Spaces",
  "Education",
  "Healthcare",
  "Employment",
  "Documents & Certificates",
  "Other",
];

export const MapFiltersView: React.FC = () => {
  const { filters, setFilters, resetMap } = useMap();
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeChange = (type: "all" | "report" | "service" | "hotspot") => {
    setFilters((prev) => ({ ...prev, itemType: type }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handlePriorityChange = (priority: string) => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const handleOwnershipChange = (ownership: "all" | "mine") => {
    setFilters((prev) => ({ ...prev, ownership }));
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-800"
        >
          <Filter className="w-4 h-4 text-teal-600" />
          <span>Map Filters</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={resetMap}
          className="text-[11px] text-teal-700 hover:underline font-semibold flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Filter Body */}
      <div className={`space-y-4 text-xs ${isOpen ? "block" : "hidden md:block"}`}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 hidden md:flex">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-teal-600" /> Map Layer Filters
          </span>
          <button
            type="button"
            onClick={resetMap}
            className="text-[11px] text-teal-700 hover:underline font-semibold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>

        {/* Item Type Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Map Items Layer
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
            {(["all", "report", "service", "hotspot"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className={`py-1.5 px-2 rounded-lg capitalize transition-all ${
                  filters.itemType === t
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t === "all" ? "All Layers" : t === "report" ? "Reports" : t === "service" ? "Services" : "Clusters"}
              </button>
            ))}
          </div>
        </div>

        {/* Ownership Selector */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Ownership Scope
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
            <button
              type="button"
              onClick={() => handleOwnershipChange("all")}
              className={`py-1.5 px-2 rounded-lg transition-all ${
                filters.ownership === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Community
            </button>
            <button
              type="button"
              onClick={() => handleOwnershipChange("mine")}
              className={`py-1.5 px-2 rounded-lg transition-all ${
                filters.ownership === "mine"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              My Reports
            </button>
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-teal-500 outline-hidden"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Report Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-teal-500 outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Priority Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Urgency Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-teal-500 outline-hidden"
          >
            <option value="All">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent Hazard</option>
          </select>
        </div>
      </div>
    </div>
  );
};
