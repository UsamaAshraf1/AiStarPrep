import React, { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { verifyUserFunApi } from '../../store/auth/authServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LuX } from 'react-icons/lu';

function VerifySignup({ hashData, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.auth.isLoading);

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const formik = useFormik({
        initialValues: {
            hash: hashData || "",
            otp: ["", "", "", "", "", ""],
        },
        validationSchema: Yup.object({
            otp: Yup.array()
                .of(
                    Yup.string()
                        .matches(/^\d$/, "Must be a number")
                        .required("Required")
                )
                .min(6, "OTP must be 6 digits")
                .max(6, "OTP must be 6 digits"),
            hash: Yup.string().required("User data is required"),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const verificationCode = values.otp.join("");
                const result = await dispatch(verifyUserFunApi({ data: { ...values, otp: verificationCode } }));

                if (verifyUserFunApi.fulfilled.match(result)) {
                    toast.success("User sign up successfully");
                    onClose();
                    navigate("/auth/signin");
                } else {
                    setFieldError("otp", "Invalid OTP. Please try again.");
                }
            } catch (error) {
                console.error("OTP verification failed:", error);
                setFieldError("otp", "An error occurred. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });


    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...formik.values.otp];
            newOtp[index] = value;
            formik.setFieldValue("otp", newOtp);

            if (value && index < 5) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && formik.values.otp[index] === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div className="space-y-2">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <LuX className="w-5 h-5" />
            </button>
            <div className="space-y-2">
                <h1 className="w-full text-2xl font-semibold text-gray-900 text-center">
                    Verify Your Identity
                </h1>
                <p className="text-gray-600 w-full text-center">
                    We&apos;ve sent a one-time password (OTP) to your Phone Number. Please enter the code below to continue.
                </p>
                <p className="text-red-600 text-sm w-full text-center">
                    The OTP will be expire in 10 minutes.
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Enter Code</label>
                    <div className="flex justify-center w-full gap-2">
                        {formik.values.otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                ref={inputRefs[index]}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-14 h-14 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
                                maxLength={1}
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={formik.values.otp.some((digit) => digit === "")}
                    className="w-full py-3 px-4 bg-[#0072CF] text-white rounded-full font-medium disabled:opacity-50"
                >
                    {status === true ? "Verifying..." : "Verify OTP"}
                </button>
            </form>
        </div>

    );
}

export default VerifySignup;
