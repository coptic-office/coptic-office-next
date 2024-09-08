import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { ImageSlider } from "../../components/Slider";
import { Footer } from "../../components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { unstable_setRequestLocale } from "next-intl/server";
import Header from "@/src/components/Header";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coptic Office",
  description: "Coptic Office tombs ",
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
          <Header />
          <ImageSlider  />

          <>{children}</>
          <Footer lang={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
