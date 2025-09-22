import axiosInstance from "@/api/AxiosInstance";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeAuth = async () => {
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      try {
        const response = await axiosInstance.get("/api/user");

        // Jika berhasil, user authenticated
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Failed to get user data:",
          error.response?.data || error.message
        );

        setUser(null);
        setIsAuthenticated(false);

        if (error.response?.status === 500) {
          console.error("Server error, check Laravel logs");
        }
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:5062/api/auth/login", credentials, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      console.log(response)
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);

      // Log error detail untuk debug
      console.error("Login error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/logout");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUser = async () => {
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      const response = await axiosInstance.get("/api/user");
      console.log(response);

      setUser(response.data);
      setIsAuthenticated(true);
      return { authenticated: true, user: response.data };
    } catch (error) {
      console.error("Refresh user failed:", error);
      setUser(null);
      setIsAuthenticated(false);

      return {
        authenticated: false,
        error: error.response?.data?.message || "Sesi telah berakhir",
      };
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    refreshCsrf: () => axiosInstance.get("/sanctum/csrf-cookie"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
