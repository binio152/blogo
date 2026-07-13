import React from "react";
import Link from "next/link";

const BlogNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#DBF3FF] border border-black shadow-[-7px_7px_0_#65BBDF] mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#65BBDF]">404</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn't find the article you're looking for. It may have
          been moved, deleted, or the link might be incorrect.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium border border-black shadow-[-3px_3px_0_#DBF3FF] hover:shadow-[-2px_2px_0_#65BBDF] hover:bg-gray-800 active:shadow-none active:translate-x-[-1px] active:translate-y-[1px] transition-all"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-3">Or browse by category:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Technology", "Lifestyle", "Startup"].map((category) => (
                <Link
                  key={category}
                  href={`/?category=${category.toLowerCase()}`}
                  className="px-3 py-1 bg-[#DBF3FF] text-[#65BBDF] text-sm font-medium border border-black shadow-[-2px_2px_0_#65BBDF] hover:shadow-[-1px_1px_0_#65BBDF] transition-all"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNotFound;
