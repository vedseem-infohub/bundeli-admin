"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import {
  UserCheck,
  Edit2,
  Trash2,
  Plus,
  MapPin,
  Award,
  Palette,
  ExternalLink,
  Search,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ArtistsSection({ onEdit, onAdd }) {
  const { artists, setArtists, addToast } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState(false);

  const handleDelete = async (artist) => {
    const artistId = artist._id || artist.id;
    if (!confirm(`Are you sure you want to delete artist profile "${artist.name}"?`)) {
      return;
    }

    try {
      await api.deleteArtist(artistId);
      setArtists((prev) => prev.filter((a) => (a._id || a.id) !== artistId));
      addToast(`Artist profile "${artist.name}" deleted successfully.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete artist profile.", "error");
    }
  };

  const handleToggleFeatured = async (artist) => {
    const artistId = artist._id || artist.id;
    const newFeatured = !artist.featured;

    try {
      const payload = new FormData();
      payload.append("featured", newFeatured);

      const res = await api.updateArtist(artistId, payload);
      setArtists((prev) =>
        prev.map((a) => ((a._id || a.id) === artistId ? res.data : a))
      );
      addToast(
        `Artist "${artist.name}" ${newFeatured ? "marked as Featured" : "removed from Featured"}.`
      );
    } catch (err) {
      addToast(err?.message || "Failed to update featured status.", "error");
    }
  };

  const filteredArtists = artists.filter((artist) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (artist.name || "").toLowerCase().includes(term) ||
      (artist.role || "").toLowerCase().includes(term) ||
      (artist.location || "").toLowerCase().includes(term) ||
      (artist.style || "").toLowerCase().includes(term);

    const matchesRegion =
      selectedRegion === "all" || artist.region === selectedRegion;

    const matchesFeatured = filterFeatured ? Boolean(artist.featured) : true;

    return matchesSearch && matchesRegion && matchesFeatured;
  });

  const totalCount = artists.length;
  const featuredCount = artists.filter((a) => a.featured).length;
  const bundelkhandCount = artists.filter((a) =>
    (a.region || "").toLowerCase().includes("bundelkhand")
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#682C2C] font-semibold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#B89555]" />
            HEREDITARY GUILDS & LIVING MASTERS
          </span>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Master Artists & Guild Custodians ({totalCount})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Add, edit, and curate traditional fresco painters, lost-wax bronze sculptors, and folk muralists.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Master Artist</span>
        </button>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans text-[#72765A] uppercase tracking-wider">
              Total Guild Masters
            </span>
            <p className="font-serif text-2xl font-bold text-[#292522]">{totalCount}</p>
          </div>
          <Palette className="w-6 h-6 text-[#682C2C]/50" />
        </div>

        <div className="p-4 bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans text-[#72765A] uppercase tracking-wider">
              Featured Masters
            </span>
            <p className="font-serif text-2xl font-bold text-[#B89555]">{featuredCount}</p>
          </div>
          <Sparkles className="w-6 h-6 text-[#B89555]" />
        </div>

        <div className="p-4 bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans text-[#72765A] uppercase tracking-wider">
              Bundelkhand Heritage Lineages
            </span>
            <p className="font-serif text-2xl font-bold text-[#682C2C]">{bundelkhandCount}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-[#682C2C]" />
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B89555] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by artist name, style, town..."
            className="w-full pl-9 pr-3 py-2 bg-[#F8F4EA] border border-[#B89555]/30 text-xs text-[#292522] rounded-xs focus:outline-hidden focus:border-[#682C2C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <span className="text-xs text-[#72765A] font-sans">Region:</span>
          {["all", "Bundelkhand", "Central India"].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 text-xs rounded-xs font-sans transition-colors cursor-pointer capitalize ${
                selectedRegion === reg
                  ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
                  : "bg-[#F8F4EA] text-[#292522] border border-[#B89555]/30 hover:border-[#682C2C]"
              }`}
            >
              {reg === "all" ? "All Regions" : reg}
            </button>
          ))}

          <button
            onClick={() => setFilterFeatured((prev) => !prev)}
            className={`px-3 py-1 text-xs rounded-xs font-sans transition-colors cursor-pointer flex items-center gap-1 ${
              filterFeatured
                ? "bg-[#B89555] text-[#292522] font-bold"
                : "bg-[#F8F4EA] text-[#292522] border border-[#B89555]/30 hover:border-[#B89555]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Featured Only</span>
          </button>
        </div>
      </div>

      {/* Artists Cards Grid */}
      {filteredArtists.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF7F0] border border-[#B89555]/20 rounded-sm">
          <UserCheck className="w-10 h-10 text-[#B89555]/40 mx-auto mb-2" />
          <h4 className="font-serif text-lg font-bold text-[#292522]">No Artist Profiles Found</h4>
          <p className="text-xs text-[#72765A] font-sans mt-1">
            Try adjusting your search query or add a new master artist above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => {
            const artistId = artist._id || artist.id;
            return (
              <div
                key={artistId}
                className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
              >
                {/* Artist Studio Cover Backdrop */}
                <div className="relative h-32 w-full bg-[#292522] overflow-hidden">
                  <img
                    src={
                      artist.coverImage ||
                      artist.avatar ||
                      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={artist.name}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/90 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                      {artist.region || "Bundelkhand"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(artist)}
                      className={`text-[10px] font-sans uppercase font-semibold px-2 py-0.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                        artist.featured
                          ? "bg-[#B89555] text-[#292522]"
                          : "bg-[#292522]/70 text-[#F8F4EA]/80 hover:bg-[#B89555] hover:text-[#292522]"
                      }`}
                      title="Click to toggle featured status"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{artist.featured ? "Featured" : "Regular"}</span>
                    </button>
                  </div>
                </div>

                {/* Portrait Avatar Overlap */}
                <div className="px-5 pt-0 pb-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-end justify-between -mt-10 mb-3">
                      <img
                        src={
                          artist.avatar ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                        }
                        alt={artist.name}
                        className="w-20 h-20 rounded-full object-cover border-3 border-[#FAF7F0] shadow-md bg-[#FAF7F0]"
                      />
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-[#72765A]">
                          slug: /{artist.slug}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-bold text-[#292522] leading-snug">
                        {artist.name}
                      </h4>
                      <p className="text-xs text-[#B89555] font-sans font-semibold">
                        {artist.role || "Master Artisan"}
                      </p>
                      {artist.location && (
                        <p className="text-[11px] text-[#72765A] font-sans flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B89555]" />
                          <span>{artist.location}</span>
                        </p>
                      )}
                    </div>

                    {/* Style and Metrics */}
                    <div className="mt-3 pt-3 border-t border-[#B89555]/15 space-y-2">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-[#72765A]">Artistic Lineage:</span>
                        <span className="font-semibold text-[#292522] text-right line-clamp-1 max-w-[170px]">
                          {artist.style || "Bundelkhand Traditional"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center pt-1">
                        <div className="p-1.5 bg-[#F8F4EA] rounded-xs border border-[#B89555]/20">
                          <span className="text-[10px] uppercase font-sans text-[#72765A] block">
                            Experience
                          </span>
                          <span className="text-xs font-serif font-bold text-[#682C2C]">
                            {artist.experienceYears || 15}+ Years
                          </span>
                        </div>
                        <div className="p-1.5 bg-[#F8F4EA] rounded-xs border border-[#B89555]/20">
                          <span className="text-[10px] uppercase font-sans text-[#72765A] block">
                            Artworks
                          </span>
                          <span className="text-xs font-serif font-bold text-[#682C2C]">
                            {artist.artworkCount || 0} Pieces
                          </span>
                        </div>
                      </div>

                      {artist.shortBio && (
                        <p className="text-[11px] text-[#292522]/75 font-sans line-clamp-2 pt-1 leading-relaxed">
                          {artist.shortBio}
                        </p>
                      )}

                      {artist.awards && artist.awards.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-[#B89555] font-sans pt-1">
                          <Award className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">
                            {Array.isArray(artist.awards)
                              ? artist.awards[0]
                              : artist.awards}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between">
                    <a
                      href={`http://localhost:3000/artists/${artist.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#682C2C] hover:text-[#522222] font-semibold font-sans transition-colors"
                      title="View artist public page on live website"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Live</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(artist)}
                        className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                        title="Edit Artist Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#682C2C]" />
                      </button>
                      <button
                        onClick={() => handleDelete(artist)}
                        className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer"
                        title="Delete Artist Profile"
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
      )}
    </div>
  );
}

