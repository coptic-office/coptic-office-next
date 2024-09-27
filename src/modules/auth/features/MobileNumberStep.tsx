import { useTranslations } from "next-intl";
import { checkUser } from "@/src/network/auth";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../components/loading";
import { Header } from "../components/Header";
import { AUTH_STEP_ENUM, checkUserModal } from "@/src/types";
import { usePathname } from "next/navigation";

export const MobileNumber = ({
  mobileNumber,
  setMobileNumber,
  handleChangeStep,
  setCheckUserData,
}: {
  mobileNumber: string;
  setMobileNumber(mobile: string): void;
  handleChangeStep(step: AUTH_STEP_ENUM): void;
  setCheckUserData: Dispatch<SetStateAction<checkUserModal>>;
}) => {
  const [error, setError] = useState<string | boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const translate = useTranslations();
  const inputRef: any = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  const onSubmit = () => {
    setLoading(true);
    if (!mobileNumber) {
      setError(true);
      setLoading(false);
      return;
    } else {
      checkUser(mobileNumber, pathname?.includes("/ar") ? "ar" : "en")
        .then((response) => {
          setCheckUserData({
            verificationCode: "",
            isExisted: (response.data as any)?.message?.isExisted,
            otpSent: (response.data as any)?.message?.otpSent,
            otpResend: (response.data as any)?.message?.otpResend,
            mobileNumber: (response.data as any)?.message?.mobileNumber,
          });
          setLoading(false);
          handleChangeStep(
            (response.data as any)?.message?.isExisted
              ? AUTH_STEP_ENUM.CREATE_USER
              : AUTH_STEP_ENUM.CREATE_USER
          );
        })
        .catch((err) => {
          setError(
            (err?.response?.data?.message?.info ||
              err?.response?.data?.error) ??
              true
          );
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <Header description='Mobile_Number_Text' title='Mobile_Number' />
      <div
        dir='ltr'
        className='relative h-[55px] w-full  rounded-lg border-0 mb-2'>
        <div className='absolute top-[14.5px] start-0 flex items-center ps-3 md:ps-5 pointer-events-none'>
          <img
            src='/assets/egypt.png'
            className='w-6 h-6 md:w-[30px] md:h-[30px]'
          />
        </div>
        <input
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              onSubmit();
            }
          }}
          ref={inputRef}
          value={mobileNumber}
          type='tel'
          onChange={(e) => {
            setMobileNumber(e.target.value);
            if (error) setError(null);
          }}
          autoFocus={true}
          className={`block w-full p-4 ps-10 md:ps-[60px] text-base text-gray-900 ${
            error ? "border-[1px] border-THEME_ERROR_COLOR" : ""
          } rounded-lg focus:outline-none bg-gray-50`}
          placeholder='100 123 456'
        />

        {mobileNumber != "" ? (
          <div className='absolute top-[22px] md:top-[18px] end-0 flex items-center pe-3 cursor-pointer'>
            <img
              src='/assets/close.png'
              className='w-3 h-3 md:w-5 md:h-5'
              onClick={() => {
                if (error) setError(null);
                setMobileNumber("");
              }}
            />
          </div>
        ) : null}
      </div>
      {error && typeof error == "string" ? (
        <p className='text-THEME_ERROR_COLOR text-sm '>{error}</p>
      ) : (
        ""
      )}
      {!error ? (
        <p className='text-xs  text-[#00000099] text-center '>
          {translate("locale.Mobile_Number_Hint")}
        </p>
      ) : (
        ""
      )}
      <button
        disabled={!mobileNumber && !error}
        className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 ${
          loading ? "!opacity-45" : ""
        } rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[40px] md:mt-[90px]`}
        onClick={onSubmit}>
        {loading ? <LoadingSpinner /> : translate("locale.Continue")}
      </button>
    </div>
  );
};
