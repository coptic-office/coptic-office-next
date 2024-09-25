"use client";
import { useAppContext } from "@/src/context";
import { useTranslations } from "next-intl";

export const DiscountModal = ({
  closeModal,
  label,
}: {
  closeModal(): void;
  label: string;
}) => {
  const translate = useTranslations();
  const { setCurrentModal } = useAppContext();

  return (
    <div
      id='InfoModal'
      className=' w-[270px] md:w-[370px] bg-white    rounded-t-[4px]'>
      <div className='h-[45px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold rtl:font-medium text-white text-base md:text-xl '>
          {translate("locale.Discount_Title")}
        </p>

        <img
          src='/assets/close.png'
          onClick={closeModal}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='p-6 pb-3'>
        <p className='text -text-black text-center'>{label}</p>
        <div className='flex flex-row gap-6 mb-3 mt-[40px] md:mt-[90px]'>
          <button
            onClick={() => {
              setCurrentModal("payment");
            }}
            className={`h-10 flex-1   bg-THEME_PRIMARY_COLOR disabled:opacity-45
           rounded-lg flex justify-center items-center  text-white font-medium text-base `}>
            {translate("locale.ok")}
          </button>
          <button
            onClick={closeModal}
            className={`h-10 flex-1   bg-THEME_PRIMARY_COLOR disabled:opacity-45
           rounded-lg flex justify-center items-center  text-white font-medium text-base `}>
            {translate("locale.Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};
