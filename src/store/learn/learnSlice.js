import { createSlice } from "@reduxjs/toolkit";
import {
  generatePaperFunApi,
  extractTextFunApi,
  saveLearnSessionApi,
  allSessionListFunApi,
  saveLearnAnswerFunApi,
  evaluateAnswerFunApi,
  singleLearnReportFunApi,
  learnQuestionReportFunApi,
  learnEvaluationFeedbackFunApi,
} from "./learnServices";

// Initial state for Learn Session
const initialState = {
  subject: null,
  topic: null,
  sessionId: null,
  sessionData: null,
  sessionList: [],
  questionReport: [],
  mcqs: [],
  subjective: [],
  numerical: [],
  questionType: null,
  loading: false,
  error: null,
};

const learnSlice = createSlice({
  name: "learn",
  initialState,
  reducers: {
    resetLearn: (state) => {
      state.subject = null;
      state.topic = null;
      state.learnType = null;
      state.sessionId = null;
      state.sessionList = [];
      state.mcqs = [];
      state.subjective = [];
      state.numerical = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePaperFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePaperFunApi.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload.data.paper;
        state.topic = action.payload.data.topic;
        state.learnType = action.payload.data.learnType;
        state.sessionId = action.payload.data._id;
        state.mcqs = action.payload.data.mcqs || [];
        state.subjective = action.payload.data.subjective || [];
        state.numerical = action.payload.data.numericals || [];
      })
      .addCase(generatePaperFunApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message if any
      });

    builder
      .addCase(saveLearnSessionApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLearnSessionApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveLearnSessionApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(evaluateAnswerFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(evaluateAnswerFunApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(evaluateAnswerFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(saveLearnAnswerFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLearnAnswerFunApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveLearnAnswerFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(allSessionListFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allSessionListFunApi.fulfilled, (state, action) => {
        state.sessionList = action.payload.data;
        state.loading = false;
      })
      .addCase(allSessionListFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(singleLearnReportFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleLearnReportFunApi.fulfilled, (state, action) => {
        state.sessionData = action.payload.data;
        state.loading = false;
      })
      .addCase(singleLearnReportFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(learnQuestionReportFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(learnQuestionReportFunApi.fulfilled, (state, action) => {
        state.questionReport = action.payload.questions;
        state.loading = false;
      })
      .addCase(learnQuestionReportFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(learnEvaluationFeedbackFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(learnEvaluationFeedbackFunApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(learnEvaluationFeedbackFunApi.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { resetLearn } = learnSlice.actions;

export const learnReducer = learnSlice.reducer;
