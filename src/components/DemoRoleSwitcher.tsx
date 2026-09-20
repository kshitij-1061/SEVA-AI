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
    <div className="bg-slate-900 text-white py-2 px-4 text-xs shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-slate-100">Active Role View:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => handleRoleChange("citizen")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              currentRole === "citizen"
                ? "bg-teal-600 text-white shadow-xs font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
            title="Switch to Citizen View"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Citizen</span>
          </button>

          <button
            onClick={() => handleRoleChange("admin")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              currentRole === "admin"
                ? "bg-indigo-600 text-white shadow-xs font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
            title="Switch to Administrator View"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator</span>
          </button>

          <button
            onClick={() => handleRoleChange("department")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              currentRole === "department"
                ? "bg-amber-600 text-white shadow-xs font-semibold"
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
