"use client";
import { useTranslation } from "@/app/i18n";
import { useState } from "react";
import Categories from "./features/Categories";
import Steps from "./features/Steps";
export default function HomePage({ lang }: { lang: string }) {
  const [i18n, setI18n] = useState<any>(null);
  useTranslation(lang).then((value) => {
    setI18n(value);
  });

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
          <p>{i18n?.translate("Project_Feature1")}</p>
        </div>
        <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
          <img
            src='assets/check.svg'
            width={"14px"}
            height={"16px"}
            className='mt-2.5'
          />
          <p>{i18n?.translate("Project_Feature2")}</p>
        </div>
        <div className='flex flex-row gap-[14px] items-start text-lg font-medium text-THEME_SECONDARY_COLOR'>
          <img
            src='assets/check.svg'
            width={"14px"}
            height={"16px"}
            className='mt-2.5'
          />
          <p>{i18n?.translate("Project_Feature3")}</p>
        </div>
      </div>
      <p className='text-[#183B56] text-[36px] font-semibold'>
        {i18n?.translate("Unit_Category")}
      </p>
      <Categories lang={lang} />
      <Steps lang={lang} />
    </div>
  );
}
