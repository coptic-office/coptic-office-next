import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { NavLink } from "./NavLink";
import { useAppContext } from "@/src/context";

export default function MobileMenu({
  openAuthModal,
  openNotification,
}: {
  openAuthModal: () => void;
  openNotification: () => void;
}) {
  const [isSelected, setIsSelected] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const { setIsLoggedIn } = useAppContext();
  const pathname = usePathname();
  const toggleNav = () => {
    setOpenNav(!openNav);
  };
  const translate = useTranslations();
  useEffect(() => {
    if (pathname?.includes("payments")) setIsSelected(1);
    else if (pathname.includes("units")) setIsSelected(2);
    else setIsSelected(0);
  }, [pathname]);

  const userData = getCookie("user")
    ? JSON.parse(getCookie("user") as string)
    : null; // => 'value'

  const router = useRouter();
  const locale = useLocale();

  return (
    <div
      id='mobileMEnu'
      className='flex  md:hidden justify-between items-center mx-6 py-4 relative  z-[100]  '>
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
          <img
            id='mobileMEnu1'
            src='/assets/user.svg'
            width={"16px"}
            height={"16px"}
          />
          <p
            id='mobileMEnu2'
            className='font-semibold text-xs text-white cursor-pointer'
            onClick={openAuthModal}>
            {translate("locale.Login_Register")}
          </p>
        </div>
      )}

      <div
        id='mobileMEnu3'
        className={`w-[216px] py-3 bg-white absolute top-[75px] rounded-lg end-0 z-[150] shadow-2xl ${
          openNav ? "flex" : "hidden"
        }`}>
        <div
          id='mobileMEnu4'
          className='flex   flex-col gap-3 items-start w-full'>
          <div
            id='mobileMEnu5'
            className='flex flex-col gap-1 items-start px-3 w-full'>
            <NavLink
              isSelected={isSelected == 0}
              label={translate("locale.Home")}
              toggleNav={toggleNav}
            />
            <NavLink
              isSelected={isSelected == 1}
              label={translate("locale.My_Payments")}
              url='payments'
              toggleNav={toggleNav}
            />
            <NavLink
              isSelected={isSelected == 2}
              label={translate("locale.My_Units")}
              toggleNav={toggleNav}
              url='units'
            />
          </div>
          <hr className='border-[0.5px] w-full border-[#74777F] opacity-25 border-solid ' />
          <div
            id='mobileMEnu6'
            onClick={() => {
              router.push(`/${locale}/profile#myprofile`);
              toggleNav();
            }}
            className='flex flex-row gap-2 items-center cursor-pointer px-3'>
            <img src='/assets/profile.svg' className='w-4 h-4' />
            <p className='text-base text-[#84878B] w-[170px] truncate hover:text-THEME_PRIMARY_COLOR'>
              {userData?.firstName} {userData?.lastName}
            </p>
          </div>
          <div
            id='mobileMEnu7'
            className='flex flex-row gap-2 items-center cursor-pointer px-3'
            onClick={() => {
              openNotification();
              toggleNav();
            }}>
            <img src='/assets/notification.svg' className='w-4 h-4' />
            <p className='text-base text-[#84878B] w-[170px] truncate hover:text-THEME_PRIMARY_COLOR'>
              {translate("locale.Notifications")}
            </p>
          </div>
          <div
            id='mobileMEnu8'
            className='flex flex-row gap-2 items-center cursor-pointer px-3'
            onClick={() => {
              router.replace(
                pathname.replace(`/${locale}`, locale == "en" ? "/ar" : "/en"),
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
            id='mobileMEnu9'
            className='flex flex-row gap-2 items-center cursor-pointer px-3'
            onClick={() => {
              deleteCookie("user");
              deleteCookie("authToken");
              setIsLoggedIn(false);
              localStorage.removeItem("authToken");

              router.push("/");
              toggleNav();
            }}>
            <img src='/assets/logout.svg' className='w-4 h-4' />
            <p className='text-base text-[#84878B] hover:text-THEME_PRIMARY_COLOR'>
              {translate("locale.Logout")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
