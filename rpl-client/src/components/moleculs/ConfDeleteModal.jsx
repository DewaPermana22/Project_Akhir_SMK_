import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalConfirmDelete } from "../../features/modals/ConfirmDeleteModal";
import { FaQuestion } from "react-icons/fa6";

const ConfirmationDeleteModal = ({ onConfirm }) => {
  const { openConfirmDeleteModal, title, message, data } = useSelector(
    (state) => state.modal_confirm_delete
  );
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (openConfirmDeleteModal) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openConfirmDeleteModal]);

  const handleClose = () => dispatch(closeModalConfirmDelete());

  const handleConfirm = () => {
    if (onConfirm) onConfirm(data);
    handleClose();
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center flex-col mb-5 relative">
          <FaQuestion size={50} className="text-[var(--indigo-dark)]" />
          <div className="flex flex-col justify-center items-center">
            <p className="font-eudo-bold text-lg text-[var(--indigo-dark)]">
              {title}
            </p>
            <p className="text-[var(--gray-3)] leading-4 text-xs">{message}</p>
          </div>
          <div className="flex gap-2 justify-center w-full mt-5">
            <button
              onClick={handleConfirm}
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

export default ConfirmationDeleteModal;
