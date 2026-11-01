const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Perform a fetch request to backend API
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    credentials: "include",
    ...options,
  };

  // If body is NOT FormData, set JSON content-type
  if (config.body && !(config.body instanceof FormData)) {
    config.headers = {
      "Content-Type": "application/json",
      ...(config.headers || {}),
    };
  }

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  // Strict Admin Authentication
  adminLogin: (email, password) =>
    request("/auth/admin-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getAdminProfile: () => request("/auth/admin-me"),
  updateAdminProfile: (profileData) =>
    request("/auth/admin-profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
  adminLogout: () => request("/auth/logout", { method: "POST" }),

  // Banners
  getBanners: () => request("/banners"),
  getActiveBanners: () => request("/banners/active"),
  addBanner: (formData) => request("/banners", { method: "POST", body: formData }),
  updateBanner: (id, formData) => request(`/banners/${id}`, { method: "PUT", body: formData }),
  deleteBanner: (id) => request(`/banners/${id}`, { method: "DELETE" }),

  // Categories
  getCategories: () => request("/categories"),
  addCategory: (formData) => request("/categories", { method: "POST", body: formData }),
  updateCategory: (id, formData) => request(`/categories/${id}`, { method: "PUT", body: formData }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: "DELETE" }),

  // Artworks & New Arrivals
  getArtworks: (query = "") => request(`/artworks${query}`),
  getNewArrivals: () => request("/artworks/new-arrivals"),
  addArtwork: (formData) => request("/artworks", { method: "POST", body: formData }),
  updateArtwork: (id, formData) => request(`/artworks/${id}`, { method: "PUT", body: formData }),
  toggleNewArrival: (id, isNew) =>
    request(`/artworks/${id}/new-arrival`, {
      method: "PATCH",
      body: JSON.stringify({ isNew }),
    }),
  deleteArtwork: (id) => request(`/artworks/${id}`, { method: "DELETE" }),

  // Achievements
  getAchievements: (type = "") => request(`/achievements${type ? `?type=${type}` : ""}`),
  addAchievement: (formData) => request("/achievements", { method: "POST", body: formData }),
  updateAchievement: (id, formData) => request(`/achievements/${id}`, { method: "PUT", body: formData }),
  deleteAchievement: (id) => request(`/achievements/${id}`, { method: "DELETE" }),

  // Celebrity Patron Paintings
  getCelebrityPaintings: () => request("/celebrity-paintings"),
  addCelebrityPainting: (formData) => request("/celebrity-paintings", { method: "POST", body: formData }),
  updateCelebrityPainting: (id, formData) =>
    request(`/celebrity-paintings/${id}`, { method: "PUT", body: formData }),
  deleteCelebrityPainting: (id) => request(`/celebrity-paintings/${id}`, { method: "DELETE" }),

  // News & Press
  getNews: () => request("/news"),
  addNews: (formData) => request("/news", { method: "POST", body: formData }),
  updateNews: (id, formData) => request(`/news/${id}`, { method: "PUT", body: formData }),
  deleteNews: (id) => request(`/news/${id}`, { method: "DELETE" }),

  // Blogs & Essays
  getBlogs: (query = "") => request(`/blogs${query}`),
  addBlog: (formData) => request("/blogs", { method: "POST", body: formData }),
  updateBlog: (id, formData) => request(`/blogs/${id}`, { method: "PUT", body: formData }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: "DELETE" }),

  // Reviews
  getReviews: (query = "") => request(`/reviews${query}`),
  addReview: (formData) => request("/reviews", { method: "POST", body: formData }),
  updateReview: (id, formData) => request(`/reviews/${id}`, { method: "PUT", body: formData }),
  deleteReview: (id) => request(`/reviews/${id}`, { method: "DELETE" }),

  // Users & Admin Management
  getAllUsers: () => request("/user/all"),
  createAdmin: (adminData) =>
    request("/user/create-admin", {
      method: "POST",
      body: JSON.stringify(adminData),
    }),
  updateUserRole: (id, role) =>
    request(`/user/${id}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    }),
  deleteUser: (id) => request(`/user/${id}`, { method: "DELETE" }),

  // User Artwork Selections & Inquiries
  getSelections: () => request("/user/selections"),
  saveSelection: (selectionData) =>
    request("/user/selections", {
      method: "POST",
      body: JSON.stringify(selectionData),
    }),
  updateSelectionStatus: (id, status, notes = "") =>
    request(`/user/selections/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    }),
  deleteSelection: (id) => request(`/user/selections/${id}`, { method: "DELETE" }),
};

