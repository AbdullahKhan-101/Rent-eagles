import React from "react";
import { Slider } from "@nextui-org/react";

const VehicleYears = ({ years, setYears }) => {
  return (
    <div className=" px-4 pb-5 pt-2 w-full">
      <p className="text-[14px] mb-2 text-web_darkgray font-bold">
        VEHICLE YEARS
      </p>
      <div className="flex  flex-col w-full h-full min-w-[260px] items-start justify-center">
        <p className="text-small mb-3 font-semibold">
          {years[0] === 1950 && years[1] === 2024
            ? "All Years"
            : Array.isArray(years) && years.map((b) => `${b}`).join(" – ")}
        </p>
        <Slider
          label=""
          step={1}
          maxValue={2024}
          minValue={1950}
          value={years}
          size="sm"
          onChange={setYears}
          classNames={{
            base: "max-w-lg gap-3",
            track: "",
            filler: " bg-[#99000B]",
          }}
          renderThumb={(props) => (
            <div
              {...props}
              className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
            >
              <span className="transition-transform bg-[#99000B] shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default VehicleYears;
