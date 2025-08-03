import React from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

const BlogsPage = async () => {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          All Blog Posts
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Explore all our articles on programming, development tools, and
          technology.
        </p>
      </div>

      <div className="space-y-6">
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          blogPosts.map((post) => (
            <article key={post.id} className="blog-card p-6 rounded-lg">
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{post.icon}</span>
                      <div>
                        <time className="text-sm text-gray-400 block">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="ml-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                    →
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <span>📊</span>
          <span>{blogPosts.length} total articles</span>
          <span>•</span>
          <span>🎯</span>
          <span>Quality content</span>
        </div>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
