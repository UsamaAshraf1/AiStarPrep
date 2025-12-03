import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import sidebarData from "../data/sidebarData.json";
import { ModalProvider } from "../helper/ModalContext";
import AdminHeader from "../Components/AdminHeader";

function AdminLayout() {
  const adminMenuData = sidebarData.admin;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <ModalProvider>
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="lg:fixed lg:top-0 lg:left-0 h-full lg:w-64 z-30">
        <Sidebar
          menuData={adminMenuData}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        <div className="lg:fixed lg:top-0 lg:left-64 lg:right-0 h-16 bg-white shadow z-20">
          <AdminHeader onMenuClick={toggleSidebar} />
        </div>

        <main className="flex-1 mt-4 md:mt-16 overflow-y-auto p-1 md:p-4 bg-white z-10">
          <Outlet />
        </main>
      </div>
    </div>
  </ModalProvider>
  );
}

export default AdminLayout;
