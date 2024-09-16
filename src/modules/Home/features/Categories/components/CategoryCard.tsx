import { Category } from "@/src/types";
import { useTranslations } from "next-intl";

export const CategoryCard = ({
  category,
}: {
  category: Category;
}) => {
  const translate = useTranslations();

  return (
    <div className='border-[1px] border-solid border-[#E5EAF4] w-full md:flex-1 rtl:px-10 ltr:px-5 pt-12 pb-6 rounded-2xl flex flex-col gap-[35px]'>
      <img
        src={`/assets/cat${category.category.replace("category", "")}.svg`}
        className='!w-[181px] !h-[36px]'
      />
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-bold tracking-tight text-THEME_PRIMARY_COLOR rtl:h-8 ltr:h-16'>
          {category.categoryName}
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {translate("locale.Booking_Amount")}{" "}:{" "}
          <span className='font-semibold'>
            {Number(category.bookingAmount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {translate("locale.Contracting_Amount")}{" "}:{" "}
          <span className='font-semibold'>
            {Number(category.contractingAmount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>

        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {translate("locale.Installments")}{" "}:
          <span className='font-semibold tracking-tight text-THEME_PRIMARY_COLOR'>
            {` ${category.installments.count} ${translate(
              "locale.Installments"
            )} ${translate("locale.every")} ${
              category.installments.spanInMonths
            } ${translate("locale.Months")}`}
          </span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {translate("locale.Installment_Amount")}{" "}:{" "}
          <span className='font-semibold'>
            {Number(category.installments.amount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
        <p className='text-lg text-THEME_SECONDARY_COLOR'>
          {translate("locale.Cash_Discount")}{" "}:{" "}
          <span className='font-semibold'>
            {Number(
              category.grossAmount - category.cashAmount
            ).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
      </div>
    </div>
  );
};
