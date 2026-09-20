import type { CivicReport, User, UserRole, ReportStatus } from "../types";
import type {
  AnalyticsFilters,
  OverviewMetrics,
  DistributionItem,
  TrendPoint,
  DepartmentWorkload,
  LocationHotspot,
  RecentActivityItem,
  AnalyticsData,
} from "../types/analytics";
import {
  calculatePercentage,
  calculateResolutionTimeMs,
  formatResolutionTime,
  formatTimeAgo,
  parseReportDate,
} from "../utils/analyticsUtils";

export class AnalyticsService {
  /**
   * Filters raw civic reports based on user role and analytics filter parameters.
   */
  public filterReports(
    reports: CivicReport[],
    filters: AnalyticsFilters,
    currentUser: User | null
  ): CivicReport[] {
    let dataset = [...reports];

    // 1. Role-based scoping
    if (currentUser) {
      if (currentUser.role === "citizen") {
        dataset = dataset.filter((r) => r.userId === currentUser.id);
      } else if (currentUser.role === "department") {
        const userDept = currentUser.department || "Roads & Infrastructure Department";
        dataset = dataset.filter(
          (r) =>
            r.department?.toLowerCase() === userDept.toLowerCase() ||
            r.assignment?.department?.toLowerCase() === userDept.toLowerCase()
        );
      }
      // Admin sees all reports
    }

    // 2. Date Range Filter
    if (filters.dateRange && filters.dateRange !== "all") {
      const now = new Date();
      let cutoffDays = 7;
      if (filters.dateRange === "30d") cutoffDays = 30;
      if (filters.dateRange === "90d") cutoffDays = 90;

      const cutoffTime = now.getTime() - cutoffDays * 24 * 60 * 60 * 1000;

      dataset = dataset.filter((r) => {
        const d = parseReportDate(r.createdAt);
        return d ? d.getTime() >= cutoffTime : true;
      });
    }

    // 3. Category Filter
    if (filters.category && filters.category !== "all") {
      dataset = dataset.filter((r) => r.category === filters.category);
    }

    // 4. Status Filter
    if (filters.status && filters.status !== "all") {
      dataset = dataset.filter((r) => r.status === filters.status);
    }

    // 5. Priority Filter
    if (filters.priority && filters.priority !== "all") {
      dataset = dataset.filter((r) => r.priority === filters.priority);
    }

    // 6. Department Filter
    if (filters.department && filters.department !== "all") {
      dataset = dataset.filter((r) => r.department === filters.department);
    }

    // 7. Search Query Filter
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      dataset = dataset.filter((r) => {
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesCategory = r.category.toLowerCase().includes(q);
        const matchesCity = (r.location?.city || "").toLowerCase().includes(q);
        return matchesId || matchesTitle || matchesCategory || matchesCity;
      });
    }

    return dataset;
  }

  /**
   * Computes overview KPI metrics from filtered dataset.
   */
  public getOverviewMetrics(reports: CivicReport[]): OverviewMetrics {
    const totalReports = reports.length;
    const resolvedReports = reports.filter((r) => r.status === "resolved").length;
    const rejectedReports = reports.filter((r) => r.status === "rejected").length;
    const activeReports = reports.filter(
      (r) => r.status !== "resolved" && r.status !== "rejected"
    ).length;
    const highPriorityReports = reports.filter(
      (r) => r.priority === "high" || r.priority === "urgent"
    ).length;

    const resolutionRate = calculatePercentage(resolvedReports, totalReports);

    // Calculate average resolution time for resolved reports
    const validResolutionTimes: number[] = [];
    reports.forEach((r) => {
      const ms = calculateResolutionTimeMs(r);
      if (ms !== null) {
        validResolutionTimes.push(ms);
      }
    });

    const averageResolutionTimeMs =
      validResolutionTimes.length > 0
        ? validResolutionTimes.reduce((acc, curr) => acc + curr, 0) / validResolutionTimes.length
        : null;

    const averageResolutionTimeFormatted = formatResolutionTime(averageResolutionTimeMs);

    const aiAssistedReports = reports.filter((r) => r.aiGenerated).length;
    const visionAnalyzedReports = reports.filter(
      (r) => r.images && r.images.some((img) => img.analysis)
    ).length;

    return {
      totalReports,
      activeReports,
      resolvedReports,
      rejectedReports,
      highPriorityReports,
      resolutionRate,
      averageResolutionTimeMs,
      averageResolutionTimeFormatted,
      aiAssistedReports,
      visionAnalyzedReports,
    };
  }

  /**
   * Computes status distribution breakdown for Donut/Pie chart.
   */
  public getStatusDistribution(reports: CivicReport[]): DistributionItem[] {
    const statusOrder: { key: ReportStatus; label: string; color: string }[] = [
      { key: "submitted", label: "Submitted", color: "#f59e0b" }, // Amber
      { key: "acknowledged", label: "Acknowledged", color: "#3b82f6" }, // Blue
      { key: "in_progress", label: "In Progress", color: "#a855f7" }, // Purple
      { key: "resolved", label: "Resolved", color: "#10b981" }, // Emerald
      { key: "rejected", label: "Rejected", color: "#ef4444" }, // Red
    ];

    const total = reports.length;

    return statusOrder.map((st) => {
      const count = reports.filter((r) => r.status === st.key).length;
      return {
        label: st.label,
        count,
        percentage: calculatePercentage(count, total),
        color: st.color,
      };
    });
  }

  /**
   * Computes category distribution breakdown for Bar chart.
   */
  public getCategoryDistribution(reports: CivicReport[]): DistributionItem[] {
    const total = reports.length;
    const categoryCounts: Record<string, number> = {};

    reports.forEach((r) => {
      const cat = r.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return Object.entries(categoryCounts)
      .map(([cat, count]) => ({
        label: cat,
        count,
        percentage: calculatePercentage(count, total),
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Computes priority distribution breakdown for Bar chart.
   */
  public getPriorityDistribution(reports: CivicReport[]): DistributionItem[] {
    const total = reports.length;
    const priorityOrder = [
      { key: "urgent", label: "Urgent", color: "#ef4444" },
      { key: "high", label: "High", color: "#f97316" },
      { key: "medium", label: "Medium", color: "#3b82f6" },
      { key: "low", label: "Low", color: "#64748b" },
    ];

    return priorityOrder.map((p) => {
      const count = reports.filter((r) => r.priority === p.key).length;
      return {
        label: p.label,
        count,
        percentage: calculatePercentage(count, total),
        color: p.color,
      };
    });
  }

  /**
   * Computes time series trend data for Line/Area chart.
   */
  public getReportsOverTime(reports: CivicReport[]): TrendPoint[] {
    if (reports.length === 0) return [];

    // Map reports by date string (YYYY-MM-DD or readable date)
    const dateMap: Record<
      string,
      { total: number; submitted: number; in_progress: number; resolved: number; timestamp: number }
    > = {};

    reports.forEach((r) => {
      const d = parseReportDate(r.createdAt);
      if (!d) return;

      const dateKey = d.toISOString().split("T")[0]; // YYYY-MM-DD
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = {
          total: 0,
          submitted: 0,
          in_progress: 0,
          resolved: 0,
          timestamp: new Date(dateKey).getTime(),
        };
      }

      dateMap[dateKey].total += 1;
      if (r.status === "submitted" || r.status === "acknowledged") {
        dateMap[dateKey].submitted += 1;
      } else if (r.status === "in_progress") {
        dateMap[dateKey].in_progress += 1;
      } else if (r.status === "resolved") {
        dateMap[dateKey].resolved += 1;
      }
    });

    const sortedEntries = Object.entries(dateMap).sort(
      ([, a], [, b]) => a.timestamp - b.timestamp
    );

    return sortedEntries.map(([dateKey, stats]) => {
      const d = new Date(dateKey);
      const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return {
        date: dateKey,
        formattedDate,
        total: stats.total,
        submitted: stats.submitted,
        in_progress: stats.in_progress,
        resolved: stats.resolved,
      };
    });
  }

  /**
   * Computes department workload analytics for Admin/Dept dashboards.
   */
  public getDepartmentWorkload(reports: CivicReport[]): DepartmentWorkload[] {
    const deptMap: Record<string, CivicReport[]> = {};

    reports.forEach((r) => {
      const deptName = r.department || "General Municipal Grievance Division";
      if (!deptMap[deptName]) {
        deptMap[deptName] = [];
      }
      deptMap[deptName].push(r);
    });

    return Object.entries(deptMap)
      .map(([dept, deptReports]) => {
        const total = deptReports.length;
        const resolved = deptReports.filter((r) => r.status === "resolved").length;
        const active = deptReports.filter(
          (r) => r.status !== "resolved" && r.status !== "rejected"
        ).length;
        const highPriority = deptReports.filter(
          (r) => r.priority === "high" || r.priority === "urgent"
        ).length;

        const resolutionRate = calculatePercentage(resolved, total);

        const validMs: number[] = [];
        deptReports.forEach((r) => {
          const ms = calculateResolutionTimeMs(r);
          if (ms !== null) validMs.push(ms);
        });

        const avgMs = validMs.length > 0 ? validMs.reduce((a, b) => a + b, 0) / validMs.length : null;

        return {
          department: dept,
          total,
          active,
          resolved,
          highPriority,
          resolutionRate,
          avgResolutionTimeFormatted: formatResolutionTime(avgMs),
        };
      })
      .sort((a, b) => b.total - a.total);
  }

  /**
   * Computes location hotspot clusters from reports with valid latitude/longitude coordinates.
   */
  public getLocationHotspots(reports: CivicReport[]): LocationHotspot[] {
    const validReports = reports.filter(
      (r) =>
        r.location &&
        typeof r.location.latitude === "number" &&
        typeof r.location.longitude === "number" &&
        r.location.latitude !== 0
    );

    const keyMap: Record<
      string,
      { lat: number; lng: number; count: number; categories: Set<string>; address: string; city: string }
    > = {};

    validReports.forEach((r) => {
      const lat = r.location?.latitude;
      const lng = r.location?.longitude;
      if (typeof lat !== "number" || typeof lng !== "number") return;

      // Group coordinates rounded to ~200 meters (3 decimal places)
      const latRounded = Number(lat.toFixed(3));
      const lngRounded = Number(lng.toFixed(3));
      const key = `${latRounded},${lngRounded}`;

      if (!keyMap[key]) {
        keyMap[key] = {
          lat,
          lng,
          count: 0,
          categories: new Set(),
          address: r.location?.address || "Area location",
          city: r.location?.city || "Meerut",
        };
      }

      keyMap[key].count += 1;
      keyMap[key].categories.add(r.category);
    });

    return Object.values(keyMap)
      .map((item) => ({
        latitude: item.lat,
        longitude: item.lng,
        count: item.count,
        categories: Array.from(item.categories),
        address: item.address,
        city: item.city,
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Collects recent timeline activity across all reports.
   */
  public getRecentActivity(reports: CivicReport[], limit: number = 6): RecentActivityItem[] {
    const activities: RecentActivityItem[] = [];

    reports.forEach((r) => {
      if (r.timeline && r.timeline.length > 0) {
        r.timeline.forEach((ev) => {
          activities.push({
            id: ev.id || `act-${r.id}-${Date.now()}`,
            reportId: r.id,
            title: r.title,
            status: ev.status,
            actor: ev.actor || "system",
            description: ev.description || ev.title,
            timestamp: ev.timestamp,
            timeAgo: formatTimeAgo(ev.timestamp),
          });
        });
      }
    });

    // Sort by timestamp descending
    return activities
      .sort((a, b) => {
        const da = parseReportDate(a.timestamp);
        const db = parseReportDate(b.timestamp);
        return (db?.getTime() || 0) - (da?.getTime() || 0);
      })
      .slice(0, limit);
  }

  /**
   * Generates a factual, empirical SevaAI insight based strictly on report data.
   */
  public getSevaAIInsight(reports: CivicReport[], userRole: UserRole): string {
    if (reports.length === 0) {
      return "No active civic report data available yet in this demo environment. File a new complaint to start generating real-time analytics.";
    }

    const categories = this.getCategoryDistribution(reports);
    const topCategory = categories[0]?.label || "Civic Grievances";

    const overview = this.getOverviewMetrics(reports);

    if (userRole === "citizen") {
      return `You have submitted ${overview.totalReports} civic report${
        overview.totalReports === 1 ? "" : "s"
      }. ${overview.resolvedReports} resolved (${overview.resolutionRate}% resolution rate). Most reported topic: ${topCategory}.`;
    }

    if (userRole === "department") {
      return `Department workload currently has ${overview.activeReports} active issue${
        overview.activeReports === 1 ? "" : "s"
      } out of ${overview.totalReports} total assigned reports (${overview.resolutionRate}% resolution rate).`;
    }

    return `${topCategory} represents the highest volume of reported issues (${categories[0]?.percentage}% of total). Overall demo resolution rate is ${overview.resolutionRate}% across ${overview.totalReports} civic reports.`;
  }

  /**
   * Aggregates all analytics into a single complete result object.
   */
  public getAnalytics(
    allReports: CivicReport[],
    filters: AnalyticsFilters,
    currentUser: User | null
  ): AnalyticsData {
    const filtered = this.filterReports(allReports, filters, currentUser);
    const userRole: UserRole = currentUser?.role || "citizen";

    return {
      overview: this.getOverviewMetrics(filtered),
      statusDistribution: this.getStatusDistribution(filtered),
      categoryDistribution: this.getCategoryDistribution(filtered),
      priorityDistribution: this.getPriorityDistribution(filtered),
      reportsOverTime: this.getReportsOverTime(filtered),
      departmentWorkload: this.getDepartmentWorkload(filtered),
      locationHotspots: this.getLocationHotspots(filtered),
      recentActivity: this.getRecentActivity(filtered),
      sevaAiInsight: this.getSevaAIInsight(filtered, userRole),
    };
  }
}

export const analyticsService = new AnalyticsService();
