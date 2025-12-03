import React from "react"
import { LuLogOut, LuX } from "react-icons/lu";

function SolutionModal({ onClose }) {
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
        {/* Content */}
        <div className="flex flex-col items-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#0066CC] rounded-full flex items-center justify-center">
            <img
              src="/assets/svgs/noto_light-bulb.svg"
              className="rotate-[15deg]"
              alt="bulb-img"
            />
          </div>

          {/* Text */}
          <p className="text-gray-700 text-center leading-relaxed max-w-md">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SolutionModal;
