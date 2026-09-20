import React, { useState } from "react";
import { Lock, Send, UserCheck } from "lucide-react";
import type { ReportInternalNote, User } from "../../types";
import { canViewInternalNotes, canAddInternalNote } from "../../utils/permissions";

interface InternalNotesProps {
  notes?: ReportInternalNote[];
  currentUser: User | null;
  onAddNote: (text: string) => void;
}

export const InternalNotes: React.FC<InternalNotesProps> = ({
  notes = [],
  currentUser,
  onAddNote,
}) => {
  const [noteText, setNoteText] = useState("");

  if (!canViewInternalNotes(currentUser)) {
    return null; // Strictly hidden from citizen users
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(noteText.trim());
    setNoteText("");
  };

  return (
    <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200/70 dark:border-amber-900/40">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold">
          <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Internal Management Notes</span>
        </div>
        <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-medium px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
          Admin & Dept Only
        </span>
      </div>

      {notes.length === 0 ? (
        <p className="text-xs text-amber-700/70 dark:text-amber-400/60 italic py-2">
          No internal management notes recorded yet.
        </p>
      ) : (
        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-900/40 rounded-lg p-3 text-sm shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>{note.authorName}</span>
                  <span className="text-[10px] text-amber-700 bg-amber-100 dark:bg-amber-900/60 dark:text-amber-300 px-1.5 py-0.2 rounded font-mono uppercase">
                    {note.authorRole}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-slate-400">{note.createdAt}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {canAddInternalNote(currentUser) && (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add internal note for team (not visible to citizen)..."
            className="flex-1 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={!noteText.trim()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Note</span>
          </button>
        </form>
      )}
    </div>
  );
};
