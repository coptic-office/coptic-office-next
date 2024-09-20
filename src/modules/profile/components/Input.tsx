import { updateEmail, updateMobile } from "@/src/network/auth";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../auth/components/loading";
import { OtpStep } from "./otp";

export const Input = ({
  label,
  value = "",
  isPassword,
  isRtl,
  refreshData,
}: {
  label: string;
  value: string;
  isPassword?: boolean;
  isRtl?: boolean;
  refreshData: (callback:VoidFunction) => void;
}) => {
  const translate = useTranslations();
  const [disabled, setDisabled] = useState(true);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEdited, setIsEdited] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openOtp, setOpenOtp] = useState<{
    open: boolean;
    resend: string;
    success: null | string;
  }>({
    open: false,
    resend: "",
    success: null,
  });
  const locale = useLocale();
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  useEffect(() => {
    if (value != currentValue) setIsEdited(true);
  }, [currentValue]);
  const onChangeMobile = () => {
    setLoading(true);
    setError(null);
    updateMobile(currentValue, locale)
      .then((response) => {
        setLoading(false);
        setOpenOtp({
          open: true,
          success: null,
          resend: response.data.message.otpResend,
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  };
  const onChangeEmail = () => {
    setLoading(true);
    setError(null);
    updateEmail(currentValue, locale)
      .then((response) => {
        setLoading(false);
        setOpenOtp({
          open: true,
          success: null,
          resend: response.data.message.otpResend,
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  };
  return (
    <div className={`flex flex-col gap-2 flex-1 ${isPassword ? "pe-2.5" : ""}`}>
      <div className={`w-full flex flex-row items-center justify-between `}>
        <p className='text-[#555F71] text-sm ms-1'>
          {translate(`locale.${label}`)}
        </p>
        <button
          disabled={loading}
          onClick={() => {
            if (isEdited) {
              if (label == "Email") onChangeEmail();
              else onChangeMobile();
            } else document.getElementById(label)?.focus();
          }}
          className='h-8 w-[90px] flex items-center justify-center rounded-md text-center text-white bg-THEME_PRIMARY_COLOR'>
          {isEdited ? (
            loading ? (
              <LoadingSpinner />
            ) : (
              translate("locale.Save")
            )
          ) : (
            translate("locale.Edit")
          )}
        </button>
      </div>
      <input
        id={label}
        autoComplete='new-password' // Trick to stop suggestions
        disabled={loading}
        dir={isRtl ? "ltr" : ""}
        type={isPassword ? "password" : "search"}
        placeholder={
          label == "Email"
            ? disabled
              ? translate("locale.Add_Email")
              : translate("locale.No_Email")
            : ""
        }
        className={`p-3 ${
          isRtl ? " text-end" : ""
        } rounded-lg border-[1px] bg-transparent ps-3 border-[#E3E7EA] h-[50px]  text-black disabled:text-[#555F71] focus:outline-none ${
          disabled ? "" : "placeholder:text-black"
        }`}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      {error ? (
        <p className='text-THEME_ERROR_COLOR text-sm '>{error}</p>
      ) : null}

      {openOtp.open ? (
        <div
          className={`fixed items-center top-0 pt-0   left-0 min-w-full  overflow-hidden flex justify-center  min-h-[100vh] bg-[#00000073]  z-[300] px-3 md:px-[150px] `}>
          <div className=' p-0 md:p-4   w-full h-full md:max-w-2xl md:h-auto md:w-[620px] rounded-lg  flex flex-col gap-3 justify-center items-center'>
            <div className='bg-white pb-2 rounded-none md:rounded-[18px] shadow   w-full h-full md:max-w-2xl md:max-h-full  p-4 pt-3 md:pt-0  md:p-0 '>
              {openOtp.success != null ? (
                <div className=' flex-col items-center border-solid border-[#0000001f] relative mb-4 flex py-2 md:py-4'>
                  <img
                    src='/assets/success.png'
                    width={"200px"}
                    height={"200px"}
                  />
                  <p className='text-THEME_PRIMARY_COLOR'>{openOtp.success}</p>
                  <button
                    onClick={() => {
                      refreshData(() => {
                        setOpenOtp({
                          open: false,
                          resend: '',
                          success:null
                        })
                      })

                    }}
                    className={`h-[55px] w-full md:w-[343px]  bg-THEME_PRIMARY_COLOR disabled:opacity-45  rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] mb-4 md:mt-[60px]`}>
                    {translate("locale.ok")}
                  </button>
                </div>
              ) : (
                <>
                  <div className='border-b-[1px] border-solid border-[#0000001f] relative mb-4 block py-2 md:py-4'>
                    <img
                      src={"/assets/close.png"}
                      width={24}
                      height={24}
                      className='absolute start-6 cursor-pointer'
                      onClick={() => {
                        setCurrentValue(value);
                        setOpenOtp({
                          success: null,
                          open: false,
                          resend: "",
                        });
                      }}
                    />
                    <p className='text-base text-black font-semibold rtl:font-medium text-center '>
                      {translate("locale.Verification_Code")}
                    </p>
                  </div>
                    <OtpStep
                      setResend={(value) => {
                        setOpenOtp({...openOtp,resend:value})
                      }}
                    setOpenOtp={setOpenOtp}
                    isEmail={label == "Email"}
                      resend={openOtp?.resend}
                    mobileNumber={currentValue}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
