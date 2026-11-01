"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Crown, Edit2, Trash2, Plus, Quote, MapPin } from "lucide-react";

export default function CelebritySection({ onEdit, onAdd }) {
  const { celebrities, setCelebrities, addToast } = useAdmin();

  const handleDelete = async (item) => {
    if (
      !confirm(
        `Are you sure you want to delete acquisition record for "${item.celebrityName}"?`
      )
    )
      return;

    try {
      await api.deleteCelebrityPainting(item._id || item.id);
      setCelebrities((prev) => prev.filter((c) => (c._id || c.id) !== (item._id || item.id)));
      addToast(`Acquisition record for "${item.celebrityName}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete record.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#682C2C] font-semibold flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#B89555]" />
            ROYAL PATRONS & CINEMA ICONS
          </span>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Paintings Sold to Celebrated Patrons ({celebrities.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Manage provenance records, living estate acquisitions, and testimonials from celebrated connoisseurs.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Celebrity Patron Record</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {celebrities.map((celeb, idx) => (
          <div
            key={celeb._id || celeb.id || idx}
            className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
          >
            <div className="relative aspect-16/10 w-full bg-[#E9DFCD] overflow-hidden">
              <img
                src={celeb.image}
                alt={celeb.artworkTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                {celeb.tag || "Royal Acquisition"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-[#292522] leading-snug">
                  {celeb.celebrityName}
                </h4>
                <p className="text-xs text-[#B89555] font-sans font-semibold">
                  {celeb.celebrityTitle}
                </p>
                {celeb.location && (
                  <p className="text-[11px] text-[#72765A] font-sans flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B89555]" />
                    <span>{celeb.location}</span>
                  </p>
                )}
                <div className="pt-1.5">
                  <span className="text-[11px] text-[#292522]/60 font-sans block">Acquired Piece:</span>
                  <p className="text-xs font-serif font-bold text-[#682C2C]">
                    {celeb.artworkTitle}
                  </p>
                </div>
                {celeb.quote && (
                  <p className="text-xs text-[#292522]/80 font-sans italic line-clamp-3 pt-1 border-t border-[#B89555]/15 mt-2">
                    &ldquo;{celeb.quote}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(celeb)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit record"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(celeb)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

