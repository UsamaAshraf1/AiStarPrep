import React from "react";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function SessionUpdate({ onClose }) {
  const navigate = useNavigate();
  const endSession = () => {
    onClose();
    navigate("/");
  };
  return (
    <div>
      <button
        onClick={() => onClose()}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <LuX className="w-5 h-5" />
      </button>

      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold">Session Update</h2>
      </div>

      <p className="text-[#707070] text-xl mb-6">
        You've been learning for 30 minutes! Would you like to continue your
        session or take a break?
      </p>

      <div className="flex justify-end space-x-4">
        <button
          className="w-full py-2 bg-[#0072CF] text-white rounded-full font-medium"
          onClick={() => onClose()}
        >
          Keep Going
        </button>
        <button
          onClick={() => endSession()}
          className="w-full py-2 text-black border border-black rounded-full font-medium"
        >
          End Session
        </button>
      </div>
    </div>
  );
}

export default SessionUpdate;
