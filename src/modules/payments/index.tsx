"use client";
import { useTranslations } from "next-intl";
export default function MyPayments({ lang }: { lang: string }) {
  const translate = useTranslations();

  return (
    <div className='z-10  flex-col gap-[60px] items-center justify-center font-mono text-sm lg:flex w-full px-[150px]  bg-transparent'>
      <div className='w-full px-[34px] py-[18px] min-h-[399px] bg-white flex flex-col rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px]'>
        <p className='text-[#183B56] text-2xl font-bold mb-[52px]'>
          {translate("locale.My_Payments")}
        </p>
        <div className='flex flex-col justify-center items-center gap-[55px] w-full'>
          <img src='/assets/emptyPayment.png' width={"100px"} height={"80px"} />
          <p className='text-[26px] font-semibold text-[#555F71]'>
            {translate("locale.noPayments")}
          </p>
        </div>
      </div>
    </div>
  );
}
