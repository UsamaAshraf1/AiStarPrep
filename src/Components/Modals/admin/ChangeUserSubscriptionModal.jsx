import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuLogOut, LuX } from "react-icons/lu";
import axios from "../../../helper/api";
import { getAllUsersFunApi } from "../../../store/auth/authServices";
import { useDispatch } from "react-redux";

function ChangeUserSubscriptionModal({ onClose , userId  , currentStatus}) {
  const dispatch = useDispatch();


  const [isLoading, setIsLoading] = useState(false);

  const handleSubscriptionChange = async () => {
    try {
      const response = await axios.post("/update-user-status", {
        userId,
        subscriptionStatus: currentStatus,
      });
  
            dispatch(getAllUsersFunApi());
  
      toast.success("Subscription status updated successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update subscription"
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
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-[#0072CF] rounded-xl flex items-center justify-center">
          <LuLogOut className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h2 id="modal-title" className="text-xl font-medium">
            Are you sure you want to change user subscription status?
          </h2>

          <p className="text-[#707070]">
            Confirm before changing the user's subscription status, as it may
            affect their access and billing. Ensure the update is necessary
            before proceeding.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 px-8 py-2 bg-[#D6083B] text-white rounded-full hover:bg-[#b30732] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubscriptionChange}
          disabled={isLoading}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full hover:bg-[#005ba3] transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          {isLoading ? "Processing..." : "Yes, Change Status"}
        </button>
      </div>
    </div>
  );
}

export default ChangeUserSubscriptionModal;
