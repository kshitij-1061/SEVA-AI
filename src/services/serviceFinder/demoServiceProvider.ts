import type { ServiceProvider, PublicService, ServiceCategory, ServiceMatch } from "./types";
import { DEMO_SERVICES } from "../../data/demoServices";
import { matchServicesInDataset } from "../../utils/serviceMatcher";

export class DemoServiceProvider implements ServiceProvider {
  async getServices(): Promise<PublicService[]> {
    await new Promise((res) => setTimeout(res, 200));
    return DEMO_SERVICES.filter((s) => s.isActive);
  }

  async getServiceById(id: string): Promise<PublicService | null> {
    await new Promise((res) => setTimeout(res, 100));
    const found = DEMO_SERVICES.find((s) => s.id === id);
    return found || null;
  }

  async searchServices(query: string): Promise<PublicService[]> {
    await new Promise((res) => setTimeout(res, 150));
    if (!query.trim()) return this.getServices();
    const matches = matchServicesInDataset(DEMO_SERVICES, query);
    return matches.map((m) => m.service);
  }

  async getServicesByCategory(category: ServiceCategory): Promise<PublicService[]> {
    await new Promise((res) => setTimeout(res, 150));
    return DEMO_SERVICES.filter(
      (s) => s.isActive && s.category.toLowerCase() === category.toLowerCase()
    );
  }

  async matchServices(query: string, userCity?: string): Promise<ServiceMatch[]> {
    await new Promise((res) => setTimeout(res, 200));
    return matchServicesInDataset(DEMO_SERVICES, query, userCity);
  }
}

export const demoServiceProvider = new DemoServiceProvider();
