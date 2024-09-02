import { Category } from "@/app/[lang]/types";
import { useTranslation } from "@/app/i18n";
import { useState } from "react";

export const CategoryCard = ({
  lang,
  category,
}: {
  lang: string;
  category: Category;
}) => {
  const [i18n, setI18n] = useState<any>(null);
  useTranslation(lang).then((value) => {
    setI18n(value);
  });
  return (
    <div className='border-[1px] border-solid border-[#E5EAF4] flex-1 rtl:px-10 ltr:px-5 pt-12 pb-6 rounded-2xl flex flex-col gap-[34px]'>
      <img src='/assets/categories.png' width={"64px"} height={"64px"} />
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-bold tracking-tight text-THEME_PRIMARY_COLOR rtl:h-8 ltr:h-16'>
          {category.categoryName}
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {i18n?.translate("Booking_Amount")}:
          <span className='font-semibold'>{category.bookingAmount}</span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {i18n?.translate("Contracting_Amount")}:
          <span className='font-semibold'>{category.contractingAmount}</span>
        </p>

        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {i18n?.translate("Installments")}:
          <span className='font-semibold tracking-tight'>
            {i18n
              ?.translate?.("InstallmentPlan")
              ?.replace("{}", category.installments.count)
              ?.replace("{}", category.installments.spanInMonths)}
          </span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {i18n?.translate("Installment_Amount")}:
          <span className='font-semibold'>{category.installments.amount}</span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {i18n?.translate("Cash_Discount")}:
          <span className='font-semibold'>
            {category.grossAmount - category.cashAmount}
          </span>
        </p>
      </div>
    </div>
  );
};
