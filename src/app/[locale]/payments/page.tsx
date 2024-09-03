// import HomePage from "@/src/modules/Home";
// import MyPayments from "@/src/modules/payments";
// export default function Home(params: { params: any }) {
//   return (
//     <main className='flex min-h-screen flex-col items-center justify-between mt-[500px] z-[100] bg-white  '>
//       <MyPayments lang={params?.params?.lang} />
//     </main>
//   );
// }

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import HomePage from "@/src/modules/Home";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white  '>
      <HomePage lang={locale} />
    </main>
  );
}
