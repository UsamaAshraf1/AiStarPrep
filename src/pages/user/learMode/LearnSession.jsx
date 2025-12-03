import React, { useState, useEffect } from "react";
import MCQ from "../../../Components/userCommonComponents/MCQ";
import Subjective from "../../../Components/userCommonComponents/Subjective";
import {
  LuChevronUp,
  LuChevronDown,
  LuThumbsUp,
  LuThumbsDown,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SessionUpdate from "../../../Components/Modals/SessionUpdate";
import { useModal } from "../../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import EndExamConfirmation from "../../../Components/Modals/EndExamConfirmation";
import {
  saveLearnSessionApi,
  saveLearnAnswerFunApi,
  evaluateAnswerFunApi,
} from "../../../store/learn/learnServices";

const LearnSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [questionFeedback, setQuestionFeedback] = useState(null);
  const [comment, setComment] = useState("");
  const loading = useSelector((state) => state.learn.loading);

  const user = JSON.parse(localStorage.getItem("user"));

  const { mcqs, subjective, numerical, subject, learnType, sessionId, topic } =
    useSelector((state) => state.learn);

  if (!mcqs.length && !subjective.length && !numerical.length) {
    return (
      <div className="bg-white h-full flex justify-center items-center">
        <p className="text-2xl font-bold text-gray-700">
          No questions available. Please try again.
        </p>
      </div>
    );
  }

  const totalQuestions =
    learnType === "MCQs"
      ? mcqs.length
      : learnType === "Subjective"
      ? subjective.length
      : numerical.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSession();
    }, 60000 * 30);

    return () => clearTimeout(timer);
  }, []);

  const handleSession = () => {
    openModal(<SessionUpdate onClose={() => closeModal()} />);
  };

  const isNextDisabled =
    (learnType === "Subjective" || learnType === "Numericals") &&
    !subjectiveAnswer.trim();

  const handleNext = async () => {
    if (isNextDisabled) {
      toast.error("Please upload an answer before proceeding.");
      return;
    }

    if (userAnswer === null && learnType === "MCQs") {
      toast.error("Please check an answer!");
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);

    const currentData =
      learnType === "MCQs"
        ? mcqs[currentQuestion]
        : learnType === "Subjective"
        ? subjective[currentQuestion]
        : numerical[currentQuestion];

    const savePayload = {
      userId: user._id,
      sessionId: sessionId,
      questionId: currentData?._id,
      userAnswer: learnType === "MCQs" ? userAnswer : subjectiveAnswer,
      learnType,
      questionFeedback: {
        type: questionFeedback,
        comment: comment || "", // Optional comment
      },
      timeSpent: timeSpent,
    };

    try {
      if (learnType !== "MCQs") {
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
          evaluateAnswerFunApi(evaluationPayload)
        );

        if (evaluateAnswerFunApi.fulfilled.match(evaluationResult)) {
          const { evaluation, overallScore } =
            evaluationResult.payload.formattedResponse;

          const saveEvaluationPayload = {
            userId: user._id,
            sessionId: sessionId,
            questionId: currentData?._id,
            userAnswer: subjectiveAnswer,
            learnType,
            timeSpent: timeSpent,
            questionFeedback: {
              type: questionFeedback,
              comment: comment || "", // Optional comment
            },
            aiEvaluation: evaluation,
          };

          await dispatch(saveLearnAnswerFunApi(saveEvaluationPayload));
        }
      } else {
        await dispatch(saveLearnAnswerFunApi(savePayload));
      }
    } catch (error) {
      console.error("Error saving or evaluating answer:", error);
    }

    if (currentQuestion === totalQuestions - 1) {
      endSession();
      navigate("/user/learn-session-result");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setShowHint(false);
    setShowExplanation(false);
    setUserAnswer(null);
    setSubjectiveAnswer("");
    setStartTime(Date.now());
    setQuestionFeedback(null);
    setComment("");
  };
  const payload = {
    userId: user?._id,
    sessionId: sessionId,
  };

  const endSession = async () => {
    try {
      const response = await dispatch(saveLearnSessionApi(payload));
      setShowHint(false);
      setShowExplanation(false);
      setUserAnswer(null);
      setSubjectiveAnswer("");
      setQuestionFeedback(null);
      setComment("");
      navigate("/user/learn-session-result");
    } catch (error) {
      console.error("Failed to save session finish time:", error);
    }
  };

  const handelEndSession = () => {
    openModal(
      <EndExamConfirmation
        onConfirm={() => {
          endSession();
          closeModal();
        }}
        onCancel={() => closeModal()}
      />
    );
  };

  const handleAnswer = (answer) => {
    if (learnType === "MCQs") {
      setUserAnswer(answer);
      const correctAnswer = mcqs[currentQuestion].correctAnswer;
      if (answer === correctAnswer) {
        setFeedback("Correct!");
        setIsAnswerCorrect(true);
      } else {
        setFeedback("Wrong Answer ");
        setIsAnswerCorrect(false);
      }
    } else {
      setSubjectiveAnswer(answer);
    }
  };

  const currentData =
    learnType === "MCQs"
      ? mcqs[currentQuestion]
      : learnType === "Subjective"
      ? subjective[currentQuestion]
      : numerical[currentQuestion];

  if (loading) return <Loader loading={loading} />;
  return (
    <div className="bg-white h-full">
      <div className="max-w-3xl mx-auto pt-10 space-y-6 ">
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

        <h1 className="text-3xl font-bold text-center mb-5">Topic : {topic}</h1>

        <div className="flex items-center justify-end gap-4">
          <p className="text-lg font-medium">
            Marks : {learnType === "MCQs" ? 1 : currentData?.marks}
          </p>
        </div>

        {learnType === "MCQs" ? (
          <MCQ
            question={currentData?.question}
            options={currentData.options}
            onAnswer={handleAnswer}
            userAnswer={userAnswer}
          />
        ) : (
          <Subjective
            key={currentQuestion}
            question={currentData}
            currentData={currentData}
            onAnswer={handleAnswer}
            value={subjectiveAnswer}
            subject={subject}
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
            onClick={handelEndSession}
            className="w-full md:w-auto px-8 py-2 rounded-full text-[20px] font-medium border-2 border-gray-300 text-gray-700 hover:border-blue-400 transition-colors"
          >
            End Session
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="w-full md:w-auto px-8 py-2 rounded-full text-[20px] font-medium bg-[#0072CF] text-white transition-colors"
          >
            Submit and Continue
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-[#0072CF] font-medium"
          >
            See Solution
            {showExplanation ? (
              <LuChevronUp size={20} />
            ) : (
              <LuChevronDown size={20} />
            )}
          </button>
          {learnType === "MCQs" && (
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
          )}
        </div>

        {showHint && (
          <div className="h-[100px] flex justify-center items-center border rounded-[5px] relative">
            <img
              src="/assets/svgs/noto_light-bulb.svg"
              alt=""
              className="absolute -top-5 -left-5"
            />
            <p className="text-[#0072CF]">
              <span className="font-semibold">Hint:</span>{" "}
              {currentData.hint ? currentData.hint : "No hint available"}
              <br />
            </p>
          </div>
        )}

        {showExplanation && (
          <div className="min-h-[100px] flex justify-center items-center border rounded-[5px] relative">
            <img
              src="/assets/svgs/noto_light-bulb.svg"
              alt=""
              className="absolute -top-5 -left-5"
            />
            <p className="text-[#0072CF] px-2">
              {/* <span className="font-semibold text-[#D6083B]">{feedback}</span> */}
              <br />
              <span className="font-semibold">Solution:</span>{" "}
              {currentData.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnSession;
