import { createSlice } from "@reduxjs/toolkit";
import {
  generateExamFunApi,
  extractExamTextFunApi,
  evaluateExamAnswerFunApi,
  saveUserAnswerToDb,
  allExamReportFunApi,
  singleExamReportFunApi,
  examQuestionReportFunApi,
  examEvaluationFeedbackFunApi,
} from "./examServices";

const initialState = {
  // Exam Preferences
  showHints: false, // Whether hints are enabled
  examType: null, // "mcq", "subjective", or "numerical"
  examId: null, // "mcq", "subjective", or "numerical"
  subject: null,
  mcqs: [],
  questionReport: [],
  subjective: [],
  numerical: [],
  examReport: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setShowHints: (state, action) => {
      state.showHints = action.payload;
    },
    resetExamPreferences: () => initialState, // Reset entire state

    resetExamData: (state) => {
      state.subject = null;
      state.examId = null;
      state.examData = null;
      state.questionReport = [];
      state.mcqs = [];
      state.subjective = [];
      state.numerical = [];
      (state.examReport = []), (state.loading = false);
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateExamFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateExamFunApi.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload.data.paper;
        state.examType = action.payload.data.examType;
        state.examId = action.payload.data._id;
        state.mcqs = action.payload.data.mcqs || [];
        state.subjective = action.payload.data.subjective || [];
        state.numerical = action.payload.data.numericals || [];
      })
      .addCase(generateExamFunApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(evaluateExamAnswerFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(evaluateExamAnswerFunApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(evaluateExamAnswerFunApi.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(saveUserAnswerToDb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserAnswerToDb.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveUserAnswerToDb.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(allExamReportFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allExamReportFunApi.fulfilled, (state, action) => {
        state.examReport = action.payload.data;
        state.loading = false;
      })
      .addCase(allExamReportFunApi.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(singleExamReportFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleExamReportFunApi.fulfilled, (state, action) => {
        state.examData = action.payload.data;
        state.loading = false;
      })
      .addCase(singleExamReportFunApi.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(examQuestionReportFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(examQuestionReportFunApi.fulfilled, (state, action) => {
        state.questionReport = action.payload.questions;
        state.loading = false;
      })
      .addCase(examQuestionReportFunApi.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(examEvaluationFeedbackFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(examEvaluationFeedbackFunApi.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(examEvaluationFeedbackFunApi.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setShowHints, resetExamPreferences, resetExamData } =
  examSlice.actions;

export const examReducer = examSlice.reducer;
