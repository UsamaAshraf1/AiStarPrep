import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanById } from "../../../store/subscription/subscriptionServices";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
function CourseDetails() {
  const dispatch = useDispatch();
  const { planId } = useParams(); // Extracting planId from URL
  const { selectedPlan, loading, error } = useSelector(
    (state) => state.subscription || { plans: [] }
  );

  useEffect(() => {
    dispatch(getPlanById(planId));
  }, [dispatch, planId]);
  if (loading) return <Loader loading={loading} />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Course Information */}
        <div className="flex-1 space-y-6">
          {/* Course Title */}
          <h1 className="text-2xl font-bold">
            Course Details:{" "}
            <span className="text-[#0072CF]">{selectedPlan?.title}</span>
          </h1>

          {/* Course Overview */}
          <div className="space-y-2">
            <h2 className="text-xl font-medium">Course Overview Section:</h2>
            <p className="text-xl">{selectedPlan?.courseOverview}</p>
          </div>

          {/* Price & Subscription */}
          <div className="space-y-2">
            <p className="text-xl font-medium">
              Price:{" "}
              {/* <span className="text-[#0072CF]">{ " $" + selectedPlan?.price}</span>
               */}
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

          {/* Key Features */}
          <div className="space-y-3">
            <h2 className="text-xl font-medium">
              What’s Included in Your Subscription:
            </h2>
            <ul className="space-y-2 list-disc">
              <li className="ml-4">Unlimited AI-Generated Questions </li>
              <li className="ml-4">Learn Mode & Exam Mode Access</li>
              <li className="ml-4">Solutions & Hints </li>
              <li className="ml-4">Personalized AI Feedback</li>
              <li className="ml-4">Performance Tracking & Analytics</li>
            </ul>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-wrap gap-4 pt-4 w-full md:w-auto">
            <button className="bg-[#0072CF] text-white px-8 py-2.5 rounded-full transition-colors w-full md:w-auto">
              Buy Now
            </button>
            <button className="bg-[#0072CF] text-white px-8 py-2.5 rounded-full transition-colors w-full md:w-auto">
              Add to cart
            </button>
          </div> */}
        </div>

        {/* Right Column - Book Image */}
        <div className="md:w-1/3">
          {/* <div className="bg-[#EBF5FF] p-6 rounded-lg"> */}
          {/* <img
              src=""
              alt="Course Book Cover"
              className="w-full h-auto rounded-lg shadow-lg"
            /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
export default CourseDetails;
