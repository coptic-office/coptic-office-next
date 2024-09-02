import { useState } from "react";
import { useTranslation } from "@/app/i18n";

export const Header = ({
  title,
  description,
  marginBottom,
}: {
  title: string;
  description?: string;
  marginBottom?: string;
}) => {
  const [i18n, setI18n] = useState<any>(null);
  useTranslation(localStorage.getItem("lang")).then((value: any) => {
    setI18n(value);
  });
  return (
    <>
      <p className='text-xl md:text-[22px] mb-2 text-black font-bold'>
        {i18n?.translate(title)}
      </p>
      {description ? (
        <p
          className={`text-sm  text-black ${
            marginBottom ? marginBottom : "mb-6"
          } `}>
          {i18n?.translate(description)}
        </p>
      ) : (
        ""
      )}
    </>
  );
};
