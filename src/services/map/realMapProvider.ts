import type { MapProvider, MapItem, MapReportItem, MapServiceItem, MapHotspot } from "./types";

export class RealMapProvider implements MapProvider {
  async getReports(): Promise<MapReportItem[]> {
    throw new Error("RealMapProvider is not connected to a live GIS backend. Use DemoMapProvider.");
  }

  async getServices(): Promise<MapServiceItem[]> {
    throw new Error("RealMapProvider is not connected to a live GIS backend. Use DemoMapProvider.");
  }

  async getHotspots(): Promise<MapHotspot[]> {
    throw new Error("RealMapProvider is not connected to a live GIS backend. Use DemoMapProvider.");
  }

  async getMapItems(): Promise<MapItem[]> {
    throw new Error("RealMapProvider is not connected to a live GIS backend. Use DemoMapProvider.");
  }
}

export const realMapProvider = new RealMapProvider();
