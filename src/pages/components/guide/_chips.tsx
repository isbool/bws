import React from "react";
import { Chip, Group, Loader } from "@mantine/core";

interface ChipsProps {
  api: any;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  multiSelect: boolean;
}

export function Chips({ api, selected, setSelected, multiSelect }: ChipsProps) {
  const items = api;
  const chips = items
    .sort((a: { id: number }, b: { id: number }) => a.id - b.id) // sort the items by their `id`
    .map((item:any) => (
      <Chip
        key={item.id.toString()+item.createdAt.toString()}
        value={item.id.toString()}
        checked={selected.some((selectedItem:any) => selectedItem.id === item.id)}
        onClick={() => {
          if (multiSelect) {
            const newSelected = [...selected];
            const itemIndex = newSelected.findIndex((selectedItem) => selectedItem.id === item.id);
            if (itemIndex > -1) {
              newSelected.splice(itemIndex, 1);
            } else {
              newSelected.push(item);
            }
            setSelected(newSelected);
          } else {
            setSelected([item]);
          }
        }}
      >
        {item?.title || item?.name }
      </Chip>
    ));
  // console.log(selected);
  return (
    //onChange={setSelected} value={selected.id.toString()}
    <>
      {selected ? (
        <Chip.Group  multiple={multiSelect} value={selected.map((item:any) => item.id.toString())}>
          <Group position="left">
          {chips}
          </Group>
        </Chip.Group>
      ) : (
        <Loader />
      )}
    </>
  );
}
