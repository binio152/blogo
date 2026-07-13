import React from "react";

const BlogLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#65BBDF] mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Article
        </h2>
        <p className="text-gray-600">
          Please wait while we fetch the content...
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#65BBDF] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[#65BBDF] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#65BBDF] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoading;
