import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";
import { addContactApi, getContactListApi } from "./contactConstraints";
import toast from "react-hot-toast";

export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (contactData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(addContactApi, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Messaage sent");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Async thunk to fetch all contacts
export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getContactListApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get contacts"
      );
    }
  }
);
