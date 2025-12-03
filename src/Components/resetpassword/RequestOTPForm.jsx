import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { passwordResetRequestFunApi } from "../../store/auth/authServices";
import * as Yup from "yup";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { Link } from 'react-router-dom';

function RequestOTPForm({ onSuccess }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoading);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      countryCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(passwordResetRequestFunApi({ data: values }));
      if (passwordResetRequestFunApi.fulfilled.match(resultAction)) {
        onSuccess(values);
      }
    },
  });

  return (
    <div className="space-y-2">
      <div className="space-y-2">

        <h1 className="text-2xl font-semibold text-gray-900">
          Forgot Password
        </h1>
        <p className="text-gray-600">
          Enter the phone number registered with your account. We&apos;ll
          send you a OTP to reset your password.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="country" className="text-sm font-medium">
            Phone Number
          </label>
          <PhoneInput
            country={"pk"}
            enableSearch={true}
            value={`${formik.values.countryCode}${formik.values.phoneNumber}`}
            onChange={(value, country) => {
              if (value) {
                const dialCode = `+${country.dialCode}`;
                const code = `${country.dialCode}`;
                let numberWithoutCode = value.startsWith(code)
                  ? value.replace(code, "")
                  : value;

                formik.setValues({
                  ...formik.values,
                  countryCode: code,
                  phoneNumber: numberWithoutCode,
                });
              }
            }}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-[#EA2A2A] text-sm font-medium">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>
        {/* Bitton */}
        <button
          type="submit"
          disabled={status === true}
          className="w-full bg-[#0072CF] text-white py-3 rounded-full"
        >
          {status === true ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Navigate to Login Page */}
      <div className="text-start">
        <p className="text-sm text-gray-600 inline">
          Remembered Password?{" "}
          <Link
            to="/auth/signin"
            className="text-sm text-[#0072CF] hover:underline font-medium"
          >
            Login to your account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RequestOTPForm;