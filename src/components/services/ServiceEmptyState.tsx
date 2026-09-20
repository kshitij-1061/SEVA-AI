import React from "react";
import { SearchX, Bookmark, RefreshCw } from "lucide-react";
import { useServices } from "../../context/ServiceContext";

interface ServiceEmptyStateProps {
  type: "search" | "saved";
}

export const ServiceEmptyState: React.FC<ServiceEmptyStateProps> = ({ type }) => {
  const { clearSearch, setViewMode } = useServices();

  if (type === "saved") {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4 max-w-md mx-auto my-8">
        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-2xs">
          <Bookmark className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">No Saved Services Yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Save useful schemes and public services by clicking the bookmark icon on any service card to quickly access them later.
          </p>
        </div>
        <button
          onClick={() => setViewMode("all")}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5"
        >
          <span>Browse All Services</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4 max-w-md mx-auto my-8">
      <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mx-auto border border-slate-200">
        <SearchX className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">No Matching Services Found</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          We couldn't find any public services matching your search keywords or category filters. Try using simpler terms or search in Hinglish.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          onClick={clearSearch}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Search & Filters</span>
        </button>
      </div>
    </div>
  );
};
