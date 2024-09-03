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
            className='cursor-pointer w-[104px] md:w-[71px] h-[64px] md:h-[44px]'
            onClick={() => {
              router.push(`/${lang}`);
            }}
          />
          <div className='flex flex-col w-full md:w-auto  md:flex-row gap-[43px] md:gap-[84px]'>
            <p
              onClick={() => {
                router.push(`/${lang}`);
              }}
              className={`cursor-pointer   text-base font-semibold `}>
              {translate("locale.Home")}
            </p>
            {userData ? (
              <>
                <p
                  onClick={() => {
                    router.push(`/${lang}/payments`);
                  }}
                  className={`cursor-pointer   text-base font-semibold `}>
                  {translate("locale.My_Payments")}
                </p>
                <p
                  onClick={() => {
                    router.push(`/${lang}/units`);
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
        <div className='w-full  px-9 md:px-0'>
          <hr className='border-[0.5px] border-[#FDFCFF] opacity-30 w-full ' />
        </div>
        <div className='px-9 md:px-[150px] flex flex-col-reverse md:flex-row w-full justify-between items-center mt-7 md:mt-6'>
          <p className='text-[#FDFCFF] opacity-50 text-base' dir='ltr'>
            © 2024 Great Simple All rights reserved
          </p>
          <div className='w-full flex md:hidden my-4  '>
            <hr className='border-[0.5px] border-[#FDFCFF] opacity-30 w-full ' />
          </div>
          <div className='flex flex-col md:flex-row items-center gap-1'>
            <p className='text-base'>{translate("locale.weAreHereToHelp")}</p>
            <p
              className='text-xl font-bold flex flex-row items-center gap-2'
              dir='ltr'>
              <img src='assets/call.svg' className='flex md:hidden' />
              01222 222 883
            </p>
            <div className=' hidden md:flex flex-row gap-5 items-center ms-5'>
              <img src='assets/call.svg' />
              <img src='assets/Twitter.svg' />
              <img src='assets/Facebook.svg' />
              <img src='assets/Google.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
