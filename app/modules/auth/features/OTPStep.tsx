import { useTranslation } from "@/app/i18n";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Header } from "../components/Header";
import OTPInput from "react-otp-input";
import { AUTH_STEP_ENUM, checkUserModal } from "../../../[lang]/types";
import { LoadingSpinner } from "../components/loading";
import { resendOtpApi, verifyOtp } from "@/app/network/auth";
let interval: any = null;
export const OtpStep = ({
  handleChangeStep,
  checkUserData,
  setCheckUserData,
  currentStep,
}: {
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  checkUserData: checkUserModal;
  setCheckUserData: Dispatch<SetStateAction<checkUserModal>>;
  currentStep: AUTH_STEP_ENUM;
}) => {
  const [error, setError] = useState(false);
  console.log("checkUserData", checkUserData);
  const [loading, setLoading] = useState({
    resendLoading: false,
    verifyLoading: false,
  });
  const [otp, setOtp] = useState("");
  const [i18n, setI18n] = useState<any>(null);
  const [resendTime, setResendTime] = useState<number | null>();

  useEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      let newDiff =
        (new Date(checkUserData.otpResend) as any) - (new Date() as any);
      setResendTime(Math.floor(newDiff / 1000));
    }, 1000);
  }, [checkUserData]);
  useTranslation(localStorage.getItem("lang")).then((value: any) => {
    setI18n(value);
  });

  const verify = () => {
    setLoading({ ...loading, verifyLoading: true });
    if (!otp || otp.length < 6) {
      setError(true);
      setLoading({ ...loading, verifyLoading: false });
      return;
    } else {
      verifyOtp(
        {
          mobileNumber: checkUserData.mobileNumber,
          otp: otp,
        },
        i18n?.i18n?.language
      )
        .then((response) => {
          setLoading({ ...loading, verifyLoading: false });
          console.log("response", response?.data);
          setCheckUserData({
            ...checkUserData,
            verificationCode: (response.data as any)?.message?.verificationCode,
          });
          if (currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD_OTP)
            handleChangeStep(AUTH_STEP_ENUM.RESET_PASSWORD);
          else handleChangeStep(AUTH_STEP_ENUM.CREATE_USER);
        })
        .catch((err) => {
          console.log("ERROR", err);
          setError(err?.response?.data?.error ?? true);
          setLoading({ ...loading, resendLoading: false });
        });
    }
  };
  const resendOtp = () => {
    setError(false);
    if (!loading.resendLoading) {
      setLoading({ ...loading, resendLoading: true });
      resendOtpApi(checkUserData.mobileNumber, i18n?.i18n?.language)
        .then((response) => {
          setCheckUserData({
            ...checkUserData,
            otpResend: (response.data as any)?.message?.otpResend,
          });
          setLoading({ ...loading, resendLoading: false });
        })
        .catch((err) => {
          setError(
            (err?.response?.data?.message?.info ||
              err?.response?.data?.error) ??
              true
          );
          if (err?.response?.data?.message?.otpResend) {
            setCheckUserData({
              ...checkUserData,
              otpResend: err?.response?.data?.message?.otpResend,
            });
          }

          setLoading({ ...loading, resendLoading: false });
        });
    }
  };
  return (
    <div>
      <Header
        description='Verification_Code_Text'
        title='Verification_Code'
        marginBottom={"mb-3"}
      />
      <div
        className='flex justify-center md:justify-start w-fit flex-row gap-1  items-center '
        dir='ltr'>
        <p className='text-sm text-black font-bold'>
          {checkUserData?.mobileNumber}
        </p>
        {currentStep == AUTH_STEP_ENUM.FORGET_PASSWORD_OTP ? (
          ""
        ) : (
          <img
            src='/assets/Edit.svg'
            className='cursor-pointer'
            onClick={() => {
              handleChangeStep(AUTH_STEP_ENUM.MOBILE_NUMBER);
            }}
            width={"24px"}
            height={"24px"}
          />
        )}
      </div>
      <div className='mt-10 md:mt-6 mb-10 md:mb-[38px]'>
        <div className='flex justify-center ' dir='ltr'>
          <OTPInput
            value={otp}
            onChange={(otp) => {
              setError(false);
              setOtp(otp);
            }}
            numInputs={6}
            renderSeparator={<span className='mx-1' />}
            renderInput={(props: any) => (
              <input
                {...props}
                className={`bg-white !h-[50px] !w-[50px]  !rounded-md  !border-[1px] !border-solid ${
                  error
                    ? "!border-THEME_ERROR_COLOR"
                    : "!border-[#0000001f] focus:bg-[#88735026] focus:outline-none"
                }`}
              />
            )}
          />
        </div>
        {error && typeof error == "string" ? (
          <p className='text-THEME_ERROR_COLOR text-sm  mt-4 text-center'>
            {error}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className='flex justify-center flex-col gap-0 items-center '>
        <p className='text-sm  text-[#00000099]  text-center '>
          {i18n?.translate("Code_Not_Received")}
        </p>
        {resendTime && resendTime > 0 ? (
          <p className='text-sm  text-[#00000099]  text-center '>
            {i18n?.translate("Please_Wait")}{" "}
            <span className='text-sm text-THEME_PRIMARY_COLOR font-semibold'>
              {`${
                resendTime > 60
                  ? `${Math.floor(resendTime / 60)}:${
                      resendTime % 60 < 10
                        ? `0${resendTime % 60}`
                        : resendTime % 60
                    }`
                  : `00:${resendTime < 10 ? `0${resendTime}` : resendTime}`
              }`}
            </span>
          </p>
        ) : (
          <>
            {resendTime != null ? (
              <p
                className='text-sm text-center  text-THEME_PRIMARY_COLOR font-bold mt-3 cursor-pointer'
                onClick={resendOtp}>
                {" "}
                {i18n?.translate("Resend_Code")}
              </p>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className='flex justify-center w-full'>
        <button
          disabled={!otp && !error && !loading.verifyLoading}
          onClick={verify}
          className={`h-[55px] w-full md:w-[343px]  bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
            loading.verifyLoading ? "!opacity-45" : ""
          } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[140px] md:mt-[90px]`}>
          {loading.verifyLoading ? (
            <LoadingSpinner />
          ) : (
            i18n?.translate("Verify")
          )}
        </button>
      </div>
    </div>
  );
};
