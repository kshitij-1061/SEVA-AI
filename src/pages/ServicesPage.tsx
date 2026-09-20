import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import type { SevaAIResult } from "../types";
import { ServiceSearch } from "../components/services/ServiceSearch";
import { ServiceCategoryTabs } from "../components/services/ServiceCategoryTabs";
import { ServiceFilters } from "../components/services/ServiceFilters";
import { ServiceGrid } from "../components/services/ServiceGrid";
import { ServiceDisclaimer } from "../components/services/ServiceDisclaimer";
import { Sparkles, Search, ShieldCheck } from "lucide-react";

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { performSearch } = useServices();

  const aiResult = location.state?.aiResult as SevaAIResult | undefined;

  useEffect(() => {
    const queryCategory = searchParams.get("category");
    const querySearch = searchParams.get("q");

    if (aiResult) {
      const cat = aiResult.category || "All";
      const q = aiResult.entities?.serviceType || aiResult.explanation || "";
      performSearch(q, cat);
    } else if (queryCategory || querySearch) {
      performSearch(querySearch || "", queryCategory || "All");
    }
  }, [location.state, searchParams]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-amber-600" /> Public Service & Scheme Finder
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Discover Government Schemes & Services
          </h1>
          <p className="text-xs text-slate-500">
            Tell us what you need in plain English, Hindi, or Hinglish to discover relevant assistance programs.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
          <div>
            <div className="font-bold text-slate-800">Curated & Verified</div>
            <span className="text-[10px]">Zero hallucinated schemes</span>
          </div>
        </div>
      </div>

      {/* Top Demo Disclaimer */}
      <ServiceDisclaimer />

      {/* SevaAI Context Banner if arrived from SevaAI */}
      {aiResult && (
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 p-5 rounded-3xl text-white shadow-xl space-y-3 border border-teal-800/80">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>SevaAI Assistant Understanding</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Intent: {aiResult.intent}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-300">
              You asked SevaAI: <strong className="text-white font-semibold">“{aiResult.explanation}”</strong>
            </div>
            {aiResult.category && (
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-slate-400">Target Category:</span>
                <span className="bg-teal-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px]">
                  {aiResult.category}
                </span>
                {aiResult.entities?.serviceType && (
                  <span className="text-amber-300 font-semibold text-[11px]">
                    Need: {aiResult.entities.serviceType}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <ServiceSearch />

      {/* Horizontal Category Tab Bar */}
      <ServiceCategoryTabs />

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
        {/* Desktop Sidebar Filters */}
        <div className="md:col-span-1">
          <ServiceFilters />
        </div>

        {/* Results Grid */}
        <div className="md:col-span-3">
          <ServiceGrid />
        </div>
      </div>
    </div>
  );
};
