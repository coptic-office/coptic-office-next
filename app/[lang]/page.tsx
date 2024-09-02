"use client";
import { useEffect } from "react";
import HomePage from "../modules/Home";
export default function Home(params: { params: any }) {
  useEffect(() => {
    if (window) {
      window.localStorage.setItem("lang", params?.params?.lang);
    }
  }, [window]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between mt-[245px] md:mt-[500px] z-[80] md:z-[100] bg-white  '>
      <HomePage lang={params?.params?.lang} />
    </main>
  );
}
