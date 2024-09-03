import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { ImageSlider } from "../../components/Slider";
import { Footer } from "../../components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { unstable_setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
});
export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = (await getMessages()) as any;
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body id='body' className={" flex flex-col"}>
        <NextIntlClientProvider messages={messages}>
          <Header lang={locale} />
          <ImageSlider lang={locale} />
          <>{children}</>
          <Footer lang={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
