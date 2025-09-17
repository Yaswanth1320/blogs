import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    // Check if user is logged in
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (!isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, icon, category, slug } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !icon || !category || !slug) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create blog post
    const newPost = {
      id: nanoid(),
      slug,
      title,
      excerpt,
      content,
      icon,
      category,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the blog post into the database
    await db.insert(blogPosts).values(newPost);


    return NextResponse.json({
      message: "Blog post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
