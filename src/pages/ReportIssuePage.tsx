import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useReports } from "../context/ReportContext";
import type { CreateReportInput, ReportPriority, ReportImage, VisionAnalysisResult } from "../types";
import { AIReportBanner } from "../components/AIReportBanner";
import { LocationPicker } from "../components/LocationPicker";
import { ReportImageUploader } from "../components/ReportImageUploader";
import { ReportReview } from "../components/ReportReview";
import { reportService } from "../services/reportService";
import {
  Sparkles,
  PlusCircle,
  FileText,
  Save,
  CheckCircle2,
  ArrowRight,
  Layers,
  Clock,
  Trash2,
} from "lucide-react";

export const CATEGORY_ISSUE_TYPES: { [key: string]: string[] } = {
  "Road Infrastructure": ["Pothole", "Broken Road", "Road Crack", "Damaged Footpath", "Missing Road Sign"],
  "Street Lighting": ["Broken Streetlight", "Flickering Light", "Dark Area", "Damaged Pole"],
  "Waste Management": ["Garbage Dump", "Overflowing Bin", "Illegal Dumping", "Uncollected Waste"],
  "Water Supply": ["Water Leakage", "Pipeline Damage", "No Water Supply", "Contaminated Water"],
  "Drainage": ["Blocked Drain", "Open Drain", "Sewer Overflow", "Waterlogging"],
  "Public Sanitation": ["Dirty Public Area", "Public Toilet Issue", "Sanitation Problem"],
  "Traffic & Transport": ["Damaged Traffic Signal", "Parking Problem", "Road Obstruction", "Broken Bus Stop"],
  "Parks & Public Spaces": ["Damaged Park Equipment", "Broken Bench", "Unsafe Public Area", "Damaged Playground"],
  "Other": ["Public Property Damage", "General Civic Grievance"],
};

export const ReportIssuePage: React.FC = () => {
  const { user } = useAuth();
  const { createReport, draft, saveDraft, clearDraft } = useReports();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isAiPrefilled, setIsAiPrefilled] = useState(false);
  const [aiConfidence, setAiConfidence] = useState<number | undefined>(undefined);
  const [showReview, setShowReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const [category, setCategory] = useState("Road Infrastructure");
  const [issueType, setIssueType] = useState("Pothole");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<ReportPriority>("high");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(user?.city || "Meerut");
  const [images, setImages] = useState<ReportImage[]>([]);

  const isMultiMode = searchParams.get("mode") === "multi";
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const aiResult = location.state?.aiResult;
    const queryCategory = searchParams.get("category");
    const queryIssue = searchParams.get("issue");
    const queryPriority = searchParams.get("priority") as ReportPriority;
    const queryDesc = searchParams.get("desc");

    if (aiResult) {
      setIsAiPrefilled(true);
      setAiConfidence(aiResult.confidence);
      if (aiResult.category) setCategory(aiResult.category);
      if (aiResult.issueType) setIssueType(aiResult.issueType);
      if (aiResult.priority) setPriority(aiResult.priority);
      if (aiResult.description) {
        setDescription(aiResult.description);
        setTitle(aiResult.issueType ? `${aiResult.issueType} report` : "Civic Complaint");
      }
      if (aiResult.locationHint) setAddress(aiResult.locationHint);
    } else if (queryCategory || queryIssue) {
      setIsAiPrefilled(true);
      if (queryCategory) setCategory(queryCategory);
      if (queryIssue) setIssueType(queryIssue);
      if (queryPriority) setPriority(queryPriority);
      if (queryDesc) {
        setDescription(queryDesc);
        setTitle(`${queryIssue || queryCategory} complaint`);
      }
    }
  }, [location.state, searchParams]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const available = CATEGORY_ISSUE_TYPES[newCat] || ["General Issue"];
    setIssueType(available[0]);
    if (!title || title.includes("complaint") || title.includes("report")) {
      setTitle(`${available[0]} in ${city}`);
    }
  };

  const handleIssueTypeChange = (newIssue: string) => {
    setIssueType(newIssue);
    if (!title || title.includes("complaint") || title.includes("report")) {
      setTitle(`${newIssue} in ${city}`);
    }
  };

  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!category) errs.category = "Please select an issue category.";
    if (!issueType) errs.issueType = "Please select an issue type.";
    if (!title.trim()) errs.title = "Short title is required.";
    if (!description.trim()) {
      errs.description = "Detailed description is required.";
    } else if (description.trim().length < 15) {
      errs.description = "Please provide at least 15 characters of detail.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowReview(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const inputData: CreateReportInput = {
      category,
      issueType,
      title: title || `${issueType} report`,
      description,
      priority,
      location: {
        address: address || "Near City Center",
        city: city || "Meerut",
        latitude: 28.9845,
        longitude: 77.7064,
      },
      images,
      aiGenerated: isAiPrefilled,
      aiAnalysis: isAiPrefilled
        ? {
            confidence: aiConfidence || 0.92,
            source: "sevaai",
          }
        : undefined,
    };

    const created = await createReport(inputData);
    setIsSubmitting(false);
    setSubmittedReportId(created.id);
  };

  const handleSaveDraftClick = () => {
    saveDraft({
      category,
      issueType,
      title,
      description,
      priority,
      location: { address, city },
    });
    alert("Draft saved to LocalStorage! You can resume it anytime.");
  };

  const handleResumeDraft = () => {
    if (!draft) return;
    if (draft.category) setCategory(draft.category);
    if (draft.issueType) setIssueType(draft.issueType);
    if (draft.title) setTitle(draft.title);
    if (draft.description) setDescription(draft.description);
    if (draft.priority) setPriority(draft.priority as ReportPriority);
    if (draft.location?.address) setAddress(draft.location.address);
    if (draft.location?.city) setCity(draft.location.city);
  };

  const handleGenerateAIDescription = () => {
    const generated = `Observation: ${issueType} problem under ${category} at ${address || city}. Requires inspection and repair by municipal department due to ${priority.toUpperCase()} urgency.`;
    setDescription(generated);
  };

  const handleApplyVisionFindings = (result: VisionAnalysisResult) => {
    if (result.detectedCategory) {
      setCategory(result.detectedCategory);
    }
    if (result.detectedIssue) {
      setIssueType(result.detectedIssue);
    }
    if (result.severity) {
      const sevMap: Record<string, ReportPriority> = {
        low: "low",
        medium: "medium",
        high: "high",
        urgent: "urgent",
      };
      setPriority(sevMap[result.severity] || "high");
    }
    if (result.suggestedDescription) {
      setDescription((prev) =>
        prev
          ? `${prev}\n\n[AI Vision Observation]: ${result.suggestedDescription}`
          : `[AI Vision Observation]: ${result.suggestedDescription}`
      );
    }
    setIsAiPrefilled(true);
    if (result.confidence) setAiConfidence(result.confidence);
  };

  if (submittedReportId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            Report Submitted Successfully
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Report ID: <span className="text-teal-600">{submittedReportId}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your civic complaint has been recorded in the SevaFix demo platform and assigned a tracking timeline.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left max-w-md mx-auto text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Issue:</span>
            <span className="font-bold text-slate-900">{issueType} ({category})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Initial Status:</span>
            <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded border">SUBMITTED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Location:</span>
            <span className="font-semibold text-slate-800">{address || city}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(`/report/${submittedReportId}`)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> View Report & Timeline
          </button>
          <button
            onClick={() => {
              setSubmittedReportId(null);
              setShowReview(false);
              setTitle("");
              setDescription("");
              setImages([]);
            }}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
          >
            Report Another Issue
          </button>
          <button
            onClick={() => navigate("/my-reports")}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            My Reports
          </button>
        </div>
      </div>
    );
  }

  if (isMultiMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl space-y-3 border border-emerald-700/60">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
            <Layers className="w-4 h-4 text-amber-300" /> Multi-Issue Detection Wizard
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Review Detected Civic Issues</h1>
          <p className="text-xs text-slate-300">
            SevaAI detected multiple distinct civic issues in your natural language prompt. Select an issue below to pre-fill and file its report:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { cat: "Road Infrastructure", type: "Pothole", prio: "high", desc: "Pothole outside college entrance" },
            { cat: "Waste Management", type: "Garbage Dump", prio: "medium", desc: "Garbage accumulated beside pothole" },
            { cat: "Street Lighting", type: "Broken Streetlight", prio: "medium", desc: "Streetlight outage on main street" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border uppercase">
                  Issue #0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{item.type}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.cat}</p>
                <p className="text-xs text-slate-700 mt-2 italic bg-slate-50 p-2 rounded-lg">“{item.desc}”</p>
              </div>

              <button
                onClick={() => {
                  setCategory(item.cat);
                  setIssueType(item.type);
                  setPriority(item.prio as ReportPriority);
                  setDescription(item.desc);
                  setTitle(`${item.type} complaint`);
                  setIsAiPrefilled(true);
                  navigate("/report-issue", { replace: true });
                }}
                className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Pre-fill & File Report #0{idx + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const suggestedDept = reportService.suggestDepartment(category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Civic Complaint Form
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Civic Complaint</h1>
          <p className="text-xs text-slate-500">Report potholes, streetlights, garbage, water leaks & damaged public infrastructure</p>
        </div>

        {draft && (
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Unfinished draft saved</span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handleResumeDraft}
                type="button"
                className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg text-[11px]"
              >
                Resume Draft
              </button>
              <button
                onClick={clearDraft}
                type="button"
                className="p-1 text-slate-400 hover:text-rose-600"
                title="Discard draft"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isAiPrefilled && (
        <AIReportBanner
          category={category}
          issueType={issueType}
          priority={priority}
          confidence={aiConfidence}
        />
      )}

      {showReview ? (
        <ReportReview
          input={{
            category,
            issueType,
            title: title || `${issueType} complaint`,
            description,
            priority,
            location: { address, city },
            images,
            aiGenerated: isAiPrefilled,
          }}
          suggestedDepartment={suggestedDept}
          onEdit={() => setShowReview(false)}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <form onSubmit={handleProceedToReview} className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
              1. Issue Classification & Description
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
                >
                  {Object.keys(CATEGORY_ISSUE_TYPES).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-[11px] text-rose-500 mt-0.5">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Issue Type *
                </label>
                <select
                  value={issueType}
                  onChange={(e) => handleIssueTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
                >
                  {(CATEGORY_ISSUE_TYPES[category] || ["Other"]).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.issueType && <p className="text-[11px] text-rose-500 mt-0.5">{errors.issueType}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Report Title *
              </label>
              <input
                type="text"
                maxLength={100}
                placeholder="e.g. Large pothole near college gate entrance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
              {errors.title && <p className="text-[11px] text-rose-500 mt-0.5">{errors.title}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Detailed Problem Description *
                </label>
                <button
                  type="button"
                  onClick={handleGenerateAIDescription}
                  className="text-[11px] text-teal-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" /> Suggest Description
                </button>
              </div>
              <textarea
                rows={4}
                placeholder="Describe what happened, depth/severity, safety hazards for bikes/pedestrians..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden resize-none"
              />
              {errors.description && <p className="text-[11px] text-rose-500 mt-0.5">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Suggested Urgency / Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["low", "medium", "high", "urgent"] as ReportPriority[]).map((prio) => (
                  <button
                    key={prio}
                    type="button"
                    onClick={() => setPriority(prio)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                      priority === prio
                        ? prio === "urgent"
                          ? "bg-rose-600 text-white border-rose-500 shadow-xs"
                          : prio === "high"
                          ? "bg-amber-600 text-white border-amber-500 shadow-xs"
                          : prio === "medium"
                          ? "bg-blue-600 text-white border-blue-500 shadow-xs"
                          : "bg-slate-700 text-white border-slate-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {prio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <LocationPicker
            address={address}
            city={city}
            onAddressChange={setAddress}
            onCityChange={setCity}
          />

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <ReportImageUploader
              images={images}
              onChange={setImages}
              categoryContext={category}
              issueTypeContext={issueType}
              onApplyVisionFindings={handleApplyVisionFindings}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveDraftClick}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4 text-slate-500" /> Save Draft to LocalStorage
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
