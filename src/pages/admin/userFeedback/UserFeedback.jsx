import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFeedback,
  getUserFeedback,
} from "../../../store/others/otherServices";
import Loader from "../../../Components/Loader";
import { LuTrash2 } from "react-icons/lu";
import DeleteAllFeedback from "../../../Components/Modals/admin/DeleteAllFeedback";
import { useModal } from "../../../helper/ModalContext";
import { saveAs } from "file-saver";

function UserFeedback() {
  const dispatch = useDispatch();
  const userFeedback = useSelector((state) => state.others.userFeedback);
  const totalPages = useSelector((state) => state.others.totalPages);
  const feedbackData = Array.isArray(userFeedback) ? userFeedback : [];
  const loading = useSelector((state) => state.others.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { openModal, closeModal } = useModal();

  const [filters, setFilters] = useState({
    sessionType: '',
    paper: '',
    questionFeedback: '',
    evaluationFeedback: ''
  });

  useEffect(() => {
    dispatch(getUserFeedback({
      page: currentPage,
      limit: itemsPerPage,
      filters
    }));
  }, [dispatch, currentPage, itemsPerPage, filters]);

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setCurrentPage(1);
    setFilters({
      sessionType: '',
      paper: '',
      questionFeedback: '',
      evaluationFeedback: ''
    });
  };

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <Loader loading={loading} />;

  const deleteAllFeedback = () => {
    openModal(<DeleteAllFeedback onClose={closeModal} />);
  };

  const deleteFeedback = async (sessionId, sessionType, questionId) => {
    try {
      const payload = {
        sessionId,
        sessionType,
        questionId,
      };
      const response = await dispatch(deleteUserFeedback(payload));

      if (response.payload.status === "success") {
       await dispatch(getUserFeedback());
      }
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  const downloadCSV = () => {
    if (feedbackData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvHeader = [
      "User Name,Session Type,Paper,Question,Question Feedback,Evaluation Feedback",
    ];
    const csvRows = feedbackData.map((feedback) => {
      return [
        `"${feedback.user?.name || "Unknown"}"`,
        `"${feedback.sessionType}"`,
        `"${feedback.paper}"`,
        `"${feedback.question}"`,
        `"${feedback.questionFeedback?.type || "NA"} - ${feedback.questionFeedback?.comment || ""
        }"`,
        `"${feedback.evaluationFeedback?.type || "NA"} - ${feedback.evaluationFeedback?.comment || ""
        }"`,
      ].join(",");
    });

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, "UserFeedback.csv");
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Users Feedback</h1>
          <div className="flex gap-2">

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-full"
              onClick={downloadCSV}
            >
              Download CSV
            </button>
            <button
              className="bg-[#D6083B] text-white px-6 py-2 rounded-full"
              onClick={deleteAllFeedback}
            >
              Delete All Feedback
            </button>{" "}
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
            value={filters.sessionType}
            onChange={(e) => handleFilterChange('sessionType', e.target.value)}
          >
            <option value="">All Session Types</option>
            <option value="Exam">Exam</option>
            <option value="Learn">Learn</option>
          </select>

          <select
            className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
            value={filters.paper}
            onChange={(e) => handleFilterChange('paper', e.target.value)}
          >
            <option value="">All Papers</option>
            {[...new Set(feedbackData.map((f) => f.paper))].map((paper) => (
              <option key={paper} value={paper}>
                {paper}
              </option>
            ))}
          </select>

          <select
            className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
            value={filters.questionFeedback}
            onChange={(e) => handleFilterChange('questionFeedback', e.target.value)}
          >
            <option value="">All Question Feedback</option>
            <option value="like">👍 Like</option>
            <option value="unlike">👎 Dislike</option>
            <option value="NA">NA</option>
          </select>

          <select
            className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
            value={filters.evaluationFeedback}
            onChange={(e) => handleFilterChange('evaluationFeedback', e.target.value)}
          >
            <option value="">All Evaluation Feedback</option>
            <option value="like">👍 Like</option>
            <option value="unlike">👎 Dislike</option>
            <option value="NA">NA</option>
          </select>

          <button
            className="block w-full rounded-md px-3 py-2 bg-[#D6083B] text-white"
            onClick={() => {
              handleReset()
            }}
          >
            Reset
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
            <thead className="bg-[#F2F4FF]">
              <tr className="whitespace-nowrap">
                {[
                  "User Name",
                  "Session Type",
                  "Paper",
                  "Question",
                  "Question Feedback",
                  "Evaluation Feedback",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="font-medium p-4 text-left text-sm text-normal text-[#292929]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {feedbackData.map((feedback, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {feedback.user?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {feedback.sessionType}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-nowrap">
                    {feedback.paper}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {feedback.question}
                  </td>
                  <td className="px-4 py-2 text-sm flex items-center gap-2">
                    {feedback.questionFeedback?.type === "like"
                      ? "👍"
                      : feedback.questionFeedback?.type === "unlike"
                        ? "👎"
                        : "NA"}
                    <span>{feedback.questionFeedback?.comment}</span>
                  </td>

                  <td className="px-4 py-2">
                    <div className="px-4 py-2 text-sm flex items-center gap-2">
                      {feedback.evaluationFeedback?.type === "like"
                        ? "👍"
                        : feedback.evaluationFeedback?.type === "unlike"
                          ? "👎"
                          : "NA"}
                      <span>{feedback.evaluationFeedback?.comment}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => {
                        deleteFeedback(
                          feedback.sessionId,
                          feedback.sessionType,
                          feedback.questionId
                        );
                      }}
                    >
                      <LuTrash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      {/* {totalPages > 1 && ( */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <select
            className="p-2 border rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* )} */}
    </>
  );
}

export default UserFeedback;
