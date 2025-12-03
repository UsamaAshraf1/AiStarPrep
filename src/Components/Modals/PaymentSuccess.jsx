import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess({ onClose }) {
    const navigate = useNavigate();
    return (
        <div>
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
                Thank you for your purchase. Your subscription has been activated.
            </h3>

            <div className="w-full flex justify-end mt-5">
                <button
                    type="button"
                    className="w-full px-5 py-2 bg-[#0072CF] text-white rounded-full mx-5"
                    onClick={() => { navigate('/user/dashboard'); onClose(); }}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;