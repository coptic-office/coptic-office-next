import { useTranslations } from "next-intl";

export const Input = ({
  label,
  value = "",
  setValue,
  disabled,
  placeholder,
  isPassword,
}: {
  label: string;
  value: string;
  setValue(value: string): void;
  disabled: boolean;
  placeholder?: string;
  isPassword?: boolean;
}) => {
  const translate = useTranslations();
  return (
    <div className='flex flex-col gap-2 flex-1'>
      <p className='text-[#555F71] text-sm ms-1'>
        {translate(`locale.${label}`)}
      </p>
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        className={`rounded-lg border-[1px] bg-transparent ps-3 border-[#E3E7EA] h-[50px]  text-black disabled:text-[#555F71] focus:outline-none ${
          disabled ? "" : "placeholder:text-black"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
