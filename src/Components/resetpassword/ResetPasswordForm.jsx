import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFunApi } from "../../store/auth/authServices";

function ResetPasswordForm({ phoneInfo, otp, onResetSuccess }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const status = useSelector((state) => state.auth.isLoading);

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

  const formik = useFormik({
    initialValues: {
      phoneNumber: phoneInfo?.phoneNumber,
      otp: otp,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          resetPasswordFunApi({
            phoneNumber: values.phoneNumber,
            otp: values.otp,
            password: values.password,
            confirmPassword: values.confirmPassword,
          })
        );
        if (resetPasswordFunApi.fulfilled.match(resultAction)) {
          onResetSuccess();
        } else {
          console.error("Action Failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create New Password
        </h1>
        <p className="text-gray-600">
          Reset Your password to regain access to your account
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {status === true ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}


export default ResetPasswordForm;