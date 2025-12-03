import React from "react";
import { LuX } from "react-icons/lu";

function FreeModalAvailability({ onClose }) {
    return (
        <div>
            <button
                onClick={onClose}
                className="absolute right-3 top-3 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
                aria-label="Close dialog"
            >
                <LuX className="w-6 h-6" />
            </button>

            <div className="flex gap-6 mb-2">

                {/* Content */}
                <div className="flex-1 space-y-1 justify-center">
                    <h2 id="modal-title" className="text-xl font-medium text-center">
                        Free Trial Unavailable
                    </h2>

                    <p className="text-[#707070] text-center">
                        You’ve already availed the free trial. To continue accessing premium content, please choose a subscription plan that fits your learning goals.
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                    onClick={onClose}
                    className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default FreeModalAvailability;
