import React from "react";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";
import { ShieldCheck, User as UserIcon, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DemoRoleSwitcher: React.FC = () => {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const currentRole = user?.role || "citizen";

  const handleRoleChange = (role: UserRole) => {
    switchDemoRole(role);
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "department") {
      navigate("/department");
    } else {
      navigate("/my-reports");
    }
  };

  return (
    <div className="bg-slate-900 text-white py-2 px-3 sm:px-4 text-xs shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="font-semibold text-slate-100 whitespace-nowrap">Active Role View:</span>
        </div>

        <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => handleRoleChange("citizen")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] sm:min-h-0 ${
              currentRole === "citizen"
                ? "bg-teal-600 text-white shadow-xs font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
            title="Switch to Citizen View"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => handleRoleChange("admin")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] sm:min-h-0 ${
              currentRole === "admin"
                ? "bg-indigo-600 text-white shadow-xs font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
            title="Switch to Administrator View"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator</span>
          </button>

          <button
            onClick={() => handleRoleChange("department")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] sm:min-h-0 ${
              currentRole === "department"
                ? "bg-amber-600 text-white shadow-xs font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
            title="Switch to Department Officer View"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Department Officer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
