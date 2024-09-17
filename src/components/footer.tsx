"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";

export const Footer = ({ lang }: { lang: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const translate = useTranslations();

  const userData = getCookie("user");
  return (
    <div className='w-full bg-white pt-[54px] md:pt-[46px]'>
      <div className='bg-THEME_PRIMARY_COLOR text-white flex flex-col w-full items-center  pt-5 pb-8 '>
        <div className='flex flex-col md:flex-row justify-between items-center w-full px-9 md:px-[150px] mb-[38px] md:mb-4'>
          <img
            src='/assets/logo.svg'
            className='cursor-pointer w-[104px] md:w-[120px] h-[64px] md:h-[65px]'
            onClick={() => {
              router.push(`/${lang}`);
            }}
          />
          <div className='flex flex-col w-full md:w-auto  md:flex-row gap-[43px] md:gap-[84px]'>
            {userData ? (
              <>
                <p
                  onClick={() => {
                    router.push(`/${lang}#home`);
                  }}
                  className={`cursor-pointer   text-base font-semibold `}>
                  {translate("locale.Home")}
                </p>
                <p
                  onClick={() => {
                    router.push(`/${lang}/payments#mypayments`);
                  }}
                  className={`cursor-pointer   text-base font-semibold `}>
                  {translate("locale.My_Payments")}
                </p>
                <p
                  onClick={() => {
                    router.push(`/${lang}/units#myunits`);
                  }}
                  className={`cursor-pointer   text-base font-semibold `}>
                  {translate("locale.My_Units")}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {userData ? (
          <div className='w-full  px-9 md:px-0'>
            <hr className='border-[0.5px] border-[#FDFCFF] opacity-30 w-full ' />
          </div>
        ) : null}
        <div className='px-9 md:px-[150px] flex flex-col-reverse md:flex-row w-full justify-between items-center mt-7 md:mt-6'>
          <p className='text-[#FDFCFF] opacity-50 text-base' dir='ltr'>
            {translate("locale.Copyrights")}
          </p>
          <div className='w-full flex md:hidden my-4  '>
            <hr className='border-[0.5px] border-[#FDFCFF] opacity-30 w-full ' />
          </div>
          <div className='flex flex-col items-end gap-3'>
            <div className='flex flex-col-reverse md:flex-row items-center gap-2'>
              <p className='text-base text-center md:text-start'>
                {translate("locale.Customer_Service")}
              </p>
              <a
                className='text-lg font-semibold flex flex-row rtl:flex-row items-center gap-2'
                dir='ltr'
                href='tel:+201222 222 883'>
                <img
                  src='/assets/call.png'
                  className='flex w-[20px] md:w-4 h-[20px] md:h-4'
                />
                01222 222 883
              </a>
            </div>
            <div className='flex  flex-row w-full rtl:flex-row-reverse md:flex-row md:w-auto  justify-center md:justify-items-end  items-center gap-2 cursor-pointer'>
              <a
                className='text-base font-semibold flex flex-row rtl:flex-row items-center gap-2'
                dir='ltr'
                href='mailto:info@copticoffice.com'>
                <img
                  src='/assets/email.png'
                  className='flex w-[20px] md:w-6 h-[20px] md:h-6'
                />
                info@copticoffice.com
              </a>
            </div>
            <a
              href='https://www.google.com/maps/place/%D8%A7%D9%84%D9%83%D8%A7%D8%AA%D8%AF%D8%B1%D8%A7%D8%A6%D9%8A%D8%A9+%D8%A7%D9%84%D9%85%D8%B1%D9%82%D8%B3%D9%8A%D8%A9+%D8%A8%D8%A7%D9%84%D8%B9%D8%A8%D8%A7%D8%B3%D9%8A%D8%A9%E2%80%AD/@30.0722871,31.2747066,803m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14583f91730e6615:0xacbdb083f7f9b6b9!8m2!3d30.0722871!4d31.2747066!16s%2Fg%2F11sk5sy36x?hl=en-US&entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D'
              target="_blank"
              className='flex  flex-row w-full rtl:flex-row-reverse md:flex-row md:w-auto  justify-center md:justify-items-end  items-center gap-2 cursor-pointer'>
              <img
                src='/assets/location.png'
                className='flex w-[20px] md:w-6 h-[20px] md:h-6'
              />
              <p className='text-base text-center md:text-start w-[80%] md:w-auto'>
                {translate("locale.Headquarters")}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
