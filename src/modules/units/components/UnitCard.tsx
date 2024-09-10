"use client";
import { Modal } from "@/src/components/Modal";
import { Unit } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";

export default function UnitCard({ item }: { item: Unit }) {
  const translate = useTranslations();
  const local = useLocale();
  return (
    <>
      <div className='border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-4 md:px-6 md:pe-5  w-full md:w-[49%]  '>
        <div className='flex flex-row justify-between items-start'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#048951]  text-sm md:text-lg font-semibold'>
              {item.category}
            </p>
            <p className='text-[#555F71]  text-sm md:text-lg flex flex-row items-center ltr:gap-6 rtl:gap-2.5 '>
              {translate("locale.Unit_Number")}{" "}
              <span className='text-THEME_PRIMARY_COLOR'>
                {item.unitNumber}
              </span>
            </p>
          </div>
          {item.category?.includes("لم يتحدد") ||
          item.category?.toLowerCase()?.includes("not selected") ? (
            <img src='/assets/edit2.svg' />
          ) : (
            <img
              src='/assets/categoriesType.png'
              className='!w-[82px] !h-[16px] md:!w-[181px] md:!h-[36px]'
            />
          )}
        </div>
        <p className='mt-1 text-[#555F71] text-sm md:text-lg flex flex-row items-center rtl:gap-[21px] ltr:gap-2.5 '>
          {translate("locale.Booking_Code")}{" "}
          <span className='text-THEME_PRIMARY_COLOR' dir='ltr'>
            {item.id}
          </span>
        </p>
        <hr className='border-[0.5px]  my-2.5 md:my-5 md:block border-[#E5EAF4] w-full ' />

        <div className='flex flex-row gap-[55px] rtl:gap-6 '>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Book_Date")}
              </p>

              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {new Date(item.bookingDate)
                  ?.toLocaleDateString("en", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Contract_Date")}
              </p>
              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {item.contractDate
                  ? new Date(item.contractDate)
                      ?.toLocaleDateString("en", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      ?.replaceAll("/", "-")
                  : translate("locale.No_Date")}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Total_Value_of_Payments")}
              </p>
              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {Number(item.totalCashAmount).toLocaleString()}{" "}
                {translate("locale.Pound")}
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Contracting_Date")}
              </p>

              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {new Date(item.contractingDate)
                  ?.toLocaleDateString("en", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })
                  ?.replaceAll("/", "-")}
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Total_Unit_Value")}
              </p>
              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {item.totalAmount.toLocaleString()} {translate("locale.Pound")}
              </p>
            </div>

            <div className='flex flex-col gap-1'>
              <p className=' text-xs md:text-base  text-[#555F71]'>
                {translate("locale.Total_Value_of_Checks")}
              </p>
              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                {item.totalChecksAmount.toLocaleString()}{" "}
                {translate("locale.Pound")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal>
        <div className='bg-white min-h-[300px] min-w-[300px]'></div>
      </Modal>
    </>
  );
}
