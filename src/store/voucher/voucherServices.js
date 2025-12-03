import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";

// Create Voucher Type
export const createVoucherType = createAsyncThunk(
  "voucher/createVoucherType",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/voucher-type",
        data,
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
      return rejectWithValue(error.response?.data || "Error creating voucher type");
    }
  }
);

// Create Vouchers from CSV
export const createVouchersFromCSV = createAsyncThunk(
  "voucher/createVouchersFromCSV",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/vouchers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error uploading vouchers CSV");
    }
  }
);

// Get Vouchers
export const getVouchers = createAsyncThunk(
  "voucher/getVouchers",
  async (query = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(query).toString();
      const response = await axios.get(
        `/vouchers?${params}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vouchers");
    }
  }
);

// Get Vouchers Type
export const getVoucherTypes = createAsyncThunk(
  "voucher/getVoucherTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/voucher-types`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vouchers");
    }
  }
);

// Get Vouchers by user
export const getVouchersByUser = createAsyncThunk(
  "voucher/getVouchersByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/user-voucher`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching vouchers");
    }
  }
);

