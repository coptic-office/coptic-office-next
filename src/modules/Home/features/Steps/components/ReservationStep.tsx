export const ReservationStep = ({
  label,
  stepNumber,
}: {
  label: string;
  stepNumber: number;
}) => {
  return (
    <div className='flex flex-row gap-2 '>
      <div className='mt-2 ltr:mt-1 rounded-full border-[1px] border-[#f0f0f04d] p-[6px] w-12 h-12 flex items-center justify-center'>
        <p className='rounded-full text-THEME_PRIMARY_COLOR bg-white w-9 h-9 text-base font-semibold flex items-center justify-center'>
          {stepNumber}
        </p>
      </div>
      <p className='text-xl text-white font-semibold max-w-full md:max-w-[400px]'>
        {label}
      </p>
    </div>
  );
};
