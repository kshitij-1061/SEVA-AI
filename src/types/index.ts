export type UserRole = "citizen" | "admin" | "department";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  avatar?: string;
  role: UserRole;
  department?: string;
  joinedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  password: string;
  confirmPassword?: string;
}

/* ==========================================================================
   MODULE 4: AI Vision & Evidence Analyzer Types
   ========================================================================== */

export type VisionSeverity = "low" | "medium" | "high" | "urgent";

export type VisionAnalysisStatus =
  | "not_analyzed"
  | "analyzing"
  | "completed"
  | "failed";

export interface VisionObservation {
  id: string;
  text: string;
  type: "damage" | "hazard" | "environment" | "object" | "general";
}

export interface VisionAnalysisResult {
  id: string;
  imageId: string;
  status: VisionAnalysisStatus;
  detectedCategory?: string;
  detectedIssue?: string;
  severity?: VisionSeverity;
  confidence?: number;
  observations: VisionObservation[];
  suggestedDescription?: string;
  analyzedAt?: string;
  provider: "demo" | "real";
  disclaimer?: string;
}

/* ==========================================================================
   MODULE 3: Civic Issue Reporting Data Model
   ========================================================================== */

export type ReportStatus =
  | "submitted"
  | "acknowledged"
  | "in_progress"
  | "resolved"
  | "rejected";

export type ReportPriority = "low" | "medium" | "high" | "urgent";

export interface ReportImage {
  id: string;
  name: string;
  previewUrl: string;
  uploadedAt: string;
  analysis?: VisionAnalysisResult;
}

export interface ReportTimelineEvent {
  id: string;
  status: ReportStatus;
  title: string;
  description: string;
  timestamp: string;
  actor?: "citizen" | "admin" | "department" | "system";
}

export interface ReportAssignment {
  department?: string;
  assignedTo?: string;
  assignedAt?: string;
  assignedBy?: string;
}

export interface ReportInternalNote {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: "admin" | "department";
  text: string;
  createdAt: string;
}

export interface ResolutionFeedback {
  status: "confirmed" | "not_resolved";
  comment?: string;
  submittedAt: string;
}

export interface CivicReport {
  id: string; // e.g., "SF-1024"
  userId: string;
  userName?: string;
  category: string;
  issueType: string;
  title: string;
  description: string;
  priority: ReportPriority;
  status: ReportStatus;
  location: {
    address?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  images: ReportImage[];
  department?: string;
  aiGenerated?: boolean;
  aiAnalysis?: {
    confidence?: number;
    source?: "sevaai" | "vision" | "manual";
  };
  createdAt: string;
  updatedAt: string;
  timeline: ReportTimelineEvent[];
  assignment?: ReportAssignment;
  internalNotes?: ReportInternalNote[];
  resolutionFeedback?: ResolutionFeedback;
}

export interface CreateReportInput {
  category: string;
  issueType: string;
  title: string;
  description: string;
  priority: ReportPriority;
  location: {
    address?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  images?: ReportImage[];
  department?: string;
  aiGenerated?: boolean;
  aiAnalysis?: {
    confidence?: number;
    source?: "sevaai" | "vision" | "manual";
  };
}

export interface PublicService {
  id: string;
  name: string;
  category:
    | "healthcare"
    | "education"
    | "employment"
    | "scholarships"
    | "financial_assistance"
    | "housing"
    | "social_welfare"
    | "emergency"
    | "ngo"
    | "skill_development";
  description: string;
  eligibility: string[];
  location: string;
  contact: string;
  officialUrl?: string;
  verified: boolean;
  createdAt: string;
}

/* ==========================================================================
   MODULE 2: SevaAI Intelligence Engine Types
   ========================================================================== */

export type SevaIntent =
  | "report_issue"
  | "find_service"
  | "track_report"
  | "general_help"
  | "emergency_guidance"
  | "multi_issue";

export interface SevaAIInput {
  message: string;
  language?: "english" | "hindi" | "hinglish";
  userId?: string;
  location?: {
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface SevaAIAction {
  type:
    | "create_report"
    | "find_services"
    | "track_report"
    | "show_guidance"
    | "split_actions";
  label: string;
  description: string;
  route?: string;
}

export interface SevaAIResult {
  intent: SevaIntent;
  confidence: number;
  category?: string;
  issueType?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  description?: string;
  locationHint?: string;
  detectedLanguage: "english" | "hindi" | "hinglish";
  actions: SevaAIAction[];
  explanation: string;
  entities?: {
    location?: string;
    department?: string;
    serviceType?: string;
    reportId?: string;
  };
  subIssues?: SevaAIResult[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  aiResult?: SevaAIResult;
}
