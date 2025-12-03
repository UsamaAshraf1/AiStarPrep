import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFunApi } from "../../../store/auth/authServices";
import toast from "react-hot-toast";
import { LiaPauseCircle } from "react-icons/lia";
import SuspendUser from "../../../Components/Modals/admin/SuspendUser";
import Papa from "papaparse"; // Import papaparse for CSV export
import Loader from "../../../Components/Loader";
import axiosInstance from "../../../helper/api";

function UserManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, totalUsers } = useSelector((state) => state.auth.allUsers);
  const loading = useSelector((state) => state.auth.isLoading);
  const { openModal, closeModal } = useModal();

  const [subscriptionFilter, setSubscriptionFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [dateFilter, setDateFilter] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);  // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getAllUsersFunApi({
      page: currentPage,
      limit: usersPerPage,
      searchTerm: debouncedSearchTerm,
      subscriptionFilter,
      levelFilter,
      dateFilter,
      sortOrder
    }));
  }, [dispatch, currentPage, usersPerPage, debouncedSearchTerm, subscriptionFilter, levelFilter, dateFilter, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subscriptionFilter, levelFilter, dateFilter, sortOrder]);


  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const suspendUser = (userId, suspended) => {
    openModal(
      <SuspendUser
        userId={userId}
        suspended={suspended}
        onClose={() => closeModal()}
      />
    );
  };

  const viewDetails = (userId) => {
    navigate(`/admin/user-management/detail/${userId}`);
  };

  const downloadUsers = async () => {
    setIsLoading(true);
    const response = await axiosInstance.get('/auth/export-all-users', {
    });
    const users = response.data.data.users;

    if (users.length === 0) {
      toast.error("No users available to download");
      setIsLoading(false);
      return;
    }

    try {
      // Define the CSV fields and map data
      const csvData = users.map((user) => ({
        UserID: user._id,
        Name: user.name,
        Email: user.email,
        Country: user.country,
        Level: user.level,
        Subscription: user.isSubscription ? "Subscribed" : "Not Subscribed",
        Subjects: user.subscriptionPlan.length > 0
          ? user.subscriptionPlan.map(plan => plan.name).join(", ")
          : "No Plans",
        // Active: user.active ? "Active" : "Inactive",
        CreatedAt: new Date(user.createdAt).toLocaleDateString(),
      }));

      // Convert to CSV format
      const csv = Papa.unparse(csvData);

      // Create a Blob and trigger a download
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsLoading(false);
      toast.success("User data downloaded successfully");
    } catch (error) {
      console.error("Error generating CSV:", error);
      setIsLoading(false);
      toast.error("Failed to download user data");
    }
  };

  if (loading || isLoading) return <Loader loading />;


  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={downloadUsers}
          className="bg-[#0072CF] text-white px-6 py-2 rounded-full"
        >
          Download
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Subscribed">Subscribed</option>
            <option value="Not Subscribed">Not Subscribed</option>
          </select>

          {/* Level Filter */}
          <select
            className="p-2 border rounded"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">All</option>
            {[
              ...new Set(
                data.map((user) => user.level).filter((level) => level)
              ),
            ].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="last7">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
          </select>

        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F2F4FF]">
            <tr>
              <th className="p-4 text-left text-sm text-[#292929]">User ID</th>
              <th className="p-4 text-left text-sm text-[#292929]">
                User Name
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Email Address
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Activation Date
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Suspend
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Subscription
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length > 0 ? (
              data.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 text-sm text-[#292929]">{user._id}</td>
                  <td className="p-4 text-sm font-medium text-[#292929]">{user.name}</td>
                  <td className="p-4 text-sm text-[#292929]">{user.email}</td>
                  <td className="p-4 text-sm text-[#292929]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-[#292929]">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={user?.suspended} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-red-500 transition-colors">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </td>
                  <td className="p-4 text-sm text-[#292929]">
                    {user.isSubscription ? "Subscribed" : "Not Subscribed"}
                  </td>
                  <td className="p-2 text-sm text-[#292929] relative">
                    <div className="flex gap-2 relative">
                      <button onClick={() => viewDetails(user._id)}><LuEye className="h-5 w-5" /></button>
                      <button onClick={() => suspendUser(user._id, user?.suspended)}><LiaPauseCircle className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <select
            className="p-2 border rounded"
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserManagement;
