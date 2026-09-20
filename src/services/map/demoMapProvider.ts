import type { MapProvider, MapItem, MapReportItem, MapServiceItem, MapHotspot } from "./types";
import { SEED_MAP_REPORTS, SEED_MAP_SERVICES } from "../../data/seedMapData";
import { clusterReports } from "../../utils/mapFilters";

export class DemoMapProvider implements MapProvider {
  async getReports(): Promise<MapReportItem[]> {
    await new Promise((res) => setTimeout(res, 150));
    return SEED_MAP_REPORTS;
  }

  async getServices(): Promise<MapServiceItem[]> {
    await new Promise((res) => setTimeout(res, 150));
    return SEED_MAP_SERVICES;
  }

  async getHotspots(): Promise<MapHotspot[]> {
    await new Promise((res) => setTimeout(res, 150));
    return clusterReports(SEED_MAP_REPORTS);
  }

  async getMapItems(): Promise<MapItem[]> {
    const [reports, services, hotspots] = await Promise.all([
      this.getReports(),
      this.getServices(),
      this.getHotspots(),
    ]);
    return [...reports, ...services, ...hotspots];
  }
}

export const demoMapProvider = new DemoMapProvider();
