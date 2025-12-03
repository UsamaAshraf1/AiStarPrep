import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LuX } from "react-icons/lu";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { changePasswordFunApi } from "../../store/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function CreateNewPasswordModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmNewPassword, setShowconfirmNewPassword] = useState(false);
  const status = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleconfirmNewPasswordVisibility = () =>
    setShowconfirmNewPassword((prev) => !prev);

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string()
      .required("Please confirm your Password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "", // Use lowercase 'c' for consistency
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(changePasswordFunApi(values));

        if (changePasswordFunApi.fulfilled.match(resultAction)) {
          onClose()
        } else {
          console.error("failed:", resultAction.payload); // Use `payload` from rejectWithValue
          toast.error(resultAction.payload);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred!");
      }
    },
  });

  return (
    <div>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
      >
        <LuX size={20} />
      </button>

      {/* Modal content */}
      <h3 className="text-2xl font-bold text-[#0072CF] mb-1">
        Change Your Password
      </h3>
      <p className="text-lg font-normal text-[#868686] mb-6">
        Create a new password to replace the old one
      </p>

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
        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
          </div>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-[#EA2A2A] text-sm font-medium">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="confirmNewPassword" className="text-sm font-medium">
              Confirm Password
            </label>
          </div>
          <div className="relative">
            <input
              id="confirmNewPassword"
              type={showconfirmNewPassword ? "text" : "password"}
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={toggleconfirmNewPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showconfirmNewPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <p className="text-[#EA2A2A] text-sm font-medium">
                {formik.errors.confirmNewPassword}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={status === true}
            className="px-5 py-2 bg-[#0072CF] text-white rounded-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewPasswordModal;
