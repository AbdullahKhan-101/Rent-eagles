import { vehicleBrands } from "@/data/car";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

const VehicleMakes = ({ selectedValue, selectedKeys, setSelectedKeys }) => {
  return (
    <div className=" px-4 pb-5 pt-2 w-full">
      <p className="text-[14px] mb-2 text-web_darkgray font-bold flex items-center gap-2">
        VEHICLE MAKES
        {selectedValue !== "text" && (
          <span
            onClick={() => setSelectedKeys(new Set(["text"]))}
            className="bg-gray-400 hover:bg-gray-500/90 transition text-white rounded-full w-4 h-4 px-[4px] pt-[1.4px] text-center leading-3 font-normal text-[12px]"
          >
            x
          </span>
        )}
      </p>
      <Dropdown>
        <DropdownTrigger className="w-full text-left">
          <Button variant="bordered" className="rounded-md text-left">
            {selectedValue === "text" ? "Select" : selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="w-full lg:min-w-[360px] max-h-[300px] overflow-y-auto custom_dropdown "
        >
          {vehicleBrands.map((item) => (
            <DropdownItem key={item.key}>{item.value}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default VehicleMakes;
