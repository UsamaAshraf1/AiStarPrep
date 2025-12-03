import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import toast from "react-hot-toast";
import {
  generateExamApi,
  extractExamAnswerApi,
  evaluateExamAnswerApi,
  saveExamAnswerApi,
  allExamReportApi,
  singleExamReportApi,
  examQuestionReportApi,
  examEvaluationFeedbackApi,
} from "./examConstraints";

export const generateExamFunApi = createAsyncThunk(
  "exam/generatePaper",
  async (payload, { rejectWithValue }) => {
    try {

      const { subject, topicLevel, examType, paperStructure, questions, userId } = payload;
      if (!subject || !examType) {
        return rejectWithValue("All fields are required");
      }

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(
        generateExamApi,
        { subject, topicLevel, examType, paperStructure, questions, userId }, // Payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include credentials
        }
      );


      if (response.data.success) {

        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Something went wrong!"
        );
      }
    } catch (error) {
      console.error("Error in generatePaper API:", error);

      let errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (errMessage === "Network Error") {
        errMessage = "Please check your internet connection";
      }

      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const extractExamTextFunApi = createAsyncThunk(
  "exam/extractTextFromImage",
  async (images, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(extractExamAnswerApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || "Extraction failed");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const evaluateExamAnswerFunApi = createAsyncThunk(
  "exam/evaluateAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(evaluateExamAnswerApi, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Evaluation failed");
      }
    } catch (error) {
      console.error("Error evaluating answer:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const saveUserAnswerToDb = createAsyncThunk(
  "exam/saveAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(saveExamAnswerApi, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Saving answer failed");
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const allExamReportFunApi = createAsyncThunk(
  "exam/allExamReport",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(`${allExamReportApi}?userId=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Saving answer failed");
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const singleExamReportFunApi = createAsyncThunk(
  "exam/singleExamReport",
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(
        singleExamReportApi.replace(":id", examId),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const examQuestionReportFunApi = createAsyncThunk(
  "exam/examQuestionReport",
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(`${examQuestionReportApi}/${examId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const examEvaluationFeedbackFunApi = createAsyncThunk(
  "exam/evaluationFeedbackFunApi",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(examEvaluationFeedbackApi, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include credentials
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to send your Feedback"
        );
      }
    } catch (error) {
      console.error("Error sending your feedback:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);