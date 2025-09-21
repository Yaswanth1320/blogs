import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // For now, let all requests pass through
  // Authentication is handled in API routes and client-side
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
