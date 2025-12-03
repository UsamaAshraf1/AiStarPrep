import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatelevelFunApi } from "../../store/auth/authServices";
import toast from "react-hot-toast";

export default function LevelSelectModal({ onClose }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user); // Get user from Redux
  const user = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: { level: "" },
    validationSchema: Yup.object({
      level: Yup.string().required("Please select a level"),
    }),
    onSubmit: (values) => {
      dispatch(updatelevelFunApi({ userId: user._id, level: values.level }));
      toast.success("Level updated successfully");
      onClose();
    },
  });

  return (
    <div>
      <div className="space-y-4 mb-4">
        <h2
          id="modal-title"
          className="text-[#0072CF] text-2xl font-semibold text-center"
        >
          Choose Your Level
        </h2>
        <div className="h-px bg-[#9D9D9D80] mx-5" />
        <p className="text-[#262626] text-lg font-medium text-center">
          Discover content tailored to your interests and goals
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <p className="text-[#4F4F4F] text-center font-medium">
            Select the Level
          </p>

          <div className="space-y-2 flex justify-around items-center">
            {[
              { label: "O-Level", value: "O-Level" },
              { label: "A-Level", value: "A-Level" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  value={option.value}
                  checked={formik.values.level === option.value}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    formik.handleChange(e);
                  }}
                  className="w-4 h-4 text-[#0072CF] focus:ring-[#0072CF]"
                />
                <span className="text-black font-medium">{option.label}</span>
              </label>
            ))}
          </div>
          {formik.errors.level && (
            <p className="text-red-500 text-sm">{formik.errors.level}</p>
          )}
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="bg-[#0072CF] text-white rounded-full py-2 px-8 font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
