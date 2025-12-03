import React from "react";
import { LuX } from "react-icons/lu";

function AiAnswerFeedbackModal({
  onClose,
  overallScore,
  evaluation,
  correctAnswer,
}) {
  return (
    <div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
      >
        <LuX size={20} />
      </button>
      <div className="mb-8 mt-2">
        <div className="mb-4">
          <h2 className="w-full text-center text-[#0072CF] font-medium">Marks Awarded</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium">
              {evaluation.total_marks_awarded} /{" "}
              {evaluation.total_marks_allocated}
            </span>
            <span className="text-gray-500">({overallScore.percentage}%)</span>
          </div>
        </div>

        <div className="space-y-3 w-full">
          <p className="w-full text-center">Feedback</p>
          <p className="w-full text-center">{evaluation.feedback}</p>
        </div>
      </div>

      {/* Correct Answer Section */}
      <div>
        <h2 className="w-full text-center text-green-500 font-medium mb-4">Correct Answer</h2>
        <div className="space-y-4">
          <p className="w-full text-center">{correctAnswer}</p>
        </div>
      </div>
    </div>
  );
}

export default AiAnswerFeedbackModal;
