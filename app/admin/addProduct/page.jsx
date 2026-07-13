"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/RichTextEditor";
import "@/components/RichTextEditor.css";
import { User, Upload } from "lucide-react";

const AddProductPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Author info from Clerk user
  const [authorInfo, setAuthorInfo] = useState({
    name: "",
    avatar: "",
  });

  // Load author info from Clerk user
  useEffect(() => {
    if (isLoaded && user) {
      const fullName =
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "User";
      const avatarUrl = user.imageUrl || user.profileImageUrl || null;

      setAuthorInfo({
        name: fullName,
        avatar: avatarUrl,
      });
    }
  }, [user, isLoaded]);

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
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("author", authorInfo.name); // From Clerk user

      const imageInput = document.querySelector('input[name="image"]');

      // Append blog image if selected
      if (imageInput.files[0]) {
        form.append("image", imageInput.files[0]);
      } else {
        toast.error("Please upload a blog cover image");
        setLoading(false);
        return;
      }

      // Append author image URL from Clerk
      if (authorInfo.avatar) {
        // Download image from Clerk URL and convert to blob
        try {
          const avatarResponse = await fetch(authorInfo.avatar);
          const avatarBlob = await avatarResponse.blob();
          form.append("author_img", avatarBlob, "author-avatar.jpg");
        } catch (error) {
          console.error("Error fetching author avatar:", error);
          // Use default if fetch fails
          form.append("author_img_url", authorInfo.avatar);
        }
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success("Blog post created successfully! Redirecting to home...");

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
        });
        setImagePreview(null);

        // Reset file input
        if (imageInput) {
          imageInput.value = "";
        }

        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        toast.error(data.message || "Failed to create blog post");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Blog Post
        </h1>
        <p className="text-gray-600">Create and publish a new blog article</p>
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

          {/* Category & Author Grid */}
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

            {/* Author Info - Display Only */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Author (from your profile)
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border border-black bg-gray-50">
                <div className="w-10 h-10 rounded-full border border-black overflow-hidden bg-white flex items-center justify-center">
                  {authorInfo.avatar ? (
                    <Image
                      src={authorInfo.avatar}
                      alt="Author"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <span className="font-semibold text-gray-900">
                  {authorInfo.name || "Loading..."}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Update your profile to change author information
              </p>
            </div>
          </div>

          {/* Image Uploads Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full h-48 object-cover border border-black"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs border border-black"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-3">
                      <Upload className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Upload Blog Image</p>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-3 w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-4 p-4 bg-blue-50 border border-black">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Author information is automatically taken
              from your profile. To change the author name or avatar, please
              update your profile settings.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 px-6 bg-[#65BBDF] text-white font-bold border border-black shadow-[-5px_5px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#DBF3FF] active:shadow-none active:translate-x-[-2px] active:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Blog Post"}
          </button>
          <button
            type="reset"
            onClick={() => {
              setFormData({
                title: "",
                description: "",
                category: "",
                author: "",
              });
              setImagePreview(null);
              setAuthorImagePreview(null);
            }}
            className="px-6 py-4 bg-white text-gray-800 font-bold border border-black shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-4px_4px_0_#65BBDF] active:shadow-none transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
