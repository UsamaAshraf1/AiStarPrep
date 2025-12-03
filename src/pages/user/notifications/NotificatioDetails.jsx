import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotificationById } from "../../../store/notification/notificationServices";

function NotificatioDetails() {
  const { id } = useParams(); // Get the plan ID from URL
  const dispatch = useDispatch();

  const { singleNotification, isLoading } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (id) {
      dispatch(getNotificationById(id)); // Fetch the plan details
    }
  }, [id, dispatch]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="rounded-2xl border shadow-lg max-w-5xl w-full p-6 relative">
        {/* Title */}
        <h2 className="text-2xl font-medium mb-4">
          {singleNotification?.title}
        </h2>

        {/* Content */}
        <div className="space-y-4">
          <p>{singleNotification?.message}</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {/* <button className="px-8 py-2 text-black rounded-full border border-black">
            Ignore
          </button> */}
          {/* <button className="px-8 py-2 bg-[#0072CF] text-white rounded-full">
            Update
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default NotificatioDetails;
