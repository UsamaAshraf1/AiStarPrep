import React from "react";

const ExamMCQ = ({ question, options, onAnswer, userAnswer }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-center">MCQ Question</h2>
      <p className="text-[18px] font-medium text-[#1A1A1A] text-center leading-relaxed mb-6">
        {question}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {options.map((option, index) => (
          <button
            key={index}
            title={option}
            onClick={() => onAnswer(option)}
            className={`w-full max-w-md mx-auto text-lg font-medium flex items-center justify-center px-3 py-3 rounded-full border-2 transition-all min-h-14 text-center whitespace-normal break-words
              ${
                userAnswer === option
                  ? "bg-[#0072CF] text-white border-[#0072CF]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamMCQ;
