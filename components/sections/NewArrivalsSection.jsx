"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Sparkles, Plus, Edit2, Trash2, XCircle } from "lucide-react";

export default function NewArrivalsSection({ onEdit, onAdd }) {
  const { artworks, setArtworks, addToast } = useAdmin();

  const newArrivalsList = artworks.filter((a) => a.isNew);

  const handleRemoveFromNewArrivals = async (artwork) => {
    try {
      await api.toggleNewArrival(artwork._id || artwork.id, false);
      setArtworks((prev) =>
        prev.map((a) =>
          (a._id || a.id) === (artwork._id || artwork.id) ? { ...a, isNew: false } : a
        )
      );
      addToast(`"${artwork.title}" removed from New Arrivals.`);
    } catch (err) {
      addToast(err?.message || "Failed to update status.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#682C2C] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
            FRESH FROM REGIONAL ATELIERS
          </span>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            New Arrivals Showcase ({newArrivalsList.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            These artworks are currently displayed in the horizontal scroll showcase immediately following Explore Masterpieces on the homepage.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add New Arrival</span>
        </button>
      </div>

      {newArrivalsList.length === 0 ? (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 p-12 text-center rounded-sm space-y-3">
          <Sparkles className="w-8 h-8 text-[#B89555] mx-auto" />
          <p className="font-serif text-lg text-[#292522]">No Active New Arrivals</p>
          <p className="text-xs text-[#72765A] font-sans max-w-md mx-auto">
            You can either add a new artwork or go to the Artworks tab and check &ldquo;Mark New&rdquo; on any existing creation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivalsList.map((art, idx) => {
            const mainImage =
              (art.images && art.images[0] && (typeof art.images[0] === "string" ? art.images[0] : art.images[0].url)) ||
              art.image;

            return (
              <div
                key={art._id || art.id || idx}
                className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
              >
                <div className="relative aspect-4/5 w-full bg-[#E9DFCD] overflow-hidden">
                  <img
                    src={mainImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-xs shadow-xs">
                    New Arrival
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-[#B89555] font-sans">
                      {art.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#292522] leading-snug line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#682C2C] font-serif font-medium">
                      By {art.artist}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between">
                    <button
                      onClick={() => handleRemoveFromNewArrivals(art)}
                      className="inline-flex items-center gap-1 text-[11px] font-sans text-red-700 hover:text-red-900 cursor-pointer"
                      title="Remove from New Arrivals showcase"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Remove Badge</span>
                    </button>

                    <button
                      onClick={() => onEdit(art)}
                      className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                      title="Edit artwork"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

