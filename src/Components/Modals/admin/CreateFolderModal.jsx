import React from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";

function CreateFolderModal({ onClose }) {
  const validationSchema = Yup.object({
    folderName: Yup.string()
      .required("Folder Name is required")
  });

  const formik = useFormik({
    initialValues: {
      folderName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onContinue();
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
        <h3 className="text-2xl font-bold text-[#0072CF] mb-2">
        Create New Folder        </h3>
        <p className="text-xl font-normal text-[#868686] mb-6">
        Enter the name for your folder you want  to create.        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="folderName" className="text-sm font-medium">
              Folder Name
              </label>
            </div>
            <div className="relative">
              <input
                id="folderName"
                type="folderName"
                value={formik.values.folderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm"
              />
            </div>
            {formik.touched.folderName && formik.errors.folderName && (
              <p className="text-[#EA2A2A] text-sm font-medium">
                {formik.errors.folderName}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#0072CF] text-white rounded-full"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
  );
}

export default CreateFolderModal;
