"use client";
import { useTranslation } from "@/app/i18n";
import { useState } from "react";
export default function MyPayments({ lang }: { lang: string }) {
  const [i18n, setI18n] = useState<any>(null);
  useTranslation(lang).then((value) => {
    setI18n(value);
  });

  return (
    <div className='z-10  flex-col gap-[60px] items-center justify-center font-mono text-sm lg:flex w-full px-[150px]  bg-transparent'>
      <div className='w-full px-[34px] py-[18px] min-h-[399px] bg-white flex flex-col rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px]'>
        <p className='text-[#183B56] text-2xl font-bold mb-[52px]'>
          {i18n?.translate("My_Payments")}
        </p>
        <div className='flex flex-col justify-center items-center gap-[55px] w-full'>
          <img src='/assets/emptyPayment.png' width={"100px"} height={"80px"} />
          <p className='text-[26px] font-semibold text-[#555F71]'>
            {i18n?.translate("noPayments")}
          </p>
        </div>
      </div>
    </div>
  );
}
