import type { ReportStatus } from "./index";

export type DateRangeOption = "7d" | "30d" | "90d" | "all";

export interface AnalyticsFilters {
  dateRange: DateRangeOption;
  category?: string;
  status?: ReportStatus | "all";
  priority?: "low" | "medium" | "high" | "urgent" | "all";
  department?: string | "all";
  searchQuery?: string;
}

export interface OverviewMetrics {
  totalReports: number;
  activeReports: number;
  resolvedReports: number;
  rejectedReports: number;
  highPriorityReports: number; // high + urgent
  resolutionRate: number; // percentage (0 - 100)
  averageResolutionTimeMs: number | null;
  averageResolutionTimeFormatted: string;
  aiAssistedReports: number;
  visionAnalyzedReports: number;
}

export interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface TrendPoint {
  date: string;
  formattedDate: string;
  total: number;
  submitted: number;
  in_progress: number;
  resolved: number;
}

export interface DepartmentWorkload {
  department: string;
  total: number;
  active: number;
  resolved: number;
  highPriority: number;
  resolutionRate: number;
  avgResolutionTimeFormatted: string;
}

export interface LocationHotspot {
  latitude: number;
  longitude: number;
  count: number;
  categories: string[];
  address: string;
  city: string;
}

export interface RecentActivityItem {
  id: string;
  reportId: string;
  title: string;
  status: ReportStatus;
  actor: string;
  description: string;
  timestamp: string;
  timeAgo: string;
}

export interface AnalyticsData {
  overview: OverviewMetrics;
  statusDistribution: DistributionItem[];
  categoryDistribution: DistributionItem[];
  priorityDistribution: DistributionItem[];
  reportsOverTime: TrendPoint[];
  departmentWorkload: DepartmentWorkload[];
  locationHotspots: LocationHotspot[];
  recentActivity: RecentActivityItem[];
  sevaAiInsight: string;
}
