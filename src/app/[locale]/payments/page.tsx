import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import MyPayments from "@/src/modules/payments";

export default function Payments({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className='flex min-h-full md:min-h-[auto] flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white  '>
      <MyPayments />
    </main>
  );
}
