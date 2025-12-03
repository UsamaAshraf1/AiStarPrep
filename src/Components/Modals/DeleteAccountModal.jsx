import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LuTrash2 } from "react-icons/lu";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFunApi } from "../../store/auth/authServices";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  reason: Yup.string().required("Please provide a reason for deletion"),
  password: Yup.string().required("Password is required to confirm deletion"),
});

function DeleteAccountModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoading);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      reason: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          deleteUserFunApi({
            userId: user._id,
            password: values.password,
          })
        );

        if (deleteUserFunApi.fulfilled.match(resultAction)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/auth/signin");
          toast.success("User deleted successfully");
        } else {
          toast.error(resultAction.error.message);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred";

        toast.error(errorMessage);
      }
    },
  });

  return (
    <div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-[#E5E5E5] text-[#D6083B] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
        >
          <LuX size={20} />
        </button>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-[100px] h-[100px] bg-red-50 rounded-full flex items-center justify-center">
            <LuTrash2 className="w-8 h-8 text-[#D6083B]" />
          </div>
        </div>

        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-3">Delete Account</h2>

        {/* Warning */}
        <p className="text-[#D6083B] text-center text-sm mb-4">
          <span className="font-medium">WARNING</span> this is permanent and
          cannot be undone!
        </p>

        {/* Description */}
        <p className="text-[#292929] text-base text-center mb-6">
          Please make sure that you have saved any important data before
          proceeding. If you have any doubts, you can always cancel the deletion
          process.
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-[#292929] mb-1"
            >
              Reason for Deletion
            </label>
            <input
              id="reason"
              type="text"
              placeholder="Reason*"
              {...formik.getFieldProps("reason")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {formik.touched.reason && formik.errors.reason && (
              <div className="text-[#D6083B] text-sm mt-1">
                {formik.errors.reason}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#292929] mb-1"
            >
              Please enter your current password to proceed to account deletion.
            </label>
            <div className="relative">
              <input
                id="password"
                placeholder="Enter your password*"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              <div className="text-[#D6083B] text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === true}
              className="w-full px-4 py-3 bg-[#D6083B] text-white rounded-full transition-colors"
            >
              {status === true ? "In Progress..." : "Delete Account"}
            </button>
          </div>
        </form>
      </div>
  );
}

export default DeleteAccountModal;
