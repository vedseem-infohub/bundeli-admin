"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  Shield,
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function AdminLoginPage() {
  const { loginAdmin } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both administrative email and password.");
      return;
    }

    setIsLoading(true);

    try {
      await loginAdmin(email.trim(), password);
    } catch (err) {
      setErrorMessage(
        err?.message ||
          "Access Denied: Invalid credentials or account lacks administrative privileges."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1B19] text-[#F8F4EA] flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Decorative Gold Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#B89555]/15 via-transparent to-transparent pointer-events-none rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#682C2C]/25 via-transparent to-transparent pointer-events-none rounded-tr-full" />

      {/* Top Navbar */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#B89555]/20 bg-[#292522]/60 backdrop-blur-xs relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#682C2C] border border-[#B89555] flex items-center justify-center font-serif text-lg font-bold text-[#F8F4EA] shadow-md">
            BK
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-wide text-[#F8F4EA] leading-tight">
              BUNDELI KALAVRAT
            </h1>
            <p className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B89555]">
              Royal Atelier Administration
            </p>
          </div>
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#B89555] hover:text-[#F8F4EA] border border-[#B89555]/40 px-3 py-1.5 rounded-sm transition-colors group"
        >
          <span>Public Gallery</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-md bg-[#292522] border border-[#B89555]/40 rounded-sm p-8 sm:p-10 shadow-2xl space-y-6 relative">
          {/* Insignia & Heading */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#682C2C] border-2 border-[#B89555] flex items-center justify-center shadow-lg text-[#F8F4EA] mb-3">
              <Shield className="w-7 h-7 text-[#B89555]" />
            </div>

            <span className="text-[10px] font-sans uppercase font-bold tracking-[0.25em] text-[#B89555] block">
              STRICT CURATORIAL AUTHENTICATION
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F4EA]">
              Atelier Admin Access
            </h2>

            <p className="text-xs text-[#E9DFCD]/70 font-light leading-relaxed">
              Sign in with your verified royal atelier administrator or curator credentials to manage catalog assets.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-[#682C2C]/40 border border-red-400 text-red-200 text-xs rounded-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#E9DFCD] mb-1.5">
                Administrative Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bundelikalavrat.com"
                  className="w-full bg-[#1F1B19] border border-[#B89555]/40 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#F8F4EA] placeholder:text-[#72765A] focus:outline-hidden focus:border-[#B89555] transition-colors"
                />
                <Mail className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#E9DFCD] mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#1F1B19] border border-[#B89555]/40 rounded-sm pl-10 pr-10 py-2.5 text-xs text-[#F8F4EA] placeholder:text-[#72765A] focus:outline-hidden focus:border-[#B89555] transition-colors"
                />
                <Lock className="w-4 h-4 text-[#B89555] absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#72765A] hover:text-[#B89555] absolute right-3 top-2.5 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-[#682C2C] hover:bg-[#522222] border border-[#B89555] text-[#F8F4EA] text-xs font-semibold uppercase tracking-widest rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#B89555]" />
              <span>{isLoading ? "Verifying Credentials..." : "Authenticate as Atelier Admin"}</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-[#72765A] border-t border-[#B89555]/15 bg-[#292522]/60">
        Bundeli Kalavrat Atelier • Preserving 17th-Century Central Indian Classical Heritage
      </footer>
    </div>
  );
}

