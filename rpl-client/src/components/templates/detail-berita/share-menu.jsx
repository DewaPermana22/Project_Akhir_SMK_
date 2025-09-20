import React from 'react';
import { Copy, Twitter, Facebook } from 'lucide-react';

const ShareMenu = ({ detailBerita, copyToClipboard, onClose }) => {
  return (
    <div className="absolute top-12 right-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 min-w-[220px] z-20 border border-white/30 animate-in slide-in-from-top-2 duration-200">
      <div className="space-y-2">
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-white/50 rounded-xl text-sm text-gray-700 transition-all duration-200 hover:scale-105"
        >
          <Copy className="w-4 h-4 text-indigo-500" />
          Copy Link
        </button>
        
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            detailBerita?.judul || ""
          )}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-white/50 rounded-xl text-sm text-gray-700 transition-all duration-200 hover:scale-105"
          onClick={onClose}
        >
          <Twitter className="w-4 h-4 text-blue-500" />
          Share to Twitter
        </a>
        
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-white/50 rounded-xl text-sm text-gray-700 transition-all duration-200 hover:scale-105"
          onClick={onClose}
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          Share to Facebook
        </a>
      </div>
    </div>
  );
};

export default ShareMenu;