import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";
import ModalAuthentication from "../moleculs/ModalAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/modals/ModalSlice";
import { useNavigate } from "react-router";
import { setUser } from "../../features/UserSlice";
import { setRole } from "../../features/ActiveMenu";
import toast from "react-hot-toast";
import { navigationPath } from "@/app/navigation";
import { getRoleName, getStatus } from "@/app/utils/get-name";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated, refreshUser } = useAuth();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {}, [isAuth]);

  const ClickButton = async () => {
    try {
      if (isAuthenticated && user) {
        dispatch(
          setUser({
            name: user.name,
            email: user.email,
            role: getRoleName(user.role_id),
            status: getStatus(user.status_id),
          })
        );

        const roleName = getRoleName(user.role_id);
        dispatch(setRole(roleName));
        navigate(`/dashboard/${roleName.trim().toLowerCase()}`);
        return;
      }

      const refreshPromise = refreshUser();
      toast.promise(refreshPromise, {
        loading: "Memeriksa sesi pengguna...",
        success: (result) => {
          if (result.authenticated) {
            dispatch(
              setUser({
                name: result.user.name,
                email: result.user.email,
                role: getRoleName(result.user.role_id),
                status: getStatus(result.user.status_id),
              })
            );

            const roleName = getRoleName(result.user.role_id);
            dispatch(setRole(roleName));
            navigate(`/dashboard/${roleName.trim().toLowerCase()}`);
            
            return "Berhasil masuk ke dashboard!";
          } else {
            dispatch(openModal());
            throw new Error("Sesi telah berakhir, Silahkan login terlebih dahulu!");
          }
        },
        error: (err) => {
          dispatch(openModal());
          return err.message || "Silahkan login untuk melanjutkan";
        },
      });
    } catch (err) {
      console.error(err);
      dispatch(openModal());
    }
  };

  return (
    <>
      <nav className="z-[1000] flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-indigo-100/20 p-5 fixed w-full top-0 left-0 right-0 transition-all duration-500 ease-out">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/40 via-white/60 to-purple-50/40 backdrop-blur-xl"></div>
        <div className="relative z-10 flex items-center">
          <object
            className="max-w-[45px] lg:max-w-[65px] w-full h-auto object-contain drop-shadow-sm"
            data="/svg/NewLogoRPL.svg"
            type=""
          ></object>
          <div className="flex flex-col justify-start ml-2">
            <p className="lg:text-base font-eudo-bold text-[var(--blue)] text-sm drop-shadow-lg">
              Rekayasa Perangkat Lunak.
            </p>
            <span className="text-[10px] text-gray-500 lg:text-xs">
              SMKN 8 JEMBER
            </span>
          </div>
        </div>
        <ul className="relative z-10 hidden xl:flex list-none gap-8 items-center">
          {navigationPath.map((item, index) => (
            <li key={index}>
              <HashLink
                className="font-eudo-bold text-gray-600 hover:text-indigo-700 text-[18px] transition-all duration-300 ease-out hover:drop-shadow-sm relative group"
                smooth
                to={item.link}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
              </HashLink>
            </li>
          ))}
        </ul>
        <button
          onClick={ClickButton}
          className="relative z-10 group text-sm hidden xl:block lg:text-sm font-medium linear-purple p-2.5 lg:py-4 lg:px-8 cursor-pointer transition-all duration-500 ease-out rounded-[16px] text-white shadow-lg shadow-indigo-500/30 backdrop-blur-sm border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          <span className="relative z-10">
            {isAuthenticated ? "Masuk ke Dashboard" : "Login Ke Aplikasi RPL"}
          </span>
        </button>
        <div className="relative z-10 xl:hidden flex items-center">
          {open ? (
            <MdClose
              className="text-3xl cursor-pointer text-gray-700 hover:text-indigo-700 transition-all duration-300 ease-out"
              onClick={() => setOpen((prev) => !prev)}
            />
          ) : (
            <IoMenu
              className="text-3xl cursor-pointer text-gray-700 hover:text-indigo-700 transition-all duration-300 ease-out"
              onClick={() => setOpen((prev) => !prev)}
            />
          )}
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed h-screen inset-0 bg-white/90 backdrop-blur-2xl z-[100] transform transition-all duration-500 ease-out xl:hidden border-r border-white/20 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 to-purple-50/60"></div>
        
        <ul className="relative z-10 flex flex-col text-center gap-8 p-6 mt-32 text-gray-700">
          {navigationPath.map((item, index) => (
            <li key={index} className="transform transition-all duration-300 ease-out">
              <HashLink
                className="font-eudo-bold text-[18px] hover:text-indigo-700 transition-all duration-300 ease-out"
                smooth
                to={item.link}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </HashLink>
            </li>
          ))}
          <li className="mt-6">
            <button
              className="group max-w-sm text-center text-white text-xs font-medium p-4 rounded-[16px] bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-500 ease-out backdrop-blur-sm border border-white/20 overflow-hidden"
              onClick={ClickButton}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">
                {isAuthenticated ? "Masuk ke Dashboard" : "Login Ke Aplikasi RPL"}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <ModalAuthentication />
    </>
  );
};

export default Navbar;