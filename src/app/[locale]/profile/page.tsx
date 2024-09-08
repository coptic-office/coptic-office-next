import PersonalProfile from "@/src/modules/profile";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Profile({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white  '>
      <PersonalProfile  />
    </main>
  );
}
