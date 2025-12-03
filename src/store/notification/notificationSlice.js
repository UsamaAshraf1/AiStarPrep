import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNotifications,
  getUserNotifications,
  createNotification,
  getNotificationById,
} from "./notificationServices";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    userNotifications: [],
    singleNotification: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create notification
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications.push(action.payload.notification);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get all notifications
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get notifications by user level and country
      .addCase(getUserNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userNotifications = action.payload.notifications;
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get notification by id
      .addCase(getNotificationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleNotification = action.payload;
      })
      .addCase(getNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
