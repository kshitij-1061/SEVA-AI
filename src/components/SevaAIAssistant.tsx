import React, { useState, useRef, useEffect } from "react";
import { useSevaAI } from "../context/SevaAIContext";
import { useAuth } from "../context/AuthContext";
import type { SevaAIResult, SevaAIAction } from "../types";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Send,
  Trash2,
  ArrowRight,
  Search,
  PlusCircle,
  FileCheck2,
  Bot,
  User as UserIcon,
  Loader2,
  CheckCircle2,
  Layers,
  Globe,
  Tag,
} from "lucide-react";

export const SevaAIAssistant: React.FC = () => {
  const { messages, isProcessing, sendMessage, clearConversation } = useSevaAI();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    const text = inputText;
    setInputText("");
    sendMessage(text);
  };

  const handleExampleClick = (prompt: string) => {
    setInputText(prompt);
    sendMessage(prompt);
  };

  const handleActionClick = (action: SevaAIAction, result?: SevaAIResult) => {
    if (action.route) {
      navigate(action.route, { state: { aiResult: result } });
    }
  };

  const samplePrompts = [
    {
      title: "Civic Complaint",
      text: "There is a large pothole outside my college and bikes are having difficulty passing.",
      badge: "Roads",
    },
    {
      title: "Multi-Issue",
      text: "There is a huge pothole outside my college, garbage has been dumped beside it, and the streetlight is also broken.",
      badge: "Multi",
    },
    {
      title: "Public Scheme",
      text: "I need financial assistance for my daughter's education.",
      badge: "Services",
    },
    {
      title: "Hinglish Complaint",
      text: "Mere ghar ke paas streetlight kharab hai, gully me andhera hai.",
      badge: "Hinglish",
    },
    {
      title: "Urgent Hazard",
      text: "Live electrical wire is hanging dangerously across the road!",
      badge: "Urgent",
    },
    {
      title: "Track Complaint",
      text: "What is the status of my complaint SF-1024?",
      badge: "Tracking",
    },
  ];

  return (
    <div className="flex flex-col h-[750px] max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 p-4 sm:p-5 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg text-slate-950 font-black">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">SevaAI</h2>
              <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Demo AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-300 font-light">
              Your Intelligent AI Citizen Action Router & Assistance Engine
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearConversation}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors text-xs flex items-center gap-1"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-6 text-center py-6">
            <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto text-teal-600 border border-teal-100 shadow-xs">
              <Bot className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Hi{user ? ` ${user.name.split(" ")[0]}` : ""}! I'm SevaAI.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Tell me what you need in plain English, Hindi, or Hinglish. I will classify your request and guide you to the right action.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-left shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> What SevaAI can do for you:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                  <PlusCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Report potholes, garbage, streetlights</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                  <Search className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Discover scholarships & health schemes</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                  <FileCheck2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Track status of submitted reports</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                  <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Split composite multi-issue prompts</span>
                </div>
              </div>
            </div>

            {/* Interactive Example Chips */}
            <div className="space-y-2 text-left">
              <div className="text-xs font-bold text-slate-700">Try one-click demo examples:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(sample.text)}
                    disabled={isProcessing}
                    className="p-3 bg-white hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 rounded-xl transition-all text-left group shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-teal-700">
                        {sample.title}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border">
                        {sample.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic line-clamp-2">
                      “{sample.text}”
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-teal-700 text-white shadow-md rounded-tr-none font-medium"
                    : "bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none space-y-3"
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-70 mb-1">
                  <span className="font-semibold">{msg.role === "user" ? "You" : "SevaAI"}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Structured AI Analysis Card */}
                {msg.aiResult && (
                  <AIResultCard result={msg.aiResult} onActionClick={handleActionClick} />
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm font-bold text-xs">
                  {user ? user.name[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
                </div>
              )}
            </div>
          ))
        )}

        {isProcessing && (
          <div className="flex gap-3 items-center text-slate-500 text-xs py-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
              <span>SevaAI is classifying request intent & routing action...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Describe your problem or requirement... (e.g. Pothole outside college, financial aid for school)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <span>Analyze</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

/* ==========================================================================
   Sub-component: Structured AI Result Card
   ========================================================================== */

interface AIResultCardProps {
  result: SevaAIResult;
  onActionClick: (action: SevaAIAction, result?: SevaAIResult) => void;
}

const AIResultCard: React.FC<AIResultCardProps> = ({ result, onActionClick }) => {
  const intentBadges: { [key: string]: { label: string; bg: string } } = {
    report_issue: { label: "Report Civic Issue", bg: "bg-teal-100 text-teal-800 border-teal-200" },
    find_service: { label: "Find Public Service", bg: "bg-amber-100 text-amber-800 border-amber-200" },
    track_report: { label: "Track Report", bg: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    emergency_guidance: { label: "Urgent Hazard", bg: "bg-rose-100 text-rose-800 border-rose-200" },
    multi_issue: { label: "Multi-Issue Detected", bg: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    general_help: { label: "General Assistance", bg: "bg-slate-100 text-slate-800 border-slate-200" },
  };

  const badge = intentBadges[result.intent] || intentBadges.general_help;

  const priorityColors = {
    low: "bg-slate-100 text-slate-700 border-slate-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-amber-100 text-amber-800 border-amber-200",
    urgent: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className="mt-3 p-4 bg-slate-50/90 rounded-xl border border-slate-200 shadow-2xs space-y-3">
      {/* Top Intent Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200/80 pb-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" />
            Lang: <strong className="capitalize">{result.detectedLanguage}</strong>
          </span>
        </div>
        <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
          Confidence: Math.round({Math.round(result.confidence * 100)}%)
        </span>
      </div>

      {/* Structured Details Grid */}
      {result.intent !== "general_help" && (
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {result.category && (
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">Category</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Tag className="w-3 h-3 text-teal-600" />
                {result.category}
              </span>
            </div>
          )}

          {result.issueType && (
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">Issue Type</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{result.issueType}</span>
            </div>
          )}

          {result.entities?.serviceType && (
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">Service Need</span>
              <span className="font-bold text-amber-800 mt-0.5 block">{result.entities.serviceType}</span>
            </div>
          )}

          {result.priority && (
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">Suggested Priority</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border inline-block mt-0.5 ${priorityColors[result.priority]}`}>
                {result.priority.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Sub-Issues Breakdown for Multi-Issue */}
      {result.subIssues && result.subIssues.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-slate-200">
          <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Detected Sub-Issues ({result.subIssues.length}):
          </div>
          <div className="space-y-1.5">
            {result.subIssues.map((sub, idx) => (
              <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-800">{sub.category}</span>
                  <span className="text-[10px] text-slate-500 block">{sub.issueType}</span>
                </div>
                {sub.priority && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase border ${priorityColors[sub.priority]}`}>
                    {sub.priority}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Router Buttons */}
      <div className="pt-2 border-t border-slate-200 space-y-1.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Suggested Action Router
        </div>
        <div className="flex flex-col gap-1.5">
          {result.actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => onActionClick(act, result)}
              className="w-full text-left p-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl transition-all shadow-xs flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                  {act.label}
                </div>
                <div className="text-[10px] text-teal-100 font-light">{act.description}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-200 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
