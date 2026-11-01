"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { BookOpen, Edit2, Trash2, Plus, Calendar, Clock, User } from "lucide-react";

export default function BlogsSection({ onEdit, onAdd }) {
  const { blogs, setBlogs, addToast } = useAdmin();

  const handleDelete = async (blog) => {
    if (!confirm(`Are you sure you want to delete blog essay "${blog.title}"?`)) return;

    try {
      await api.deleteBlog(blog._id || blog.id);
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== (blog._id || blog.id)));
      addToast(`Blog article "${blog.title}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete blog.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Curated Blog & Heritage Essays ({blogs.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            In-depth curatorial essays on palace fresco traditions, sacred Indian geometry, and living artisan workshops.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Blog Essay</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, idx) => (
          <div
            key={blog._id || blog.id || idx}
            className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm overflow-hidden shadow-art flex flex-col justify-between group transition-all"
          >
            <div className="relative aspect-16/10 w-full bg-[#E9DFCD] overflow-hidden">
              <img
                src={blog.coverImage || blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#682C2C] text-[#F8F4EA] text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                {blog.category || "Heritage & History"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] text-[#72765A] font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B89555]" />
                    {blog.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B89555]" />
                    {blog.readTime || "5 min read"}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#292522] leading-snug line-clamp-2">
                  {blog.title}
                </h4>

                <p className="text-xs text-[#292522]/70 font-sans line-clamp-2">
                  {blog.summary}
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs font-serif text-[#682C2C]">
                  <User className="w-3.5 h-3.5 text-[#B89555]" />
                  <span>{blog.author}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(blog)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit essay"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(blog)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete essay"
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

