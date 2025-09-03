import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Link from "../atoms/Link";
import ModalAuthentication from "../moleculs/ModalAuthentication";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modals/ModalSlice";
import { getUserAuth } from "../../api/services/LoginService";
import { useNavigate } from "react-router";
import { setUser } from "../../features/UserSlice";
import { getRoleName, getStatus } from "../../app/utils/get-name";
import { startLoading, stopLoading } from "../../features/LoadingSlice";
import { setRole } from "../../features/ActiveMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navigationPath = [
    { name: "Beranda", link: "index.html" },
    { name: "Pendidik", link: "tentang.html" },
    { name: "Berita", link: "kontak.html" },
    { name: "Alumni", link: "login.html" },
    { name: "Kesiswaan", link: "login.html" },
    { name: "PPDB", link: "login.html" },
  ];

   const dispatch = useDispatch();
   const ClickButton = async () => {
     try {
       dispatch(startLoading())
       const res = await getUserAuth();
       if (res.authenticated) {
        dispatch(
          setUser({
            name: res.user.name,
            email: res.user.email,
            role: getRoleName(res.user.role_id),
            status: getStatus(res.user.status_id),
          })
        );

        dispatch(setRole(getRoleName(res.user.role_id)));

        navigate(`/dashboard/${getRoleName(res.user.role_id).trim().toLocaleLowerCase()}`);
        
      } else {
        dispatch(openModal());
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(stopLoading());
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
              <Link href={item.link} name={item.name} />
            </li>
          ))}
        </ul>
        <button onClick={ClickButton} className="text-sm hidden xl:block lg:text-lg font-medium bg-[var(--lime)] p-2.5 lg:py-2.5 lg:px-6 cursor-pointer transition-all duration-300 ease-in-out rounded-[10px] text-[var(--indigo-dark)] hover:bg-[var(--lavender)]">
          Login Ke Aplikasi RPL
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
              <Link href={item.link} name={item.name} />
            </li>
          ))}
          <li>
            <button
              className="max-w-sm text-center text-sm font-medium bg-[var(--lime)] p-2.5 rounded-[10px] text-[var(--indigo-dark)] hover:bg-[var(--lavender)]"
              onClick={ClickButton}
            >
              Login Ke Aplikasi RPL
            </button>
          </li>
        </ul>
      </div>

      <ModalAuthentication/>
    </>
  );
};

export default Navbar;
