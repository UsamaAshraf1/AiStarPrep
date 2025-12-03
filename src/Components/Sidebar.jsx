import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as iconMapper from "react-icons/fa6";
import LogoutModal from "./Modals/LogoutModal";
import { useModal } from "../helper/ModalContext";

function Sidebar({ menuData, isOpen, onClose }) {
  const location = useLocation(); // Get the current URL

  // state for active menu
  const [activeMenu, setActiveMenu] = useState(null);

  //  Set the active menu based on the current URL
  useEffect(() => {
    const activeItem = menuData.menus.find(
      (item) => item.href === location.pathname
    );
    setActiveMenu(activeItem ? activeItem.title : null);
  }, [location, menuData.menus]);

  const handleMenuClick = (title) => {
    setActiveMenu(title);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // modal handling with context
  const { openModal, closeModal } = useModal();

  const handleLogout = (title) => {
    // setLogoutModal(true);
    openModal(<LogoutModal onClose={() => closeModal()} />);
    setActiveMenu(title);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 lg:hidden
          ${isOpen ? "opacity-100 z-30" : "pointer-events-none opacity-0 z-0"}`}
        onClick={onClose}
      />

      {/* side bar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 h-full transform bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 border-r border-[#E6E9ED] min-h-screen z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="pt-5 mb-2 flex items-center justify-center">
          <Link to={'/'}>
            <img
              src="/AiStar.png"
              alt="Logo"
              className="w-[129px] h-[83px] object-contain"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {menuData.menus.map((item, index) => {
              if (item.divider) {
                return (
                  <hr
                    key={index}
                    className="my-4 border-t border-gray-300 px-5"
                  />
                );
              }
              // Determine if the current item is active
              const isActive = activeMenu === item.title;

              const IconComponent = iconMapper[item.icon];

              return (
                <li key={item.title}>
                  {item.title === "Log out" ? (
                    <button
                      onClick={() => handleLogout(item.title)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[19px] transition-colors ${isActive
                          ? "bg-[#0072CF] text-white"
                          : "text-[#526581] hover:bg-gray-100"
                        }`}
                    >
                      {IconComponent && (
                        <IconComponent className="w-[18px] h-[18px] flex-shrink-0" />
                      )}
                      <span className="font-thin">{item.title}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => handleMenuClick(item.title)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-[17px] transition-colors ${ //the text is basically 19px but its not adjusting in this width so i set up it to 17px
                        isActive
                          ? "bg-[#0072CF] text-white"
                          : "text-[#526581] hover:bg-gray-100"
                        }`}
                    >
                      {IconComponent && (
                        <IconComponent className="w-[18px] h-[18px]" />
                      )}
                      <span className="font-thin whitespace-nowrap">{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
