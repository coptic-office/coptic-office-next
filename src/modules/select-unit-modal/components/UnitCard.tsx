import { myUnit } from "@/src/types";
import { useTranslations } from "next-intl";
import { RadioButton } from "../../user-payment-modal/components/RadioButton";

export const SelectUnitCard = ({
  unit,
  isSelected,
  onSelect,
}: {
  unit: myUnit;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const translate = useTranslations();

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer border-[1px] border-solid border-[#E5EAF4] w-full md:flex-1 rtl:px-6 ltr:px-6 pt-6 pb-6 rounded-2xl flex flex-col gap-[35px] ${
        isSelected ? "bg-THEME_PRIMARY_COLOR" : "bg-white"
      }`}>
      <div
        onClick={onSelect}
        className={`w-7 h-7 absolute end-6 top-6 rounded-[20px] flex flex-row justify-center items-center border-[2px] ${
          isSelected ? " border-white" : " border-[#D1DAE6]"
        }  `}>
        {isSelected ? <p className='w-5 h-5  rounded-[20px] bg-white'></p> : ""}
      </div>

      <img
        src={`/assets/cat${unit.category.replace("category", "")}${
          isSelected ? "_inverted" : ""
        }.svg`}
        className='!w-[181px] !h-[36px] mt-5'
      />
      <div className='flex flex-col gap-2'>
        <p
          className={`text-xl font-bold tracking-tight ${
            isSelected ? "text-white" : "text-THEME_PRIMARY_COLOR"
          } rtl:h-8 ltr:h-16`}>
          {unit.categoryName}
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {translate("locale.Booking_Amount")} :{" "}
          <span className='font-semibold'>
            {Number(unit.bookingAmount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {translate("locale.Contracting_Amount")} :{" "}
          <span className='font-semibold'>
            {Number(unit.contractingAmount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>

        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {translate("locale.Installments")} :{" "}
          <span className='font-semibold tracking-tight'>
            {`${unit.installments.count} ${translate(
              "locale.Installments"
            )} ${translate("locale.every")} ${
              unit.installments.spanInMonths
            } ${translate("locale.Months")}`}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {translate("locale.Installment_Amount")} :{" "}
          <span className='font-semibold'>
            {Number(unit.installments.amount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
        <p
          className={`text-lg ${
            isSelected ? "text-white" : "text-THEME_SECONDARY_COLOR"
          }`}>
          {translate("locale.Cash_Discount")} :{" "}
          <span className='font-semibold'>
            {Number(unit.grossAmount - unit.cashAmount).toLocaleString()}{" "}
            {translate("locale.Pound")}
          </span>
        </p>
      </div>
    </div>
  );
};
