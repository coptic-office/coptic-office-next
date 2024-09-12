import { useState } from "react";
import Select from "react-select";
export const ReactSelect = ({ selectedUnit, unitIds, onSelect }: any) => {
  return (
    <Select
      value={selectedUnit?.unitId}
      onChange={(value) => {
        onSelect(unitIds?.[value.index]);
      }}
      placeholder={selectedUnit?.unitId}
      options={unitIds?.map((item: any, index: number) => {
        return {
          label: item?.unitId,
          value: item?.unitId,
          index: index,
        };
      })}
      className="text-black placeholder:text-black"
      closeMenuOnSelect={true}
      maxMenuHeight={200}
    />
  );
};
