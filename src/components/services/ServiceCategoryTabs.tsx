import React from "react";
import { useServices } from "../../context/ServiceContext";

export const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Categories", value: "All" },
  { label: "Education", value: "Education" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Employment", value: "Employment" },
  { label: "Financial Assistance", value: "Financial Assistance" },
  { label: "Housing", value: "Housing" },
  { label: "Food & Welfare", value: "Food & Welfare" },
  { label: "Documents & Certificates", value: "Documents & Certificates" },
  { label: "Women & Child", value: "Women & Child Services" },
  { label: "Senior Citizens", value: "Senior Citizen Services" },
  { label: "Other Services", value: "Other" },
];

export const ServiceCategoryTabs: React.FC = () => {
  const { selectedCategory, performSearch, searchQuery } = useServices();

  const handleSelect = (catValue: string) => {
    performSearch(searchQuery, catValue);
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {CATEGORIES.map((cat) => {
        const active = selectedCategory.toLowerCase() === cat.value.toLowerCase();
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => handleSelect(cat.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              active
                ? "bg-teal-600 text-white border-teal-600 shadow-2xs"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
