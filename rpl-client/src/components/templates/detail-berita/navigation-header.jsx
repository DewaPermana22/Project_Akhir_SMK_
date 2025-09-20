import React, { useState } from 'react';
import { ArrowBigLeftDashIcon, Share2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import toast from 'react-hot-toast';
import ShareMenu from './share-menu';

const NavigationHeader = ({ detailBerita, loading, readingProgress, isNewsAll = false }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 shadow-lg"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="h-[80px] fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-200">
      <HashLink
        to={isNewsAll ? "/news" : "/#news-latest"}
        className="flex items-center gap-2 linear-purple text-white enhanced-box-shadow px-5 py-2 rounded-md shadow-2xs cursor-pointer hover:bg-[var(--lavender)] transition-colors ease-linear duration-200 absolute top-5 left-5"
      >
        <ArrowBigLeftDashIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Kembali</span>
      </HashLink>

        <div className="absolute top-5 right-5 flex gap-3">
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-xl text-gray-700 hover:bg-white/30 transition-all duration-300  border border-white/30"
              disabled={loading}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Share</span>
            </button>
            
            {showShareMenu && (
              <ShareMenu 
                detailBerita={detailBerita}
                copyToClipboard={copyToClipboard}
                onClose={() => setShowShareMenu(false)}
              />
            )}
          </div>
        </div>
      </div>

      {showShareMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </>
  );
};

export default NavigationHeader;