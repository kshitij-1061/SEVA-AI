export type ServiceCategory =
  | "Education"
  | "Healthcare"
  | "Employment"
  | "Financial Assistance"
  | "Housing"
  | "Food & Welfare"
  | "Documents & Certificates"
  | "Women & Child Services"
  | "Senior Citizen Services"
  | "Other";

export interface PublicService {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  tags: string[];
  audience: string[];
  benefits: string[];
  eligibilityHints: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  location?: {
    city?: string;
    state?: string;
    nationwide?: boolean;
  };
  language?: string[];
  applicationMethod: "online" | "offline" | "both" | "information_only";
  officialSource?: {
    name: string;
    url?: string;
  };
  sourceType: "verified" | "demo";
  lastReviewed?: string;
  isActive: boolean;
}

export type MatchType = "strong" | "moderate" | "possible";

export interface ServiceMatch {
  service: PublicService;
  matchScore: number;
  matchedTerms: string[];
  reasons: string[];
  matchType: MatchType;
}

export interface ServiceProvider {
  getServices(): Promise<PublicService[]>;
  getServiceById(id: string): Promise<PublicService | null>;
  searchServices(query: string): Promise<PublicService[]>;
  getServicesByCategory(category: ServiceCategory): Promise<PublicService[]>;
  matchServices(query: string, userCity?: string): Promise<ServiceMatch[]>;
}
