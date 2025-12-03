import React from "react";
import { LuLogOut, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function LogoutModal({ onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user"); // Clear authentication token
    localStorage.clear();
    onClose();
    navigate("/auth/signin"); // Redirect to login page
  };
  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <LuX className="w-5 h-5" />
      </button>

      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4  flex-shrink-0">
          <LuLogOut className="text-[#0072CF] w-6 h-6" />
        </div>
        <h2 className="text-2xl font-medium">
          Are you sure you want to Logout?
        </h2>
      </div>

      <p className="text-[#707070] mb-6 px-2 text-center">
        You will be logged out of your account and redirected to the login page.
      </p>

      <div className="flex justify-end space-x-4">
        <button
          className="w-full py-2 text-black border border-black rounded-full font-medium"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="w-full py-2 bg-[#D6083B] text-white rounded-full font-medium"
          onClick={handleLogout}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
