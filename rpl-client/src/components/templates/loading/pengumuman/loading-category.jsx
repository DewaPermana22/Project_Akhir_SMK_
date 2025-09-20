import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-transparent"
      >
        <div className="flex items-center space-x-3">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    ))}
  </div>
);

export default CategorySkeleton;
