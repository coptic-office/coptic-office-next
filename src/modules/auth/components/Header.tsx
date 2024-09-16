import { useTranslations } from "next-intl";

export const Header = ({
  title,
  description,
  marginBottom,
}: {
  title: string;
  description?: string;
  marginBottom?: string;
}) => {
  const translate = useTranslations('locale');

  return (
    <>
      <p className='text-xl md:text-[22px] mb-2 text-black font-semibold'>
        {translate(title)}
      </p>
      {description ? (
        <p
          className={`text-sm  text-black ${
            marginBottom ? marginBottom : "mb-6"
          } `}>
          {translate(description)}
        </p>
      ) : (
        ""
      )}
    </>
  );
};
