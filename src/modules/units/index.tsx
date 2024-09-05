"use client";
import { Units } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { getUnits } from "@/src/network/units";
export default function MyUnits() {
  const [Units, setUnits] = useState<Units[]>([]);
  const [loading, setLoading] = useState(true);
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
  }, []);

  return (
    <div className='z-10   flex-col gap-[60px]  items-center justify-center font-mono text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
      <div className='w-full px-4 md:px-0 '>
        <div className='w-full gap-5  py-6 pb-10 md:py-5 bg-white flex flex-col  rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[45px] md:mb-[14px]'>
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
              ""
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
                      <div className='border-[1px] border-[#E5EAF4] rounded-2xl py-3 md:py-[34px] px-4 md:px-6 md:pe-5  w-full md:w-[49%]  '>
                        <div className='flex flex-row justify-between items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-[#048951]  text-sm md:text-lg font-semibold'>
                              {item.category}
                            </p>
                            <p className='text-[#555F71]  text-sm md:text-lg flex flex-row items-center ltr:gap-6 rtl:gap-2.5 '>
                              {translate("locale.Unit_Number")}{" "}
                              <span className='text-THEME_PRIMARY_COLOR'>
                                {item.unitNumber}
                              </span>
                            </p>
                          </div>
                          {item.unitNumber?.includes("--") ? (
                            <button className='bg-THEME_PRIMARY_COLOR px-6 py-1.5 hidden md:flex text-white text-base font-bold rounded-lg'>
                              {translate("locale.Select_Unit_Type")}
                            </button>
                          ) : (
                            <img
                              src='/assets/categoriesType.png'
                              className='!w-[82px] !h-[16px] md:!w-[181px] md:!h-[36px]'
                            />
                          )}
                        </div>
                        <p className='mt-1 text-[#555F71] text-sm md:text-lg flex flex-row items-center rtl:gap-[21px] ltr:gap-2.5 '>
                          {translate("locale.Booking_Code")}{" "}
                          <span className='text-THEME_PRIMARY_COLOR'>
                            {item.id}
                          </span>
                        </p>
                        <hr className='border-[0.5px]  my-2.5 md:my-5 md:block border-[#E5EAF4] w-full ' />

                        <div className='flex flex-row gap-[55px] rtl:gap-6 '>
                          <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Book_Date")}
                              </p>

                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {new Date(item.bookingDate)
                                  ?.toLocaleDateString("en", {
                                    day: "2-digit",
                                    month: "numeric",
                                    year: "numeric",
                                  })
                                  ?.replaceAll("/", "-")}
                              </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Contract_Date")}
                              </p>
                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {item.contractDate
                                  ? new Date(item.contractDate)
                                      ?.toLocaleDateString("en", {
                                        day: "2-digit",
                                        month: "numeric",
                                        year: "numeric",
                                      })
                                      ?.replaceAll("/", "-")
                                  : "---"}
                              </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Total_Value_of_Payments")}
                              </p>
                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {Number(item.totalCashAmount).toLocaleString()}{" "}
                                {translate("locale.Pound")}
                              </p>
                            </div>
                          </div>

                          <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Contracting_Date")}
                              </p>

                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {new Date(item.contractingDate)
                                  ?.toLocaleDateString("en", {
                                    day: "2-digit",
                                    month: "numeric",
                                    year: "numeric",
                                  })
                                  ?.replaceAll("/", "-")}
                              </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Total_Unit_Value")}
                              </p>
                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {item.totalAmount.toLocaleString()}{" "}
                                {translate("locale.Pound")}
                              </p>
                            </div>

                            <div className='flex flex-col gap-1'>
                              <p className=' text-xs md:text-base  text-[#555F71]'>
                                {translate("locale.Total_Value_of_Checks")}
                              </p>
                              <p className=' text-xs md:text-base font-semibold text-[#555F71]'>
                                {item.totalChecksAmount.toLocaleString()}{" "}
                                {translate("locale.Pound")}
                              </p>
                            </div>
                          </div>
                        </div>
                        {item.unitNumber?.includes("--") ? (
                          <div className='w-full mt-4  flex items-center justify-center'>
                            <button className='bg-THEME_PRIMARY_COLOR px-4 flex md:hidden py-1.5 text-white text-base font-bold rounded-lg'>
                              {translate("locale.Select_Unit_Type")}
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
      <div className='w-full flex justify-end px-4 md:px-0'>
        <button className='ps-10 pe-6 flex-row-reverse py-4 border-[1px] border-THEME_PRIMARY_COLOR rounded-lg text-THEME_PRIMARY_COLOR text-base font-semibold flex  gap-8 items-center'>
          <img
            src='/assets/left.svg'
            className='ltr:rotate-180'
            width={"13px"}
            height={"16px"}
          />
          {translate("locale.New_Booking")}
        </button>
      </div>
    </div>
  );
}
