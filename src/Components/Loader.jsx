import React from "react"
const Loader = ({ loading }) => {
    if (!loading) return null;
  
    return (
      <div>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="relative">
            <div className="relative w-32 h-32">
              <div
                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0072CF] border-b-[#0072CF] animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
  
              <div
                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0072CF] animate-spin"
                style={{ animationDuration: "2s", animationDirection: "reverse" }}
              ></div>
            </div>
  
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0072CF]/10 via-transparent to-[#0072CF]/5 animate-pulse rounded-full blur-sm"></div>
            <p className="text-center text-sm mt-2 text-gray-500">Please wait a moment...</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default Loader;