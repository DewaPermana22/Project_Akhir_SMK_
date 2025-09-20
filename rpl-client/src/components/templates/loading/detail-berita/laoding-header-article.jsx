import { Skeleton } from "@/components/ui/skeleton";

const ArticleHeaderSkeleton = () => (
  <header className="mb-8">
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-32 bg-gray-300" />
        <Skeleton className="h-4 w-20 bg-gray-300" />
      </div>
    </div>
    <Skeleton className="h-12 w-full mb-4 bg-gray-200" />
    <Skeleton className="h-8 w-3/4 mb-6 bg-gray-300" />
    <div className="flex items-center gap-4 p-4 bg-gray-200 backdrop-blur-sm rounded-xl border border-gray-200">
      <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 bg-gray-300" />
        <Skeleton className="h-3 w-20 bg-gray-300" />
      </div>
    </div>
  </header>
);

export default ArticleHeaderSkeleton;
