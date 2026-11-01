"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import { Trophy, Award, Users, Globe, ShieldCheck, Landmark, Edit2, Trash2, Plus } from "lucide-react";

export default function AchievementsSection({ onEdit, onAdd }) {
  const { achievements, setAchievements, addToast } = useAdmin();

  const iconMap = {
    Award,
    Trophy,
    Users,
    Globe,
    ShieldCheck,
    Landmark,
  };

  const handleDelete = async (item) => {
    if (!confirm(`Are you sure you want to delete achievement "${item.title || item.label || "Record"}"?`))
      return;

    try {
      await api.deleteAchievement(item._id || item.id);
      setAchievements((prev) => prev.filter((a) => (a._id || a.id) !== (item._id || item.id)));
      addToast("Achievement deleted successfully.");
    } catch (err) {
      addToast(err?.message || "Failed to delete achievement.", "error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Cultural Achievements & Milestones ({achievements.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Showcases certified masterpiece counters, national honors, artisan lineages sustained, and museum conservation credentials.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Add Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item, idx) => {
          const IconComponent = iconMap[item.icon] || Trophy;

          return (
            <div
              key={item._id || item.id || idx}
              className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] rounded-sm p-6 shadow-art flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-sm bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center shadow-xs">
                    <IconComponent className="w-5 h-5 text-[#B89555]" />
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-[#B89555]/20 text-[#682C2C] font-semibold">
                    {item.type || "Milestone"}
                  </span>
                </div>

                <div>
                  {item.number && (
                    <span className="font-serif text-3xl font-bold text-[#682C2C] block">
                      {item.number}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-[#B89555] block mt-0.5">
                      {item.badge}
                    </span>
                  )}
                  <h4 className="font-serif text-lg font-bold text-[#292522] leading-snug mt-1">
                    {item.title || item.label}
                  </h4>
                  <p className="text-xs text-[#292522]/75 font-sans mt-1.5 leading-relaxed">
                    {item.detail || item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#B89555]/20 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-[#E9DFCD] text-[#292522] border border-[#B89555]/30 transition-colors cursor-pointer"
                  title="Edit achievement"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                  title="Delete achievement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

