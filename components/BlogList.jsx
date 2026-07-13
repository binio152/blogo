"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "../ui/BlogItem";

/**
 * BlogList Component
 * Displays a filterable and searchable grid of blog posts
 *
 * Features:
 * - Category filtering
 * - Search by title (from parent SearchBar)
 * - Loading and error states
 * - Responsive grid layout
 * - Optional limit for displaying a subset of posts
 *
 * @param {string} searchTerm - Search query from SearchBar component
 * @param {number} limit - Optional limit for number of posts to display (for home page)
 */
const BlogList = ({ searchTerm = "", limit = null }) => {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State for storing fetched blog posts
  const [blogs, setBlogs] = useState([]);

  // Loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Error state for API failures
  const [error, setError] = useState(null);

  // Fetch published blogs from API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Fetch only published blogs
        const response = await fetch("/api/blog?status=published");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Extract unique categories from fetched blogs
  // Always include "All" option first
  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  // Filter blogs based on both category and search term
  let filteredBlogs = blogs.filter((item) => {
    // Check if blog matches selected category
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    // Check if blog title contains search term (case-insensitive)
    const matchesSearch =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Blog must match both filters
    return matchesCategory && matchesSearch;
  });

  // Apply limit if specified (for home page showing latest 10 posts)
  if (limit && !searchTerm && selectedCategory === "All") {
    filteredBlogs = filteredBlogs.slice(0, limit);
  }

  // Loading State - Show spinner while fetching data
  if (loading) {
    return (
      <div className="my-10 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-black border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  // Error State - Show error message if fetch failed
  if (error) {
    return (
      <div className="my-10 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Empty State - Show message if no blogs exist
  if (blogs.length === 0) {
    return (
      <div className="my-10 text-center">
        <p className="text-gray-600">
          No blogs found. Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 sm:mb-15">
      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-3 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`border border-solid border-black py-1.5 px-4 hover:bg-[#333] hover:text-[#fff] active:bg-[#555] active:text-[#fff] transition-colors duration-200 ${
              selectedCategory === category ? "bg-[#333] text-[#fff]" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid - Responsive layout: 1 col mobile, 2 tablet, 3 desktop */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-5 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {filteredBlogs.length > 0 ? (
          // Render filtered blog items
          filteredBlogs.map((item) => <BlogItem key={item._id} props={item} />)
        ) : (
          // Show message when no results match filters
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600">
              {searchTerm
                ? `No blogs found matching "${searchTerm}"`
                : "No blogs found in this category"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
