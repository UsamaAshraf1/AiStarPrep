import React from "react";
import toast from "react-hot-toast";
import { LuLogOut, LuX } from "react-icons/lu";
import axios from "../../../helper/api";
import { useDispatch } from "react-redux";
import { getAllUsersFunApi } from "../../../store/auth/authServices";

function DeleteUserModal({ userId, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await axios.post("/auth/delete-user-api", {
        userId,
      });

      dispatch(getAllUsersFunApi());

      toast.success("User Delele successfully");
      onClose();
    } catch (error) {
      console.error("API Error:", error);
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
            Are you sure you want to Delete User?
          </h2>

          <p className="text-[#707070]">
          This action cannot be undone. Deleting this user will permanently remove all associated data. 
          Please confirm if you want to proceed.
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

export default DeleteUserModal;
