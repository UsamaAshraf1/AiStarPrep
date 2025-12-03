import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LuChevronUp,
  LuChevronDown,
  LuClock12,
  LuThumbsUp,
  LuThumbsDown,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ExamSubjective from "../../../Components/userCommonComponents/ExamSubjective";
import ExamMCQ from "../../../Components/userCommonComponents/ExamMCQ";
import {
  evaluateExamAnswerFunApi,
  saveUserAnswerToDb,
} from "../../../store/exam/examServices";
import Loader from "../../../Components/Loader";
import { useModal } from "../../../helper/ModalContext";
import EndExamConfirmation from "../../../Components/Modals/EndExamConfirmation";

const ExamSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mcqs, subjective, subject, showHints, examType, examId } =
    useSelector((state) => state.exam);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
  const [isEvaluationComplete, setIsEvaluationComplete] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [startTime, setStartTime] = useState(Date.now());
  const [questionFeedback, setQuestionFeedback] = useState(null);
  const [comment, setComment] = useState("");
  const loading = useSelector((state) => state.exam.loading);
  const { openModal, closeModal } = useModal();
  const examDetail = JSON.parse(localStorage.getItem("examPreference"));

  const initialDuration = examDetail?.duration;
  const [duration, setDuration] = useState(initialDuration);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const parseDurationToSeconds = (duration) => {
    const parts = duration?.split(" ");
    let totalSeconds = 0;

    for (let i = 0; i < parts?.length; i += 2) {
      const value = parseInt(parts[i]);
      const unit = parts[i + 1];

      if (unit.includes("hour")) {
        totalSeconds += value * 3600;
      } else if (unit.includes("minute")) {
        totalSeconds += value * 60;
      } else if (unit.includes("second")) {
        totalSeconds += value;
      }
    }

    return totalSeconds;
  };

  const formatSecondsToDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let durationString = "";
    if (hours > 0) durationString += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (minutes > 0)
      durationString += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    if (seconds > 0 || durationString === "")
      durationString += `${seconds} second${seconds > 1 ? "s" : ""}`;

    return durationString.trim();
  };

  useEffect(() => {
    const initialSeconds = parseDurationToSeconds(initialDuration);
    setTotalSeconds(initialSeconds);

    // Set up the interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setTotalSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const newDuration = formatSecondsToDuration(totalSeconds);
    setDuration(newDuration);
  }, [totalSeconds]);

  if (!mcqs.length && !subjective.length) {
    return (
      <div className="bg-white h-full flex justify-center items-center">
        <p className="text-2xl font-bold text-gray-700">
          No questions available. Please try again.
        </p>
      </div>
    );
  }
  const totalQuestions =
    examType === "Multiple Choice" ? mcqs.length : subjective.length;

  const isNextDisabled =
    examType !== "Multiple Choice" && !subjectiveAnswer.trim();

  const handleNext = async () => {
    if (isNextDisabled) {
      toast.error("Please upload an answer before proceeding.");
      return;
    }

    if (userAnswer === null && examType === "Multiple Choice") {
      toast.error("Please check an answer!");
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);

    const currentData =
      examType === "Multiple Choice"
        ? mcqs[currentQuestion]
        : subjective[currentQuestion];

    const savePayload = {
      userId: user._id, // Assuming you have the current user's ID
      examId: examId,
      questionId: currentData?._id,
      userAnswer:
        examType === "Multiple Choice" ? userAnswer : subjectiveAnswer,
      examType,
      timeSpent: timeSpent,
      questionFeedback: {
        type: questionFeedback,
        comment: comment || "", // Optional comment
      },
    };

    try {
      await dispatch(saveUserAnswerToDb(savePayload));

      // Evaluate subjective answer if applicable
      if (examType !== "Multiple Choice") {
        const evaluationPayload = {
          questions: [
            {
              question_number: currentQuestion + 1,
              question: currentData?.question,
              marks: currentData?.marks,
            },
          ],
          userAnswer: subjectiveAnswer,
          paper: subject,
        };

        const evaluationResult = await dispatch(
          evaluateExamAnswerFunApi(evaluationPayload)
        );

        if (evaluateExamAnswerFunApi.fulfilled.match(evaluationResult)) {
          const { evaluation, overallScore } =
            evaluationResult.payload.formattedResponse;

          // Save evaluation result to the database
          const saveEvaluationPayload = {
            userId: user._id,
            examId: examId,
            questionId: currentData?._id,
            userAnswer: subjectiveAnswer,
            examType,
            timeSpent: timeSpent,
            questionFeedback: {
              type: questionFeedback,
              comment: comment || "", // Optional comment
            },
            aiEvaluation: evaluation, // Include AI evaluation response
          };

          await dispatch(saveUserAnswerToDb(saveEvaluationPayload));
        }
      }
    } catch (error) {
      console.error("Error saving or evaluating answer:", error);
    }

    // Move to the next question
    if (currentQuestion === totalQuestions - 1) {
      navigate("/user/exam-result");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setShowHint(false);
    setShowExplanation(false);
    setUserAnswer(null);
    setSubjectiveAnswer("");
    setIsEvaluationComplete(false);
    setStartTime(Date.now());
    setQuestionFeedback(null);
    setComment("");
  };

  const endExam = () => {
    // setCurrentQuestion((prev) => prev - 1);
    setShowHint(false);
    setShowExplanation(false);
    setUserAnswer(null);
    setSubjectiveAnswer("");
    setIsEvaluationComplete(false);
    setQuestionFeedback(null);
    setComment("");
    navigate("/user/exam-result");
  };

  const handelEndExam = () => {
    openModal(
      <EndExamConfirmation
        onConfirm={() => {
          endExam();
          closeModal();
        }}
        onCancel={() => closeModal()}
      />
    );
  };

  const handleAnswer = (answer) => {
    if (examType === "Multiple Choice") {
      setUserAnswer(answer);
    } else {
      setSubjectiveAnswer(answer);
    }
  };

  const currentData =
    examType === "Multiple Choice"
      ? mcqs[currentQuestion]
      : subjective[currentQuestion];


  if (loading) return <Loader loading={loading} />;
  return (
    <div className="bg-white h-full">
      <div className="max-w-3xl mx-auto pt-10 space-y-6">
        <div className="flex items-center justify-between w-full">
          <button className="flex items-center gap-2 text-gray-600">
            {/* <span>← Back</span> */}
          </button>

          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden w-full md:w-[500px]">
            <div
              className="absolute left-0 top-0 h-full bg-[#0072CF] rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="text-gray-600 font-medium">
            ({currentQuestion}/{totalQuestions})
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-end gap-4">
            <p className="text-lg font-medium">
              Marks : {examType === "Multiple Choice" ? 1 : currentData?.marks}
            </p>
          </div>
          <div className="border border-[#D6083B] text-[#D6083B] px-4 py-2 rounded-full flex items-center gap-2">
            <LuClock12 className="h-5 w-5 text-[#D6083B]" />
            <span className="font-medium text-base">{duration}</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">Subject: {subject}</h1>

        {examType === "Multiple Choice" ? (
          <ExamMCQ
            question={currentData?.question}
            options={currentData?.options}
            onAnswer={handleAnswer}
            userAnswer={userAnswer}
          />
        ) : (
          <ExamSubjective
            key={currentQuestion}
            question={currentData}
            currentData={currentData}
            onAnswer={handleAnswer}
            value={subjectiveAnswer}
            subject={subject}
            setIsEvaluationComplete={setIsEvaluationComplete}
          />
        )}

        <div>
          <div className="flex flex-wrap justify-center items-center relative">
            <div className="w-full flex flex-row items-center space-x-4 justify-center">
              <h3 className="font-medium text-gray-800 mb-1 text-nowrap">
                How was this question?
              </h3>
              <div className="flex items-start space-x-4">
                {questionFeedback !== "unlike" && (
                  <button
                    className={`p-1 rounded-full border transition ${
                      questionFeedback === "like"
                        ? "bg-[#0072CF] text-white border-[#0072CF]"
                        : "border-gray-300 text-gray-500 hover:bg-blue-100"
                    }`}
                    onClick={() => setQuestionFeedback("like")}
                  >
                    <LuThumbsUp className="w-4 h-4" />
                  </button>
                )}

                {questionFeedback !== "like" && (
                  <button
                    className={`p-1 rounded-full border transition ${
                      questionFeedback === "unlike"
                        ? "bg-red-500 text-white border-red-500"
                        : "border-gray-300 text-gray-500 hover:bg-red-100"
                    }`}
                    onClick={() => setQuestionFeedback("unlike")}
                  >
                    <LuThumbsDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {questionFeedback === "unlike" && (
              <textarea
                className="w-full mt-2 p-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows="2"
                placeholder="Tell us why (optional)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            )}
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-4">
          <button
            onClick={handelEndExam}
            // disabled={currentQuestion === 0}
            className="w-full md:w-auto px-8 py-2 rounded-full text-[20px] font-medium border-2 border-gray-300 text-gray-700 hover:border-blue-400 transition-colors"
          >
            End Exam
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="w-full md:w-auto px-8 py-2 rounded-full text-[20px] font-medium bg-[#0072CF] text-white transition-colors"
          >
            Submit and Continue
          </button>
        </div>

        {showHints && (
          <div className="flex justify-between gap-4">
            {/* <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-[#0072CF] font-medium"
            >
              See Solution
              {showExplanation ? (
                <LuChevronUp size={20} />
              ) : (
                <LuChevronDown size={20} />
              )}
            </button> */}
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
        )}

        {showHint && showHints && (
          <div className="h-[100px] flex justify-center items-center border rounded-[5px] relative">
            <img
              src="/assets/svgs/noto_light-bulb.svg"
              alt=""
              className="absolute -top-5 -left-5"
            />
            <p className="text-[#0072CF]">
              <span className="font-semibold">Hint:</span>{" "}
              {currentData?.explanation ? (
                <>{currentData?.explanation}</>
              ) : (
                <>{currentData?.hint}</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSession;
