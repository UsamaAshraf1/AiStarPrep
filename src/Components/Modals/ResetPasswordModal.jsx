import React from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";

function ResetPasswordModal({ onClose, onContinue }) {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Password is required")
      .email("PLease aenter an invalid email address"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onContinue();
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
        <h3 className="text-2xl font-bold text-[#0072CF] mb-2">
          Reset Your Password
        </h3>
        <p className="text-xl font-normal text-[#868686] mb-6">
          Enter your registered email address to reset password
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
                id="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#EA2A2A] text-sm font-medium">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#0072CF] text-white rounded-full"
            >
              Continue
            </button>
          </div>
        </form>

        {/* <div className="space-y-4">
          <div>
            <label
              htmlFor="resetPassword"
              className="block text-[#4F4F4F] font-medium mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              type="button"
              className="px-5 py-2 bg-[#0072CF] text-white rounded-full"
              onClick={onContinue}
            >
              Continue
            </button>
          </div>
        </div> */}
      </div>
  );
}

export default ResetPasswordModal;
