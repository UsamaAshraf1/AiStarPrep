import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getPlanList } from "../../store/subscription/subscriptionServices";
import { startFreeTrail } from "../../store/others/otherServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function FreeTrailSubject({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading, error } = useSelector(
    (state) => state.subscription || { plans: [] }
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const userLevel = user.level;
  const courseList = Array.isArray(plans)
    ? plans.filter((plan) => plan.level === userLevel)
    : [];

  useEffect(() => {
    dispatch(getPlanList());
  }, [dispatch]);

  const validationSchema = Yup.object({
    planId: Yup.string().required("Subject is required"),
  });

  const formik = useFormik({
    initialValues: {
      planId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {

        const resultAction = await dispatch(startFreeTrail(values));

        if (startFreeTrail.fulfilled.match(resultAction)) {
        //   toast.success("Your Free Trail is started");
          onClose();
          navigate("/user/dashboard");
        } else {
          navigate("/user/dashboard");
          toast.error(resultAction.payload.message);
          onClose();
        }
      } catch (error) {
        toast.error("An unexpected error occurred!");
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
      {/* <h3 className="text-2xl font-bold text-[#0072CF] mb-1">
        Change Your Password
      </h3> */}
      <p className="text-lg font-normal text-[#868686] mb-6">
        Select the subject you want to get a free trial for.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="level"
            className="block font-sfPro text-base font-medium text-[#1A1A1A]"
          >
            Select Subject
          </label>
          <select
            id="planId"
            name="planId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.planId}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
          >
            <option value="">Select Subject</option>
            {courseList.map((subject) => (
              <option key={subject.name} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          {formik.touched.planId && formik.errors.planId && (
            <p className="font-sfPro text-red-500 text-sm mt-1">
              {formik.errors.planId}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={loading === true}
            className="px-5 py-2 bg-[#0072CF] text-white rounded-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default FreeTrailSubject;
