import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationForm from "../../../Components/Modals/admin/NotificationForm";
import { useModal } from "../../../helper/ModalContext";
import { getAllNotifications } from "../../../store/notification/notificationServices";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";

function NotificationManagement() {
  const { openModal, closeModal } = useModal();

  const createNotification = () => {
    openModal(<NotificationForm onClose={() => closeModal()} />);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications, isLoading } = useSelector(
    (state) => state.notification
  );
  const notificationList = Array.isArray(notifications)
  ? [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5; // Adjust as needed

  // Pagination logic
  const totalPages = Math.ceil(notificationList.length / notificationsPerPage);
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notificationList.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <button
          className="bg-[#0072CF] text-white px-6 py-2 rounded-full"
          onClick={createNotification}
        >
          Create Notification
        </button>
      </div>

      {/* Loading and No Data States */}
      {isLoading ? (
        <p>Loading notifications...</p>
      ) : notificationList.length === 0 ? (
        <div className="bg-white h-full flex justify-center items-center">
          <p className="text-2xl font-bold text-gray-700">
            No notifications found.
          </p>
        </div>
      ) : (
        <>
          {/* Notification Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#F2F4FF]">
                <tr>
                  <th className="p-4 text-left text-sm text-normal text-[#292929]">
                    Title
                  </th>
                  <th className="p-4 text-left text-sm text-normal text-[#292929]">
                    Message
                  </th>
                  <th className="p-4 text-left text-sm text-normal text-[#292929]">
                    Date sent
                  </th>
                  <th className="p-4 text-left text-sm text-normal text-[#292929]">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm text-normal text-[#292929]"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentNotifications.map((noti) => (
                  <tr key={noti._id}>
                    {/* <td className="p-4 text-sm text-[#292929]">{noti._id}</td> */}
                    <td className="p-4 text-sm font-medium text-[#292929]">
                      <p className="whitespace-nowrap flex-shrink-0">
                        {noti.title}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-[#292929]">
                      <p className="text-ellipsis line-clamp-1">
                        {noti.message}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-[#292929]">
                      <p className="whitespace-nowrap flex-shrink-0">
                        {noti.time}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-[#292929]">
                      {noti.status}
                      {"Sent"}
                    </td>
                    <td className="p-4 text-sm text-[#292929] text-right mr-10">
                      <button
                        className="px-8 py-2 border border-[#0072CF] text-[#0072CF] rounded-full"
                        onClick={() =>
                          navigate(`/admin/notification/${noti._id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NotificationManagement;
