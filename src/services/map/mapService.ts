import type { MapProvider, MapItem, MapReportItem, MapServiceItem, MapHotspot } from "./types";
import { demoMapProvider } from "./demoMapProvider";
import { realMapProvider } from "./realMapProvider";

export class MapService {
  private activeProvider: MapProvider;
  private mode: "demo" | "real" = "demo";

  constructor() {
    this.activeProvider = demoMapProvider;
  }

  setMode(mode: "demo" | "real") {
    this.mode = mode;
    this.activeProvider = mode === "real" ? realMapProvider : demoMapProvider;
  }

  getMode(): "demo" | "real" {
    return this.mode;
  }

  async getMapItems(): Promise<MapItem[]> {
    return this.activeProvider.getMapItems();
  }

  async getReports(): Promise<MapReportItem[]> {
    return this.activeProvider.getReports();
  }

  async getServices(): Promise<MapServiceItem[]> {
    return this.activeProvider.getServices();
  }

  async getHotspots(): Promise<MapHotspot[]> {
    return this.activeProvider.getHotspots();
  }
}

export const mapService = new MapService();
