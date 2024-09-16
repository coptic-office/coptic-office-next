"use client";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./components/Input";
import { useDropzone } from "react-dropzone";
import { User } from "@/src/types";

export default function PersonalProfile() {
  const translate = useTranslations();
  const isLoggedIn = getCookie("user");
  const [userData, setUserData] = useState<User | null>();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState<any>();
  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else setUserData(JSON.parse(isLoggedIn));
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("dataURL START");

      const dataURL = reader.result;
      console.log("dataURL", dataURL);
      setFile(dataURL);
    };
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  return (
    <div className='z-10  flex-col gap-4 items-center justify-center  text-sm lg:flex w-full px-4 md:px-[150px]  bg-transparent'>
      <div className='w-full  bg-white flex flex-col gap-4 rounded-2xl -mt-[92px] border-x-[1px] border-solid border-[#E5EAF4] border-b-[1px] p-4 md:p-6'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-base md:text-2xl text-[#183B56] font-semibold'>
            {translate("locale.Personal_Profile")}
          </p>
          <button
            onClick={() => {
              setIsEditOpen(!isEditOpen);
            }}
            className='h-9 md:h-12 w-[135px] md:w-[181px] text-THEME_PRIMARY_COLOR border-[1px] border-THEME_PRIMARY_COLOR rounded-lg'>
            {translate(`locale.${isEditOpen ? "Save" : "Edit"}`)}
          </button>
        </div>
        <div className='mt-4 flex gap-[19px] items-start '>
          <div
            className='relative rounded-lg h-[102px] w-[102px] bg-center bg-no-repeat  border-[1px] border-[#E3E7EA] placeholder:hidden'
            {...getRootProps()}>
            <input {...getInputProps()} className='' />
            <img
              src={userData?.profilePhoto}
              className='object-cover w-[100px] h-[100px] rounded-2xl'
            />
            <div className='bg-[#ffffff66] h-[36px] min-w-full absolute left-0 top-[64px]  flex justify-center items-center '>
              <img src='/assets/addImage.svg' className='w-5 h-5 ' />
            </div>
          </div>
          <div>
            <p className='text-sm font-semibold mt-5'>
              {userData?.firstName} {userData?.lastName}
            </p>
            {isEditOpen ? (
              <div className='flex gap-[18px] mt-[26px] '>
                <button className=' px-1 md:px-3  py-[3px] md:py-[6px]  rounded-sm md:rounded-lg text-xs md:text-base text-THEME_PRIMARY_COLOR font-semibold  border-[1px] border-THEME_PRIMARY_COLOR text-center'>
                  {translate("locale.Delete_Image")}
                </button>
                <button className=' px-1 md:px-3   py-[3px] md:py-[6px] bg-THEME_PRIMARY_COLOR  rounded-sm md:rounded-lg text-xs md:text-base text-white font-semibold  border-[1px] border-THEME_PRIMARY_COLOR text-center'>
                  {translate("locale.Upload_Image")}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className='flex flex-col md:flex-row  gap-5 w-full'>
          <Input
            disabled={!isEditOpen}
            setValue={(value) => {
              setUserData({
                ...userData,
                email: value,
              } as User);
            }}
            value={userData?.email as string}
            label='Email'
            placeholder={translate(
              isEditOpen ? "locale.Add_Email" : "locale.No_Email"
            )}
          />
          <Input
            disabled={!isEditOpen}
            setValue={(value) =>
              setUserData({
                ...userData,
                mobile: {
                  ...userData?.mobile,
                  primary: {
                    ...(userData?.mobile?.primary as any),
                    number: value as string,
                  },
                },
              } as User)
            }
            value={userData?.mobile?.primary?.number as string}
            label='Mobile_Number'
          />{" "}
        </div>
        <div className='flex gap-5 w-full md:w-1/2'>
          <Input
            isPassword
            disabled
            setValue={() => {}}
            value={"1234567890"}
            label={translate("locale.Password")}
          />
        </div>
        <div className='w-full flex flex-col gap-[6px]'>
          <p className='text-[#555F71] text-sm ms-1 '>
            {translate(`locale.National_ID`)}
          </p>
          <div className='w-full flex-col md:flex-row gap-5 flex'>
            <div
              className={`flex-1 rounded-lg min-h-[287px] w-full md:w-1/2 bg-center bg-no-repeat cursor-pointer  ${
                file?.[0]?.preview
                  ? file?.[0]?.preview
                  : "bg-hero-front bg-contain"
              } border-[1px] border-[#E3E7EA] placeholder:hidden`}
              {...getRootProps()}>
              <input {...getInputProps()} className='' />
              {file?.[0]?.preview ? (
                <img
                  src={file?.[0]?.preview}
                  className='object-cover w-full h-[287px]'
                />
              ) : (
                <div className='bg-[#ffffff66] h-[100px] min-w-full mt-[187px] flex flex-col justify-center items-center gap-4'>
                  <img src='/assets/addImage.svg' />
                  <p className='text-base font-semibold text-THEME_PRIMARY_COLOR'>
                    {translate("locale.Front_Side")}
                  </p>
                </div>
              )}
            </div>
            <div
              className='flex-1 rounded-lg min-h-[287px] w-full md:w-1/2 bg-center bg-no-repeat  bg-hero-Back bg-contain border-[1px] border-[#E3E7EA] placeholder:hidden'
              {...getRootProps()}>
              <input {...getInputProps()} className='' />
              {file?.[0]?.preview ? (
                <img
                  src={file?.[0]?.preview}
                  className='object-cover w-full h-[287px]'
                />
              ) : (
                <div className='bg-[#ffffff66] h-[100px] min-w-full mt-[187px] flex flex-col justify-center items-center gap-4'>
                  <img src='/assets/addImage.svg' />
                  <p className='text-base font-semibold text-THEME_PRIMARY_COLOR'>
                    {translate("locale.Back_Side")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
