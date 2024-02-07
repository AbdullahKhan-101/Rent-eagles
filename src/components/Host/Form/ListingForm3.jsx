import { setStepForm, setStepNumber } from "@/redux/slices/formSlice";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Tips from "./Tips";

const ListingForm3 = ({ stepform }) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      advance_notice: stepform?.advance_notice || "",
      minimum_trip_duration: stepform?.minimum_trip_duration || "",
      two_day_minimum: stepform?.two_day_minimum || "",
      maximum_trip_duration: stepform?.maximum_trip_duration || "",
    },
  });
  const handleBack = () => {
    dispatch(setStepNumber());
  };
  const onSubmit = (data) => {
    dispatch(setStepForm(data));
  };

  console.log("hello");
  return (
    <div className="w-full max-w-[90%] flex justify-center items-center">
      <div className=" flex flex-col w-full gap-5">
        <h3 className="text-start  text-lg sm:text-2xl font-bold ">
          Car availability
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col gap-6  w-full"
       
        >
          <p className="text-lg font-bold">Advance notice</p>
          <p className="text-lg font-medium -mt-5">
            How much advance notice do you need before a trip starts?
          </p>

          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full">
            <div className="flex flex-col w-full  h-[80px]">
              <div className="py-2">
                <Select
                  size="md"
                  placeholder="select History"
                  label="Advance notice at home"
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  labelPlacement="outside"
                  defaultSelectedKeys={
                    stepform?.advance_notice
                      ? [stepform?.advance_notice]
                      : ["option 1"]
                  }
                  className="max-w-xs"
                  {...register("advance_notice", { required: true })}
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
              {errors.advance_notice && (
                <p className="text-red-700">Advance Notice is required</p>
              )}
            </div>
            <Tips
              text1={"Tips to get more bookings"}
              text2={
                "32% of trips at home locations are booked on shorter notice than your current requirement of 12 hours."
              }
            />
          </div>
          <p className="text-lg font-bold">Trip duration</p>
          <p className="text-lg font-medium -mt-5">
            What’s the shortest and longest possible trip you’ll accept?
          </p>

          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full">
            <div className="flex flex-col w-full  h-[80px]">
              <div className="py-2">
                <Select
                  size="md"
                  placeholder="Select Minimum trip duration"
                  label="Minimum trip duration"
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  labelPlacement="outside"
                  defaultSelectedKeys={
                    stepform?.minimum_trip_duration
                      ? [stepform?.minimum_trip_duration]
                      : ["option 1"]
                  }
                  className="max-w-xs"
                  {...register("minimum_trip_duration", { required: true })}
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
              {errors.minimum_trip_duration && (
                <p className="text-red-700">
                  Minimum Trip Durantion is required
                </p>
              )}
              <div className="w-[400px] py-4  ">
                <Controller
                  control={control}
                  name="two_day_minimum"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      color="danger"
                      defaultSelected
                      onChange={onChange}
                      isSelected={value}
                    >
                      Require a 2-day minimum for trips that start Friday or
                      Saturday
                    </Checkbox>
                  )}
                />
              </div>
            </div>
            <Tips
              text1={"Tips to get more bookings"}
              text2={"A 1 day minimum opens you up to 100% of trips!"}
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full my-12">
            <div className="flex flex-col w-full  h-[80px]">
              <div className="py-2">
                <Select
                  size="md"
                  placeholder="Select Maximum trip duration"
                  label="Maximum trip duration"
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  labelPlacement="outside"
                  defaultSelectedKeys={
                    stepform?.maximum_trip_duration
                      ? [stepform?.maximum_trip_duration]
                      : ["option 1"]
                  }
                  className="max-w-xs"
                  {...register("maximum_trip_duration", { required: true })}
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
              {errors.maximum_trip_duration && (
                <p className="text-red-700">
                  Maximum Trip Durantion is required
                </p>
              )}
            </div>
            <Tips
              text1={"Tips to get more bookings"}
              text2={
                "1% of booked trips are longer than your current maximum of 1 month."
              }
            />
          </div>
          <div className="flex justify-end items-center py-6 gap-6">
            <Button
              onClick={handleBack}
              className="bg-[#99000B] text-white w-[150px] rounded-none"
            >
              Back
            </Button>

            <Button
              className="bg-[#99000B] text-white w-[150px] rounded-none"
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

export default ListingForm3;
