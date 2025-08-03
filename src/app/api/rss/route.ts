import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Blog</title>
    <description>Personal blog about programming and technology</description>
    <link>${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}</link>
    <atom:link href="${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/rss" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/blog/${post.slug}</link>
      <guid>${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/blog/${post.slug}</guid>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
