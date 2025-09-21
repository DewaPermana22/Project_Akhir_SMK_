import axiosInstance from "../AxiosInstance";


export const fetchKelasYangDiajar = async () => {
    try {
        const res = await axiosInstance.get('/classroom/i-teach');
        return res.data;
    } catch (error) {
        console.error("Error when call fetchKelasYangDiajar", error);
        throw error;
    }
}