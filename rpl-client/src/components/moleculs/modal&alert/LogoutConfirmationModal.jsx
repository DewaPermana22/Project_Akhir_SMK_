import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "@/hooks/useLogout";
import { closeModalConfirmLogout } from "@/features/modals/ConfirmLogoutModalSlice";
const LogoutConfirmationModal = () => {
  const stateModal = useSelector(
    (state) => state.modal_confirm_logout.openConfirmLogoutModal
  );
  const { handleLogout } = useLogout();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (stateModal) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [stateModal]);

  const handleClose = () => {
    dispatch(closeModalConfirmLogout());
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed flex justify-center items-center bg-black/50 backdrop-blur-xs top-0 z-[1000] right-0 left-0 bottom-0 w-screen h-screen transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`flex flex-col justify-center p-5 bg-indigo-50 border-1 border-[var(--gray-3)] rounded-xl max-w-md lg:w-full h-fit items-center transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={handleModalClick}
      >
        <div className="flex gap-2 items-center flex-col mb-5 relative">
          <img
            className="w-[50px] h-[50px] rounded-lg object-cover"
            src="/svg/LogoRPL.svg"
            alt="logobrand"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="font-eudo-bold text-lg text-[var(--indigo-dark)]">
              Logout?
            </p>
            <p className="text-[var(--gray-3)] leading-4 text-xs">
              Apakah anda yakin ingin logout dari sistem?
            </p>
          </div>
          <div className="flex gap-2  justify-center w-full mt-5">
            <button
              onClick={() => handleLogout()}
              className="bg-green-500 p-2 w-[100px] cursor-pointer hover:bg-green-600 transition-colors ease-linear duration-200 rounded-sm text-sm text-white"
            >
              Iya
            </button>
            <button
              onClick={handleClose}
              className="bg-red-500 p-2 w-[100px] cursor-pointer hover:bg-red-600 transition-colors ease-linear duration-200 rounded-sm text-sm text-white"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
