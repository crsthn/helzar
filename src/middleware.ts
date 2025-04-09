import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";
import type { auth } from "./lib/auth";

type Session = typeof auth.$Infer.Session;
// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/reset-password"];
// Routes that require authentication
const authRoutes = ["/dashboard", "/settings"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    // If user is logged in and tries to access login/signup, redirect to dashboard
    if (
      session &&
      (pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/reset-password")
    ) {
      return NextResponse.redirect(new URL("/settings/profile", request.url));
    }
    return NextResponse.next();
  }

  // Handle authenticated routes
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // For any other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|image-proxy|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
