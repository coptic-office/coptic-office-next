import { useTranslations } from "next-intl";
import { useState } from "react";
import { ReservationStep } from "./components/ReservationStep";
import { useAppContext } from "@/src/context";

export default function Steps({ lang }: { lang: string }) {
  const translate = useTranslations();
  const { isLoggedIn, setCurrentModal } = useAppContext();
  return (
    <div className='w-full flex flex-col gap-[44px] md:gap-[69px] items-center mb-[28px]'>
      <div className='w-full flex flex-col md:flex-row gap-8 md:gap-[55px]  justify-between items-start'>
        <div className='flex flex-1 mt-[31px] md:mt-[38px] w-full md:w-auto justify-center md:justify-between relative px-4 md:px-0'>
          <img
            src='/assets/stepsGroup.png'
            className='w-[320px] h-[497px]  rtl:md:w-[400px] ltr:md:w-[512px] rtl:md:h-[650px] ltr:md:h-[840px]'
          />
        </div>
        <div className='flex-1 pt-[90px] pb-[56px] px-4 md:px-[56px] max-w-[573px] bg-THEME_PRIMARY_COLOR rounded-none md:rounded-se-lg md:rounded-ee-lg mb-0 md:mb-10'>
          <p className='text-white text-[36px] md:text-[46px] text-center md:text-start font-semibold leading-[48px] font-sans mb-[49px] md:mb-20'>
            {translate("locale.Booking_Contracting_Steps")}
          </p>
          <div className='flex flex-col gap-6 md:gap-[35px]'>
            <ReservationStep
              label={translate("locale.Booking_Contracting_Step1")}
              stepNumber={1}
            />
            <ReservationStep
              label={translate("locale.Booking_Contracting_Step2")}
              stepNumber={2}
            />
            <ReservationStep
              label={translate("locale.Booking_Contracting_Step3")}
              stepNumber={3}
            />
            <ReservationStep
              label={translate("locale.Booking_Contracting_Step4")}
              stepNumber={4}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (isLoggedIn) {
            setCurrentModal?.("payment");
          } else {
            setCurrentModal?.("Auth");
          }
        }}
        className='bg-THEME_PRIMARY_COLOR md:bg-white flex flex-row gap px-6 py-3 rtl:md:ps-[39px]   cursor-pointer justify-around md:justify-between min-w-[181px] ltr:min-w-[194px] rounded-lg items-center border-[1px] border-THEME_PRIMARY_COLOR '>
        <p className='text-white md:text-THEME_PRIMARY_COLOR text-base font-semibold'>
          {translate("locale.Unit_Booking")}
        </p>
        <img
          src='/assets/left.svg'
          className='hidden md:flex ltr:rotate-180'
          width={"13px"}
          height={"16px"}
        />
      </button>
    </div>
  );
}
