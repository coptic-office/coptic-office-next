"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import { Modal } from "./Modal";
import { PaymentOptionsModal } from "../modules/user-payment-modal/PaymentOptionsModal";
import { PaymentModal } from "../modules/user-payment-modal/PaymentModal";
import { useAppContext } from "../context";
import { usePathname } from "next/navigation";
import { SelectUnitModal } from "../modules/select-unit-modal";
import { getCookie } from "cookies-next";

export const ImageSlider = () => {
  const translate = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const { isLoggedIn, setCurrentModal, currentRunningModal } = useAppContext();
  const slides = [
    "/1-Front1.jpg",
    "/2-Elevation.jpg",
    "/3-Plan2.jpg",
    "/4-Front2.jpg",
    "/5-Plan1.jpg",
    "/6-Gates.jpg",
  ];
  useEffect(() => {
    if (currentRunningModal == "payment") {
      if (getCookie("user")) setIsModalOpen(true);
      else setCurrentModal("Auth");
    }
  }, [currentRunningModal]);
  return (
    <>
      <div className=' h-[350px] md:h-[700px] w-full absolute top-0 z-50'>
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={true}
        
          className='mySwiper'
          modules={[Pagination, Autoplay]}>
          {slides.map((item) => (
            <SwiperSlide>
              <Slide
                handleClick={() => {
                  if (isLoggedIn && getCookie("user")) {
                    setIsModalOpen(true);
                  } else {
                    setCurrentModal?.("Auth");
                  }
                }}
                src={item}
                label={translate("locale.Book_Now")}
                desc={translate("locale.New_Cairo")}
                headText={translate("locale.Coptic_Cemeteries")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src='/assets/WaveWavy.svg'
          className='w-full h-[100px] md:h-[180px] absolute bottom-0 md:-bottom-1 z-[100] object-cover'
        />
      </div>
      {isModalOpen || currentRunningModal == "payment" ? (
        <Modal isTopCentered={isPayOpen ? false : true}>
          {isPayOpen ? (
            <PaymentModal
              closeModal={() => {
                setCurrentModal("");
                setIsModalOpen(false);
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setIsPayOpen(false);
              }}
            />
          ) : (
            <PaymentOptionsModal
              closeModal={() => {
                setCurrentModal("");
                setIsModalOpen(false);
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setIsPayOpen(false);
              }}
              onClick={() => {
                setIsPayOpen(true);
              }}
            />
          )}
        </Modal>
      ) : null}
      {currentRunningModal == "select" ? (
        <Modal isTopCentered={false}>
          <SelectUnitModal
            closeModal={() => {
              (document.getElementById("body") as any).style.overflow =
                "scroll";
            }}
          />
        </Modal>
      ) : null}
    </>
  );
};

export const Slide = ({
  src,
  label,
  headText,
  desc,
  handleClick,
}: {
  src: string;
  label: string;
  handleClick: VoidFunction;
  headText: string;
  desc: string;
}) => {
  return (
    <div className='relative h-[350px] md:h-[700px] w-full justify-center flex'>
      <div className='absolute min-h-[350px] md:min-h-[700px] min-w-full bg-gradient-to-b from-[#005faf66] to-[#005faf33] z-[80] '></div>
      <img
        src={`https://s3.eu-west-3.amazonaws.com/images.copticoffice.com/app${src}`}
        width={"100%"}
        className={`sliderImg h-[350px] md:!h-[700px]  ${
          src.includes("5") ? "object-top" : "object-right"
        } object-cover`}
      />
      <div className='flex flex-col gap-[2px] md:gap-8 items-center z-[100] absolute bottom-[207px] md:bottom-[335px]'>
        <p className='text-lg font-bold md:text-[48px] text-white'>
          {headText}
        </p>
        <p className='text-sm font-bold md:text-[38px] text-white'>{desc}</p>
      </div>
      <button
        className='absolute bottom-[161px] md:bottom-[240px] w-[106px] md:w-[196px] h-[30px] md:h-[56px] z-[100] bg-white text-THEME_PRIMARY_COLOR text-base ltr:md:text-xl rtl:md:text-xl font-bold rounded-2xl cursor-pointer'
        onClick={handleClick}>
        {label}
      </button>
    </div>
  );
};
