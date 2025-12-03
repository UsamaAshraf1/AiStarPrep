import { createSlice } from "@reduxjs/toolkit";
import {
  createVoucherType,
  createVouchersFromCSV,
  getVoucherTypes,
  getVouchers,
  getVouchersByUser,
} from "./voucherServices";

const initialState = {
  voucherTypes: [],
  vouchers: [],
  loading: false,
  pagination: null,
  error: null,
  message: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearVoucherMessage(state) {
      state.message = null;
    },
    clearVoucherError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Voucher Type
    builder.addCase(createVoucherType.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createVoucherType.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherTypes.push(action.payload);
      state.message = "Voucher type created successfully";
    });
    builder.addCase(createVoucherType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create Vouchers From CSV
    builder.addCase(createVouchersFromCSV.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createVouchersFromCSV.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message || "Vouchers created successfully";
    });
    builder.addCase(createVouchersFromCSV.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Vouchers
    builder.addCase(getVouchers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVouchers.fulfilled, (state, action) => {
      state.loading = false;
      state.vouchers = action.payload.data;
      state.pagination = action.payload.pagination;
      
    });
    builder.addCase(getVouchers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Vouchers Types
    builder.addCase(getVoucherTypes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVoucherTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherTypes = action.payload;
    });
    builder.addCase(getVoucherTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Vouchers By User
    builder.addCase(getVouchersByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getVouchersByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.vouchers = action.payload.vouchers;

    });
    builder.addCase(getVouchersByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const voucherReducer = voucherSlice.reducer;
