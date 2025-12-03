import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CouponsListModal from "../../../Components/Modals/CouponsListModal";
import { useModal } from "../../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../Components/Loader";
import { applyCoupon, applyVoucher, createPaymentIntent, fetchCart, removeFromCart } from "../../../store/cart/cartServices";
import { LuTag, LuTicket } from "react-icons/lu";
import VouchersListModal from "../../../Components/Modals/VouchersListModal";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [voucherInput, setVoucherInput] = useState("");

  const {
    plans,
    discountBreakdown,
    couponCode,
    voucherCode,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const [userId, setUserId] = useState();
  const [activeTab, setActiveTab] = useState("coupon");


  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser && parsedUser._id) {
      setUserId(parsedUser._id);
    }
  }, []);

  useEffect(() => {
    if (couponCode) {
      setCouponInput(couponCode);
      setActiveTab("coupon");
    } else if (voucherCode) {
      setVoucherInput(voucherCode);
      setActiveTab("voucher");
    }
  }, [couponCode, voucherCode]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const removeItem = async (planId) => {
    try {
      setRemovingItemId(planId);
      const res = await dispatch(removeFromCart({ userId, planId }));

      if (removeFromCart.fulfilled.match(res)) {
        toast.success("Plan removed from cart successfully");
      } else {
        toast.error(res.payload?.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err.message);
      toast.error("An error occurred while removing the item");
    } finally {
      setRemovingItemId(null);
    }
  };


  const handleCouponApply = async (code) => {
    const response = await dispatch(applyCoupon(code));

    if (applyCoupon.fulfilled.match(response)) {
      toast.success(response.payload.message);
      setVoucherInput("");
      closeModal();
    } else {
      toast.error(response.payload?.message || "Failed to apply coupon");
    }
  };


  const handleApplyVoucher = async (code) => {
    const response = await dispatch(applyVoucher(code));

    if (applyVoucher.fulfilled.match(response)) {
      toast.success(response.payload.message);
      setCouponInput(""); 
      closeModal();
    } else {
      toast.error(response.payload?.message || "Failed to apply voucher");
    }
  };

  const handleCoupon = () => {
    openModal(
      <CouponsListModal onClose={closeModal} onApply={handleCouponApply} />
    );
  };

  const handleVoucher = () => {
    openModal(
      <VouchersListModal onClose={closeModal} onApply={handleApplyVoucher} />
    );
  };

    const handleCheckout = async () => {
      try {
        const result = await dispatch(
          createPaymentIntent({ userId, amount: discountBreakdown.totalAfterAllDiscounts, cartItems: plans })
        ).unwrap();
  
        navigate(`/user/make-payment/${result.paymentId}`);
      } catch (err) {
        console.error("Error Creating Payment:", err.message);
      }
    };

  if (loading) return <Loader loading />

  if (error)
    return (
      <div className="bg-white h-full w-full flex flex-col justify-center items-center space-y-4 px-4 text-center">
        <div className="text-red-500 text-5xl">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800">Oops! Something went wrong</h2>
        <p className="text-gray-600 max-w-md">
          {error || "We encountered an unexpected error. Please try again or contact support if the issue persists."}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#0072CF] text-white px-6 py-2 rounded-full transition-colors"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/user/subscription-plans")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );

  if (plans.length === 0)
    return (
      <div className="bg-white h-full w-full flex flex-col justify-center items-center space-y-5">
        <p className="text-2xl font-bold text-gray-700">Your Cart is empty</p>
        <button
          className="bg-[#0072CF] text-white px-16 py-3 rounded-full transition-colors"
          onClick={() => navigate("/user/subscription-plans")}
        >
          Browse Courses
        </button>
      </div>
    );

  return (
    <div className="w-screen md:max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-[#F2F9FF] p-6 rounded-lg flex flex-col justify-between items-start mb-6 space-y-4">

        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl mb-1">{plans.length} Courses</h1>
          <div className="text-2xl font-bold text-[#0072CF]">
            ${discountBreakdown.totalAfterAllDiscounts.toFixed(2)}

          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
          {/* Tabs List */}
          <div className="grid grid-cols-2 mb-4 bg-[#d8d8db] rounded-lg p-1">
            <button
              onClick={() => setActiveTab("coupon")}
              className={`flex items-center gap-2 justify-center py-2 text-sm font-medium rounded-md ${activeTab === "coupon" ? "bg-white" : "bg-[#d8d8db]"
                }`}
            >
              <LuTag className="h-4 w-4" />
              <span>Coupon</span>
            </button>
            <button
              onClick={() => setActiveTab("voucher")}
              className={`flex items-center gap-2 justify-center py-2 text-sm font-medium rounded-md ${activeTab === "voucher" ? "bg-white" : "bg-[#d8d8db]"
                }`}
            >
              <LuTicket className="h-4 w-4" />
              <span>Voucher</span>
            </button> 
          </div>

          {/* Coupon Tab */}
          {activeTab === "coupon" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <button
                  onClick={() => handleCouponApply(couponInput)}
                  disabled={!couponInput.trim() || couponInput === couponCode}
                  className="px-4 py-2 bg-black text-white text-sm rounded-md disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              <div className="text-right">
                <button
                  onClick={handleCoupon}
                  className="text-[#0072CF] text-sm hover:underline"
                >
                  My Coupons
                </button>
              </div>
            </div>
          )}

          {/* Voucher Tab */}
          {activeTab === "voucher" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <button
                  onClick={() => handleApplyVoucher(voucherInput)}
                  disabled={!voucherInput.trim() || voucherInput === voucherCode}
                  className="px-4 py-2 bg-black text-white text-sm rounded-md disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              <div className="text-right">
                <button
                  onClick={handleVoucher}
                  className="text-[#0072CF] text-sm hover:underline"
                >
                  My Vouchers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Courses Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">
          Courses ({plans.length})
        </h2>
        {plans.length === 3 && (
          <h2 className="text-lg text-[#0072CF] text-end mt-1">
            You can add one more plan to your cart for free. Browse available options on our <Link className="underline underline-offset-2" to={'/user/subscription-plans'}>Plans</Link> page.
          </h2>
        )}

        <table className="w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#F2F4F5] text-[#475156] text-sm font-medium">
              <th className="p-4 text-left md:col-span-2">PRODUCTS</th>
              <th className="p-4 text-end">PRICE</th>
              <th className="p-4 text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((item) => (
              <tr
                key={item.planId?._id}
                className="border-b last:border-0 text-sm items-center"
              >
                {/* PRODUCTS */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="hidden md:block text-gray-400">
                      <img src="/assets/svgs/listPlaceholder.svg" alt="" />
                    </div>
                    <div>
                      <h3 className="text-[#0072CF] font-medium">
                        {item.planId?.name}
                      </h3>
                      <p className="text-[#191C1F]">{item.planId?.description}</p>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="p-4 text-end text-gray-900">
                  {item.isFree ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span>
                      $
                      {(
                        item.planId?.discountedPrice ??
                        item.planId?.price ??
                        0
                      ).toFixed(2)}
                    </span>
                  )}
                </td>

                {/* ACTION */}
                <td className="p-4 text-end">
                  <button
                    onClick={() => removeItem(item.planId?._id)}
                    disabled={removingItemId === item.planId?._id}
                    className="text-[#0072CF]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Checkout Button */}
      <div className="text-center">
        <button onClick={handleCheckout} className="bg-[#0072CF] text-white px-16 py-3 rounded-full hover:bg-blue-600 transition-colors">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
