"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { carFeaturesAll, vehicleBrands } from "@/data/car";
import VehicleYears from "./Filters/VehicleYears";
import GreenVehicle, { Transmission } from "./Filters/GreenVehicle";
import VehicleMakes from "./Filters/VehicleMakes";
import NumberOfSeats from "./Filters/NumberOfSeats";
import { Searchparams } from "@/Utils/searchParams";

const Filters = ({ cars, setCars }) => {
  const [dailyPrice, setDailyPrice] = useState("");
  const [priceRange, setPriceRange] = useState([10, 10000]);
  const [years, setYears] = useState([1950, 2024]);

  const [carFeatures, setCarFeatures] = useState({});
  const [greenVehicleas, setGreenVehicleas] = useState("");

  const handleCheckboxChange = (feature) => {
    setCarFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const selectedFeatures = Object.keys(carFeatures).filter(
    (feature) => carFeatures[feature]
  );

  const [isSelected, setIsSelected] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [selectedSeats, setSelectedSeats] = useState(new Set(["text"]));

  const selectedSeatsValue = React.useMemo(
    () => Array.from(selectedSeats).join(", ").replaceAll("_", " "),
    [selectedSeats]
  );

  const [selectedTransmission, setSelectedTransmission] = useState(
    new Set(["text"])
  );

  const selectedTransmissionValue = React.useMemo(
    () => Array.from(selectedTransmission).join(", ").replaceAll("_", " "),
    [selectedTransmission]
  );

  const applyAllFilters = () => {
    let updatedCars = [...cars];

    // daily price sorting
    if (dailyPrice === "low_to_high") {
      updatedCars.sort(
        (a, b) => Number(a?.price_per_day) - Number(b?.price_per_day)
      );
    } else if (dailyPrice === "high_to_low") {
      updatedCars.sort(
        (a, b) => Number(b?.price_per_day) - Number(a?.price_per_day)
      );
    }

    // price range
    const [minPrice, maxPrice] = priceRange;
    updatedCars = updatedCars?.filter(
      (car) =>
        car?.price_per_day >= minPrice &&
        (car?.price_per_day <= maxPrice || maxPrice === 10000)
    );

    // features
    if (selectedFeatures) {
      updatedCars = updatedCars?.filter((item) =>
        selectedFeatures.every((feature) =>
          item?.car_features.includes(feature)
        )
      );
    }

    // green vehicle
    if (greenVehicleas) {
      updatedCars = updatedCars?.filter(
        (item) => item.green_vehicle == greenVehicleas
      );
    }

    // vehicle make (brand)
    if (selectedValue !== "text") {
      updatedCars = updatedCars?.filter((item) => item.brand === selectedValue);
    }

    // number of seats
    if (selectedSeatsValue !== "text") {
      updatedCars = updatedCars?.filter(
        (item) => item.number_of_seats == selectedSeatsValue
      );
    }

    // transmission
    if (selectedTransmissionValue !== "text") {
      updatedCars = updatedCars?.filter(
        (item) => item.transmission === selectedTransmissionValue
      );
    }

    setCars(updatedCars);
  };

  const newFeature = Searchparams("feature");

  const filterWithParams = () => {
    if (cars?.length) {
      let updatedCars = [...cars];

      // Filter cars based on "Pet-friendly" feature
      updatedCars = updatedCars?.filter(
        (item) =>
          Array.isArray(item?.car_features) && // Check if car_features is an array
          item?.car_features.includes(newFeature) // Check if "Pet-friendly" is in the array
      );

      setCars(updatedCars);
    }
  };

  useEffect(() => {
    if (newFeature && cars?.length) {
      filterWithParams();
    }
  }, [newFeature, cars]);

  return (
    <div className="border flex items-center gap-4 py-4 px-4 lg:px-6">
      {/* sort by */}
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button variant="flat" size="sm" className="rounded-md font-medium">
            Sort By
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="p-4"
          variant="light"
          aria-label="Static Actions"
        >
          <DropdownItem isReadOnly className="">
            <RadioGroup
              color="danger"
              label=""
              value={dailyPrice}
              onValueChange={setDailyPrice}
            >
              <Radio value="low_to_high">Daily Price: low to high</Radio>
              <Radio value="high_to_low">Daily Price: high to low</Radio>
            </RadioGroup>
          </DropdownItem>

          <DropdownItem className="">
            <Button
              onClick={applyAllFilters}
              variant="solid"
              className="rounded-md bg-web_brown text-white"
            >
              Apply
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* dailyy price */}
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            variant="bordered"
            size="sm"
            className="rounded-md font-medium"
          >
            Daily Price
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="" variant="" aria-label="Static Actions">
          <DropdownItem isReadOnly>
            <div className="flex p-4 flex-col w-full h-full min-w-[260px] items-start justify-center">
              <p className="text-small mb-3 font-semibold">
                {Array.isArray(priceRange) &&
                  priceRange.map((b) => `$${b}`).join(" – ")}{" "}
                +/day
              </p>
              <Slider
                label=""
                formatOptions={{ style: "currency", currency: "USD" }}
                step={10}
                maxValue={10000}
                minValue={10}
                value={priceRange}
                size="sm"
                onChange={setPriceRange}
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
          </DropdownItem>
          <DropdownItem className="">
            <Button
              onClick={applyAllFilters}
              variant="solid"
              className="rounded-md bg-web_brown text-white"
            >
              Apply
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* More FIlters */}
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            variant="bordered"
            size="sm"
            className="rounded-md font-medium"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            More Filters
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="custom_dropdown lg:min-w-[420px] max-h-[520px] overflow-y-auto"
          variant=""
          aria-label="Static Actions"
        >
          <DropdownItem className="" isReadOnly>
            {/* all starts */}
            <div className=" px-4 pb-5 pt-2 w-full">
              <p className="text-[14px] mb-2 text-web_darkgray font-bold">
                ALL-STAR HOST
              </p>
              <Checkbox
                color="danger"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                classNames={{ label: "text-[15px]" }}
              >
                Top rated, experience host
              </Checkbox>
            </div>
            {/* features */}
            <div className=" px-4 pb-5 pt-2 w-full">
              <p className="text-[14px] mb-2 text-web_darkgray font-bold flex items-center gap-2">
                FEATURES
                {selectedFeatures.length > 0 && (
                  <span
                    onClick={() => setCarFeatures({})}
                    className="bg-gray-400 hover:bg-gray-500/90 transition text-white rounded-full w-4 h-4 px-[4px] pt-[1.4px] text-center leading-3 font-normal text-[12px]"
                  >
                    x
                  </span>
                )}
              </p>
              <Dropdown className="w-full">
                <DropdownTrigger className="w-full text-left">
                  <Button variant="bordered" className="rounded-md text-left">
                    Select
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant=""
                  aria-label="Static Actions"
                  className="w-full"
                >
                  <DropdownItem isReadOnly key="new" className="w-full">
                    <div className="w-full max-h-[360px] overflow-y-auto min-w-[220px] custom_dropdown flex gap-4">
                      <div className="flex-1">
                        {carFeaturesAll.map((item, index) => (
                          <Checkbox
                            key={index}
                            color="danger"
                            // isSelected={carFeatures}
                            isSelected={carFeatures[item]}
                            // onValueChange={setCarFeatures}
                            onValueChange={() => handleCheckboxChange(item)}
                            size="sm"
                            className="block"
                          >
                            {item}
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* features */}

            {/* green vehicles */}
            <GreenVehicle
              greenVehicleas={greenVehicleas}
              setGreenVehicleas={setGreenVehicleas}
            />
            {/* vehicle makes */}
            <VehicleMakes
              selectedKeys={selectedKeys}
              selectedValue={selectedValue}
              setSelectedKeys={setSelectedKeys}
            />
            {/* vehicle years */}
            <VehicleYears years={years} setYears={setYears} />
            {/* number of seats */}
            <NumberOfSeats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              selectedSeatsValue={selectedSeatsValue}
            />
            {/* transmission */}
            <Transmission
              selectedTransmission={selectedTransmission}
              selectedTransmissionValue={selectedTransmissionValue}
              setSelectedTransmission={setSelectedTransmission}
            />
            {/* transmission */}
          </DropdownItem>
          {/* btn */}
          <DropdownItem className="">
            <div className="border-t px-4 pt-3">
              <Button
                onClick={applyAllFilters}
                variant="solid"
                className="rounded-md bg-web_brown text-white"
              >
                Apply
              </Button>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Filters;
