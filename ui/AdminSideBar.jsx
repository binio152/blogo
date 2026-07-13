"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  PlusCircle,
  BookOpen,
  LogOut,
  ArrowLeft,
  BookText,
  User,
} from "lucide-react";

/**
 * AdminSideBar Component
 * Navigation sidebar for admin dashboard with user profile and menu items
 * Features Clerk authentication integration and active route highlighting
 *
 * @param {Function} onNavigate - Optional callback when navigation occurs
 */
const AdminSideBar = ({ onNavigate }) => {
  // Get current route path for highlighting active menu item
  const pathname = usePathname();

  // Get authenticated user data from Clerk
  const { user } = useUser();

  // Define navigation menu items with icons and routes
  const menuItems = [
    {
      href: "/admin/addProduct",
      icon: PlusCircle,
      label: "Add New",
    },
    {
      href: "/admin/blogList",
      icon: BookOpen,
      label: "Blog List",
    },
  ];

  return (
    <aside className="w-full sm:w-64 bg-white border-r-4 border-black min-h-screen flex flex-col">
      {/* Logo Section - Brand identity and page title */}
      <div className="p-6 border-b-4 border-black bg-[#DBF3FF]">
        <Link
          href="/"
          className="flex items-center gap-2 justify-center sm:justify-start"
        >
          <BookText className="w-8 h-8 text-[#65BBDF]" />
          <span className="text-2xl font-black text-gray-900">Blogo</span>
        </Link>
      </div>

      {/* User Profile Section - Display Clerk authenticated user info */}
      {user && (
        <div className="p-4 border-b-4 border-black bg-white">
          <div className="flex items-center gap-3">
            {/* User Avatar - Synced from Clerk */}
            <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden bg-gray-100 shadow-[-2px_2px_0_rgba(0,0,0,0.2)] flex items-center justify-center">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
            </div>
            {/* User Details */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 truncate">
                {user.fullName || user.username || "User"}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user.primaryEmailAddress?.emailAddress || ""}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
          Content
        </h3>
        <ul className="space-y-2 mb-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onNavigate?.()}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-none
                    border-2 border-black font-medium text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#65BBDF] text-white shadow-[-4px_4px_0_#DBF3FF]"
                        : "bg-white text-gray-900 shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#65BBDF] hover:bg-[#DBF3FF]"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Account Section */}
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
          Account
        </h3>
        <ul className="space-y-2">
          {/* Profile Link with Avatar */}
          <li>
            <Link
              href="/admin"
              onClick={() => onNavigate?.()}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-none
                border border-black font-medium text-sm
                transition-all duration-200
                ${
                  pathname === "/admin"
                    ? "bg-[#65BBDF] text-white shadow-[-4px_4px_0_#DBF3FF]"
                    : "bg-white text-gray-800 shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#65BBDF] hover:bg-[#DBF3FF]"
                }
              `}
            >
              <div className="w-5 h-5 flex-shrink-0 rounded-full overflow-hidden border border-black flex items-center justify-center bg-gray-100">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3 h-3 text-gray-400" />
                )}
              </div>
              <span>Edit Profile</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li>
            <SignOutButton redirectUrl="/">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-none
                  border-2 border-black font-medium text-sm
                  bg-white text-red-600 shadow-[-3px_3px_0_#DBF3FF] 
                  hover:shadow-[-4px_4px_0_#FFE5E5] hover:bg-red-50
                  transition-all duration-200"
              >
                <LogOut className="w-5 h-5 flex-shrink-0 text-red-600" />
                <span className="text-red-600">Logout</span>
              </button>
            </SignOutButton>
          </li>
        </ul>
      </nav>

      {/* Bottom Section - Quick Actions */}
      <div className="p-4 border-t-4 border-black bg-gray-50 mt-auto">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-gray-900 text-sm font-medium shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#65BBDF] hover:bg-[#DBF3FF] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 text-gray-900" />
          <span className="text-gray-900">Back to Blog</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSideBar;
