import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../../styles/globals.css";
import { ImageSlider } from "../../components/Slider";
import { Footer } from "../../components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "@/src/components/Header";
import { AppWrapper } from "@/src/context";

export function generateStaticParams() {
  return [{ locale: "ar" }];
}
const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coptic Office",
  description: "Coptic Office tombs ",

  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = (await getMessages()) as any;
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body id='body' className={`${inter.className} flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <AppWrapper>
            <Header />
            <ImageSlider />
            {children}
          </AppWrapper>
          <Footer lang={locale} />
          {/* <ReCAPTCHA
            sitekey='YOUR_SITE_KEY' // Add your reCAPTCHA site key here
            onChange={() => { }}
            
          /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
