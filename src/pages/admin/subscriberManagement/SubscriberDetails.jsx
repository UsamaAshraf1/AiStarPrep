import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubscriberDetail } from "../../../store/others/otherServices";
import Loader from "../../../Components/Loader";

function SubscriberDetails() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const getDetail = async () => {

    try {
      setLoading(true);
      const response = await dispatch(getSubscriberDetail(id));
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

  if (loading) return <Loader loading={loading} />;

  return (
    <div className=" mx-auto p-6 bg-white">
      {/* user? Info Card */}
      <div className="flex flex-col items-center p-6 border-b">
        {/* <img
          src={user?.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2"
        /> */}
        <h2 className="text-xl font-semibold mt-3">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-gray-500">{user?.country}</p>
        <p className="text-gray-500">
          {user?.phone?.code} {user?.phone?.number}
        </p>
        <span
          className={`px-3 py-1 rounded mt-2 ${user?.isSubscription
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
            }`}
        >
          {user?.isSubscription ? "Subscribed" : "Not Subscribed"}
        </span>
        {user?.freeTrial?.isActive && (
          <p className="mt-2 text-sm text-blue-600">
            Free Trial Active:{" "}
            {new Date(user?.freeTrial?.startDate).toLocaleDateString()} -{" "}
            {new Date(user?.freeTrial?.endDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Subscription Plans List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Subscribed Plans</h3>
        {user?.subscriptionPlan.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg">
              <thead className="bg-[#F2F4FF]">
                <tr>
                  <th className="px-4 py-2 text-left">Subject Name</th>
                  <th className="px-4 py-2 text-left">Course Overview</th>
                  {/* <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Price</th> */}
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
                    {/* <td className="px-4 py-2">{plan?.planId?.duration}</td>
                    <td className="px-4 py-2">${plan?.planId?.price}</td> */}
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
  );
}

export default SubscriberDetails;
