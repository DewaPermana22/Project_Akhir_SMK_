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
                flex items-center gap-3 p-4 rounded-2xl w-[250px] cursor-pointer
                transition-all duration-300 ease-out group relative overflow-hidden
                shadow-lg border backdrop-blur-sm
               hover:shadow-xl
                ${isActive 
                  ? 'bg-gradient-to-br from-[var(--lime)] via-[var(--lime)] to-[color-mix(in_srgb,var(--lime)_85%,black_15%)] text-[var(--indigo-dark)] border-[var(--lime)]/20 shadow-[var(--lime)]/25' 
                  : 'bg-gradient-to-br from-[var(--indigo-dark)] via-[var(--indigo-dark)] to-[color-mix(in_srgb,var(--indigo-dark)_80%,black_20%)] text-white border-white/10 shadow-black/25 hover:shadow-black/30'
                }
              `}
            >
              {/* Background pattern */}
              <div className={`absolute inset-0 opacity-10 overflow-hidden ${isActive ? 'opacity-15' : ''}`}>
                <div className={`absolute -top-4 -right-4 w-12 h-12 border rounded-full ${isActive ? 'border-[var(--indigo-dark)]/20' : 'border-white/20'}`}></div>
                <div className={`absolute -bottom-2 -left-2 w-8 h-8 border rounded-full ${isActive ? 'border-[var(--indigo-dark)]/15' : 'border-white/15'}`}></div>
                <div className={`absolute top-2 right-8 w-1 h-1 rounded-full ${isActive ? 'bg-[var(--indigo-dark)]/30' : 'bg-white/30'}`}></div>
                <div className={`absolute bottom-3 left-12 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[var(--indigo-dark)]/20' : 'bg-white/20'}`}></div>
                <div className={`absolute top-1/3 right-0 w-6 h-[1px] rotate-12 ${isActive ? 'bg-gradient-to-l from-[var(--indigo-dark)]/15 to-transparent' : 'bg-gradient-to-l from-white/15 to-transparent'}`}></div>
                <div className={`absolute bottom-1/4 left-0 w-8 h-[1px] -rotate-12 ${isActive ? 'bg-gradient-to-r from-[var(--indigo-dark)]/10 to-transparent' : 'bg-gradient-to-r from-white/10 to-transparent'}`}></div>
                <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-full blur-xl ${isActive ? 'bg-[var(--indigo-dark)]/5' : 'bg-white/5'}`}></div>
              </div>

              <div className={`absolute top-0 left-0 right-0 h-[1px] ${isActive ? 'bg-gradient-to-r from-transparent via-[var(--indigo-dark)]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'}`}></div>
              
              <div className="relative z-10 flex items-center gap-3 w-full">
                <div className={`
                  p-2 rounded-full transition-all duration-300 ease-out
                  ${isActive 
                    ? 'bg-gradient-to-br from-[var(--indigo-dark)]/20 to-[var(--indigo-dark)]/10 shadow-lg shadow-[var(--indigo-dark)]/20' 
                    : 'bg-gradient-to-br from-white/20 to-white/10 shadow-lg shadow-black/20'
                  }
                  border backdrop-blur-sm
                  ${isActive ? 'border-[var(--indigo-dark)]/20' : 'border-white/20'}
                `}>
                  <Icon 
                    size={20} 
                    className={`
                      transition-colors duration-300
                      ${isActive ? 'text-[var(--indigo-dark)] drop-shadow-sm' : 'text-white drop-shadow-sm'}
                    `} 
                  />
                </div>
                <h1 className={`
                  font-normal text-sm transition-colors duration-300
                  ${isActive ? 'text-[var(--indigo-dark)]' : 'text-white'}
                `}>
                  {item.title}
                </h1>
              </div>

              <div className={`
                absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out pointer-events-none
                ${isActive 
                  ? 'bg-gradient-to-br from-[var(--indigo-dark)]/5 to-transparent opacity-0 group-hover:opacity-100' 
                  : 'bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100'
                }
              `}></div>

              {isActive && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-[var(--indigo-dark)] rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <main>
        {renderContent && renderContent(activeCard, menuItems.find(item => item.id === activeCard))}
      </main>
    </div>
  );
};

export default QuickAccessCards;
