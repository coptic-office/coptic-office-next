"use client";
import { useTranslations } from "next-intl";
import Categories from "./features/Categories";
import Steps from "./features/Steps";
export default function HomePage({ lang }: { lang: string }) {
  const translate = useTranslations();

  return (
    <div className='z-10  flex-col gap-[60px] items-center justify-center font-mono text-sm lg:flex w-full px-[150px]  bg-transparent'>
      <div className='w-full px-[70px] py-10 bg-white flex flex-col gap-10 rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[14px]'>
        <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
          <img
            src='assets/check.svg'
            width={"14px"}
            height={"16px"}
            className='mt-2.5'
          />
          <p>{translate("locale.Project_Feature1")}</p>
        </div>
        <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
          <img
            src='assets/check.svg'
            width={"14px"}
            height={"16px"}
            className='mt-2.5'
          />
          <p>{translate("locale.Project_Feature2")}</p>
        </div>
        <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
          <img
            src='assets/check.svg'
            width={"14px"}
            height={"16px"}
            className='mt-2.5'
          />
          <p>{translate("locale.Project_Feature3")}</p>
        </div>
      </div>
      <p className='text-[#183B56] text-[36px] font-semibold'>
        {translate("locale.Unit_Category")}
      </p>
      <Categories lang={lang} />
      <Steps lang={lang} />
    </div>
  );
}
