import React, { createContext, useContext, useState } from "react";
import CreateNewPasswordModal from "../Components/Modals/CreateNewPasswordModal";
import SuccessModal from "../Components/Modals/SuccessModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordResetStep, setPasswordResetStep] = useState(0);


  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setPasswordResetStep(0);
  };

  const startPasswordResetFlow = () => {
    setPasswordResetStep(1);
    setIsModalOpen(true);
  };

  const goToNextStep = () => {
    setPasswordResetStep((prev) => prev + 1);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        startPasswordResetFlow,
        passwordResetStep,
      }}
    >
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop with blur effect */}
          <div className="fixed inset-0 bg-[#0072CF26] bg-opacity-50 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              {modalContent}

              {/* Render Reset Password Modals based on the step */}
              {/* {passwordResetStep === 1 && (
                <ResetPasswordModal
                  onClose={closeModal}
                  onContinue={goToNextStep}
                />
              )} */}
              {passwordResetStep === 1 && (
                <CreateNewPasswordModal
                  onClose={closeModal}
                  onContinue={goToNextStep}
                />
              )}
              {passwordResetStep === 2 && <SuccessModal onClose={closeModal} />}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
