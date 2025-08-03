import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blog";

export default async function Home() {
  const blogPosts = await getRecentBlogPosts(3);

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">My Blog</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Exploring the world of programming, development tools, and technology
          through thoughtful analysis and practical insights.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
            💻 Programming
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
            🛠️ Tools
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
            🚀 Technology
          </span>
        </div>

        {/* Auth Button */}
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
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
        ))}
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <span>📊</span>
          <span>{blogPosts.length} articles published</span>
          <span>•</span>
          <span>🎯</span>
          <span>Focused on quality content</span>
        </div>
        <div className="mt-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </div>
  );
}
