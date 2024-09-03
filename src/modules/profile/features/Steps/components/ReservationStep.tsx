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
        <p className='rounded-full text-THEME_PRIMARY_COLOR bg-white w-9 h-9 text-base font-bold flex items-center justify-center'>
          {stepNumber}
        </p>
      </div>
      <p className='text-2xl text-white font-bold maw-w-[400px]'>{label}</p>
    </div>
  );
};
