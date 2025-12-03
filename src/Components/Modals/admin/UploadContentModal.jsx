import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fileName: Yup.string().required("File name is required"),
  subject: Yup.string().required("Subject is required"),
  chapter: Yup.string().required("Chapter is required"),
  topic: Yup.string().required("Topic is required"),
  tags: Yup.string(),
});

function UploadContentModal({ onClose }) {
  const formik = useFormik({
    initialValues: {
      fileName: "",
      subject: "",
      chapter: "",
      topic: "",
      tags: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.warn(values);
    },
  });

  const close = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#0072CF] mb-6">
        Add the following details
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fileName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              File Name
            </label>
            <input
              id="fileName"
              name="fileName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fileName}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#0072CF] focus:border-[#0072CF] ${
                formik.touched.fileName && formik.errors.fileName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.fileName && formik.errors.fileName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.fileName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#0072CF] focus:border-[#0072CF] ${
                formik.touched.subject && formik.errors.subject
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.subject}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="chapter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Chapter
            </label>
            <input
              id="chapter"
              name="chapter"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.chapter}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#0072CF] focus:border-[#0072CF] ${
                formik.touched.chapter && formik.errors.chapter
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.chapter && formik.errors.chapter && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.chapter}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.topic}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:ring-[#0072CF] focus:border-[#0072CF] ${
                formik.touched.topic && formik.errors.topic
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.topic && formik.errors.topic && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.topic}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (optional)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tags}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-[#0072CF] focus:border-[#0072CF]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={() => close()}
            type="button"
            className="font-sfPro px-6 py-2 border border-gray-300 rounded-full text-gray-700 bg-white focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="font-sfPro px-6 py-2 bg-[#0072CF] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:ring-offset-2"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadContentModal;
