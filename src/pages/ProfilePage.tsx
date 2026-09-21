import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Building2,
  ShieldCheck,
  Edit2,
  Save,
  X,
  Info,
  CheckCircle2,
} from "lucide-react";

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || "",
    city: user.city || "",
    avatar: user.avatar || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      avatar: formData.avatar,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone || "",
      city: user.city || "",
      avatar: user.avatar || "",
    });
    setIsEditing(false);
  };

  const roleLabel =
    user.role === "admin"
      ? "Administrator"
      : user.role === "department"
      ? "Department Officer"
      : "Citizen";

  const roleBadgeStyle =
    user.role === "admin"
      ? "bg-indigo-100 text-indigo-800 border-indigo-200"
      : user.role === "department"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-teal-100 text-teal-800 border-teal-200";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
              User Account & Roles
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Profile & Account</h1>
          <p className="text-xs text-slate-500">Manage your SevaFix account settings and active demo role</p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully in LocalStorage.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
            />
            <span
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                user.role === "admin"
                  ? "bg-indigo-600"
                  : user.role === "department"
                  ? "bg-amber-600"
                  : "bg-teal-600"
              }`}
              title={`Active role: ${roleLabel}`}
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${roleBadgeStyle}`}>
            {roleLabel}
          </div>

          {user.department && (
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-full flex items-center justify-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{user.department}</span>
            </div>
          )}

          <div className="w-full pt-4 border-t border-slate-100 text-slate-500 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span>Account ID:</span>
              <span className="font-mono text-slate-700">{user.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Member Since:</span>
              <span className="text-slate-700">{user.joinedAt}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Personal Details & Preferences
            </h3>
            <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
              <Info className="w-3 h-3" /> Demo Mode
            </span>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-hidden font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">Email Address (Read-only)</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-1 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">Phone Number</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{user.phone || "Not specified"}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">City / Jurisdiction</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{user.city || "Meerut"}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-medium block">Assigned Account Role</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{roleLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
