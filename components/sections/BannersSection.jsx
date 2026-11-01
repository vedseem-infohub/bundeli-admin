"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Edit2, Trash2, CheckCircle2, Eye, EyeOff, Plus, ExternalLink } from "lucide-react";

export default function BannersSection({ onEdit, onAdd }) {
  const { banners, setBanners, addToast } = useAdmin();

  const handleToggleActive = async (banner) => {
    try {
      const updatedActive = !banner.isActive;
      const formData = new FormData();
      formData.append("isActive", updatedActive);

      await api.updateBanner(banner._id || banner.id, formData);
      setBanners((prev) =>
        prev.map((b) =>
          (b._id || b.id) === (banner._id || banner.id) ? { ...b, isActive: updatedActive } : b
        )
      );
      addToast(
        `Banner "${banner.title || "Hero Banner"}" ${updatedActive ? "activated" : "deactivated"}.`
      );
    } catch (err) {
      addToast(err?.message || "Failed to update banner status.", "error");
    }
  };

  const handleDelete = async (banner) => {
    if (!confirm(`Are you sure you want to delete banner "${banner.title || "Poster"}"?`)) return;

    try {
      await api.deleteBanner(banner._id || banner.id);
      setBanners((prev) => prev.filter((b) => (b._id || b.id) !== (banner._id || banner.id)));
      addToast("Hero banner deleted successfully.");
    } catch (err) {
      addToast(err?.message || "Failed to delete banner.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Hero Posters & Banners ({banners.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Hero posters rotate automatically on the homepage showcase with Cloudinary optimization.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Hero Banner</span>
        </button>
      </div>

      {/* Grid of Banners */}
      {banners.length === 0 ? (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 p-12 text-center rounded-sm space-y-3">
          <p className="font-serif text-lg text-[#292522]">No Hero Posters Created Yet</p>
          <p className="text-xs text-[#72765A] font-sans max-w-md mx-auto">
            Upload your first high-resolution palace fresco or cultural poster banner to display on the hero section.
          </p>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-wider rounded-sm cursor-pointer"
          >
            Upload Banner Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, idx) => (
            <div
              key={banner._id || banner.id || idx}
              className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-16/9 w-full bg-[#E9DFCD] overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-2.5 left-2.5 text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs ${
                    banner.isActive !== false
                      ? "bg-[#25D366] text-[#0C381E]"
                      : "bg-[#292522]/80 text-[#F8F4EA]"
                  }`}
                >
                  {banner.isActive !== false ? "Active in Rotation" : "Paused"}
                </span>

                <span className="absolute top-2.5 right-2.5 bg-[#292522]/80 text-[#B89555] text-[10px] font-mono px-2 py-0.5 rounded-xs">
                  Order: {banner.order || 0}
                </span>
              </div>

              {/* Banner Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-[#292522] leading-snug line-clamp-1">
                    {banner.title || "Untitled Cultural Banner"}
                  </h4>
                  {banner.subtitle && (
                    <p className="text-xs text-[#72765A] font-sans line-clamp-1">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.link && (
                    <p className="text-[11px] text-[#B89555] font-sans flex items-center gap-1 mt-1 truncate">
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span>{banner.link}</span>
                    </p>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans text-[#72765A] hover:text-[#292522] cursor-pointer"
                  >
                    {banner.isActive !== false ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-[#682C2C]" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(banner)}
                      className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                      title="Edit banner"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner)}
                      className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                      title="Delete banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

