import React from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

const BlogsPage = async () => {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 gradient-text">
          All Blog Posts
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
          Explore all our articles on programming, development tools, and
          technology.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="mb-16">
        {blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4 text-white">No posts yet</h2>
            <p className="text-gray-400 text-lg mb-8">
              Check back soon for new content!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-green-500/10 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card rounded-xl overflow-hidden h-full flex flex-col"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group h-full flex flex-col"
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center mb-4 flex-shrink-0">
                      <span className="text-3xl mr-3">{post.icon}</span>
                      <div className="flex flex-col">
                        <time className="text-sm text-gray-400">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30 mt-1 inline-block w-fit">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors leading-tight flex-shrink-0">
                        {post.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed flex-grow line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-green-500/20 flex-shrink-0">
                      <span className="text-sm text-gray-400 font-medium">
                        Read more
                      </span>
                      <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 text-lg">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="text-center py-12 bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl border border-green-500/10">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xl">📊</span>
            <span className="text-lg font-semibold text-green-400">
              {blogPosts.length}
            </span>
            <span>total articles</span>
          </div>
          <div className="w-px h-6 bg-green-500/30"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xl">🎯</span>
            <span>Quality content</span>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm font-medium"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default BlogsPage;
