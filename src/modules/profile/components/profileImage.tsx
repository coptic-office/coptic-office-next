import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { deletePhoto, updatePhoto } from "@/src/network/auth";
import { useTranslations } from "next-intl";
import { getCookie, setCookie } from "cookies-next";
import { LoadingSpinner } from "../../auth/components/loading";
import { User } from "@/src/types";
import { useRouter } from "next/navigation";

export const ProfileImage = ({
  isEditOpen,
}: {
  userData: any;
  isEditOpen: boolean;
  setUserData: Dispatch<SetStateAction<User | null | undefined>>;
}) => {
  const isLoggedIn = getCookie("user");
  const router = useRouter();
  const [userData, setUserData] = useState<User>();
  const [profileImage, setProfileImage] = useState<{
    preview: any;
    file: any;
  }>();
  const [loading, setLoading] = useState({ delete: false, update: false });
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  const translate = useTranslations();
  const onDelete = () => {
    setLoading({ ...loading, delete: true });
    deletePhoto("en")
      .then((response) => {
        setLoading({ ...loading, delete: false });
        setUserData({
          ...userData,
          profilePhoto: response?.data?.message?.profilePhoto,
        } as User);
        setCookie(
          "user",
          JSON.stringify({
            ...userData,
            profilePhoto: response?.data?.message?.profilePhoto,
          })
        );
      })
      .catch((err) => {
        setLoading({ ...loading, delete: false });
      });
  };
  const onSave = () => {
    setLoading({ ...loading, update: true });
    var form_data = new FormData();
    form_data.append("image", profileImage?.file?.[0]);
    updatePhoto(form_data, "en")
      .then((response) => {
        setLoading({ ...loading, update: false });
        setIsUploadDisabled(true);
        setUserData({
          ...userData,
          profilePhoto: response?.data?.message?.profilePhoto,
        } as User);
        setCookie(
          "user",
          JSON.stringify({
            ...userData,
            profilePhoto: response?.data?.message?.profilePhoto,
          })
        );
      })
      .catch(() => {
        setLoading({ ...loading, update: false });
      });
  };

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else setUserData(JSON.parse(isLoggedIn));
  }, []);
  useEffect(() => {
    if (profileImage?.file) {
      setIsUploadDisabled(false);
    } else setIsUploadDisabled(true);
  }, [profileImage]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      const profileUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setProfileImage({
        preview: profileUrl,
        file: acceptedFiles,
      });
    },
    disabled: !isEditOpen,
  });
  return (
    <div className='mt-4 flex gap-[19px] items-start '>
      <div
        aria-disabled={true}
        className='relative cursor-pointer rounded-lg h-[102px] w-[102px] bg-center bg-no-repeat  border-[1px] border-[#E3E7EA] placeholder:hidden'
        {...getRootProps()}>
        <input
          className='cursor-pointer'
          {...getInputProps()}
          disabled={!isEditOpen}
        />
        <img
          src={profileImage?.preview?.[0]?.preview ?? userData?.profilePhoto}
          className='object-cover w-[100px] h-[100px] rounded-2xl'
        />
        <div className='bg-[#ffffff66] h-[36px] min-w-full absolute left-0 top-[64px]  flex justify-center items-center '>
          <img src='/assets/addImage.svg' className='w-5 h-5 ' />
        </div>
      </div>
      <div>
        <p className='text-sm font-semibold rtl:font-medium mt-5'>
          {userData?.firstName} {userData?.lastName}
        </p>
        {isEditOpen ? (
          <div className='flex gap-[18px] mt-[26px] '>
            <button
              onClick={onDelete}
              className=' px-1 md:px-3  py-[3px] md:py-[6px]  rounded-sm md:rounded-lg text-xs md:text-base text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium  border-[1px] border-THEME_PRIMARY_COLOR text-center'>
              {loading.delete ? (
                <LoadingSpinner />
              ) : (
                translate("locale.Delete_Image")
              )}
            </button>
            <button
              disabled={isUploadDisabled}
              onClick={onSave}
              className=' px-1 md:px-3  flex items-center justify-center disabled:opacity-45  py-[3px] md:py-[6px] bg-THEME_PRIMARY_COLOR  rounded-sm md:rounded-lg text-xs md:text-base text-white font-semibold rtl:font-medium  border-[1px] border-THEME_PRIMARY_COLOR text-center'>
              {loading.update ? (
                <LoadingSpinner />
              ) : (
                translate("locale.Upload_Image")
              )}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
