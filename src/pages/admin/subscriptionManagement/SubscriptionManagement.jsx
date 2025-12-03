import React, { useEffect } from "react";
import { LuPlus, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CreateSubscriptionModal from "../../../Components/Modals/admin/CreateSubscriptionModal";
import { useModal } from "../../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlan,
  getPlanList,
} from "../../../store/subscription/subscriptionServices";
import axios from "../../../helper/api";
import DeleteSubscriptionModal from "../../../Components/Modals/admin/DeleteSubscriptionModel";
import Loader from "../../../Components/Loader";

function SubscriptionManagement() {
  const { plans, loading, error } = useSelector(
    (state) => state.subscription || { plans: [] }
  );
  // const courseList = Array.isArray(plans) ? plans : [];
  const courseList = Array.isArray(plans)
    ? [...plans].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlanList());
  }, []);

  const handleRowClick = (id) => {
    navigate(`/admin/subscription-details/${id}`);
  };

  const handleEdit = (course) => {
    openModal(
      <CreateSubscriptionModal
        course={course}
        onClose={() => closeModal()} // Ensure modal can be closed
      />
    );
  };

  // modal handling with context
  const { openModal, closeModal } = useModal();

  const createSubscription = () => {
    openModal(<CreateSubscriptionModal onClose={() => closeModal()} />);
  };

  // const 
  const deleteSubscription = (userId) => {
    openModal(<DeleteSubscriptionModal id={userId} onClose={() => closeModal()} />);
  };

  if (loading) return <Loader loading={loading } />;

  return (
    <div className="w-screen md:max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <button
          onClick={() => createSubscription()}
          className="bg-[#0072CF] text-white rounded-full py-3 px-12 inline-flex items-center gap-x-2"
        >
          <span>
            <LuPlus />
          </span>
          Create New Subscription
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EBF5FF]">
              <th className="px-6 py-3 text-left text-base font-medium">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Price
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Discounted Price
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Trial Period
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courseList.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {course.thumbnail && (
                      <img
                        // src={
                        //   course.thumbnail || "/assets/svgs/listPlaceholder.svg"
                        // }
                        // alt={course.name}
                        className="w-10 h-10 rounded mr-3"
                      />
                    )}
                    <div>
                      <div
                        className="font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleRowClick(course._id)}
                      >
                        {course.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.courseOverview}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">${course.price || 'Na'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">${course.discountedPrice || 'NA'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{course.duration}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{course.trialPeriod}</span>
                </td>
                <td>
                  <div className="space-x-3 flex justify-center items-center mr-10">
                    <button
                      className=""
                      onClick={() => deleteSubscription(course._id)}
                    >
                      <LuTrash2 />
                    </button>

                    <button onClick={() => handleEdit(course)}>
                      <LuSquarePen />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionManagement;
