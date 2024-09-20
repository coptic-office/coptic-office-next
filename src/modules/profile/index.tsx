"use client";
import { getCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { UserInfo } from "@/src/types";
import { getUserInfo, updateMobile } from "@/src/network/auth";
import { ProfileImage } from "./components/profileImage";

import NationalBack from "./components/NationalBack";
import NationalFront from "./components/NationalFront";

export default function PersonalProfile() {
  const translate = useTranslations();
  const isLoggedIn = getCookie("user");
  const [userData, setUserData] = useState<UserInfo | null>();
  const router = useRouter();
  const locale = useLocale();
  const [uploadOpen, setUploadOpen] = useState(true);
  const [national_ID, setNational_ID] = useState({
    front: null,
    back: null,
  });

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else {
      getUserInfo(locale).then((response) => {
        setUserData(response.data.Message.user);
      });
    }
  }, []);

  const refreshData = (callback: VoidFunction) => {
    getUserInfo(locale).then((response) => {
      setUserData(response.data.Message.user);
      callback();
    });
  };

  return (
    <div className='z-10  flex-col gap-4 items-center justify-center  text-sm lg:flex w-full px-4 md:px-[150px]  bg-transparent'>
      <div
        id='myprofile'
        className='w-full  bg-white flex flex-col gap-4 rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] p-4 md:p-6'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-base md:text-2xl text-[#183B56] font-semibold rtl:font-medium'>
            {translate("locale.Personal_Profile")}
          </p>
        </div>
        <ProfileImage
          setUserData={setUserData}
          isEditOpen={true}
          userData={userData}
        />
        <div className='flex flex-col md:flex-row  gap-5 w-full'>
          <Input
            value={userData?.email?.primary as string}
            label='Email'
            refreshData={refreshData}
          />
          <Input
            isRtl={true}
            value={userData?.mobile?.primary?.number as string}
            label='Mobile_Number'
            refreshData={refreshData}
          />
        </div>
        <div className='flex gap-5 w-full md:w-1/2'>
          <Input
            isPassword
            value={"1234567890"}
            label={"Password"}
            refreshData={refreshData}
          />
        </div>
        <div className='w-full flex flex-col gap-[6px]'>
          <div
            className={`flex flex-row justify-between items-center mb-3 w-1/2 pe-2.5`}>
            <p className='text-[#555F71] text-sm ms-1 '>
              {translate(`locale.National_ID`)}
            </p>
            <button
              onClick={() => {
                setUploadOpen(true);
              }}
              className='h-8 w-[90px] rounded-md text-center text-white bg-THEME_PRIMARY_COLOR'>
              {translate("locale.Edit")}
            </button>
          </div>
          <div className='w-full flex-col md:flex-row gap-5 flex'>
            <NationalFront
              setEnabled={(value: boolean) => setUploadOpen(value)}
              enabled={uploadOpen}
              image={national_ID.front}
            />
            <NationalBack
              setEnabled={(value: boolean) => setUploadOpen(value)}
              enabled={uploadOpen}
              image={national_ID.front}
            />
          </div>
          <p className='text-sm text-THEME_ERROR_COLOR w-full text-center'>
            {translate("locale.National_ID_Error")}
          </p>
        </div>
      </div>
    </div>
  );
}
