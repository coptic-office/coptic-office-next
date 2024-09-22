import { Modal } from "@/src/components/Modal";
import Cropper, { ReactCropperElement } from "react-cropper";

import "cropperjs/dist/cropper.css";
import { createRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ImageCropper({
  imageSrc,
  setImageSrc,
  isNational,
}: {
  imageSrc: any;
  setImageSrc(data: any): void;
  isNational: boolean;
}) {
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = useState(imageSrc);
  const translate = useTranslations();
  useEffect(() => {
    setImage(imageSrc);
  }, [imageSrc]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const cropped = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCropData(cropped);
      setImageSrc(cropped);
    }
  };

  return (
    <div className='z-[1000]'>
      <div
        className={`fixed top-0 pt-0 md:pt-8  left-0 min-w-full  overflow-hidden flex justify-center  min-h-[100vh] bg-[#00000073]  z-[300] px-3 md:px-[150px] `}>
        <div className=' rounded-lg bg-white w-[95%] md:w-[380px] h-[300px] md:h-[380px] flex flex-col gap-3 justify-between p-6 items-center'>
          <Cropper
            ref={cropperRef}
            zoomable={true}
            preview='.img-preview'
            src={image}
            viewMode={1}
            cropBoxResizable={false}
            movable={true}
            aspectRatio={isNational ? 2 : 1}
            minCropBoxHeight={isNational ? 220 : 250}
            minCropBoxWidth={isNational ? 350 : 250}
            background={false}
            responsive={true}
            checkOrientation={false}
          />
          <button
            className='bg-THEME_PRIMARY_COLOR rounded-lg h-10 w-[181px] text-center text-white'
            onClick={getCropData}>
            {translate('locale.Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
