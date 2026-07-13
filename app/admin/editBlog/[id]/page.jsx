"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { canEditBlog } from "@/lib/roles";
import RichTextEditor from "@/components/RichTextEditor";
import "@/components/RichTextEditor.css";
import { User, Upload } from "lucide-react";

const EditBlogPage = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "published",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) throw new Error("Blog not found");

        const data = await response.json();
        setBlog(data);

        // Check permission
        if (isLoaded && user && !canEditBlog(user, data.authorId)) {
          toast.error("You don't have permission to edit this post");
          router.push("/admin/blogList");
          return;
        }

        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          status: data.status || "published",
        });
        setImagePreview(data.image);
      } catch (error) {
        toast.error(error.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (id && isLoaded) {
      fetchBlog();
    }
  }, [id, isLoaded, user, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("status", formData.status);

      const imageInput = document.querySelector('input[name="image"]');
      if (imageInput?.files[0]) {
        form.append("image", imageInput.files[0]);
      }

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success("Blog post updated successfully! Redirecting...");

        // Redirect to the updated blog post after 3 seconds
        setTimeout(() => {
          router.push(`/blog/${id}`);
        }, 3000);
      } else {
        toast.error(data.message || "Failed to update blog post");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#65BBDF] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Edit Blog Post
        </h1>
        <p className="text-gray-600">Update your blog article</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Container */}
        <div className="bg-white border border-black p-6 shadow-[-7px_7px_0_#DBF3FF]">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter blog title..."
              className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#65BBDF] shadow-[-2px_2px_0_#DBF3FF]"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Description / Content *
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={(html) =>
                setFormData({ ...formData, description: html })
              }
              placeholder="Write your blog content with rich formatting..."
            />
            <p className="mt-2 text-xs text-gray-500">
              Use the toolbar to format your text with headings, lists, quotes,
              and more.
            </p>
          </div>

          {/* Category and Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="e.g. Technology, Lifestyle..."
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#65BBDF] shadow-[-2px_2px_0_#DBF3FF] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#65BBDF] shadow-[-2px_2px_0_#DBF3FF] bg-white"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Author Info - Display Only */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Author
            </label>
            <div className="flex items-center gap-3 px-4 py-3 border border-black bg-gray-50">
              <div className="w-10 h-10 rounded-full border border-black overflow-hidden bg-white flex items-center justify-center">
                {blog.author_img ? (
                  <Image
                    src={blog.author_img}
                    alt="Author"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span className="font-semibold text-gray-900">{blog.author}</span>
            </div>
          </div>

          {/* Blog Image */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Blog Cover Image
            </label>
            <div className="border border-black border-dashed p-4 text-center bg-gray-50">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover border border-black"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm border border-black hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
                    <Upload className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Upload New Image</p>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-3 w-full text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to keep current image
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 py-3 px-6 font-bold border border-black shadow-[-5px_5px_0_#DBF3FF] transition-all ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#65BBDF] text-white hover:shadow-[-6px_6px_0_#65BBDF]"
            }`}
          >
            {saving ? "Updating..." : "Update Blog Post"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/blogList")}
            className="px-6 py-3 bg-white text-gray-700 font-bold border border-black shadow-[-5px_5px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
