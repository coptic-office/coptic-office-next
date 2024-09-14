import { bankChecks } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function BankCard({ payment }: { payment: bankChecks }) {
  const translate = useTranslations();
  const local = useLocale();
  const router=useRouter()
  return (
    <>
      <div className='border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-3 md:px-6 md:pe-[20px]  w-full md:w-[49%]  '>
        <div className='flex pb-4 flex-row  gap-6   justify-between items-center border-b-[1px] border-[#D8D8D8] border-solid'>
          <p className='text-THEME_PRIMARY_COLOR text-sm md:text-lg font-semibold flex flex-col md:flex-row gap-1  w-[46%] md:w-[50%]'>
            {translate("locale.Amount")}{" "}
            <span>
              {Number(payment.amount).toLocaleString()}{" "}
              {translate("locale.Pound")}
            </span>
          </p>
          <div className='flex flex-row gap-3 items-start tracking-tighter  w-[55%] md:w-[50%] '>
            <img
              src={"/assets/bank.svg"}
              className='w-[29px]  h-[24px] md:w-[41px] md:h-[41px]'
            />
            <div className='flex flex-col gap-1 text-[#048951]   text-sm md:text-[17px]'>
              {payment.bankName}
            </div>
          </div>
        </div>
        <div className='flex mt-6 flex-row flex-wrap gap-y-8 justify-between'>
          <div className='flex flex-col gap-1 w-[52%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Check_Number")}</p>
            <p className='font-semibold'>{payment.number}</p>
          </div>
          <div className='flex flex-col gap-1 w-[48%]  text-[#555F71]  text-sm md:text-lg'>
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
          <div className='flex flex-col gap-1 w-[52%]  text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Due_Date")}</p>
            <p className='font-semibold flex flex-row gap-1 items-center'>
              {new Date(payment.dueDate)
                ?.toLocaleDateString(local == "ar" ? "ar-AE" : "en", {
                  month: "2-digit",
                  year: "numeric",
                  day: "numeric",
                })
                ?.replaceAll("/", "-")}
            </p>
          </div>
          <div className='flex flex-col gap-1 w-[48%] text-[#555F71]  text-sm md:text-lg'>
            <p>{translate("locale.Booking_Code")}</p>
            <p
              onClick={() => {
                router.push(`/${local}/units`);
              }}
              className='cursor-pointer hover:text-THEME_PRIMARY_COLOR font-semibold rtl:text-end'
              dir='ltr'>
              {payment.unitId}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
