import React, { useState, useEffect } from 'react'
import { getBeritaTerbaru } from '../api/services/BeritaService'

const useBerita = () => {
    const [newsLatest, setNewsLatest] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchBeritaTerbaru = async () => {
        setLoading(true);
        try {
            const response = await getBeritaTerbaru();
            if (response) {
                setNewsLatest(response.data);
            }
        } catch (error) {
            console.error("Error fetching latest news:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBeritaTerbaru();
    }, [])
    
  return {newsLatest, loading}
}

export default useBerita;