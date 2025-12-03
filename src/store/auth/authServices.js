import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import {
  loginApi,
  registerApi,
  forgetPasswordApi,
  resetPasswordApi,
  deleteUserApi,
  changePasswordApi,
  getAllUsersApi,
  passwordResetRequest,
  verifyOtp,
  verifyUserApi
} from "./authConstraints";
import toast from "react-hot-toast";

export const loginFunApi = createAsyncThunk(
  "auth/login",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(loginApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });
      if (response.data.status === "success") {
        const responseData = response.data.data;
        const { token, user } = responseData;

        //  localStorage.setItem("token", token);
        //  localStorage.setItem("user", JSON.stringify(user));

        if (onSuccess) {
          onSuccess(user.email);
          toast.success("Login Successfull");
        }
        return { user, token };
      } else {
        console.error("Error response in login Api", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in login Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const registerFunApi = createAsyncThunk(
  "auth/register",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(registerApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });
      if (response.data.status === "success") {
        const responseData = response.data;

        return responseData;
      } else {
        console.error("Error response in register Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in register Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

// export const getAllUsersFunApi = createAsyncThunk(
//   "auth/getAllUser",
//   async () => {
//     try {
//       const response = await axios.get(getAllUsersApi);
//       if (response.data.status === "success") {
//         return response.data.data.users;
//       } else {
//         console.error("Error response in login Api => ", response.data);
//         const err =
//           response?.data?.message ||
//           response?.message ||
//           "Something went wrong!";
//         console.error("err: ", err);
//         toast.error(err);
//         throw new Error(err);
//       }
//     } catch (error) {
//       console.error("Error in get all users Api ", error);
//       let err =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Something went wrong!";
//       if (err === "Network Error") {
//         err = "Please check your internet connection";
//       }
//       toast.error(err);
//       throw new Error(err);
//     }
//   }
// );

export const getAllUsersFunApi = createAsyncThunk(
  "auth/getAllUser",
  async ({ page = 1, limit = 10, searchTerm = "", subscriptionFilter = "", levelFilter = "", dateFilter = "", sortOrder = "desc" }) => {
    try {
      const response = await axios.get(`${getAllUsersApi}`, {
        params: {
          page,
          limit,
          search: searchTerm,
          subscription: subscriptionFilter,
          level: levelFilter,
          dateFilter,
          sortOrder
        }
      });

      if (response.data.status === "success") {
        return response.data.data;
      } else {
        const err = response?.data?.message || "Something went wrong!";
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      let err = error?.response?.data?.message || error?.message || "Something went wrong!";
      if (err === "Network Error") err = "Please check your internet connection";
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const forgotPasswordFunApi = createAsyncThunk(
  "auth/forgotPassword",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(forgetPasswordApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });

      if (response.data.status === "success") {
        const message =
          response.data.message || "Password reset link sent successfully";

        // Handle success callback
        if (onSuccess) {
          onSuccess();
        }

        toast.success(message);
        return;
      } else {
        console.error("Error response in forgotPassword Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in forgotPassword Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const resetPasswordFunApi = createAsyncThunk(
  "auth/resetPassword",
  async ({ phoneNumber, otp, password, confirmPassword, onSuccess }) => {
    try {
      const data = {
        phoneNumber,
        otp,
        password,
        confirmPassword,
      };

      const response = await axios.post(resetPasswordApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });


      if (response.data.status === "success") {
        const message = response.data.message || "Password reset successfully";

        if (onSuccess) {
          onSuccess();
        }

        toast.success(message);
        return;
      } else {
        console.error("Error response in resetPassword API => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in resetPassword API ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const deleteUserFunApi = createAsyncThunk(
  "user/deleteUser",
  async ({ userId, password }) => {
    try {
      const data = {
        userId,
        password,
      };
      const response = await axios.post(deleteUserApi, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatelevelFunApi = createAsyncThunk(
  "auth/updateLevel",
  async ({ userId, level }) => {
    try {
      const token = localStorage.getItem("token");
      const path = `/update-level`;

      const response = await axios.post(
        path,
        { userId, level },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return error.response.data.message || "Update failed";
    }
  }
);


export const updateUserFunApi = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, payload }) => {
    try {
      const token = localStorage.getItem("token");
      const path = `/update-user`;

      const response = await axios.post(path,
        { userId, ...payload }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return error.response.data.message || "Update failed";
    }
  }
);

export const getUserFunApi = createAsyncThunk(
  "auth/getUser",
  async ({ userId, onSuccess }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/get-user-by-id", { userId });

      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess(response.data.data);
        }
        return response.data.data;
      } else {
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        toast.error(err);
        return rejectWithValue(err);
      }
    } catch (error) {
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);
export const changePasswordFunApi = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {

      const { password, newPassword, confirmNewPassword } = payload;

      // Ensure all fields are provided
      if (!password || !newPassword || !confirmNewPassword) {
        return rejectWithValue("All fields are required");
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        changePasswordApi, // Your API endpoint
        { password, newPassword, confirmNewPassword }, // Payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );


      if (response.data.status === "success") {
        toast.success(response.data.message || "Password changed successfully");
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Something went wrong!"
        );
      }
    } catch (error) {
      console.error("Error in changePassword API:", error);

      let errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (errMessage === "Network Error") {
        errMessage = "Please check your internet connection";
      }

      // toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const updateProfileImageFunApi = createAsyncThunk(
  "auth/updateProfileImage",
  async ({ userId, base64Image }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const path = `/update-profile-image`;

      const response = await axios.post(
        path,
        { userId, profileImage: base64Image }, // Sending Base64 image
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile image update failed"
      );
    }
  }
);


export const passwordResetRequestFunApi = createAsyncThunk(
  "auth/passwordResetRequest",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(passwordResetRequest, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        const message =
          response.data.message || "Otp sent successfully";

        if (onSuccess) {
          onSuccess();
        }

        toast.success(message);
        return;
      } else {
        console.error("Error response in forgotPassword Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in forgotPassword Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const verifyOtpFunApi = createAsyncThunk(
  "auth/verifyOtp",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(verifyOtp, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        const message =
          response.data.message || "Otp verified successfully";

        if (onSuccess) {
          onSuccess();
        }

        toast.success(message);
        return;
      } else {
        console.error("Error response in verifyOtp Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in verifyOtp Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);

export const verifyUserFunApi = createAsyncThunk(
  "auth/verifyUser",
  async ({ data, onSuccess }) => {
    try {
      const response = await axios.post(verifyUserApi, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        if (onSuccess) {
          onSuccess();
        }
        return;
      } else {
        console.error("Error response in verifyOtp Api => ", response.data);
        const err =
          response?.data?.message ||
          response?.message ||
          "Something went wrong!";
        console.error("err: ", err);
        toast.error(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error in verifyOtp Api ", error);
      let err =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      if (err === "Network Error") {
        err = "Please check your internet connection";
      }
      toast.error(err);
      throw new Error(err);
    }
  }
);