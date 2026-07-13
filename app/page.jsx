"use client";
import BlogList from "@/components/BlogList";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import React, { useState } from "react";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="bg-white">
      <Header />

      {/* Latest Blog Section - Only on Home Page */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Latest Blog
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

      {/* Blog List - Limited to 10 posts on home page */}
      <BlogList searchTerm={searchTerm} limit={10} />
    </main>
  );
};

export default HomePage;
