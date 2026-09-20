import type { SevaAIInput, SevaAIResult } from "../types";
import { DemoAIProvider } from "./providers/demoAIProvider";
import type { AIProvider } from "./providers/demoAIProvider";

class SevaAIService {
  private provider: AIProvider;

  constructor(provider?: AIProvider) {
    this.provider = provider || new DemoAIProvider();
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
  }

  public async analyze(input: SevaAIInput): Promise<SevaAIResult> {
    return this.provider.analyze(input);
  }
}

export const sevaAIService = new SevaAIService();
