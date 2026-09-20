import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import type { PublicService } from "../services/serviceFinder/types";
import { SavedServiceButton } from "../components/services/SavedServiceButton";
import { EligibilityHint } from "../components/services/EligibilityHint";
import { RequiredDocuments } from "../components/services/RequiredDocuments";
import { ApplicationSteps } from "../components/services/ApplicationSteps";
import { ServiceSource } from "../components/services/ServiceSource";
import {
  ArrowLeft,
  Share2,
  Check,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";

export const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getServiceById } = useServices();
  const navigate = useNavigate();

  const [service, setService] = useState<PublicService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getServiceById(id).then((res) => {
        setService(res);
        setLoading(false);
      });
    }
  }, [id, getServiceById]);

  const handleShareClick = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-8 bg-slate-200 rounded-xl w-32 animate-pulse" />
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 animate-pulse">
          <div className="h-6 bg-slate-200 rounded-lg w-1/4" />
          <div className="h-8 bg-slate-200 rounded-xl w-3/4" />
          <div className="h-20 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-md text-center space-y-4">
        <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto font-bold text-lg font-mono">
          404
        </div>
        <h2 className="text-xl font-bold text-slate-900">Service Not Found</h2>
        <p className="text-xs text-slate-600">
          No public service matching ID <strong>{id}</strong> was found in the directory.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Service Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Controls & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-slate-300">/</span>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 truncate max-w-[150px]">{service.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareClick}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Link</span>
              </>
            )}
          </button>
          <SavedServiceButton serviceId={service.id} variant="button" />
        </div>
      </div>

      {/* Main Service Card Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* Title Header */}
        <div className="space-y-3 border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {service.category}
            </span>
            {service.location?.city && (
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" /> {service.location.city},{" "}
                {service.location.state}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {service.name}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">{service.shortDescription}</p>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            About This Scheme & Service
          </h2>
          <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        {/* Key Benefits */}
        {service.benefits.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Key Program Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {service.benefits.map((ben, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-emerald-950 flex items-start gap-2 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Target Audience */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-teal-600" /> Who It May Help
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {service.audience.map((aud, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-xl font-semibold border border-slate-200"
              >
                {aud}
              </span>
            ))}
          </div>
        </div>

        {/* Eligibility Guidance */}
        <EligibilityHint hints={service.eligibilityHints} />

        {/* Required Documents */}
        <RequiredDocuments documents={service.requiredDocuments} />

        {/* Application Steps */}
        <ApplicationSteps steps={service.applicationSteps} />

        {/* Official Reference Source */}
        <ServiceSource officialSource={service.officialSource} sourceType={service.sourceType} />
      </div>
    </div>
  );
};
