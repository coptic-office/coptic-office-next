export const RadioButton = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: (value: boolean) => void;
}) => {
  const onClick = () => {
    onSelect(true);
  };
  return (
    <div className='flex gap-1 md:gap-2.5 items-center'>
      <div
        onClick={onClick}
        className={`w-6 h-6 rounded-[20px] flex flex-row justify-center items-center border-[2px] ${
          selected ? " border-THEME_PRIMARY_COLOR" : " border-[#D1DAE6]"
        }  `}>
        {selected ? (
          <p
            onClick={onClick}
            className='w-4 h-4  rounded-[20px] bg-THEME_PRIMARY_COLOR'></p>
        ) : (
          ""
        )}
      </div>
      <p className='text-base md:text-xl text-[#74777F] font-semibold'>{label}</p>
    </div>
  );
};
