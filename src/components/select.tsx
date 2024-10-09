import { useState } from "react";
import Select from "react-select";
import { useLocale, useTranslations } from "use-intl";
export const PaymentIban = () => {
  const translate = useTranslations();
  const [selectedValue, setSelectedValue] = useState({
    value: 1,
    label: translate("locale.Payment_Method1_Text1_Currency1"),
  });
  const [copied, setCopied] = useState({
    first: 0,
    second: 0,
  });
  const locale = useLocale();

  const options = [
    {
      value: 1,
      label: translate("locale.Payment_Method1_Text1_Currency1"),
    },
    {
      value: 2,
      label: translate("locale.Payment_Method1_Text1_Currency2"),
    },
    {
      value: 3,
      label: translate("locale.Payment_Method1_Text1_Currency3"),
    },
  ];
  return (
    <div className='w-full pt-2'>
      <Select
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value as any);
        }}
        isSearchable={false}
        options={options}
        className='text-black placeholder:text-black w-full'
        closeMenuOnSelect={true}
        maxMenuHeight={200}
      />
      <div className='my-2 items-end flex flex-col gap-2 mt-[10px]'>
        <p className=' flex items-center flex-row gap-2 text-base text-end text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium justify-end'>
          {`${locale == "en" ? "" : "..."}${translate(
            `locale.Payment_Method1_Text1_IBAN${selectedValue.value}`
          )?.slice(0, 22)}${locale == "en" ? "..." : ""}`}
          <img
            src={`/assets/${
              copied.first == selectedValue.value
                ? "copied.png"
                : "copyPrimary.svg"
            }`}
            className='cursor-pointer !w-4 !h-4'
            width={"16px"}
            height={"16px"}
            onClick={() => {
              setCopied({ ...copied, first: selectedValue.value });
              setTimeout(() => {
                setCopied({ ...copied, first: 0 });
              }, 2000);
              navigator.clipboard.writeText(
                translate(
                  `locale.Payment_Method1_Text1_IBAN${selectedValue.value}`
                )?.replace("IBAN: ", "")
              );
            }}
          />
        </p>
        <p className=' flex items-center flex-row gap-2 text-base text-end text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium justify-end'>
          {translate(
            `locale.Payment_Method1_Text1_Account${selectedValue.value}`
          )}
          <img
            src={`/assets/${
              copied.second == selectedValue.value
                ? "copied.png"
                : "copyPrimary.svg"
            }`}
            className='cursor-pointer !w-4 !h-4'
            width={"16px"}
            height={"16px"}
            onClick={() => {
              setCopied({ ...copied, second: selectedValue.value });
              setTimeout(() => {
                setCopied({ ...copied, second: 0 });
              }, 2000);
              navigator.clipboard.writeText(
                translate(
                  `locale.Payment_Method1_Text1_Account${selectedValue.value}`
                )
              );
            }}
          />
        </p>
      </div>
    </div>
  );
};
