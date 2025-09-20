import { Skeleton } from "@/components/ui/skeleton";

const ArticleContentSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl bg-gray-200" />
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 bg-gray-300 ${
            i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5"
          }`}
        />
      ))}
    </div>
  </div>
);

export default ArticleContentSkeleton;
