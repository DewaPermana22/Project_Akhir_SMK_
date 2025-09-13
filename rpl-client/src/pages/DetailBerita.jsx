import {
  ArrowBigLeftDashIcon,
  Calendar,
  Eye,
  Share2,
  Clock,
  User,
  Tag,
  Heart,
} from "lucide-react";
import Dompurify from "dompurify"
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLongWithZone } from "@/app/utils/formater-date";
import useDetailBerita from "@/hooks/useDetailBerita";
import useGetUserDetail from "@/hooks/useGetUserDetail";
import toast from "react-hot-toast";
import LoadingDetailBerita from "@/components/templates/loading/LoadingDetailBerita";
import LoadingUserDetail from "@/components/templates/loading/LoadingUserDetail";
import { HashLink } from "react-router-hash-link";

const DetailBerita = () => {
  const { id } = useParams();
  const { detailBerita, loading } = useDetailBerita(id);
  const { userDetail, loading: loadingUserDetail } = useGetUserDetail(detailBerita?.user_id);
  const [showShareMenu, setShowShareMenu] = useState(false);
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: detailBerita?.judul,
          text: detailBerita?.isi?.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
        setShowShareMenu(!showShareMenu);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    toast.success("Link berhasil disalin di clipboard!");
  };

  if (loading) return <LoadingDetailBerita/> 

  return (
    <main className="min-h-screen bg-[var(--indigo-dark)]">
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div
          className="h-1 bg-[var(--lime)] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="h-[80px] fixed top-0 left-0 right-0 bg-[var(--indigo-dark)] z-50 border-b border-white/10">
        <HashLink
          to={"/#news-latest"}
          className="flex items-center gap-2 bg-[var(--lime)] px-5 py-2 rounded-md shadow-lg cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5 text-[var(--indigo-dark)] font-semibold"
        >
          <ArrowBigLeftDashIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Kembali</span>
        </HashLink>

        <div className="absolute top-5 right-5 flex gap-3">
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-200"
              disabled={loading}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Share</span>
            </button>
            {showShareMenu && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-10">
                <button
                  onClick={copyToClipboard}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                >
                  Copy Link
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    detailBerita?.judul || ""
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                >
                  Share to Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                >
                  Share to Facebook
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-[100px] sm:pt-[150px] px-4 sm:px-6 lg:px-8 pb-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[var(--lime)] text-[var(--indigo-dark)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Tag className="w-3 h-3 inline mr-1" />
                {detailBerita?.kategori?.kategori || "Kategori"}
              </span>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {detailBerita?.created_at ? 
                    formatLongWithZone(detailBerita.created_at, true) :
                    <Skeleton className="h-4 w-24 bg-white/15" />
                  }
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {detailBerita?.views ? 
                    `${detailBerita.views} views` :
                    <Skeleton className="h-4 w-16 bg-white/15" />
                  }
                </div>
              </div>
            </div>

            {detailBerita?.judul ? (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {detailBerita.judul}
              </h1>
            ) : (
              <div className="space-y-3 mb-6">
                <Skeleton className="h-12 w-full bg-white/20" />
                <Skeleton className="h-8 w-3/4 bg-white/15" />
              </div>
            )}

            {loadingUserDetail ? (
              <LoadingUserDetail />
            ) : (
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <img
                  loading="lazy"
                  src={
                    userDetail?.avatar ||
                    `https://ui-avatars.com/api/?name=${userDetail?.name || "Anonymous"}&background=random&size=128&color=fff`
                  }
                  alt={userDetail?.name || "Anonymous"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-white/70" />
                    <span className="text-white font-eudoxsussans-regular">
                      {userDetail?.name || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="mb-8">
            {detailBerita?.gambar_url ? (
              <img
                loading="lazy"
                src={detailBerita.gambar_url}
                alt={detailBerita.judul || "Article image"}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl bg-white/10" />
            )}
          </div>

          <div className="article-content prose prose-lg prose-invert max-w-none">
            {detailBerita?.isi ? (
              <div className="text-white/90 leading-relaxed space-y-6 prose prose-invert"
              dangerouslySetInnerHTML={{__html: Dompurify.sanitize(detailBerita.isi)}}/>
            ) : (
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <Skeleton 
                    key={i} 
                    className={`h-4 bg-white/10 ${
                      i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'
                    }`} 
                  />
                ))}
              </div>
            )}
          </div>

          <footer className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-white/70 text-sm">
                {detailBerita?.updated_at ? (
                  <>
                    Last updated: {formatLongWithZone(detailBerita.updated_at, true)}
                  </>
                ) : (
                  <Skeleton className="h-4 w-48 bg-white/10" />
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>

      {showShareMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </main>
  );
};

export default DetailBerita;