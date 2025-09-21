import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-700/50", className)}
      {...props}
    />
  );
}

export function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <article className="blog-card rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-4 flex-shrink-0">
          <Skeleton
            className={`${
              featured ? "h-12 w-12" : "h-8 w-8"
            } mr-3 rounded-full`}
          />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <Skeleton className={`${featured ? "h-8" : "h-6"} w-3/4 mb-3`} />
          <Skeleton className={`${featured ? "h-5" : "h-4"} w-full mb-2`} />
          <Skeleton className={`${featured ? "h-5" : "h-4"} w-5/6 flex-grow`} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-green-500/20 flex-shrink-0">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}

export function BlogListingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section Skeleton */}
      <div className="text-center py-16">
        <div className="w-80 h-12 bg-green-500/20 rounded animate-pulse mx-auto mb-6"></div>
        <div className="w-96 h-6 bg-gray-600/30 rounded animate-pulse mx-auto"></div>
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="mb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <BlogListingCardSkeleton key={i} />
            ))}
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="text-center py-12 bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl border border-green-500/10">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500/30 rounded animate-pulse"></div>
            <div className="w-8 h-6 bg-green-500/30 rounded animate-pulse"></div>
            <div className="w-20 h-5 bg-gray-600/30 rounded animate-pulse"></div>
          </div>
          <div className="w-px h-6 bg-green-500/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500/30 rounded animate-pulse"></div>
            <div className="w-24 h-5 bg-gray-600/30 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-28 h-5 bg-green-500/30 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-12">
        {/* Back to home link */}
        <Skeleton className="h-4 w-28 mb-6" />
        
        {/* Date */}
        <Skeleton className="h-4 w-32 mb-4" />
        
        {/* Title */}
        <Skeleton className="h-10 w-4/5 mb-8" />
        
        {/* Icon and Category */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        
        {/* Excerpt */}
        <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-500/5 rounded-r-lg">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-4/5" />
        </div>
      </div>

      {/* Content Section */}
      <div className="prose prose-invert max-w-none">
        <div className="space-y-6">
          {/* Paragraph blocks */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          {/* Code block skeleton */}
          <div className="bg-gray-900/50 border border-green-500/20 rounded-xl overflow-hidden">
            {/* Code block header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-gray-800/50">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            {/* Code content */}
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          
          {/* More paragraph blocks */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Heading skeleton */}
          <Skeleton className="h-8 w-1/2 mt-8 mb-4" />
          
          {/* More content */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogListingCardSkeleton() {
  return (
    <article className="blog-card rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-4 flex-shrink-0">
          <Skeleton className="h-8 w-8 mr-3 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 flex-grow" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-green-500/20 flex-shrink-0">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}
