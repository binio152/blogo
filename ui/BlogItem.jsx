import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BlogItem = ({ props }) => {
  return (
    <div className="w-full bg-white border-2 border-black hover:shadow-[-6px_6px_0_#65BBDF] transition-all duration-200 flex flex-col h-[500px]">
      {/* Image Section - Fixed Height */}
      <Link href={`/blog/${props._id || props.id}`} className="block">
        <div className="relative w-full h-[200px] border-b-2 border-black overflow-hidden bg-gray-100">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content Section - Flexible */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-[#DBF3FF] text-[#65BBDF] font-semibold text-xs">
            {props.category}
          </span>
        </div>

        {/* Title - Fixed 2 lines */}
        <Link href={`/blog/${props._id || props.id}`} className="block mb-2">
          <h5 className="font-medium text-lg tracking-tight text-gray-900 line-clamp-2 min-h-[56px] hover:text-[#65BBDF] transition-colors">
            {props.title}
          </h5>
        </Link>

        {/* Description - Fixed 3 lines */}
        <div
          className="text-sm text-gray-600 line-clamp-3 tracking-tight mb-4 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: props.description?.substring(0, 200) + "..." || "",
          }}
        />

        {/* Read More Button - Bottom */}
        <Link
          href={`/blog/${props._id || props.id}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white font-medium text-sm border-2 border-black shadow-[-4px_4px_0_#DBF3FF] hover:shadow-[-3px_3px_0_#65BBDF] hover:bg-gray-700 active:shadow-none active:translate-x-[-1px] active:translate-y-[1px] transition-all duration-200 mt-auto"
        >
          <span className="text-white">Read more</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
