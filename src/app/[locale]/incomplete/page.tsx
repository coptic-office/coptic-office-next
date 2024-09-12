import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import "../../../styles/globals.css";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className='text-black  flex min-h-screen flex-col items-center justify-center  z-[80] md:z-[100] bg-white  '>
      <div>
        {" "}
        <p className='text-black text-2xl'> INCOMPLETE SCREEN</p>
      </div>
    </main>
  );
}
