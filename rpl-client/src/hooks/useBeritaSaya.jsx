import { useState, useEffect } from "react";
import { useApi } from "./auth/useApi";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { callApi } = useApi();


  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const fetchBerita = async (page = 1, perPage = 5, search = "") => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page,
        per_page: perPage,
        ...(search && { search: search }),
      });
      const response = await callApi("GET", `/news/my-news?${params}`);
      if (response.success) {
        setBerita(response.data.data);
        setPagination({
          currentPage: response.data.meta.current_page,
          lastPage: response.data.meta.total_pages,
          perPage: response.data.meta.per_page,
          total: response.data.meta.total,
        });
      } else {
        setError(response.message || "Gagal mengambil data berita");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Terjadi kesalahan"
      );
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
    fetchBerita(
      pagination.currentPage,
      pagination.perPage,
      debouncedSearchTerm
    );
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
    setToggleDropdwon,
    setSearchTerm,
  };
};

export default useBeritaSaya;
