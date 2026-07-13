"use client";
import React, { useEffect, useState } from "react";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!content) return;

    // Extract headings from HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headingElements = tempDiv.querySelectorAll("h2, h3");
    
    const headingsList = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      return {
        id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setHeadings(headingsList);

    // Add IDs to actual headings in the DOM
    const articleHeadings = document.querySelectorAll(".article-content h2, .article-content h3");
    articleHeadings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    articleHeadings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      articleHeadings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [content]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="border border-black p-6 shadow-[-7px_7px_0_#DBF3FF] bg-white">
      <h3 className="font-semibold text-gray-900 mb-4 text-lg">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block text-sm transition-colors ${
              heading.level === 3 ? "pl-4" : ""
            } ${
              activeId === heading.id
                ? "text-[#65BBDF] font-medium"
                : "text-gray-600 hover:text-[#4aa3d1]"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
