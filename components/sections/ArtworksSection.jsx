"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import {
  Edit2,
  Trash2,
  Sparkles,
  Plus,
  Eye,
  Filter,
  Check,
  Star,
  ExternalLink,
} from "lucide-react";

export default function ArtworksSection({ onEdit, onAdd }) {
  const { artworks, setArtworks, addToast } = useAdmin();
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterNewOnly, setFilterNewOnly] = useState(false);

  const categoriesList = Array.from(new Set(artworks.map((a) => a.category).filter(Boolean)));

  const filteredArtworks = artworks.filter((art) => {
    if (filterNewOnly && !art.isNew) return false;
    if (filterCategory !== "all" && art.category !== filterCategory) return false;
    return true;
  });

  const handleToggleNewArrival = async (artwork) => {
    try {
      const updatedStatus = !artwork.isNew;
      await api.toggleNewArrival(artwork._id || artwork.id, updatedStatus);
      setArtworks((prev) =>
        prev.map((a) =>
          (a._id || a.id) === (artwork._id || artwork.id) ? { ...a, isNew: updatedStatus } : a
        )
      );
      addToast(
        `"${artwork.title}" marked as ${updatedStatus ? "New Arrival" : "Standard Showcase"}.`
      );
    } catch (err) {
      addToast(err?.message || "Failed to toggle status.", "error");
    }
  };

  const handleDelete = async (artwork) => {
    if (!confirm(`Are you sure you want to delete artwork "${artwork.title}"?`)) return;

    try {
      await api.deleteArtwork(artwork._id || artwork.id);
      setArtworks((prev) => prev.filter((a) => (a._id || a.id) !== (artwork._id || artwork.id)));
      addToast(`Artwork "${artwork.title}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete artwork.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Masterpiece Artworks Portfolio ({artworks.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Curate and manage your fine art catalog, Cloudinary photo galleries, wasli details, and WhatsApp commission items.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Artwork</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
        <button
          onClick={() => {
            setFilterCategory("all");
            setFilterNewOnly(false);
          }}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            filterCategory === "all" && !filterNewOnly
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          All ({artworks.length})
        </button>

        <button
          onClick={() => setFilterNewOnly(!filterNewOnly)}
          className={`px-3 py-1.5 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
            filterNewOnly
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#682C2C] hover:bg-[#E9DFCD]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
          <span>New Arrivals ({artworks.filter((a) => a.isNew).length})</span>
        </button>

        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              setFilterNewOnly(false);
            }}
            className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
              filterCategory === cat && !filterNewOnly
                ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtworks.map((art, idx) => {
          const mainImage =
            (art.images && art.images[0] && (typeof art.images[0] === "string" ? art.images[0] : art.images[0].url)) ||
            art.image ||
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";

          return (
            <div
              key={art._id || art.id || idx}
              className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/5 w-full bg-[#E9DFCD] overflow-hidden">
                <img
                  src={mainImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {art.isNew && (
                  <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                    New Arrival
                  </span>
                )}

                {art.isLimitedEdition && (
                  <span className="absolute top-2.5 right-2.5 bg-[#B89555] text-[#292522] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                    Limited Edition
                  </span>
                )}

                <div className="absolute bottom-2.5 left-2.5 bg-[#292522]/80 text-[#F8F4EA] text-[10px] font-mono px-2 py-0.5 rounded-xs">
                  {art.dimensions || '36" x 48"'}
                </div>
              </div>

              {/* Artwork Information */}
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
                  <p className="text-[11px] text-[#72765A] font-sans line-clamp-1">
                    {art.medium}
                  </p>
                </div>

                {/* Status Toggle & Actions */}
                <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleNewArrival(art)}
                    className={`inline-flex items-center gap-1 text-[11px] font-sans px-2 py-1 rounded-xs border transition-colors cursor-pointer ${
                      art.isNew
                        ? "bg-[#682C2C]/10 border-[#682C2C] text-[#682C2C] font-semibold"
                        : "border-[#B89555]/40 text-[#72765A] hover:text-[#292522]"
                    }`}
                    title="Toggle New Arrival badge"
                  >
                    <Sparkles className="w-3 h-3 text-[#B89555]" />
                    <span>{art.isNew ? "New Arrival" : "Mark New"}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(art)}
                      className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                      title="Edit artwork"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(art)}
                      className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                      title="Delete artwork"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

