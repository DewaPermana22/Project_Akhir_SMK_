import React from "react";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLongWithZone } from "@/app/utils/formater-date";

const ArticleFooter = ({ detailBerita }) => {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <Clock className="w-4 h-4" />
          {detailBerita?.updated_at ? (
            <span>
              Last updated: {formatLongWithZone(detailBerita.updated_at, true)}
            </span>
          ) : (
            <Skeleton className="h-4 w-48 bg-gray-200" />
          )}
        </div>
      </div>
    </footer>
  );
};

export default ArticleFooter;
