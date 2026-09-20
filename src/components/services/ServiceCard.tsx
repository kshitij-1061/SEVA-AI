import React from "react";
import type { PublicService, ServiceMatch } from "../../services/serviceFinder/types";
import { SavedServiceButton } from "./SavedServiceButton";
import { ServiceMatchExplanation } from "./ServiceMatchExplanation";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Coins,
  Home,
  Utensils,
  FileText,
  Users,
  UserCheck,
  Globe,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface ServiceCardProps {
  service: PublicService;
  match?: ServiceMatch;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, match }) => {
  const categoryIcons: Record<string, React.ReactNode> = {
    Education: <GraduationCap className="w-4 h-4 text-blue-600" />,
    Healthcare: <HeartPulse className="w-4 h-4 text-rose-600" />,
    Employment: <Briefcase className="w-4 h-4 text-amber-600" />,
    "Financial Assistance": <Coins className="w-4 h-4 text-emerald-600" />,
    Housing: <Home className="w-4 h-4 text-indigo-600" />,
    "Food & Welfare": <Utensils className="w-4 h-4 text-orange-600" />,
    "Documents & Certificates": <FileText className="w-4 h-4 text-teal-600" />,
    "Women & Child Services": <Users className="w-4 h-4 text-pink-600" />,
    "Senior Citizen Services": <UserCheck className="w-4 h-4 text-purple-600" />,
    Other: <Globe className="w-4 h-4 text-slate-600" />,
  };

  const methodBadges = {
    online: "bg-teal-50 text-teal-700 border-teal-200",
    offline: "bg-slate-100 text-slate-700 border-slate-200",
    both: "bg-indigo-50 text-indigo-700 border-indigo-200",
    information_only: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const methodLabels = {
    online: "Online Application",
    offline: "Offline / Visit Center",
    both: "Online & Offline",
    information_only: "Information & Guidance",
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Card Header: Category & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-800">
            {categoryIcons[service.category] || categoryIcons.Other}
            <span>{service.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${methodBadges[service.applicationMethod]}`}>
              {methodLabels[service.applicationMethod]}
            </span>
            <SavedServiceButton serviceId={service.id} />
          </div>
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
            {service.name}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>
        </div>

        {/* AI Match Explanation Box if available */}
        {match && <ServiceMatchExplanation match={match} />}

        {/* Audience & Key Benefits */}
        <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Who it may help
            </span>
            <div className="flex flex-wrap gap-1">
              {service.audience.map((aud, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {service.benefits.length > 0 && (
            <div className="text-[11px] text-slate-600 space-y-1">
              <div className="flex items-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1 font-medium text-slate-800">{service.benefits[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {service.location?.city ? (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{service.location.city}</span>
          </div>
        ) : (
          <span className="text-[10px] text-slate-400 font-mono">Nationwide</span>
        )}

        <Link
          to={`/services/${service.id}`}
          className="px-4 py-2 bg-slate-900 group-hover:bg-teal-600 text-white font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
