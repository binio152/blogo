"use client";
import React, { useState, useEffect } from "react";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { getUserRole } from "@/lib/roles";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  FileText,
  Eye,
  Shield,
  Calendar,
  Mail,
  Crown,
  Pencil,
  UserCircle,
  Info,
  Check,
  PenLine,
  ClipboardList,
  Home,
  Lightbulb,
} from "lucide-react";

const AdminPage = () => {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
  });

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/blog?authorId=${user.id}`);
          if (response.ok) {
            const blogs = await response.json();
            const totalViews = blogs.reduce(
              (sum, blog) => sum + (blog.views || 0),
              0
            );
            setStats({
              totalPosts: blogs.length,
              totalViews,
            });
          }
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    if (isLoaded && user) {
      fetchStats();
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#65BBDF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Please sign in to view your profile</p>
      </div>
    );
  }

  const fullName =
    user.fullName ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.username ||
    "User";
  const primaryEmail =
    user.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress || "user@email.com";
  const avatarUrl = user.imageUrl || user.profileImageUrl;
  const userRole = getUserRole(user);
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  const displayRole =
    userRole === "admin"
      ? "Administrator"
      : userRole === "author"
      ? "Author"
      : "Reader";

  const statsCards = [
    {
      label: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      color: "bg-blue-50",
    },
    {
      label: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "bg-green-50",
    },
    { label: "Role", value: displayRole, icon: Shield, color: "bg-purple-50" },
    {
      label: "Member Since",
      value: joinDate,
      icon: Calendar,
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">
          View your account information and activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.color} border border-black p-4 text-center shadow-[-4px_4px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all`}
            >
              <div className="flex justify-center mb-2">
                <IconComponent className="w-8 h-8 text-gray-700" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-black shadow-[-7px_7px_0_#DBF3FF] overflow-hidden">
        {/* Header Section with Avatar */}
        <div className="bg-gradient-to-r from-[#DBF3FF] to-[#65BBDF] border-b border-black p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 border-4 border-black rounded-full overflow-hidden bg-white shadow-[-5px_5px_0_rgba(0,0,0,0.3)] flex items-center justify-center">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={fullName}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {fullName}
              </h2>
              <p className="text-gray-700 mb-1 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {primaryEmail}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black mt-3">
                {userRole === "admin" ? (
                  <Crown className="w-5 h-5 text-yellow-600" />
                ) : userRole === "author" ? (
                  <Pencil className="w-5 h-5 text-blue-600" />
                ) : (
                  <UserCircle className="w-5 h-5 text-gray-600" />
                )}
                <span className="font-bold text-gray-900">{displayRole}</span>
              </div>
            </div>

            {/* Edit Button - Opens Manage Account */}
            <div>
              <button
                onClick={() => openUserProfile()}
                className="px-6 py-3 bg-white text-gray-900 font-bold border-2 border-black shadow-[-4px_4px_0_rgba(0,0,0,0.2)] hover:shadow-[-6px_6px_0_rgba(0,0,0,0.3)] active:shadow-[-2px_2px_0_rgba(0,0,0,0.2)] transition-all rounded-none focus:outline-none"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Account Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-4 rounded">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-2">
                User ID
              </label>
              <p className="text-gray-900 font-mono text-sm break-all">
                {user.id}
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-2">
                Username
              </label>
              <p className="text-gray-900">{user.username || "Not set"}</p>
            </div>

            <div className="border border-gray-200 p-4 rounded">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-2">
                Joined Date
              </label>
              <p className="text-gray-900">{joinDate}</p>
            </div>

            <div className="border border-gray-200 p-4 rounded">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-2">
                Account Status
              </label>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 border border-green-700 font-medium">
                <Check className="w-4 h-4" />
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-black bg-gray-50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/addProduct"
              className="px-4 py-2 bg-[#65BBDF] text-white font-medium border border-black shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#DBF3FF] transition-all flex items-center gap-2"
            >
              <PenLine className="w-4 h-4" /> Create New Post
            </Link>
            <Link
              href="/admin/blogList"
              className="px-4 py-2 bg-white text-gray-900 font-medium border border-black shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#DBF3FF] transition-all flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" /> Manage Posts
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-white text-gray-900 font-medium border border-black shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#DBF3FF] transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> View Homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-black">
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
          <strong>Note:</strong> Click your avatar above to manage your profile,
          security settings, and more.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
