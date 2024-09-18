"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export const InfoModal = ({
  closeModal,
  label,
}: {
  closeModal(): void;
  label: string;
}) => {
  const translate = useTranslations();

  return (
    <div
      id='InfoModal'
      className=' w-[270px] md:w-[370px] bg-white    rounded-t-[4px]'>
      <div className='h-[45px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold rtl:font-medium text-white text-base md:text-xl '></p>

        <img
          src='/assets/close.png'
          onClick={closeModal}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='p-6 pb-3'>
        <p className='text -text-black text-center'>{label}</p>
        <button
          onClick={closeModal}
          className={`h-[55px] w-full  mb-3  bg-THEME_PRIMARY_COLOR disabled:opacity-45
           rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[40px] md:mt-[90px]`}>
          {translate("locale.ok")}
        </button>
      </div>
    </div>
  );
};
