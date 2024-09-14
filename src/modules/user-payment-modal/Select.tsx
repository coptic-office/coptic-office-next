import Select from "react-select";
export const ReactSelect = ({ selectedUnit, unitIds, onSelect }: any) => {
  return (
    <Select
      value={selectedUnit?.unitId}
      onChange={(value) => {
        onSelect(unitIds?.[value.index]);
      }}
      isSearchable={false}
      placeholder={selectedUnit?.unitId}
      options={unitIds?.filter((item:any)=>(item?.unitId !="" && item?.unitId!=null) )?.map((item: any, index: number) => {
        return item?.unitId
          ? {
              label: item?.unitId,
              value: item?.unitId,
              index: index,
            }
          : null;
      })}
      className='text-black placeholder:text-black'
      closeMenuOnSelect={true}
      maxMenuHeight={200}
    />
  );
};
