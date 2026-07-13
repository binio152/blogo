"use client";
import { useState } from "react";
import BlogList from "@/components/BlogList";
import SearchBar from "@/components/SearchBar";

/**
 * Blog Page - Shows all published blog posts
 * Features search functionality and category filtering
 */
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      {/* All Blog Posts Section - Only on /blog page */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              All Blog Posts
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Search for articles and insights by title.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by title..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog List - Shows all posts (no limit) */}
      <BlogList searchTerm={searchTerm} />
    </>
  );
}
