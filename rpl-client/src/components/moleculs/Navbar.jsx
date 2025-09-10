import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";
import ModalAuthentication from "../moleculs/ModalAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../features/modals/ModalSlice";
import { getUserAuth } from "../../api/services/LoginService";
import { useNavigate } from "react-router";
import { setUser } from "../../features/UserSlice";
import { setRole } from "../../features/ActiveMenu";
import toast from "react-hot-toast";
import { navigationPath } from "@/app/navigation";
import { getRoleName, getStatus } from "@/app/utils/get-name";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user);
  const ClickButton = async () => {
    try {
      toast.promise(getUserAuth(), {
        loading: "Sedang memuat data pengguna...",
        success: (res) => {
          if (res.authenticated) {
            toast.success("Berhasil memuat data pengguna!");
        dispatch(
          setUser({
            name: res.user.name,
            email: res.user.email,
            role: getRoleName(res.user.role_id),
            status: getStatus(res.user.status_id),
          })
        );

        const roleName = getRoleName(res.user.role_id);
        dispatch(setRole(roleName));
        navigate(`/dashboard/${roleName.trim().toLowerCase()}`);
      } else {
        toast.error("Sesi pengguna telah habis!, Silahkan Login kembali.");
        dispatch(openModal());
      }
        },
        error: (err) => err.message || "Terjadi kesalahan saat memuat...",
      });

    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <>
      <nav className="z-[1000] flex justify-between items-center bg-[var(--indigo-dark)] p-5 fixed w-full top-0 left-0 right-0">
        <div className="flex items-center">
          <object
            className="max-w-[45px] lg:max-w-[75px] w-full h-auto object-contain"
            data="/svg/Logo-Transparent.svg"
            type=""
          ></object>
          <div className="flex flex-col justify-start ml-2">
            <p className="lg:text-base font-bold text-[var(--lavender)] text-sm">
              Rekayasa Perangkat Lunak.
            </p>
            <span className="text-[10px] lg:text-xs">SMKN 8 JEMBER</span>
          </div>
        </div>
        <ul className="hidden xl:flex list-none gap-5 items-center">
          {navigationPath.map((item, index) => (
            <li key={index}>
              <HashLink className="font-bold text-[18px]" smooth to={item.link}>{item.name}</HashLink>
            </li>
          ))}
        </ul>
        <button
          onClick={ClickButton}
          className="text-sm hidden xl:block lg:text-lg font-medium bg-[var(--lime)] p-2.5 lg:py-2.5 lg:px-6 cursor-pointer transition-all duration-300 ease-in-out rounded-[10px] text-[var(--indigo-dark)] hover:bg-[var(--lavender)]"
        >
          {isAuth ? "Masuk ke Dashboard" : "Login Ke Aplikasi RPL"}
        </button>
        <div className="xl:hidden flex items-center">
          {open ? (
            <MdClose
              className="text-3xl cursor-pointer text-[var(--white)]"
              onClick={() => setOpen((prev) => !prev)}
            />
          ) : (
            <IoMenu
              className="text-3xl cursor-pointer text-[var(--white)]"
              onClick={() => setOpen((prev) => !prev)}
            />
          )}
        </div>
      </nav>
      <div
        className={`fixed h-screen inset-0 bg-[var(--indigo-dark)] z-[100] transform transition-all duration-300 ease-linear xl:hidden ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <ul className="flex flex-col text-center gap-6 p-6 mt-28 text-[var(--white)]">
          {navigationPath.map((item, index) => (
            <li key={index}>
              <HashLink className="font-bold text-[18px]" smooth to={item.link}>{item.name}</HashLink>
            </li>
          ))}
          <li>
            <button
              className="max-w-sm text-center text-sm font-medium bg-[var(--lime)] p-2.5 rounded-[10px] text-[var(--indigo-dark)] hover:bg-[var(--lavender)]"
              onClick={ClickButton}
            >
              {isAuth ? "Masuk ke Dashboard" : "Login Ke Aplikasi RPL"}
            </button>
          </li>
        </ul>
      </div>

      <ModalAuthentication />
    </>
  );
};

export default Navbar;
