"use client";
import AdminSideBar from "@/ui/AdminSideBar";
import { useState } from "react";
import { BookText, Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col sm:flex-row">
      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-white border-b border-black">
        <div className="flex items-center gap-2">
          <BookText className="w-6 h-6 text-[#65BBDF]" />
          <span className="text-xl font-black text-gray-900">Blogo</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-4 py-2 border border-black bg-[#DBF3FF] shadow-[-3px_3px_0_#65BBDF] active:shadow-none"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile toggleable */}
      <div
        className={`
          fixed sm:static inset-0 z-50 sm:z-auto
          transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }
        `}
      >
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className="relative z-10">
          <AdminSideBar onNavigate={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
