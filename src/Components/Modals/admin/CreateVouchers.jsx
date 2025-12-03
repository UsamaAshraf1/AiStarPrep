import React from "react";
import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createVouchersFromCSV, getVoucherTypes } from "../../../store/voucher/voucherServices";


const validationSchema = Yup.object().shape({
    voucherName: Yup.string().required("Voucher name is required"),
    voucherType: Yup.string().required("Voucher type is required"),
    discount: Yup.number()
        .required("Discount is required")
        .max(100, "Can't exceed 100%"),
    expiryDate: Yup.date().required("Expiry date is required"),
});

function CreateVouchers({ onClose }) {
    const dispatch = useDispatch();
    const voucherTypes = useSelector((state) => state.voucher.voucherTypes || []);
    const loading = useSelector((state) => state.voucher.loading);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!voucherTypes || voucherTypes.length === 0) {
            dispatch(getVoucherTypes());
        }
    }, [dispatch, voucherTypes]);

    const formik = useFormik({
        initialValues: {
            voucherName: "",
            voucherType: "",
            discount: "",
            expiryDate: "",
        },
        validationSchema,
        onSubmit: async (values) => {

            if (!file) {
                toast.error("Please upload a CSV file");
                return;
            }
        
            const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
        
            if (!isCSV) {
                toast.error("Invalid file type. Only .csv files are allowed");
                return;
            }

            const formData = new FormData();
            formData.append("voucherName", values.voucherName);
            formData.append("voucherType", values.voucherType);
            formData.append("discount", values.discount);
            formData.append("expiryDate", values.expiryDate);
            formData.append("csvFile", file);

            const result = await dispatch(createVouchersFromCSV({ formData }));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success(result.payload.message);
                onClose();
            } else {
                toast.error(result.payload.message || "Failed to upload CSV");
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
            <h3 className="text-4xl font-medium mb-2">Add Voucher</h3>
            <p className="text-lg mb-6">Enter details to create new vouchers</p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <input
                        type="text"
                        id="voucherName"
                        name="voucherName"
                        placeholder="Voucher Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.voucherName}
                        className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                    />
                    {formik.touched.voucherName && formik.errors.voucherName && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.voucherName}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <select
                        id="voucherType"
                        name="voucherType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.voucherType}
                        className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                    >
                        <option value="">Select Voucher Type</option>
                        {voucherTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.voucherType && formik.errors.voucherType && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.voucherType}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        placeholder="Discount Percentage %"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discount}
                        className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                    />
                    {formik.touched.discount && formik.errors.discount && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.discount}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.expiryDate}
                        className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                    />
                    {formik.touched.expiryDate && formik.errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.expiryDate}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setFile(e.currentTarget.files[0])}
                        className="w-full"
                    />
                    {!file && (
                        <p className="text-red-500 text-sm mt-1">Please upload a CSV file</p>
                    )}
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

export default CreateVouchers;