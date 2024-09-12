"use client";
import { Unit } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { getUnits } from "@/src/network/units";
import UnitCard from "./components/UnitCard";
import { useAppContext } from "@/src/context";
export default function MyUnits() {
  const [Units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshPage } = useAppContext();
  const translate = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isLoggedIn = getCookie("user");
 
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      setLoading(true);
      getUnits(locale)
        .then((response) => {
          setUnits(response.data?.message?.units);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    }
  }, [refreshPage]);
  return (
    <div className='z-10   flex-col gap-[60px]  items-center justify-center font-mono text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
      <div className='w-full px-4 md:px-0 '>
        <div
          id='myunits'
          className='w-full gap-5  py-6 pb-10 md:py-5 bg-white flex flex-col  rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[45px] md:mb-[14px]'>
          <p
            className={`text-[#183B56] text-lg md:text-2xl font-bold px-4 ${
              Units.length == 0 ? "md:px-[47px]" : "md:px-6"
            }`}>
            {translate("locale.My_Units")}
          </p>
          {Units.length > 0 ? (
            <hr className='border-[0.5px] hidden md:block border-[#E5EAF4] w-full ' />
          ) : (
            ""
          )}{" "}
          <>
            {loading ? (
              <div className='flex items-center justify-center min-h-[200px]'>
                <div className='h-[350px] w-full flex justify-center items-center'>
                  <span className='svg-spinners--180-ring-with-bg'></span>
                </div>
              </div>
            ) : (
              <div className='flex flex-row w-full items-center justify-center'>
                {Units.length == 0 ? (
                  <div className='flex flex-col justify-center items-center pt-11 pb-[70px] gap-9 w-full md:px-6'>
                    <img
                      src='/assets/unitsEmpty.svg'
                      className=' w-[88px] h-[88px] md:w-[128px] md:h-[128px]'
                    />
                    <p className='text-base md:text-[26px] font-semibold text-[#555F71]'>
                      {translate("locale.noUnits")}
                    </p>
                  </div>
                ) : (
                  <div className='flex flex-row gap-x-4 gap-y-6 flex-wrap px-4 md:px-6 justify-between '>
                    {Units.map((item) => (
                      <UnitCard item={item} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
      <div className='w-full flex justify-end px-4 md:px-0'>
        <button className='px-6 md:ps-10 md:pe-6 flex-row-reverse py-4 border-[1px] border-THEME_PRIMARY_COLOR rounded-lg text-THEME_PRIMARY_COLOR text-base font-semibold flex  gap-3 md:gap-8 items-center'>
          <img
            src=' /assets/left.svg'
            className='hidden md:flex ltr:rotate-180'
            width={"13px"}
            height={"16px"}
          />
          {translate("locale.New_Booking")}
        </button>
      </div>
    </div>
  );
}
