// "use client";;
// import { useTranslations } from "next-intl";
// import "../../../styles/globals.css";
// import { useAppContext } from "@/src/context";

// export default function Home({
//   params: { locale },
// }: {
//   params: { locale: string };
// }) {
//   const t = useTranslations();
//   const { setCurrentModal } = useAppContext();


//   return (
//     <main className='text-black  flex min-h-screen flex-col items-center justify-center  z-[80] md:z-[100]  bg-white '>
   
//       <div className='z-10  flex-col gap-[60px] items-center justify-center  text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
//         <div className='w-full px-4 md:px-0'>
//           <div className='w-full px-4 md:px-[70px] py-6 pb-10 md:py-10 bg-white flex flex-col gap-10 rounded-2xl mt-[100px]  border-solid  mb-[45px] md:mb-[14px]'>
//             <div className='flex flex-col items-center gap-7'>
//               <img src='/assets/fail.jpg' className='w-[210px] h-[145px]' />
//               <p className='text-base text-black'>
//                 {t("locale.Unverified_Payment")}
//               </p>
//               <button
//                 className={`h-[55px] w-full   bg-THEME_PRIMARY_COLOR disabled:opacity-45 rounded-lg flex justify-center items-center  text-white font-medium text-base mt-[40px] md:mt-[50px]`}
//                 onClick={() => {
//                   setCurrentModal("payment");
//                 }}>
//                 {t("locale.retry")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

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
        <p className='text-black text-2xl'> UNVERIFIED SCREEN</p>
      </div>
    </main>
  );
}
