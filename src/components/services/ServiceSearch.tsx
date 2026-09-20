import React, { useState, useEffect } from "react";
import { Search, X, Sparkles, Clock } from "lucide-react";
import { useServices } from "../../context/ServiceContext";

export const ServiceSearch: React.FC = () => {
  const { searchQuery, performSearch, clearSearch, searchHistory, clearSearchHistory, loading } =
    useServices();
  const [localText, setLocalText] = useState(searchQuery);

  useEffect(() => {
    setLocalText(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(localText);
  };

  const handleChipClick = (query: string) => {
    setLocalText(query);
    performSearch(query);
  };

  const handleClear = () => {
    setLocalText("");
    clearSearch();
  };

  const exampleChips = [
    { label: "Job & Skill Support", query: "I need help finding a job" },
    { label: "Scholarship & Education", query: "Scholarship for college fees" },
    { label: "Health Insurance & Medical", query: "Free doctor treatment scheme" },
    { label: "Income Certificate", query: "Income certificate kaise banega" },
  ];

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-teal-500 shadow-sm transition-all p-1.5">
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-5 h-5 text-teal-600" />
          </div>
          <input
            type="text"
            placeholder="What public service or scheme do you need? (English, Hindi, Hinglish e.g. 'mujhe job chahiye')"
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm font-medium focus:outline-hidden text-slate-800 placeholder:text-slate-400 py-2.5"
          />
          {localText && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg mr-1 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1.5 shrink-0"
          >
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Quick Search Suggestion Chips */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Try:
          </span>
          {exampleChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(chip.query)}
              className="px-2.5 py-1 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 rounded-full text-[11px] transition-all font-medium shadow-2xs"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {searchHistory.length > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Recent:</span>
            {searchHistory.slice(0, 3).map((hist, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(hist)}
                className="underline hover:text-slate-600"
              >
                {hist}
              </button>
            ))}
            <button
              type="button"
              onClick={clearSearchHistory}
              className="text-rose-500 hover:underline ml-1"
              title="Clear search history"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
