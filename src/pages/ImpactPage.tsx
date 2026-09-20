import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import { analyticsService } from "../services/analyticsService";
import type { AnalyticsFilters as FiltersType } from "../types/analytics";

// Analytics Components
import { AnalyticsHeader } from "../components/analytics/AnalyticsHeader";
import { AnalyticsFilters } from "../components/analytics/AnalyticsFilters";
import { AnalyticsKpiCards } from "../components/analytics/AnalyticsKpiCards";
import { StatusDistributionChart } from "../components/analytics/StatusDistributionChart";
import { ReportsTrendChart } from "../components/analytics/ReportsTrendChart";
import { CategoryDistributionChart } from "../components/analytics/CategoryDistributionChart";
import { PriorityDistributionChart } from "../components/analytics/PriorityDistributionChart";
import { ResolutionMetrics } from "../components/analytics/ResolutionMetrics";
import { DepartmentWorkload } from "../components/analytics/DepartmentWorkload";
import { LocationHotspots } from "../components/analytics/LocationHotspots";
import { RecentActivity } from "../components/analytics/RecentActivity";
import { ImpactSummary } from "../components/analytics/ImpactSummary";
import { SevaAIInsightCard } from "../components/analytics/SevaAIInsightCard";
import { AnalyticsEmptyState } from "../components/analytics/AnalyticsEmptyState";

const INITIAL_FILTERS: FiltersType = {
  dateRange: "all",
  category: "all",
  status: "all",
  priority: "all",
  department: "all",
  searchQuery: "",
};

export const ImpactPage: React.FC = () => {
  const { user } = useAuth();
  const { reports } = useReports();
  const [filters, setFilters] = useState<FiltersType>(INITIAL_FILTERS);

  // Extract unique categories and departments from actual reports
  const categories = useMemo(() => {
    return Array.from(new Set(reports.map((r) => r.category))).sort();
  }, [reports]);

  const departments = useMemo(() => {
    return Array.from(new Set(reports.map((r) => r.department || "General Municipal Grievance Division"))).sort();
  }, [reports]);

  // Compute filtered reports dataset
  const filteredReports = useMemo(() => {
    return analyticsService.filterReports(reports, filters, user);
  }, [reports, filters, user]);

  // Compute full analytics payload
  const analyticsData = useMemo(() => {
    return analyticsService.getAnalytics(reports, filters, user);
  }, [reports, filters, user]);

  const handleFilterChange = (updates: Partial<FiltersType>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const userRole = user?.role || "citizen";
  const isFiltered =
    filters.dateRange !== "all" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.department !== "all" ||
    Boolean(filters.searchQuery?.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header & CSV Export */}
      <AnalyticsHeader currentUser={user} filteredReports={filteredReports} />

      {/* 2. Filter Bar */}
      <AnalyticsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        categories={categories}
        departments={departments}
        userRole={userRole}
      />

      {/* 3. SevaAI Data Insight Card */}
      <SevaAIInsightCard insightText={analyticsData.sevaAiInsight} />

      {/* 4. Overview KPI Cards */}
      <AnalyticsKpiCards metrics={analyticsData.overview} />

      {/* 5. Main Charts / Analytics Layout */}
      {filteredReports.length === 0 ? (
        <AnalyticsEmptyState onResetFilters={handleResetFilters} isFiltered={isFiltered} />
      ) : (
        <div className="space-y-6">
          {/* Row 1: Reporting Velocity Trend & Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ReportsTrendChart data={analyticsData.reportsOverTime} />
            </div>
            <div>
              <StatusDistributionChart data={analyticsData.statusDistribution} />
            </div>
          </div>

          {/* Row 2: Category & Priority Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryDistributionChart data={analyticsData.categoryDistribution} />
            <PriorityDistributionChart data={analyticsData.priorityDistribution} />
          </div>

          {/* Row 3: Resolution Performance Banner */}
          <ResolutionMetrics metrics={analyticsData.overview} />

          {/* Row 4: Department Workload (Admin & Department View) */}
          {userRole !== "citizen" && (
            <DepartmentWorkload workload={analyticsData.departmentWorkload} />
          )}

          {/* Row 5: Geographic Hotspots & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationHotspots
              hotspots={analyticsData.locationHotspots}
              activeCategory={filters.category}
              activeStatus={filters.status}
            />
            <RecentActivity activities={analyticsData.recentActivity} />
          </div>

          {/* Row 6: Impact Summary */}
          <ImpactSummary metrics={analyticsData.overview} />
        </div>
      )}
    </div>
  );
};
