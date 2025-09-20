import React from "react";
import { Calendar, Eye, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLongWithZone } from "@/app/utils/formater-date";
import AuthorCard from "./author-card";

const ArticleHeader = ({ detailBerita, userDetail, loadingUserDetail }) => {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-indigo-200/50">
          <Tag className="w-3 h-3 inline mr-2" />
          {detailBerita?.kategori?.kategori || "Kategori"}
        </span>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" />
            {detailBerita?.created_at ? (
              formatLongWithZone(detailBerita.created_at, true)
            ) : (
              <Skeleton className="h-4 w-24 bg-gray-200" />
            )}
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <Eye className="w-4 h-4" />
            {detailBerita?.views ? (
              `${detailBerita.views} views`
            ) : (
              <Skeleton className="h-4 w-16 bg-gray-200" />
            )}
          </div>
        </div>
      </div>
      {detailBerita?.judul ? (
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight mb-8">
          {detailBerita.judul}
        </h1>
      ) : (
        <div className="space-y-3 mb-8">
          <Skeleton className="h-12 w-full bg-gray-200" />
          <Skeleton className="h-8 w-3/4 bg-gray-200" />
        </div>
      )}
      <AuthorCard
        userDetail={userDetail}
        loadingUserDetail={loadingUserDetail}
      />
    </header>
  );
};

export default ArticleHeader;
