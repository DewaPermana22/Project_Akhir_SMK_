import React from 'react';
import Dompurify from 'dompurify';
import { Skeleton } from '@/components/ui/skeleton';

const ArticleContent = ({ detailBerita }) => {
  if (!detailBerita?.isi) {
    return (
      <div className="article-content prose prose-lg max-w-none">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 bg-gray-200 ${
                i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/5"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
     
      
      
        <div
          className="text-gray-800 leading-relaxed space-y-6 prose prose-lg prose-gray max-w-none
          [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:bg-gradient-to-r [&>h1]:from-gray-900 [&>h1]:to-gray-700 [&>h1]:bg-clip-text [&>h1]:text-transparent [&>h1]:mb-6 [&>h1]:mt-8
          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-800 [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:border-l-4 [&>h2]:border-indigo-400 [&>h2]:pl-4
          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-3 [&>h3]:mt-5
          [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-justify
          [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-600 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-indigo-50 [&>blockquote]:to-purple-50 [&>blockquote]:py-4 [&>blockquote]:rounded-r-sm [&>blockquote]:my-6 [&>blockquote]:backdrop-blur-sm [&>blockquote]:border-r [&>blockquote]:border-t [&>blockquote]:border-b 
          [&>ul]:space-y-2 [&>ol]:space-y-2 [&>li]:text-gray-700
          [&>img]:rounded-2xl [&>img]:shadow-xl [&>img]:my-8 [&>img]:border [&>img]:border-white/30
          [&>a]:text-indigo-600 [&>a]:hover:text-indigo-700 [&>a]:transition-colors [&>a]:duration-200 [&>a]:font-medium
          [&>strong]:text-gray-900 [&>strong]:font-semibold
          [&>code]:bg-gray-100 [&>code]:text-indigo-600 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
          [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6"
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(detailBerita.isi),
          }}
        />
      </div>
    
  );
};

export default ArticleContent;