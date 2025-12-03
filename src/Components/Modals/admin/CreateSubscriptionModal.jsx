import React from "react";
import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addPlan, updatePlan, getPlanList } from "../../../store/subscription/subscriptionServices";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Course name is required"),
  title: Yup.string().required("Course title is required"),
  courseOverview: Yup.string().required("Course Overview is required"),
  level: Yup.string().required("Level is required"),
  price: Yup.number().required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  trialPeriod: Yup.number().required("Trial Period days are required"),
});

const levels = [
  { value: "O-Level", label: "O-Level" },
  { value: "A-Level", label: "A-Level" },
];

const durations = [
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];

function CreateSubscriptionModal({ course, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Prefill form data if editing
  const formik = useFormik({
    initialValues: {
      name: course?.name || "",
      title: course?.title || "",
      courseOverview: course?.courseOverview || "",
      level: course?.level || "",
      price: course?.price || "",
      discountedPrice: course?.discountedPrice || "",
      duration: course?.duration || "",
      trialPeriod: course?.trialPeriod || "",
    },
    enableReinitialize: true, // Allow values to update when course changes
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let resultAction;
        if (course?._id) {
          // Edit mode
          resultAction = await dispatch(updatePlan({ planId: course?._id, ...values }));
        } else {
          // Add mode
          resultAction = await dispatch(addPlan(values));
        }

        if (resultAction.meta.requestStatus === "fulfilled") {
          toast.success("Plan saved successfully");
          // Fetch updated plans list
          await dispatch(getPlanList());

          onClose();
        } else {
          console.error("Failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 bg-[#E5E5E5] text-[#0072CF] w-6 h-6 rounded-full text-2xl flex justify-center items-center"
      >
        <LuX size={20} />
      </button>

      {/* Modal content */}
      <h3 className="text-4xl font-medium mb-2">{course ? "Edit Plan" : "Add Plan"}</h3>
      <p className="text-lg mb-6">{course ? "Update plan details" : "Enter details to create a new plan"}</p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Course Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
        </div>
        <div className="space-y-1">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Course Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.title && formik.errors.title && <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="text"
            id="courseOverview"
            name="courseOverview"
            placeholder="Course Overview"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.courseOverview}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.courseOverview && formik.errors.courseOverview && <p className="text-red-500 text-sm mt-1">{formik.errors.courseOverview}</p>}
        </div>

        <div className="space-y-1">
          <select
            id="level"
            name="level"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.level}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          >
            <option value="">Select level</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {formik.touched.level && formik.errors.level && <p className="text-red-500 text-sm mt-1">{formik.errors.level}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price $"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="number"
            id="discountedPrice"
            name="discountedPrice"
            placeholder="Discounted Price $"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discountedPrice}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.discountedPrice && formik.errors.discountedPrice && <p className="text-red-500 text-sm mt-1">{formik.errors.discountedPrice}</p>}
        </div>

        <div className="space-y-1">
          <select
            id="duration"
            name="duration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.duration}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          >
            <option value="">Select Plan Duration</option>
            {durations.map((duration) => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
          {formik.touched.duration && formik.errors.duration && <p className="text-red-500 text-sm mt-1">{formik.errors.duration}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="number"
            id="trialPeriod"
            name="trialPeriod"
            min="0"
            placeholder="Trial Period Days"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.trialPeriod}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.trialPeriod && formik.errors.trialPeriod && <p className="text-red-500 text-sm mt-1">{formik.errors.trialPeriod}</p>}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button onClick={onClose} type="button" className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 bg-white">
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-full focus:outline-none ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0072CF] text-white"
              }`}
            disabled={loading}
          >
            {loading ? "Saving..." : course ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSubscriptionModal;