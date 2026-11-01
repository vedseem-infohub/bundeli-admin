"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Authenticated admin session
  const [adminUser, setAdminUser] = useState(null);

  // Collections state
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [celebrities, setCelebrities] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [selections, setSelections] = useState([]);

  // Toast notification system
  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Restore & verify admin session on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem("bk_admin_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setAdminUser(parsed);
        }

        // Verify active session with backend
        const res = await api.getAdminProfile().catch(() => null);
        if (res && res.success && res.admin) {
          setAdminUser(res.admin);
          localStorage.setItem("bk_admin_user", JSON.stringify(res.admin));
        } else if (stored && (!res || !res.success)) {
          // If stored is present but backend token is invalid
          // Keep stored for offline dev, or prompt login
        }
      } catch (err) {
        console.warn("Admin auth verification warning:", err);
      } finally {
        setAuthChecking(false);
      }
    };

    initAuth();
  }, []);

  // Strict Admin Login
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.adminLogin(email, password);
      if (res && res.success && res.admin) {
        setAdminUser(res.admin);
        localStorage.setItem("bk_admin_user", JSON.stringify(res.admin));
        addToast(`Authenticated as ${res.admin.name} (${res.admin.role.toUpperCase()}).`);
        await refreshAllData();
        return res;
      }
      throw new Error(res.message || "Admin authentication failed.");
    } catch (err) {
      addToast(err?.message || "Invalid administrative credentials.", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Admin Logout
  const logoutAdmin = async () => {
    try {
      await api.adminLogout().catch(() => {});
    } finally {
      setAdminUser(null);
      localStorage.removeItem("bk_admin_user");
      addToast("Signed out from Atelier Admin Console.", "info");
    }
  };

  // Update Admin Profile (Personal info, Contact, Address, Socials, Password)
  const updateAdminProfile = async (profileData) => {
    setLoading(true);
    try {
      const res = await api.updateAdminProfile(profileData);
      if (res && res.success && res.admin) {
        setAdminUser(res.admin);
        localStorage.setItem("bk_admin_user", JSON.stringify(res.admin));
        addToast(res.message || "Profile successfully updated.");
        return res;
      }
      throw new Error(res.message || "Failed to update profile.");
    } catch (err) {
      addToast(err?.message || "Error updating administrative profile.", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all initial data
  const refreshAllData = async () => {
    setLoading(true);
    try {
      const [
        resBanners,
        resCats,
        resArt,
        resAch,
        resCeleb,
        resNews,
        resBlogs,
        resRev,
        resUsers,
        resSel,
      ] = await Promise.allSettled([
        api.getBanners(),
        api.getCategories(),
        api.getArtworks(),
        api.getAchievements(),
        api.getCelebrityPaintings(),
        api.getNews(),
        api.getBlogs(),
        api.getReviews(),
        api.getAllUsers(),
        api.getSelections(),
      ]);

      if (resBanners.status === "fulfilled" && resBanners.value.data) {
        setBanners(resBanners.value.data);
      }
      if (resCats.status === "fulfilled" && resCats.value.data) {
        setCategories(resCats.value.data);
      }
      if (resArt.status === "fulfilled" && resArt.value.data) {
        setArtworks(resArt.value.data);
      }
      if (resAch.status === "fulfilled" && resAch.value.data) {
        setAchievements(resAch.value.data);
      }
      if (resCeleb.status === "fulfilled" && resCeleb.value.data) {
        setCelebrities(resCeleb.value.data);
      }
      if (resNews.status === "fulfilled" && resNews.value.data) {
        setNews(resNews.value.data);
      }
      if (resBlogs.status === "fulfilled" && resBlogs.value.data) {
        setBlogs(resBlogs.value.data);
      }
      if (resRev.status === "fulfilled" && resRev.value.data) {
        setReviews(resRev.value.data);
      }
      if (resUsers.status === "fulfilled" && resUsers.value.users) {
        setUsers(resUsers.value.users);
      }
      if (resSel.status === "fulfilled" && resSel.value.selections) {
        setSelections(resSel.value.selections);
      }
    } catch (err) {
      console.warn("API refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      refreshAllData();
    }
  }, [adminUser]);

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        loading,
        setLoading,
        authChecking,
        adminUser,
        setAdminUser,
        loginAdmin,
        logoutAdmin,
        updateAdminProfile,
        toasts,
        addToast,
        removeToast,
        banners,
        setBanners,
        categories,
        setCategories,
        artworks,
        setArtworks,
        achievements,
        setAchievements,
        celebrities,
        setCelebrities,
        news,
        setNews,
        blogs,
        setBlogs,
        reviews,
        setReviews,
        users,
        setUsers,
        selections,
        setSelections,
        refreshAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
