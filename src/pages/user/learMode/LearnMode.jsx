import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { generatePaperFunApi } from "../../../store/learn/learnServices";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import React, { useEffect, useState } from "react";
import syllabusData from "../../../data/syllabus.json";
import { getPlanList } from "../../../store/subscription/subscriptionServices";
import { logEvent } from "../../../analytics";
import { updatelevelFunApi } from "../../../store/auth/authServices";

const levels = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "mix of easy, medium and hard", label: "All" },
];
const questionTypes = [
  { value: "MCQs", label: "Multiple Choice" },
  { value: "Subjective", label: "Subjective" },
  { value: "Numericals", label: "Numerical" },
];

const validationSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
  topic: Yup.string().required("Topic is required"),
  level: Yup.string().required("Difficulty level is required"),
  questionType: Yup.string().required("Question type is required"),
});

export default function LessonForm() {
  const learnLoading = useSelector((state) => state.learn.loading);
  const subscriptionLoading = useSelector((state) => state.subscription.loading);
  const { plans } = useSelector((state) => state.subscription || { plans: [] });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [topicLevels, setTopicLevels] = useState([]);
  const [learnTopics, setLearnTopics] = useState([]);
  const [userLevel, setUserLevel] = useState(user?.level);

  const userCourse = user?.level;
  const userId = user?._id;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!plans.length) {
      dispatch(getPlanList());
    }



    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserLevel(parsedUser.level);
      const courseList = Array.isArray(plans)
        ? plans.filter((plan) => plan.level === parsedUser?.level)
        : [];

      if (parsedUser?.subscriptionPlan && plans.length > 0) {
        const subscribedPlanNames = parsedUser.subscriptionPlan
          .map((sub) => {
            const matchedPlan = courseList.find((plan) => plan._id === sub.planId);
            return matchedPlan ? matchedPlan.name : null;
          })
          .filter(Boolean); // Remove null/undefined values

        const filteredSubjects = syllabusData.syllabuses
          .filter((subject) => subscribedPlanNames.includes(subject.title))
          .map((subject) => ({ value: subject.title, label: subject.title }));

        setSubjects(filteredSubjects);
      }
    }
  }, [plans]);

  const handleTopicLevelChange = (e) => {
    const selectedLevel = e.target.value;
    formik.setFieldValue("topicLevel", selectedLevel);
    formik.setFieldValue("learnTopics", "");
    setLearnTopics([]);

    const subjectData = syllabusData.syllabuses.find(
      (s) => s.title === formik.values.subject
    );

    if (subjectData) {
      const topicsData = subjectData.subject_content[selectedLevel] || [];

      const topics = topicsData.map((topic) => ({
        value: topic,
        label: topic,
      }));

      setLearnTopics(topics);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    formik.setFieldValue("subject", selectedSubject);
    formik.setFieldValue("topicLevel", "");
    formik.setFieldValue("learnTopics", "");
    setTopicLevels([]);
    setLearnTopics([]);

    const subjectData = syllabusData.syllabuses.find(
      (s) => s.title === selectedSubject
    );

    if (subjectData) {
      if (userCourse === "A-Level") {
        // Extract topic levels for A-Level subjects
        const levels = Object.keys(subjectData.subject_content || {}).map(
          (level) => ({
            value: level,
            label: level,
          })
        );
        setTopicLevels(levels);
      } else {
        // Directly extract topics for O-Level subjects
        const topics = subjectData.subject_content.map((topic) => ({
          value: topic,
          label: topic,
        }));
        setLearnTopics(topics);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true, // Reinitialize form on value change
    initialValues: {
      subject: "",
      topic: "",
      level: "",
      questionType: "",
      userId: userId,
      ...(userCourse === "A-Level" && { topicLevel: "A-Level" }), // Add topicLevel only if userCourse is A-Level
    },
    validationSchema,
    onSubmit: async (values) => {

      try {
        const resultAction = await dispatch(generatePaperFunApi(values));

        if (generatePaperFunApi.fulfilled.match(resultAction)) {
          const questions = resultAction.payload?.data; // Get generated questions
          logEvent("Button", "Click", "Session Started");
          navigate("/user/learn-session");
        } else {
          console.error("API Request Failed:", resultAction.payload);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
  });

  const handleLevelChange = async (e) => {
    const newLevel = e.target.value;
    setUserLevel(newLevel);
    try {
      const response = await dispatch(updatelevelFunApi({ userId: user._id, level: newLevel }));
      if (updatelevelFunApi.fulfilled.match(response)) {
        navigate("/user/dashboard");
      } else {
        console.error("Failed to update level:", response.payload);
        setUserLevel(userLevel); // Revert the state on failure
      }
    } catch (error) {
      console.error("Failed to update level", error);
      setUserLevel(userLevel);
    }
  };


  if (learnLoading || subscriptionLoading) return <Loader loading />;

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full text-center space-y-2 py-10">
        <h1 className="font-sfPro text-4xl font-medium text-[#1A1A1A]">
          Master Every Topic at Your Own Pace{" "}
        </h1>
        <p className="font-sfPro text-xl max-w-4xl font-normal text-[#1A1A1AB2]/70 mx-auto">
          Choose a subject or topic and practice with unlimited AI-generated
          questions. Get hints as you go and review full solutions to strengthen
          your understanding—no pressure, just progress.
        </p>
      </div>

      <div className="max-w-[600px] mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-[#F7FBFE] p-6 rounded-xl space-y-2 border border-[#D1E6F6]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sfPro text-2xl font-bold text-[#1A1A1A]">
                Fill the Basic Details
              </h2>
              <select
                onChange={handleLevelChange}
                value={userLevel}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-[#0072CF]"
              >
                <option value="">Change Level</option>
                <option value="O-Level">O-Level</option>
                <option value="A-Level">A-Level</option>
              </select>
            </div>
            {subjects.length === 0 && (
              <p className="text-base">
                You&apos;re not subscribed to any subjects! Please{" "}
                <Link to="/user/subscription-plans" className="text-[#0072CF] underline underline-offset-2">
                  click here
                </Link>{" "}
                and choose from the available plans.
              </p>
            )}

            <div className="space-y-1">
              <label
                htmlFor="subject"
                className="block font-sfPro text-base font-medium text-[#1A1A1A]"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                onChange={handleSubjectChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
              {formik.touched.subject && formik.errors.subject && (
                <p className="font-sfPro text-red-500 text-sm mt-1">
                  {formik.errors.subject}
                </p>
              )}
            </div>

            {userCourse === "A-Level" && (
              <div className="space-y-1">
                <label
                  htmlFor="subject"
                  className="block font-sfPro text-base font-medium text-[#1A1A1A]"
                >
                  Topic Level
                </label>
                <select
                  id="topicLevel"
                  name="topicLevel"
                  value={formik.values.topicLevel}
                  onChange={handleTopicLevelChange}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
                >
                  <option value="">Select Topic Level</option>
                  {topicLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                {formik.touched.topicLevel && formik.errors.topicLevel && (
                  <p className="font-sfPro text-red-500 text-sm mt-1">
                    {formik.errors.topicLevel}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="topic"
                className="block font-sfPro text-base font-medium text-[#1A1A1A]"
              >
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "all") {
                    formik.setFieldValue(
                      "topic",
                      learnTopics.map((topic) => topic.value).join(", ") // Select all topics
                    );
                  } else {
                    formik.setFieldValue("topic", selectedValue);
                  }
                }}
                onBlur={formik.handleBlur}
                value={
                  formik.values.topic ===
                    learnTopics.map((topic) => topic.value).join(", ")
                    ? "all" // Set to "all" when all topics are selected
                    : formik.values.topic
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select topic</option>
                {learnTopics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
                <option value="all">All</option>
              </select>
              {formik.touched.topic && formik.errors.topic && (
                <p className="font-sfPro text-red-500 text-sm mt-1">
                  {formik.errors.topic}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="level"
                className="block font-sfPro text-base font-medium text-[#1A1A1A]"
              >
                Difficulty Level
              </label>
              <select
                id="level"
                name="level"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.level}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select difficulty</option>
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {formik.touched.level && formik.errors.level && (
                <p className="font-sfPro text-red-500 text-sm mt-1">
                  {formik.errors.level}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="questionType"
                className="block font-sfPro text-base font-medium text-[#1A1A1A]"
              >
                Question Type
              </label>
              <select
                id="questionType"
                name="questionType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.questionType}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select question type</option>
                {questionTypes
                  .filter(
                    (type) =>
                      type.value !== "Numericals" ||
                      [
                        "A Level Physics (9702)",
                        "O Level Physics (5054)",
                        "A Level Chemistry (9701)",
                        "O Level Chemistry (5070)",
                      ].includes(formik.values.subject)
                  ) // Show "Numericals" only for Physics & Math
                  .map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
              </select>
              {formik.touched.questionType && formik.errors.questionType && (
                <p className="font-sfPro text-red-500 text-sm mt-1">
                  {formik.errors.questionType}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="font-sfPro px-6 py-2 border border-gray-300 rounded-full text-gray-700 bg-white focus:outline-none"
              >
                Back
              </button>
              <button
                type="submit"
                className="font-sfPro px-6 py-2 bg-[#0072CF] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:ring-offset-2"
              >
                Start
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
