import Link from "next/link";
import React from "react";
import {
  Facebook,
  Twitter,
  Mail,
  BookText,
  Github,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 sm:py-8 md:py-12 px-3 sm:px-5 md:px-12 lg:px-28">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4 justify-center sm:justify-start">
              <BookText className="w-8 h-8 sm:w-10 sm:h-10 text-[#65BBDF]" />
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Blogo
              </h2>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed tracking-tight max-w-[250px] sm:max-w-[280px] md:max-w-[300px] mx-auto sm:mx-0">
              Discover insightful articles on technology, lifestyle, anime, and
              more. Stay informed and inspired with our latest posts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block order-3 sm:order-2 text-center sm:text-left">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-[#65BBDF]">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#65BBDF] transition-colors duration-200 text-xs sm:text-sm md:text-base block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-[#65BBDF] transition-colors duration-200 text-xs sm:text-sm md:text-base block py-0.5"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-[#65BBDF] transition-colors duration-200 text-xs sm:text-sm md:text-base block py-0.5"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about#contact"
                  className="text-gray-300 hover:text-[#65BBDF] transition-colors duration-200 text-xs sm:text-sm md:text-base block py-0.5"
                  scroll={true}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="order-2 sm:order-3 text-center sm:text-left">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-[#65BBDF]">
              Contact Me
            </h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <a
                href="https://fb.com/binida1210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#65BBDF] p-1.5 sm:p-2 rounded-full hover:bg-[#DBF3FF] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="https://linkedin.com/in/binida2k1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#65BBDF] p-1.5 sm:p-2 rounded-full hover:bg-[#DBF3FF] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="mailto:binida2k1@email.com"
                className="bg-[#65BBDF] p-1.5 sm:p-2 rounded-full hover:bg-[#DBF3FF] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="https://github.com/binida1210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#65BBDF] p-1.5 sm:p-2 rounded-full hover:bg-[#DBF3FF] transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>
            </div>
            {/* Made by Binh Tran */}
            <div className="text-center text-gray-400 text-xs sm:text-sm mb-4 mt-6 sm:mt-12">
              <p>Made with ❤️ by Binida</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-3 sm:pt-4 md:pt-6">
          <div className="flex flex-col space-y-2 sm:space-y-3 md:flex-row md:justify-between md:items-center md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 Blogo. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#65BBDF] text-xs sm:text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#65BBDF] text-xs sm:text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
