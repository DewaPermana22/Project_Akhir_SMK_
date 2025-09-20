import React, { useState, useEffect } from 'react';
import { ArrowUpToLine, ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-1 bg-[var(--blue)] text-white rounded-sm shadow-xl  backdrop-blur-sm border border-white/20 group"
          title="Scroll to top"
        >
          <ArrowUpToLine className="w-6 h-6 mx-auto" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;