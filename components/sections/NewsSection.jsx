"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Newspaper, Edit2, Trash2, Plus, Calendar, Clock, ExternalLink } from "lucide-react";

export default function NewsSection({ onEdit, onAdd }) {
  const { news, setNews, addToast } = useAdmin();

  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete news dispatch "${item.title}"?`)) return;

    try {
      await api.deleteNews(item._id || item.id);
      setNews((prev) => prev.filter((n) => (n._id || n.id) !== (item._id || item.id)));
      addToast(`News dispatch "${item.title}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete news dispatch.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            News & Press Dispatches ({news.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Curate government honors, art fair exhibitions, and architectural magazine citations.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add News Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div
            key={item._id || item.id || idx}
            className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
          >
            <div className="relative aspect-16/10 w-full bg-[#E9DFCD] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                {item.badge || "PRESS & MEDIA"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-[#72765A] font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B89555]" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span>{item.outlet}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#292522] leading-snug line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-xs text-[#292522]/70 font-sans line-clamp-2">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit news"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete news"
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

