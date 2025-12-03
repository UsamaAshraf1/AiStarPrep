import React, { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { useModal } from "../../../helper/ModalContext";
import QuestionEvaluationModal from "../../../Components/Modals/QuestionEvaluationModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { examQuestionReportFunApi } from "../../../store/exam/examServices";
import { learnQuestionReportFunApi } from "../../../store/learn/learnServices";
import jsPDF from "jspdf";

function AnswersReview() {
  const { openModal, closeModal } = useModal();
  const { examId, sessionId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionId) {
      dispatch(learnQuestionReportFunApi(sessionId));
    } else if (examId) {
      dispatch(examQuestionReportFunApi(examId));
    }
  }, [dispatch, examId, sessionId]);

  // Get correct state based on mode
  const questionReport = useSelector((state) =>
    examId ? state.exam.questionReport : state.learn.questionReport
  );
  const loading = useSelector((state) =>
    examId ? state.exam.loading : state.learn.loading
  );
  const error = useSelector((state) =>
    examId ? state.exam.error : state.learn.error
  );

  const reportList = Array.isArray(questionReport) ? questionReport : [];

  const answerEvaluation = (question) => {
    openModal(
      <QuestionEvaluationModal
        onCancel={() => closeModal()}
        question={question}
        examId={examId}
        sessionId={sessionId}
      />
    );
  };

  const handleDownloadAllPDF = () => {
    const pdf = new jsPDF();
    let yPos = 15;
    const pageHeight = pdf.internal.pageSize.height - 15; // Leave margin at the bottom

    pdf.setFontSize(18);
    pdf.text("Answers Review", 14, yPos);
    yPos += 10;

    reportList.forEach((question, index) => {
      pdf.setFontSize(16);

      // Function to check page space and add a new page if needed
      const checkPageBreak = (text) => {
        const textHeight = pdf.getTextDimensions(text).h + 5; // Get actual text height
        if (yPos + textHeight > pageHeight) {
          pdf.addPage();
          yPos = 15; // Reset for new page
        }
      };

      pdf.text(`Question ${index + 1}`, 14, yPos);
      yPos += 7;

      // Marks Section
      pdf.setFontSize(12);
      if (question?.aiEvaluation) {
        const marksText = `Marks: ${question.aiEvaluation.total_marks_awarded}/${question.marks}`;
        checkPageBreak(marksText);
        pdf.text(marksText, 14, yPos);
        yPos += 6;
      } else if (question?.isCorrect !== undefined) {
        const correctnessText = question.isCorrect
          ? "Correct Answer"
          : "Wrong Answer";
        checkPageBreak(correctnessText);
        pdf.text(correctnessText, 14, yPos);
        yPos += 6;
      }

      // Render text blocks with dynamic page breaks
      const renderTextBlock = (title, content) => {
        if (content) {
          pdf.setFontSize(14);
          checkPageBreak(title);
          pdf.text(title, 14, yPos);
          yPos += 5;

          pdf.setFontSize(12);
          const lines = pdf.splitTextToSize(content, 180);
          lines.forEach((line) => {
            checkPageBreak(line);
            pdf.text(line, 14, yPos);
            yPos += 6;
          });

          yPos += 4; // Reduce extra spacing
        }
      };

      // Render Question
      renderTextBlock("Question:", question?.question);

      // Render Question Parts
      if (question?.parts?.length > 0) {
        question.parts.forEach((part) => {
          renderTextBlock(`Part ${part.part_id}:`, part.part_question);
        });
      }

      // Render Answers
      renderTextBlock("Your Answer:", question?.userAnswer);
      renderTextBlock("Correct Answer:", question?.correctAnswer);
      renderTextBlock("Feedback:", question?.aiEvaluation?.feedback);

      // Render Key Points Matched
      if (question?.aiEvaluation?.key_points_matched?.length > 0) {
        pdf.setFontSize(14);
        checkPageBreak("Key Points Matched:");
        pdf.text("Key Points Matched:", 14, yPos);
        yPos += 5;

        pdf.setFontSize(12);
        question.aiEvaluation.key_points_matched.forEach((item) => {
          const point = `- ${item.point}`;
          checkPageBreak(point);
          pdf.text(point, 14, yPos);
          yPos += 5;
        });

        yPos += 3;
      }

      // Render Missing Points
      if (question?.aiEvaluation?.missing_points?.length > 0) {
        pdf.setFontSize(14);
        checkPageBreak("Missing Points:");
        pdf.text("Missing Points:", 14, yPos);
        yPos += 5;

        pdf.setFontSize(12);
        question.aiEvaluation.missing_points.forEach((item) => {
          const missingPoint = `- ${item}`;
          checkPageBreak(missingPoint);
          pdf.text(missingPoint, 14, yPos);
          yPos += 5;
        });
      }

      // Add a separator for clarity
      pdf.line(10, yPos, 200, yPos);
      yPos += 8;
    });

    pdf.save("Answers_Review.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        {examId ? "Exam Answers Review" : "Learn Session Answers Review"}
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadAllPDF}
          className="px-4 py-2 bg-[#0072CF] text-white rounded hover:bg-[#005bb5]"
        >
          Download All as PDF
        </button>
      </div>
      <div className="space-y-2">
        {reportList.map((question) => (
          <button
            key={question._id}
            onClick={() => answerEvaluation(question)}
            className="w-full p-4 flex items-center justify-between rounded-lg transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
          >
            <span className="text-left line-clamp-1 text-ellipsis">
              {question.question}
            </span>
            <LuChevronDown className="h-5 w-5 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default AnswersReview;
