import React from "react";
import { useServices } from "../../context/ServiceContext";
import { ServiceCard } from "./ServiceCard";
import { ServiceEmptyState } from "./ServiceEmptyState";

export const ServiceGrid: React.FC = () => {
  const { services, loading, matches, viewMode, savedServiceIds } = useServices();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded-full w-24" />
              <div className="h-6 bg-slate-200 rounded-full w-16" />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-200 rounded-lg w-full" />
              <div className="h-4 bg-slate-200 rounded-lg w-5/6" />
            </div>
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  let displayServices = services;
  if (viewMode === "saved") {
    displayServices = services.filter((s) => savedServiceIds.includes(s.id));
    if (displayServices.length === 0) {
      return <ServiceEmptyState type="saved" />;
    }
  } else if (displayServices.length === 0) {
    return <ServiceEmptyState type="search" />;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing {displayServices.length} {displayServices.length === 1 ? "service" : "services"}</span>
        {viewMode === "saved" && (
          <span className="text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Bookmarked Services ({displayServices.length})
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayServices.map((service) => {
          const match = matches.find((m) => m.service.id === service.id);
          return <ServiceCard key={service.id} service={service} match={match} />;
        })}
      </div>
    </div>
  );
};
