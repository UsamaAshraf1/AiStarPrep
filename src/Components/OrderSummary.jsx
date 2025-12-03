import React from "react";

function OrderSummary(plans) {

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <p className="text-gray-500 text-sm mt-1">Review your selected courses</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        {plans?.plans.map((plan) => {
                            const planDetails = plan.planId || {};
                            const price = planDetails.discountedPrice ?? planDetails.price ?? 0;

                            return (
                                <div key={planDetails._id} className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{planDetails.name}</span>
                                    </div>
                                    {plan.isFree ? (
                                        <span className="text-green-600 font-semibold">Free</span>
                                    ) : (
                                        <span>${price.toFixed(2)}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <hr className="border-gray-200" />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span>${plans.discountBreakdown.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-emerald-600 flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                                Coupon Discount
                            </span>
                            <span className="text-emerald-600">-${plans.discountBreakdown.couponDiscount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-emerald-600 flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                                Free Item Discount
                            </span>
                            <span className="text-emerald-600">-${plans.discountBreakdown.freeItemDiscount.toFixed(2)}</span>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-center font-medium text-lg">
                        <span>Total</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-normal py-0.5 px-2 border border-gray-200 rounded-full">
                                SAVE $ {((plans?.discountBreakdown?.couponDiscount ?? 0) +
                                    (plans?.discountBreakdown?.freeItemDiscount ?? 0)).toFixed(2)}
                            </span>
                            <span>${plans.discountBreakdown.totalAfterAllDiscounts.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderSummary
