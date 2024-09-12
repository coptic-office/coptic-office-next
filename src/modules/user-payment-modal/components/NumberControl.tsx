export const NumberControl = ({
  isSelected,
  disabled,
  changeAmount,
  src,
}: {
  isSelected: boolean;
  disabled: boolean;
  changeAmount: VoidFunction;
  src: string;
}) => {
  return (
    <img
      src={`/assets/${src}.png`}
      width={"30px"}
      height={"30px"}
      className={`${
        isSelected || disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={() => {
        if (!disabled) {
          changeAmount();
        }
      }}
    />
  );
};
