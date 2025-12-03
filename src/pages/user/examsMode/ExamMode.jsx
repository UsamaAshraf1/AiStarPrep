import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import syllabusData from "../../../data/syllabus.json";
import React, { useEffect, useState } from "react";
import { getPlanList } from "../../../store/subscription/subscriptionServices";
import { updatelevelFunApi } from "../../../store/auth/authServices";

const validationSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
  examType: Yup.string().required("Type is required"),
});

function ExamMode() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examLoading = useSelector((state) => state.exam.loading);
  const subscriptionLoading  = useSelector((state) => state.subscription.loading);
  const plans = useSelector((state) => state.subscription.plans || []);
   
  const [subjects, setSubjects] = useState([]);
  const [topicLevels, setTopicLevels] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [examStructure, setExamStructure] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userCourse = user?.level;
  const userSubjects = user?.subscriptionPlan || [];
  const [userLevel, setUserLevel] = useState(user?.level);

  useEffect(() => {
    dispatch(getPlanList());
  }, []);

  useEffect(() => {
    if (!plans.length) return;
    if (!userSubjects?.length || !syllabusData?.syllabuses?.length || !userCourse) return;

    const subscribedPlanNames = userSubjects
      .map((sub) => plans.find((plan) => plan._id === sub.planId)?.name)
      .filter(Boolean);

    const filteredSubjects = syllabusData.syllabuses
      .filter(
        (subject) =>
          subject.level === userCourse &&
          subscribedPlanNames.includes(subject.title)
      )
      .map((subject) => ({ value: subject.title, label: subject.title }));

    setSubjects(filteredSubjects);
  }, [plans]);

  useEffect(() => {
    if (!userCourse || !subjects.length) return;

    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.level === userCourse)
    );
  }, [userCourse]);

  useEffect(() => {
    formik.setFieldValue("paperStructure", examStructure);
  }, [examStructure]);

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    formik.setFieldValue("subject", selectedSubject);
    formik.setFieldValue("topicLevel", "");
    formik.setFieldValue("examType", "");

    const subjectData = syllabusData.syllabuses.find(
      (s) => s.title === selectedSubject
    );

    if (subjectData) {
      if (userCourse === "A-Level") {

        const levels = Object.keys(subjectData.assessment_overview || {}).map(
          (level) => ({
            value: level,
            label: level,
          })
        );
        setTopicLevels(levels);
        setExamTypes([]);
      } else {

        const papers = Object.values(subjectData.assessment_overview || {}).map(
          (paper) => ({
            value: paper.title,
            label: paper.name,
          })
        );
        setExamTypes(papers);
      }
    } else {
      setTopicLevels([]);
      setExamTypes([]);
    }
  };

  const handleTopicLevelChange = (e) => {
    const selectedLevel = e.target.value;

    formik.setFieldValue("topicLevel", selectedLevel);
    formik.setFieldValue("examType", "");

    const subjectData = syllabusData.syllabuses.find(
      (s) => s.title === formik.values.subject
    );

    if (subjectData) {
      let papers = [];

      if (selectedLevel === "A-Level") {
        const aLevelPapers = Object.values(
          subjectData.assessment_overview["A-Level"] || {}
        );
        const asLevelPapers = Object.values(
          subjectData.assessment_overview["AS-Level"] || {}
        );
        papers = [...asLevelPapers, ...aLevelPapers];
      } else {
        papers = Object.values(
          subjectData.assessment_overview[selectedLevel] || {}
        );
      }

      setExamTypes(
        papers.map((paper) => ({
          value: paper.title,
          label: paper.name,
        }))
      );
    } else {
      setExamTypes([]);
    }
  };

  const getpaperStructure = (e) => {
    const selectedTopic = e.target.value;
    formik.setFieldValue("examType", selectedTopic);

    const subjectData = syllabusData.syllabuses.find(
      (s) => s.title === formik.values.subject
    );

    if (!subjectData) {
      console.error("Subject data not found!");
      return;
    }

    let structure = "No structure available";
    let duration = "No duration available";
    let questions = "No questions available";

    if (userCourse === "A-Level") {
      if (!formik.values.topicLevel) {
        console.error("Topic level is not selected for A-Level.");
        return;
      }

      let topicLevelData = {};
      if (formik.values.topicLevel === "A-Level") {
        topicLevelData = {
          ...subjectData.assessment_overview["A-Level"],
          ...subjectData.assessment_overview["AS-Level"],
        };
      } else {
        topicLevelData =
          subjectData.assessment_overview[formik.values.topicLevel] || {};
      }

      if (!topicLevelData) {
        console.error("Topic Level data not found!");
        return;
      }

      const selectedPaper = Object.values(topicLevelData).find(
        (paper) => paper.title === selectedTopic
      );

      if (selectedPaper) {
        structure = selectedPaper.paper_structure || "No structure available";
        duration = selectedPaper.duration || "No duration available";
        questions =
          selectedPaper.number_of_questions || "No questions available";
      } else {
        console.error("Selected paper not found under topic level!");
      }
    } else {
      const selectedPaper = Object.values(subjectData.assessment_overview).find(
        (paper) => paper.title === selectedTopic
      );

      if (selectedPaper) {
        structure = selectedPaper.paper_structure || "No structure available";
        duration = selectedPaper.duration || "No duration available";
        questions =
          selectedPaper.number_of_questions || "No questions available";
      } else {
        console.error("Selected paper not found!");
      }
    }
    setExamStructure(structure);
    formik.setFieldValue("duration", duration);
    formik.setFieldValue("questions", questions);
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      ...(userCourse === "A-Level" && { topicLevel: "A-Level" }),
      examType: "",
      paperStructure: "",
      duration: "",
      questions: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const examPreference = localStorage.setItem(
        "examPreference",
        JSON.stringify(values)
      );
      navigate("/user/exam-instruction");
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

    if (examLoading || subscriptionLoading) return <Loader loading />;
  

  return (
    <div className="w-full h-full bg-white">
      <div className="w-full text-center space-y-2 py-10">
        <h1 className="font-sfPro text-4xl font-medium text-[#1A1A1A]">
          Simulate Real Exam Conditions & Test Your Skills
        </h1>
        <p className="font-sfPro text-xl max-w-5xl mx-auto font-normal text-[#1A1A1AB2]/70">
          Take an AI-generated exam to push yourself under real test conditions,
          with optional hints to challenge your readiness before the big day.
          Don’t forget to review the correct solutions at the end to improve
          with each attempt!
        </p>
      </div>

      <div className="max-w-[600px] mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-[#F7FBFE] p-6 rounded-xl space-y-2 border border-[#D1E6F6]">
            {subjects.length === 0 && (
              <p className="text-base">
                You&apos;re not subscribed to any subjects! Please{" "}
                <Link to="/user/subscription-plans" className="text-[#0072CF] underline underline-offset-2">
                  click here
                </Link>{" "}
                and choose from the available plans.
              </p>
            )}

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
                  onChange={handleTopicLevelChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.topicLevel}
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
                Paper Type
              </label>
              <select
                id="examType"
                name="examType"
                onChange={getpaperStructure}
                onBlur={formik.handleBlur}
                value={formik.values.examType}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select topic</option>
                {examTypes.map((examType) => (
                  <option key={examType.value} value={examType.value}>
                    {examType.label}
                  </option>
                ))}
              </select>
              {formik.touched.examType && formik.errors.examType && (
                <p className="font-sfPro text-red-500 text-sm mt-1">
                  {formik.errors.examType}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="font-sfPro px-6 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:ring-offset-2"
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

export default ExamMode;
