import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export const NavLink = ({
  isSelected,
  label,
  url,
  toggleNav,
}: {
  isSelected: boolean;
  label: string;
  url?: string;
  toggleNav?: VoidFunction;
}) => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <p
      onClick={() => {
        router.push(`/${locale}${url ? `/${url}#my${url}` : ""}`, {
          scroll: true,
        });
        toggleNav?.();
      }}
      className={`[text-shadow:1px_1px_1px_var(--tw-shadow-color)] shadow-gray-700  h-[33px] px-3 py-[6px] md:px-0 md:py-0 rounded-[4px] md:rounded-none  md:h-auto w-full md:w-auto ${
        isSelected ? "bg-[#F7F8FC] md:bg-transparent" : ""
      } cursor-pointer ${
        isSelected
          ? `text-THEME_PRIMARY_COLOR text-base md:text-xl font-semibold rtl:font-medium`
          : `text-[#84878B]  md:text-white  text-sm md:text-base font-semibold rtl:font-medium`
      }`}>
      {label}
    </p>
  );
};
