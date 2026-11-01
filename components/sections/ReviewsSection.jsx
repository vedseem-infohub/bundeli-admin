"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Star, Edit2, Trash2, CheckCircle2, Plus, Sparkles, MapPin } from "lucide-react";

export default function ReviewsSection({ onEdit, onAdd }) {
  const { reviews, setReviews, addToast } = useAdmin();

  const handleToggleVerified = async (rev) => {
    try {
      const updatedVerified = !rev.verified;
      const formData = new FormData();
      formData.append("verified", updatedVerified);

      await api.updateReview(rev._id || rev.id, formData);
      setReviews((prev) =>
        prev.map((r) =>
          (r._id || r.id) === (rev._id || rev.id) ? { ...r, verified: updatedVerified } : r
        )
      );
      addToast(
        `Review by "${rev.name}" marked as ${updatedVerified ? "Verified Patron" : "Unverified"}.`
      );
    } catch (err) {
      addToast(err?.message || "Failed to update review status.", "error");
    }
  };

  const handleDelete = async (rev) => {
    if (!confirm(`Are you sure you want to delete review by "${rev.name}"?`)) return;

    try {
      await api.deleteReview(rev._id || rev.id);
      setReviews((prev) => prev.filter((r) => (r._id || r.id) !== (rev._id || rev.id)));
      addToast("Review deleted successfully.");
    } catch (err) {
      addToast(err?.message || "Failed to delete review.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Patron Reviews & Testimonials ({reviews.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Manage collector feedback, verified badges, and authentic testimonials displayed on the homepage review gallery.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Patron Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={rev._id || rev.id || idx}
            className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm p-6 shadow-art flex flex-col justify-between space-y-4 group transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#B89555]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (rev.rating || 5)
                          ? "fill-[#B89555] text-[#B89555]"
                          : "text-[#B89555]/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleToggleVerified(rev)}
                  className={`text-[10px] font-sans px-2 py-0.5 rounded-xs border cursor-pointer transition-colors ${
                    rev.verified
                      ? "bg-[#25D366]/20 text-[#0C381E] border-[#25D366]/40 font-semibold"
                      : "bg-[#292522]/10 text-[#72765A] border-dashed border-[#72765A]/40"
                  }`}
                  title="Click to toggle verified patron badge"
                >
                  {rev.verified ? "Verified Patron" : "Unverified"}
                </button>
              </div>

              <p className="text-xs text-[#292522]/85 font-sans italic leading-relaxed line-clamp-4">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {rev.artworkTitle && (
                <div className="inline-flex items-center gap-1 text-[11px] text-[#682C2C] bg-[#F4EFE6] px-2 py-0.5 rounded-xs border border-[#B89555]/20 font-sans">
                  <Sparkles className="w-3 h-3 text-[#B89555]" />
                  <span className="truncate max-w-[220px]">{rev.artworkTitle}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#292522] leading-tight">
                  {rev.name}
                </h4>
                <p className="text-[11px] text-[#72765A] font-sans flex items-center gap-1 mt-0.5">
                  {rev.location && (
                    <>
                      <MapPin className="w-2.5 h-2.5 text-[#B89555]" />
                      <span>{rev.location}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{rev.role || "Patron"}</span>
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(rev)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit review"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(rev)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete review"
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

