import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye, FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerFunApi } from "../../store/auth/authServices";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import { useModal } from "../../helper/ModalContext";
import VerifySignup from "../../Components/Modals/VerifySignup";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || ""; // Default to empty string if not present
  const countries = useMemo(() => countryList().getData(), []);
  const { openModal, closeModal } = useModal();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    country: Yup.string().required("Please Select a country"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Please confirm your Password")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: null,
      phoneNumber: "",
      countryCode: "",
      password: "",
      confirmPassword: "",
      referral_code: referralCode,
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const submissionValues = {
        ...values,
      };
      try {
        const resultAction = await dispatch(
          registerFunApi({ data: submissionValues })
        );
        
        if (registerFunApi.fulfilled.match(resultAction)) {
          const data = resultAction.payload;
          const hashRes = data.hash;

          openModal(<VerifySignup hashData={hashRes} onClose={closeModal} />);

        } else {
          console.error("Sign up failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <div className="min-h-screen w-screen flex">
      <div className="absolute w-full top-5 z-50">
        <div className="flex items-center justify-between px-5 md:px-10">
          <button
            onClick={() => navigate('/')}
            className="text-[#0072CF] flex items-center"
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>
      </div>
      <div className="w-full flex z-0">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-4">
              <div className="w-full flex justify-center">
                <div className="w-20">
                  <img
                    src={"/AiStar.png"}
                    alt="App Logo"
                    className="object-contain w-full"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

              {/* Google Sign up Button */}
              {/* <button className="w-full flex items-center justify-center gap-2 bg-[#F4F7FF] rounded-md px-4 py-3 text-sm font-medium">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button> */}

              {/* Divider */}
              {/* <div className="relative">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm font-medium">
                  <span className="bg-white px-2 text-[#4B5768]">
                    or sign up with
                  </span>
                </div>
              </div> */}

              {/* Login Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Becca Ade"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-[#EA2A2A] text-sm font-medium">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="xyz@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-[#EA2A2A] text-sm font-medium">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Country Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country
                  </label>
                  <Select
                    id="country"
                    options={countries}
                    value={countries.find((option) => option.label === formik.values.country) || null} // Map back to full object
                    onChange={(option) =>
                      formik.setFieldValue("country", option?.label || "")
                    }
                    onBlur={() => formik.setFieldTouched("country", true)}
                    placeholder="Select a country"
                    classNamePrefix="select"
                    isClearable
                  />
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-[#EA2A2A] text-sm font-medium">
                      {formik.errors.country}
                    </p>
                  )}
                </div>
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

                {/* Password */}
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

                {/* Confirm Password */}
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

                {/* term and Condition section */}
                <div className="flex items-start space-x-2">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={formik.values.acceptTerms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1"
                  />
                  <label htmlFor="remember" className="text-sm font-normal">
                    By creating an account, I accept the{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-[#0072CF] cursor-pointer underline underline-offset-2"
                    >
                      terms and conditions
                    </Link>{" "}
                    and agree with{" "}
                    <Link
                      to="/terms-and-conditions"
                      className="text-[#0072CF] cursor-pointer underline underline-offset-2"
                    >
                      privacy polices.
                    </Link>
                  </label>
                </div>
                {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                  <p className="text-[#EA2A2A] text-sm font-medium">
                    {formik.errors.acceptTerms}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === true}
                  className="w-full bg-[#0072CF] text-white py-3 rounded-full"
                >
                  {status === true ? "Signing up..." : "Signup"}
                </button>
              </form>

              {/* Navigate to Login Page */}
              <p className="text-center text-sm font-medium">
                Have an Account?{" "}
                <Link to="/auth/signin" className="text-sm text-[#0072CF]">
                  Sign in here
                </Link>
              </p>
            </div>
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
            <blockquote className=" absolute max-w-sm text-lg text-white space-y-1 right-10 bottom-10 bg-black/55 p-5 rounded">
              <p className="text-lg">
                The future belongs to those who believe in the beauty of their dreams.
              </p>
              <footer className="text-sm font-medium text-right">
                -Eleanor Roosevelt
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
