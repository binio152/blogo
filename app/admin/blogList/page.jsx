"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getUserRole, canEditBlog, canDeleteBlog, ROLES } from "@/lib/roles";
import { toast } from "react-toastify";

const BlogListPage = () => {
  const { user, isLoaded } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'my-posts'

  useEffect(() => {
    if (isLoaded) {
      fetchBlogs();
    }
  }, [isLoaded, filter]);

  const fetchBlogs = async () => {
    try {
      let url = "/api/blog";

      // If filtering by my posts, add authorId parameter
      if (filter === "my-posts" && user) {
        url += `?authorId=${user.id}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, authorId) => {
    if (!canDeleteBlog(user, authorId)) {
      toast.error("You don't have permission to delete this post");
      return;
    }

    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog deleted successfully!");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete blog post");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting blog post");
    }
  };

  const toggleStatus = async (id, currentStatus, authorId) => {
    if (!canEditBlog(user, authorId)) {
      toast.error("You don't have permission to edit this post");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "status",
        currentStatus === "published" ? "draft" : "published"
      );

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("Status updated successfully!");
        fetchBlogs(); // Refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Toggle status error:", err);
      toast.error("Error updating status");
    }
  };

  const userRole = user ? getUserRole(user) : ROLES.READER;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#65BBDF] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog List</h1>
          <p className="text-gray-600">
            Manage {filter === "my-posts" ? "your" : "all"} blog posts (
            {blogs.length} total)
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 border border-black font-medium transition-all ${
              filter === "all"
                ? "bg-[#65BBDF] text-white shadow-[-3px_3px_0_#DBF3FF]"
                : "bg-white text-gray-700 hover:shadow-[-2px_2px_0_#DBF3FF]"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setFilter("my-posts")}
            className={`px-4 py-2 border border-black font-medium transition-all ${
              filter === "my-posts"
                ? "bg-[#65BBDF] text-white shadow-[-3px_3px_0_#DBF3FF]"
                : "bg-white text-gray-700 hover:shadow-[-2px_2px_0_#DBF3FF]"
            }`}
          >
            My Posts
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 border border-black bg-red-50 text-red-700 shadow-[-3px_3px_0_#65BBDF]">
          {error}
        </div>
      )}

      {/* Blog List */}
      {blogs.length === 0 ? (
        <div className="bg-white border border-black p-12 text-center shadow-[-7px_7px_0_#DBF3FF]">
          <p className="text-gray-600 text-lg mb-4">No blog posts yet</p>
          <a
            href="/admin/addProduct"
            className="inline-block px-6 py-3 bg-[#65BBDF] text-white font-bold border border-black shadow-[-4px_4px_0_#DBF3FF] hover:shadow-[-5px_5px_0_#DBF3FF] transition-all"
          >
            Create Your First Post
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-black p-6 shadow-[-5px_5px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  {blog.image ? (
                    <div className="relative w-full sm:w-48 h-32 border border-black overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full sm:w-48 h-32 border border-black bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                        {blog.title}
                      </h3>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-[#DBF3FF] text-[#65BBDF] border border-black">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {blog.author_img && (
                        <div className="relative w-8 h-8 border border-black rounded-full overflow-hidden">
                          <Image
                            src={blog.author_img}
                            alt={blog.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {blog.author}
                        </p>
                        <p className="text-xs">
                          {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                          {blog.views || 0} views
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium border border-black ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status || "published"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      <Link
                        href={`/blog/${blog._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white text-gray-800 text-sm font-medium border border-black shadow-[-2px_2px_0_#DBF3FF] hover:shadow-[-3px_3px_0_#65BBDF] transition-all"
                      >
                        View
                      </Link>

                      {canEditBlog(user, blog.authorId) && (
                        <>
                          <Link
                            href={`/admin/editBlog/${blog._id}`}
                            className="px-4 py-2 bg-[#65BBDF] text-white text-sm font-medium border border-black shadow-[-2px_2px_0_#DBF3FF] hover:shadow-[-3px_3px_0_#65BBDF] transition-all"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              toggleStatus(blog._id, blog.status, blog.authorId)
                            }
                            className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium border border-black shadow-[-2px_2px_0_#DBF3FF] hover:shadow-[-3px_3px_0_yellow-300] transition-all"
                          >
                            {blog.status === "published" ? "Draft" : "Publish"}
                          </button>
                        </>
                      )}

                      {canDeleteBlog(user, blog.authorId) && (
                        <button
                          onClick={() => handleDelete(blog._id, blog.authorId)}
                          className="px-4 py-2 bg-red-500 text-white text-sm font-medium border border-black shadow-[-2px_2px_0_#DBF3FF] hover:shadow-[-3px_3px_0_red-300] transition-all"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
