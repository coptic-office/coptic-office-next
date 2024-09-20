"use client";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropper from "./imageCropper";

function NationalBack({
  image,
  setEnabled,
  enabled,
}: {
  image: any;
  setEnabled: (value: any) => void;
  enabled: boolean;
}) {
  const translate = useTranslations();
  const [file, setFile] = useState<any>();
  const [cropped, setCropped] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    disabled: !enabled,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      var form_data = new FormData();
      form_data.append("image", acceptedFiles?.[0]);
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setCropperOpen(true);
      setEnabled(false);
      setFile(acceptedFiles);
    },
  });
  return (
    <div
      className={`flex-1 rounded-lg min-h-[287px] w-full md:w-1/2 bg-center bg-no-repeat cursor-pointer  ${
        file?.[0]?.preview ? file?.[0]?.preview : "bg-hero-front bg-contain"
      } border-[1px] border-[#E3E7EA] placeholder:hidden`}
      {...getRootProps()}>
      {enabled ? <input {...getInputProps()} /> : null}
      {file?.[0]?.preview ? (
        <>
          {cropperOpen ? (
            <ImageCropper
              imageSrc={file?.[0]?.preview}
              setImageSrc={(data) => {
                setCropped(data);
                setCropperOpen(false);
                setEnabled(true);
              }}
            />
          ) : null}
          <img
            src={cropped ?? file?.[0]?.preview}
            className='object-cover w-full h-[287px]'
          />
        </>
      ) : (
        <div className='bg-[#ffffff66] h-[100px] min-w-full mt-[187px] flex flex-col justify-center items-center gap-4'>
          <img src='/assets/addImage.svg' />
          <p className='text-base font-semibold rtl:font-medium text-THEME_PRIMARY_COLOR'>
            {translate("locale.Front_Side")}
          </p>
        </div>
      )}
    </div>
  );
}
export default memo(NationalBack);
