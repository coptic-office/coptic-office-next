"use client";
import { PaymentOptionCard } from "@/src/modules/UserPaymentModal/components/Card";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const PaymentOptionsModal = ({
  closeModal,
  onClick,
}: {
  closeModal(): void;
  onClick: VoidFunction;
}) => {
  const translate = useTranslations();
  return (
    <div className=' min-w-full '>
      <div className='h-[56px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold text-white text-base md:text-xl '>
          {translate("locale.Unit_Booking")}
        </p>
        <img
          src='/assets/close.png'
          onClick={closeModal}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='w-full bg-white rounded-b-[4px] px-3  md:px-12  '>
        <p className='text-center text-THEME_PRIMARY_COLOR text-xl md:text-[36px] font-semibold  py-7'>
          {translate("locale.Payment_Methods")}
        </p>
        <div className=' h-[350px] overflow-scroll md:overflow-hidden md:h-auto  flex flex-col md:flex-row gap-7'>
          <PaymentOptionCard method={1} />
          <PaymentOptionCard method={2} />
          <PaymentOptionCard onClick={onClick} method={3} />
        </div>
        <div className='w-full flex justify-center'>
          {" "}
          <p className='my-6 md:my-5 text-[#74777F] text-lg w-full  md:w-1/2 text-center'>
            {translate("locale.Payment_Method_Hint")}
          </p>
        </div>
      </div>
    </div>
  );
};
