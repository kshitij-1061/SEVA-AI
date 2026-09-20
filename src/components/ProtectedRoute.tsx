import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";
import { ShieldAlert, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

/**
 * Frontend-only navigation-level protection for demo presentation purposes.
 * Does not provide cryptographically secure server authorization.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading, switchDemoRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-3" />
        <p className="text-xs font-semibold text-slate-600">Checking demo session access...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" state={{ from: location, openAuth: true }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const requiredRoleName =
      allowedRoles[0] === "admin"
        ? "Administrator"
        : allowedRoles[0] === "department"
        ? "Department Officer"
        : "Citizen";

    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl text-center">
        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Restricted Access Area
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
          This portal section requires <strong>{requiredRoleName}</strong> permissions. Your current active role is <strong className="uppercase">{user.role}</strong>.
        </p>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
          <div className="text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Hackathon Quick Demo Switcher
          </div>
          <p className="text-[11px] text-slate-500 mb-3">
            Since this is a demo environment, you can switch your active role instantly below to test this route:
          </p>
          <div className="flex gap-2">
            {allowedRoles.map((role) => (
              <button
                key={role}
                onClick={() => switchDemoRole(role)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Switch to {role.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
