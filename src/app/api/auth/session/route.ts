import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ session: null }, { status: 401 });
    }

    // Check if user is admin for additional security
    if (!isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      session: {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        },
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ session: null }, { status: 500 });
  }
}
