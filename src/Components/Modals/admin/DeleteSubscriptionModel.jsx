import React from "react";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  deletePlan,
  getPlanList,
} from "../../../store/subscription/subscriptionServices";

function DeleteSubscriptionModal({ id, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!id || typeof id !== "string") {
      console.error("Invalid Plan ID:", id);
      return;
    }

    try {
      const response = await dispatch(deletePlan(id));

      if (response.payload?.status === "success") {
        dispatch(getPlanList()); // ✅ Ensure list updates
        toast.success("Plan deleted successfully");
        onClose();
      } else {
        console.error("Error deleting plan:", response.payload?.message);
      }
    } catch (error) {
      console.error(
        "Delete request failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <button
        onClick={() => onClose()}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        aria-label="Close dialog"
      >
        <LuX className="w-6 h-6" />
      </button>

      <div className="flex gap-6">
        {/* Content */}
        <div className="flex-1 space-y-2">
          <h2 id="modal-title" className="text-xl font-medium">
            Are you sure you want to Delete this Subscription plan?
          </h2>

          <p className="text-[#707070]">
            This action cannot be undone. Deleting this Subscription Plan will
            permanently remove all associated data. Please confirm if you want
            to proceed.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={() => onClose()}
          className="flex-1 px-8 py-2 bg-[#D6083B] text-white rounded-full"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          // onClick={() => onClose()}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteSubscriptionModal;
