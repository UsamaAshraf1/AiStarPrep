import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginFunApi } from "../../store/auth/authServices";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // debugger;
        const resultAction = await dispatch(loginFunApi({ data: values }));

        if (loginFunApi.fulfilled.match(resultAction)) {
          const user = resultAction.payload?.user; // Get user data
          const token = resultAction.payload?.token; // Get user data
          const role = user?.role; // Get user role

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          // Redirect based on role
          setTimeout(() => {
            if (token) {
              if (role === "admin") {
                // navigate("/admin/dashboard");
                window.location.href = "/admin/dashboard";
              } else {
                // navigate("/user/dashboard");
                window.location.href = "/user/dashboard";

              }
            }
          }, 500);
        } else {
          console.error("Login failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <div className="relative min-h-screen w-screen flex">
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
            <div className="space-y-6">
              <div className="w-full flex justify-center">
                <div className="w-20">
                  <img
                    src={"/AiStar.png"}
                    alt="App Logo"
                    className="object-contain w-full"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-center">Login</h1>

              {/* Google Sign In Button */}
              {/* <button className="w-full flex items-center justify-center gap-2 bg-[#F4F7FF] rounded-md px-4 py-3 text-sm font-medium">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm font-medium">
                  <span className="bg-white px-2 text-[#4B5768]">
                    or sign in with
                  </span>
                </div>
              </div> */}

              {/* Login Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
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

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-[#0072CF]"
                    >
                      Forgot Password
                    </Link>
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

                {/* Remember me checkbox */}
                {/* <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" />
                  <label htmlFor="remember" className="text-sm font-normal">
                    Keep me signed in
                  </label>
                </div> */}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === true}
                  className="w-full bg-[#0072CF] text-white py-3 rounded-full"
                >
                  {status === true ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* navigaet to Singup */}
              <p className="text-center text-sm font-medium">
                Don&apos;t have an Account?{" "}
                {/* <Link to="/auth/signup" className="text-sm text-[#0072CF]">
                Sign up here
              </Link> */}
                <Link
                  to="/auth/signup"
                  className="text-sm text-[#0072CF]"
                >
                  Sign Up
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
            className="object-cover w-full max-h-screen"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-8">
            <blockquote className=" absolute max-w-sm text-lg text-white space-y-2 right-10 bottom-10 bg-black/55 p-5 rounded">
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

export default SignIn;
