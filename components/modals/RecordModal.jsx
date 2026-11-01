"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Sparkles, Check, Image as ImageIcon } from "lucide-react";

export default function RecordModal({
  isOpen,
  onClose,
  section,
  initialData = null,
  onSave,
}) {
  const [formData, setFormData] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initialData?._id || initialData?.id);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      setError("");
      setImageFiles([]);
      setImagePreviews([]);

      if (initialData) {
        setFormData({ ...initialData });
        if (initialData.image) setImagePreviews([initialData.image]);
        if (initialData.coverImage) setImagePreviews([initialData.coverImage]);
        if (initialData.images && Array.isArray(initialData.images)) {
          setImagePreviews(
            initialData.images.map((img) => (typeof img === "string" ? img : img.url))
          );
        }
      } else {
        // Defaults based on section
        const defaults = {};
        if (section === "artworks" || section === "new-arrivals") {
          defaults.isNew = section === "new-arrivals";
          defaults.orientation = "Landscape";
          defaults.size = "Medium";
          defaults.availability = "In Stock";
          defaults.medium = "Natural Mineral Pigments & Gold Leaf";
          defaults.material = "Handmade Sanganeri Wasli Paper";
        } else if (section === "banners") {
          defaults.isActive = true;
          defaults.order = 0;
        } else if (section === "categories") {
          defaults.featured = true;
          defaults.order = 0;
        } else if (section === "achievements") {
          defaults.type = "milestone";
          defaults.icon = "Award";
        } else if (section === "reviews") {
          defaults.rating = 5;
          defaults.verified = true;
        } else if (section === "admins") {
          defaults.role = "admin";
        }
        setFormData(defaults);
      }
    }
  }, [isOpen, initialData, section]);

  if (!isOpen) return null;

  // Handle single / multiple file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageFiles(files);

    // Create local preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Build FormData payload for Cloudinary upload
      const payload = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        if (
          key !== "images" &&
          key !== "image" &&
          key !== "coverImage" &&
          formData[key] !== undefined &&
          formData[key] !== null
        ) {
          if (typeof formData[key] === "object") {
            payload.append(key, JSON.stringify(formData[key]));
          } else {
            payload.append(key, formData[key]);
          }
        }
      });

      // Append file(s)
      if (imageFiles.length > 0) {
        if (section === "artworks" || section === "new-arrivals") {
          imageFiles.forEach((file) => {
            payload.append("images", file);
          });
        } else if (section === "blogs") {
          payload.append("coverImage", imageFiles[0]);
        } else {
          payload.append("image", imageFiles[0]);
        }
      } else {
        // Fallback: If editing or user passed direct URL
        if (formData.image) payload.append("image", formData.image);
        if (formData.coverImage) payload.append("coverImage", formData.coverImage);
        if (formData.images) payload.append("images", JSON.stringify(formData.images));
      }

      await onSave(payload, formData, initialData?._id || initialData?.id);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to save record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    const prefix = isEdit ? "Edit" : "Add";
    switch (section) {
      case "banners":
        return `${prefix} Hero Section Banner`;
      case "categories":
        return `${prefix} Heritage Category`;
      case "artworks":
        return `${prefix} Masterpiece Artwork`;
      case "new-arrivals":
        return `${prefix} New Arrival Creation`;
      case "achievements":
        return `${prefix} Cultural Achievement`;
      case "celebrities":
        return `${prefix} Celebrated Patron Acquisition`;
      case "news":
        return `${prefix} Press Dispatch`;
      case "blogs":
        return `${prefix} Curated Blog Essay`;
      case "reviews":
        return `${prefix} Patron Review`;
      case "admins":
        return `${prefix} Admin Atelier Account`;
      default:
        return `${prefix} Record`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#292522]/80 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F0] text-[#292522] rounded-sm shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-[#B89555]/40">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#B89555]/20 flex items-center justify-between bg-[#F4EFE6]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#682C2C] font-semibold">
              ROYAL ATELIER MANAGEMENT
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#292522]">
              {getTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#292522]/60 hover:text-[#682C2C] rounded-full hover:bg-[#E9DFCD] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-sans rounded-sm">
              {error}
            </div>
          )}

          {/* Section: Image Upload with Multer/Cloudinary */}
          {section !== "admins" && (
            <div className="bg-[#F8F4EA] border border-[#B89555]/30 rounded-sm p-4 space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292522] font-sans">
                {section === "artworks" || section === "new-arrivals"
                  ? "Artwork Images (Uploaded to Cloudinary via Multer)"
                  : "Cover / Display Image (Uploaded to Cloudinary)"}
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-sans uppercase font-semibold tracking-wider rounded-sm cursor-pointer shadow-xs transition-colors">
                  <Upload className="w-4 h-4 text-[#B89555]" />
                  <span>Choose Image File(s)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple={section === "artworks" || section === "new-arrivals"}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <span className="text-xs text-[#72765A] font-sans">
                  {imageFiles.length > 0
                    ? `${imageFiles.length} file(s) selected`
                    : "Or provide an existing image URL below"}
                </span>
              </div>

              {/* URL fallback input */}
              <input
                type="text"
                placeholder="Or paste external / hosted image URL"
                value={formData.image || formData.coverImage || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (section === "blogs") handleInputChange("coverImage", val);
                  else handleInputChange("image", val);
                  if (val) setImagePreviews([val]);
                }}
                className="w-full bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm px-3 py-2 text-xs text-[#292522] font-sans focus:outline-hidden focus:border-[#682C2C]"
              />

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-2.5 overflow-x-auto pt-2">
                  {imagePreviews.map((preview, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 shrink-0 rounded-sm overflow-hidden border border-[#B89555]/40 bg-[#FAF7F0] relative"
                    >
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Fields for Banners */}
          {section === "banners" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g. Bundeli Kalavrat Cultural Art Poster"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Image Alt Tag
                  </label>
                  <input
                    type="text"
                    value={formData.alt || ""}
                    onChange={(e) => handleInputChange("alt", e.target.value)}
                    placeholder="e.g. Sacred Earth & Mineral Heritage Poster"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Redirect Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.link || ""}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                    placeholder="/shop or /categories/paintings"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order !== undefined ? formData.order : 0}
                    onChange={(e) => handleInputChange("order", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="banner-active"
                  checked={formData.isActive !== undefined ? formData.isActive : true}
                  onChange={(e) => handleInputChange("isActive", e.target.checked)}
                  className="rounded-xs text-[#682C2C] focus:ring-[#682C2C]"
                />
                <label htmlFor="banner-active" className="text-xs font-sans text-[#292522]">
                  Active in Hero Poster Rotation
                </label>
              </div>
            </div>
          )}

          {/* Dynamic Fields for Categories */}
          {section === "categories" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Traditional Paintings, Folk Art & Murals"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    URL Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="paintings, folk-art, sculptures"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Short One-Line Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription || ""}
                  onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                  placeholder="Centuries-old miniature, fresco, and tempera painting traditions..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Detailed Curatorial Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Explain the heritage history, regional pigments, and artisan techniques..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Artwork Count
                  </label>
                  <input
                    type="number"
                    value={formData.artworkCount || 0}
                    onChange={(e) => handleInputChange("artworkCount", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-sans cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured !== undefined ? formData.featured : true}
                      onChange={(e) => handleInputChange("featured", e.target.checked)}
                      className="rounded-xs text-[#682C2C]"
                    />
                    <span>Featured in Navigation & Showcase</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Fields for Artworks & New Arrivals */}
          {(section === "artworks" || section === "new-arrivals") && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Royal Durbar of Orchha: Celestial Assembly"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Master Artist Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artist || ""}
                    onChange={(e) => handleInputChange("artist", e.target.value)}
                    placeholder="Pt. Ramnarayan Sharma, Devaki Bai"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category || "Traditional Paintings"}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="Traditional Paintings, Folk Art, Sculptures"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Orientation
                  </label>
                  <select
                    value={formData.orientation || "Landscape"}
                    onChange={(e) => handleInputChange("orientation", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  >
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Square">Square</option>
                    <option value="Panoramic">Panoramic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions || '36" x 48"'}
                    onChange={(e) => handleInputChange("dimensions", e.target.value)}
                    placeholder='36" x 48"'
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Medium
                  </label>
                  <input
                    type="text"
                    value={formData.medium || "Natural Mineral Pigments & 24K Gold Leaf"}
                    onChange={(e) => handleInputChange("medium", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material || "Handmade Sanganeri Wasli Paper"}
                    onChange={(e) => handleInputChange("material", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Authentic Bundeli court painting inspired by the 17th-century frescoes..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-sans cursor-pointer font-semibold text-[#682C2C]">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.isNew)}
                    onChange={(e) => handleInputChange("isNew", e.target.checked)}
                    className="rounded-xs text-[#682C2C]"
                  />
                  <span>Mark as New Arrival (Fresh from Atelier)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-sans cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.isFeatured)}
                    onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
                    className="rounded-xs text-[#682C2C]"
                  />
                  <span>Featured Masterpiece</span>
                </label>
              </div>
            </div>
          )}

          {/* Dynamic Fields for Celebrated Patrons */}
          {section === "celebrities" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Celebrity / Patron Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.celebrityName || ""}
                    onChange={(e) => handleInputChange("celebrityName", e.target.value)}
                    placeholder="Amitabh Bachchan, Saif Ali Khan"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Celebrity Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.celebrityTitle || "Royal Patron & Cultural Icon"}
                    onChange={(e) => handleInputChange("celebrityTitle", e.target.value)}
                    placeholder="Legendary Actor & Connoisseur"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Acquired Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artworkTitle || ""}
                    onChange={(e) => handleInputChange("artworkTitle", e.target.value)}
                    placeholder="The Sacred Chhatris of Orchha at Sunset"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Estate / Residence Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Jalsa Residence, Mumbai"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Patron Quote / Testimonial
                </label>
                <textarea
                  rows={3}
                  value={formData.quote || ""}
                  onChange={(e) => handleInputChange("quote", e.target.value)}
                  placeholder="The nuanced 17th-century Bundeli court portraiture holds a timeless grace..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>
            </div>
          )}

          {/* Dynamic Fields for News */}
          {section === "news" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    News Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Bundeli Kalavrat Showcases Orchha Fresco Revivals..."
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Press Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge || "PRESS & MEDIA"}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                    placeholder="EXHIBITION & ART FAIR"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Media Outlet
                  </label>
                  <input
                    type="text"
                    value={formData.outlet || "Architectural Digest India"}
                    onChange={(e) => handleInputChange("outlet", e.target.value)}
                    placeholder="India Art Fair • New Delhi"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime || "4 min read"}
                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Dispatch Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.summary || ""}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Summary of the exhibition or national award honor..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>
            </div>
          )}

          {/* Dynamic Fields for Blogs */}
          {section === "blogs" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Exploring the Artistic Heritage of Bundelkhand..."
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category || "Heritage & History"}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="Heritage & History, Sacred Geometry"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author || "Dr. Vikramaditya Rathore"}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole || "Senior Curator & Art Historian"}
                    onChange={(e) => handleInputChange("authorRole", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Article Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.summary || ""}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="A short overview of the essay..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Full Essay Narrative (Markdown / Text)
                </label>
                <textarea
                  rows={5}
                  value={formData.content || ""}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="In-depth exploration of 17th-century palace frescoes..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Dynamic Fields for Reviews */}
          {section === "reviews" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Patron Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Dr. Arvind Shrivastava"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location || "New Delhi"}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Star Rating (1-5) *
                  </label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => handleInputChange("rating", Number(e.target.value))}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  >
                    <option value={5}>5 Stars - Exceptional Masterpiece</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Satisfactory</option>
                    <option value={2}>2 Stars - Fair</option>
                    <option value={1}>1 Star - Needs Improvement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Commissioned Artwork Reference
                  </label>
                  <input
                    type="text"
                    value={formData.artworkTitle || "Orchha Darbar Gathering"}
                    onChange={(e) => handleInputChange("artworkTitle", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.comment || ""}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                  placeholder="The mineral lapis lazuli and genuine gold leaf brings Bundelkhand alive..."
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>
            </div>
          )}

          {/* Dynamic Fields for Creating Admin Accounts */}
          {section === "admins" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Admin Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Maharaja Administrator / Curatorial Lead"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Admin Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="admin@bundelikalavrat.com"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password || ""}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                    Administrative Role *
                  </label>
                  <select
                    value={formData.role || "admin"}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                  >
                    <option value="admin">Admin (Catalog, Artworks & Content)</option>
                    <option value="superadmin">Superadmin (Full Atelier Rights & Access)</option>
                    <option value="curator">Curator (Artworks, Blogs & Reviews)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 font-sans">
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-3 py-2 text-xs font-sans"
                />
              </div>
            </div>
          )}

          {/* Modal Footer / Submit Button */}
          <div className="pt-4 border-t border-[#B89555]/20 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#E9DFCD] hover:bg-[#dfd4bf] text-[#292522] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
              <span>{isSubmitting ? "Uploading to Cloudinary..." : "Save Record"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

