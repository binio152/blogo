import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
// Only admin routes and blog mutation endpoints (POST, PUT, DELETE) are protected
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

// Define admin-only routes
const isAdminRoute = createRouteMatcher([
  "/admin/users(.*)",
  "/admin/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Protect admin routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect blog mutation endpoints (POST, PUT, DELETE) but allow GET
  if (req.nextUrl.pathname.startsWith("/api/blog")) {
    const method = req.method;
    if (method !== "GET" && !userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  // Protect email subscription POST
  if (req.nextUrl.pathname.startsWith("/api/email") && req.method === "POST") {
    // Email subscriptions are public, so no auth required
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
