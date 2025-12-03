import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowHints } from "../../../store/exam/examSlice";
import { useModal } from "../../../helper/ModalContext";
import HintConfirmationModal from "../../../Components/Modals/HintConfirmationModal";
import { generateExamFunApi } from "../../../store/exam/examServices";
import Loader from "../../../Components/Loader";

function ExamInstruction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();
  const loading = useSelector((state) => state.exam.loading);
  const payload = JSON.parse(localStorage.getItem("examPreference"));

  const formik = useFormik({
    initialValues: {
      showHints: false,
    },
    validationSchema: Yup.object({
      showHints: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      const user = JSON.parse(localStorage.getItem("user"));
      payload.userId = user._id;


      try {
        const resultAction = await dispatch(generateExamFunApi(payload));

        if (generateExamFunApi.fulfilled.match(resultAction)) {
          const questions = resultAction.payload?.data; // Get generated questions
          dispatch(setShowHints(values.showHints));
          navigate("/user/exam-session");
        } else {
          console.error("API Request Failed:", resultAction.payload);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      openModal(
        <HintConfirmationModal
          onConfirm={() => {
            formik.setFieldValue("showHints", true);
            dispatch(setShowHints(true));
            closeModal();
          }}
          onCancel={() => closeModal()}
        />
      );
    } else {
      formik.setFieldValue("showHints", false);
      dispatch(setShowHints(false));
    }
  };

  if (loading) return <Loader loading={loading} />;
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl w-full mx-auto my-4 md:my-10"
      >
        <h2 className="text-2xl text-[#333333] font-semibold mb-6">
          Brief explanation about this exam:
        </h2>

        {/* Exam Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#333333] rounded-full p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <div className="font-medium">{payload?.questions} Questions</div>
              <div className="text-gray-500 text-sm">
                These questions are AI generated exactly following the pattern
                of past papers
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#333333] rounded-full p-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="font-medium">{payload?.duration}</div>
              <div className="text-gray-500 text-sm">
                This is the time allotted to answer all questions, as per the
                exam format.
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">
            Please read the text below carefully to understand how to submit
            your answers:
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="text-[#333333]">
                Marks will be awarded for a correct answer in MCQs, and partial
                marks may be awarded for working and incomplete answers in
                subjective and numerical questions.
              </span>
            </li>
            <li>
              <span className="text-[#333333]">
                MCQs: Tap on options to select the correct answer.{" "}
              </span>
            </li>
            <li>
              <span className="text-[#333333]">
                Numericals: Upload an image of your handwritten solution and
                check the text box for accuracy
              </span>
            </li>
            <li>
              <span className="text-[#333333]">
                Subjective / Narrative Questions: Type your answer in the text
                box, or submit an image of your handwritten answer{" "}
              </span>
            </li>
            <li>
              <span className="text-[#333333]">
                Click submit if you are sure you want to submit the exam.
              </span>
            </li>
          </ul>
        </div>

        {/* Hints Toggle */}
        <div className="space-y-2 my-2 flex flex-wrap justify-center">
          <p className="w-full text-[292929] text-lg text-center font-medium">
            Want hints and solutions?
          </p>
          <div className="flex items-center gap-2">
            <span className="text-base text-[#333333]">No</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formik.values.showHints}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0072CF]"></div>
            </label>
            <span className="text-base text-[#333333]">Yes</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="w-full flex justify-center mx-auto">
          <button
            type="submit"
            className="bg-[#0072CF] text-white rounded-full px-8 py-2 font-medium"
          >
            Start Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExamInstruction;
