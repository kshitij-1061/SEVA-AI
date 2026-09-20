import type { ServiceProvider, PublicService, ServiceCategory, ServiceMatch } from "./types";
import { demoServiceProvider } from "./demoServiceProvider";
import { realServiceProvider } from "./realServiceProvider";

export class ServiceService {
  private activeProvider: ServiceProvider;
  private mode: "demo" | "real" = "demo";

  constructor() {
    this.activeProvider = demoServiceProvider;
  }

  setMode(mode: "demo" | "real") {
    this.mode = mode;
    this.activeProvider = mode === "real" ? realServiceProvider : demoServiceProvider;
  }

  getMode(): "demo" | "real" {
    return this.mode;
  }

  async getServices(): Promise<PublicService[]> {
    return this.activeProvider.getServices();
  }

  async getServiceById(id: string): Promise<PublicService | null> {
    return this.activeProvider.getServiceById(id);
  }

  async searchServices(query: string): Promise<PublicService[]> {
    return this.activeProvider.searchServices(query);
  }

  async getServicesByCategory(category: ServiceCategory): Promise<PublicService[]> {
    return this.activeProvider.getServicesByCategory(category);
  }

  async matchServices(query: string, userCity?: string): Promise<ServiceMatch[]> {
    return this.activeProvider.matchServices(query, userCity);
  }
}

export const serviceService = new ServiceService();
