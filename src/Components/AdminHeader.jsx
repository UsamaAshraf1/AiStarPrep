import React, { useState, useEffect } from "react";
import { FaRegBell, FaSearch, FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function AdminHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  let title = "Dashboard"; // Default title

  if (location.pathname.includes("user-management")) {
    title = "Manage Users";
  } else if (location.pathname.includes("upload-content")) {
    title = "Content Management";
  } else if (location.pathname.includes("notification-management")) {
    title = "Notification Management";
  } else if (location.pathname.includes("user-feeback")) {
    title = "User Feeback";
  } else if (location.pathname.includes("analytics")) {
    title = "Analytics";
  } else if (location.pathname.includes("subscriber-management")) {
    title = "Subscriber Management";
  } else if (location.pathname.includes("subscription-management")) {
    title = "Subscription Management";
  } else if (location.pathname.includes("support")) {
    title = "Support Requests";
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <div>
      <header className="h-20 border-b border-gray-200 bg-white px-12">
        <div className="flex h-full items-center justify-between">
          <div className="flex justify-start items-center gap-4">
            <button
              onClick={onMenuClick}
              className="text-[#979797] lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M5 6.5H19V8H5V6.5Z" fill="#1F2328" />
                <path d="M5 16.5H19V18H5V16.5Z" fill="#1F2328" />
                <path d="M5 11.5H19V13H5V11.5Z" fill="#1F2328" />
              </svg>
            </button>
            {/* Dynamic Title */}
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2 relative">
              {user ? (
                <>
                  <img
                    src={user.profileImage || "/assets/images/profileIcon.png"}
                    alt={user.name || "User avatar"}
                    className="rounded-full w-8 h-8"
                  />
                  <p className="font-medium">Admin</p>
                </>
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
