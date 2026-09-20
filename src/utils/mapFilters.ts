import type { MapItem, MapReportItem, MapHotspot, MapFilters } from "../services/map/types";
import { getDistanceMeters } from "./distanceUtils";

export function clusterReports(reports: MapReportItem[], radiusMeters: number = 800): MapHotspot[] {
  const clusters: MapHotspot[] = [];
  const visited: Set<string> = new Set();

  for (let i = 0; i < reports.length; i++) {
    const r1 = reports[i];
    if (visited.has(r1.id)) continue;

    const group: MapReportItem[] = [r1];
    visited.add(r1.id);

    for (let j = i + 1; j < reports.length; j++) {
      const r2 = reports[j];
      if (visited.has(r2.id)) continue;

      const dist = getDistanceMeters(
        r1.location.latitude,
        r1.location.longitude,
        r2.location.latitude,
        r2.location.longitude
      );

      if (dist <= radiusMeters) {
        group.push(r2);
        visited.add(r2.id);
      }
    }

    if (group.length >= 2) {
      // Calculate geographic center
      const avgLat = group.reduce((sum, g) => sum + g.location.latitude, 0) / group.length;
      const avgLng = group.reduce((sum, g) => sum + g.location.longitude, 0) / group.length;

      clusters.push({
        id: `hotspot-cluster-${i}-${Date.now()}`,
        type: "hotspot",
        title: `Community ${group[0].category} Cluster`,
        category: group[0].category,
        issueCount: group.length,
        center: {
          latitude: avgLat,
          longitude: avgLng,
          city: group[0].location.city || "Meerut",
        },
        radiusMeters,
        reportIds: group.map((g) => g.reportId),
        isDemo: true,
      });
    }
  }

  return clusters;
}

export function filterMapItems(
  items: MapItem[],
  filters: MapFilters,
  searchQuery: string,
  currentUserId?: string
): MapItem[] {
  const q = searchQuery.toLowerCase().trim();

  return items.filter((item) => {
    // 1. Type Filter
    if (filters.itemType !== "all" && item.type !== filters.itemType) {
      return false;
    }

    // 2. Ownership Filter (for reports)
    if (filters.ownership === "mine" && item.type === "report") {
      if (!currentUserId || item.userId !== currentUserId) return false;
    }

    // 3. Category Filter
    if (filters.category !== "All") {
      if (item.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // 4. Priority Filter (for reports)
    if (filters.priority !== "All" && item.type === "report") {
      if (item.priority.toLowerCase() !== filters.priority.toLowerCase()) {
        return false;
      }
    }

    // 5. Status Filter (for reports)
    if (filters.status !== "All" && item.type === "report") {
      if (item.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // 6. Search Query
    if (q) {
      if (item.type === "report") {
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchId = item.reportId.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchIssue = item.issueType.toLowerCase().includes(q);
        const matchAddress = item.location.address?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchId && !matchCategory && !matchIssue && !matchAddress) {
          return false;
        }
      } else if (item.type === "service") {
        const matchName = item.name.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchAddress = item.location.address?.toLowerCase().includes(q) || false;
        if (!matchName && !matchCategory && !matchAddress) return false;
      } else if (item.type === "hotspot") {
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory) return false;
      }
    }

    return true;
  });
}
