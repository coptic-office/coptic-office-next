"use client";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { useTranslations } from "next-intl";

export const ImageSlider = ({ lang }: { lang: string }) => {
  const translate = useTranslations();

  return (
    <div className=' h-[350px] md:h-[700px] w-full absolute top-0 z-50'>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        className='mySwiper'
        modules={[Pagination, Autoplay]}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SwiperSlide>
            <Slide
              handleClick={() => {}}
              src={`/assets/slider${item}.jpg`}
              label={translate("locale.Book_Now")}
              desc={translate("locale.New_Cairo")}
              headText={translate("locale.Coptic_Cemeteries")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <img
        src='/assets/wave.svg'
        className='w-full h-[100px] md:h-[180px] absolute bottom-0 md:-bottom-1 z-[100] object-cover'
      />
    </div>
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
        src={src}
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
      <button className='absolute bottom-[161px] md:bottom-[240px] w-[106px] md:w-[196px] h-[30px] md:h-[56px] z-[100] bg-white text-THEME_PRIMARY_COLOR text-base md:text-[28px] font-bold rounded-2xl'>
        {label}
      </button>
    </div>
  );
};
