import { useTranslations } from "next-intl";
import { useState } from "react";
import { ReservationStep } from "./components/ReservationStep";

export default function Steps({ lang }: { lang: string }) {
  const translate = useTranslations();

  return (
    <div className='w-full flex flex-col gap-[44px] md:gap-[69px] items-center mb-[28px]'>
      <div className='w-full flex flex-col md:flex-row gap-[367px] md:gap-[55px] justify-between items-start'>
        <div className='flex flex-1 mt-[31px] md:mt-[38px] justify-end relative px-4 md:px-0'>
          <img
            src='assets/steps/main.png'
            className='rounded-lg z-50 object-cover h-[328px] ms-[30px] md:ms-0  md:h-[560px] w-[268px] md:w-[457px]'
          />
          <img
            src='assets/steps/Base.png'
            className='rounded-lg absolute  start-4 md:start-0 ltr:rotate-180 ltr:-top-[42px] rtl:top-[29px] md:rtl:top-[49px] md:ltr:top-[49px] z-40 object-cover w-[239px] md:w-[337px] h-[217px] md-h[300px]'
          />
          <img
            src='assets/steps/main2.png'
            className='rounded-lg absolute start-4 md:start-0 top-[290px] md:top-[445px] z-[55] border-[2px] border-solid border-white bg-white object-none    w-[163px] md:w-[276px] h-[199px] md:h-[339px]  '
          />

          <img
            src='assets/steps/base2.png'
            className=' absolute -bottom-[263px] md:-bottom-[373px]  -end-[52px] md:end-[10px] ltr:end-[77px] ltr:md:end-[111px] w-[239px] md:w-[337px] h-[217px] md-h[300px] '
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
      <button className='flex flex-row gap px-6 py-3 rtl:ps-[39px]   cursor-pointer justify-between min-w-[181px] ltr:min-w-[194px] rounded-lg items-center border-[1px] border-THEME_PRIMARY_COLOR '>
        <p className='text-THEME_PRIMARY_COLOR text-base font-bold'>
          {translate("locale.Unit_Booking")}
        </p>
        <img
          src='/assets/left.svg'
          className='ltr:rotate-180'
          width={"13px"}
          height={"16px"}
        />
      </button>
    </div>
  );
}
