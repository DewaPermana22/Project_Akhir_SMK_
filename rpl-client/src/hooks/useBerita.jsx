import React, { useState } from 'react'
import { getBeritaTerbaru } from '../api/services/BeritaService'

const useBerita = () => {
    const [newsLatest, setNewsLatest] = useState([]);
    const fetchBeritaTerbaru = async () => {
        try {
            const response = await getBeritaTerbaru();
            if (response) {
                console.log(response)
                
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchBeritaTerbaru();
    }, [])
    
  return {newsLatest}
}

export default useBerita