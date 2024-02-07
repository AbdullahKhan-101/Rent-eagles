import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

const GreenVehicle = ({ greenVehicleas, setGreenVehicleas }) => {
  return (
    <div className=" px-4 pb-5 pt-2 w-full">
      <p className="text-[14px] mb-2 text-web_darkgray font-bold flex items-center gap-2">
        GREEN VEHICLES
        {greenVehicleas && (
          <span
            onClick={() => setGreenVehicleas("")}
            className="bg-gray-400 hover:bg-gray-500/90 transition text-white rounded-full w-4 h-4 px-[4px] pt-[1.4px] text-center leading-3 font-normal text-[12px]"
          >
            x
          </span>
        )}
      </p>
      <Dropdown className="w-full">
        <DropdownTrigger className="w-full text-left">
          <Button variant="bordered" className="rounded-md text-left">
            {greenVehicleas ? greenVehicleas : "Select"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="" aria-label="Static Actions" className="w-full">
          <DropdownItem isReadOnly key="new" className="w-full">
            <div className="w-full lg:min-w-[340px] flex gap-4">
              <div className="flex-1">
                <Checkbox
                  color="danger"
                  isSelected={greenVehicleas === "electric"}
                  onValueChange={() => setGreenVehicleas("electric")}
                  size="sm"
                  className="block"
                >
                  Electric
                </Checkbox>
                <Checkbox
                  color="danger"
                  isSelected={greenVehicleas === "hybrid"}
                  onValueChange={() => setGreenVehicleas("hybrid")}
                  size="sm"
                  className="block mt-1"
                >
                  Hybrid
                </Checkbox>
              </div>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default GreenVehicle;

export const Transmission = ({
  selectedTransmissionValue,
  selectedTransmission,
  setSelectedTransmission,
}) => {
  return (
    <div className=" px-4 pb-5 pt-2 w-full">
      <p className="text-[14px] mb-2 text-web_darkgray font-bold flex items-center gap-2">
        TRANSMISSION
        {selectedTransmissionValue !== "text" && (
          <span
            onClick={() => setSelectedTransmission(new Set(["text"]))}
            className="bg-gray-400 hover:bg-gray-500/90 transition text-white rounded-full w-4 h-4 px-[4px] pt-[1.4px] text-center leading-3 font-normal text-[12px]"
          >
            x
          </span>
        )}
      </p>
      <Dropdown>
        <DropdownTrigger className="w-full text-left">
          <Button variant="bordered" className="rounded-md text-left">
            {selectedTransmissionValue === "text"
              ? "Select"
              : selectedTransmissionValue}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedTransmission}
          onSelectionChange={setSelectedTransmission}
          className="w-full lg:min-w-[360px] max-h-[300px] overflow-y-auto custom_dropdown "
        >
          <DropdownItem key="manual">Manual</DropdownItem>
          <DropdownItem key="automatic">Automatic</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
