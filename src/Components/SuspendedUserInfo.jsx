import React from "react";
import { useNavigate } from "react-router-dom";

const SuspendedUserInfo = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user"); // Clear authentication token
    localStorage.clear();
    navigate("/auth/signin"); // Redirect to login page
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-3xl flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-red-600">Account Suspended</h1>
        <p className="text-gray-700 mt-2">
          Your account has been suspended. Please contact
        </p>
        <a className="text-[#0072CF] underline underline-offset-2 cursor-pointer" href="mailto:info@aistarprep.com">info@aistarprep.com</a>
        <button
          className="w-full bg-[#0072CF] text-white py-3 rounded-full mt-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SuspendedUserInfo;
