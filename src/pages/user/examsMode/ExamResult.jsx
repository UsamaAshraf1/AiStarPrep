import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { singleExamReportFunApi } from "../../../store/exam/examServices";
import { BiCalculator, BiCheckCircle, BiHash, BiHelpCircle, BiMedal, BiXCircle } from "react-icons/bi";
import Loader from "../../../Components/Loader";

function ExamResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, examData, examId } = useSelector((state) => state.exam); // Ensure `examData?` exists

  useEffect(() => {
    if (examId) {
      dispatch(singleExamReportFunApi(examId)); // Fetch the exam details
    }
  }, [examId, dispatch]);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-center mb-6">
        <div className="relative w-44 h-44">
          <div className="bg-[#0072CF] rounded-full absolute inset-0 flex flex-col items-center justify-center text-center border-[8px] border-[#CCE3F5]">
            <div className="text-2xl font-bold text-white">
              Grade <br /> {examData?.grade || "N/A"}
            </div>
            {/* <div className="text-4xl font-bold text-white">30</div> */}
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1
          className={`text-2xl font-bold ${
            examData?.status === "Pass" ? "text-[#0072CF]" : "text-red-500"
          }`}
        >
          {examData?.status === "Pass"
            ? "Congratulations"
            : "Better Luck Next Time"}
        </h1>
        <p className="text-[#545454] text-xl">
          {examData?.status === "Pass"
            ? "Congrats you successfully passed the exam."
            : "Review your mistakes and try again next time!"}
        </p>
      </div>

      {/* Summary Section */}
      {/* <div className="space-y-4">
        <h2 className="text-2xl font-medium">Summary</h2>
        <ul className="space-y-2 list-disc ml-4">
          <li className="text-lg font-medium">
            Exam Date: {examData?.date || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Exam Duration: {examData?.formattedTimeSpent || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Overall Score: {examData?.progress + `%` || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Grade:{" "}
            <span className="text-[#0072CF]">{examData?.grade || "N/A"}</span>
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
                  {examData?.totalQuestions}
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
                  {examData?.correctAnswers}
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
                  {examData?.incorrectAnswers}
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
                  {examData?.totalMarks}
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
                  {examData?.awardedMarks}
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
                  {examData?.progress && examData.progress + "%"}
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
          className="bg-[#0072CF] text-white px-24 py-3 rounded-full hover:bg-blue-600 transition-colors"
          onClick={() => navigate(`/user/exam-result/review/${examId}`)}
        >
          Review Your Answers{" "}
        </button>
      </div>
    </div>
  );
}

export default ExamResult;
