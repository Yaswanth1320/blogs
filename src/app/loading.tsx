import { BlogCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
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
      </div>

      <div className="space-y-6">
        {Array(3).fill(0).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}