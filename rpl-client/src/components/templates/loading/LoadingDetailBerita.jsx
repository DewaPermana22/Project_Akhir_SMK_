import { Skeleton } from "@/components/ui/skeleton";
import { ArrowBigLeftDash } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const LoadingDetailBerita = () => {
  const HeaderSkeleton = () => (
    <div className="h-[80px] fixed top-0 left-0 right-0 bg-[var(--indigo-dark)] z-50">
      <Link
        to={"/"}
        className="flex items-center gap-2 bg-[var(--lime)] px-5 py-2 rounded-md shadow-2xs cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5"
      >
        <ArrowBigLeftDash className="w-5 h-5" />
        <span className="hidden sm:inline">Kembali</span>
      </Link>
    </div>
  );

  const ArticleHeaderSkeleton = () => (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-32 bg-white/15" />
          <Skeleton className="h-4 w-20 bg-white/15" />
        </div>
      </div>
      <Skeleton className="h-12 w-full mb-4 bg-white/20" />
      <Skeleton className="h-8 w-3/4 mb-6 bg-white/15" />
      <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <Skeleton className="w-12 h-12 rounded-full bg-white/20" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-white/15" />
          <Skeleton className="h-3 w-20 bg-white/10" />
        </div>
      </div>
    </header>
  );

  const ArticleContentSkeleton = () => (
    <div className="space-y-8">
      <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl bg-white/10" />
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 bg-white/10 ${
              i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--indigo-dark)]">
      <HeaderSkeleton />
      <div className="pt-[100px] sm:pt-[150px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ArticleHeaderSkeleton />
          <ArticleContentSkeleton />
        </div>
      </div>
    </main>
  );
};

export default LoadingDetailBerita;
