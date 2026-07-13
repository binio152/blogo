import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight, PlusCircle, BookText } from "lucide-react";

/**
 * Header Component
 * Main site header with authentication-aware navigation
 * Shows different content for signed in/out users
 *
 * Features:
 * - Logo/brand link to home
 * - Sign in button for guests
 * - Add New Post button for authenticated users
 * - User profile menu (Clerk UserButton)
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-sm">
      <div className="p-4 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#65BBDF] border-2 border-black rounded-lg flex items-center justify-center shadow-[-3px_3px_0_rgba(0,0,0,0.8)]">
              <BookText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              Blogo
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              About
            </Link>
          </nav>

          {/* Right: Authentication Actions */}
          <div className="flex items-center gap-3">
            {/* Show for non-authenticated users */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 font-bold py-2.5 px-5 border-2 border-black bg-[#DBF3FF] text-gray-900 shadow-[-4px_4px_0_rgba(0,0,0,0.8)] hover:shadow-[-2px_2px_0_rgba(0,0,0,0.8)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 rounded-lg">
                  <span className="hidden sm:inline text-gray-900">
                    Get Started
                  </span>
                  <span className="sm:hidden text-gray-900">Sign In</span>
                  <ArrowRight className="w-4 h-4 text-gray-900" />
                </button>
              </SignInButton>
            </SignedOut>

            {/* Show for authenticated users */}
            <SignedIn>
              <Link href="/admin/addProduct">
                <button className="flex items-center gap-2 font-bold py-2.5 px-4 border-2 border-black bg-[#65BBDF] text-white shadow-[-4px_4px_0_rgba(0,0,0,0.8)] hover:shadow-[-2px_2px_0_rgba(0,0,0,0.8)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 rounded-lg">
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">New Post</span>
                </button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 border-2 border-black rounded-full shadow-[-3px_3px_0_rgba(0,0,0,0.8)]",
                    userButtonPopoverFooter: "hidden",
                    userButtonPopoverCard: "border-2 border-black shadow-lg",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-center gap-1 mt-3 pt-3 border-t border-gray-200">
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#65BBDF] hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
