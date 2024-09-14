"use client";
import { getPayments } from "@/src/network/payments";
import { bankChecks, Payment } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import PaymentCard from "./components/PaymentCard";
import BankCard from "./components/BankCard";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/src/context";
export default function MyPayments() {
  const [payments, setPayments] = useState<{
    payments: Payment[];
    bankChecks: bankChecks[];
    selectedStep: number;
    totalChecks: number | null;
    totalPayments: number | null;
  }>({
    payments: [],
    bankChecks: [],
    totalChecks: null,
    totalPayments: null,
    selectedStep: 0,
  });
  const [loading, setLoading] = useState(true);
  const translate = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isLoggedIn = getCookie("user");
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      setLoading(true);
      getPayments(locale)
        .then((response) => {
          setPayments({
            ...payments,
            payments: response.data.message?.payments,
            bankChecks: response.data.message?.bankChecks,
            totalChecks: response.data.message?.totalChecks,
            totalPayments: response.data.message?.totalPayments,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  const changeActiveTab = (index: number) => {
    setPayments({ ...payments, selectedStep: index });
  };
  const { setCurrentModal } = useAppContext();
  const disabledStyle = `cursor-pointer ps-[6px] md:ps-[18px] pe-[11px] md:pe-6 py-[6px] md:py-3 text-base inline-block border-[1px] !max-w-auto md:!max-w-[369px] flex-1      border-gray-200 rounded-md hover:text-gray-600 hover:border-gray-200 `;
  const activeStyle = `cursor-pointer inline-block  ps-[6px] md:ps-[18px] pe-[11px] md:pe-6 py-[6px] md:py-3 text-base  border-b-2 bg-[#005fb057] font-semibold  !max-w-auto md:!max-w-[369px]  flex-1   text-THEME_PRIMARY_COLOR border-THEME_PRIMARY_COLOR rounded-t-md active `;
  return (
    <div className='z-10   flex-col gap-[60px] items-center justify-center font-mono text-sm lg:flex w-full px-0 md:px-[150px]  bg-transparent'>
      <div className='w-full px-4 md:px-0 '>
        <div
          id='mypayments'
          className='w-full   py-6 pb-10 md:py-10 bg-white flex flex-col  rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] mb-[45px] md:mb-[14px]'>
          <p className='text-[#183B56] text-lg md:text-2xl font-bold px-4 md:px-6'>
            {translate("locale.My_Payments")}
          </p>
          <>
            {loading ? (
              <div className='flex items-center justify-center min-h-[200px]'>
                <div className='h-[350px] w-full flex justify-center items-center'>
                  <span className='svg-spinners--180-ring-with-bg'></span>
                </div>
              </div>
            ) : (
              <>
                {payments.bankChecks?.length == 0 &&
                payments.payments.length == 0 ? (
                  <div className='flex flex-col justify-center items-center pt-11 pb-[70px] gap-[55px] w-full md:px-6'>
                    <img
                      src='/assets/emptyPayment.png'
                      width={"100px"}
                      height={"80px"}
                    />
                    <p className='text-base md:text-[26px] font-semibold text-[#555F71]'>
                      {translate("locale.noPayments")}
                    </p>
                  </div>
                ) : (
                  <div className='flex flex-col gap-6'>
                    <div className='mt-6  ms-[2px] '>
                      <div className='text-sm font-medium text-center text-[#555F71] border-b border-gray-200 '>
                        <ul className='flex flex-wrap gap-[2px] md:pe-6 '>
                          <li
                            className={
                              payments.selectedStep == 0
                                ? activeStyle
                                : disabledStyle
                            }
                            onClick={() => changeActiveTab(0)}>
                            <div className='flex flex-col gap-1'>
                              <p>
                                {translate("locale.Total_Value_of_Payments")}
                              </p>
                              <p>
                                {payments.totalPayments?.toLocaleString()}{" "}
                                {translate("locale.Pound")}
                              </p>
                            </div>
                          </li>
                          <li
                            className={` me-2 ${
                              payments.selectedStep == 1
                                ? activeStyle
                                : disabledStyle
                            }`}
                            onClick={() => changeActiveTab(1)}>
                            <div className='flex flex-col gap-1'>
                              <p>{translate("locale.Total_Value_of_Checks")}</p>
                              <p>
                                {payments.totalChecks?.toLocaleString()}{" "}
                                {translate("locale.Pound")}
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='flex flex-row gap-y-6 flex-wrap px-4 md:px-6 justify-between '>
                      {payments.selectedStep
                        ? payments?.bankChecks?.map((payment, index) => (
                            <BankCard payment={payment} key={`Bank${index}`} />
                          ))
                        : payments?.payments?.map((payment, index) => (
                            <PaymentCard
                              payment={payment}
                              key={`Payment${index}`}
                            />
                          ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
      <div className='w-full flex justify-center md:justify-end px-4 md:px-0'>
        <button
          onClick={() => {
            setCurrentModal("payment");
          }}
          className=' px-6 md:ps-10 md:pe-6 flex-row-reverse py-4 border-[1px] border-THEME_PRIMARY_COLOR rounded-lg bg-THEME_PRIMARY_COLOR md:bg-white text-white  md:text-THEME_PRIMARY_COLOR text-base font-semibold flex gap-3 md:gap-8 items-center'>
          <img
            src=' /assets/left.svg'
            className='hidden md:flex ltr:rotate-180'
            width={"13px"}
            height={"16px"}
          />
          {translate("locale.New_Payment")}
        </button>
      </div>
    </div>
  );
}
