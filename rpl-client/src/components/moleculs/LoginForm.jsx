import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { closeModal } from "@/features/modals/ModalSlice";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email tidak valid").required("Wajib diisi"),
      password: Yup.string()
        .min(6, "Minimal 6 karakter")
        .required("Wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Debug log
        console.log("Attempting login with:", values);

        await login(values);
        dispatch(closeModal());
        toast.success("Login berhasil!");
      } catch (error) {
        // Debug log untuk melihat error detail
        console.error("Login error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          message: error.message,
        });

        // Handle specific error codes
        if (error.response?.status === 419) {
          toast.error(
            "CSRF Token expired. Silahkan refresh halaman dan coba lagi."
          );
        } else if (error.response?.status === 401) {
          toast.error("Email atau password salah!");
        } else if (error.response?.status === 422) {
          toast.error("Data tidak valid!");
        } else {
          toast.error("Login gagal! Silahkan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col w-full justify-start">
        <label className="text-[var(--indigo-dark)] text-sm" htmlFor="email">
          Email
        </label>
        <input
          disabled={loading}
          className="rounded-xl outline-none text-base w-full text-gray-700 focus:outline-0 focus:border-2 focus:border-[var(--blue)] transition-colors duration-200 font-author-medium p-3 border-1 border-[var(--gray-3)]"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-xs text-red-500 font-eudo-bold pt-1 ml-2">
            {formik.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col w-full justify-start">
        <label className="text-[var(--indigo-dark)] text-sm" htmlFor="password">
          Password
        </label>
        <div className="rounded-xl text-base w-full text-gray-700 focus:outline-0 focus:border-2 focus:border-[var(--blue)] transition-colors duration-200 font-author-medium p-3 border-1 border-[var(--gray-3)] flex items-center">
          <input
            disabled={loading}
            className="bg-transparent outline-none w-full"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {showPassword ? (
            <AiOutlineEye
              onClick={() => setShowPassword(false)}
              className="w-6 h-6 cursor-pointer text-[var(--indigo-dark)]"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(true)}
              className="w-6 h-6 cursor-pointer text-[var(--indigo-dark)]"
            />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500 font-eudo-bold pt-1 ml-2">
            {formik.errors.password}
          </p>
        )}
      </div>

      <hr className="border-[var(--gray-4)]" />

      <button
        disabled={loading}
        className={`${
          loading
            ? "bg-[var(--gray-3)] cursor-not-allowed"
            : "linear-purple enhanced-box-shadow cursor-pointer"
        } text-[var(--white)] font-medium font-author-medium text-[15px] md:text-[18px] px-5 py-2.5 w-full rounded-lg`}
        type="submit"
      >
        {loading ? (
          <span className="flex gap-2 text-center justify-center items-center">
            Loading.... <AiOutlineLoading className="animate-spin" />
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
