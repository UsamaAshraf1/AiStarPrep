import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetLinkSentModal from "../../Components/Modals/ResetLinkSentModal";
import { FaArrowLeft } from "react-icons/fa6";
import RequestOTPForm from "../../Components/resetpassword/RequestOTPForm";
import VerifyOTPForm from "../../Components/resetpassword/VerifyOTPForm";
import ResetPasswordForm from "../../Components/resetpassword/ResetPasswordForm";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState("request"); // "request", "verify", "reset"
  const [phoneInfo, setPhoneInfo] = useState({ phoneNumber: "", countryCode: "" });
  const [otpCode, setOtpCode] = useState("");

  return (
    <>
      <div className="min-h-screen w-screen flex">
        <div className="absolute w-full top-5 z-50">
          <div className="flex items-center justify-between px-5 md:px-10">
            <button
              onClick={() => navigate(-1)}
              className="text-[#0072CF] flex items-center"
            >
              <FaArrowLeft className="mr-2" />
            </button>
          </div>
        </div>
        <div className="w-full flex z-0">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md mx-auto p-6 space-y-8">
              <div className="space-y-2">
                <div className="w-full flex justify-center">
                  <div className="w-20">
                    <img
                      src={"/AiStar.png"}
                      alt="App Logo"
                      className="object-contain w-full"
                    />
                  </div>
                </div>
              </div>

              {step === "request" && (
                <RequestOTPForm
                  onSuccess={(info) => {
                    setPhoneInfo(info);
                    setStep("verify");
                  }}
                />
              )}

              {step === "verify" && (
                <VerifyOTPForm
                  phoneInfo={phoneInfo}
                  onVerified={(enteredOtp) => {
                    setOtpCode(enteredOtp);
                    setStep("reset");
                  }} />
              )}

              {step === "reset" && (
                <ResetPasswordForm
                  phoneInfo={phoneInfo}
                  otp={otpCode}
                  onResetSuccess={() => {
                    navigate("/auth/signIn");
                  }}
                />
              )}
            </div>
          </div>

          {/* right side */}
          <div className="hidden lg:block lg:w-1/2 max-h-screen relative">
            <img
              src="/assets/images/authImage.png"
              alt="Office environment"
              fill
              className="object-cover w-full max-h-screen"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-8">
              <blockquote className=" absolute max-w-sm text-lg text-white space-y-2 right-10 bottom-10 bg-black/55 p-5 rounded">
                <p className="text-lg">
                  The future belongs to those who believe in the beauty of their
                  dreams.
                </p>
                <footer className="text-sm font-medium text-right">
                  -Eleanor Roosevelt
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
