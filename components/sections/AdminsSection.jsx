"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { api } from "@/lib/api";
import {
  Users,
  Shield,
  ShieldAlert,
  UserPlus,
  Trash2,
  Mail,
  Calendar,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminsSection({ onAddAdmin }) {
  const { users, setUsers, adminUser, addToast } = useAdmin();
  const [roleFilter, setRoleFilter] = useState("all");
  const [expandedUserId, setExpandedUserId] = useState(null);

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    return true;
  });

  const handleRoleChange = async (targetUser, newRole) => {
    try {
      await api.updateUserRole(targetUser._id || targetUser.id, newRole);
      setUsers((prev) =>
        prev.map((u) =>
          (u._id || u.id) === (targetUser._id || targetUser.id) ? { ...u, role: newRole } : u
        )
      );
      addToast(`Role updated to "${newRole}" for user "${targetUser.name}".`);
    } catch (err) {
      addToast(err?.message || "Failed to update user role.", "error");
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if ((targetUser._id || targetUser.id) === adminUser?.id) {
      alert("You cannot delete your own active admin account.");
      return;
    }
    if (
      !confirm(
        `Are you sure you want to delete account for "${targetUser.name}" (${targetUser.email})?`
      )
    )
      return;

    try {
      await api.deleteUser(targetUser._id || targetUser.id);
      setUsers((prev) =>
        prev.filter((u) => (u._id || u.id) !== (targetUser._id || targetUser.id))
      );
      addToast(`Account for "${targetUser.name}" deleted.`);
    } catch (err) {
      addToast(err?.message || "Failed to delete user.", "error");
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "superadmin":
        return "bg-[#B89555] text-[#292522] border-[#917135]";
      case "admin":
        return "bg-[#682C2C] text-[#F8F4EA] border-[#B89555]";
      case "curator":
        return "bg-[#72765A] text-[#F8F4EA] border-[#555843]";
      default:
        return "bg-[#FAF7F0] text-[#292522] border-[#B89555]/30";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F0] border border-[#B89555]/30 p-5 rounded-sm shadow-xs">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#682C2C] font-semibold flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#B89555]" />
            CURATORIAL ACCESS & PATRON ACCOUNTS
          </span>
          <h3 className="font-serif text-lg font-bold text-[#292522]">
            Atelier Admins & Registered Users ({users.length})
          </h3>
          <p className="text-xs text-[#72765A] font-sans">
            Manage administrative privileges, assign curator permissions, and review authenticated patrons and their selected artworks.
          </p>
        </div>

        <button
          onClick={onAddAdmin}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#682C2C] hover:bg-[#522222] text-[#F8F4EA] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#B89555]" />
          <span>+ Create New Admin</span>
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-sans">
        <button
          onClick={() => setRoleFilter("all")}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            roleFilter === "all"
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          All Accounts ({users.length})
        </button>
        <button
          onClick={() => setRoleFilter("admin")}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            roleFilter === "admin"
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          Admins ({users.filter((u) => u.role === "admin").length})
        </button>
        <button
          onClick={() => setRoleFilter("superadmin")}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            roleFilter === "superadmin"
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          Superadmins ({users.filter((u) => u.role === "superadmin").length})
        </button>
        <button
          onClick={() => setRoleFilter("curator")}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            roleFilter === "curator"
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          Curators ({users.filter((u) => u.role === "curator").length})
        </button>
        <button
          onClick={() => setRoleFilter("user")}
          className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
            roleFilter === "user"
              ? "bg-[#682C2C] text-[#F8F4EA] font-semibold"
              : "bg-[#FAF7F0] border border-[#B89555]/30 text-[#292522] hover:bg-[#E9DFCD]"
          }`}
        >
          Patrons & Users ({users.filter((u) => u.role === "user" || !u.role).length})
        </button>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 p-12 text-center rounded-sm space-y-3">
          <Users className="w-8 h-8 text-[#B89555] mx-auto" />
          <p className="font-serif text-lg text-[#292522]">No Users in this Filter</p>
          <button
            onClick={onAddAdmin}
            className="px-4 py-2 bg-[#682C2C] text-[#F8F4EA] text-xs uppercase tracking-wider rounded-sm cursor-pointer"
          >
            Create New Admin
          </button>
        </div>
      ) : (
        <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm overflow-hidden shadow-art">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F4EFE6] border-b border-[#B89555]/20 text-[11px] uppercase tracking-wider text-[#682C2C] font-semibold">
                <tr>
                  <th className="py-3 px-4">User / Admin Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role Permission</th>
                  <th className="py-3 px-4">Selected Artworks</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B89555]/15">
                {filteredUsers.map((u, idx) => {
                  const isExpanded = expandedUserId === (u._id || u.id);
                  const selectionsCount = (u.selectedArtworks && u.selectedArtworks.length) || 0;

                  return (
                    <React.Fragment key={u._id || u.id || idx}>
                      <tr className="hover:bg-[#F8F4EA] transition-colors">
                        {/* Name */}
                        <td className="py-3.5 px-4 font-bold font-serif text-sm text-[#292522]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#682C2C] text-[#F8F4EA] flex items-center justify-center font-serif text-xs font-bold shrink-0">
                              {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <span>{u.name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4 text-[#72765A]">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#B89555]" />
                            <span>{u.email}</span>
                          </div>
                        </td>

                        {/* Role Selector */}
                        <td className="py-3.5 px-4">
                          <select
                            value={u.role || "user"}
                            onChange={(e) => handleRoleChange(u, e.target.value)}
                            className={`border text-[11px] font-sans uppercase font-bold rounded-xs px-2.5 py-1 focus:outline-hidden cursor-pointer ${getRoleBadgeClass(
                              u.role
                            )}`}
                          >
                            <option value="user">User (Patron)</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                            <option value="curator">Curator</option>
                          </select>
                        </td>

                        {/* Selected Artworks */}
                        <td className="py-3.5 px-4">
                          {selectionsCount > 0 ? (
                            <button
                              onClick={() =>
                                setExpandedUserId(isExpanded ? null : u._id || u.id)
                              }
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#25D366]/20 text-[#0C381E] border border-[#25D366]/40 font-semibold text-[11px] cursor-pointer hover:bg-[#25D366]/30 transition-colors"
                            >
                              <BookmarkCheck className="w-3 h-3 text-[#25D366]" />
                              <span>{selectionsCount} Selected</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          ) : (
                            <span className="text-[#72765A]/60 text-[11px]">None</span>
                          )}
                        </td>

                        {/* Joined Date */}
                        <td className="py-3.5 px-4 text-[#72765A] text-[11px]">
                          {new Date(u.createdAt || Date.now()).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Delete action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 rounded-sm bg-[#F8F4EA] hover:bg-red-50 text-red-700 border border-red-300 transition-colors cursor-pointer"
                            title="Delete user account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded View for User Selected Artworks */}
                      {isExpanded && selectionsCount > 0 && (
                        <tr className="bg-[#F4EFE6]/60">
                          <td colSpan={6} className="p-4">
                            <div className="bg-[#FAF7F0] border border-[#B89555]/30 rounded-sm p-4 space-y-2">
                              <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#682C2C]">
                                Artworks Selected by {u.name}:
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                                {u.selectedArtworks.map((selItem, sIdx) => (
                                  <div
                                    key={selItem._id || sIdx}
                                    className="flex items-center gap-3 p-2 bg-[#F8F4EA] border border-[#B89555]/20 rounded-sm"
                                  >
                                    {selItem.image ? (
                                      <img
                                        src={selItem.image}
                                        alt={selItem.title}
                                        className="w-10 h-10 object-cover rounded-sm border border-[#B89555]/20"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 bg-[#E9DFCD] rounded-sm flex items-center justify-center text-xs font-bold text-[#682C2C]">
                                        BK
                                      </div>
                                    )}
                                    <div className="min-w-0">
                                      <p className="font-serif font-bold text-xs text-[#292522] truncate">
                                        {selItem.title}
                                      </p>
                                      <span className="text-[10px] text-[#25D366] font-semibold block">
                                        {selItem.status || "Selected"}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

