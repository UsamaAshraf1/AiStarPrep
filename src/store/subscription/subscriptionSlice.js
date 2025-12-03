import { createSlice } from "@reduxjs/toolkit";
import {
  addPlan,
  getPlanList,
  getPlanById,
  updatePlan,
  deletePlan,
} from "./subscriptionServices";

const initialState = {
  plans: [],
  selectedPlan: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans.push(action.payload);
    });
    builder.addCase(addPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Plan List
    builder.addCase(getPlanList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPlanList.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = action.payload.data;
    });
    builder.addCase(getPlanList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Plan By ID
    builder.addCase(getPlanById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPlanById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPlan = action.payload.data || action.payload; // Ensure correct extraction
    });    
    builder.addCase(getPlanById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Plan
    builder.addCase(updatePlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = state.plans.map((plan) =>
        plan.id === action.payload.id ? action.payload : plan
      );
    });
    builder.addCase(updatePlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Plan
    builder.addCase(deletePlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePlan.fulfilled, (state, action) => {
      state.loading = false;
      state.plans = state.plans.filter((plan) => plan._id !== action.payload.data._id);
    });    
    builder.addCase(deletePlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const subscriptionReducer = subscriptionSlice.reducer;
