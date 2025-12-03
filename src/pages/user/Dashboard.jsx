import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LevelSelectModal from "../../Components/Modals/LevelSelectModal";
import { useModal } from "../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { allExamReportFunApi } from "../../store/exam/examServices";
import { allSessionListFunApi } from "../../store/learn/learnServices";
import {
  checkUserSubscription,
  getUserApi,
  updateExpiredStatus,
} from "../../store/others/otherServices";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Components/Loader";


const actionCards = [
  {
    title: "Learn Mode",
    image:
      "https://cache.careers360.mobi/media/presets/1200X675/article_images/2024/12/8/SSC_MTS_exam_dates_2025.jpg",
    href: "/user/learn",
  },
  {
    title: "Exam Mode",
    image:
      "https://static.vecteezy.com/system/resources/previews/014/562/984/non_2x/concept-back-to-school-or-teacher-s-day-idea-pens-pencils-books-an-alarm-clock-on-the-table-against-the-background-of-a-gray-board-with-copy-space-photo.jpg",
    href: "/user/exam",
  },
  {
    title: "Learning Analytics",
    image:
      "https://www.financialexpress.com/wp-content/uploads/2025/01/Research-Freepik.jpg?w=1024",
    href: "/user/learning-analytics",
  },
];
function Dashboard() {
  const { openModal, closeModal } = useModal();

  // otherModal Tester

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(); // Default to latest month
  const user = JSON.parse(localStorage.getItem("user"));
  const level = user.level;
  const userId = user._id;

  const examReport = useSelector((state) => state.exam?.examReport || []);
  const sessionList = useSelector((state) => state.learn?.sessionList || []);
  const subscriptionDetail = useSelector(
    (state) => state.others?.subscriptionDetail
  );
  const loading = useSelector(
    (state) => state.exam?.loading || state.learn?.loading || false
  );

  const reportList = Array.isArray(examReport) ? examReport : [];
  const learnList = Array.isArray(sessionList) ? sessionList : [];

  const recentSessions = learnList.slice(-3);

  // logic for calculating graph data
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-M
  };

  const monthlyDataMap = {};

  // Function to convert "4min", "1h 30min" to total minutes
  const convertToMinutes = (timeString) => {
    if (!timeString) return 0;

    let totalMinutes = 0;
    const hourMatch = timeString.match(/(\d+)\s*h/); // Extract hours
    const minMatch = timeString.match(/(\d+)\s*min/); // Extract minutes

    if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
    if (minMatch) totalMinutes += parseInt(minMatch[1]);

    return totalMinutes;
  };

  // Process exam report times
  reportList.forEach((report) => {
    const month = getMonthYear(report.date); // Format: YYYY-M
    if (!monthlyDataMap[month]) {
      monthlyDataMap[month] = { month, exam: 0, learn: 0 };
    }
    monthlyDataMap[month].exam +=
      convertToMinutes(report.formattedTimeSpent) / 60; // Convert to hours
  });

  // Process learning session times
  learnList.forEach((session) => {
    const month = getMonthYear(session.date);
    if (!monthlyDataMap[month]) {
      monthlyDataMap[month] = { month, exam: 0, learn: 0 };
    }
    monthlyDataMap[month].learn +=
      convertToMinutes(session.formattedTimeSpent) / 60; // Convert to hours
  });

  // Sort by month
  const monthlyData = Object.values(monthlyDataMap).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  const maxHours = Math.max(
    ...monthlyData.map((item) => item.exam + item.learn),
    1
  );

  const numIntervals = 5;
  const step = Math.ceil(maxHours / (numIntervals - 1)); // Ensure consistent spacing

  const yAxisLabels = Array.from(
    { length: numIntervals },
    (_, i) => step * i
  ).reverse();

  const monthList = monthlyData.map((item) => item.month).reverse(); // Latest month first

  // Calculate total time spent on exams
  const totalExamTime = reportList.reduce(
    (acc, report) => acc + convertToMinutes(report.formattedTimeSpent),
    0
  );

  // Calculate total time spent on learning
  const totalLearnTime = learnList.reduce(
    (acc, session) => acc + convertToMinutes(session.formattedTimeSpent),
    0
  );

  // Function to format minutes back into "Xh Ym"
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const totalTimeSpent = formatTime(totalLearnTime + totalExamTime);

  useEffect(() => {
    const fetchData = async () => {
      if (!level) {
        openModal(<LevelSelectModal onClose={closeModal} />);
      }
      if (userId) {
        try {
          await dispatch(allExamReportFunApi(userId));
          await dispatch(allSessionListFunApi(userId)); // Fetch learn sessions
          await dispatch(checkUserSubscription(userId)); // Fetch user status
          await dispatch(updateExpiredStatus(userId)); // Fetch user status
          const resultAction = await dispatch(getUserApi());
          if (getUserApi.fulfilled.match(resultAction)) {
            const user = resultAction.payload?.user;
          }
          // Get user data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [userId, level]);
  
  if (loading) return <Loader loading={loading} />;

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-8">
      <div className="relative overflow-hidden rounded-lg bg-[#FBE6EB] p-6 md:p-8 z-10">
        <div className="max-w-lg">
          <h1 className="mb-2 text-2xl font-bold text-[#D6083B]">
            Welcome back {user?.name}!
          </h1>
          <p className="text-[#373453] font-medium text-lg">
            You've spent {totalTimeSpent} on your study this month! Keep it up
            and improve yourself.
          </p>
        </div>
        <img
          src="/assets/svgs/Group.svg"
          alt="Student studying"
          className="absolute hidden md:block bottom-0 right-20 h-32 w-auto md:h-40"
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Choose one to start
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {actionCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group block overflow-hidden rounded-lg bg-white transition-shadow shadow-sm p-4 h-[250px]"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-[180px] rounded-lg w-full object-cover transition-transform duration-300"
                />
              </div>
              <div className="text-center mt-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Progress Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hours Spent Chart */}
          <div className="rounded-lg p-5 shadow-sm border border-gray-300 bg-white">
            <h2 className="text-lg font-medium mb-2">Hours Spent</h2>
            <div className="flex gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#0072CF] rounded"></div>
                <span className="text-gray-600">Learn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#B0E4FC] rounded"></div>
                <span className="text-gray-600">Exam</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis
                  domain={[0, maxHours]}
                  tickFormatter={(tick) => tick.toFixed(2) + " Hr"}
                />
                {monthlyData.length > 0 && (
                  <Tooltip formatter={(value) => value.toFixed(2) + " Hr"} />
                )}
                <Legend />
                <Bar dataKey="learn" stackId="a" fill="#0072CF" name="Learn" barSize={40} radius={[4, 4, 0, 0]}/>
                <Bar dataKey="exam" stackId="a" fill="#B0E4FC" name="Exam" barSize={40} radius={[4, 4, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Continue Section */}
          <div className="rounded-lg p-5 shadow-sm border border-[#E2E8F0]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Recent Learning Sessions</h2>
              <button
                className="text-red-500 text-sm"
                onClick={() => navigate("/user/learning-analytics")}
              >
                View All
              </button>
            </div>

            <div className="space-y-6">
              {recentSessions.length > 0 ? (
                [...recentSessions].reverse().map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E2E8F0] rounded-lg relative pr-20"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        {" "}
                        {/* Ensures proper truncation */}
                        <p className="text-gray-900 text-lg truncate">
                          {item.topic}
                        </p>
                      </div>
                      <div className="min-w-0">
                        {" "}
                        {/* Prevents subject text from overflowing */}
                        <p className="text-[#0072CF] text-sm truncate">
                          {item.subject}
                        </p>
                      </div>
                    </div>
                    <div className="absolute w-16 bg-[#0072CF] text-white px-4 py-1 rounded-r rounded-[50px] top-1 right-1">
                      {item.formattedTimeSpent}
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
