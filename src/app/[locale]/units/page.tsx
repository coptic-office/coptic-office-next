import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import MyUnits from "@/src/modules/units";

export default function Units({ params }: { params: any }) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className='flex min-h-full md:min-h-[auto] flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white  '>
      <MyUnits />
    </main>
  );
}
