import React from "react";
import HeaderSkeleton from "./header-skeleton";
import ArticleHeaderSkeleton from "./laoding-header-article";
import ArticleContentSkeleton from "./loading-content-article";

const LoadingDetailBerita = () => {
  return (
    <main className="min-h-screen bg-slate-50">
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
