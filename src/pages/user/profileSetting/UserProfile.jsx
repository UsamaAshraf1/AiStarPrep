import "react-phone-input-2/lib/style.css";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { LuPlus, LuSquarePen } from "react-icons/lu";
import DeleteAccountModal from "../../../Components/Modals/DeleteAccountModal";
import { useModal } from "../../../helper/ModalContext";
import {
  updateProfileImageFunApi,
  updateUserFunApi,
} from "../../../store/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast from "react-hot-toast";
import CreateNewPasswordModal from "../../../Components/Modals/CreateNewPasswordModal";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  countryCode: Yup.string().required("Country code is required"),
  level: Yup.string().required("Address is required"),
  country: Yup.string().required("Please Select a country"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function UserProfile() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.isLoading);
  const countries = useMemo(() => countryList().getData(), []);

  const user = JSON.parse(localStorage.getItem("user"));
  const [firstName, lastName] = user.name.split(" ");

  const code = user?.phone?.code || "+92";
  const number = user?.phone?.number || "";

  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const { openModal, closeModal } = useModal();

  const startPasswordResetFlow = () => {
    openModal(<CreateNewPasswordModal onClose={() => closeModal()} />);
  }
  const handleDelete = () => {
    openModal(<DeleteAccountModal onClose={() => closeModal()} />);
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: number,
      countryCode: code,
      level: user?.level,
      country: user?.country,
      email: user?.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          name: `${values.firstName} ${values.lastName}`,
          phone: {
            number: values.phoneNumber,
            code: values.countryCode,
          },
          level: values.level,
          country: values.country, // Extract just the country code
          email: values.email,
        };

        const resultAction = await dispatch(
          updateUserFunApi({ userId: user._id, payload })
        );

        if (updateUserFunApi.fulfilled.match(resultAction)) {
          toast.success("Profile updated successfully");
          setIsEdit(false);
          navigate('/user/dashboard')
        } else {
          console.error("failed:", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });
  const userId = user._id;
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setProfileImage(base64Image); // Show preview immediately

      // Upload Base64 image to API
      const response = await dispatch(
        updateProfileImageFunApi({ userId, base64Image })
      );
      if (response.payload?.profileImage) {
        setProfileImage(response.payload?.profileImage); // Update state with backend response
        toast.success("Profile image updated successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Profile Image */}
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <img
                    src={profileImage || "/assets/images/profileIcon.png"}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`${profileImage}` || "/assets/images/profileIcon.png"}
                    alt="user Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute -right-1 -bottom-1 w-6 h-6 bg-[#0072CF] rounded-full flex items-center justify-center cursor-pointer"
              >
                <LuPlus className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-medium">{user.name}</h2>
            </div>
          </div>
          <button
            type="button"
            className="text-[#0072CF]"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <LuSquarePen size={25} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEdit}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEdit}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.lastName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div>
                <div className="flex gap-2">
                  <PhoneInput
                    disabled={!isEdit}
                    country={"pk"}
                    enableSearch={true}
                    value={`${formik.values.countryCode}${formik.values.phoneNumber}`}
                    onChange={(value, country) => {
                      if (value) {
                        const dialCode = `+${country.dialCode}`;
                        const code = `${country.dialCode}`;
                        let numberWithoutCode = value.startsWith(code)
                          ? value.replace(code, "")
                          : value;

                        formik.setValues({
                          ...formik.values,
                          countryCode: dialCode,
                          phoneNumber: numberWithoutCode,
                        });
                      }
                    }}
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-[#EA2A2A] text-sm font-medium">
                    {formik.errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div></div>
            {/* Full Address */}
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Level
              </label>
              {/* <input
                id="level"
                type="text"
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              /> */}
              <select
                id="level"
                disabled={!isEdit}
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              >
                <option value="">Select Level</option>
                <option value='A-Level'>
                  A-Level
                </option>
                <option value='O-Level'>
                  O-Level
                </option>
              </select>
              {formik.touched.level && formik.errors.level && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.level}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
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
                isDisabled={!isEdit}
                placeholder="Select a country"
                classNamePrefix="select"
                isClearable
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.country}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                placeholder="xyz@gmail.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0072CF] focus:border-transparent"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[#EA2A2A] text-sm font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div></div>
            {/* Reset Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Do you want to change your password?
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={startPasswordResetFlow}
                  className="absolute left-1 transform -translate-y-1/2 px-4 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors top-5 mb-10 md:mb-2"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEdit && (
            <div className="flex flex-wrap justify-end gap-5 pt-5 w-full">
              <button
                disabled={status === true}
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-[#0072CF] text-white rounded-full transition-colors"
              >
                {status === true ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                }}
                type="button"
                className="w-full md:w-auto px-6 py-2 bg-white border border-[#378AF2] rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete()}
                type="button"
                className="w-full md:w-auto px-6 py-2 bg-[#D6083B] text-white rounded-full transition-colors"
              >
                Delete Account
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
