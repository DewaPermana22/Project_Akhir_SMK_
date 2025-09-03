import { useState, useEffect } from 'react';
import { getMyBerita } from '../api/services/BeritaService';

const useBeritaSaya = () => {
  const [berita, setBerita] = useState([]);
    const [toggleDropdwon, setToggleDropdwon] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const fetchBerita = async (page = 1, perPage = 5, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMyBerita(page, perPage, search);
      
      if (response.success) {
        setBerita(response.data.data);
        setPagination({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          perPage: response.data.per_page,
          total: response.data.total
        });
      } else {
        setError(response.message || 'Gagal mengambil data berita');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita(1, pagination.perPage, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      fetchBerita(page, pagination.perPage, debouncedSearchTerm);
    }
  };

const handlePerPageSelect = (selectedId) => {
  const perPageValue = parseInt(selectedId);
  fetchBerita(1, perPageValue, debouncedSearchTerm);
  setToggleDropdwon(false);
};


  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const refreshData = () => {
    fetchBerita(pagination.currentPage, pagination.perPage, debouncedSearchTerm);
  };

  return {
    berita,
    pagination,
    loading,
    error,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handlePerPageSelect,
    handleSearchChange,
    refreshData,
    fetchBerita,
    toggleDropdwon,
    setToggleDropdwon
  };
};

export default useBeritaSaya;