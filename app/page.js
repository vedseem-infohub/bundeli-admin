"use client";

import React, { useState } from "react";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import ToastContainer from "@/components/ui/ToastContainer";
import RecordModal from "@/components/modals/RecordModal";
import AdminLoginPage from "@/components/auth/AdminLoginPage";

// Modular Views
import DashboardSection from "@/components/sections/DashboardSection";
import BannersSection from "@/components/sections/BannersSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ArtworksSection from "@/components/sections/ArtworksSection";
import NewArrivalsSection from "@/components/sections/NewArrivalsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CelebritySection from "@/components/sections/CelebritySection";
import NewsSection from "@/components/sections/NewsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import SelectionsSection from "@/components/sections/SelectionsSection";
import AdminsSection from "@/components/sections/AdminsSection";
import ProfileSection from "@/components/sections/ProfileSection";

import { api } from "@/lib/api";

function AdminDashboardContent() {
  const {
    adminUser,
    authChecking,
    activeTab,
    refreshAllData,
    addToast,
    setBanners,
    setCategories,
    setArtworks,
    setAchievements,
    setCelebrities,
    setNews,
    setBlogs,
    setReviews,
    setUsers,
  } = useAdmin();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState("artworks");
  const [editingRecord, setEditingRecord] = useState(null);

  // If still checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#1F1B19] text-[#F8F4EA] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-sm bg-[#682C2C] border-2 border-[#B89555] flex items-center justify-center font-serif text-lg font-bold text-[#F8F4EA] shadow-xl animate-pulse">
          BK
        </div>
        <p className="text-xs font-sans tracking-widest uppercase text-[#B89555]">
          Verifying Atelier Privileges...
        </p>
      </div>
    );
  }

  // Strict Protection: Show Login Page if not authenticated
  if (!adminUser) {
    return <AdminLoginPage />;
  }

  const handleOpenAdd = (sectionKey = activeTab) => {
    setModalSection(sectionKey);
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record, sectionKey = activeTab) => {
    setModalSection(sectionKey);
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  // Central handler for saving (Add or Edit) across all sections
  const handleSaveRecord = async (formData, rawData, existingId) => {
    try {
      if (modalSection === "banners") {
        if (existingId) {
          const res = await api.updateBanner(existingId, formData);
          setBanners((prev) =>
            prev.map((b) => ((b._id || b.id) === existingId ? res.data : b))
          );
          addToast("Hero banner updated successfully.");
        } else {
          const res = await api.addBanner(formData);
          setBanners((prev) => [res.data, ...prev]);
          addToast("New hero banner created with Cloudinary image.");
        }
      } else if (modalSection === "categories") {
        if (existingId) {
          const res = await api.updateCategory(existingId, formData);
          setCategories((prev) =>
            prev.map((c) => ((c._id || c.id) === existingId ? res.data : c))
          );
          addToast("Category updated successfully.");
        } else {
          const res = await api.addCategory(formData);
          setCategories((prev) => [...prev, res.data]);
          addToast("New category created with Cloudinary image.");
        }
      } else if (modalSection === "artworks" || modalSection === "new-arrivals") {
        if (existingId) {
          const res = await api.updateArtwork(existingId, formData);
          setArtworks((prev) =>
            prev.map((a) => ((a._id || a.id) === existingId ? res.data : a))
          );
          addToast("Artwork updated successfully.");
        } else {
          const res = await api.addArtwork(formData);
          setArtworks((prev) => [res.data, ...prev]);
          addToast("New artwork added with Cloudinary gallery images.");
        }
      } else if (modalSection === "achievements") {
        if (existingId) {
          const res = await api.updateAchievement(existingId, formData);
          setAchievements((prev) =>
            prev.map((a) => ((a._id || a.id) === existingId ? res.data : a))
          );
          addToast("Achievement updated successfully.");
        } else {
          const res = await api.addAchievement(formData);
          setAchievements((prev) => [...prev, res.data]);
          addToast("Achievement milestone created.");
        }
      } else if (modalSection === "celebrities") {
        if (existingId) {
          const res = await api.updateCelebrityPainting(existingId, formData);
          setCelebrities((prev) =>
            prev.map((c) => ((c._id || c.id) === existingId ? res.data : c))
          );
          addToast("Celebrity acquisition updated.");
        } else {
          const res = await api.addCelebrityPainting(formData);
          setCelebrities((prev) => [res.data, ...prev]);
          addToast("Celebrity patron acquisition created.");
        }
      } else if (modalSection === "news") {
        if (existingId) {
          const res = await api.updateNews(existingId, formData);
          setNews((prev) =>
            prev.map((n) => ((n._id || n.id) === existingId ? res.data : n))
          );
          addToast("News dispatch updated.");
        } else {
          const res = await api.addNews(formData);
          setNews((prev) => [res.data, ...prev]);
          addToast("News dispatch published.");
        }
      } else if (modalSection === "blogs") {
        if (existingId) {
          const res = await api.updateBlog(existingId, formData);
          setBlogs((prev) =>
            prev.map((b) => ((b._id || b.id) === existingId ? res.data : b))
          );
          addToast("Blog essay updated.");
        } else {
          const res = await api.addBlog(formData);
          setBlogs((prev) => [res.data, ...prev]);
          addToast("Blog essay published with Cloudinary cover.");
        }
      } else if (modalSection === "reviews") {
        if (existingId) {
          const res = await api.updateReview(existingId, formData);
          setReviews((prev) =>
            prev.map((r) => ((r._id || r.id) === existingId ? res.data : r))
          );
          addToast("Review updated.");
        } else {
          const res = await api.addReview(formData);
          setReviews((prev) => [res.data, ...prev]);
          addToast("Patron review published.");
        }
      } else if (modalSection === "admins") {
        const res = await api.createAdmin({
          name: rawData.name,
          email: rawData.email,
          password: rawData.password,
          role: rawData.role || "admin",
          phone: rawData.phone || "",
        });
        setUsers((prev) => [res.user, ...prev]);
        addToast(`Admin account (${res.user?.role || "admin"}) created successfully.`);
      }

      await refreshAllData();
    } catch (err) {
      addToast(err?.message || "Operation failed.", "error");
      throw err;
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardSection />;
      case "banners":
        return (
          <BannersSection
            onAdd={() => handleOpenAdd("banners")}
            onEdit={(record) => handleOpenEdit(record, "banners")}
          />
        );
      case "categories":
        return (
          <CategoriesSection
            onAdd={() => handleOpenAdd("categories")}
            onEdit={(record) => handleOpenEdit(record, "categories")}
          />
        );
      case "artworks":
        return (
          <ArtworksSection
            onAdd={() => handleOpenAdd("artworks")}
            onEdit={(record) => handleOpenEdit(record, "artworks")}
          />
        );
      case "new-arrivals":
        return (
          <NewArrivalsSection
            onAdd={() => handleOpenAdd("new-arrivals")}
            onEdit={(record) => handleOpenEdit(record, "new-arrivals")}
          />
        );
      case "achievements":
        return (
          <AchievementsSection
            onAdd={() => handleOpenAdd("achievements")}
            onEdit={(record) => handleOpenEdit(record, "achievements")}
          />
        );
      case "celebrities":
        return (
          <CelebritySection
            onAdd={() => handleOpenAdd("celebrities")}
            onEdit={(record) => handleOpenEdit(record, "celebrities")}
          />
        );
      case "news":
        return (
          <NewsSection
            onAdd={() => handleOpenAdd("news")}
            onEdit={(record) => handleOpenEdit(record, "news")}
          />
        );
      case "blogs":
        return (
          <BlogsSection
            onAdd={() => handleOpenAdd("blogs")}
            onEdit={(record) => handleOpenEdit(record, "blogs")}
          />
        );
      case "reviews":
        return (
          <ReviewsSection
            onAdd={() => handleOpenAdd("reviews")}
            onEdit={(record) => handleOpenEdit(record, "reviews")}
          />
        );
      case "selections":
        return <SelectionsSection />;
      case "admins":
        return <AdminsSection onAddAdmin={() => handleOpenAdd("admins")} />;
      case "profile":
        return <ProfileSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F4EA] text-[#292522]">
      {/* Royal Atelier Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onOpenCreateModal={handleOpenAdd} />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Central Modal for Add / Edit */}
      <RecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={modalSection}
        initialData={editingRecord}
        onSave={handleSaveRecord}
      />

      {/* Global Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
}
