import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const session = await auth.api.getSession({ headers: request.headers });

      // If no session, redirect to login
      if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // If not admin, redirect to home
      if (!isAdmin(session.user.email)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If there's an error, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
