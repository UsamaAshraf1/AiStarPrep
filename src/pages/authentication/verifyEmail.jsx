import React, { useState, useRef } from "react";

function EmailVerification() {
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value !== "" && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const correctCode = 123456;
  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode != correctCode) {
      setError("Please enter the correct code");
    } else if (verificationCode.length === 6) {
      setError("");
      console.error("Submitting code:", verificationCode);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen flex">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto p-6 space-y-8">
            {/* Page Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Please verify your email address
              </h1>
              <p className="text-gray-600">
                We've sent an email to becca@gmail.com, please enter the code
                below.
              </p>
            </div>

            {/* Field Section for verification code */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Enter Code
                </label>
                <div className="flex justify-center w-full gap-[10px]">
                  {code.map((digit, index) => (
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
                      pattern="\d*"
                      placeholder="-"
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-[#EA2A2A] text-sm font-medium">{error}</p>
                )}
              </div>

              {/* submit Button  */}
              <button
                onClick={handleSubmit}
                disabled={code.some((digit) => digit === "")}
                className="w-full py-3 px-4 bg-[#0072CF] text-white rounded-full font-medium disabled"
              >
                {/* :opacity-50 disabled:cursor-not-allowed  /////   if want to disable button on before entering code */}
                Create Account
              </button>

              {/* Resend Code request Button */}
              <div className="text-start">
                <p className="text-sm text-gray-600 inline">
                  Didn't get email?{" "}
                  <button className="text-[#0072CF] hover:underline font-medium">
                    Resend
                  </button>
                </p>
              </div>
            </div>
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
    </>
  );
}

export default EmailVerification;
