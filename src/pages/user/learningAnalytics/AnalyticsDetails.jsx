import { useNavigate, useParams } from "react-router-dom";
import { singleExamReportFunApi } from "../../../store/exam/examServices";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Loader from "../../../Components/Loader";
import { BiCalculator, BiCheckCircle, BiHash, BiHelpCircle, BiMedal, BiXCircle } from "react-icons/bi";
import { singleLearnReportFunApi } from "../../../store/learn/learnServices";

function AnalyticsDetails() {
  const navigate = useNavigate();
  const { examId, sessionId } = useParams();
  const dispatch = useDispatch();

  // Get correct state based on mode
  const data = useSelector((state) =>
    examId ? state.exam.examData : state.learn.sessionData
  );
  const loading = useSelector((state) =>
    examId ? state.exam.loading : state.learn.loading
  );
  const error = useSelector((state) =>
    examId ? state.exam.error : state.learn.error
  );

  useEffect(() => {
    if (examId) {
      dispatch(singleExamReportFunApi(examId)); // Fetch exam analytics
    } else if (sessionId) {
      dispatch(singleLearnReportFunApi(sessionId)); // Fetch learn analytics
    }
  }, [dispatch, examId, sessionId]);

  const handleClick = (id) => {
    if (examId) {
      navigate(`/user/learning-analytics/details/exam/answers/${id}`);
    } else if (sessionId) {
      navigate(`/user/learning-analytics/details/learn/answers/${id}`);
    }
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1
          className={`text-2xl font-bold ${
            data?.status === "Pass" ? "text-[#0072CF]" : "text-red-500"
          }`}
        >
          {data?.status === "Pass"
            ? "Great Job, You Passed!"
            : "Better Luck Next Time"}
        </h1>
        <p className="text-black text-xl">
          {data?.status === "Pass"
            ? "Your dedication and effort have paid off. Here's a summary of your achievement:"
            : "Review your mistakes and try again next time!"}
        </p>
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Summary</h2>
        <ul className="space-y-2 list-disc ml-4">
          <li className="text-lg font-medium">
            Exam Date: {data?.date || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Exam Duration: {data?.formattedTimeSpent || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Overall Score: {data?.progress + `%` || "N/A"}
          </li>
          <li className="text-lg font-medium">
            Grade:{" "}
            <span className="text-[#0072CF]">{data?.grade || "N/A"}</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-semibold mb-4 text-[#0F172A]">Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Questions Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-3xl font-bold text-[#1E293B]">
                  {data?.totalQuestions}
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
                  {data?.correctAnswers}
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
                  {data?.incorrectAnswers}
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
                  {data?.totalMarks}
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
                  {data?.awardedMarks}
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
                  {data?.progress && data.progress + "%"}
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
          onClick={() => handleClick(data.id)}
        >
          Review Your Answers{" "}
        </button>
      </div>
    </div>
  );
}

export default AnalyticsDetails;
