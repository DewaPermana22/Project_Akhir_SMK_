import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    // Jangan set Content-Type di sini, biar otomatis berdasarkan data
  },
});

// Helper function untuk get XSRF token dari cookie
const getXSRFToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  return token ? decodeURIComponent(token) : null;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Set Content-Type berdasarkan tipe data
    if (config.data instanceof FormData) {
      // Untuk FormData (file upload), jangan set Content-Type
      // Browser akan set otomatis dengan boundary
      delete config.headers["Content-Type"];
    } else if (config.method !== "get" && config.method !== "GET") {
      // Untuk JSON data, set Content-Type
      config.headers["Content-Type"] = "application/json";
    }

    // Untuk non-GET requests, pastikan ada XSRF token
    if (config.method !== "get" && config.method !== "GET") {
      const xsrfToken = getXSRFToken();

      if (xsrfToken) {
        // Set XSRF token header
        config.headers["X-XSRF-TOKEN"] = xsrfToken;
      } else {
        // Jika belum ada CSRF cookie, dapatkan dulu
        try {
          await axios.get(`${config.baseURL}/sanctum/csrf-cookie`, {
            withCredentials: true,
          });

          // Get token setelah request CSRF
          const newToken = getXSRFToken();
          if (newToken) {
            config.headers["X-XSRF-TOKEN"] = newToken;
          }
        } catch (csrfError) {
          console.error("Failed to get CSRF token:", csrfError);
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle CSRF expired
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 419 dan belum retry
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get CSRF cookie baru
        await axios.get(`${originalRequest.baseURL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });

        // Set XSRF token yang baru
        const newToken = getXSRFToken();
        if (newToken) {
          originalRequest.headers["X-XSRF-TOKEN"] = newToken;
        }

        // Retry request asli
        return axiosInstance(originalRequest);
      } catch (csrfError) {
        console.error("Failed to refresh CSRF token:", csrfError);
      }
    }

    // Log error untuk debugging
    if (error.response?.status === 419) {
      console.error("CSRF Error Details:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        xsrfToken: getXSRFToken(),
        cookies: document.cookie,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
