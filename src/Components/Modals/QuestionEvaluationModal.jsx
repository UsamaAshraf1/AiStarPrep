import React, { useState } from "react";
import { LuThumbsDown, LuThumbsUp, LuX } from "react-icons/lu";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch } from "react-redux";
import {
  learnEvaluationFeedbackFunApi,
  learnQuestionReportFunApi,
} from "../../store/learn/learnServices";
import {
  examEvaluationFeedbackFunApi,
  examQuestionReportFunApi,
} from "../../store/exam/examServices";
import toast from "react-hot-toast";

function QuestionEvaluationModal({ onCancel, question, examId, sessionId }) {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);


  const onSubmit = async (feedbackValue) => {
    setLoading(true);
    const payload = {
      questionId: question?._id,
      evaluationFeedback: {
        type: feedback ? feedback : feedbackValue,
        comment: feedback === "unlike" ? comment || "" : "",
      },
    };

    if (examId) {
      await dispatch(examEvaluationFeedbackFunApi({ ...payload, examId }));
      dispatch(examQuestionReportFunApi(examId));
    } else if (sessionId) {
      await dispatch(learnEvaluationFeedbackFunApi({ ...payload, sessionId }));
      dispatch(learnQuestionReportFunApi(sessionId));
    }

    toast.success("Feedback submitted successfully");
    setFeedback(null);
    setComment("");
    setLoading(false);
    onCancel();
  };

  const handleSaveAsPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Question Evaluation", 14, 15);

    pdf.setFontSize(12);
    let yPos = 25;
    if (question?.aiEvaluation) {
      pdf.text(
        `Marks Awarded: ${question.aiEvaluation.total_marks_awarded}/${question.marks}`,
        14,
        yPos
      );
    } else if (question?.isCorrect !== undefined) {
      pdf.text(
        question.isCorrect ? "Correct Answer" : "Wrong Answer",
        14,
        yPos
      );
    }
    yPos += 10;

    pdf.setFontSize(14);
    pdf.text("Question:", 14, yPos);
    yPos += 7;
    pdf.setFontSize(12);
    const questionLines = pdf.splitTextToSize(question?.question || "", 180);
    pdf.text(questionLines, 14, yPos);
    yPos += questionLines.length * 7 + 10;

    if (question?.parts && question.parts.length > 0) {
      pdf.setFontSize(14);
      pdf.text("Question Parts:", 14, yPos);
      yPos += 7;
      pdf.setFontSize(12);
      question.parts.forEach((part) => {
        const partLines = pdf.splitTextToSize(
          `${part.part_id}: ${part.part_question}`,
          180
        );
        pdf.text(partLines, 14, yPos);
        yPos += partLines.length * 7 + 5;
      });
    }

    pdf.setFontSize(14);
    pdf.text("Your Answer:", 14, yPos);
    yPos += 7;
    pdf.setFontSize(12);
    const userAnswerLines = pdf.splitTextToSize(
      question?.userAnswer || "",
      180
    );
    pdf.text(userAnswerLines, 14, yPos);
    yPos += userAnswerLines.length * 7 + 10;

    pdf.setFontSize(14);
    pdf.text("Correct Answer:", 14, yPos);
    yPos += 7;
    pdf.setFontSize(12);
    const correctAnswerLines = pdf.splitTextToSize(
      question?.correctAnswer || "",
      180
    );
    pdf.text(correctAnswerLines, 14, yPos);
    yPos += correctAnswerLines.length * 7 + 10;

    if (question?.aiEvaluation?.feedback) {
      pdf.setFontSize(14);
      pdf.text("Feedback:", 14, yPos);
      yPos += 7;
      pdf.setFontSize(12);
      const feedbackLines = pdf.splitTextToSize(
        question.aiEvaluation.feedback,
        180
      );
      pdf.text(feedbackLines, 14, yPos);
      yPos += feedbackLines.length * 7 + 10;
    }

    if (question?.aiEvaluation?.key_points_matched?.length > 0) {
      pdf.setFontSize(14);
      pdf.text("Key Points Matched:", 14, yPos);
      yPos += 7;
      pdf.setFontSize(12);
      question.aiEvaluation.key_points_matched.forEach((item) => {
        const pointLines = pdf.splitTextToSize(`- ${item.point}`, 180);
        pdf.text(pointLines, 14, yPos);
        yPos += pointLines.length * 7 + 5;
      });
      yPos += 10;
    }

    if (question?.aiEvaluation?.missing_points?.length > 0) {
      pdf.setFontSize(14);
      pdf.text("Missing Points:", 14, yPos);
      yPos += 7;
      pdf.setFontSize(12);
      question.aiEvaluation.missing_points.forEach((item) => {
        const missingPointLines = pdf.splitTextToSize(`- ${item}`, 180);
        pdf.text(missingPointLines, 14, yPos);
        yPos += missingPointLines.length * 7 + 5;
      });
    }

    pdf.save("question_evaluation.pdf");
  };

  return (
    <div className="max-h-[500px] overflow-y-scroll pb-2 scrollbar-thin scrollbar-thumb-[#0072CF] scrollbar-track-gray-200 scrollbar-thumb-rounded">
      <button
        onClick={onCancel}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <LuX className="w-5 h-5" />
      </button>
      <div>
        <div className="flex flex-row items-start justify-between mb-4 mr-5">
          <div className="flex flex-col items-start justify-between">
            {question?.aiEvaluation ? (
              <h2 className="text-lg font-medium text-[#0072CF]">
                Marks Awarded:{" "}
                {`${question?.aiEvaluation?.total_marks_awarded}/${question?.marks}`}
              </h2>
            ) : (
              question?.isCorrect !== undefined && (
                <h2
                  className={`text-lg font-medium ${question?.isCorrect ? "text-[#2CB629]" : "text-red-500"
                    }`}
                >
                  {question?.isCorrect ? "Correct Answer" : "Wrong Answer"}
                </h2>
              )
            )}
            <div>
              {question?.aiEvaluation ? (
                <div>
                  <p className="font-medium">
                    Time per Mark:{" "}
                    {question?.aiEvaluation?.total_marks_awarded > 0
                      ? (question?.timeSpent / 60 / question?.aiEvaluation?.total_marks_awarded).toFixed(2)
                      : "N/A"}{" "}
                    min
                  </p>
                </div>
              ) : (
                question?.isCorrect !== undefined && (
                  <p>
                    Time Spent : {(question?.timeSpent / 60).toFixed(2)} {"min"}
                  </p>
                )
              )}
            </div>
          </div>

          <button
            onClick={handleSaveAsPDF}
            className="px-4 py-2 bg-[#0072CF] text-white rounded hover:bg-[#005bb5]"
          >
            Save as PDF
          </button>
        </div>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-black">Question</h3>
            <p>{question?.question}</p>

            {question?.parts && question.parts.length > 0 && (
              <ul className="mt-3 space-y-2">
                {question.parts.map((part) => (
                  <li key={part._id} className="text-[16px] text-[#333]">
                    <span className="font-semibold">{part.part_id}:</span>{" "}
                    {part.part_question}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[#0072CF]">Your Answer</h3>
            <p>{question?.userAnswer || "You didn't attempt"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2CB629]">Correct Answer</h3>
            <p>{question?.correctAnswer}</p>
          </div>
          {question?.aiEvaluation && (
            <div>
              <h3 className="font-semibold text-[#0072CF]">Feedback</h3>
              <p>{question?.aiEvaluation?.feedback}</p>
            </div>
          )}
          {/* Key Points Matched */}
          {question?.aiEvaluation?.key_points_matched.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#0072CF]">
                Key Points Matched
              </h3>
              <ul className="list-disc pl-5">
                {question?.aiEvaluation?.key_points_matched.map(
                  (item, index) => (
                    <li key={index}>{item.point}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Missing Points */}
          {question?.aiEvaluation?.missing_points.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#0072CF]">Missing Points</h3>
              <ul className="list-disc pl-5">
                {question?.aiEvaluation?.missing_points.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {!question?.evaluationFeedback?.type && (
        <div className="flex flex-wrap justify-center items-center relative p-2 mb-2">
          <div className="w-full flex flex-row items-center space-x-4 justify-center">
            <h3 className="font-medium text-gray-800 mb-1 text-nowrap">
              How the evaluation of your answer?
            </h3>
            <div className="flex items-start space-x-4">
              {feedback !== "unlike" && (
                <button
                  className={`p-1 rounded-full border transition ${feedback === "like"
                      ? "bg-[#0072CF] text-white border-[#0072CF]"
                      : "border-gray-300 text-gray-500 hover:bg-blue-100"
                    }`}
                  onClick={() => {
                    setFeedback("like");
                    onSubmit("like");
                  }}
                >
                  <LuThumbsUp className="w-4 h-4" />
                </button>
              )}

              {feedback !== "like" && (
                <button
                  className={`p-1 rounded-full border transition ${feedback === "unlike"
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300 text-gray-500 hover:bg-red-100"
                    }`}
                  onClick={() => setFeedback("unlike")}
                >
                  <LuThumbsDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {feedback === "unlike" && (
            <>
              <textarea
                className="w-full mt-2 p-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows="2"
                placeholder="Tell us why (optional)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                  disabled={loading === true}
                className="w-full bg-[#0072CF] text-white px-3 py-2 rounded mt-2"
                onClick={() => onSubmit({ feedback: "unlike", comment })}
              >
                Submit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionEvaluationModal;
