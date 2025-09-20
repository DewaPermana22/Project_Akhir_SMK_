import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useDetailBerita from "@/hooks/useDetailBerita";
import useGetUserDetail from "@/hooks/useGetUserDetail";
import LoadingDetailBerita from "@/components/templates/loading/detail-berita/LoadingDetailBerita";
import NavigationHeader from "@/components/templates/detail-berita/navigation-header";
import TableOfContents from "@/components/templates/detail-berita/table-of-content";

import ArticleHeader from "@/components/templates/detail-berita/article-header";
import ArticleImage from "@/components/templates/detail-berita/article-image";
import ArticleContent from "@/components/templates/detail-berita/article-content";
import ArticleFooter from "@/components/templates/detail-berita/article-footer";
import ScrollToTop from "@/components/templates/detail-berita/scroll-to-top";


const DetailBerita = () => {
  const { id } = useParams();
  const { detailBerita, loading } = useDetailBerita(id);
  const { userDetail, loading: loadingUserDetail } = useGetUserDetail(
    detailBerita?.user_id
  );
  const [readingProgress, setReadingProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".article-content");
      if (article) {
        const scrollTop = window.scrollY;
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;

        const progress = Math.min(
          Math.max(
            ((scrollTop - articleTop + windowHeight) / articleHeight) * 100,
            0
          ),
          100
        );
        setReadingProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [detailBerita]);

  if (loading) return <LoadingDetailBerita/>

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
      <NavigationHeader
        detailBerita={detailBerita}
        loading={loading}
        readingProgress={readingProgress}
      />
      <TableOfContents content={detailBerita?.isi} />
      <div className="pt-[100px] sm:pt-[120px] px-4 sm:px-6 lg:px-8 pb-12 relative">
        <article className="max-w-6xl mx-auto">
          <ArticleHeader
            detailBerita={detailBerita}
            userDetail={userDetail}
            loadingUserDetail={loadingUserDetail}
          />
          <ArticleImage detailBerita={detailBerita} />
          <ArticleContent detailBerita={detailBerita} />
          <ArticleFooter detailBerita={detailBerita} />
        </article>
      </div>
      <div className="fixed top-1/3 left-8 pointer-events-none">
        <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" />
      </div>
      <ScrollToTop />
    </main>
  );
};

export default DetailBerita;