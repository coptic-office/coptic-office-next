import { updateEmail, updateMobile } from "@/src/network/auth";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../auth/components/loading";
import { OtpStep } from "./otp";
import { ChangePassword } from "./changePassword";

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
  refreshData: (callback: VoidFunction) => void;
}) => {
  const translate = useTranslations();
  const [disabled, setDisabled] = useState(true);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEdited, setIsEdited] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
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
    updateMobile(currentValue?.replace("+2", ""), locale)
      .then((response) => {
        setLoading(false);
        setOpenOtp({
          open: true,
          success: null,
          resend: response.data.message.otpResend,
        });
        (document.getElementById("body") as any).style.overflow = "hidden";
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
        (document.getElementById("body") as any).style.overflow = "hidden";
        setDisabled(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  };
  return (
    <div
      className={`flex flex-col gap-2 flex-1 ${
        isPassword ? "pe-0 md:pe-2.5" : ""
      }`}>
      <div className={`w-full flex flex-row items-center justify-between `}>
        <p className='text-[#555F71] text-sm ms-1'>
          {translate(`locale.${label}`)}
        </p>
      </div>
      <div className='w-full flex flex-row gap-2 items-center'>
        <input
          id={label}
          autoComplete='new-password' // Trick to stop suggestions
          disabled={loading || disabled || isPassword}
          dir={isRtl ? "ltr" : ""}
          type={isPassword ? "password" : "search"}
          placeholder={
            label == "Email"
              ? disabled
                ? translate("locale.Add_Email")
                : ""
              : ""
          }
          className={`w-full p-0 md:p-3 
          
          ${
            isRtl ? `${locale == "en" ? "text-start" : "text-end"}` : ""
          } rounded-lg border-[1px] bg-transparent ps-3 border-[#E3E7EA] h-[50px]  text-black disabled:text-[#555F71] focus:outline-none ${
            disabled ? "text-gray-700 " : "placeholder:text-black"
          }`}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        {!disabled ? (
          <>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <p
                className={`cursor-pointer text-base text-THEME_PRIMARY_COLOR `}
                onClick={() => {
                  if (label == "Email") onChangeEmail();
                  else onChangeMobile();
                }}>
                {translate("locale.Save")}
              </p>
            )}
          </>
        ) : (
          <img
            src='/assets/edit.png'
            onClick={() => {
              if (!isPassword) {
                setDisabled(false);
                setTimeout(() => {
                  document.getElementById(label)?.focus();
                }, 500);
              } else {
                (document.getElementById("body") as any).style.overflow =
                  "hidden";
                setIsPasswordOpen(true);
              }
            }}
            className='cursor-pointer w-5 h-5  '
          />
        )}
      </div>
      {error ? (
        <p className='text-THEME_ERROR_COLOR text-sm '>{error}</p>
      ) : null}

      {openOtp.open ? (
        <div
          className={`fixed items-center  top-0 pt-0   left-0 min-w-full  overflow-hidden flex justify-center  min-h-[100vh] bg-[#00000073]  z-[300] px-0 md:px-[150px] `}>
          <div className=' p-0 md:p-4   h-full md:max-w-2xl md:h-auto w-[90%]  md:w-[620px] rounded-lg  flex flex-col gap-3 justify-center items-center'>
            <div className='bg-white pb-2 rounded-lg md:rounded-lg shadow   w-full h-full md:max-w-2xl md:max-h-full  pt-0  md:p-0 '>
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
                          resend: "",
                          success: null,
                        });
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                      });
                    }}
                    className={`h-[55px] w-full md:w-[343px]  bg-THEME_PRIMARY_COLOR disabled:opacity-45  rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[25px] mb-4 md:mt-[60px]`}>
                    {translate("locale.ok")}
                  </button>
                </div>
              ) : (
                <>
                  <div className='border-b-[1px] h-12 rounded-t-lg bg-THEME_PRIMARY_COLOR border-solid border-[#0000001f] relative  block py-2 md:py-4'>
                    <p className='text-base text-white rounded-t-lg font-semibold rtl:font-medium text-center '>
                      {label == "Email"
                        ? translate("locale.Email_Update")
                        : translate("locale.Mobile_Update")}
                    </p>
                    <img
                      src={"/assets/close.png"}
                      width={20}
                      height={20}
                      className='absolute top-4 start-6 cursor-pointer'
                      onClick={() => {
                        setDisabled(false);
                        setOpenOtp({
                          success: null,
                          open: false,
                          resend: "",
                        });
                        (
                          document.getElementById("body") as any
                        ).style.overflow = "scroll";
                        setTimeout(() => {
                          document.getElementById(label)?.focus();
                        }, 500);
                      }}
                    />
                  </div>
                  <OtpStep
                    setResend={(value) => {
                      setOpenOtp({ ...openOtp, resend: value });
                    }}
                    setOpenOtp={setOpenOtp}
                    isEmail={label == "Email"}
                    resend={openOtp?.resend}
                    mobileNumber={currentValue}
                    onClose={() => {
                      setDisabled(false);
                      setOpenOtp({
                        success: null,
                        open: false,
                        resend: "",
                      });
                      (document.getElementById("body") as any).style.overflow =
                        "scroll";
                      setTimeout(() => {
                        document.getElementById(label)?.focus();
                      }, 500);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {isPasswordOpen ? (
        <div
          className={`fixed items-center top-0 pt-0   left-0 min-w-full  overflow-hidden flex justify-center  min-h-[100vh] bg-[#00000073]  z-[300] px-0 md:px-[150px] `}>
          <div className=' p-0 md:p-4   w-full h-full md:max-w-2xl md:h-auto md:w-[620px] rounded-lg mx-4 md:mx-0 flex flex-col gap-3 justify-center items-center'>
            <div className='bg-white pb-2 rounded-lg md:rounded-lg shadow   w-full h-full md:max-w-2xl md:max-h-full pt-0  md:p-0 '>
              <div className='border-b-[1px] flex items-center justify-center h-12 rounded-t-lg bg-THEME_PRIMARY_COLOR border-solid border-[#0000001f] relative  '>
                <p className='text-base text-white rounded-t-lg font-semibold rtl:font-medium text-center '>
                  {translate("locale.Password_Update")}
                </p>
                <img
                  src={"/assets/close.png"}
                  width={20}
                  height={20}
                  className='absolute top-4 start-6 cursor-pointer'
                  onClick={() => {
                    setIsPasswordOpen(false);
                    (document.getElementById("body") as any).style.overflow =
                      "scroll";
                  }}
                />
              </div>
              <ChangePassword
                refreshData={refreshData}
                closeModal={() => {
                  setIsPasswordOpen(false);
                  (document.getElementById("body") as any).style.overflow =
                    "scroll";
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
