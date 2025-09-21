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

export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-full mb-8" />
        <div className="bg-whitesmoke dark:bg-gray-800 p-8 rounded-lg shadow-md w-full">
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-11/12 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-4/5 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
