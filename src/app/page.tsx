import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/blog";
import { ContactForm } from "@/components/ui/contact-form";

export default async function Home() {
  const blogPosts = await getRecentBlogPosts(5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 gradient-text">My Blog</h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
          Exploring the world of programming, development tools, and technology
          through thoughtful analysis and practical insights.
        </p>
        <div className="mt-8 flex justify-center flex-wrap gap-3">
          <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30 backdrop-blur-sm">
            💻 Programming
          </span>
          <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30 backdrop-blur-sm">
            🛠️ Tools
          </span>
          <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30 backdrop-blur-sm">
            🚀 Technology
          </span>
        </div>
      </div>

      {/* Featured Posts Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Latest Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`blog-card rounded-xl overflow-hidden h-full flex flex-col ${
                index === 0 ? "md:col-span-2 lg:col-span-2 md:row-span-1" : ""
              }`}
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
                    <h3
                      className={`font-bold mb-3 group-hover:text-green-400 transition-colors leading-tight flex-shrink-0 ${
                        index === 0 ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`text-gray-300 leading-relaxed flex-grow line-clamp-2 ${
                        index === 0 ? "text-base" : "text-sm"
                      }`}
                    >
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
      </div>

      {/* Stats and CTA Section */}
      <div className="relative text-center py-16 bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-green-500/20 backdrop-blur-sm overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />

        {/* Stats */}
        <div className="relative flex items-center justify-center gap-12 mb-10">
          <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/30">
            <div className="w-14 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {blogPosts.length}
              </div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
          </div>

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-green-500/50 to-transparent" />

          <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Quality</div>
              <div className="text-sm text-gray-400">Content</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          <p className="text-gray-400 mb-4 text-sm">
            Discover more insights and tutorials
          </p>
          <Link
            href="/blog"
            className="group inline-flex items-center px-6 py-3 bg-green-500/10 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
          >
            View All Posts
            <span className="ml-2 transition-transform group-hover:translate-x-0.5 text-sm">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-20 py-16 bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl border border-green-500/10">
        <ContactForm />
      </div>
    </div>
  );
}
