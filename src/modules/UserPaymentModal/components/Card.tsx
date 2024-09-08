"use client";
import { getCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

export const PaymentOptionCard = ({ method }: { method: number }) => {
  const translate = useTranslations();

  const userData = getCookie("user")
    ? JSON.parse(getCookie("user") as string)
    : null;
  const locale = useLocale();
  const { title, step1, step1Number, step2, step3, icon } = useMemo(() => {
    let title = translate(
      `locale.${
        method == 1
          ? "Bank_Cash"
          : method == 2
          ? "instaPay"
          : "Electronic_Payment"
      }`
    );

    let step1 =
      method == 1
        ? translate(`locale.Payment_Method${method}`)?.split("7835550914")[0]
        : method == 2
        ? translate(`locale.Payment_Method${method}`)?.split("01222222883")[0]
        : null;
    let step1Number = method == 1 ? "7835550914" : "01222222883";
    let step2 = translate(`locale.Payment_Method${method}`)
      ?.split(step1Number)[1]
      ?.replace(locale == "ar" ? "،" : ",", "")
      .substring(
        0,
        translate(`locale.Payment_Method${method}`)
          ?.split(step1Number)[1]
          ?.replace(locale == "ar" ? "،" : ",", "")
          .lastIndexOf(locale == "ar" ? "،" : ",")
      );
    let step3 = translate(`locale.Payment_Method${method}`)
      ?.split(step1Number)[1]
      ?.replace(locale == "ar" ? "،" : ",", "")
      .substring(
        translate(`locale.Payment_Method${method}`)
          ?.split(step1Number)[1]
          ?.replace(locale == "ar" ? "،" : ",", "")
          .lastIndexOf(locale == "ar" ? "،" : ",")
      )
      .replace(locale == "ar" ? "،" : ",", "");
    let icon =
      method == 1
        ? "bankTransfer.svg"
        : method == 2
        ? "instapay2.webp"
        : "credit.svg";
    return {
      step1,
      step1Number,
      step2,
      step3,
      icon,
      title,
    };
  }, [method]);

  return (
    <div className='flex-1 rounded-md px-6 py-7 border-[1px] border-THEME_PRIMARY_COLOR relative'>
      <hr className='border-2 border-[#3F598A] w-full absolute top-0 rounded-t-md left-0' />
      <p className='text-THEME_PRIMARY_COLOR text-base md:text-xl font-semibold mb-3 h-auto md:h-[60px]'>
        {title}
      </p>
      <div className='flex flex-row gap-2 items-start'>
        <img src='/assets/success.svg' width={"24px"} height={"24px"} />
        <div className={`flex flex-col gap-[3px] `}>
          <p
            className={`text-sm md:text-base text-[#5A7184] ${method == 3 ? "" : "h-auto md:h-12"}`}>
            {method == 3 ? translate(`locale.Payment_Method3`) : step1}
          </p>
          <>
            {method == 3 ? null : (
              <>
                <p className=' flex flex-row gap-2 text-lg text-end text-THEME_PRIMARY_COLOR font-semibold justify-end'>
                  {step1Number}
                  <img
                    src='/assets/copyPrimary.svg'
                    width={"18px"}
                    height={"18px"}
                  />
                </p>
                <p className='text-sm md:text-base text-[#5A7184] mt-[9px]'>{step2}</p>
                {userData ? (
                  <p className=' flex flex-row gap-2 text-lg text-end text-THEME_PRIMARY_COLOR font-semibold justify-end mt-[3px]'>
                    {userData?.mobile?.primary?.number?.replace("+2", "")}
                    <img
                      src='/assets/copyPrimary.svg'
                      width={"18px"}
                      height={"18px"}
                    />
                  </p>
                ) : (
                  ""
                )}
              </>
            )}
            <div
              className={`flex flex-row  mt-[9px] items-center ${
                method != 3 ? "h-20" : ""
              }`}>
              {method == 3 ? null : (
                <p className='text-sm md:text-base text-[#5A7184] w-[85%]'>{step3}</p>
              )}
              <div
                className={`${method == 3 ? "w-full " : ""}flex justify-end`}>
                <img
                  src={`/assets/${icon}`}
                  className={
                    method == 2 ? `!w-20 !h-20` : `!w-[43px] !h-[49px]`
                  }
                />
              </div>
            </div>
          </>
        </div>
      </div>
      {method == 3 ? (
        <div className='flex justify-center w-full'>
          <button className=' mt-5 rtl:mt-[30px] rtl:md:mt-[43px]  w-[181px] text-base text-white  h-12 items-center bg-THEME_PRIMARY_COLOR rounded-lg justify-center flex flex-row gap-6'>
            {translate("locale.PayNow")}
            <img
              src='/assets/leftWhite.svg'
              className='hidden md:flex ltr:rotate-180'
              width={"13px"}
              height={"16px"}
            />
          </button>
        </div>
      ) : null}
      {method != 3 ? (
        <hr className='border-[0.5px] mt-2.5  border-[#E5EAF4]' />
      ) : (
        ""
      )}
    </div>
  );
};
