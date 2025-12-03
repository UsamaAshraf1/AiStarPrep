import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allExamReportFunApi } from "../../../store/exam/examServices";
import Loader from "../../../Components/Loader";
import React, { useEffect, useState } from "react";
import { allSessionListFunApi } from "../../../store/learn/learnServices";

export default function LearningAnalytics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExam, setIsExam] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const { examReport, sessionList, loading } = useSelector((state) => ({
    examReport: state.exam?.examReport || [],
    sessionList: state.learn?.sessionList || [],
    loading: state.exam?.loading || state.learn?.loading || false,
  }));

  const reportList = Array.isArray(examReport) ? examReport : [];
  const learnList = Array.isArray(sessionList) ? sessionList : [];

  const recentLearnings = reportList.slice(-3).reverse();

  const recentSessions = learnList.slice(-3).reverse();

  useEffect(() => {
    if (userId) {
      dispatch(allExamReportFunApi(userId));
      dispatch(allSessionListFunApi(userId)); // Fetch learn sessions
    }
  }, [dispatch, userId]);

  const handleRowClick = (id) => {
    navigate(`/user/analytics-details/${id}`);
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="bg-white w-full h-full">
      <div className="p-2 md:p-6 w-screen md:max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="w-full flex justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isExam}
                onChange={() => setIsExam(!isExam)}
                className="sr-only peer"
              />
              <div
                className="peer outline-none duration-100 after:duration-500 w-36 h-16 bg-blue-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0072CF] after:content-[attr(data-label)] after:absolute after:outline-none after:h-14 after:w-14 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:text-sky-800 after:text-lg after:font-bold peer-checked:after:translate-x-20 peer-checked:after:border-white"
                data-label={isExam ? "Exam" : "Learn"}
              >
                <div className="w-full h-full flex justify-between items-center px-3">
                  <p className="text-white text-medium text-lg">Learn</p>
                  <p className="text-white text-medium text-lg">Exam</p>
                </div>
              </div>
            </label>
          </div>
          <div className="w-full flex justify-center">
            <p>Click to View Results by Mode</p>
          </div>
        </div>
        {isExam ? (
          <div>
            {/* Recent Learnings Section */}
            <div className="bg-white rounded-lg p-2 md:p-6  shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Recent Exams</h2>
              <div className="space-y-4">
                {recentLearnings.length > 0 ? (
                  recentLearnings.map((learning, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-2 space-y-2">
                        <div className="w-full md:w-auto">
                          <h3 className="w-full md:w-[200px] text-lg font-medium text-ellipsis line-clamp-1">
                            {learning.subject}
                          </h3>
                        </div>
                        <div className="w-full md:w-auto">
                          <p className="text-sm font-medium">Time spent</p>
                          <p className="text-sm text-gray-500">
                            {learning.formattedTimeSpent}
                          </p>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-full md:w-[300px]">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#0072CF] rounded-full"
                            style={{ width: `${learning.progress}%` }}
                          />
                        </div>
                        <div className="mt-2 w-full md:w-auto">
                          <span className="text-sm text-gray-500">
                            {learning.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white h-full flex justify-center items-center">
                    <p className="text-xl font-semibold text-gray-700">
                      Nothing Found{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg overflow-x-auto">
              {reportList.length > 0 && (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[...reportList].reverse().map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-[#232323] text-nowrap">
                          {row.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#232323] text-nowrap">
                          {row.grade}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#232323] text-nowrap">
                          {row.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-base font-medium rounded-full text-nowrap ${
                              row.status === "Pass"
                                ? "text-[#2CB629]"
                                : "text-[#D6083B]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="px-6 py-2 rounded-full text-[#0072CF] border border-[#0072CF] text-base font-medium hover:text-blue-600"
                            onClick={() =>
                              navigate(
                                `/user/learning-analytics/details/exam/${row.id}`
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Recent Learnings Section */}
            <div className="bg-white rounded-lg p-2 md:p-6  shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Recent Learning</h2>
              <div className="space-y-4">
                {recentLearnings.length > 0 ? (
                  recentSessions.map((learning, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row justify-between items-center mb-2 sapce-y-2">
                        <div className="">
                          <p className="w-full md:w-[200px] text-lg font-medium text-ellipsis line-clamp-1">
                            {learning.topic}
                          </p>
                          <h3 className="text-sm text-nowrap">
                            {learning.subject}
                          </h3>
                        </div>
                        <div className="w-full md:w-auto">
                          <p className="text-sm font-medium">Time spent</p>
                          <p className="text-sm text-gray-500">
                            {learning.formattedTimeSpent}
                          </p>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-full md:w-[300px]">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#0072CF] rounded-full"
                            style={{ width: `${learning.progress}%` }}
                          />
                        </div>
                        <div className="mt-2 w-full md:w-auto">
                          <span className="text-sm text-gray-500">
                            {learning.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white h-full flex justify-center items-center">
                    <p className="text-xl font-semibold text-gray-700">
                      Nothing Found.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg overflow-x-auto">
              {learnList.length > 0 && (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-[#0072CF]">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[...learnList].reverse().map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-[#232323]">
                          <div className="flex flex-col justify-center">
                            <p className="font-medium">{row.subject}</p>
                            <p className="text-ellipsis line-clamp-1">
                              {row.topic}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#232323] text-nowrap">
                          {row.grade}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#232323] text-nowrap">
                          {row.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-base font-medium rounded-full text-nowrap ${
                              row.status === "Pass"
                                ? "text-[#2CB629]"
                                : "text-[#D6083B]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="px-6 py-2 rounded-full text-[#0072CF] border border-[#0072CF] text-base font-medium hover:text-blue-600"
                            onClick={() =>
                              navigate(
                                `/user/learning-analytics/details/learn/${row.id}`
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
