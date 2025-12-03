// CART SERVICE
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/api";

// Cart methods 
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, planId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post("cart/add", {
        userId,
        planId,
        quantity,
      });

      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Failed to add to cart.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, planId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("cart/remove", {
        userId,
        planId,
      });

      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Failed to remove item.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Coupons method
export const getUserCoupons = createAsyncThunk(
  "getUserCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("get-user-coupons", {
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

export const applyCoupon = createAsyncThunk(
  "applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "apply-coupon",
        { couponCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const couponAtCheckout = createAsyncThunk(
  "useCouponAtCheckout",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "use-coupon",
        { couponCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// voucher methods
export const applyVoucher = createAsyncThunk(
  "voucher/applyVoucher",
  async (voucherCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "apply-voucher",
        { voucherCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const voucherAtCheckout = createAsyncThunk(
  "usevoucherAtCheckout",
  async (voucherCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "expire-voucher",
        { code: voucherCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Payment intent 
export const createPaymentIntent = createAsyncThunk(
  "cart/createPaymentIntent",
  async ({ userId, amount, cartItems }, { rejectWithValue }) => {
    try {
      const res = await axios.post("create-payment-intent", {
        amount,
        userId,
        cartItems,
      });
      return res.data; // expect { paymentId: ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Payment intent
export const fetchPaymentIntent = createAsyncThunk(
  "cart/fetchPaymentIntent",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`fetch-paymentIntend/${paymentId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
