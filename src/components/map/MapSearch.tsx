import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useMap } from "../../context/MapContext";

export const MapSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useMap();
  const [local, setLocal] = useState(searchQuery);

  useEffect(() => {
    setLocal(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(local);
  };

  const handleClear = () => {
    setLocal("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-teal-500 shadow-2xs transition-all p-1">
        <div className="pl-3 pr-2 text-slate-400">
          <Search className="w-4 h-4 text-teal-600" />
        </div>
        <input
          type="text"
          placeholder="Search map by Report ID, category, landmark (e.g. 'SF-1001', 'pothole')..."
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
            setSearchQuery(e.target.value);
          }}
          className="flex-1 bg-transparent border-none text-xs font-medium focus:outline-hidden text-slate-800 placeholder:text-slate-400 py-1.5"
        />
        {local && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
};
