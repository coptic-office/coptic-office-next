import { Modal } from "@/src/components/Modal";
import Cropper, { ReactCropperElement } from "react-cropper";

import "cropperjs/dist/cropper.css";
import { createRef, useEffect, useState } from "react";

export default function ImageCropper({
  imageSrc,
  setImageSrc,
}: {
  imageSrc: any;
  setImageSrc(data: any): void;
}) {
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = useState(imageSrc);
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
        <div className='bg-white w-[380px] h-[380px] flex flex-col gap-3 justify-center items-center'>
          <Cropper
            ref={cropperRef}
            zoomable={false}
            preview='.img-preview'
            src={image}
            viewMode={2}
            minCropBoxHeight={350}
            minCropBoxWidth={220}
            background={false}
            responsive={true}
            checkOrientation={false}
          />
          <button
            className='bg-THEME_PRIMARY_COLOR h-10 w-[181px] text-center text-white'
            onClick={getCropData}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
