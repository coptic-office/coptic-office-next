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
  const { title, step1, numbers, step2, icon } = useMemo(() => {
    let title = translate(
      `locale.${
        method == 1
          ? "Payment_Method1_Title"
          : method == 2
          ? "Payment_Method2_Title"
          : "Payment_Method3_Title"
      }`
    );
    let step1 =
      method == 1
        ? translate(`locale.Payment_Method1_Text1`)
        : method == 2
        ? translate(`locale.Payment_Method1_Text2`)
        : null;
    let numbers = [];
    if (method == 1)
      [1, 2, 3].map((item) => {
        numbers.push(
          <div className='flex flex-col gap-1'>
            <p className=' text-base  text-THEME_PRIMARY_COLOR '>
              {translate(`locale.Payment_Method1_Text1_Currency${item}`)} :
            </p>
            <p className=' flex flex-row gap-2 text-base text-end text-THEME_PRIMARY_COLOR font-semibold justify-end'>
              {translate(`locale.Payment_Method1_Text1_Account${item}`)}
              <img
                src='/assets/copyPrimary.svg'
                width={"16px"}
                height={"16px"}
              />
            </p>
          </div>
        );
      });
    if (method == 2) {
      numbers.push(
        <p className=' flex flex-row gap-2 text-lg text-end mt-0 md:mt-3 text-THEME_PRIMARY_COLOR font-semibold justify-end'>
          {translate("locale.Payment_Method2_Text1_Account")}
          <img src='/assets/copyPrimary.svg' width={"18px"} height={"18px"} />
        </p>
      );
    }

    let step2 =
      method == 3 ? null : translate(`locale.Payment_Method${method}_Text2`);
    let icon =
      method == 1
        ? "bankTransfer.svg"
        : method == 2
        ? "instapay2.webp"
        : "credit.svg";
    return {
      step1,
      numbers,
      step2,
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
            className={`text-sm  md:text-base text-[#5A7184]  ${
              method == 3 ? "" : "h-auto "
            }`}>
            {method == 3 ? translate(`locale.Payment_Method3`) : step1}
          </p>
          <>
            {method == 3 ? null : <>{numbers.map((item) => item)}</>}
            <div
              className={`flex flex-row items-end gap-1  mt-[9px] ${
                method == 2 ? "md:mt-[82px]" : method == 3 ? "justify-end" : ""
              }`}>
              <p className='text-sm md:text-base text-[#5A7184]'>{step2}</p>
              <img
                src={`/assets/${icon}`}
                className={method == 2 ? `!w-20 !h-20` : `!w-[43px] !h-[49px]`}
              />
            </div>
          </>
        </div>
      </div>
      <div>
        {method == 3 ? (
          <div className='flex justify-center w-full mt-0 md:mt-[72px] '>
            <button className=' mt-5 rtl:mt-[30px] rtl:md:mt-[30px]  w-[181px] text-base text-white  h-12 items-center bg-THEME_PRIMARY_COLOR rounded-lg justify-center flex flex-row gap-1'>
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
    </div>
  );
};
