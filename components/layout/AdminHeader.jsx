"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { Search, RefreshCw, Plus, Sparkles, ShieldAlert } from "lucide-react";

export default function AdminHeader({ onOpenCreateModal }) {
  const { activeTab, searchQuery, setSearchQuery, refreshAllData, loading } = useAdmin();

  const tabLabels = {
    dashboard: "Royal Atelier Dashboard & Analytics",
    banners: "Hero Section Banners Management",
    categories: "Heritage Art Categories",
    artworks: "Masterpiece Artworks Portfolio",
    "new-arrivals": "New Arrivals Showcase (Fresh from Ateliers)",
    achievements: "Cultural Milestones & Honor Dossiers",
    celebrities: "Paintings Sold to Celebrated Patrons",
    news: "Press Dispatches & Exhibition News",
    blogs: "Curated Journal & Heritage Essays",
    reviews: "Patron Reviews & Collector Testimonials",
    selections: "Patron Artwork Selections & WhatsApp Commissions",
    admins: "Admin Atelier Accounts & Roles",
    profile: "Admin Profile & Royal Atelier Details",
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "banners":
        return "+ Add Hero Banner";
      case "categories":
        return "+ Add Category";
      case "artworks":
      case "new-arrivals":
        return "+ Add Artwork";
      case "achievements":
        return "+ Add Achievement";
      case "celebrities":
        return "+ Add Celebrity Painting";
      case "news":
        return "+ Add News Article";
      case "blogs":
        return "+ Add Blog Essay";
      case "reviews":
        return "+ Add Patron Review";
      case "admins":
        return "+ Create New Admin";
      default:
        return null;
    }
  };

  const addText = getAddButtonText();

  return (
    <header className="h-20 bg-[#F4EFE6] border-b border-[#B89555]/30 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Active Tab Title */}
      <div>
        <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#682C2C] flex items-center gap-1.5 font-sans">
          <span className="w-4 h-px bg-[#682C2C]" />
          ADMINISTRATION CONSOLE
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#292522] leading-tight">
          {tabLabels[activeTab] || "Management Atelier"}
        </h2>
      </div>

      {/* Right: Search, Refresh, and Action Button */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
            className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-9 pr-4 py-2 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] transition-colors font-sans"
          />
          <Search className="w-4 h-4 text-[#B89555] absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Refresh Button */}
        <button
          onClick={refreshAllData}
          disabled={loading}
          title="Refresh All Records from Backend"
          className="p-2.5 rounded-sm bg-[#F8F4EA] border border-[#B89555]/40 hover:border-[#682C2C] text-[#292522] hover:text-[#682C2C] transition-colors cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#682C2C]" : ""}`} />
        </button>

        {/* Dynamic Add / Create Button */}
        {addText && (
          <button
            onClick={() => onOpenCreateModal && onOpenCreateModal(activeTab)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all font-sans cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#B89555]" />
            <span>{addText}</span>
          </button>
        )}
      </div>
    </header>
  );
}

