import { useState, useEffect, useCallback } from "react";
import { getAllBerita, getBeritaTerbaru } from "../api/services/BeritaService";

const useBerita = ({ searchQuery = "" } = {}) => {
  const [newsLatest, setNewsLatest] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [allNewsLoading, setAllNewsLoading] = useState(false);
  const [latestNewsLoading, setLatestNewsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 20,
    total: 0,
  });

  // useCallback untuk menghindari recreating function
  const fetchSemuaBerita = useCallback(async (page = 1, perPage = 20, search = '') => {
    setAllNewsLoading(true);
    setError(null); 
    try {
      const response = await getAllBerita(page, perPage, search);
      console.log('API Response:', response);
      
      if (response.success) { 
        setNewsData(response.data || []);
        setPagination({
          currentPage: response.pagination?.current_page,
          lastPage: response.pagination?.total_pages,
          perPage: response.pagination?.per_page,
          total: response.pagination?.total
        });
      } else {
        setError(response?.message || 'Gagal mengambil data berita');
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error in hook get All Berita", error);
      setError(error.response?.data?.message || error.message || 'Terjadi kesalahan');
      setNewsData([]);
    } finally {
      setAllNewsLoading(false);
    }
  }, []);

  const fetchBeritaTerbaru = useCallback(async () => {
    setLatestNewsLoading(true);
    try {
      const response = await getBeritaTerbaru();
      if (response.success) {
        setNewsLatest(response.data);
      } else {
        setError(response.message || "Gagal mengambil berita terbaru");
      }
    } catch (error) {
      console.error("Error fetching latest news:", error);
      setError(error.response?.data?.message || error.message || "Terjadi kesalahan");
    } finally {
      setLatestNewsLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      fetchSemuaBerita(page, pagination.perPage, searchQuery);
    }
  };

  const refreshData = () => {
    fetchSemuaBerita(pagination.currentPage, pagination.perPage, searchQuery);
    fetchBeritaTerbaru();
  };

  // useEffect untuk menghindari infinite loop
  useEffect(() => {
    fetchSemuaBerita(1, pagination.perPage, searchQuery);
  }, [searchQuery, fetchSemuaBerita, pagination.perPage]);

  useEffect(() => {
    fetchBeritaTerbaru();
  }, [fetchBeritaTerbaru]);

  return {
    newsLatest,
    newsData,
    allNewsLoading,
    latestNewsLoading,
    error,
    pagination,
    fetchBeritaTerbaru,
    fetchSemuaBerita,
    handlePageChange,
    refreshData,
  };
};

export default useBerita;