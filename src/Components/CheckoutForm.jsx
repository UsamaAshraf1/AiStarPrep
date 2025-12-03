import React, { useState, useEffect } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  import { useDispatch } from "react-redux";
import { couponAtCheckout, voucherAtCheckout } from "../store/cart/cartServices";
import PaymentSuccess from "../Components/Modals/PaymentSuccess";
import { useModal } from "../helper/ModalContext";

function CheckoutForm({ clientSecret, couponCode, voucherCode }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { openModal, closeModal } = useModal();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;
  
      setLoading(true);
      setMessage("");
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        }
      );
      setLoading(false);
  
      if (error) {
        setMessage(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        try {
          if (couponCode) {
            await dispatch(couponAtCheckout(couponCode));
          } else if (voucherCode) {
            await dispatch(voucherAtCheckout(voucherCode));
          }          
          openModal(<PaymentSuccess onClose={closeModal} />);
        } catch (err) {
          console.error("Error in checkout process:", err.message);
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-[#333]">Card Number</label>
          <div className="p-3 border rounded bg-white">
            <CardNumberElement className="w-full" />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-[#333]">Expiry Date</label>
            <div className="p-3 border rounded bg-white">
              <CardExpiryElement className="w-full" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-[#333]">CVC</label>
            <div className="p-3 border rounded bg-white">
              <CardCvcElement className="w-full" />
            </div>
          </div>
        </div>
  
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#0072CF] text-white rounded-full p-3 text-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && (
          <p className={`text-${message.includes("✅") ? "green" : "red"}-500`}>
            {message}
          </p>
        )}
      </form>
    );
  }

export default CheckoutForm
