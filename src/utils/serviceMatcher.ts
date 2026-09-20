import type { PublicService, ServiceMatch, MatchType } from "../services/serviceFinder/types";

// Dictionary mapping common Hindi / Hinglish terms to English search tokens
const HINGLISH_DICTIONARY: Record<string, string[]> = {
  naukri: ["job", "employment", "career", "work"],
  rojgar: ["employment", "job", "work"],
  padhai: ["education", "scholarship", "college", "school", "coaching"],
  school: ["education", "scholarship"],
  college: ["education", "scholarship"],
  fees: ["scholarship", "assistance", "financial"],
  ilaaj: ["healthcare", "treatment", "hospital", "medical"],
  ilaj: ["healthcare", "treatment", "hospital", "medical"],
  aspataal: ["hospital", "healthcare", "doctor"],
  dawai: ["medicine", "pharmacy", "generic"],
  ghar: ["housing", "house", "shelter", "awas"],
  makan: ["housing", "house", "awas"],
  khana: ["food", "ration", "meal", "canteen"],
  kachra: ["sanitation", "welfare"],
  madad: ["assistance", "aid", "help", "support"],
  sahayata: ["assistance", "aid", "help", "support"],
  yojana: ["scheme", "service", "program"],
  bata: ["pension", "allowance", "stipend"],
  pension: ["pension", "senior citizen", "elderly"],
  chahiye: ["need", "request"],
  kaise: ["how"],
  kya: ["what"],
  certificate: ["certificate", "documents", "proof"],
  praman: ["certificate", "proof"],
  patra: ["certificate", "document"],
  aay: ["income"],
  janam: ["birth"],
  mrityu: ["death"],
  niwas: ["domicile", "residence"],
  jati: ["caste"],
  mahila: ["women", "female"],
  beti: ["girls", "women"],
  bacche: ["child", "children"],
  bada: ["large", "senior"],
  badasahab: ["senior citizen"],
  kisan: ["farmer", "agriculture"],
  kheti: ["farmer", "agriculture"],
  lawyer: ["legal aid", "lawyer"],
  kanooni: ["legal aid", "justice"],
};

export function normalizeQuery(query: string): string[] {
  const clean = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .trim();

  const words = clean.split(/\s+/).filter((w) => w.length > 1);
  const expanded: Set<string> = new Set(words);

  words.forEach((word) => {
    if (HINGLISH_DICTIONARY[word]) {
      HINGLISH_DICTIONARY[word].forEach((syn) => expanded.add(syn));
    }
  });

  return Array.from(expanded);
}

export function calculateServiceMatch(
  service: PublicService,
  queryTokens: string[],
  userCity?: string
): ServiceMatch | null {
  if (!queryTokens.length || !service.isActive) return null;

  let score = 0;
  const matchedTerms: Set<string> = new Set();
  const reasons: string[] = [];

  const textTargets = [
    { text: service.name.toLowerCase(), weight: 10, label: "title" },
    { text: service.category.toLowerCase(), weight: 8, label: "category" },
    { text: service.tags.join(" ").toLowerCase(), weight: 6, label: "tags" },
    { text: service.shortDescription.toLowerCase(), weight: 5, label: "short description" },
    { text: service.audience.join(" ").toLowerCase(), weight: 4, label: "target audience" },
    { text: service.benefits.join(" ").toLowerCase(), weight: 4, label: "benefits" },
    { text: service.description.toLowerCase(), weight: 2, label: "full details" },
  ];

  queryTokens.forEach((token) => {
    textTargets.forEach((target) => {
      if (target.text.includes(token)) {
        score += target.weight;
        matchedTerms.add(token);
      }
    });
  });

  // Location preference boost
  if (userCity && service.location?.city) {
    if (service.location.city.toLowerCase() === userCity.toLowerCase()) {
      score += 5;
      reasons.push(`Directly available in ${userCity}`);
    }
  }

  if (matchedTerms.size === 0 || score < 5) {
    return null;
  }

  // Deduce human-friendly reason list
  if (matchedTerms.has("job") || matchedTerms.has("naukri") || matchedTerms.has("employment")) {
    reasons.push("Matches employment and career assistance terms");
  }
  if (matchedTerms.has("scholarship") || matchedTerms.has("education") || matchedTerms.has("padhai")) {
    reasons.push("Includes educational support & student aid features");
  }
  if (matchedTerms.has("healthcare") || matchedTerms.has("hospital") || matchedTerms.has("ilaaj") || matchedTerms.has("dawai")) {
    reasons.push("Provides medical treatment & health coverage information");
  }
  if (matchedTerms.has("housing") || matchedTerms.has("ghar") || matchedTerms.has("makan")) {
    reasons.push("Contains housing & shelter assistance guidelines");
  }
  if (matchedTerms.has("certificate") || matchedTerms.has("documents")) {
    reasons.push("Offers step-by-step certificate application procedures");
  }
  if (matchedTerms.has("pension") || matchedTerms.has("senior")) {
    reasons.push("Tailored for senior citizen financial and social security");
  }
  if (reasons.length === 0) {
    reasons.push(`Contains matching keywords: ${Array.from(matchedTerms).slice(0, 3).join(", ")}`);
  }

  let matchType: MatchType = "possible";
  if (score >= 25) {
    matchType = "strong";
  } else if (score >= 12) {
    matchType = "moderate";
  }

  return {
    service,
    matchScore: score,
    matchedTerms: Array.from(matchedTerms),
    reasons,
    matchType,
  };
}

export function matchServicesInDataset(
  dataset: PublicService[],
  query: string,
  userCity?: string
): ServiceMatch[] {
  const tokens = normalizeQuery(query);
  if (!tokens.length) return [];

  const matches: ServiceMatch[] = [];

  dataset.forEach((srv) => {
    const match = calculateServiceMatch(srv, tokens, userCity);
    if (match) {
      matches.push(match);
    }
  });

  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
