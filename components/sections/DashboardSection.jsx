"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  Palette,
  Layers,
  Sparkles,
  BookmarkCheck,
  Users,
  Star,
  Newspaper,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  Phone,
} from "lucide-react";

export default function DashboardSection() {
  const {
    artworks,
    categories,
    banners,
    selections,
    reviews,
    users,
    blogs,
    news,
    setActiveTab,
  } = useAdmin();

  const newArrivals = artworks.filter((a) => a.isNew);
  const fiveStarReviews = reviews.filter((r) => r.rating === 5);

  const stats = [
    {
      label: "Masterpiece Artworks",
      value: artworks.length || 0,
      detail: `${newArrivals.length} in New Arrivals`,
      icon: Palette,
      tab: "artworks",
      color: "bg-[#682C2C]",
    },
    {
      label: "User Artwork Selections",
      value: selections.length || 0,
      detail: "Patron commissions on demand",
      icon: BookmarkCheck,
      tab: "selections",
      color: "bg-[#0C381E]",
    },
    {
      label: "Heritage Categories",
      value: categories.length || 0,
      detail: "Active art traditions",
      icon: Layers,
      tab: "categories",
      color: "bg-[#B89555]",
    },
    {
      label: "Registered Users & Admins",
      value: users.length || 0,
      detail: "Authenticated collectors",
      icon: Users,
      tab: "admins",
      color: "bg-[#292522]",
    },
    {
      label: "Patron Reviews",
      value: reviews.length || 0,
      detail: `${fiveStarReviews.length} 5-Star Masterpiece ratings`,
      icon: Star,
      tab: "reviews",
      color: "bg-[#72765A]",
    },
    {
      label: "Heritage Essays & News",
      value: (blogs.length || 0) + (news.length || 0),
      detail: "Published curatorial archives",
      icon: BookOpen,
      tab: "blogs",
      color: "bg-[#682C2C]",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-8 bg-[#FAF7F0] border border-[#B89555]/40 rounded-sm shadow-art relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#682C2C] flex items-center gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-[#B89555]" />
            ROYAL ATELIER MANAGEMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
            Curatorial Control Center
          </h2>
          <p className="text-xs sm:text-sm text-[#72765A] font-light leading-relaxed font-sans">
            Manage your fine art catalog, Cloudinary assets, showcase banners, patron inquiries, and authenticated users across the Bundelkhand cultural repository.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab("selections")}
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe57] text-[#0C381E] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all font-sans cursor-pointer flex items-center gap-1.5"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>View User Selections ({selections.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("artworks")}
            className="px-5 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-sm transition-all font-sans cursor-pointer flex items-center gap-1.5"
          >
            <Palette className="w-4 h-4 text-[#B89555]" />
            <span>Manage Artworks</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(stat.tab)}
              className="bg-[#FAF7F0] border border-[#B89555]/30 hover:border-[#682C2C] p-6 rounded-sm shadow-art hover:shadow-art-hover transition-all duration-300 flex items-start justify-between cursor-pointer group"
            >
              <div className="space-y-1">
                <p className="text-xs font-sans text-[#72765A] uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#292522]">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-[#292522]/70 font-sans">{stat.detail}</p>
              </div>

              <div
                className={`p-3 rounded-sm ${stat.color} text-[#F8F4EA] shadow-md group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5 text-[#B89555]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Selections & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left (2 cols): Recent User Artwork Selections */}
        <div className="lg:col-span-2 bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-6 shadow-art">
          <div className="flex items-center justify-between pb-4 border-b border-[#B89555]/20 mb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#292522]">
                Recent Patron Artwork Selections
              </h3>
              <p className="text-xs text-[#72765A] font-sans">
                Artworks selected by website users for WhatsApp & bespoke atelier commission
              </p>
            </div>

            <button
              onClick={() => setActiveTab("selections")}
              className="text-xs font-semibold text-[#682C2C] hover:text-[#B89555] flex items-center gap-1 font-sans cursor-pointer"
            >
              <span>See All ({selections.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {selections.length === 0 ? (
            <div className="py-12 text-center text-[#72765A] space-y-2">
              <BookmarkCheck className="w-8 h-8 mx-auto text-[#B89555]/40" />
              <p className="text-xs font-sans">No user artwork selections recorded yet.</p>
              <p className="text-[11px] text-[#72765A]/80 font-sans">
                When users click &ldquo;Select Artwork&rdquo; on the showcase, their selections will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#B89555]/15">
              {selections.slice(0, 5).map((sel) => (
                <div key={sel._id || sel.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {sel.artworkImage ? (
                      <img
                        src={sel.artworkImage}
                        alt={sel.artworkTitle}
                        className="w-12 h-12 object-cover rounded-sm border border-[#B89555]/30"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#E9DFCD] rounded-sm flex items-center justify-center text-xs font-serif font-bold text-[#682C2C]">
                        BK
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#292522] leading-tight">
                        {sel.artworkTitle}
                      </h4>
                      <p className="text-[11px] text-[#72765A] font-sans mt-0.5">
                        Selected by <strong className="text-[#292522]">{sel.userName || "Guest Patron"}</strong>
                        {sel.userPhone && ` • ${sel.userPhone}`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-sans uppercase px-2 py-0.5 rounded-xs bg-[#25D366]/20 text-[#0C381E] border border-[#25D366]/30 font-semibold block">
                      {sel.status || "Selected"}
                    </span>
                    <span className="text-[10px] text-[#72765A] font-sans block mt-1">
                      {new Date(sel.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right (1 col): Recent Patron Reviews & Quick Jump */}
        <div className="space-y-6">
          <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-6 shadow-art">
            <div className="flex items-center justify-between pb-3 border-b border-[#B89555]/20 mb-4">
              <h3 className="font-serif text-lg font-bold text-[#292522]">Latest Patron Reviews</h3>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-xs font-semibold text-[#682C2C] hover:text-[#B89555] font-sans cursor-pointer"
              >
                All
              </button>
            </div>

            <div className="space-y-4">
              {reviews.slice(0, 3).map((rev) => (
                <div key={rev._id || rev.id} className="p-3 bg-[#F8F4EA] border border-[#B89555]/20 rounded-sm text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold font-serif text-[#292522]">{rev.name}</span>
                    <div className="flex text-[#B89555]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#B89555]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#292522]/80 italic line-clamp-2">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump Shortcuts */}
          <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-6 shadow-art space-y-3">
            <h3 className="font-serif text-base font-bold text-[#292522]">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <button
                onClick={() => setActiveTab("banners")}
                className="p-2.5 bg-[#F8F4EA] hover:bg-[#E9DFCD] border border-[#B89555]/20 text-left rounded-sm transition-colors cursor-pointer"
              >
                Hero Posters
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className="p-2.5 bg-[#F8F4EA] hover:bg-[#E9DFCD] border border-[#B89555]/20 text-left rounded-sm transition-colors cursor-pointer"
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("celebrities")}
                className="p-2.5 bg-[#F8F4EA] hover:bg-[#E9DFCD] border border-[#B89555]/20 text-left rounded-sm transition-colors cursor-pointer"
              >
                Celebrity Sales
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className="p-2.5 bg-[#F8F4EA] hover:bg-[#E9DFCD] border border-[#B89555]/20 text-left rounded-sm transition-colors cursor-pointer"
              >
                Manage Admins
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

