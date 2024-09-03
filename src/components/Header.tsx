"use client";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Auth } from "@/src/modules/auth";

export default function Header({ lang }: { lang: string }) {
  const [isSelected, setIsSelected] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  const openNotification = () => {
    setShowNotifications(true);
    (document.getElementById("body") as any).style.overflow = "hidden";
  };
  const closeNotification = () => {
    setShowNotifications(false);
    (document.getElementById("body") as any).style.overflow = "scroll";
  };
  const openAuthModal = () => {
    setOpenAuth(true);
    (document.getElementById("body") as any).style.overflow = "hidden";
  };
  const closeAuthModal = () => {
    setOpenAuth(false);
    (document.getElementById("body") as any).style.overflow = "scroll";
  
  };

  const router = useRouter();
  const translate = useTranslations();

  useEffect(() => {
    if (pathname?.includes("payments")) setIsSelected(1);
    else if (pathname.includes("units")) setIsSelected(2);
    else setIsSelected(0);
  }, [pathname]);

  const userData = useMemo(() => {
    if (localStorage.getItem("user") != null)
      return JSON.parse(localStorage.getItem("user") as any);
    else return null;
  }, [window]);
  return (
    <>
      <div className='flex  md:hidden justify-between items-center mx-6 py-4 relative  z-[100]  '>
        <img src='/assets/logo.svg' width={"79px"} height={"49px"} />

        {userData ? (
          <img
            src={"/assets/menu.png"}
            width={"48px"}
            height={"48px"}
            onClick={toggleNav}
          />
        ) : (
          <div className='flex flex-row items-center gap-1'>
            <img src='/assets/user.svg' width={"16px"} height={"16px"} />
            <p
              className='font-bold text-xs text-white cursor-pointer'
              onClick={openAuthModal}>
              {translate("locale.Login_Register")}
            </p>
          </div>
        )}

        <div
          className={`w-[216px] p-3 bg-white absolute top-[75px] rounded-lg end-0 z-[150] shadow-2xl ${
            openNav ? "flex" : "hidden"
          }`}>
          <div className='flex flex-col gap-2 items-start'>
            <NavLink
              isSelected={isSelected == 0}
              label={translate("locale.Home")}
              lang={lang}
              toggleNav={toggleNav}
            />
            <NavLink
              isSelected={isSelected == 1}
              label={translate("locale.My_Payments")}
              lang={lang}
              url='payments'
              toggleNav={toggleNav}
            />
            <NavLink
              isSelected={isSelected == 2}
              label={translate("locale.My_Units")}
              lang={lang}
              toggleNav={toggleNav}
              url='units'
            />
            <hr className='border-[0.5px] border-[#74777F] border-solid ' />
            <div className='p-2 border-[1px] border-white rounded-lg border-solid'>
              <img src='/assets/notify.svg' width={"24px"} height={"24px"} />
            </div>
          </div>
        </div>
      </div>
      <div className=' bg-red text-black h-[111px] hidden md:flex flex-row  items-center w-full justify-center z-[100]'>
        <div
          className={`flex flex-row items-center ${
            userData
              ? " gap-[269px]"
              : "justify-between w-full px-4 md:px-[150px]"
          }  `}>
          <img
            src='/assets/logo.svg'
            className='cursor-pointer'
            onClick={() => {
              router.push(`/${lang}`);
            }}
            width={"95px"}
            height={"59px"}
          />
          <div className={` flex items-center gap-4`}>
            <div
              className={`${
                userData ? "flex flex-row gap-20 items-center" : "hidden"
              } `}>
              <NavLink
                isSelected={isSelected == 0}
                label={translate("locale.Home")}
                lang={lang}
              />

              <NavLink
                isSelected={isSelected == 1}
                label={translate("locale.My_Payments")}
                lang={lang}
                url='payments'
              />
              <NavLink
                isSelected={isSelected == 2}
                label={translate("locale.My_Units")}
                lang={lang}
                url='units'
              />
              {userData ? (
                <div className='p-2 border-[1px] border-white rounded-lg border-solid'>
                  <img
                    src='/assets/notify.svg'
                    width={"24px"}
                    height={"24px"}
                    className='cursor-pointer'
                    onClick={openNotification}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            {userData ? (
              <>
                {" "}
                <hr className='border-white text-white border-[0.5px] h-10 flex flex-row ' />
                <div className='border-[1px] border-solid rounded-lg border-white  px-4 py-[11px] flex flex-row items-center justify-between  min-w-[245px]'>
                  <div className=' items-center flex flex-row gap-3'>
                    <img
                      src='/assets/profile.jpg'
                      className='rounded-[70px]'
                      width={"38px"}
                      height={"38px"}
                    />
                    <p className='text-base text-white underline'>
                      {userData?.firstName}
                    </p>
                  </div>
                  <img
                    src='/assets/down.png'
                    className='cursor-pointer'
                    height={"20px"}
                    width={"20px"}
                  />
                </div>
              </>
            ) : (
              <div className='flex flex-row items-center gap-1'>
                <img src='/assets/user.svg' width={"20px"} height={"20px"} />
                <p
                  className='font-bold text-sm text-white cursor-pointer'
                  onClick={openAuthModal}>
                  {translate("locale.Login_Register")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showNotifications ? (
        <div className='absolute top-0 end-0 flex  flex-row  justify-end  min-w-full min-h-screen bg-[#0000006e] z-[150]  '>
          <div className='w-[443px]  bg-white min-h-screen'>
            <div className='flex flex-row justify-between items-center  p-6 '>
              <p className='text-[#1E293B] font-semibold text-xl'>
                {translate("locale.Notifications")}
              </p>
              <img
                src='/assets/closeHead.png'
                className='!w-5 !h-5 cursor-pointer'
                onClick={closeNotification}
              />
            </div>
            <div className='mt-6'>
              {[1, 2, 3].map((item) => (
                <div
                  className={`p-6 border-b-[1px] border-gray-300   ${
                    item % 2 == 0 ? "bg-[#005fb033]" : ""
                  }`}>
                  <div className={`flex flex-row gap-3 items-start `}>
                    {item % 2 == 0 ? (
                      <p className='text-THEME_PRIMARY_COLOR text-xl '>•</p>
                    ) : (
                      ""
                    )}
                    <p className='text-sm text-[#555F71] font-semibold'>
                      برجاء التوجه الي مقرر المكتب الفني القبطي لأستكمال إجراءات
                      التعاقد والحصول علي نسخة العقد. يجب احضار بطاقة الرقم
                      القومي ودفتر . الشيكات الخاص بك في حالة السداد الآجل أو
                      استكمال قيمه الوحده بالكامل في حالة الدفع النقدي.
                    </p>
                  </div>
                  <p className='w-full text-end text-xs text-[#475569]'>
                    منذ ٤ ساعات
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Auth isModalOpen={openAuth} closeModal={closeAuthModal} />
    </>
  );
}

const NavLink = ({
  lang,
  isSelected,
  label,
  url,
  toggleNav,
}: {
  lang: string;
  isSelected: boolean;
  label: string;
  url?: string;
  toggleNav?: VoidFunction;
}) => {
  const router = useRouter();
  return (
    <p
      onClick={() => {
        router.push(`/${lang}${url ? `/${url}` : ""}`);
        toggleNav?.();
      }}
      className={`h-[33px] md:h-auto ${isSelected ? "bg" : ""} cursor-pointer ${
        isSelected
          ? `text-THEME_PRIMARY_COLOR text-base md:text-xl font-bold`
          : `text-[#84878B]  md:text-white  text-sm md:text-base font-semibold`
      }`}>
      {label}
    </p>
  );
};
