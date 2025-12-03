import React from "react";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createVoucherType } from "../../../store/voucher/voucherServices";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
});


function CreateVoucherType({ onClose }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Prefill form data if editing
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                let resultAction;

                resultAction = await dispatch(createVoucherType(values));

                if (resultAction.meta.requestStatus === "fulfilled") {
                    toast.success("Voucher Type created successfully");

                    //   await dispatch(getPlanList());
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
            <h3 className="text-4xl font-medium mb-2">Add Voucher Type</h3>
            <p className="text-lg mb-6">Enter details to create a new voucher type</p>

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
                        {loading ? "Saving..." : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateVoucherType;