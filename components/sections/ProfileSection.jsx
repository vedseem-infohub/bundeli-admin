"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Lock,
  Key,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Sparkles,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  Share2,
} from "lucide-react";

// Brand SVG Icons for crisp, reliable rendering
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function PinterestIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );
}

export default function ProfileSection() {
  const { adminUser, updateAdminProfile, addToast, loading } = useAdmin();

  // Primary profile state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mobileNo: "",
    whatsappNo: "",
    atelierTitle: "Master Atelier Curator",
    bio: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    socialLinks: {
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      pinterest: "",
      website: "",
    },
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'contact' | 'address' | 'socials' | 'security'

  // Sync state whenever adminUser updates
  useEffect(() => {
    if (adminUser) {
      setFormData({
        name: adminUser.name || "",
        email: adminUser.email || "",
        phone: adminUser.phone || "",
        mobileNo: adminUser.mobileNo || adminUser.phone || "",
        whatsappNo: adminUser.whatsappNo || "",
        atelierTitle: adminUser.atelierTitle || "Master Atelier Curator",
        bio: adminUser.bio || "",
        address: {
          street: adminUser.address?.street || "",
          city: adminUser.address?.city || "",
          state: adminUser.address?.state || "",
          pincode: adminUser.address?.pincode || "",
          country: adminUser.address?.country || "India",
        },
        socialLinks: {
          instagram: adminUser.socialLinks?.instagram || "",
          facebook: adminUser.socialLinks?.facebook || "",
          twitter: adminUser.socialLinks?.twitter || "",
          youtube: adminUser.socialLinks?.youtube || "",
          linkedin: adminUser.socialLinks?.linkedin || "",
          pinterest: adminUser.socialLinks?.pinterest || "",
          website: adminUser.socialLinks?.website || "",
        },
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [adminUser]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSocialChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  };

  const handleReset = () => {
    if (adminUser) {
      setFormData({
        name: adminUser.name || "",
        email: adminUser.email || "",
        phone: adminUser.phone || "",
        mobileNo: adminUser.mobileNo || adminUser.phone || "",
        whatsappNo: adminUser.whatsappNo || "",
        atelierTitle: adminUser.atelierTitle || "Master Atelier Curator",
        bio: adminUser.bio || "",
        address: {
          street: adminUser.address?.street || "",
          city: adminUser.address?.city || "",
          state: adminUser.address?.state || "",
          pincode: adminUser.address?.pincode || "",
          country: adminUser.address?.country || "India",
        },
        socialLinks: {
          instagram: adminUser.socialLinks?.instagram || "",
          facebook: adminUser.socialLinks?.facebook || "",
          twitter: adminUser.socialLinks?.twitter || "",
          youtube: adminUser.socialLinks?.youtube || "",
          linkedin: adminUser.socialLinks?.linkedin || "",
          pinterest: adminUser.socialLinks?.pinterest || "",
          website: adminUser.socialLinks?.website || "",
        },
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      addToast("Form restored to current atelier records.", "info");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast("Admin full name is required.", "error");
      return;
    }
    if (!formData.email.trim()) {
      addToast("Administrative email is required.", "error");
      return;
    }

    // Password validation if attempting to change
    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        addToast("New password must be at least 6 characters.", "error");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        addToast("New password and confirmation do not match.", "error");
        return;
      }
      if (!formData.currentPassword) {
        addToast("Current password is required to set a new password.", "error");
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        mobileNo: formData.mobileNo.trim(),
        whatsappNo: formData.whatsappNo.trim(),
        atelierTitle: formData.atelierTitle.trim(),
        bio: formData.bio.trim(),
        address: {
          street: formData.address.street.trim(),
          city: formData.address.city.trim(),
          state: formData.address.state.trim(),
          pincode: formData.address.pincode.trim(),
          country: formData.address.country.trim() || "India",
        },
        socialLinks: {
          instagram: formData.socialLinks.instagram.trim(),
          facebook: formData.socialLinks.facebook.trim(),
          twitter: formData.socialLinks.twitter.trim(),
          youtube: formData.socialLinks.youtube.trim(),
          linkedin: formData.socialLinks.linkedin.trim(),
          pinterest: formData.socialLinks.pinterest.trim(),
          website: formData.socialLinks.website.trim(),
        },
      };

      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      await updateAdminProfile(payload);

      // Reset password fields on success
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      // Toast is already fired in context
    } finally {
      setSaving(false);
    }
  };

  // Quick whatsapp link
  const formattedWhatsApp = formData.whatsappNo.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-8 pb-16">
      {/* Royal Atelier Banner Card */}
      <div className="relative overflow-hidden rounded-md bg-gradient-to-r from-[#292522] via-[#392e2a] to-[#221e1c] border border-[#B89555]/40 p-6 sm:p-8 shadow-xl text-[#F8F4EA]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#B89555]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-[#682C2C]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-md bg-[#682C2C] border-2 border-[#B89555] flex items-center justify-center font-serif text-3xl font-bold text-[#F8F4EA] shadow-2xl shrink-0">
              {formData.name ? formData.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest font-semibold bg-[#B89555]/20 text-[#B89555] border border-[#B89555]/40 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {adminUser?.role?.toUpperCase() || "SUPERADMIN"}
                </span>
                <span className="text-[11px] font-mono text-[#F8F4EA]/60">
                  ID: {adminUser?._id?.slice(-8) || "MASTER"}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F4EA] tracking-wide">
                {formData.name || "Administrative Master"}
              </h1>
              <p className="text-xs text-[#B89555] font-sans font-medium mt-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B89555]" />
                {formData.atelierTitle || "Master Atelier Curator"}
              </p>
            </div>
          </div>

          {/* Quick Preview Badges */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs text-[#F8F4EA]/80 font-sans border-t sm:border-t-0 sm:border-l border-[#B89555]/20 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <span className="flex items-center gap-1.5 text-[#B89555]">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">{formData.email}</span>
            </span>
            {formData.mobileNo && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#72765A]" />
                <span className="font-mono text-[11px]">{formData.mobileNo}</span>
              </span>
            )}
            {formData.whatsappNo && (
              <a
                href={`https://wa.me/${formattedWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{formData.whatsappNo}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
            {formData.address.city && (
              <span className="flex items-center gap-1.5 text-[#E9DFCD]/70">
                <MapPin className="w-3.5 h-3.5 text-[#B89555]" />
                <span>
                  {formData.address.city}
                  {formData.address.state ? `, ${formData.address.state}` : ""}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Atelier & Personal Identity */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-md p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#B89555]/20 pb-4 mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#682C2C]/10 border border-[#682C2C]/30 flex items-center justify-center text-[#682C2C]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#292522]">
                Personal & Atelier Identity
              </h2>
              <p className="text-xs text-[#72765A] font-sans">
                Official curator name, credentials, administrative email, and royal bio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Curator / Admin Full Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g. Yash Shakya"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] focus:ring-1 focus:ring-[#682C2C] font-sans"
                />
                <User className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Administrative Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="admin@bundelikalavrat.com"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] focus:ring-1 focus:ring-[#682C2C] font-sans"
                />
                <Mail className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans">
                Used to sign in to the Atelier Administration Console.
              </p>
            </div>

            {/* Atelier Title */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Atelier Title / Curatorial Designation
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.atelierTitle}
                  onChange={(e) => handleInputChange("atelierTitle", e.target.value)}
                  placeholder="Master Atelier Curator"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] focus:ring-1 focus:ring-[#682C2C] font-sans"
                />
                <Sparkles className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Role (Read-only for security) */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                System Privilege Tier
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={adminUser?.role?.toUpperCase() || "SUPERADMIN"}
                  className="w-full bg-[#ede6d8] border border-[#B89555]/30 rounded-sm pl-10 pr-4 py-2.5 text-xs font-mono font-bold text-[#682C2C] cursor-not-allowed uppercase"
                />
                <ShieldCheck className="w-4 h-4 text-[#682C2C] absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans">
                Managed under &apos;Admins & Users&apos; security matrix.
              </p>
            </div>

            {/* Curator Bio */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Curator Statement & Atelier Bio
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Custodian of Bundelkhand's rich artistic traditions, master paintings, and royal cultural heritage..."
                className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm p-3 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] focus:ring-1 focus:ring-[#682C2C] font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Direct Contact & WhatsApp Dispatch */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-md p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#B89555]/20 pb-4 mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#25D366]/10 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#292522]">
                Direct Contact & WhatsApp Dispatch
              </h2>
              <p className="text-xs text-[#72765A] font-sans">
                Mobile and WhatsApp channels for patron communications and direct commissions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mobile Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Direct Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.mobileNo}
                  onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-mono"
                />
                <Phone className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans">
                Primary voice calling line for patrons & suppliers.
              </p>
            </div>

            {/* WhatsApp Business / Commission Number */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                WhatsApp Business Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.whatsappNo}
                  onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8F4EA] border border-[#25D366]/50 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#25D366] font-mono"
                />
                <MessageCircle className="w-4 h-4 text-[#25D366] absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans flex items-center justify-between">
                <span>Direct WhatsApp chats for inquiries & custom art.</span>
                {formattedWhatsApp && (
                  <a
                    href={`https://wa.me/${formattedWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-0.5"
                  >
                    Test <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </p>
            </div>

            {/* Secondary / Landline Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Secondary / Atelier Landline
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 751 2345678"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-mono"
                />
                <Phone className="w-4 h-4 text-[#72765A] absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans">
                Gallery studio office desk line.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Atelier & Gallery Physical Address */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-md p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#B89555]/20 pb-4 mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#B89555]/10 border border-[#B89555]/40 flex items-center justify-center text-[#B89555]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#292522]">
                Atelier & Gallery Physical Address
              </h2>
              <p className="text-xs text-[#72765A] font-sans">
                Official headquarters and gallery location in Bundelkhand
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Street / Studio Address */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Street Address / Atelier Studio Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  placeholder="e.g. Near Raja Mahal, Kila Complex, Heritage Lane"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <MapPin className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                City / Heritage Town
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="Orchha / Jhansi / Khajuraho"
                className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                State / Province
              </label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                placeholder="Madhya Pradesh"
                className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
              />
            </div>

            {/* PIN Code / Postal Code */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Postal Code / PIN Code
              </label>
              <input
                type="text"
                value={formData.address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value)}
                placeholder="472246"
                className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-mono"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Country
              </label>
              <input
                type="text"
                value={formData.address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                placeholder="India"
                className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm px-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media Links & Digital Presence */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-md p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#B89555]/20 pb-4 mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#682C2C]/10 border border-[#682C2C]/30 flex items-center justify-center text-[#682C2C]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#292522]">
                Social Media Links & Digital Presence
              </h2>
              <p className="text-xs text-[#72765A] font-sans">
                Official handles and profiles displayed across Bundeli Kalavrat public portals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  Instagram Profile Link
                </span>
                {formData.socialLinks.instagram && (
                  <a
                    href={formData.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/bundeli_kalavrat"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <div className="absolute left-3 top-3 text-[#E4405F] pointer-events-none">
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
                  Facebook Page Link
                </span>
                {formData.socialLinks.facebook && (
                  <a
                    href={formData.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/bundelikalavrat"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <div className="absolute left-3 top-3 text-[#1877F2] pointer-events-none">
                  <FacebookIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Twitter / X */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <TwitterIcon className="w-3.5 h-3.5 text-[#292522]" />
                  Twitter / X Profile Link
                </span>
                {formData.socialLinks.twitter && (
                  <a
                    href={formData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  placeholder="https://x.com/bundeliart"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <div className="absolute left-3 top-3 text-[#292522] pointer-events-none">
                  <TwitterIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <YoutubeIcon className="w-3.5 h-3.5 text-[#CD201F]" />
                  YouTube Heritage Channel
                </span>
                {formData.socialLinks.youtube && (
                  <a
                    href={formData.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.youtube}
                  onChange={(e) => handleSocialChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@bundelikalavrat"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <div className="absolute left-3 top-3 text-[#CD201F] pointer-events-none">
                  <YoutubeIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  LinkedIn Organization / Curator Link
                </span>
                {formData.socialLinks.linkedin && (
                  <a
                    href={formData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/curator-bundeli"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <div className="absolute left-3 top-3 text-[#0A66C2] pointer-events-none">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Official Website */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#B89555]" />
                  Official Website / Gallery URL
                </span>
                {formData.socialLinks.website && (
                  <a
                    href={formData.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B89555] hover:underline flex items-center gap-0.5 normal-case font-normal"
                  >
                    View <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.socialLinks.website}
                  onChange={(e) => handleSocialChange("website", e.target.value)}
                  placeholder="https://bundelikalavrat.com"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <Globe className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Security & Master Password Update */}
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-md p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#B89555]/20 pb-4 mb-6">
            <div className="w-8 h-8 rounded-sm bg-[#682C2C]/10 border border-[#682C2C]/30 flex items-center justify-center text-[#682C2C]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#292522]">
                Security & Master Password
              </h2>
              <p className="text-xs text-[#72765A] font-sans">
                Leave password fields empty if you do not wish to change your administrative password
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-10 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <Key className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-[#72765A] hover:text-[#292522] cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-[#72765A] mt-1 font-sans">
                Required only to verify authorization for password changes.
              </p>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange("newPassword", e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-10 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <Lock className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-[#72765A] hover:text-[#292522] cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-[#292522] uppercase tracking-wider mb-2 font-sans">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-[#F8F4EA] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#292522] placeholder:text-[#72765A]/60 focus:outline-hidden focus:border-[#682C2C] font-sans"
                />
                <CheckCircle2
                  className={`w-4 h-4 absolute left-3 top-3 pointer-events-none ${
                    formData.newPassword && formData.confirmPassword === formData.newPassword
                      ? "text-emerald-600"
                      : "text-[#B89555]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="sticky bottom-4 z-20 bg-[#292522]/95 backdrop-blur-md border border-[#B89555]/50 rounded-md p-4 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#F8F4EA]/80 font-sans">
            <ShieldCheck className="w-4 h-4 text-[#B89555]" />
            <span className="hidden sm:inline">
              Changes update immediately across the Atelier Administration system & database.
            </span>
            <span className="sm:hidden">Changes will persist immediately.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving || loading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-[#38332f] hover:bg-[#48423d] text-[#F8F4EA]/90 hover:text-[#F8F4EA] text-xs font-semibold tracking-wider uppercase transition-colors border border-[#B89555]/30 cursor-pointer font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B89555]" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              disabled={saving || loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-bold uppercase tracking-widest rounded-sm shadow-xl transition-all font-sans cursor-pointer border border-[#B89555]/40 disabled:opacity-50"
            >
              <Save className={`w-4 h-4 text-[#B89555] ${saving ? "animate-spin" : ""}`} />
              <span>{saving ? "Saving Changes..." : "Save Atelier Profile"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

