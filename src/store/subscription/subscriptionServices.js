import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import {
  addPlanApi,
  getPlanListApi,
  getPlanByIdApi,
  updatePlanApi,
  deletePlanApi,
} from "./subscriptionConstraints";

// Add Plan
export const addPlan = createAsyncThunk(
  "subscription/addPlan",
  async (planData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(addPlanApi, planData);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        addPlanApi,
        planData, // Payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Plan List
export const getPlanList = createAsyncThunk(
  "subscription/getPlanList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getPlanListApi, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Plan By ID
export const getPlanById = createAsyncThunk(
  "subscription/getPlanById",
  async (planId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        getPlanByIdApi.replace(":planId", planId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data; // Ensure this matches what Redux expects
    } catch (error) {
      console.error("Error in getPlanById:", error);
      return rejectWithValue(error.response?.data || "Error fetching plan");
    }
  }
);

// Update Plan
export const updatePlan = createAsyncThunk(
  "subscription/updatePlan",
  async ({ planId, ...planData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        updatePlanApi, // Ensure correct API URL
        { planId, ...planData }, // Pass planId in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Update Plan Failed:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// Delete Plan
export const deletePlan = createAsyncThunk(
  "subscription/deletePlan",
  async (planId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        deletePlanApi,
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Delete Plan Error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);
