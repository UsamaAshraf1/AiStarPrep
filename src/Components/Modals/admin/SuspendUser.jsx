import React from "react";
import toast from "react-hot-toast";
import { LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { getAllUsersFunApi } from "../../../store/auth/authServices";
import { suspendUser } from "../../../store/others/otherServices";

function SuspendUser({ userId, suspended, onClose }) {
  const dispatch = useDispatch();

  const handleSuspension = async () => {
    try {
      const response = await dispatch(suspendUser({userId}));
      dispatch(getAllUsersFunApi());

      toast.success("User Status Updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
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
            {suspended ? "Are you sure you want to UnSuspend this User?" : "Are you sure you want to Suspend this User?"}
          </h2>
          <p className="text-[#707070]">
            This action can change the user's access to the platform. Please confirm if you want to proceed.
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
          onClick={handleSuspension}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default SuspendUser;
