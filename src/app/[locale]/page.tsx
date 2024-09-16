import { useTranslations } from "next-intl";
import HomePage from "../../modules/Home";
import { unstable_setRequestLocale } from "next-intl/server";
import "../../styles/globals.css";
import { io } from "socket.io-client";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const socket = io();
  socket.on("connect", () => {
    console.log("Connected with Coptic Office backend");
  });

  return (
    <main
      className={` flex min-h-screen flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white`}>
      <HomePage lang={locale} />
    </main>
  );
}
