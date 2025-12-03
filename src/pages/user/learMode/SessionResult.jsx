
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiCalculator, BiCheckCircle, BiHash, BiHelpCircle, BiMedal, BiXCircle } from "react-icons/bi";
import Loader from "../../../Components/Loader";
import { singleLearnReportFunApi } from "../../../store/learn/learnServices";

function SessionResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, sessionData, sessionId } = useSelector((state) => state.learn); // Ensure `sessionData?` exists

  useEffect(() => {
    if (sessionId) {
      dispatch(singleLearnReportFunApi(sessionId)); // Fetch the exam details
    }
  }, [sessionId, dispatch]);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-center mb-6">
        <div className="relative w-44 h-44">
          <div className="bg-[#0072CF] rounded-full absolute inset-0 flex flex-col items-center justify-center text-center border-[8px] border-[#CCE3F5]">
            <div className="text-2xl font-bold text-white">
              Grade <br /> {sessionData?.grade || "N/A"}
            </div>
            {/* <div className="text-4xl font-bold text-white">30</div> */}
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1
          className={`text-2xl font-bold ${
            sessionData?.status === "Pass" ? "text-[#0072CF]" : "text-red-500"
          }`}
        >
          {sessionData?.status === "Pass"
            ? "Congratulations"
            : "Better Luck Next Time"}
        </h1>
        <p className="text-[#545454] text-xl">
          {sessionData?.status === "Pass"
            ? "Congrats you successfully passed the exam."
            : "Review your mistakes and try again next time!"}
        </p>
      </div>

      {/* Summary Section */}
      {/* <div className="space-y-4">
        <h2 className="text-2xl font-medium">Summary</h2>
        <ul className="space-y-2 list-disc ml-4">
          <li className="text-lg font-medium">
            Exam Date: {sessionData?.date || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Exam Duration: {sessionData?.formattedTimeSpent || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Overall Score: {sessionData?.progress + `%` || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Grade:{" "}
            <span className="text-[#0072CF]">{sessionData?.grade || "N/A"}</span>
          </li>
        </ul>
      </div> */}

      <div className="space-y-4">
        <h1 className="text-xl font-semibold mb-4 text-[#0F172A]">
          Performance Breakdown
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Questions Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.totalQuestions}
                </div>
                <div className="text-[#475569]">Total Questions</div>
              </div>
              <BiHelpCircle className="w-6 h-6 text-[#0072CF]" />
            </div>
          </div>

          {/* Correct Answers Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.correctAnswers}
                </div>
                <div className="text-[#475569]">Correct Answers</div>
              </div>
              <BiCheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>

          {/* Incorrect Answers Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.incorrectAnswers}
                </div>
                <div className="text-[#475569]">Incorrect Answers</div>
              </div>
              <BiXCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>

          {/* Total Marks Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.totalMarks}
                </div>
                <div className="text-[#475569]">Total Marks</div>
              </div>
              <BiHash className="w-6 h-6 text-[#0072CF]" />
            </div>
          </div>

          {/* Marks Awarded Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.awardedMarks}
                </div>
                <div className="text-[#475569]">Marks Awarded</div>
              </div>
              <BiMedal className="w-6 h-6 text-green-500" />
            </div>
          </div>

          {/* percentage Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {sessionData?.progress && sessionData.progress + "%"}
                </div>
                <div className="text-[#475569]">Percentage</div>
              </div>
              <BiCalculator className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Button */}
      <div className="text-center">
        <button
          className="w-full md:w-auto bg-[#0072CF] text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
          onClick={() => navigate(`/user/learn-session-result/review/${sessionId}`)}
        >
          Review Your Answers{" "}
        </button>
      </div>
    </div>
  );
}

export default SessionResult;
