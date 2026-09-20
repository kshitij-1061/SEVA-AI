import type {
  SevaAIInput,
  SevaAIResult,
} from "../../types";

export interface AIProvider {
  analyze(input: SevaAIInput): Promise<SevaAIResult>;
}

export const CIVIC_CATEGORIES = [
  "Road Infrastructure",
  "Street Lighting",
  "Waste Management",
  "Water Supply",
  "Drainage",
  "Public Sanitation",
  "Traffic & Transport",
  "Parks & Public Spaces",
  "Other",
];

export const SERVICE_CATEGORIES = [
  "Education",
  "Healthcare",
  "Employment",
  "Financial Assistance",
  "Housing",
  "Food & Welfare",
  "Documents & Certificates",
  "Women & Child Services",
  "Senior Citizen Services",
  "Other",
];

export class DemoAIProvider implements AIProvider {
  async analyze(input: SevaAIInput): Promise<SevaAIResult> {
    await new Promise((res) => setTimeout(res, 350));

    const rawMsg = input.message.trim();
    const msg = rawMsg.toLowerCase();
    const detectedLang = this.detectLanguage(rawMsg);

    // 1. Multi-Issue Check
    if (this.isMultiIssue(msg)) {
      return this.handleMultiIssue(msg, detectedLang);
    }

    // 2. Emergency Check
    if (this.isEmergency(msg)) {
      return this.handleEmergency(detectedLang);
    }

    // 3. Track Report Check
    const trackResult = this.checkTrackReport(rawMsg, msg, detectedLang);
    if (trackResult) return trackResult;

    // 4. Service Finder Check
    const serviceResult = this.checkServiceFinder(msg, detectedLang);
    if (serviceResult) return serviceResult;

    // 5. Civic Issue Check
    const issueResult = this.checkCivicIssue(rawMsg, msg, detectedLang);
    if (issueResult) return issueResult;

    // 6. General Help or Low-Confidence Clarification
    return this.handleGeneralHelpOrLowConfidence(msg, detectedLang);
  }

  private detectLanguage(text: string): "english" | "hindi" | "hinglish" {
    if (/[\u0900-\u097F]/.test(text)) {
      return "hindi";
    }

    const hinglishWords = [
      "sadak", "road", "gali", "gully", "kachra", "paani", "bijli",
      "nali", "naali", "toota", "kharab", "madad", "yojana", "paas",
      "hai", "mera", "meri", "mere", "mujhe", "chahiye", "karwa", "bhai",
      "andhera", "gaddha", "pareshani", "kya", "kaise", "kab"
    ];

    const words = text.toLowerCase().split(/\s+/);
    const matches = words.filter((w) => hinglishWords.includes(w));
    if (matches.length >= 1) {
      return "hinglish";
    }

    return "english";
  }

  private isMultiIssue(msg: string): boolean {
    const hasConjunction = msg.includes(" and ") || msg.includes(" also ") || msg.includes(" aur ") || msg.includes(",");
    let domainCount = 0;
    if (msg.includes("pothole") || msg.includes("road") || msg.includes("gaddha") || msg.includes("sadak")) domainCount++;
    if (msg.includes("garbage") || msg.includes("trash") || msg.includes("kachra") || msg.includes("waste")) domainCount++;
    if (msg.includes("street") || msg.includes("light") || msg.includes("andhera") || msg.includes("bijli")) domainCount++;
    if (msg.includes("water") || msg.includes("paani") || msg.includes("drain") || msg.includes("nali")) domainCount++;

    return hasConjunction && domainCount >= 2;
  }

  private handleMultiIssue(msg: string, lang: "english" | "hindi" | "hinglish"): SevaAIResult {
    const subIssues: SevaAIResult[] = [];

    if (msg.includes("pothole") || msg.includes("road") || msg.includes("gaddha") || msg.includes("sadak")) {
      subIssues.push({
        intent: "report_issue",
        confidence: 0.9,
        category: "Road Infrastructure",
        issueType: "Pothole / Road Damage",
        priority: "high",
        description: "Pothole / road damage detected in composite request",
        detectedLanguage: lang,
        actions: [
          {
            type: "create_report",
            label: "Create Road Report",
            description: "Prepare civic report for road infrastructure",
            route: "/report-issue?category=roads&issue=Pothole",
          },
        ],
        explanation: "Pothole or road infrastructure issue detected.",
      });
    }

    if (msg.includes("garbage") || msg.includes("trash") || msg.includes("kachra") || msg.includes("waste")) {
      subIssues.push({
        intent: "report_issue",
        confidence: 0.9,
        category: "Waste Management",
        issueType: "Garbage Dump",
        priority: "medium",
        description: "Garbage dump detected in composite request",
        detectedLanguage: lang,
        actions: [
          {
            type: "create_report",
            label: "Create Garbage Report",
            description: "Prepare civic report for waste management",
            route: "/report-issue?category=garbage&issue=Garbage%20Dump",
          },
        ],
        explanation: "Garbage dump issue detected.",
      });
    }

    if (msg.includes("street") || msg.includes("light") || msg.includes("andhera") || msg.includes("bijli")) {
      subIssues.push({
        intent: "report_issue",
        confidence: 0.9,
        category: "Street Lighting",
        issueType: "Broken Streetlight",
        priority: "medium",
        description: "Streetlight outage detected in composite request",
        detectedLanguage: lang,
        actions: [
          {
            type: "create_report",
            label: "Create Streetlight Report",
            description: "Prepare civic report for street lighting",
            route: "/report-issue?category=streetlights&issue=Broken%20Streetlight",
          },
        ],
        explanation: "Broken streetlight issue detected.",
      });
    }

    return {
      intent: "multi_issue",
      confidence: 0.95,
      detectedLanguage: lang,
      explanation: `I detected ${subIssues.length} distinct civic issues in your statement. SevaAI can help you file separate reports for each issue.`,
      subIssues,
      actions: [
        {
          type: "split_actions",
          label: `Review & Create ${subIssues.length} Civic Reports`,
          description: "Inspect each detected issue and pre-fill report forms",
          route: "/report-issue?mode=multi",
        },
      ],
    };
  }

  private isEmergency(msg: string): boolean {
    const emergencyTerms = [
      "pipe burst", "burst pipe", "electrical wire hanging", "live wire",
      "hanging wire", "road collapsed", "gas leak", "severe flood",
      "transformer blast", "current lag raha", "danger wire"
    ];
    return emergencyTerms.some((term) => msg.includes(term));
  }

  private handleEmergency(lang: "english" | "hindi" | "hinglish"): SevaAIResult {
    return {
      intent: "emergency_guidance",
      confidence: 0.95,
      priority: "urgent",
      category: "Public Safety & Hazard",
      issueType: "Urgent Infrastructure Hazard",
      detectedLanguage: lang,
      explanation:
        "⚠️ Urgent Hazard Detected! This situation may pose immediate physical danger. Please contact your local municipal/emergency authorities immediately if lives are at risk. You can also file a high-priority SevaFix report for official dispatch.",
      actions: [
        {
          type: "create_report",
          label: "Submit High-Priority Urgent Hazard Report",
          description: "Dispatch urgent report to department officers",
          route: "/report-issue?priority=urgent&category=electricity",
        },
        {
          type: "show_guidance",
          label: "View Local Emergency Hotline Numbers",
          description: "See guidance for municipal emergency dispatches",
          route: "/services?category=emergency",
        },
      ],
    };
  }

  private checkTrackReport(rawMsg: string, msg: string, lang: "english" | "hindi" | "hinglish"): SevaAIResult | null {
    const reportIdMatch = rawMsg.match(/SF-\d+/i);
    const trackingKeywords = [
      "where is my complaint", "track my report", "check my report",
      "complaint status", "report status", "status of sf", "my report",
      "what happened to sf"
    ];

    const hasKeyword = trackingKeywords.some((kw) => msg.includes(kw));

    if (reportIdMatch || hasKeyword) {
      const extractedId = reportIdMatch ? reportIdMatch[0].toUpperCase() : undefined;
      return {
        intent: "track_report",
        confidence: 0.95,
        detectedLanguage: lang,
        explanation: extractedId
          ? `I recognized complaint reference ${extractedId}. You can track its live status timeline directly.`
          : "I can help you check the real-time progress timeline of your submitted civic complaints.",
        entities: {
          reportId: extractedId,
        },
        actions: [
          {
            type: "track_report",
            label: extractedId ? `Track Report #${extractedId}` : "Open My Report Tracker",
            description: "View status updates, assigned department, and resolution timeline",
            route: extractedId ? `/my-reports?id=${extractedId}` : "/my-reports",
          },
        ],
      };
    }

    return null;
  }

  private checkServiceFinder(msg: string, lang: "english" | "hindi" | "hinglish"): SevaAIResult | null {
    const serviceRules = [
      {
        keywords: ["scholarship", "financial assistance for education", "daughter's education", "school fees", "college fee", "beti ki padhai", "padhai ke liye"],
        category: "Education",
        serviceType: "Scholarships & Financial Assistance",
      },
      {
        keywords: ["health insurance", "hospital", "medical help", "doctor", "health scheme", "ayushman", "ilaj"],
        category: "Healthcare",
        serviceType: "Healthcare Schemes & Insurance",
      },
      {
        keywords: ["job", "employment", "skill", "training", "rozgar", "naukri", "placement"],
        category: "Employment",
        serviceType: "Skill Development & Job Portals",
      },
      {
        keywords: ["housing", "house", "home loan", "pm awas", "makan", "ghar"],
        category: "Housing",
        serviceType: "Housing & Welfare Assistance",
      },
      {
        keywords: ["ration", "food", "pension", "old age", "senior citizen", "welfare", "bata", "sahayata"],
        category: "Financial Assistance",
        serviceType: "Social Welfare & Pensions",
      },
    ];

    for (const rule of serviceRules) {
      if (rule.keywords.some((kw) => msg.includes(kw))) {
        return {
          intent: "find_service",
          confidence: 0.92,
          category: rule.category,
          detectedLanguage: lang,
          entities: {
            serviceType: rule.serviceType,
          },
          explanation: `We understood your need for ${rule.serviceType}. SevaFix can match you with verified government and community schemes.`,
          actions: [
            {
              type: "find_services",
              label: `Discover ${rule.category} Schemes`,
              description: `View verified resources for ${rule.serviceType}`,
              route: `/services?category=${encodeURIComponent(rule.category.toLowerCase())}`,
            },
          ],
        };
      }
    }

    if (msg.includes("scheme") || msg.includes("service") || msg.includes("yojana") || msg.includes("help for") || msg.includes("financial help")) {
      return {
        intent: "find_service",
        confidence: 0.85,
        category: "Public Services",
        detectedLanguage: lang,
        explanation: "SevaFix verified service directory allows citizens to search government schemes and welfare programs.",
        actions: [
          {
            type: "find_services",
            label: "Search Verified Public Services",
            description: "Filter public schemes by health, education, and financial aid",
            route: "/services",
          },
        ],
      };
    }

    return null;
  }

  private checkCivicIssue(rawMsg: string, msg: string, lang: "english" | "hindi" | "hinglish"): SevaAIResult | null {
    const issueRules = [
      {
        keywords: ["pothole", "gaddha", "sadak kharab", "broken road", "road damage", "road cracked", "hole in road"],
        category: "Road Infrastructure",
        issueType: "Pothole / Road Damage",
        priority: (m: string) => (m.includes("large") || m.includes("huge") || m.includes("bada") || m.includes("accident") || m.includes("college") ? "high" : "medium"),
      },
      {
        keywords: ["street light", "streetlight", "lamp", "light not working", "andhera", "dark road", "gully light"],
        category: "Street Lighting",
        issueType: "Broken Streetlight",
        priority: (m: string) => (m.includes("dark") || m.includes("three days") || m.includes("unsafe") ? "medium" : "low"),
      },
      {
        keywords: ["garbage", "trash", "waste", "dump", "kachra", "litter", "dirty street", "dustbin overflow"],
        category: "Waste Management",
        issueType: "Garbage Dump",
        priority: (m: string) => (m.includes("pile") || m.includes("bad smell") ? "medium" : "low"),
      },
      {
        keywords: ["water leak", "pipeline", "water supply", "no water", "paani", "water line", "pipe broken"],
        category: "Water Supply",
        issueType: "Water Leakage / Shortage",
        priority: (m: string) => (m.includes("leak") || m.includes("major") ? "high" : "medium"),
      },
      {
        keywords: ["drain", "drainage", "sewer", "blocked drain", "nali", "naali", "overflowing drain"],
        category: "Drainage",
        issueType: "Blocked / Overflowing Drain",
        priority: (m: string) => (m.includes("overflow") || m.includes("stink") ? "high" : "medium"),
      },
    ];

    for (const rule of issueRules) {
      if (rule.keywords.some((kw) => msg.includes(kw))) {
        const priority = rule.priority(msg) as "low" | "medium" | "high" | "urgent";

        let locationHint = "";
        const locationMatch = rawMsg.match(/(outside [^,\.]+)|(near [^,\.]+)|(at [^,\.]+)|(in [^,\.]+)/i);
        if (locationMatch) {
          locationHint = locationMatch[0];
        }

        return {
          intent: "report_issue",
          confidence: 0.94,
          category: rule.category,
          issueType: rule.issueType,
          priority,
          description: rawMsg,
          locationHint,
          detectedLanguage: lang,
          entities: {
            department: rule.category,
            location: locationHint,
          },
          explanation: `SevaAI classified your request as a ${rule.category} issue (${rule.issueType}) with a suggested priority of ${priority.toUpperCase()}.`,
          actions: [
            {
              type: "create_report",
              label: "Create Civic Report",
              description: `Pre-fill report form for ${rule.issueType}`,
              route: `/report-issue?category=${encodeURIComponent(rule.category)}&issue=${encodeURIComponent(rule.issueType)}&priority=${priority}&desc=${encodeURIComponent(rawMsg)}`,
            },
          ],
        };
      }
    }

    return null;
  }

  private handleGeneralHelpOrLowConfidence(msg: string, lang: "english" | "hindi" | "hinglish"): SevaAIResult {
    const isVague = msg.length < 25 && (msg.includes("problem") || msg.includes("help") || msg.includes("issue") || msg.includes("madad"));

    if (isVague) {
      return {
        intent: "general_help",
        confidence: 0.45,
        detectedLanguage: lang,
        explanation: "I'm not completely sure what you need yet. Could you tell me a little more, or pick an action below?",
        actions: [
          {
            type: "create_report",
            label: "Report a Civic Issue",
            description: "Potholes, streetlights, garbage, water leaks",
            route: "/report-issue",
          },
          {
            type: "find_services",
            label: "Find a Public Service",
            description: "Scholarships, health schemes, pensions, welfare",
            route: "/services",
          },
          {
            type: "track_report",
            label: "Track an Existing Report",
            description: "Check status of previously submitted complaints",
            route: "/my-reports",
          },
        ],
      };
    }

    return {
      intent: "general_help",
      confidence: 0.88,
      detectedLanguage: lang,
      explanation: "SevaAI is your AI Citizen Assistant. Tell us what you need in natural language, and we will guide you to the right civic workflow.",
      actions: [
        {
          type: "create_report",
          label: "Report a Civic Problem",
          description: "File complaints for roads, water, electricity, or sanitation",
          route: "/report-issue",
        },
        {
          type: "find_services",
          label: "Explore Public Schemes",
          description: "Discover government assistance programs & scholarships",
          route: "/services",
        },
      ],
    };
  }
}
