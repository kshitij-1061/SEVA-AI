import React from "react";
import { useMap } from "../../context/MapContext";
import { CivicMap } from "./CivicMap";
import { MapPopup } from "./MapPopup";
import { MapControls } from "./MapControls";
import { MapPin, Map as MapIcon, List, Flame, CheckCircle2, Clock, Layers, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export const MapContainerView: React.FC = () => {
  const { filteredItems, selectedItem, selectItem, viewMode, setViewMode, loading } = useMap();

  // Calculate live statistics
  const totalCount = filteredItems.length;
  const inProgressCount = filteredItems.filter(
    (i) => i.type === "report" && (i.status === "in_progress" || i.status === "acknowledged")
  ).length;
  const resolvedCount = filteredItems.filter((i) => i.type === "report" && i.status === "resolved").length;
  const clusterCount = filteredItems.filter((i) => i.type === "hotspot").length;

  if (loading) {
    return (
      <div className="h-[500px] w-full bg-slate-100 rounded-3xl border border-slate-200 animate-pulse flex flex-col items-center justify-center space-y-3">
        <MapPin className="w-8 h-8 text-slate-400 animate-bounce" />
        <span className="text-xs font-bold text-slate-500">Loading SevaFix Civic Map & Locations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Visible Items</span>
            <span className="text-xl font-extrabold text-slate-900">{totalCount}</span>
          </div>
          <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-600 block uppercase">In Progress / Active</span>
            <span className="text-xl font-extrabold text-amber-700">{inProgressCount}</span>
          </div>
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 block uppercase">Resolved</span>
            <span className="text-xl font-extrabold text-emerald-700">{resolvedCount}</span>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-pink-600 block uppercase">Issue Clusters</span>
            <span className="text-xl font-extrabold text-pink-700">{clusterCount}</span>
          </div>
          <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
            <Flame className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* View Mode Toggle Header */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode("map")}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === "map"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Map</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === "list"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <List className="w-3.5 h-3.5 text-indigo-600" />
            <span>Accessible List View ({filteredItems.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Showing {filteredItems.length} locations
        </span>
      </div>

      {/* Main Map or List Display */}
      {viewMode === "map" ? (
        <div className="relative min-h-[500px]">
          <CivicMap />

          {/* Floating Controls Overlay */}
          <div className="absolute top-4 right-4 z-10">
            <MapControls />
          </div>

          {/* Selected Item Floating Details Overlay Card */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 animate-in slide-in-from-bottom-4 duration-200">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => selectItem(null)}
                  className="absolute -top-2 -right-2 bg-slate-900 text-white p-1 rounded-full z-30 shadow-md hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <MapPopup item={selectedItem} onClose={() => selectItem(null)} />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Accessible List View */
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500 space-y-2">
              <p>No map items match these criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-teal-300 transition-all space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 text-[10px]">
                      {item.type === "report" ? item.reportId : item.type === "service" ? "Public Service" : "Hotspot Cluster"}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.type === "report" ? item.title : item.type === "service" ? item.name : item.title}
                  </h4>

                  <p className="text-slate-600 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>
                      {item.type === "hotspot"
                        ? `Cluster Center in ${item.center.city}`
                        : item.location.address || item.location.city}
                    </span>
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    {item.type === "report" && (
                      <Link
                        to={`/report/${item.reportId}`}
                        className="px-3.5 py-1.5 bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                      >
                        <span>View Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {item.type === "service" && (
                      <Link
                        to={`/services/${item.serviceId}`}
                        className="px-3.5 py-1.5 bg-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                      >
                        <span>View Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
