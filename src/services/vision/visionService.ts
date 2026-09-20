import type { VisionAnalysisResult } from "../../types";
import type { VisionProvider, VisionAnalysisContext } from "./types";
import { DemoVisionProvider } from "./demoVisionProvider";

class VisionService {
  private provider: VisionProvider;

  constructor(provider?: VisionProvider) {
    this.provider = provider || new DemoVisionProvider();
  }

  public setProvider(provider: VisionProvider) {
    this.provider = provider;
  }

  public async analyzeImage(
    image: File | string,
    context?: VisionAnalysisContext
  ): Promise<VisionAnalysisResult> {
    return this.provider.analyzeImage(image, context);
  }
}

export const visionService = new VisionService();
