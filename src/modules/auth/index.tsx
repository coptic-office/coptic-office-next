"use client";
import { useState } from "react";
import { MobileNumber } from "./features/MobileNumberStep";
import { OtpStep } from "./features/OTPStep";
import { AUTH_STEP_ENUM, checkUserModal } from "@/src/types";
import { CheckPassword } from "./features/CheckPassword";
import { ForgetPassword } from "./features/forgetPassword";
import { ResetPassword } from "./features/ResetPassword";
import { useTranslations } from "next-intl";
import { CreateUser } from "./features/CreateUser";
export const Auth = ({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: VoidFunction;
}) => {
  const [currentStep, setCurrentStep] = useState(AUTH_STEP_ENUM.MOBILE_NUMBER);
  const [mobileNumber, setMobileNumber] = useState("");
  const [checkUserData, setCheckUserData] = useState<checkUserModal>({
    otpSent: false,
    isExisted: false,
    otpResend: "",
    mobileNumber: "",
    verificationCode: "",
  });
  const closeAuthModal = () => {
    setCurrentStep(AUTH_STEP_ENUM.MOBILE_NUMBER);
    setCheckUserData({
      otpSent: false,
      isExisted: false,
      otpResend: "",
      mobileNumber: "",
      verificationCode: "",
    });
    setMobileNumber("");
    closeModal();
  };

  const translate = useTranslations();

  const handleChangeStep = (step: AUTH_STEP_ENUM) => {
    setCurrentStep(step);
  };
  return (
    <div
      id='AuthModal'
      className={`${
        isModalOpen ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 flex  right-0 left-0 justify-center items-center w-full md:inset-0 h-full md:h-screen !z-[300]   bg-[#0000004d]`}>
      <div className=' p-0 md:p-4   w-full h-full md:max-w-2xl md:h-auto md:w-[620px]'>
        <div className=' bg-white  rounded-none md:rounded-[18px] shadow   w-full h-full md:max-w-2xl md:max-h-full  p-4 pt-3 md:pt-[60px]  md:p-0   '>
          <div className='border-b-[1px] border-solid border-[#0000001f] relative mb-8 block py-2 md:py-8'>
            <img
              src={"/assets/close.png"}
              width={24}
              height={24}
              className='absolute start-6 cursor-pointer'
              onClick={closeAuthModal}
            />
            <p className='text-base text-black font-bold text-center '>
              {translate("locale.Login_Register")}
            </p>
          </div>
          <div className='px-0 md:px-16 pb-0 md:pb-8'>
            {currentStep == AUTH_STEP_ENUM.MOBILE_NUMBER ? (
              <MobileNumber
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                handleChangeStep={handleChangeStep}
                setCheckUserData={setCheckUserData}
              />
            ) : currentStep == AUTH_STEP_ENUM.OTP ||
              currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD_OTP ? (
              <OtpStep
                handleChangeStep={handleChangeStep}
                checkUserData={checkUserData}
                setCheckUserData={setCheckUserData}
                currentStep={currentStep}
              />
            ) : currentStep == AUTH_STEP_ENUM.VERIFY_PASSWORD ? (
              <CheckPassword
                closeModal={closeAuthModal}
                handleChangeStep={handleChangeStep}
                checkUserData={checkUserData}
              />
            ) : currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD ? (
              <ForgetPassword
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                checkUserData={checkUserData}
                handleChangeStep={handleChangeStep}
                setCheckUserData={setCheckUserData}
              />
            ) : currentStep == AUTH_STEP_ENUM.RESET_PASSWORD ? (
              <ResetPassword
                handleChangeStep={handleChangeStep}
                checkUserData={checkUserData}
              />
            ) : currentStep == AUTH_STEP_ENUM.CREATE_USER ? (
              <CreateUser
                checkUserData={checkUserData}
                closeModal={closeAuthModal}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
