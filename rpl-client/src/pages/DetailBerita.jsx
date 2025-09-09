import {
  ArrowBigLeftDashIcon,
  Calendar,
  Eye,
  Share2,
  Clock,
  User,
  Tag,
  Heart,
  MessageCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { formatLongWithZone } from "@/app/utils/formater-date";
import useDetailBerita from "@/hooks/useDetailBerita";
import useGetUserDetail from "@/hooks/useGetUserDetail";
import { useDispatch, useSelector } from "react-redux";
import { setTokenBerita } from "@/features/TokenBeritaSlice";
import { generateRandomToken } from "@/app/utils/generate-random-token";
import { likeBerita } from "@/api/services/BeritaService";

const DetailBerita = () => {
  const { id } = useParams();
  const {
    detailBerita,
    loading,
    LikeBerita,
    liked,
    checkLiked,
  } = useDetailBerita(id);
  const { userDetail } = useGetUserDetail(detailBerita?.user_id);
  const dispatch = useDispatch();
  const token_berita = useSelector((state) => state.token_berita.token_berita);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!token_berita) {
      const newToken = generateRandomToken(12);
      dispatch(setTokenBerita(newToken));
    }
  }, []);

  useEffect(() => {
    if (detailBerita && token_berita) {
      checkLiked(token_berita);
    }
  }, [detailBerita, token_berita]);

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
    // Bisa tambahkan toast notification di sini
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--indigo-dark)]">
        <div className="h-[80px] fixed top-0 left-0 right-0 bg-[var(--indigo-dark)] z-50">
          <Link
            to={"/"}
            className="flex items-center gap-2 bg-[var(--lime)] px-5 py-2 rounded-md shadow-2xs cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5"
          >
            <ArrowBigLeftDashIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        </div>

        {/* Loading Content */}
        <div className="pt-[220px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded-lg mb-4"></div>
              <div className="h-6 bg-white/15 rounded-lg mb-6 w-3/4"></div>
              <div className="h-[400px] bg-white/10 rounded-2xl mb-8"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-white/10 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--indigo-dark)]">
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div
          className="h-1 bg-[var(--lime)] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <div className="h-[80px] fixed top-0 left-0 right-0 bg-[var(--indigo-dark)] z-50 border-b border-white/10">
        <Link
          to={"/"}
          className="flex items-center gap-2 bg-[var(--lime)] px-5 py-2 rounded-md shadow-lg cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5 text-[var(--indigo-dark)] font-semibold"
        >
          <ArrowBigLeftDashIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Kembali</span>
        </Link>
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            onClick={() => LikeBerita(detailBerita.id, token_berita)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              liked
                ? "bg-red-500 text-white"
                : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm">
              {detailBerita?.jumlah_like + (liked ? 1 : 0)}
            </span>
          </button>
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-200"
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
                    detailBerita?.judul
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
      <div className="pt-[150px] px-4 sm:px-6 lg:px-8 pb-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[var(--lime)] text-[var(--indigo-dark)] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Tag className="w-3 h-3 inline mr-1" />
                {detailBerita?.kategori?.kategori}
              </span>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatLongWithZone(detailBerita?.created_at, true)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  1922 views
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {detailBerita?.judul}
            </h1>
            <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <img
                loading="lazy"
                src={
                  userDetail?.avatar
                    ? userDetail.avatar
                    : "https://ui-avatars.com/api/?name=" +
                      userDetail?.name +
                      "&background=random&size=128&color=fff"
                }
                alt={userDetail?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-white/70" />
                  <span className="text-white font-semibold">
                    {userDetail?.name ? userDetail.name : "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-white/70 text-sm">
                  <Clock className="w-3 h-3" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </header>
          <div className="mb-8">
            <img
              loading="lazy"
              src={detailBerita?.gambar_url}
              alt={detailBerita?.judul}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <div className="article-content prose prose-lg prose-invert max-w-none">
            <div className="text-white/90 leading-relaxed space-y-6">
              {detailBerita?.isi?.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
          <footer className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-white/70 text-sm">
                Last updated:{" "}
                {formatLongWithZone(detailBerita?.updated_at, true)}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likeBerita(detailBerita.id, token_berita)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                  <span>
                    {detailBerita?.jumlah_like + (liked ? 1 : 0)} likes
                  </span>
                </button>
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
