import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { DEMO_CREDENTIALS } from "../data/seedUsers";
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building2,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("Meerut");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMode(initialMode);
    setLoginError(null);
    setRegErrors({});
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    const success = await login(loginEmail, loginPassword);
    if (success) {
      onClose();
    } else {
      setLoginError("Invalid credentials. Try using one of the Quick Demo Account buttons below!");
    }
  };

  const handleDemoQuickLogin = async (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginError(null);
    const success = await login(email, pass);
    if (success) {
      onClose();
    }
  };

  const validateRegister = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!regName.trim()) errors.name = "Full name is required";
    if (!regEmail.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(regEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (!regPassword) {
      errors.password = "Password is required";
    } else if (regPassword.length < 6) {
      errors.password = "Password must be at least 6 characters for demo";
    }

    if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    const success = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      city: regCity,
      password: regPassword,
    });

    if (success) {
      onClose();
    } else {
      setRegErrors({ email: "An account with this email already exists." });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 text-teal-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> SevaFix Portal
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {mode === "login" ? "Welcome to SevaFix" : "Join SevaFix Community"}
          </h2>
          <p className="text-xs text-teal-100 mt-1">
            {mode === "login"
              ? "Sign in to report civic issues & discover public services"
              : "Create your citizen account to start transforming your city"}
          </p>
        </div>

        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors ${
              mode === "login"
                ? "text-teal-700 border-b-2 border-teal-600 bg-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors ${
              mode === "register"
                ? "text-teal-700 border-b-2 border-teal-600 bg-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {mode === "login" ? (
            <div>
              {loginError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. citizen@sevafix.demo"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Authenticating Demo Session...
                    </>
                  ) : (
                    "Sign In to SevaFix"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Access Accounts
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">1-Click Sign-in</span>
                </div>

                <div className="space-y-2">
                  {DEMO_CREDENTIALS.map((cred) => (
                    <button
                      key={cred.email}
                      type="button"
                      onClick={() => handleDemoQuickLogin(cred.email, cred.password)}
                      disabled={isLoading}
                      className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition-all group flex items-start justify-between"
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg text-white mt-0.5 ${
                            cred.user.role === "citizen"
                              ? "bg-teal-600"
                              : cred.user.role === "admin"
                              ? "bg-indigo-600"
                              : "bg-amber-600"
                          }`}
                        >
                          {cred.user.role === "citizen" ? (
                            <UserIcon className="w-3.5 h-3.5" />
                          ) : cred.user.role === "admin" ? (
                            <ShieldCheck className="w-3.5 h-3.5" />
                          ) : (
                            <Building2 className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                            {cred.label}
                          </div>
                          <div className="text-[11px] text-slate-500">{cred.description}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shrink-0">
                        {cred.user.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-hidden transition-all ${
                      regErrors.name ? "border-rose-400 bg-rose-50/30" : "border-slate-300 focus:ring-2 focus:ring-teal-500"
                    }`}
                  />
                </div>
                {regErrors.name && <p className="text-[11px] text-rose-500 mt-0.5">{regErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="rajesh@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-hidden transition-all ${
                      regErrors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-300 focus:ring-2 focus:ring-teal-500"
                    }`}
                  />
                </div>
                {regErrors.email && <p className="text-[11px] text-rose-500 mt-0.5">{regErrors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone (Optional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="+91 98765..."
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Meerut"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-hidden transition-all ${
                      regErrors.password ? "border-rose-400 bg-rose-50/30" : "border-slate-300 focus:ring-2 focus:ring-teal-500"
                    }`}
                  />
                </div>
                {regErrors.password && <p className="text-[11px] text-rose-500 mt-0.5">{regErrors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Repeat password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-hidden transition-all ${
                      regErrors.confirmPassword ? "border-rose-400 bg-rose-50/30" : "border-slate-300 focus:ring-2 focus:ring-teal-500"
                    }`}
                  />
                </div>
                {regErrors.confirmPassword && (
                  <p className="text-[11px] text-rose-500 mt-0.5">{regErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account & Continue"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-center text-[11px] text-slate-500">
          Session credentials persist in browser storage.
        </div>
      </div>
    </div>
  );
};
