import { bankChecks } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";

export default function BankCard({ payment }: { payment: bankChecks }) {
  const translate = useTranslations();
  const local = useLocale();
  return (
    <>
      <div className='border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-3 md:px-6 md:pe-[20px]  w-full md:w-[49%]  '>
        <div className='flex pb-4 flex-row  gap-6 md:gap-[68px] justify-between items-center border-b-[1px] border-[#D8D8D8] border-solid'>
          <p className='text-THEME_PRIMARY_COLOR text-lg md:text-xl font-semibold'>
            {translate("locale.Amount")}{" "}
            {Number(payment.amount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </p>
          <div className='flex flex-row gap-3 items-start'>
            <img src={"/assets/credit.svg"} className='w-[51px] h-[41px]' />
            <div className='flex flex-col gap-1 text-[#048951]  text-sm md:text-lg'>
              <p>{translate("locale.Bank_Name")}</p>
              <p className='font-semibold text-base'>{payment.bankName}</p>
            </div>
          </div>
        </div>
        <div className='flex mt-6 flex-row flex-wrap gap-y-8'>
          <div className='flex flex-col gap-1 w-[50%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Check_Number")}</p>
            <p className='font-semibold'>{payment.number}</p>
          </div>
          <div className='flex flex-col gap-1 w-[50%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Check_Status")}</p>
            <p
              className={`font-semibold ${
                payment?.status == "outstanding"
                  ? "text-[#FF9500]"
                  : payment?.status == "rejected"
                  ? "text-THEME_ERROR_COLOR"
                  : "text-[#048951]"
              }`}>
              {payment.statusText}
            </p>
          </div>
          <div className='flex flex-col gap-1 w-[50%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Due_Date")}</p>
            <p className='font-semibold flex flex-row gap-1 items-center'>
              {new Date(payment.dueDate)
                ?.toLocaleTimeString(local == "ar" ? "ar-EG" : "en", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h12",
                })
                ?.replaceAll("/", "-")}
            </p>
          </div>
          <div className='flex flex-col gap-1 w-[50%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Booking_Code")}</p>
            <p className='font-semibold'>{payment.unitId}</p>
          </div>
        </div>
      </div>
    </>
  );
}
