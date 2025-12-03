import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { getUserNotifications } from "../../../store/notification/notificationServices";
import Loader from "../../../Components/Loader";

function Notification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch notifications from Redux store
  const { userNotifications, isLoading, error } = useSelector(
    (state) => state.notification
  );

  const notifications = Array.isArray(userNotifications)
    ? userNotifications
    : [];

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(
        getUserNotifications({ level: user.level, country: user.country })
      );
    }
  }, [dispatch, user?.level, user?.country]);

  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-4 mt-5">
      {isLoading && (
        <div className="bg-white h-full flex justify-center items-center">
          <p className="text-2xl font-bold text-gray-700">
            Loading Notifications...
          </p>
        </div>
      )}
      {!isLoading && userNotifications?.length === 0 && (
        <div className="bg-white h-full flex justify-center items-center">
          <p className="text-2xl font-bold text-gray-700">
            No notifications found.
          </p>
        </div>
      )}

      <ul className="space-y-4">
        {notifications?.map((notification) => (
          <li
            key={notification._id}
            className="flex items-center p-2 cursor-pointer gap-2"
            onClick={() => navigate(`/user/notifications/${notification?._id}`)}
          >
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded mr-2 md:mr-4 flex-shrink-0">
              <FaMessage className="text-[#0072CF] w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-medium text-[#101828]">
                {notification?.title}
              </h3>
              <p className="text-sm text-[#475467] text-ellipsis line-clamp-1">
                {notification?.message}{" "}
                {/* Updated from description to message */}
              </p>
            </div>
            <div className="ml-auto text-sm text-[#475467] whitespace-nowrap flex-shrink-0">
              {notification?.time} {/* Format time */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
