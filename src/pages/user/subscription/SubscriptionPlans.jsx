import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPlanList } from "../../../store/subscription/subscriptionServices";
import Loader from "../../../Components/Loader";
import { updatelevelFunApi } from "../../../store/auth/authServices";
import FreeModalAvailability from "../../../Components/Modals/FreeModalAvailability";
import { useModal } from "../../../helper/ModalContext";
import { addToCart, fetchCart } from "../../../store/cart/cartServices";

function SubscriptionPlans() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector(
    (state) => state.subscription || { plans: [] }
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal } = useModal();

  const subscriptionStatus = localStorage.getItem("subscriptionStatus");
  const user = JSON.parse(localStorage.getItem("user"));
  const userSubscriptions = user.subscriptionPlan.map((sub) => sub.planId);
  const [userLevel, setUserLevel] = useState(user.level); // Initialize state

  const courseList = Array.isArray(plans)
    ? plans.filter((plan) => plan.level === userLevel)
    : [];

  const filteredCourses = courseList.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLevelChange = async (e) => {
    const newLevel = e.target.value;
    setUserLevel(newLevel);
    setIsLoading(true)

    try {
      const response = await dispatch(updatelevelFunApi({ userId: user._id, level: newLevel }));
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update level", error);
      setUserLevel(userLevel); // Revert the state on failure
      setIsLoading(false)
    }
  };

  useEffect(() => {
    dispatch(getPlanList());
  }, []);

  const handleRowClick = (id) => {
    navigate(`/user/course-detail/${id}`);
  };

  const handleTrailClick = () => {
    if (subscriptionStatus !== "first_time") {
      // toast("You already availed the free trial");
      openModal(
        <FreeModalAvailability onClose={closeModal} />
      )
      return;
    }
    navigate("/user/free-trial");
  };

  const handleAddToCart = async (planId) => {
    try {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user)._id : null;
  
      if (!userId) {
        toast.error("Please log in to add items to your cart.");
        return;
      }
  
      const res = await dispatch(addToCart({ userId, planId }));
  
      if (addToCart.fulfilled.match(res)) {
        dispatch(fetchCart(userId));
        toast.success("Course added to cart!");
      } else {
        toast.error(res.payload?.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart.");
    }
  };

  if (loading || isLoading) return <Loader loading={loading || isLoading} />;

  return (
    <div className="w-screen md:max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-2">
          Upgrade Your Learning with Our Plans
        </h1>
        {/* <h1 className="text-2xl md:text-3xl font-medium mb-2">
          Upgrade Your Learning with Our Subscription Plan
        </h1> */}
        <p className="mb-1 text-lg md:text-xl">
          Buy 3 subjects and get the 4th subject FREE!
        </p>
        {/* {subscriptionStatus == "first_time" && ( */}
        <button
          onClick={() => handleTrailClick()}
          className="text-[#0072CF] underline text-xl md:text-2xl"
        >
          Start your 7 days free trial.
        </button>
        {/* )} */}
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-md mx-auto flex justify-center py-2">
          <select
            id="level"
            value={userLevel}
            onChange={handleLevelChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
          >
            <option value="">Select Level</option>
            <option value='A-Level'>
              A-Level
            </option>
            <option value='O-Level'>
              O-Level
            </option>
          </select>
        </div>

        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Course"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0072CF]"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EBF5FF]">
              <th className="px-6 py-3 text-left text-base font-medium">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Price
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map((course) => {
              const isPurchased = userSubscriptions.includes(course._id);
              return (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src="/assets/svgs/listPlaceholder.svg"
                        alt={course.name}
                        className="w-10 h-10 rounded mr-3"
                      />
                      <div>
                        <div
                          className="font-medium text-gray-900 cursor-pointer"
                          onClick={() => handleRowClick(course._id)}
                        >
                          {course.name}
                        </div>
                        <div className="text-sm text-gray-500  line-clamp-1 text-ellipsis">
                          {course.courseOverview}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {course.discountedPrice ? (
                      <>
                        <span className="line-through text-gray-500">${course.price.toFixed(2)}</span>
                        <span className="ml-2">${course.discountedPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>${course.price.toFixed(2)}</span>
                    )}
                  </td>

                  <td className="px-6 py-4">{course.duration}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        !isPurchased && handleAddToCart(course._id)
                      }
                      disabled={isPurchased}
                      className={`px-6 py-2 rounded-full transition-colors whitespace-nowrap ${isPurchased
                        ? "bg-yellow-500 text-black"
                        : "bg-[#0072CF] text-white"
                        }`}
                    >
                      {isPurchased ? "Purchased" : "Add to Cart"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionPlans;
