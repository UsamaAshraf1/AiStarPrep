import React from "react";
import { LuLogOut, LuX } from "react-icons/lu";

function SuspendUserModal({ onClose }) {
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
            Are you sure you want to Suspend User?
          </h2>

          <p className="text-[#707070]">
            Suspending a user will restrict their access to the platform.
            Confirm your decision before proceeding.
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
          onClick={() => onClose()}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default SuspendUserModal;
