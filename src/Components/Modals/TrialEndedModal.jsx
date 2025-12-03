import { LuLogOut, LuX } from "react-icons/lu";

function TrialEndedModal({ onClose }) {
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
            Your free trial has ended
          </h2>

          <p className="text-[#707070]">
            To continue enjoying uninterrupted access, please choose a
            subscription plan that fits your needs. Don't lose your progress!
            Subscribing now ensures you keep all your data and features
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={() => onClose()}
          className="flex-1 px-8 py-2 border-2 border-black rounded-full text-black"
        >
          Cancel
        </button>
        <button
          onClick={() => onClose()}
          className="flex-1 px-8 py-2 bg-[#0072CF] text-white rounded-full"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}

export default TrialEndedModal;
