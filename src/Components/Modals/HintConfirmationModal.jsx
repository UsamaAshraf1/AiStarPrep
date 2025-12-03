import React from "react";
import { LuLogOut, LuX } from "react-icons/lu";

function HintConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div>
      <button
        onClick={() => onCancel()}
        className="absolute right-3 top-3 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
        aria-label="Close dialog"
      >
        <LuX className="w-6 h-6" />
      </button>

      <div className="flex gap-6 mb-2">

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h2 id="modal-title" className="text-xl font-medium">
            Are you sure you want to use a hint during the exam?
          </h2>

          <p className="text-[#707070]">
            Are you sure you want to reveal a hint? It won’t affect your result
            but will provide helpful guidance if you choose to view it.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={() => onCancel()}
          className="flex-1 px-8 py-2 border-2 border-black rounded-full text-black"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm()}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
        >
          Show Hints
        </button>
      </div>
    </div>
  );
}

export default HintConfirmationModal;
