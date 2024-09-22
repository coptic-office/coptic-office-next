"use client";
import { getCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { UserInfo } from "@/src/types";
import { getUserInfo, updateNationalId } from "@/src/network/auth";
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
   const [NationalType, setNationalType] = useState({
     front: '',
     back: '',
   });
  const [isNationalChanged, setIsNationalChanged] = useState(false)
  const [National_ID_Error,setNational_ID_Error]=useState(false)

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
  const submitNational = () =>
  {
    if (!national_ID.front || !national_ID.back)
    {
      setNational_ID_Error(true)
    }
    else
    {
    
     const file1 = base64ToFile(
       (national_ID.front as any)?.split(",")?.[1] as any,
       `nationalFront.${NationalType.front?.split("/")[1]}`,
       NationalType.front as string
     );
       const file2 = base64ToFile(
         (national_ID.back as any)?.split(",")?.[1] as any,
         `nationalBack.${NationalType.back?.split("/")[1]}`,
         NationalType.back as string
       );
      var form_data = new FormData();
        form_data.append('images',file1)
        form_data.append("images", file2);
      
      updateNationalId(form_data, locale).then(() => {
        refreshData(() => {
          router.refresh();
        });
      });

      }
}
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
          refreshData={refreshData}
        />
        <div className='flex flex-col md:flex-row  gap-5 md:gap-[50px] w-full'>
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
        <div className='flex flex-row  gap-5 md:gap-[50px] w-full '>
          <Input
            isPassword
            value={"1234567890"}
            label={"Password"}
            refreshData={refreshData}
          />
          <div className='hidden md:flex flex-1'></div>
        </div>
        <div className='w-full flex flex-col gap-[6px]'>
          <div
            className={`flex flex-row justify-between items-center mb-3 w-1/2 pe-2.5`}>
            <p className='text-[#555F71] text-sm ms-1 '>
              {translate(`locale.National_ID`)}
            </p>
          </div>
          <div className='w-full flex-col items-center md:flex-row gap-5 flex'>
            <NationalFront
              setEnabled={(value: boolean) => setUploadOpen(value)}
              enabled={uploadOpen}
              image={national_ID.front}
              setNational_ID={(value) => {
                setNational_ID(value);
                setIsNationalChanged(true);
              }}
              setNationalType={setNationalType}
            />
            <NationalBack
              setEnabled={(value: boolean) => setUploadOpen(value)}
              enabled={uploadOpen}
              image={national_ID.front}
              setNational_ID={(value) => {
                setNational_ID(value);
                setIsNationalChanged(true);
              }}
              setNationalType={setNationalType}
            />
            {!isNationalChanged ? null : (
              <button
                onClick={submitNational}
                className='h-8 w-[90px] rounded-md text-center text-white bg-THEME_PRIMARY_COLOR'>
                {translate("locale.Save")}
              </button>
            )}
          </div>
          {National_ID_Error ? (
            <p className='text-sm text-THEME_ERROR_COLOR w-full text-center'>
              {translate("locale.National_ID_Error")}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}



 function base64ToBlob(base64: string, contentType = "", sliceSize = 512) {
   const byteCharacters = atob(base64);
   const byteArrays = [];

   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
     const slice = byteCharacters.slice(offset, offset + sliceSize);
     const byteNumbers = new Array(slice.length);
     for (let i = 0; i < slice.length; i++) {
       byteNumbers[i] = slice.charCodeAt(i);
     }
     const byteArray = new Uint8Array(byteNumbers);
     byteArrays.push(byteArray);
   }

   return new Blob(byteArrays, { type: contentType });
 }

 // Function to convert Base64 to a File object
 function base64ToFile(base64: string, filename: string, mimeType: string) {
   const blob = base64ToBlob(base64, mimeType);

   // Create the File object from the Blob
   const file = new File([blob], filename, {
     type: mimeType,
     lastModified: new Date().getTime(),
   });

   // Optionally, add a preview URL
   (file as any).preview = URL.createObjectURL(file); // preview is custom (not part of File spec)
   return file;
 }