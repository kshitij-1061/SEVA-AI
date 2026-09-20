import React, { useState } from "react";
import { useServices } from "../../context/ServiceContext";
import { CATEGORIES } from "./ServiceCategoryTabs";
import { Filter, Bookmark, Layers, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export const ServiceFilters: React.FC = () => {
  const {
    selectedCategory,
    performSearch,
    searchQuery,
    viewMode,
    setViewMode,
    savedServiceIds,
    clearSearch,
  } = useServices();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCategorySelect = (catValue: string) => {
    performSearch(searchQuery, catValue);
    setMobileFilterOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle Header */}
      <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-800"
        >
          <Filter className="w-4 h-4 text-teal-600" />
          <span>Category & View Filters</span>
          {mobileFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
          {selectedCategory}
        </span>
      </div>

      {/* Filter Body (Sidebar on Desktop, Collapsible on Mobile) */}
      <div
        className={`bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5 ${
          mobileFilterOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* View Mode Toggle */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Directory View
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>All Services</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("saved")}
              className={`py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === "saved"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Saved ({savedServiceIds.length})</span>
            </button>
          </div>
        </div>

        {/* Category List Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Service Categories
            </label>
            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-[11px] text-teal-700 hover:underline font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.value.toLowerCase();
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategorySelect(cat.value)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    active
                      ? "bg-teal-50 text-teal-900 font-bold border border-teal-200"
                      : "text-slate-700 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <span>{cat.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
