import React from "react";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function SuccessModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <div>
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
        >
          <LuX size={20} />
        </button> */}

        <div className="flex justify-center mb-4">
          <div className="w-[106px] h-[106px] bg-[#4CAF50] rounded-full flex items-center justify-center">
            <img
              src="/assets/svgs/checkBadge.svg"
              alt="checkBadge Circle svg"
              className="w-full"
            />
          </div>
        </div>

        {/* Modal content */}
        <h3 className="text-2xl max-w-md text-center font-medium text-black mb-2">
          Your Password has been reset Successfully!
        </h3>

        <div className="w-full flex justify-end mt-5">
          <button
            type="button"
            className="w-full px-5 py-2 bg-[#0072CF] text-white rounded-full mx-5"
            onClick={()=> navigate('/auth/signin')}
          >
            Back
          </button>
        </div>
      </div>
  );
}

export default SuccessModal;
