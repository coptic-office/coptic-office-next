"use client";;
import { getPaymentsOptions } from "@/src/network/payments";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const PaymentModal = ({ closeModal }: { closeModal(): void }) => {
  const translate = useTranslations();
    const [activeTab, setActiveTab] = useState(0);
    const [options, setOptions] = useState([]);
  const locale = useLocale();
  const changeActiveTab = (index: number) => {
    setActiveTab(index);
  };
  const disabledStyle = `cursor-pointer  text-center  py-3 text-base inline-block border-[1px]  flex-1 border-gray-200 border-b-2 rounded-md hover:bg-gray-300 hover:border-gray-200 text-[#555F71]`;
  const activeStyle = `cursor-pointer text-center inline-block py-3 text-base border-b-2 bg-[#005fb057] font-semibold  flex-1 text-THEME_PRIMARY_COLOR border-THEME_PRIMARY_COLOR rounded-t-md active   `;

  const getAllOptions = () => {
      getPaymentsOptions(locale).then((response) => {
        setOptions(response.data.message?.paymentOptions);
    });
  };
  useEffect(() => {}, []);
  return (
    <div className=' min-w-[575px] '>
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
      <div className='bg-white rounded-b-[4px]'>
        <div className='flex flex-col items-center mb-6  px-3  md:px-12'>
          <p className='text-center text-THEME_PRIMARY_COLOR text-xl md:text-[36px] font-semibold  pt-3 pb-2'>
            {translate("locale.Electronic_Payment")}
          </p>
          <p className='text-[#74777F] text-lg'>
            {translate("locale.Payment_Options")}
          </p>
        </div>
        <ul className='flex flex-wrap   w-full px-[2px] '>
          <li
            onClick={() => changeActiveTab(0)}
            className={
              activeTab == 0 ? activeStyle : `${disabledStyle}  rounded-ee-none`
            }>
            <p>{translate("locale.New_Booking")}</p>
          </li>
          <li
            className={`  ${
              activeTab == 1 ? activeStyle : `${disabledStyle} rounded-es-none `
            }`}
            onClick={() => changeActiveTab(1)}>
            <p>{translate("locale.Existing_Booking")}</p>
          </li>
        </ul>
        <div className='p-10'></div>
      </div>
    </div>
  );
};
