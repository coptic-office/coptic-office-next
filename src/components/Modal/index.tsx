"use client";
import { useEffect } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    (document.getElementById("body") as any).style.overflow = "hidden";
  }, []);

  return (
    <div
      id='modal'
      className='absolute top-0  pt-7 md:pt-0 left-0 min-w-full  overflow-scroll flex justify-center items-center min-h-[100vh] bg-[#00000073]  z-[300] px-3 md:px-[150px]'>
      {children}
    </div>
  );
};
