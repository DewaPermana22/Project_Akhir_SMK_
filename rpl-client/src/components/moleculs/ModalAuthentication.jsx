import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { CgClose } from "react-icons/cg";
import { closeModal } from "../../features/modals/ModalSlice";

const ModalAuthentication = () => {
  const stateModal = useSelector((state) => state.modal_auth.isOpenModal);
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
    dispatch(closeModal());
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
        className={`flex flex-col justify-center p-[40px] bg-white border-1 border-[var(--gray-3)] rounded-2xl max-w-md h-fit items-center transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={handleModalClick}
      >
        <div className="flex gap-1 items-center flex-col mb-5 relative">
          <img
            className="w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] rounded-lg object-cover"
            src="/svg/NewLogoRPL.svg"
            alt="logobrand"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="font-eudo-bold text-xl text-gray-700">
              Login SIM-RPL
            </p>
            <p className="text-[var(--gray-3)] leading-4 text-xs">
              Masuk ke sistem untuk mengakses fitur lengkap RPL
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute -top-5 -right-5 bg-indigo-100 p-2 rounded-full cursor-pointer hover:bg-indigo-200 transition-colors duration-200"
          >
            <CgClose className="text-[var(--indigo-dark)]" />
          </button>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default ModalAuthentication;
