import { createSlice } from "@reduxjs/toolkit";
import {
  shareReferralLink,
  startFreeTrail,
  checkUserSubscription,
  updateExpiredStatus,
  getUserApi,
  getUserFeedback,
  deleteUserFeedback,
  deleteAllFeedbackFunApi,
} from "./otherServices";

const initialState = {
  loading: false,
  subscriptionStatus: null,
  subscriptionDetail: null,
  userFeedback: null,
  userDetail: null,
  error: null,
};

const othersSlice = createSlice({
  name: "others",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shareReferralLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareReferralLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(shareReferralLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(startFreeTrail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startFreeTrail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(startFreeTrail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(checkUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionDetail = action.payload;
        state.subscriptionStatus = action.payload.status;
        localStorage.setItem("subscriptionStatus", state.subscriptionStatus);
      })
      .addCase(checkUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateExpiredStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpiredStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateExpiredStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserApi.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload.data;
      })
      .addCase(getUserApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getUserFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.userFeedback = action.payload.feedback;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getUserFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteUserFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteAllFeedbackFunApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllFeedbackFunApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAllFeedbackFunApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const othersReducer = othersSlice.reducer;
