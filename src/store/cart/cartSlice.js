import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, removeFromCart, getUserCoupons, applyCoupon, applyVoucher, createPaymentIntent, fetchPaymentIntent } from "./cartServices";

const initialState = {
  plans: [],
  coupons: [],
  discountBreakdown: null,
  couponCode: null,
  voucherCode: null,
  paymentData: null,
  loading: false,
  error: null,
  voucherError: null,
};

const handleCartFulfilled = (state, action) => {
  state.loading = false;
  const cart = action.payload.cart || {};
  state.plans = cart.plans || [];
  state.discountBreakdown = cart.discountBreakdown || null;
  state.couponCode = cart.couponCode || null;
  state.voucherCode = cart.voucherCode || null;
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, handleCartFulfilled)
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart.";
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, handleCartFulfilled)
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart.";
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, handleCartFulfilled)
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove from cart.";
      })

      .addCase(getUserCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.coupons;
      })
      .addCase(getUserCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.voucherError = null;
      })
      .addCase(applyCoupon.fulfilled, handleCartFulfilled)
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.voucherError = action.payload.message;
      })

      .addCase(applyVoucher.pending, (state) => {
        state.loading = true;
        state.voucherError = null;
      })
      .addCase(applyVoucher.fulfilled, handleCartFulfilled)
      .addCase(applyVoucher.rejected, (state, action) => {
        state.loading = false;
        state.voucherError = action.payload.message;
      })

      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(fetchPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const cartReducer = cartSlice.reducer;
