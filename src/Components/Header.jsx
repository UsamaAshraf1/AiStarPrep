import React, { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaArrowRightFromBracket, FaCartShopping, FaChevronDown, FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../helper/ModalContext";
import LogoutModal from "./Modals/LogoutModal";
import { useSelector } from "react-redux";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const { openModal, closeModal } = useModal();
  const user = JSON.parse(localStorage.getItem("user"));
  let title = "Dashboard"; // Default title
  const dropdownRef = useRef(null);
  const cartPlans = useSelector((state) => state.cart.plans);
  const cartCount = cartPlans.length;

  if (location.pathname.includes("exam")) {
    title = "Exam Mode";
  } else if (location.pathname.includes("dashboard")) {
    title = "Dashboard";
  } else if (location.pathname.includes("learning-analytics")) {
    title = "Learning Analytics";
  } else if (location.pathname.includes("learn")) {
    title = "Learn Mode";
  } else if (location.pathname.includes("subscription")) {
    title = "Subscription";
  } else if (location.pathname.includes("profile")) {
    title = "Profile Setting";
  } else if (location.pathname.includes("notifications")) {
    title = "Notifications";
  } else if (location.pathname.includes("contact-us")) {
    title = "Contact Us";
  } else if (location.pathname.includes("referral")) {
    title = "Refer Friends";
  } else if (location.pathname.includes("cart")) {
    title = "Cart";
  } else if (location.pathname.includes("checkout")) {
    title = "Checkout";
  }

  const handleLogout = () => {
    openModal(<LogoutModal onClose={closeModal} />);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div>
      <header className="h-20 border-b border-gray-200 bg-white px-6">
        <div className="flex h-full items-center justify-between">
          <div className="flex justify-start items-center gap-2">
            <button
              onClick={onMenuClick}
              className="text-[#979797] lg:hidden"
              aria-label="Toggle menu"
            >
              {/* <Menu className="h-6 w-6" /> */}
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
            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            <button
              variant="ghost"
              size="icon"
              className="relative text-[#979797]"
              onClick={() => navigate("/user/cart")}
            >
              <FaCartShopping className="h-5 w-5" />
              <span className="absolute -top-3 -right-3 h-5 w-5 flex justify-center items-center bg-red-500 text-white rounded-full text-sm font-medium">{cartCount}</span>
            </button>
            <button
              variant="ghost"
              size="icon"
              className="relative text-[#979797]"
              onClick={() => navigate("/user/notifications")}
            >
              <FaBell className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <img
                src={user.profileImage || "/assets/images/profileIcon.png"}
                alt="User avatar"
                className="rounded-full w-8 h-8"
              />
              <button
                size="icon"
                className="relative text-[#979797]"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <FaChevronDown className="h-4 w-4" />
              </button>
            </div>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-28 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                <button
                  onClick={() => {
                    navigate("/user/user-profile");
                    setShowDropdown(false);
                  }}
                  className="inline-flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaUser />
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="inline-flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaArrowRightFromBracket />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
