import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useServices } from "../../context/ServiceContext";

interface SavedServiceButtonProps {
  serviceId: string;
  variant?: "icon" | "button";
}

export const SavedServiceButton: React.FC<SavedServiceButtonProps> = ({
  serviceId,
  variant = "icon",
}) => {
  const { isServiceSaved, toggleSaveService } = useServices();
  const saved = isServiceSaved(serviceId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveService(serviceId);
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
          saved
            ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
        }`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Saved in Bookmarks</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Save Service</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={saved ? "Remove from bookmarks" : "Save service to bookmarks"}
      className={`p-2 rounded-xl transition-all border ${
        saved
          ? "bg-amber-50 text-amber-600 border-amber-200"
          : "bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 border-slate-200"
      }`}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4 fill-amber-500" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
};
