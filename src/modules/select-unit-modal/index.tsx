"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getUnitTypes, selectUnitType } from "@/src/network/units";
import { useAppContext } from "@/src/context";
import { myUnit } from "@/src/types";
import { SelectUnitCard } from "./components/UnitCard";
import { LoadingSpinner } from "../auth/components/loading";
import { useRouter } from "next/navigation";

export const SelectUnitModal = ({
  closeModal,
}: {
  closeModal: VoidFunction;
}) => {
  const translate = useTranslations();
  const { unitId, setCurrentModal, refreshData, fetchData } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isCatSelected, setIsCatSelected] = useState(false);
  const [units, setUnits] = useState<any[]>([]);
  const [error, setError] = useState("");
  const locale = useLocale();
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
        closeModal();
        setCurrentModal(null);
      }
    });
    setLoading(true);
    getUnitTypes(unitId, locale).then((response) => {
      setLoading(false);
      setUnits(response.data.message.units);
      setSelectedType(
        response.data.message?.currentCategory?.replace("category", "") - 1
      );
    });
  }, []);
  const submit = () => {
    setButtonLoading(true);
    selectUnitType(unitId, units?.[selectedType as number]?.category, locale)
      .then((response) => {
        setButtonLoading(false);
        setIsCatSelected(true);
      })
      .catch((error) => {
        setButtonLoading(false);

        setError(error.response.data.error);
      });
  };
  return (
    <div className=' min-w-full '>
      <div className='h-[56px] rounded-t-[4px] bg-THEME_PRIMARY_COLOR px-6 py-4 flex flex-row justify-between items-center'>
        <p className='font-semibold rtl:font-medium text-white text-base md:text-xl '>
          {translate("locale.Unit_Type")}
        </p>
        <img
          src='/assets/close.png'
          onClick={() => {
            setCurrentModal(null);
            closeModal();
          }}
          className='w-4 h-4 cursor-pointer'
        />
      </div>
      <div className='w-full bg-white rounded-b-[4px] px-6  md:px-12  '>
        {!isCatSelected ? (
          <p className='text-center text-THEME_PRIMARY_COLOR text-xl md:text-3xl font-semibold rtl:font-medium  pt-5 pb-2  md:py-7'>
            {translate("locale.Select_Unit_Type")}
          </p>
        ) : null}
        <div className=' min-h-[350px] h-[370px] overflow-scroll md:overflow-hidden md:h-auto  flex flex-col md:flex-row gap-7'>
          {isCatSelected ? (
            <div className='flex min-h-[350px] w-full flex-col justify-center items-center'>
              <img src='/assets/success.png' width={"200px"} height={"200px"} />
              <p className='my-6 md:my-3 text-[hsl(224,5%,48%)] text-lg w-full  md:w-1/2 text-center'>
                {translate("locale.Unit_Selected")}
              </p>
            </div>
          ) : (
            <>
              {loading ? (
                <div className='h-[350px] w-full flex justify-center items-center'>
                  <span className='svg-spinners--180-ring-with-bg'></span>
                </div>
              ) : (
                <>
                  {" "}
                  {units
                    .sort(
                      (a, b) =>
                        (a.category.replace("category", "") as any) -
                        (b.category.replace("category", "") as any)
                    )
                    ?.map((item, index: number) => (
                      <SelectUnitCard
                        key={`card_${index}`}
                        onSelect={() => {
                          setSelectedType(index);
                        }}
                        isSelected={selectedType == index}
                        unit={item}
                        isActive={item?.isActive}
                      />
                    ))}
                </>
              )}
            </>
          )}
        </div>
        <div className='w-full gap-3   flex flex-col gap items-center'>
          {isCatSelected ? (
            <button
              onClick={() => {
                fetchData?.();
                closeModal();
              }}
              className='w-full md:w-[181px] mb-6 mt-3 flex justify-center items-center rounded-lg h-12 disabled:opacity-40 bg-THEME_PRIMARY_COLOR text-white text-center'>
              {translate("locale.Close")}
            </button>
          ) : (
            <>
              {error != "" ? (
                <p className='mt-5 md:my-5 text-THEME_ERROR_COLOR text-lg w-full  md:w-1/2 text-center'>
                  {error}
                </p>
              ) : (
                <p className='mt-1 md:my-3 text-[#74777F] text-sm md:text-lg w-full  md:w-1/2 text-center'>
                  {translate("locale.Change_Unit_Type_Text")}
                </p>
              )}
              <div className='mb-6 w-full flex justify-end'>
                <button
                  onClick={submit}
                  disabled={selectedType == null || buttonLoading}
                  className='w-full md:w-[181px]  flex justify-center items-center rounded-lg h-12 disabled:opacity-40 bg-THEME_PRIMARY_COLOR text-white text-center'>
                  {buttonLoading ? (
                    <LoadingSpinner />
                  ) : (
                    translate("locale.Save")
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
