"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Auth } from "@/src/modules/auth";
import { getCookie } from "cookies-next";
import MobileMenu from "./components/MobileMenu";
import NotificationModal from "./components/Notifications";
import { NavLink } from "./components/NavLink";
import UserMenu from "./components/userMenu";
import { useAppContext } from "@/src/context";
import React from "react";

export default function Header() {
  const [isSelected, setIsSelected] = useState(0);
  const [openAuth, setOpenAuth] = useState(false);
  const pathname = usePathname();
  const { currentRunningModal, setCurrentModal, notifyCount } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    if (currentRunningModal == "Auth") {
      setOpenAuth(true);
    }
  }, [currentRunningModal]);
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
    setCurrentModal("");
    setOpenAuth(false);
    (document.getElementById("body") as any).style.overflow = "scroll";
  };

  const router = useRouter();
  const translate = useTranslations();
  const locale = useLocale();
  useEffect(() => {
    if (pathname?.includes("payments")) setIsSelected(1);
    else if (pathname.includes("units")) setIsSelected(2);
    else setIsSelected(0);
  }, [pathname]);

  const userData = getCookie("user")
    ? JSON.parse(getCookie("user") as string)
    : null; // => 'value'

  return (
    <>
      <MobileMenu
        openNotification={openNotification}
        openAuthModal={openAuthModal}
      />
      <div className=' relative bg-red text-black h-[111px] hidden md:flex flex-row  items-center w-full justify-center z-[100]'>
        <div
          className={`flex flex-row items-center ${
            userData
              ? " gap-[269px]"
              : "justify-between w-full px-4 md:px-[150px]"
          }  `}>
          <img
            src='https://s3.eu-west-3.amazonaws.com/images.copticoffice.com/logo_white_256x158.svg'
            className='cursor-pointer'
            onClick={() => {
              router.push(`/${locale}`);
            }}
            width={"140px"}
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
              />

              <NavLink
                isSelected={isSelected == 1}
                label={translate("locale.My_Payments")}
                url='payments'
              />
              <NavLink
                isSelected={isSelected == 2}
                label={translate("locale.My_Units")}
                url='units'
              />
              {userData ? (
                <div className='p-2 border-[1px] relative border-white rounded-lg border-solid'>
                  <p className='bg-white rounded-[50%] min-w-7 min-h-7  text-center p-1 font-semibold text-sm absolute -end-3 -top-3 text-THEME_PRIMARY_COLOR'>
                    {notifyCount ?? userData?.notifications?.newCount ?? 0}
                  </p>
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
            <UserMenu openAuthModal={openAuthModal} />
          </div>
        </div>
      </div>
      {showNotifications ? (
        <NotificationModal closeNotification={closeNotification} />
      ) : (
        ""
      )}
      <Auth
        isModalOpen={openAuth || currentRunningModal == "Auth"}
        closeModal={closeAuthModal}
      />
    </>
  );
}
