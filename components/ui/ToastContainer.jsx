"use client";

import React from "react";
import { useAdmin } from "@/context/AdminContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useAdmin();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === "error";
        const isInfo = toast.type === "info";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-sm shadow-xl border text-xs font-sans transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${
              isError
                ? "bg-[#682C2C] text-[#F8F4EA] border-[#B89555]"
                : isInfo
                ? "bg-[#292522] text-[#F8F4EA] border-[#B89555]/40"
                : "bg-[#FAF7F0] text-[#292522] border-[#B89555]/60"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isError ? (
                <AlertCircle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
              ) : isInfo ? (
                <Info className="w-4 h-4 text-[#B89555] shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed font-medium">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#292522]/50 hover:text-[#292522] transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

