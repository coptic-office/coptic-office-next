"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { useTranslation } from "@/app/i18n";

export const ImageSlider = ({ lang }: { lang: string }) => {
  const [i18n, setI18n] = useState<any>(null);
  useTranslation(lang).then((value: any) => {
    setI18n(value);
  });
  return (
    <div className=' h-[350px] md:h-[700px] w-full absolute top-0 z-50'>
      {/* <div className='absolute top-0 left-0 bg-gradient-to-b from-[#005fb066] z-[100] to-transparent min-h-[150px] md:min-h-[300px]  min-w-full'></div> */}
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        className='mySwiper'
        autoplay
        modules={[Pagination]}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SwiperSlide>
            <Slide
              handleClick={() => {}}
              src={`/assets/slider${item}.jpg`}
              label={i18n?.translate("Book_Now")}
              desc={i18n?.translate("New_Cairo")}
              headText={i18n?.translate("Coptic_Cemeteries")}
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
      <img
        src={src}
        width={"100%"}
        className='sliderImg h-[350px] md:!h-[700px]'
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
