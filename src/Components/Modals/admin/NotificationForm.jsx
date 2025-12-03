import React, { useMemo } from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createNotification } from "../../../store/notification/notificationServices";
import { useDispatch } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast from "react-hot-toast";

const levels = [
  { value: "A-Level", label: "A-Level" },
  { value: "O-Level", label: "O-Level" },
];

const countrys = [
  { value: "uk", label: "United Kingdom" },
  { value: "india", label: "India" },
  { value: "pakistan", label: "Pakistan" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  level: Yup.string().required("Level is required"),
  country: Yup.string().required("Please Select a country"),
  message: Yup.string().required("Message is required"),
});

function NotificationForm({ onClose }) {
  const dispatch = useDispatch();
  const countries = useMemo(() => countryList().getData(), []);

  const formik = useFormik({
    initialValues: {
      title: "",
      level: "",
      country: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(createNotification(values));
        resetForm();
        toast.success("Notification sent successfully");
        onClose();
      } catch (error) {
        console.error("Error submitting form", error);
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
      <h3 className="text-4xl font-medium mb-2">Add details</h3>
      <p className="text-lg mb-6">
        Add following details to create notification
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="font-sfPro text-red-500 text-sm mt-1">
              {formik.errors.title}
            </p>
          )}
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
            <option value="">Level</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {formik.touched.level && formik.errors.level && (
            <p className="font-sfPro text-red-500 text-sm mt-1">
              {formik.errors.level}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Select
            id="country"
            options={countries}
            value={
              countries.find(
                (option) => option.label === formik.values.country
              ) || null
            } // Map back to full object
            onChange={(option) =>
              formik.setFieldValue("country", option?.label || "")
            }
            onBlur={() => formik.setFieldTouched("country", true)}
            placeholder="Select a country"
            classNamePrefix="select"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
                border: "none",
                borderBottom: "1px solid #8D8D8D",
                boxShadow: state.isFocused ? "none" : base.boxShadow,
                padding: "8px 0",
                "&:hover": {
                  borderBottom: "1px solid #8D8D8D",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#8D8D8D",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#8D8D8D",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            isClearable
          />
          {formik.touched.country && formik.errors.country && (
            <p className="font-sfPro text-red-500 text-sm mt-1">
              {formik.errors.country}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
          ></textarea>
          {formik.touched.message && formik.errors.message && (
            <p className="font-sfPro text-red-500 text-sm mt-1">
              {formik.errors.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onClose}
            type="button"
            className="font-sfPro px-6 py-2 border border-gray-300 rounded-full text-gray-700 bg-white focus:outline-none"
          >
            Preview
          </button>
          <button
            type="submit"
            className="font-sfPro px-6 py-2 bg-[#0072CF] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default NotificationForm;
