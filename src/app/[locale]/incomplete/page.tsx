import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import "../../../styles/globals.css";
import Incomplete from "@/src/modules/incomplete";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main
      className={` flex flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white`}>
      <Incomplete lang={locale} />
    </main>
  );
}
