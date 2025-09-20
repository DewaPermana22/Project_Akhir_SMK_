import CardBerita from '@/components/atoms/card/CardBerita';
import SearchInput from '@/components/atoms/SearchInput';
import NavbarNews from '@/components/moleculs/NavbarNews';
import NewsEmpty from '@/components/templates/empty-state/news-empty';
import { Skeleton } from '@/components/ui/skeleton';
import useBerita from '@/hooks/useBerita';
import { NewspaperIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

const SemuaBerita = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { newsData, allNewsLoading, error, pagination, handlePageChange } = useBerita({ searchQuery: debouncedSearchTerm });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <NavbarNews>
        <SearchInput 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          className='!max-w-[250px] md:!max-w-sm'
        />
      </NavbarNews>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -right-32 w-64 h-64 bg-gradient-to-bl from-blue-400/25 to-indigo-500/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Search Status */}
        {debouncedSearchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Menampilkan hasil untuk: <span className="font-semibold">"{debouncedSearchTerm}"</span>
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        )}

        {allNewsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton 
                key={`skeleton-${index}`}
                className="w-full max-w-[300px] h-[400px] rounded-lg" 
              />
            ))}
          </div>
        ) : (
          <>
            {newsData && newsData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                  {newsData.map((item) => (
                    <CardBerita 
                      key={item.id} 
                      props={item} 
                    />
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {pagination.lastPage > 1 && (
                  <div className="flex justify-center mt-12 space-x-4">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                    >
                      Sebelumnya
                    </button>
                    
                    <span className="px-4 py-2 bg-gray-100 rounded-lg flex items-center">
                      Halaman {pagination.currentPage} dari {pagination.lastPage}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.lastPage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Empty State
              <NewsEmpty text={debouncedSearchTerm}/>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SemuaBerita;