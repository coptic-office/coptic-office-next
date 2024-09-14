"use client";
import { createPayment, getPaymentsOptions } from "@/src/network/payments";
import { PaymentOptions } from "@/src/types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RadioButton } from "./components/RadioButton";
import { NumberControl } from "./components/NumberControl";
import { ReactSelect } from "./Select";
import { LoadingSpinner } from "../auth/components/loading";

export const PaymentModal = ({ closeModal }: { closeModal(): void }) => {
  const translate = useTranslations();
  const [activeTab, setActiveTab] = useState(0);
  const [bookingItem, setBookingItem] = useState<PaymentOptions | null>(null);
  const [options, setOptions] = useState<PaymentOptions[]>([]);
  const [maxPayment, setMaxPayment] = useState<{
    maxValue: number;
    maxIndex: number | null;
  }>({
    maxValue: 0,
    maxIndex: null,
  });
  const [selectedItem, setSelectedItem] = useState<any>({
    id: null,
    value: null,
    selectedValueId: null,
    error: false,
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<PaymentOptions>();
  const router = useRouter();
  const locale = useLocale();

  const changeActiveTab = (index: number) => {
    setSelectedUnit(undefined);
    setSelectedItem(null);
    setActiveTab(index);
    if (index == 1) {
      setSelectedUnit(options?.[maxPayment?.maxIndex ?? 0]);
    }
  };
  const disabledStyle = `cursor-pointer  text-center  py-3 text-base inline-block border-[1px]  flex-1 border-gray-200 border-b-2 rounded-md hover:bg-gray-300 hover:border-gray-200 text-[#555F71]`;
  const activeStyle = `cursor-pointer text-center inline-block py-3 text-base border-b-2 bg-[#005fb057] font-semibold  flex-1 text-THEME_PRIMARY_COLOR border-THEME_PRIMARY_COLOR rounded-t-md active   `;

  const changeSelectedValueId = (
    id: number | null,
    value?: number,
    unitId?: string
  ) => {
    setSelectedItem({
      id: unitId ? unitId : null,
      value: value ? value : 1000,
      selectedValueId: id,
      error: false,
    });
  };
  const getAllOptions = () => {
    setDataLoading(true);
    getPaymentsOptions(locale)
      .then((response) => {
        let maxNumber = 0;
        let maxIndex = 0;
        response.data.message?.paymentOptions.map(
          (item: PaymentOptions, index: number) => {
            if (maxNumber < item.value) {
              maxNumber = item.value;
              maxIndex = index;
            }
            if (item.unitId == "" || item?.unitId == null) setBookingItem(item);
          }
        );
        setOptions(response.data.message?.paymentOptions);
        setMaxPayment({
          maxValue: maxNumber,
          maxIndex: maxIndex,
        });
        setDataLoading(false);
      })
      .catch(() => {
        setDataLoading(false);
      });
  };
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
        closeModal();
      }
    });
    getAllOptions();
  }, []);

  const submitPayment = () => {
    setLoading(true);
    let object: {
      paymentType: string;
      amount: number;
      unitId?: string;
    } = {
      paymentType: selectedUnit ? selectedUnit.paymentType : "booking",
      amount: selectedItem.value,
    };
    if (selectedUnit) object.unitId = selectedUnit.unitId;

    createPayment({ ...object }, locale)
      .then((response) => {
        setLoading(false);
        open(
          `https://banquemisr.gateway.mastercard.com/checkout/pay/${response.data.message.sessionId}?checkoutVersion=1.0.0`,
          "_blank"
        );
        closeModal();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className='  min-w-[90%]  md:min-w-[575px]'>
      <div className='h-[56px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold text-white text-base md:text-xl '>
          {translate("locale.Unit_Booking")}
        </p>

        <img
          src='/assets/close.png'
          onClick={closeModal}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='bg-white rounded-b-[4px]'>
        <div className='flex flex-col items-center mb-6  px-3  md:px-12'>
          <p className='text-center text-THEME_PRIMARY_COLOR text-xl md:text-[36px] font-semibold  pt-3 pb-2'>
            {translate("locale.Electronic_Payment")}
          </p>
          <p className='text-[#74777F] text-lg'>
            {translate("locale.Payment_Options")}
          </p>
        </div>
        <ul className='flex flex-wrap   w-full px-[2px] '>
          <li
            onClick={() => changeActiveTab(0)}
            className={
              activeTab == 0 ? activeStyle : `${disabledStyle}  rounded-ee-none`
            }>
            <p>{translate("locale.New_Booking")}</p>
          </li>
          {options.length <= 0 && !dataLoading ? null : (
            <li
              className={`  ${
                activeTab == 1
                  ? activeStyle
                  : `${disabledStyle} rounded-es-none `
              }`}
              onClick={() => changeActiveTab(1)}>
              <p>{translate("locale.Existing_Booking")}</p>
            </li>
          )}
        </ul>
        <div className='p-4 py-6 md:p-10'>
          {activeTab == 0 ? (
            <div className='flex flex-col gap-[30px]'>
              <RadioButton
                label={`${Number(
                  bookingItem?.value ?? 70000
                )?.toLocaleString()} ${translate("locale.Pound")} ${
                  bookingItem?.text??''
                }`}
                onSelect={() => {
                  changeSelectedValueId(0, bookingItem?.value);
                }}
                selected={selectedItem?.selectedValueId == 0}
              />
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2.5 items-center'>
                  <RadioButton
                    label={translate("locale.Other_Value")}
                    onSelect={() => changeSelectedValueId(1)}
                    selected={selectedItem?.selectedValueId == 1}
                  />
                  <div className='flex items-center gap-2.5'>
                    <div className='flex items-center  rounded-md border-[1px]  bg-white focus:outline-THEME_PRIMARY_COLOR'>
                      <NumberControl
                        changeAmount={() => {
                          if (selectedItem?.selectedValueId == 1) {
                            if (selectedItem?.value <= 1000) return;
                            else
                              setSelectedItem({
                                ...selectedItem,
                                value: selectedItem?.value - 1000,
                              });
                          }
                        }}
                        disabled={
                          selectedItem?.value <= 1000 ||
                          selectedItem?.value % 1000 != 0
                        }
                        src='minus'
                        isSelected={selectedItem?.selectedValueId != 1}
                      />
                      <input
                        type='tel'
                        className='w-[80px] text-center h-8  bg-gray-200  focus:outline-THEME_PRIMARY_COLOR   text-THEME_PRIMARY_COLOR'
                        disabled={selectedItem?.selectedValueId != 1}
                        value={
                          selectedItem?.selectedValueId == 1
                            ? selectedItem?.value
                            : null
                        }
                        placeholder='1000'
                        onChange={(event) => {
                          var reg = /^\d+$/;
                          if (!reg.test(event.target.value)) return;
                          setSelectedItem({
                            ...selectedItem,
                            value: Number(event.target.value),
                            error:
                              Number(event.target.value) % 1000 != 0
                                ? true
                                : false,
                          });
                        }}
                      />
                      <NumberControl
                        changeAmount={() => {
                          if (selectedItem?.selectedValueId == 1) {
                            if (selectedItem?.value == maxPayment.maxValue)
                              return;
                            else
                              setSelectedItem({
                                ...selectedItem,
                                value: selectedItem?.value + 1000,
                              });
                          }
                        }}
                        disabled={
                          selectedItem?.value >= maxPayment.maxValue ||
                          selectedItem?.value % 1000 != 0
                        }
                        src='plus2'
                        isSelected={selectedItem?.selectedValueId != 1}
                      />
                    </div>
                    <p className='text-base md:text-xl text-[#74777F] font-semibold'>
                      {translate("locale.Pound")}
                    </p>
                  </div>
                </div>
                <p className='text-base text-THEME_ERROR_COLOR'>
                  {selectedItem?.error && translate("locale.Input_Error")}
                </p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-[30px]'>
              <ReactSelect
                onSelect={(item: PaymentOptions) => {
                  changeSelectedValueId(null, item.value, item.unitId);
                  setSelectedUnit(item);
                }}
                selectedUnit={selectedUnit}
                unitIds={options}
              />
              {selectedUnit ? (
                <>
                  {selectedUnit.value ? (
                    <div className='flex flex-col gap-[30px]'>
                      <RadioButton
                        label={`${Number(
                          selectedUnit.value
                        )?.toLocaleString()} ${translate("locale.Pound")} ${
                          selectedUnit.text
                        }`}
                        onSelect={() => {
                          changeSelectedValueId(
                            0,
                            selectedUnit.value,
                            selectedUnit.unitId
                          );
                        }}
                        selected={
                          selectedItem?.selectedValueId == 0 && selectedItem?.id
                        }
                      />
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2.5 items-center'>
                          <RadioButton
                            label={translate("locale.Other_Value")}
                            onSelect={() =>
                              changeSelectedValueId(
                                1,
                                1000,
                                selectedUnit.unitId
                              )
                            }
                            selected={
                              selectedItem?.selectedValueId == 1 &&
                              selectedItem?.id
                            }
                          />
                          <div className='flex items-center gap-2.5'>
                            <div className='flex items-center  rounded-md border-[1px]  bg-white focus:outline-THEME_PRIMARY_COLOR'>
                              <NumberControl
                                changeAmount={() => {
                                  if (selectedItem?.selectedValueId == 1) {
                                    if (selectedItem?.value <= 1000) return;
                                    else
                                      setSelectedItem({
                                        ...selectedItem,
                                        value: selectedItem?.value - 1000,
                                      });
                                  }
                                }}
                                disabled={
                                  selectedItem?.value <= 1000 ||
                                  selectedItem?.value % 1000 != 0 ||
                                  !selectedItem?.id
                                }
                                src='minus'
                                isSelected={selectedItem?.selectedValueId != 1}
                              />
                              <input
                                className='w-[80px] text-center h-8  bg-gray-200 focus:outline-THEME_PRIMARY_COLOR  text-THEME_PRIMARY_COLOR'
                                disabled={selectedItem?.selectedValueId != 1}
                                value={
                                  selectedItem?.selectedValueId == 1
                                    ? selectedItem?.value
                                    : null
                                }
                                placeholder='1000'
                                onChange={(event) => {
                                  var reg = /^\d+$/;
                                  if (!reg.test(event.target.value)) return;
                                  setSelectedItem({
                                    ...selectedItem,
                                    value: Number(event.target.value),
                                    error:
                                      Number(event.target.value) % 1000 != 0
                                        ? true
                                        : false,
                                  });
                                }}
                              />
                              <NumberControl
                                changeAmount={() => {
                                  if (selectedItem?.selectedValueId == 1) {
                                    if (
                                      selectedItem?.value == selectedUnit.value
                                    )
                                      return;
                                    else
                                      setSelectedItem({
                                        ...selectedItem,
                                        value: selectedItem?.value + 1000,
                                      });
                                  }
                                }}
                                disabled={
                                  selectedItem?.value >= maxPayment.maxValue ||
                                  selectedItem?.value % 1000 != 0 ||
                                  !selectedItem?.id
                                }
                                src='plus2'
                                isSelected={selectedItem?.selectedValueId != 1}
                              />
                            </div>
                            <p className='text-base md:text-xl text-[#74777F] font-semibold'>
                              {translate("locale.Pound")}
                            </p>
                          </div>
                        </div>
                        <p className='text-base text-THEME_ERROR_COLOR'>
                          {selectedItem?.error &&
                            translate("locale.Input_Error")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className='max-w-[495px] flex flex-col items-center gap-2.5'>
                      <p className='text-base md:text-xl text-[#74777F] font-semibold text-center'>
                        {selectedUnit.memo}
                      </p>
                      {selectedUnit.action == "" ? null : (
                        <button
                          onClick={() => {
                            if (selectedUnit.action == "go") {
                              open(
                                "https://www.google.com/maps/place/%D8%A7%D9%84%D9%83%D8%A7%D8%AA%D8%AF%D8%B1%D8%A7%D8%A6%D9%8A%D8%A9+%D8%A7%D9%84%D9%85%D8%B1%D9%82%D8%B3%D9%8A%D8%A9+%D8%A8%D8%A7%D9%84%D8%B9%D8%A8%D8%A7%D8%B3%D9%8A%D8%A9%E2%80%AD/@30.0722871,31.2747066,803m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14583f91730e6615:0xacbdb083f7f9b6b9!8m2!3d30.0722871!4d31.2747066!16s%2Fg%2F11sk5sy36x?hl=en-US&entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D",
                                "_blank"
                              );
                              closeModal();
                            } else if (selectedUnit.action == "select") {
                              closeModal();

                              router.push(`/${locale}/units`);
                            }
                          }}
                          className='w-full rounded-lg h-10 bg-THEME_PRIMARY_COLOR text-white text-center'>
                          {selectedUnit.actionText}
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          )}
          {selectedUnit &&
          (selectedUnit.action == "" ||
            selectedUnit.action == "go" ||
            selectedUnit.action == "select") ? null : (
            <div className='flex w-full justify-end mt-7'>
              <button
                disabled={!selectedItem?.value}
                onClick={submitPayment}
                className='w-full md:w-[181px] flex justify-center items-center disabled:opacity-75 rounded-lg h-12 bg-THEME_PRIMARY_COLOR text-white text-center'>
                {loading ? <LoadingSpinner /> : translate("locale.PayNow")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
