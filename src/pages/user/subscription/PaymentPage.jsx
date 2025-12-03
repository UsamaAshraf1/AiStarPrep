import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import OrderSummary from "../../../Components/OrderSummary";
import CheckoutForm from "../../../Components/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchPaymentIntent } from "../../../store/cart/cartServices";
import Loader from "../../../Components/Loader";

// VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(
  "pk_live_51QuC4KCSKMwK7W3j21A0E88HWoZ44eamBUoy4VsIqiq20rvhrDOlDpff0YCL5LJKZwcT9OxWkbGjdfzfu8DI6EBW00ahkdgDiR"
);


function PaymentPage() {
  const { paymentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, discountBreakdown, paymentData, couponCode, voucherCode, loading } = useSelector((state) => state.cart);
  const clientSecret = paymentData?.clientSecret;

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentIntent(paymentId));
    }
  }, [dispatch, paymentId]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser?._id) {
      dispatch(fetchCart(parsedUser._id));
    }
  }, [dispatch]);

  if (loading) return <Loader loading />

  return (
    <div className="w-screen md:max-w-6xl mx-auto p-6">
      {plans.length <= 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty. <br />
          <button
            onClick={() => navigate("/user/subscription-plans")}
            className="text-blue-600 underline mt-2"
          >
            Browse Plans
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Your Payment</h1>
            <p className="text-gray-500">Secure checkout for your educational materials</p>
          </div>

          {clientSecret && paymentData ? (
            <div className="grid gap-8 md:grid-cols-[1fr_380px]">
              <div className="overflow-hidden">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm clientSecret={clientSecret} couponCode={couponCode} voucherCode={voucherCode} />
                </Elements>
              </div>
              <OrderSummary plans={plans} discountBreakdown={discountBreakdown} />
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg">
              Your cart is empty. <br />
              <button
                onClick={() => navigate("/user/subscription-plans")}
                className="text-blue-600 underline mt-2"
              >
                Browse Plans
              </button>
            </div>
          )}
        </>
      )}
    </div>

  );
}

export default PaymentPage;
