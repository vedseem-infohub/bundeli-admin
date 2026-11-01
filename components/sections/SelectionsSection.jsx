"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import {
  BookmarkCheck,
  Phone,
  Mail,
  User,
  Clock,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function SelectionsSection() {
  const { selections, setSelections, addToast } = useAdmin();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSelections = selections.filter((sel) => {
    if (statusFilter !== "all" && sel.status !== statusFilter) return false;
    return true;
  });

  const handleUpdateStatus = async (selection, newStatus) => {
    try {
      await api.updateSelectionStatus(selection._id || selection.id, newStatus);
      setSelections((prev) =>
        prev.map((s) =>
          (s._id || s.id) === (selection._id || selection.id) ? { ...s, status: newStatus } : s
        )
      );
      addToast(`Status updated to "${newStatus}" for "${selection.artworkTitle}".`);
    } catch (err) {
      addToast(err?.message || "Failed to update status.", "error");
    }
  };

  const handleDelete = async (selection) => {
    if (
      !confirm(
        `Are you sure you want to remove selection record for "${selection.artworkTitle}"?`
      )
    )
      return;

    try {
      await api.deleteSelection(selection._id || selection.id);
      setSelections((prev) =>
        prev.filter((s) => (s._id || s.id) !== (selection._id || selection.id))
      );
      addToast("Selection record removed.");
    } catch (err) {
      addToast(err?.message || "Failed to remove record.", "error");
    }
  };

  const openWhatsAppToUser = (sel) => {
    const phone = sel.userPhone || (sel.user && sel.user.phone);
    if (!phone) {
      alert("No phone number recorded for this patron inquiry.");
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Pranam ${sel.userName || "Patron"},\n\nWe received your selection inquiry for "${sel.artworkTitle}" from Bundeli Kalavrat Atelier. How may our master artisans assist you with dimensions or custom wasli commission?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#0C381E] font-semibold flex items-center gap-1.5">
            <BookmarkCheck className="w-3.5 h-3.5 text-[#25D366]" />
            COMMISSION INQUIRIES & SELECTIONS
          </span>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Patron Artwork Selections ({selections.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Every time a customer or registered user selects an artwork for bespoke commission or WhatsApp discussion, their inquiry is tracked here in real time.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans text-[#292522] focus:outline-hidden focus:border-[#682C2C]"
          >
            <option value="all">All Inquiries ({selections.length})</option>
            <option value="Selected">Selected</option>
            <option value="Inquiry Sent">Inquiry Sent</option>
            <option value="WhatsApp Commission">WhatsApp Commission</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Selections List */}
      {filteredSelections.length === 0 ? (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 p-12 text-center rounded-sm space-y-3">
          <BookmarkCheck className="w-8 h-8 text-[#B89555] mx-auto" />
          <p className="font-serif text-lg text-[#292522]">No Patron Selections Found</p>
          <p className="text-xs text-[#72765A] font-sans max-w-md mx-auto">
            When users click &ldquo;Select Artwork&rdquo; or request commission on the public showcase, their artwork choices will be logged here with patron details.
          </p>
        </div>
      ) : (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm overflow-hidden shadow-art">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F4EFE6] border-b border-[#B89555]/20 text-[11px] uppercase tracking-wider text-[#682C2C] font-semibold">
                <tr>
                  <th className="py-3 px-4">Artwork</th>
                  <th className="py-3 px-4">Patron Details</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Commission Status</th>
                  <th className="py-3 px-4">Date Recorded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B89555]/15">
                {filteredSelections.map((sel, idx) => (
                  <tr key={sel._id || sel.id || idx} className="hover:bg-[#F8F4EA] transition-colors">
                    {/* Artwork info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {sel.artworkImage ? (
                          <img
                            src={sel.artworkImage}
                            alt={sel.artworkTitle}
                            className="w-12 h-12 object-cover rounded-sm border border-[#B89555]/30 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-sm bg-[#E9DFCD] flex items-center justify-center font-serif text-xs font-bold text-[#682C2C]">
                            BK
                          </div>
                        )}
                        <div>
                          <h4 className="font-serif font-bold text-[#292522] leading-tight line-clamp-1">
                            {sel.artworkTitle}
                          </h4>
                          <p className="text-[11px] text-[#72765A]">
                            {sel.category || "Traditional Paintings"}
                          </p>
                          {sel.customDimensions && (
                            <span className="text-[10px] text-[#682C2C] font-mono">
                              Custom: {sel.customDimensions}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Patron info */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-[#292522] flex items-center gap-1">
                          <User className="w-3 h-3 text-[#B89555]" />
                          <span>{sel.userName || "Guest Collector"}</span>
                        </p>
                        {sel.userPhone && (
                          <p className="text-[11px] text-[#72765A] flex items-center gap-1 font-mono">
                            <Phone className="w-2.5 h-2.5 text-[#B89555]" />
                            <span>{sel.userPhone}</span>
                          </p>
                        )}
                        {sel.userEmail && (
                          <p className="text-[11px] text-[#72765A] flex items-center gap-1">
                            <Mail className="w-2.5 h-2.5 text-[#B89555]" />
                            <span>{sel.userEmail}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Channel */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[10px] uppercase font-semibold bg-[#25D366]/15 text-[#0C381E] border border-[#25D366]/30">
                        {sel.channel || "WhatsApp"}
                      </span>
                    </td>

                    {/* Status dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={sel.status || "Selected"}
                        onChange={(e) => handleUpdateStatus(sel, e.target.value)}
                        className="bg-[#F8F4EA] border border-[#B89555]/30 rounded-xs px-2.5 py-1 text-xs font-sans text-[#292522] focus:outline-hidden focus:border-[#682C2C] cursor-pointer"
                      >
                        <option value="Selected">Selected</option>
                        <option value="Inquiry Sent">Inquiry Sent</option>
                        <option value="WhatsApp Commission">WhatsApp Commission</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#72765A] text-[11px]">
                      {new Date(sel.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {sel.userPhone && (
                          <button
                            onClick={() => openWhatsAppToUser(sel)}
                            className="p-1.5 rounded-sm bg-[#25D366]/20 hover:bg-[#25D366] text-[#0C381E] hover:text-white border border-[#25D366]/40 transition-colors cursor-pointer"
                            title="Message Patron on WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(sel)}
                          className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                          title="Delete selection record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

