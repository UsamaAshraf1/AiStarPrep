import React from "react";
import { Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";

function PasswordResetSucess() {
  return (
    <>
      <div className="min-h-screen w-screen flex">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto p-6 space-y-8">
            
            {/* page Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Password reset successfully
              </h1>
              <p className="text-gray-600">
                Your password has been updated. you can now use your new
                password to login.
              </p>
            </div>

            <div className="w-full flex justify-center">
              <FaRegCircleCheck className="w-20 h-20 text-[#2CB629]" />
            </div>

            {/* Navigate to login page */}
            <div>
              <Link to="/auth/signin">
                <button className="w-full bg-[#0072CF] text-white py-3 rounded-full">
                  Login
                </button>
              </Link>
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
    </>
  );
}

export default PasswordResetSucess;
