import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import sidebarData from "../data/sidebarData.json";
import { ModalProvider, useModal } from "../helper/ModalContext";
import { setSessionExpiredModal } from "../helper/api";
import UserSessionExpire from "../Components/Modals/UserSessionExpire";
import { useDispatch } from "react-redux";
import { fetchCart } from "../store/cart/cartServices";

function UserLayout() {
  const userMenuData = sidebarData.user;
  const { openModal, closeModal } = useModal();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user)._id : null;

    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    setSessionExpiredModal(() => {
      openModal(<UserSessionExpire onClose={() => closeModal()} />);
    });
  }, [openModal]);

  return (
    // <ModalProvider>
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="lg:fixed lg:top-0 lg:left-0 h-full lg:w-64 z-30">
        <Sidebar
          menuData={userMenuData}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        <div className="lg:fixed lg:top-0 lg:left-64 lg:right-0 h-16 bg-white shadow z-20">
          <Header onMenuClick={toggleSidebar} />
        </div>

        <main className="flex-1 mt-4 md:mt-16 overflow-y-auto p-1 md:p-4 bg-white z-10">
          <Outlet />
        </main>
      </div>
    </div>
    // </ModalProvider>
  );
}

export default UserLayout;
