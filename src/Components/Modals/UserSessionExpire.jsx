import React from "react";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function UserSessionExpire({ onClose }) {
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
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-medium">Your Session has been expired</h2>
      </div>

      <p className="text-[#707070] mb-6 px-2 text-center">
        Click Ok to login again.
      </p>

      <div className="flex justify-end space-x-4">
        <button
          className="w-full py-2 bg-[#0072CF] text-white rounded-full font-medium"
          onClick={handleLogout}
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default UserSessionExpire;
