import type { ServiceProvider, PublicService, ServiceCategory, ServiceMatch } from "./types";

export class RealServiceProvider implements ServiceProvider {
  async getServices(): Promise<PublicService[]> {
    throw new Error("RealServiceProvider is not connected to a production database. Use DemoServiceProvider.");
  }

  async getServiceById(_id: string): Promise<PublicService | null> {
    throw new Error("RealServiceProvider is not connected to a production database. Use DemoServiceProvider.");
  }

  async searchServices(_query: string): Promise<PublicService[]> {
    throw new Error("RealServiceProvider is not connected to a production database. Use DemoServiceProvider.");
  }

  async getServicesByCategory(_category: ServiceCategory): Promise<PublicService[]> {
    throw new Error("RealServiceProvider is not connected to a production database. Use DemoServiceProvider.");
  }

  async matchServices(_query: string, _userCity?: string): Promise<ServiceMatch[]> {
    throw new Error("RealServiceProvider is not connected to a production database. Use DemoServiceProvider.");
  }
}

export const realServiceProvider = new RealServiceProvider();
