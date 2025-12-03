import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import toast from "react-hot-toast";
import {
  generatePaperApi,
  extractAnswerApi,
  evaluateAnswerApi,
  saveSessionApi,
  allSessionListApi,
  saveLearnAnswerApi,
  singleLearnReportApi,
  learnQuestionReportApi,
  learnEvaluationFeedbackApi,
} from "./learnConstraints";

export const generatePaperFunApi = createAsyncThunk(
  "learn/generatePaper",
  async (payload, { rejectWithValue }) => {
    try {

      const { subject, topic, topicLevel, level, questionType, userId } =
        payload;
      if (!subject || !topic || !level || !questionType) {
        return rejectWithValue("All fields are required");
      }

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(
        generatePaperApi,
        { subject, topic, topicLevel, level, questionType, userId }, // Payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include credentials
        }
      );


      if (response.data.success) {
        // Use success flag

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

export const extractTextFunApi = createAsyncThunk(
  "learn/extractTextFromImage",
  async (images, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(extractAnswerApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include credentials
      });

      if (response.data.success) {
        return response.data.data; // Return extracted text
      } else {
        return rejectWithValue(response.data.message || "Extraction failed");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const evaluateAnswerFunApi = createAsyncThunk(
  "learn/evaluateAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(evaluateAnswerApi, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include credentials
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

export const saveLearnSessionApi = createAsyncThunk(
  "learn/saveSessionFinishTime",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(saveSessionApi, payload, {
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
          response.data.message || "Failed to save session finish time"
        );
      }
    } catch (error) {
      console.error("Error saving learn session finish time:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const learnEvaluationFeedbackFunApi = createAsyncThunk(
  "learn/evaluationFeedbackFunApi",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(learnEvaluationFeedbackApi, payload, {
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

export const allSessionListFunApi = createAsyncThunk(
  "exam/allSessionList",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(`${allSessionListApi}/${userId}`, {
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
      console.error("Error getting List:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const saveLearnAnswerFunApi = createAsyncThunk(
  "exam/saveAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");

      const response = await axios.post(saveLearnAnswerApi, payload, {
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


export const singleLearnReportFunApi = createAsyncThunk(
  "learn/singleLearnReport",
  async (learnId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(
        singleLearnReportApi.replace(":id", learnId),
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

export const learnQuestionReportFunApi = createAsyncThunk(
  "learn/learnQuestionReport",
  async (learnId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User is not authenticated");
      const response = await axios.get(`${learnQuestionReportApi}/${learnId}`, {
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