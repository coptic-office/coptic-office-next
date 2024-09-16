"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useAppContext } from "@/src/context";

export default function UserMenu({
  openAuthModal,
}: {
  openAuthModal: () => void;
}) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setIsLoggedIn } = useAppContext();

  const router = useRouter();
  const translate = useTranslations();
  const locale = useLocale();

  const userData = getCookie("user")
    ? JSON.parse(getCookie("user") as string)
    : null; // => 'value'
  return (
    <>
      {userData ? (
        <hr className='border-white text-white border-[0.5px] h-10 flex flex-row ' />
      ) : (
        ""
      )}
      {userData ? (
        <div className='border-0 relative'>
          {" "}
          <div
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className='border-[1px]  border-solid rounded-lg border-white  px-4 py-[11px] flex flex-row items-center justify-between  w-[245px] relative cursor-pointer'>
            <div className=' items-center flex flex-row gap-3 cursor-pointer'>
              <img
                src={userData?.profilePhoto ?? "/assets/profile.jpg"}
                className='rounded-[70px] !h-[38px]'
                width={"38px"}
                height={"38px"}
              />
              <p className='text-base text-white underline truncate w-[150px]'>
                {`${userData?.firstName as any} ${userData?.lastName as any}`}
              </p>
            </div>
            <img
              src='/assets/down.png'
              className={`cursor-pointer ${isUserMenuOpen ? "rotate-180" : ""}`}
              height={"20px"}
              width={"20px"}
            />
          </div>
          {isUserMenuOpen ? (
            <div
              className={`w-[245px] flex flex-col gap-4 absolute p-4 bg-white  top-[55px] rounded-b-lg  rounded-t-none  start-0 z-[150] shadow-2xl `}>
              <div
                onClick={() => {
                  setIsUserMenuOpen(false);
                  router.push(`/${locale}/profile`);
                }}
                className='flex flex-row gap-2 items-center cursor-pointer'>
                <img src='/assets/profile.svg' className='w-4 h-4' />
                <p className='text-base text-[#84878B] w-[170px] truncate hover:text-THEME_PRIMARY_COLOR'>
                  {userData?.firstName} {userData?.lastName}
                </p>
              </div>
              <div
                className='flex flex-row gap-2 items-center cursor-pointer'
                onClick={() => {
                  router.replace(
                    pathname.replace(
                      `/${locale}`,
                      locale == "en" ? "/ar" : "/en"
                    ),
                    {
                      scroll: true,
                    }
                  );
                }}>
                <img src='/assets/changeLang.png' className='w-4 h-4' />
                <p className='text-base text-[#84878B] hover:text-THEME_PRIMARY_COLOR'>
                  {translate("locale.Switch_Language")}
                </p>
              </div>
              <div
                className='flex flex-row gap-2 items-center cursor-pointer'
                onClick={() => {
                  deleteCookie("user");
                  deleteCookie("authToken");
                  setIsLoggedIn(false);
                  localStorage.removeItem("authToken");
                  router.push("/");
                }}>
                <img src='/assets/logout.svg' className='w-4 h-4' />
                <p className='text-base text-[#84878B] hover:text-THEME_PRIMARY_COLOR'>
                  {translate("locale.Logout")}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className='flex flex-row items-center gap-1'>
          <img src='/assets/user.svg' width={"20px"} height={"20px"} />
          <p
            className='font-semibold text-sm text-white cursor-pointer'
            onClick={openAuthModal}>
            {translate("locale.Login_Register")}
          </p>
        </div>
      )}
    </>
  );
}
