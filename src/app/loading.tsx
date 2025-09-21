import { BlogCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
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

      {/* Featured Posts Grid Skeleton */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Latest Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {/* Featured post skeleton (spans 2 columns) */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-1">
            <BlogCardSkeleton featured />
          </div>
          {/* Regular post skeletons */}
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
        </div>
      </div>

      {/* Stats and CTA Section Skeleton */}
      <div className="relative text-center py-16 bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl border border-green-500/20 backdrop-blur-sm overflow-hidden mb-16">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />

        {/* Stats Skeleton */}
        <div className="relative flex items-center justify-center gap-12 mb-10">
          <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/30 animate-pulse">
            <div className="w-14 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500/30 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="w-8 h-6 bg-green-500/30 rounded animate-pulse mb-1"></div>
              <div className="w-12 h-4 bg-gray-600/30 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="w-px h-12 bg-gradient-to-b from-transparent via-green-500/50 to-transparent" />

          <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30 animate-pulse">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-blue-500/30 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="w-16 h-5 bg-blue-500/30 rounded animate-pulse mb-1"></div>
              <div className="w-14 h-4 bg-gray-600/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="relative">
          <div className="w-64 h-4 bg-gray-600/30 rounded animate-pulse mx-auto mb-4"></div>
          <div className="w-32 h-10 bg-green-500/20 rounded-lg border border-green-500/30 animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Contact Form Section Skeleton */}
      <div className="py-16 bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl border border-green-500/10">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="w-48 h-8 bg-green-500/20 rounded animate-pulse mx-auto mb-4"></div>
            <div className="w-80 h-5 bg-gray-600/30 rounded animate-pulse mx-auto"></div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full h-12 bg-gray-700/30 rounded-lg animate-pulse"></div>
              <div className="w-full h-12 bg-gray-700/30 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-full h-12 bg-gray-700/30 rounded-lg animate-pulse"></div>
            <div className="w-full h-32 bg-gray-700/30 rounded-lg animate-pulse"></div>
            <div className="w-32 h-12 bg-green-500/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
