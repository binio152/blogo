"use client";
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";

/**
 * SearchBar Component
 * Provides a search input with debounce functionality to search blogs by title
 *
 * @param {Function} onSearch - Callback function to handle search query
 */
const SearchBar = ({ onSearch }) => {
  // State for storing the current search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search term - delays search execution by 500ms after user stops typing
  // This prevents excessive API calls while user is still typing
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Auto-trigger search when debounced value changes
  // This creates a "search as you type" experience with performance optimization
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  /**
   * Handle form submission (when user presses Enter)
   * Triggers immediate search without waiting for debounce
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  /**
   * Clear the search input and reset search results
   * onSearch will be called automatically via useEffect when searchTerm becomes empty
   */
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="text-center my-8">
      {/* Search Form with neobrutalism styling */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-8 border border-black shadow-[-7px_7px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all duration-200"
      >
        {/* Search Input Container */}
        <div className="flex items-center flex-1 pl-4">
          {/* Search Icon */}
          <Search className="w-5 h-5 text-gray-400 mr-2" />

          {/* Text Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="flex-1 outline-none py-2"
          />

          {/* Clear Button - Only show when there's text */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="border-l border-black font-medium py-2 px-4 hover:bg-[#333] hover:text-white active:bg-[#555] transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
