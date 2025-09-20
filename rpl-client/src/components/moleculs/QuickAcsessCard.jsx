import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";

const QuickAccessCards = ({ menuItems, renderContent }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {menuItems.map((item) => {
          const Icon = LucideIcons[item.icon];
          const isActive = activeCard === item.id;
          
          return (
            <div 
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`
               relative p-4 rounded-2xl cursor-pointer
                transition-all duration-300 ease-out group overflow-hidden
                border backdrop-blur-sm shadow-md 
                ${isActive 
                  ? 'shadow-sm bg-gradient-to-br from-indigo-600 to-[var(--blue)]' 
                  : 'shadow-purple-200  bg-white border-purple-100/50 hover:shadow-purple-300/50'
                }
              `}
            >
              {/* Background pattern - matching CardDashboard */}
              <div className="absolute inset-0 opacity-20 overflow-hidden">
                {/* Lingkaran-lingkaran dekoratif */}
                <div className={`absolute -top-6 -left-6 w-16 h-16 border-2 rounded-full ${isActive ? 'border-[var(--lime)]/30' : 'border-purple-600/20'}`}></div>
                <div className={`absolute top-8 -right-4 w-12 h-12 border rounded-full ${isActive ? 'border-[var(--lime)]/25' : 'border-indigo-600/25'}`}></div>
                <div className="absolute -bottom-3 left-1/4 w-8 h-8 border border-white/10 rounded-full"></div>

                {/* Bulatan solid dengan berbagai ukuran */}
                <div className="absolute top-4 right-8 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/25 rounded-full"></div>
                <div className="absolute top-1/2 left-3 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-8 right-1/4 w-1 h-1 bg-white/15 rounded-full"></div>

                {/* Garis-garis dekoratif */}
                <div className="absolute top-1/4 left-0 w-6 h-[1px] bg-gradient-to-r from-white/20 to-transparent rotate-45"></div>
                <div className="absolute bottom-1/3 right-0 w-8 h-[1px] bg-gradient-to-l from-white/15 to-transparent -rotate-12"></div>
                <div className="absolute top-2/3 left-1/4 w-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12"></div>

                {/* Kurva dekoratif */}
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-l-2 border-t-2 border-white/15 rounded-tl-full"></div>
                <div className="absolute -top-3 left-1/2 w-6 h-6 border-r border-b border-white/10 rounded-br-full"></div>

                {/* Background blur untuk depth */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-full blur-xl ${isActive ? 'bg-[var(--lime)]/10' : 'bg-purple-400/5'}`}></div>
              </div>

              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="relative z-10 flex items-center gap-3 w-full">
                {/* Icon container - matching CardDashboard style */}
                <div className={`${isActive ? 'bg-gray-100' : 'bg-[var(--blue)]'} 
                  p-3 rounded-full transition-all duration-300 ease-out
                 `}>
                  <Icon 
                    size={20} 
                    className={`
                      transition-colors duration-300 drop-shadow-sm
                      ${isActive ? 'text-[var(--blue)]' : 'text-white'}
                    `} 
                  />
                </div>
                
                {/* Text */}
                <h1 className={`
                  text-sm transition-colors duration-300
                  ${isActive ? 'text-[var(--white)]' : 'text-gray-700'}
                `}>
                  {item.title}
                </h1>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-4 top-4">
                  <div className="w-2 h-2 bg-[var(--white)] rounded-full animate-pulse shadow-lg shadow-[var(--lime)]/50"></div>
                </div>
              )}

              {/* Hover glow effect - matching CardDashboard */}
              <div className={`
                absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out pointer-events-none
                ${isActive 
                  ? 'bg-gradient-to-br from-[var(--lime)]/5 to-transparent opacity-100' 
                  : 'bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100'
                }
              `}></div>
            </div>
          );
        })}
      </div>

      <main className="mt-6">
        {renderContent && renderContent(activeCard, menuItems.find(item => item.id === activeCard))}
      </main>
    </div>
  );
};

export default QuickAccessCards;