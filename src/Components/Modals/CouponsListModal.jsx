import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuX } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { getUserCoupons } from "../../store/cart/cartServices";

function CouponsListModal({ onClose, onApply }) {
  const { coupons, loading } = useSelector((state) => state.cart); // Select data from store
  const couponsList = Array.isArray(coupons) ? coupons : [];
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUserCoupons());
    }
    fetchData();
  }, [dispatch]);

  if (loading) return <Loader loading />;

  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <LuX className="w-5 h-5" />
      </button>
      {couponsList?.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Your Coupons</h2>

          <div className="rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-2 border-b">
              <div className="text-sm md:col-span-2 font-medium text-[#475156]">
                Coupon Code
              </div>
              <div className="text-sm font-medium text-[#475156] text-end">
                Discount
              </div>
              <div className="text-sm font-medium text-[#475156] text-end pr-3">
                Action
              </div>
            </div>

            {/* Table Body */}
            {couponsList.map((coupon) => (
              <div
                key={coupon._id}
                className="grid grid-cols-3 md:grid-cols-4 gap-2 p-2 border-b last:border-0 items-center"
              >
                <div className="flex items-center gap-3 md:col-span-2">
                  <h3 className="text-[#0072CF] text-sm">{coupon.code}</h3>
                </div>
                <div className="text-gray-900 text-end">
                  {coupon.discount_amount}% Off
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onApply(coupon.code)}
                    className="text-[#0072CF] text-sm px-4 py-1 border border-[#0072CF] rounded-full bg-white hover:bg-blue-50 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 text-center space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            You don’t have any coupons right now.
          </p>
          <p className="text-gray-600">
            Invite your friends to join and earn{" "}
            <span className="font-medium text-[#0072CF]">
              exclusive discount coupons
            </span>{" "}
            when they sign up using your referral link!
          </p>
          <button
            onClick={onClose}>
            <Link
              to="/user/referral"
              className="inline-block mt-2 text-white bg-[#0072CF] hover:bg-[#005fa3] px-4 py-2 rounded-full transition"
            >
              Refer a Friend
            </Link>
          </button>
        </div>
      )}
    </div>

  );
}

export default CouponsListModal;
