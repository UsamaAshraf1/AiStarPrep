import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../../Components/Modals/SuccessModal";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFunApi } from "../../store/auth/authServices";

function CreateNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const status = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Please confirm your Password")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  });

  // const { token } = useParams();

  // if (!token) {
  //   return <div>Invalid or expired token.</div>;
  // }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          resetPasswordFunApi({
            // token,
            password: values.password,
            confirmPassword: values.confirmPassword,
          })
        );
        if (resetPasswordFunApi.fulfilled.match(resultAction)) {
          setShowSuccessModal(true);
        } else {
          console.error("Action Failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <>
      <div className="min-h-screen w-screen flex">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto p-6 space-y-8">
            {/* page Description*/}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Create New Password
              </h1>
              <p className="text-gray-600">
                Reset Your password to regain access to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-[#EA2A2A] text-sm font-medium">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-[#EA2A2A] text-sm font-medium">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === true}
                className="w-full bg-[#0072CF] text-white py-3 rounded-full"
              >
                {status === true ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="hidden lg:block lg:w-1/2 max-h-screen relative">
          <img
            src="/assets/images/authImage.png"
            alt="Office environment"
            fill
            className="object-cover w-full max-h-screen"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-8">
            <blockquote className=" absolute max-w-sm text-lg text-white space-y-2 right-10 bottom-10 bg-black/55 p-5 rounded">
              <p className="text-lg">
                The future belongs to those who believe in the beauty of their
                dreams.
              </p>
              <footer className="text-sm font-medium text-right">
                -Eleanor Roosevelt
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop with blur effect */}
          <div className="fixed inset-0 bg-[#0072CF26] bg-opacity-50 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <SuccessModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNewPassword;
