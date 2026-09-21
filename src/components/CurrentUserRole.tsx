import React from "react";
import { useAuth } from "../context/AuthContext";
import { User as UserIcon, ShieldCheck, Building2 } from "lucide-react";

export const CurrentUserRole: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const roleConfig = {
    citizen: {
      label: "Citizen",
      icon: UserIcon,
      badgeStyle: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    },
    admin: {
      label: "Administrator",
      icon: ShieldCheck,
      badgeStyle: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    },
    department: {
      label: "Department Officer",
      icon: Building2,
      badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
  };

  const config = roleConfig[user.role] || roleConfig.citizen;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold select-none ${config.badgeStyle}`}
      title={`Authenticated Role: ${config.label}`}
      aria-label={`Authenticated Role: ${config.label}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </div>
  );
};
