import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});