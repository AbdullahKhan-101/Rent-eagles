import { vehicleBrands } from "@/data/car";
import { setStepForm } from "@/redux/slices/formSlice";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "react-google-autocomplete";

const ListingForm1 = ({ stepform }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: stepform?.address || "",
      car_name: stepform?.car_name || "",
      vin_number: stepform?.vin_number || "",
      brand: stepform?.brand || "",
      trim: stepform?.trim || "",
      style: stepform?.style || "",
      distance: stepform?.distance || "",
      transmission: stepform?.transmission || "",
      green_vehicle: stepform?.green_vehicle || "",
      vehicle_history: stepform?.vehicle_history || "",
      vehicle_type: stepform?.vehicle_type || "",
      number_of_seats: stepform?.number_of_seats || "",
      // salvage: stepform?.salvage || "",
    },
  });

  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);

  const handlePlaceSelected = (place) => {
    const addressComponents = place?.address_components || [];
    let fullAddress = "";
    for (const component of addressComponents) {
      fullAddress += component.long_name + " ";
      if (component.types.includes("locality")) {
        setCity(component.long_name);
      }
      if (component.types.includes("administrative_area_level_1")) {
        setState(component.long_name);
      }
    }
    setValue("address", fullAddress.trim());
    setValue("place_id", place?.place_id);
    console.log(place, "place");
  };

  const watchaddress = stepform?.address ? true : watch("address", false);
  const watchVinNumber = stepform?.vin_number
    ? true
    : watch("vin_number", false);

  const onSubmit = (data) => {
    console.log(data, "data");
    dispatch(setStepForm(data));
  };

  return (
    <div className="w-full max-w-[60%] flex justify-center items-center">
      <div className=" flex flex-col w-full gap-5">
        <h3 className="text-start  text-lg sm:text-2xl font-bold ">
          Car Details
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 "
        >
          <div className="flex flex-col  h-[80px] address_input">
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
              onPlaceSelected={handlePlaceSelected}
              defaultValue={stepform?.address}
              options={{ types: ["geocode"] }}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-700">Address is required</p>
            )}
          </div>

          {watchaddress && (
            <div className="flex  flex-col gap-6 ">
              <div className="flex flex-col  h-[80px]">
                <Input
                  size="md"
                  labelPlacement="outside"
                  defaultValue={stepform?.car_name}
                  label="Which car do you have?"
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  placeholder="Enter your car name"
                  {...register("car_name", { required: true })}
                />
                {errors.car_name && (
                  <p className="text-red-700">Car Name is required</p>
                )}
              </div>
              <div className="flex flex-col  h-[80px]">
                <Input
                  size="md"
                  labelPlacement="outside"
                  label="What is your VIN Number"
                  defaultValue={stepform?.vin_number}
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  placeholder="Enter your VIN Number"
                  {...register("vin_number", { required: true })}
                />
                {errors.vin_number && (
                  <p className="text-red-700">VIN number is required</p>
                )}
              </div>
              {/* car brand */}

              {/* <div className="flex flex-col  h-[80px]">
                <Input
                  size="md"
                  labelPlacement="outside"
                  label="What is your car brand"
                  defaultValue={stepform?.brand}
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  placeholder="Enter your car brand"
                  {...register("brand", { required: true })}
                />
                {errors.brand && (
                  <p className="text-red-700">Car brand is required</p>
                )}
              </div> */}
              <div>
                <p className="text-lg font-medium pb-4">Car Brand</p>
                <div className="pb-2">
                  <Select
                    size="sm"
                    placeholder="select History"
                    defaultSelectedKeys={
                      stepform?.brand ? [stepform?.brand] : ["tesla"]
                    }
                    className="max-w-xs"
                    {...register("brand", { required: true })}
                  >
                    {vehicleBrands.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.brand && (
                    <p className="text-red-700">Vehicle type is required</p>
                  )}
                </div>
              </div>

              {/*  */}
            </div>
          )}

          {watchVinNumber && (
            <div className="flex  flex-col gap-6 ">
              <p className="text-lg font-medium pb-4">Trim and style</p>
              <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-between items-center w-full">
                <Select
                  label="Trim optional"
                  labelPlacement="outside"
                  defaultSelectedKeys={
                    stepform?.trim ? [stepform?.trim] : ["option 1"]
                  }
                  placeholder="select Trim"
                  className="max-w-xs"
                  {...register("trim")}
                >
                  <SelectItem key={"option 1"} value="option 1">
                    option 1
                  </SelectItem>
                  <SelectItem key={"option 2"} value="option 2">
                    option 2
                  </SelectItem>
                  <SelectItem key={"option 3"} value="option 3">
                    option 3
                  </SelectItem>
                  <SelectItem key={"option 4"} value="option 4">
                    option 4
                  </SelectItem>
                  <SelectItem key={"option 5"} value="option 5">
                    option 5
                  </SelectItem>
                </Select>

                <Select
                  label="Style optional"
                  className="max-w-xs"
                  placeholder="select Style"
                  defaultSelectedKeys={
                    stepform?.style ? [stepform?.style] : ["option 1"]
                  }
                  labelPlacement="outside"
                  {...register("style")}
                >
                  <SelectItem key={"option 1"} value="option 1">
                    option 1
                  </SelectItem>
                  <SelectItem key={"option 2"} value="option 2">
                    option 2
                  </SelectItem>
                  <SelectItem key={"option 3"} value="option 3">
                    option 3
                  </SelectItem>
                  <SelectItem key={"option 4"} value="option 4">
                    option 4
                  </SelectItem>
                  <SelectItem key={"option 5"} value="option 5">
                    option 5
                  </SelectItem>
                </Select>
              </div>

              <div>
                <p className="text-lg font-medium py-4">
                  Odometer and transmission
                </p>

                <div className="flex flex-col  h-[100px]">
                  <Select
                    label="Distance"
                    labelPlacement="outside"
                    placeholder="select Distance"
                    defaultSelectedKeys={
                      stepform?.distance ? [stepform?.distance] : ["option 1"]
                    }
                    className="max-w-xs"
                    {...register("distance", { required: true })}
                  >
                    <SelectItem key={"option 1"} value="option 1">
                      option 1
                    </SelectItem>
                    <SelectItem key={"option 2"} value="option 2">
                      option 2
                    </SelectItem>
                    <SelectItem key={"option 3"} value="option 3">
                      option 3
                    </SelectItem>
                    <SelectItem key={"option 4"} value="option 4">
                      option 4
                    </SelectItem>
                    <SelectItem key={"option 5"} value="option 5">
                      option 5
                    </SelectItem>
                  </Select>
                  {errors.distance && (
                    <p className="text-red-700">Distance is required</p>
                  )}
                </div>
                <p className="text-lg font-medium ">Green Vehicle</p>
                <div className="mb-6">
                  <label htmlFor="">Select vehicle type</label>
                  <div className="flex justify-start items-center gap-4">
                    <div>
                      <input
                        type="radio"
                        name="green_vehicle"
                        id="hybrid"
                        className="accent-web_brown mr-2"
                        value={"hybrid"}
                        // onChange={() => handleRadioChange("hybrid")}
                        defaultChecked={stepform?.green_vehicle === "hybrid"}
                        {...register("green_vehicle", { required: true })}
                      />
                      <label htmlFor="hybrid">Hybrid</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="green_vehicle"
                        id="electric"
                        className="accent-web_brown mr-2"
                        value={"electric"}
                        // onChange={() => handleRadioChange("electric")}
                        defaultChecked={stepform?.green_vehicle === "electric"}
                        {...register("green_vehicle", { required: true })}
                      />
                      <label htmlFor="electric">Electric</label>
                    </div>{" "}
                  </div>
                  {errors.green_vehicle && (
                    <p className="text-red-700">Green vehicle is required</p>
                  )}
                </div>
                <p className="text-lg font-medium ">Transmission</p>
                <div className="mb-6">
                  <label htmlFor="">Select transmission type</label>
                  <div className="flex justify-start items-center gap-4">
                    <div>
                      <input
                        type="radio"
                        name="transmission"
                        id="manual"
                        className="accent-web_brown mr-2"
                        value={"manual"}
                        // onChange={() => handleTransmissionChange("manual")}
                        defaultChecked={stepform?.transmission === "manual"}
                        {...register("transmission", { required: true })}
                      />
                      <label htmlFor="manual">Manual</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="transmission"
                        id="automatic"
                        className="accent-web_brown mr-2"
                        value={"automatic"}
                        // onChange={() => handleTransmissionChange("automatic")}
                        defaultChecked={stepform?.transmission === "automatic"}
                        {...register("transmission", { required: true })}
                      />
                      <label htmlFor="automatic">Automatic</label>
                    </div>{" "}
                  </div>
                  {errors.transmission && (
                    <p className="text-red-700">Transmission is required</p>
                  )}
                </div>
              </div>
              {/* vehicle type */}
              <div>
                <p className="text-lg font-medium pb-4">Vehicle Type</p>
                <div className="pb-2">
                  <Select
                    size="sm"
                    placeholder="select History"
                    defaultSelectedKeys={
                      stepform?.vehicle_type
                        ? [stepform?.vehicle_type]
                        : ["car"]
                    }
                    className="max-w-xs"
                    {...register("vehicle_type", { required: true })}
                  >
                    <SelectItem key={"car"} value="car">
                      Cars
                    </SelectItem>
                    <SelectItem key={"convertible"} value="convertible">
                      Convertibles
                    </SelectItem>
                    <SelectItem key={"exotic-&-luxury"} value="exotic-&-luxury">
                      Exotic-&-Luxurys
                    </SelectItem>
                    <SelectItem key={"minivan"} value="minivan">
                      Minivans
                    </SelectItem>
                    <SelectItem key={"suv"} value="suv">
                      Suvs
                    </SelectItem>
                    <SelectItem key={"truck"} value="truck">
                      Trucks
                    </SelectItem>
                    <SelectItem key={"classic"} value="classic">
                      Classics
                    </SelectItem>
                    <SelectItem key={"sports-car"} value="sports-car">
                      Sports Cars
                    </SelectItem>
                    <SelectItem key={"van"} value="van">
                      Vans
                    </SelectItem>
                    <SelectItem key={"cargo-van"} value="cargo-van">
                      Cargo Vans
                    </SelectItem>
                    <SelectItem key={"mini-car"} value="mini-car">
                      Mini Cars
                    </SelectItem>
                  </Select>
                  {errors.vehicle_type && (
                    <p className="text-red-700">Vehicle type is required</p>
                  )}
                </div>
              </div>
              {/*  */}
              <div>
                <p className="text-lg font-medium pb-4">Vehicle history</p>
                <p className="max-w-[60%] w-full">
                  I certify I paid applicable sales or related taxes on the
                  purchase of this vehicle.
                </p>
                <div className="py-2">
                  <Select
                    size="sm"
                    placeholder="select History"
                    defaultSelectedKeys={
                      stepform?.vehicle_history
                        ? [stepform?.vehicle_history]
                        : ["option 1"]
                    }
                    className="max-w-xs"
                    {...register("vehicle_history", { required: true })}
                  >
                    <SelectItem key={"option 1"} value="option 1">
                      option 1
                    </SelectItem>
                    <SelectItem key={"option 2"} value="option 2">
                      option 2
                    </SelectItem>
                    <SelectItem key={"option 3"} value="option 3">
                      option 3
                    </SelectItem>
                    <SelectItem key={"option 4"} value="option 4">
                      option 4
                    </SelectItem>
                    <SelectItem key={"option 5"} value="option 5">
                      option 5
                    </SelectItem>
                  </Select>
                  {errors.vehicle_history && (
                    <p className="text-red-700">Vehicle history is required</p>
                  )}
                </div>
              </div>
              {/*  */}
              <div>
                <p className="text-lg font-medium pb-4">Number of seats</p>
                <div className="pb-2">
                  <Select
                    size="sm"
                    placeholder="select History"
                    defaultSelectedKeys={
                      stepform?.number_of_seats
                        ? [stepform?.number_of_seats]
                        : ["4"]
                    }
                    className="max-w-xs"
                    {...register("number_of_seats", { required: true })}
                  >
                    <SelectItem key={"4"} value="4">
                      4
                    </SelectItem>
                    <SelectItem key={"5"} value="5">
                      5
                    </SelectItem>
                    <SelectItem key={"6"} value="6">
                      6
                    </SelectItem>
                    <SelectItem key={"7"} value="7">
                      7
                    </SelectItem>
                    <SelectItem key={"8"} value="8">
                      8
                    </SelectItem>
                  </Select>
                  {errors.number_of_seats && (
                    <p className="text-red-700">Number of seats is required</p>
                  )}
                </div>
              </div>
              {/* <div className="mb-6">
                <label htmlFor="">Select transmission type</label>
                <div className="flex justify-start items-center gap-4">
                  <div>
                    <input
                      type="radio"
                      name="salvage"
                      id="yes"
                      className="accent-web_brown mr-2"
                      value={"yes"}
                      defaultChecked={stepform?.salvage === "yes"}
                      {...register("salvage", { required: true })}
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="salvage"
                      id="no"
                      className="accent-web_brown mr-2"
                      value={"no"}
                      defaultChecked={stepform?.salvage === "no"}
                      {...register("salvage", { required: true })}
                    />
                    <label htmlFor="no">No</label>
                  </div>{" "}
                </div>
                {errors.salvage && (
                  <p className="text-red-700">Salvage is required</p>
                )}
              </div> */}
            </div>
          )}
          <div className="flex justify-end gap-6 items-center">
            <Button
              isDisabled={watchaddress && watchVinNumber ? false : true}
              className="bg-[#99000B] cursor-pointer text-white w-[150px] rounded-none"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ListingForm1;
