import { useState, useCallback } from "react";
import axiosInstance from "@/api/AxiosInstance";
import { useAuth } from "@/contexts/AuthContext";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshCsrf } = useAuth();

  const callApi = useCallback(
    async (method, url, data = null) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          method,
          url,
          data,
        });

        console.log(response)
        setLoading(false);
        return response.data;
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || err.message);

        // Auto-refresh CSRF on 419
        if (err.response?.status === 419) {
          await refreshCsrf();
        }

        throw err;
      }
    },
    [refreshCsrf]
  );

  return { callApi, loading, error };
};
