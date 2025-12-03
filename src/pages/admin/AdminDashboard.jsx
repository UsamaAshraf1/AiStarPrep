import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaDollarSign, FaRegClock } from "react-icons/fa";
import { getAllUsersFunApi } from "../../store/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../helper/api";
import RevenueChart from "./userManagement/RevenewCart";
import Loader from "../../Components/Loader";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth.allUsers);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const latestUsers = data
    .filter((user) => user.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
    

    useEffect(() => {
      dispatch(getAllUsersFunApi({}));
    }, [dispatch]);    

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/dashboard/metrics", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`
        // }
      });

      const sanitizedData = {
        activeUsers: {
          value: response.data.data.activeUsers?.value || "0",
          trend: response.data.data.activeUsers?.trend || "0% No change",
        },
        newSubscriptions: {
          value: response.data.data.newSubscriptions?.value || "0",
          trend: response.data.data.newSubscriptions?.trend || "0% No change",
        },
        revenue: {
          value: response.data.data.revenue?.value || "$0",
          trend: response.data.data.revenue?.trend || "0% No change",
        },
        userEngagement: {
          value: response.data.data.userEngagement?.value || "0%",
          trend: response.data.data.userEngagement?.trend || "0% No change",
        },
      };

      setMetrics(sanitizedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch dashboard metrics");
      console.error("Error fetching metrics:", err);

      // Set default values on error
      setMetrics({
        activeUsers: { value: "0", trend: "0% No change" },
        newSubscriptions: { value: "0", trend: "0% No change" },
        revenue: { value: "$0", trend: "0% No change" },
        userEngagement: { value: "0%", trend: "0% No change" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 300000);
    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend) => {
    if (!trend || trend.includes("No change")) return "text-gray-500";
    return trend.includes("Up") ? "text-emerald-500" : "text-red-500";
  };

  const cards = [
    {
      title: "Total Users",
      value: metrics?.activeUsers.value,
      trend: metrics?.activeUsers.trend,
      icon: <FaUsers className="w-7 h-7 text-[#8280FF]" />,
      bgColor: "bg-[#E5E4FF]",
    },
    {
      title: "Active Subscriptions",
      value: metrics?.newSubscriptions.value,
      trend: metrics?.newSubscriptions.trend,
      icon: <FaBox className="w-7 h-7 text-[#FEC53D]" />,
      bgColor: "bg-[#FFF3D6]",
    },
    {
      title: "Revenue",
      value: metrics?.revenue.value,
      trend: metrics?.revenue.trend,
      icon: <FaDollarSign className="w-7 h-7 text-[#4AD991]" />,
      bgColor: "bg-[#D9F7E8]",
    },
    {
      title: "User Engagement",
      value: metrics?.userEngagement.value,
      trend: metrics?.userEngagement.trend,
      icon: <FaRegClock className="w-7 h-7 text-[#D91C4B]" />,
      bgColor: "bg-[#F7D1DB]",
    },
  ];

  const filteredUsers = latestUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = filterDate
      ? new Date(user.createdAt).toLocaleDateString() === filterDate
      : true;
    const matchesStatus = filterStatus
      ? filterStatus === "active"
        ? user.active
        : !user.active
      : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  if (loading) return <Loader loading={loading} />;


  return (
    <div className="p-6 w-full lg:max-w-[1200px] mx-auto">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-[#202224] font-medium mb-2">
                  {card.title}
                </p>
                <h3 className="text-[#202224] text-2xl font-semibold">
                  {card.value}
                </h3>
              </div>
              <div className={`${card.bgColor} p-3 rounded-xl`}>
                {card.icon}
              </div>
            </div>
            <div
              className={`flex items-center ${getTrendColor(
                card.trend
              )} text-sm`}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {card.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-200 mt-24">
        {/* <h2 className="text-lg font-semibold mb-4">Revenue Details</h2> */}
        <RevenueChart />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">New Users</h2>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-[#F2F4FF]">
                  <tr>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      User ID
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      User Name
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Email
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Level
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Country
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Created At
                    </th>
                    {/* <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Last Active Date
                    </th> */}
                    {/* <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Subscription
                    </th> */}
                    {/* <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Active/Inactive
                    </th>
                    <th className="p-4 text-left text-sm text-normal text-[#292929]">
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="p-4 text-sm text-[#292929]">{user._id}</td>
                      <td className="p-4 text-sm font-medium text-[#292929]">
                        {user.name}
                      </td>
                      <td className="p-4 text-sm text-[#292929]">
                        {user.email}
                      </td>
                      <td className="p-4 text-sm text-[#292929]">
                        {user.level || "N/A"}
                      </td>
                      <td className="p-4 text-sm text-[#292929]">
                        {user.country}
                      </td>
                      <td className="p-4 text-sm text-[#292929]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
