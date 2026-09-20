import React from "react";
import { Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-4 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 font-black text-lg flex items-center justify-center">
              S
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              Seva<span className="text-teal-400">Fix</span>
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            AI-powered civic issue reporting and public service discovery platform empowering citizens and local authorities.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-teal-400 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>AI-Powered Civic & Public Assistance Platform</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
            Core Platform
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link to="/ai" className="hover:text-teal-400 transition-colors">SevaAI Natural Assistant</Link></li>
            <li><Link to="/report-issue" className="hover:text-teal-400 transition-colors">Report Civic Complaint</Link></li>
            <li><Link to="/services" className="hover:text-teal-400 transition-colors">Public Scheme Finder</Link></li>
            <li><Link to="/map" className="hover:text-teal-400 transition-colors">Interactive Civic Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
            Role Portals
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link to="/my-reports" className="hover:text-teal-400 transition-colors">Citizen Report Tracker</Link></li>
            <li><Link to="/admin" className="hover:text-teal-400 transition-colors">Administrator Portal</Link></li>
            <li><Link to="/department" className="hover:text-teal-400 transition-colors">Department Officer Portal</Link></li>
            <li><Link to="/impact" className="hover:text-teal-400 transition-colors">Impact Analytics Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-3">
            System Accounts
          </h4>
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-[10px] space-y-1.5">
            <div><strong className="text-teal-300">Citizen Account:</strong> citizen@sevafix.demo</div>
            <div><strong className="text-indigo-300">Admin Account:</strong> admin@sevafix.demo</div>
            <div><strong className="text-amber-300">Officer Account:</strong> officer@sevafix.demo</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
        <p>© 2026 SevaFix Platform. Built with AI & Civic Technology.</p>
        <div className="flex items-center gap-1 text-slate-500">
          <Shield className="w-3.5 h-3.5 text-teal-400" />
          <span>Secure Platform Authentication</span>
        </div>
      </div>
    </footer>
  );
};
