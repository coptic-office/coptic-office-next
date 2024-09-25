"use client";
import { useTranslations } from "next-intl";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropper from "./imageCropper";

function NationalBack({
  image,
  setEnabled,
  enabled,
  setNational_ID,
  setNationalType,
}: {
  image: any;
  setEnabled: (value: any) => void;
  enabled: boolean;
  setNational_ID: Dispatch<
    SetStateAction<{
      front: null;
      back: null;
    }>
  >;
  setNationalType: Dispatch<
    SetStateAction<{
      front: string;
      back: string;
    }>
  >;
}) {
  const translate = useTranslations();
  const [file, setFile] = useState<any>();
  const [cropped, setCropped] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const { getRootProps, getInputProps, open } = useDropzone({
    disabled: !enabled,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      setNationalType((prev) => {
        return { ...prev, back: acceptedFiles?.[0]?.type };
      });
      var form_data = new FormData();
      form_data.append("image", acceptedFiles?.[0]);
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      (document.getElementById("body") as any).style.overflow = "hidden";
      setCropperOpen(true);
      setEnabled(false);
      setFile(acceptedFiles);
    },
  });
  return (
    <div
      className={` rounded-lg  h-[250px] max-w-[350px] w-full md:w-[350px] bg-center bg-no-repeat cursor-pointer  ${
        file?.[0]?.preview ? file?.[0]?.preview : "bg-hero-Back bg-contain"
      } border-[1px] border-[#E3E7EA] placeholder:hidden`}
      {...getRootProps()}>
      {enabled ? <input {...getInputProps()} /> : null}
      {file?.[0]?.preview ? (
        <>
          {cropperOpen ? (
            <ImageCropper
              onCancel={() => {
                setFile(null);
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setCropperOpen(false);

                setEnabled(true);
              }}
              isNational={true}
              imageSrc={file?.[0]?.preview}
              setImageSrc={(data) => {
                setCropped(data);
                setCropperOpen(false);
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setEnabled(true);
                setNational_ID((prev) => {
                  return { ...prev, back: data };
                });
              }}
            />
          ) : null}
          <img
            src={cropped ?? file?.[0]?.preview}
            className='object-contain w-full h-[250px]'
          />
        </>
      ) : (
        <div className='bg-[#d9d9d999] h-[50px] min-w-full mt-[200px] flex px-3 flex-row justify-between items-center gap-4'>
          <p className='text-base font-semibold rtl:font-medium text-THEME_PRIMARY_COLOR'>
            {translate("locale.Back_Side")}
          </p>
          <img
            src='/assets/edit.png'
            onClick={open}
            className='cursor-pointer w-5 h-5  '
          />
        </div>
      )}
    </div>
  );
}
export default memo(NationalBack);
