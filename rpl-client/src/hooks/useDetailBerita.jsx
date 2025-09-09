import { getBeritaById, hasLikedBerita, likeBerita } from '@/api/services/BeritaService';
import React, { useEffect, useState } from 'react'

const useDetailBerita = (idBerita) => {
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [detailBerita, setDetailBerita] = useState({});

    const fetchDetailBerita = async () => {
        setLoading(true);
        try {
            const beritaId = Number(idBerita);
            const response = await getBeritaById(beritaId);
            if (response) {
                setDetailBerita(response.data);
            }
        } catch (error) {
            console.error("Error fetching berita detail:", error);
        } finally {
            setLoading(false);
        }
    }

    const LikeBerita = async (idBerita, token_berita) => {
        try {
            await likeBerita(idBerita, token_berita);
            setLiked(!liked);
            fetchDetailBerita();
        } catch (error) {
            console.error("Error liking berita detail:", error);
        }
    }

    const checkLiked = async (token_berita) => {
    try {
      const beritaId = Number(idBerita);
      const response = await hasLikedBerita(beritaId, token_berita);
      if (response) {
        setLiked(response.data);
      }
    } catch (error) {
      console.error("Error checking like:", error);
    }
  };

    useEffect(() => {
        fetchDetailBerita();
    }, [idBerita])
    
  return {detailBerita, loading, LikeBerita, liked, checkLiked}
}

export default useDetailBerita