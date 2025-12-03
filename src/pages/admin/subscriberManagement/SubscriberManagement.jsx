import React, { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { LuEllipsisVertical, LuEye, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "../../../helper/api";
import { useDispatch } from "react-redux";
import { getSubscriber } from "../../../store/others/otherServices";
import Papa from "papaparse"; // Import papaparse for CSV export
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader";

 function SubscriberManagement() {
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const fetchSubscribedUsers = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getSubscriber());
      const users = response.payload.data || [];
      setSubscribedUsers(users);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch subscribed users"
      );
    } finally {
      setLoading(false);
    }
  };
  const subcriberDetails = (id) => {
    navigate(`/admin/subscriber-management/detail/${id}`)
  };
  useEffect(() => {
    fetchSubscribedUsers();
  }, []);

  
  const downloadUsers = () => {
    if (subscribedUsers.length === 0) {
      toast.error("No users available to download");
      return;
    }
  
    try {
      const csvData = subscribedUsers.map((user) => ({
        UserID: user._id,
        Name: user.name,
        Email: user.email,
        Country: user.country || "N/A",
        Level: user.level || "N/A",
        Subscription: user.isSubscription ? "Subscribed" : "Not Subscribed",
        Active: user.active ? "Active" : "Inactive",
        StartDate: user?.freeTrial?.startDate ? new Date(user.freeTrial.startDate).toLocaleDateString() : "N/A",
        EndDate: user?.freeTrial?.endDate ? new Date(user.freeTrial.endDate).toLocaleDateString() : "N/A",
        CreatedAt: new Date(user.createdAt).toLocaleDateString(),
      }));
  
      const csv = Papa.unparse(csvData);
  
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Subscriber data downloaded successfully");
    } catch (error) {  // <-- Moved this catch block inside the function correctly
      console.error("Error generating CSV:", error);
      toast.error("Failed to download subscriber data");
    }
  };
  
    if (loading) return <Loader loading={loading } />;
  
  return (
    <div className="h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Subscribers</h1>
        <button
          className="bg-[#0072CF] text-white px-6 py-2 rounded-full"
          onClick={downloadUsers}
        >
          Download
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading subscribers...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : subscribedUsers.length === 0 ? (
        <p className="text-center text-gray-600">No subscribed users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#F2F4FF]">
              <tr>
                <th className="p-4 text-left text-sm text-[#292929]">
                  User Name
                </th>
                <th className="p-4 text-left text-sm text-[#292929]">
                  Email Address
                </th>
                <th className="p-4 text-left text-sm text-[#292929]">Level</th>
                <th className="p-4 text-left text-sm text-[#292929]">Country</th>
                <th className="p-4 text-left text-sm text-[#292929]">Status</th>
                {/* <th className="p-4 text-left text-sm text-[#292929]">
                  Start Date
                </th>
                <th className="p-4 text-left text-sm text-[#292929]">
                  Duration
                </th> */}
                <th className="p-4 text-left text-sm text-[#292929]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribedUsers.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 text-sm font-medium text-[#292929]">
                    {user.name}
                  </td>
                  <td className="p-4 text-sm text-[#292929]">{user.email}</td>
                  <td className="p-4 text-sm text-[#292929]">
                    {user.level || "N/A"}
                  </td>
                  <td className="p-4 text-sm text-[#292929]">{user.country}</td>
                  <td className="p-4 text-sm text-[#292929]">
                    {user.isSubscription ? "Active" : "Inactive"}
                  </td>
                  {/* <td className="p-4 text-sm text-[#292929]">
                    {user?.freeTrial?.startDate
                      ? new Date(
                          user?.freeTrial?.startDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 text-sm text-[#292929]">
                    {user?.freeTrial?.endDate
                      ? new Date(user?.freeTrial?.endDate).toLocaleDateString()
                      : "N/A"}
                  </td> */}
                  <td className="p-4 text-sm text-[#292929]">
                    <div className="relative gap-4">
                      {/* <button>
                        <LuTrash2 className="h-5 w-5" />
                      </button> */}
                      <button onClick={() => subcriberDetails(user._id)}>
                        <LuEye className="h-5 w-5" />
                      </button>

                      {/* {openDropdown === user._id && (
                        <div
                          style={{
                            position: "fixed",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                          }}
                          className="z-50 min-w-[10rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => navigate(`/admin/user-detail/${user._id}`)}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 justify-between"
                            >
                              <span>View Details</span>
                              <LuEye className="mr-3 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubscriberManagement;
