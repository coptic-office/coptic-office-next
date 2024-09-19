"use client";
import { useAppContext } from "@/src/context";
import { useTranslations } from "next-intl";

export default function Failed({ lang }: { lang: string }) {
  const translate = useTranslations();
      const { setCurrentModal } = useAppContext();

  return (
    <div className='z-10  flex-col gap-[60px] items-center justify-center  text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
      <div className='w-full px-4 md:px-0'>
        <div className='w-full px-4 md:px-[70px] py-6 pb-10 md:py-10 bg-white flex flex-col gap-10 rounded-2xl -mt-[130px] md:-mt-[230px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[45px] md:mb-[14px]'>
          <div className='p-4  flex flex-col gap-3 items-center'>
            <img
              src='/assets/fail.jpg'
              className='w-[150px] md:w-[210px] h-[100px] md:h-[145px]'
            />
            <p className='text-base text-center text-black'>
              {translate("locale.Failed_Payment")}
            </p>
            <div className='gap-4 w-full justify-center mt-4 flex flex-col md:flex-row items-center'>
              <button
                onClick={() => {
                  setCurrentModal("payment_payNow");
                }}
                className={`h-[55px] w-full  max-w-[250px]   bg-THEME_PRIMARY_COLOR disabled:opacity-45 rounded-lg flex justify-center items-center  text-white font-medium text-base `}>
                {translate("locale.retry")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
