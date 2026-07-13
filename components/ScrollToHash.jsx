"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToHash Component
 * Automatically scrolls to hash anchor when page loads
 * Accounts for sticky header offset
 * Usage: Add to any page that needs hash anchor scrolling
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    // Get hash from URL
    const hash = window.location.hash;

    if (hash) {
      // Wait for page to fully load
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          // Calculate offset for sticky header (header height + padding)
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [pathname]);

  return null;
}
