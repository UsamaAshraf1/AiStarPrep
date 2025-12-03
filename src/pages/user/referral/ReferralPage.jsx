import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { shareReferralLink } from "../../../store/others/otherServices";

const ReferralPage = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // VITE_PLATFORM_URL
  // normal refer link
  const referralLink = `https://aistarprep.com/auth/signup?ref=${user?.referral_code}`;

  // Test phase refer link
  // const referralLink = `https://aistarprep.com/auth/signin`;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      referralLink,
      referrerName: user?.name,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(shareReferralLink(values));
        resetForm();
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top Section */}
      <div className="text-center">
        <img
          src="/assets/svgs/friends_refere.svg"
          alt="Illustration"
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Earn 10% Discount <br />
          By Referring Your Friends
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-1  mt-4 md:mt-8 max-w-sm mx-auto">
            <div className="relative">
              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter your friend's email"
                {...formik.getFieldProps("email")}
                className="w-full pr-20 px-4 py-2 border rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#0072CF] text-white rounded-md"
              >
                Share
              </button>
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#EA2A2A] text-sm font-medium text-start pl-3">
                {formik.errors.email}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralPage;
