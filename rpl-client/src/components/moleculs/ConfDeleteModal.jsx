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
        className={`flex flex-col justify-center p-4 shadow-md bg-white border-1 border-gray-200 rounded-sm max-w-md lg:w-full h-fit items-center transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 items-center flex-col mb-5 relative">
          <div className="flex justify-center bg-red-500 rounded-full p-4 shadow">
          <FaQuestion size={30} className="text-white" />
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <p className="font-eudo-bold text-[var(--indigo-dark)]">
              {title}
            </p>
            <p className="text-center text-gray-500 leading-4 text-xs">{message}</p>
          </div>
          <div className="flex gap-2 justify-center w-full mt-5">
            <button
              onClick={handleConfirm}
              className="bg-[var(--green)] p-2 w-[100px] cursor-pointer hover:bg-green-600 transition-colors ease-linear duration-200 rounded-sm text-sm text-white"
            >
              Iya
            </button>
            <button
              onClick={handleClose}
              className="bg-[var(--red)] p-2 w-[100px] cursor-pointer  transition-colors ease-linear duration-200 rounded-sm text-sm text-white"
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
