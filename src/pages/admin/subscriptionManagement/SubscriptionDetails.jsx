import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlanById } from "../../../store/subscription/subscriptionServices";
import Loader from "../../../Components/Loader";

function SubscriptionDetails() {
  const { planId } = useParams();

  const dispatch = useDispatch();
  const { selectedPlan, loading, error } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    if (!planId) {
      console.error("planId is missing in SubscriptionDetails!");
      return;
    }
    dispatch(getPlanById(planId));
  }, [planId, dispatch]);

  // if (loading) return <p>Loading plan details...</p>;
  if (loading) return <Loader loading={loading } />;

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedPlan) return <p>No plan found.</p>;
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">
            Course Details:{" "}
            <span className="text-[#0072CF]">{selectedPlan?.title}</span>
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl font-medium">Course Overview:</h2>
            <p className="text-xl">{selectedPlan?.courseOverview}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xl font-medium">
              Price:{" "}
              {/* <span className="text-[#0072CF]">${selectedPlan?.price}</span> */}
              {selectedPlan?.discountedPrice ? (
                <span className="text-[#0072CF]">
                  <span className="line-through text-gray-400 mr-2">
                    ${selectedPlan.price}
                  </span>
                  ${selectedPlan.discountedPrice}
                </span>
              ) : (
                <span className="text-[#0072CF]">
                  ${selectedPlan?.price}
                </span>
              )}
            </p>
            <p className="text-xl font-medium">
              Subscription Plan:{" "}
              <span className="text-[#0072CF]">{selectedPlan?.duration}</span>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-medium">
              What’s Included in Subscription:
            </h2>
            <ul className="space-y-2 list-disc">
              <li className="ml-4">Unlimited AI-Generated Questions </li>
              <li className="ml-4">Learn Mode & Exam Mode Access</li>
              <li className="ml-4">Solutions & Hints </li>
              <li className="ml-4">Personalized AI Feedback</li>
              <li className="ml-4">Performance Tracking & Analytics</li>
            </ul>
          </div>
        </div>

        <div className="md:w-1/3">
          {/* <div className="bg-[#EBF5FF] p-6 rounded-lg">
            <img
              src="/assets/images/courses/chemistry.png"
              alt="Course Book Cover"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
