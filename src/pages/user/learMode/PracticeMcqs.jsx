import React, { useState } from "react";
import { LuChevronDown, LuChevronUp, LuLightbulb } from "react-icons/lu";

function PracticeMcqs() {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Fix here
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const answers = [
    "Lorem Ipsum Dummy Text",
    "Lorem Ipsum Dummy Text",
    "Lorem Ipsum Dummy Text",
    "Lorem Ipsum Dummy Text",
  ];

  return (
    <div className="bg-white h-full">
      <div className="max-w-3xl mx-auto pt-10 space-y-10">
        {/* Topic */}
        <h1 className="text-3xl font-bold text-center">Topic : Hydrocarbons</h1>

        {/* Question Section */}
        <div className="">
          <h2 className="text-4xl font-bold mb-4 text-center">MCQ Question</h2>
          <p className="text-[18px] font-medium text-[#1A1A1A] text-center leading-relaxed">
            1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod ?
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full max-w-md mx-auto text-lg font-medium flex items-center justify-center px-3 py-3 rounded-full border-2 transition-all h-14
              ${
                selectedAnswer === index
                  ? "bg-[#0072CF] text-white border-[#0072CF]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-8 py-2 rounded-full text-[20px] font-medium border-2 border-gray-300 text-gray-700 hover:border-blue-400 transition-colors">
            End Session
          </button>
          <button className="px-8 py-2 rounded-full text-[20px] font-medium bg-[#0072CF] text-white transition-colors">
            Submit and Continue
          </button>
        </div>

        {/* Help Section */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 text-[#0072CF] font-medium"
          >
            See Solution
            {showSolution ? (
              <LuChevronUp size={20} />
            ) : (
              <LuChevronDown size={20} />
            )}
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 text-[#0072CF] font-medium"
          >
            Get Hint
            {showHint ? <LuChevronUp size={20} /> : <LuChevronDown size={20} />}
          </button>
        </div>
        {showSolution &&
          <div className="h-[100px] flex justify-center items-center border rounded-[5px] relative">
            <img
              src="/assets/svgs/noto_light-bulb.svg"
              alt=""
              className="absolute -top-5 -left-5"
            />
            <p className="text-[#0072CF]">
              <span className="font-semibold">Description:</span> Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem
              ipsum dolor
            </p>
          </div>
        }
      </div>
    </div>
  );
}

export default PracticeMcqs;
