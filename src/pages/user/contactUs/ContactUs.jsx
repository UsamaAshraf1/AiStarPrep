import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LuNavigation } from "react-icons/lu";
import { sendContactMessage } from "../../../store/contact/contactServices";
import { FaLocationDot, FaRegEnvelope, FaPhone } from "react-icons/fa6";

const ContactUs = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(sendContactMessage(values));
        resetForm();
      } catch (error) {
        console.error("Error submitting form", error);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:mt-10">
      <div className="rounded-[15px] bg-[#0072CF] overflow-hidden flex flex-col md:flex-row p-8">
        {/* Left Section */}
        {/* Left Section */}

        <div className="p-8 text-white md:w-1/2 flex flex-wrap gap-4 md:gap-0 md:flex-col justify-between order-2 md:order-1">
          <div className="w-full md:max-w-xs">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              We&apos;re here to assist you!
            </h2>
            <p>
              If you have any questions, concerns, or feedback, don&apos;t
              hesitate to reach out. Our team is ready to help!
            </p>
          </div>

          <div className="space-y-4 mb-8 w-full md:max-w-xs">
            <div className="flex items-center gap-2">
              <FaRegEnvelope className="w-4 h-4" />
              <span className="text-sm font-medium">info@aistarprep.com</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <FaPhone className="w-4 h-4" />
              <span className="text-sm font-medium">+123 456 789</span>
            </div> */}
            <div className="flex items-center gap-2">
              <FaLocationDot className="w-4 h-4" />
              <span className="text-sm font-medium">
                TANJONG PAGAR ROAD SINGAPORE 088443
              </span>
            </div>
          </div>

          <div className="flex space-x-8 w-full md:max-w-xs">
            <a href="#">
              <img
                src="/assets/svgs/social/instagram.svg"
                alt="insta-icon-img"
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-[15px] p-8 md:w-1/2 order-1 md:order-2">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows={1}
                className="w-full py-2 border-b border-[#8D8D8D] focus:outline-none"
                {...formik.getFieldProps("message")}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-[#0077E6] text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-[#0072CF] transition-colors"
              disabled={formik.isSubmitting}
            >
              <LuNavigation />
              <span>{formik.isSubmitting ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
