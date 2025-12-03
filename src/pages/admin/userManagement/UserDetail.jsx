import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserFunApi } from "../../../store/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriberDetail } from "../../../store/others/otherServices";
import Loader from "../../../Components/Loader";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const getDetail = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getSubscriberDetail(userId));
      const data = response.payload.data;
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    code: "+1",
    fullAddress: "",
    country: "",
    email: "",
    password: "",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-01"),
    profileImage: "/assets/logo/Avatar.png",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  // Format date to DD.MM.YYYY
  // const formatDate = (date) => {
  //   return date
  //     .toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //     })
  //     .replace(/\//g, ".");
  // };

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="h-full w-full bg-white">
      <div className="max-w-5xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-wrap justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  {user?.profileImage && (
                    <img
                      src={user?.profileImage}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#242731] mb-1"
              >
                Full name
              </label>
              <input
                id="firstName"
                type="text"
                value={user?.name}
                disabled
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-[#242731] mb-1"
              >
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  id="code"
                  value={user?.phone?.code}
                  onChange={handleInputChange}
                  disabled
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
                >
                  <option value={user?.phone?.code || "+1"}>
                    {user?.phone?.code || "+1"}
                  </option>
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={user?.phone?.number}
                  disabled
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-[#242731] mb-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                disabled
                value={user?.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#242731] mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                disabled
                value={user?.email}
                onChange={handleInputChange}
                placeholder="xyz@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
            </div>

            {/* Subject Subscription */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#242731] mb-1"
              >
                Level
              </label>
              <input
                id="subscription Subject"
                type="text"
                disabled
                value={user?.level}
                onChange={handleInputChange}
                placeholder="A level"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Subscription Info */}
          <div className="mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                {user?.subscriptionPlan.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full shadow-md rounded-lg">
                      <thead className="bg-[#F2F4FF]">
                        <tr>
                          <th className="px-4 py-2 text-left">Subject Name</th>
                          <th className="px-4 py-2 text-left">
                            Course Overview
                          </th>
                          <th className="px-4 py-2 text-left">Start Date</th>
                          <th className="px-4 py-2 text-left">End Date</th>
                          <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user?.subscriptionPlan.map((plan) => (
                          <tr key={plan?._id} className="border-t">
                            <td className="px-4 py-2">{plan?.planId?.name}</td>
                            <td className="px-4 py-2">
                              {plan?.planId?.courseOverview}
                            </td>
                            <td className="px-4 py-2">
                              {new Date(plan?.startDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                              {new Date(plan?.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`px-3 py-1 rounded ${plan?.isActive
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-500 text-white"
                                  }`}
                              >
                                {plan?.isActive ? "Active" : "Expired"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No active subscriptions.</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetail;
