"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Layers,
  Palette,
  Sparkles,
  Trophy,
  Crown,
  Newspaper,
  BookOpen,
  Star,
  BookmarkCheck,
  Users,
  UserCheck,
  Shield,
  ExternalLink,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const {
    activeTab,
    setActiveTab,
    banners,
    categories,
    artworks,
    celebrities,
    news,
    blogs,
    reviews,
    selections,
    users,
    adminUser,
    logoutAdmin,
  } = useAdmin();

  const newArrivalsCount = artworks.filter((a) => a.isNew).length;

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "banners",
      label: "Hero Section Banners",
      icon: ImageIcon,
      badge: banners.length || 0,
    },
    {
      id: "categories",
      label: "Heritage Categories",
      icon: Layers,
      badge: categories.length || 0,
    },
    {
      id: "artworks",
      label: "Masterpiece Artworks",
      icon: Palette,
      badge: artworks.length || 0,
    },
    {
      id: "new-arrivals",
      label: "New Arrivals Showcase",
      icon: Sparkles,
      badge: newArrivalsCount || 0,
    },
    {
      id: "achievements",
      label: "Cultural Achievements",
      icon: Trophy,
      badge: null,
    },
    {
      id: "celebrities",
      label: "Celebrated Patrons",
      icon: Crown,
      badge: celebrities.length || 0,
    },
    {
      id: "news",
      label: "News & Press Dispatches",
      icon: Newspaper,
      badge: news.length || 0,
    },
    {
      id: "blogs",
      label: "Blog & Heritage Essays",
      icon: BookOpen,
      badge: blogs.length || 0,
    },
    {
      id: "reviews",
      label: "Patron Reviews",
      icon: Star,
      badge: reviews.length || 0,
    },
    {
      id: "selections",
      label: "User Artwork Selections",
      icon: BookmarkCheck,
      badge: selections.length || 0,
      highlight: true,
    },
    {
      id: "admins",
      label: "Admins & Users",
      icon: Users,
      badge: users.length || 0,
    },
    {
      id: "profile",
      label: "Admin Profile & Atelier",
      icon: UserCheck,
      badge: null,
    },
  ];

  return (
    <aside className="w-72 bg-[#292522] text-[#F8F4EA] flex flex-col justify-between shrink-0 border-r border-[#B89555]/30 min-h-screen">
      {/* Top: Royal Insignia & Brand Header */}
      <div>
        <div className="p-6 border-b border-[#B89555]/20 bg-[#221e1c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#682C2C] border border-[#B89555] flex items-center justify-center font-serif text-lg font-bold text-[#F8F4EA] shadow-md">
              BK
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wide text-[#F8F4EA] leading-tight">
                BUNDELI KALAVRAT
              </h1>
              <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B89555]">
                Royal Atelier Admin
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          <p className="px-3 py-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#72765A] font-semibold">
            MANAGEMENT MODULES
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-sans transition-all text-left group cursor-pointer ${
                  isActive
                    ? "bg-[#682C2C] text-[#F8F4EA] font-semibold shadow-md border-l-4 border-[#B89555]"
                    : "text-[#F8F4EA]/80 hover:bg-[#38332f] hover:text-[#F8F4EA]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? "text-[#B89555]"
                        : item.highlight
                        ? "text-[#25D366]"
                        : "text-[#B89555]/70 group-hover:text-[#B89555]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                      isActive
                        ? "bg-[#B89555] text-[#292522]"
                        : item.highlight
                        ? "bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40"
                        : "bg-[#3e3935] text-[#F8F4EA]/70"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Live Store Link */}
      <div className="p-4 border-t border-[#B89555]/20 bg-[#221e1c] space-y-3">
        {/* Live Website Preview Link */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-sm bg-[#38332f] hover:bg-[#48423d] text-[#B89555] text-xs font-sans transition-colors border border-[#B89555]/30 group"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Gallery</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Current Admin Badge & Sign Out */}
        <div className="flex items-center justify-between gap-3 px-2 pt-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 min-w-0 text-left cursor-pointer p-1 -m-1 rounded-sm transition-colors hover:bg-[#38332f] group ${
              activeTab === "profile" ? "bg-[#682C2C]/50" : ""
            }`}
            title="Edit Admin Profile & Contact Info"
          >
            <div className="w-8 h-8 rounded-full bg-[#682C2C] border border-[#B89555] flex items-center justify-center font-serif text-xs font-bold text-[#F8F4EA] shrink-0 group-hover:border-[#F8F4EA]">
              {adminUser?.name ? adminUser.name.charAt(0) : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#F8F4EA] truncate leading-tight font-serif group-hover:text-[#B89555]">
                {adminUser?.name || "Atelier Master"}
              </p>
              <p className="text-[10px] text-[#B89555] font-mono uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" />
                <span>{adminUser?.role || "superadmin"}</span>
              </p>
            </div>
          </button>

          <button
            onClick={logoutAdmin}
            title="Sign out from Admin Console"
            className="p-1.5 rounded-sm hover:bg-rose-950/60 text-[#E9DFCD]/70 hover:text-rose-300 border border-transparent hover:border-rose-800 transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

