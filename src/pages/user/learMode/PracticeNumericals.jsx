import React, { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuSettings,
  LuDownload,
} from "react-icons/lu";

function PracticeNumericals() {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div className="bg-white h-full">
      <div className="max-w-3xl mx-auto pt-10 space-y-10">
        {/* Topic */}
        <h1 className="text-3xl font-bold text-center">Topic : Hydrocarbons</h1>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left Column - Question (Non-editable) */}
          <div className="h-full flex flex-col bg-white rounded-[10px] p-4 border border-[#B3E3E0]">
            {/* Question div */}
            <div>
              <p className="text-gray-800 leading-relaxed mb-4">
                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod ?
              </p>
            </div>
            <div className="flex-grow"></div>

            {/* Help Button div */}
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
                {showHint ? (
                  <LuChevronUp size={20} />
                ) : (
                  <LuChevronDown size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Answer Box (Editable) */}
          <div className="h-full bg-[#F7F8F9] rounded-lg overflow-hidden p-2">
            <div className="bg-[#091E420F] rounded-lg">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="bg-transparent w-full h-full p-2 min-h-[300px] font-mono text-sm leading-relaxed resize-none scrollbar-thin scrollbar-thumb-[#0072CF] scrollbar-track-[#E5E5E5] scrollbar-thumb-rounded focus:outline-none"
                spellCheck="false"
              />
            </div>
          </div>
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
      </div>
    </div>
  );
}
export default PracticeNumericals;
