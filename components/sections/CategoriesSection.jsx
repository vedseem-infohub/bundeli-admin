"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Edit2, Trash2, Layers, Plus, Sparkles } from "lucide-react";

export default function CategoriesSection({ onEdit, onAdd }) {
  const { categories, setCategories, addToast } = useAdmin();

  const handleDelete = async (cat) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;

    try {
      await api.deleteCategory(cat._id || cat.id);
      setCategories((prev) => prev.filter((c) => (c._id || c.id) !== (cat._id || cat.id)));
      addToast(`Category "${cat.name}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete category.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Heritage Art Categories ({categories.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Categories structure your gallery showcase, explore circular displays, and curatorial groupings.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat._id || cat.id || idx}
            className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
          >
            <div className="relative aspect-4/3 w-full bg-[#E9DFCD] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-xs shadow-xs">
                {cat.artworkCount || 0} Artworks
              </span>
              {cat.featured && (
                <span className="absolute top-2.5 right-2.5 bg-[#B89555] text-[#292522] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#B89555]">
                  /{cat.slug || "category"}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#292522] leading-snug">
                  {cat.name}
                </h4>
                <p className="text-xs text-[#292522]/70 font-sans line-clamp-2 leading-relaxed">
                  {cat.shortDescription || cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete Category"
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

