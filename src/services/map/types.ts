import type { ReportStatus, ReportPriority } from "../../types";

export type MapItemType = "report" | "service" | "hotspot";

export interface MapLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  landmark?: string;
}

export interface MapReportItem {
  id: string;
  type: "report";
  reportId: string;
  title: string;
  category: string;
  issueType: string;
  priority: ReportPriority;
  status: ReportStatus;
  location: MapLocation;
  createdAt: string;
  department?: string;
  imageUrl?: string;
  isDemo?: boolean;
  userId?: string;
}

export interface MapServiceItem {
  id: string;
  type: "service";
  serviceId: string;
  name: string;
  category: string;
  location: MapLocation;
  applicationMethod?: string;
  officialUrl?: string;
  isDemo?: boolean;
}

export interface MapHotspot {
  id: string;
  type: "hotspot";
  title: string;
  category: string;
  issueCount: number;
  center: MapLocation;
  radiusMeters: number;
  reportIds: string[];
  isDemo?: boolean;
}

export type MapItem = MapReportItem | MapServiceItem | MapHotspot;

export interface MapFilters {
  itemType: "all" | "report" | "service" | "hotspot";
  category: string;
  priority: string;
  status: string;
  ownership: "all" | "mine";
}

export interface MapProvider {
  getMapItems(): Promise<MapItem[]>;
  getReports(): Promise<MapReportItem[]>;
  getServices(): Promise<MapServiceItem[]>;
  getHotspots(): Promise<MapHotspot[]>;
}
