import { createSlice } from "@reduxjs/toolkit";
import {
  loginFunApi,
  registerFunApi,
  forgotPasswordFunApi,
  resetPasswordFunApi,
  deleteUserFunApi,
  updatelevelFunApi,
  updateUserFunApi,
  changePasswordFunApi,
  getAllUsersFunApi,
  getUserFunApi,
  passwordResetRequestFunApi,
  verifyOtpFunApi,
  verifyUserFunApi,
} from "./authServices";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isSuspended: null,
    isLoading: false,
    isVerified: false,
    token: null,
    role: null,
    level: null,
    dataFatched: false,
    validToken: {
      valid: false,
      isLoading: false,
      dataFetched: false,
    },
    allUsers: {
      data: [],
      currentPage: null,
      totalPages: null,
      totalUsers: null,
      isLoading: false,
      error: null,
    },
    editUser: {
      data: null,
      isLoading: false,
      error: null,
      dataFatched: false,
    },
    singleUser: {
      // Add state for a single user
      data: null,
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers.data = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, newStatus } = action.payload;
      state.allUsers.data = state.allUsers.data.map((user) =>
        user._id === userId ? { ...user, subscriptionStatus: newStatus } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.role = action.payload?.user.role;
        state.isSuspended = action.payload?.user.suspended;
        state.level = action.payload?.user.level;
        state.isVerified = action.payload?.user.verified;
      })
      .addCase(loginFunApi.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.level = null;
        state.token = null;
      });

    builder
      .addCase(registerFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isVerified = false;
      })
      .addCase(registerFunApi.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
      });

    builder
      .addCase(getAllUsersFunApi.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers.data = action.payload.users;
        state.allUsers.currentPage = action.payload.currentPage;
        state.allUsers.totalPages = action.payload.totalPages;
        state.allUsers.totalUsers = action.payload.totalUsers;
        state.allUsers.dataFatched = true;
      })
      .addCase(getAllUsersFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.allUsers.dataFatched = true;
      });

    builder
      .addCase(forgotPasswordFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(forgotPasswordFunApi.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(passwordResetRequestFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(passwordResetRequestFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(passwordResetRequestFunApi.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(verifyOtpFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(verifyOtpFunApi.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(resetPasswordFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordFunApi.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(verifyUserFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUserFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(verifyUserFunApi.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteUserFunApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isVerified = false;
        state.role = null;
        state.token = null;
      })
      .addCase(deleteUserFunApi.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(updatelevelFunApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatelevelFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updatelevelFunApi.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Update failed:", action.payload);
      });

    builder
      .addCase(updateUserFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuspended = action.payload?.suspended;
        state.error = null;
      })
      .addCase(updateUserFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(changePasswordFunApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePasswordFunApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(changePasswordFunApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserFunApi.pending, (state) => {
        state.singleUser.isLoading = true;
        state.singleUser.error = null;
      })
      .addCase(getUserFunApi.fulfilled, (state, action) => {
        state.singleUser.isLoading = false;
        state.singleUser.data = action.payload;
      })
      .addCase(getUserFunApi.rejected, (state, action) => {
        state.singleUser.isLoading = false;
        state.singleUser.error = action.error.message;
      });
  },
});

export const { setAllUsers, updateUserStatus } = authSlice.actions;
export const authReducer = authSlice.reducer;
