import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "../context/MapContext";
import { MapContainerView } from "../components/map/MapContainerView";
import { MapSearch } from "../components/map/MapSearch";
import { MapFiltersView } from "../components/map/MapFilters";
import { MapLegend } from "../components/map/MapLegend";
import { MapDisclaimer } from "../components/map/MapDisclaimer";
import { LocationAccuracyNotice } from "../components/map/LocationAccuracyNotice";
import { Map as MapIcon, ShieldCheck } from "lucide-react";

export const CivicMapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setFilters, setSearchQuery, mapItems, selectItem } = useMap();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const reportIdParam = searchParams.get("reportId") || searchParams.get("id");
    const serviceIdParam = searchParams.get("serviceId");

    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }

    if (reportIdParam) {
      setSearchQuery(reportIdParam);
      const matched = mapItems.find((i) => i.type === "report" && i.reportId.toLowerCase() === reportIdParam.toLowerCase());
      if (matched) selectItem(matched);
    } else if (serviceIdParam) {
      const matched = mapItems.find((i) => i.type === "service" && i.serviceId === serviceIdParam);
      if (matched) selectItem(matched);
    }
  }, [searchParams, mapItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
              <MapIcon className="w-3.5 h-3.5 text-indigo-600" /> Shared Geographic Layer
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interactive Civic Map</h1>
          <p className="text-xs text-slate-500">
            Geographic visualization of reported civic issues, community hotspots, and public service centers.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
          <div>
            <div className="font-bold text-slate-800">Demo Civic GIS</div>
            <span className="text-[10px]">OpenStreetMap Tile Layer</span>
          </div>
        </div>
      </div>

      {/* Disclaimers & Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MapDisclaimer />
        <LocationAccuracyNotice />
      </div>

      {/* Search Bar */}
      <MapSearch />

      {/* Main Grid: Desktop Sidebar Filters & Legend vs Map Container View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <MapFiltersView />
          <MapLegend />
        </div>

        {/* Map / List View Container */}
        <div className="md:col-span-3">
          <MapContainerView />
        </div>
      </div>
    </div>
  );
};
