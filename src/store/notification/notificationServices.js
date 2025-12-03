import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import {
  createNotificationApi,
  getAllNotificationsApi,
  getNotificationsByIdApi,
  getUserNotificationsApi,
} from "./notificationConstraints";

// Create notification (Admin)
export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        createNotificationApi,
        notificationData,
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
      return rejectWithValue(
        error.response?.data?.message || "Error creating notification"
      );
    }
  }
);

// Get all notifications (Admin)
export const getAllNotifications = createAsyncThunk(
  "notification/getAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getAllNotificationsApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get all notifications"
      );
    }
  }
);

// Get notifications by user level and country (User)
export const getUserNotifications = createAsyncThunk(
  "notification/getUserNotifications",
  async (filters, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getUserNotificationsApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user notifications"
      );
    }
  }
);

export const getNotificationById = createAsyncThunk(
  "notification/getNotificationById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        getNotificationsByIdApi.replace(":id", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data.notification; // Assuming response.data contains { success, notification }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get notification"
      );
    }
  }
);
