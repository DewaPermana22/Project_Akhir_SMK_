import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export const login = async (credentials) => {
  try {
    const res = await axios.get("/sanctum/csrf-cookie");
    const response = await axios.post("/api/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error;
  }
};

export const getUserAuth = async () => {
  try {
    const response = await axios.get("/api/user");
    return response.data;
  } catch (error) {
    return { authenticated: false };
  }
}
export const logout = async () => {
  try {
    const response = await axios.post("/api/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data);
    throw error;
  }
};