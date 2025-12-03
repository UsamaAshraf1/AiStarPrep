import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { examReducer } from "./exam/examSlice";
import { learnReducer } from "./learn/learnSlice";
import { subscriptionReducer } from "./subscription/subscriptionSlice";
import { contactReducer } from "./contact/contactSlice";
import { notificationReducer } from "./notification/notificationSlice";
import { othersReducer } from "./others/otherSlice";
import { cartReducer } from "./cart/cartSlice";
import { voucherReducer } from "./voucher/voucherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exam: examReducer,
    learn: learnReducer,
    subscription: subscriptionReducer,
    cart: cartReducer,
    contact: contactReducer,
    notification: notificationReducer,
    others: othersReducer,
    voucher: voucherReducer,
  },
});
