import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { clearUser } from "@/features/UserSlice";
import { closeModalConfirmLogout } from "@/features/modals/ConfirmLogoutModalSlice";
import { useAuth } from "@/contexts/AuthContext";

export function useLogout() {
  const dispatch = useDispatch();
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const logoutPromise = logout()
      .then((response) => {
        dispatch(clearUser());
        dispatch(closeModalConfirmLogout());
        navigate("/");
        return response.message;
      })
      .catch((error) => {
        throw error.response?.data?.message || "Logout gagal!";
      })

    toast.promise(logoutPromise, {
      loading: "Sedang logout...",
      success: (msg) => msg || "Logout berhasil!",
      error: (err) => err || "Terjadi kesalahan saat logout",
    });
  };

  return {handleLogout};
}
