"use client";
import { useAppContext } from "@/src/context";
import Categories from "./features/Categories";
import Steps from "./features/Steps";
import { useTranslations } from "next-intl";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function HomePage({ lang }: { lang: string }) {
  const { isLoggedIn, updateNotificationCount } = useAppContext();
  const socket = io("https://dev.copticoffice.com:3000");

  useEffect(() => {
    if (isLoggedIn && getCookie("user")) {
      socket.on("connect", () => {
        const user = JSON.parse(getCookie("user") as string);
        console.log("Connected with Coptic Office backend");
        socket.on(user?.mobile?.primary?.number, ({ newCount }: any) => {
          updateNotificationCount(Number(newCount));
        });
      });
    }
  }, []);
  const translate = useTranslations();
  return (
    <div className='z-10  flex-col gap-[60px] items-center justify-center  text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
      <div className='w-full px-4 md:px-0'>
        <div
          id='home'
          className='w-full px-4 md:px-[70px] py-6 pb-10 md:py-10 bg-white flex flex-col gap-10 rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[45px] md:mb-[14px]'>
          <div className='flex   flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
            <img
              src='/assets/check.svg'
              width={"14px"}
              height={"16px"}
              className='mt-2.5'
            />
            <p
              dangerouslySetInnerHTML={{
                __html: translate("locale.Project_Feature1")?.replace('dd','<a target="_blank" class="text-THEME_PRIMARY_COLOR"')?.replace('hh','</a>'),
              }}></p>
          </div>
          <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
            <img
              src='/assets/check.svg'
              width={"14px"}
              height={"16px"}
              className='mt-2.5'
            />
            <p>{translate("locale.Project_Feature2")}</p>
          </div>
          <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
            <img
              src='/assets/check.svg'
              width={"14px"}
              height={"16px"}
              className='mt-2.5'
            />
            <p>{translate("locale.Project_Feature3")}</p>
          </div>
        </div>
      </div>
      <p className='text-[#183B56] text-[36px] text-center w-full mb-[45px] md:mb-0 font-semibold rtl:font-medium'>
        {translate("locale.Units_Categories")}
      </p>
      <Categories lang={lang} />
      <Steps lang={lang} />
    </div>
  );
}
