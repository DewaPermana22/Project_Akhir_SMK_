import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (content) {
      // Extract headings from content
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headingElements = doc.querySelectorAll('h1, h2, h3, h4');
      
      const headingsList = Array.from(headingElements).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      }));
      
      setHeadings(headingsList);
    }
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-32 right-4 z-50 lg:hidden w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full shadow-xl border border-white/30 flex items-center justify-center text-indigo-600"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Table of contents */}
      <div className={`fixed top-32 right-8 z-40 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
      }`}>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 max-w-xs max-h-96 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
            <List className="w-4 h-4 text-indigo-500" />
            <span>Table of Contents</span>
          </div>
          
          <nav className="space-y-2">
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`block text-sm transition-all duration-200 hover:text-indigo-600 ${
                  activeHeading === id
                    ? 'text-indigo-600 font-medium border-l-2 border-indigo-500 pl-3 bg-indigo-50 py-1 rounded-r'
                    : 'text-gray-600 hover:pl-2'
                }`}
                style={{
                  marginLeft: `${(level - 1) * 12}px`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                  setIsVisible(false);
                }}
              >
                <div className="flex items-center gap-1">
                  {level > 1 && <ChevronRight className="w-3 h-3 opacity-50" />}
                  <span className="line-clamp-2">{text}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

export default TableOfContents;