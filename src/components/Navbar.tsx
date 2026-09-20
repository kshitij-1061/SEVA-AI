import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Building2,
  FileText,
  Map,
  BarChart2,
  Search,
  PlusCircle,
  Home,
  MessageSquareCode,
} from "lucide-react";

interface NavbarProps {
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = user?.role || "citizen";

  const getNavItems = () => {
    const basePublic = [
      { name: "Home", path: "/", icon: Home },
      { name: "✨ SevaAI", path: "/ai", icon: MessageSquareCode },
      { name: "Report Issue", path: "/report-issue", icon: PlusCircle },
      { name: "Find Services", path: "/services", icon: Search },
      { name: "Civic Map", path: "/map", icon: Map },
      { name: "Impact & Analytics", path: "/impact", icon: BarChart2 },
    ];

    if (role === "admin") {
      return [
        ...basePublic,
        { name: "Admin Portal", path: "/admin", icon: ShieldCheck },
      ];
    }

    if (role === "department") {
      return [
        ...basePublic,
        { name: "Department Portal", path: "/department", icon: Building2 },
      ];
    }

    return [
      ...basePublic,
      { name: "My Reports", path: "/my-reports", icon: FileText },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const roleBadgeConfig = {
    citizen: { label: "Citizen", bg: "bg-teal-100 text-teal-800 border-teal-200" },
    admin: { label: "Administrator", bg: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    department: { label: "Department Officer", bg: "bg-amber-100 text-amber-800 border-amber-200" },
  };

  const badge = roleBadgeConfig[role] || roleBadgeConfig.citizen;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                    Seva<span className="text-teal-600">Fix</span>
                  </span>
                  <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200 uppercase tracking-wider flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Civic & Public Assistance
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-teal-50 text-teal-700 font-semibold shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-teal-600" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-800 leading-tight">
                      {user.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border inline-block ${badge.bg}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-all shadow-xs"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {isAuthenticated && user && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500">{user.email}</div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border inline-block mt-0.5 ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-teal-600 font-semibold hover:underline"
              >
                Profile
              </Link>
            </div>
          )}

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700 font-bold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {!isAuthenticated && (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth("login");
                }}
                className="w-full py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth("register");
                }}
                className="w-full py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg"
              >
                Register
              </button>
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full mt-2 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};
