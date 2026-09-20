import React from "react";
import { useAuth } from "../context/AuthContext";
import { Sparkles, X } from "lucide-react";

export const ToastNotification: React.FC = () => {
  const { toast, setToast } = useAuth();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 text-xs max-w-md">
        <div className="p-1 bg-teal-500/20 text-teal-400 rounded-lg shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <p className="flex-1 font-medium">{toast}</p>
        <button
          onClick={() => setToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
