import {
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm, getValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setStepForm, setStepNumber } from "@/redux/slices/formSlice";
import { carFeaturesAll } from "@/data/car";
import Image from "next/image";
import { picture } from "@/Assets";
import React, { useEffect, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import ImageComponent from "./ImageComponent";
import { API } from "@/Api";

const ListingForm2 = ({ stepform }) => {
  const [selected, setSelected] = useState(stepform?.carFeatures || []);
  const [carFeaturesError, setCarFeaturesError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      liscence_number: stepform?.liscence_number || "",
      // state_province: stepform?.state_province || "",
      carFeatures: stepform?.carFeatures || [],
      description: stepform?.description || "",
      car_images: stepform?.car_images || "",
      price: stepform?.price || null,
      model: stepform?.modal || null,
    },
  });

  const [allImages, setAllImages] = useState(null);

  const handleBack = () => {
    dispatch(setStepNumber());
  };
  const onSubmit = async (data) => {
    var flag = true;
    var flag2 = true;
    if (selected.length > 0) {
      flag2 = true;
    } else {
      setCarFeaturesError("Kindly select at least one Feature");
      flag2 = false;
    }

    for (let index = 0; index < fileList.length; index++) {
      if (!fileList[index]?.image?.name) {
        flag = false;
      }
    }

    if (flag && flag2) {
      dispatch(
        setStepForm({
          ...data,
          carFeatures: selected,
          car_images: fileList,
        })
      );
    } else {
      setAllImages("Please upload all 10 images");
    }
  };

  const [fileList, setFileList] = useState([]);
  const handleImageChange = (event, itemId) => {
    const files = event?.target?.files;

    if (files) {
      const arr = [...files];
      const temp = _.cloneDeep(fileList);
      temp?.map((i) => i?.id === itemId && (i.image = arr[arr.length - 1]));
      setFileList(temp);
    }
  };

  const getTotal = () => {
    const arr = [];
    for (let index = 1; index < 11; index++) {
      let obj = stepform?.car_images?.find((i) => i?.id === index);
      obj = obj || { id: index, image: "" };
      arr.push(obj);
    }
    setFileList(arr);
  };
  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div className="w-full ">
      <div className=" flex flex-col w-full gap-5 ">
        <h3 className="text-start  text-lg sm:text-2xl font-bold ">
          Car Details
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-20 justify-between flex-wrap sm:flex-nowrap items-start w-full  "
          encType="multipart/form-data"
        >
          <div>
            <div className="flex justify-start  flex-wrap sm:flex-nowrap items-center gap-14 w-full ">
              <div className="flex flex-col  w-full  h-[80px]">
                <Input
                  size="md"
                  defaultValue={stepform?.liscence_number}
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  labelPlacement="outside"
                  label="License plate number"
                  placeholder="Licence Number"
                  {...register("liscence_number", { required: true })}
                />
                {errors.liscence_number && (
                  <p className="text-red-700">Licence Number is required</p>
                )}
              </div>
              {/* <div className="flex flex-col w-full  h-[80px]">
                <Select
                  label="State"
                  labelPlacement="outside"
                  placeholder="select Distance"
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  defaultSelectedKeys={
                    stepform?.state_province
                      ? [stepform?.state_province]
                      : ["option 1"]
                  }
                  className="max-w-xs"
                  {...register("state_province", { required: true })}
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
                {errors.state_province && (
                  <p className="text-red-700">state is required</p>
                )}
              </div> */}
            </div>

            <div className="flex justify-start  flex-wrap sm:flex-nowrap items-center gap-14 w-full ">
              <div className="flex flex-col  w-full my-[20px] h-[100px]">
                <Input
                  type="number"
                  label="Price"
                  placeholder="0.00"
                  defaultValue={stepform?.price}
                  description="Enter the price of your car in term of Per Day"
                  classNames={{
                    label: "text-md font-medium",
                    description: "font-medium text-blue-500",
                  }}
                  labelPlacement="outside"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <p className="text-red-700">Price is required</p>
                )}
              </div>

              <div className="flex flex-col  w-full  h-[80px]">
                <Input
                  size="md"
                  defaultValue={stepform?.model}
                  classNames={{
                    label: "text-md font-medium",
                  }}
                  labelPlacement="outside"
                  label="Make year of your car"
                  placeholder="1998, 2017 etc.."
                  {...register("model", { required: true })}
                />
                {errors.model && (
                  <p className="text-red-700">Make year is required</p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <CheckboxGroup
                label="Select features"
                color="warning"
                value={selected}
                onValueChange={setSelected}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {carFeaturesAll?.map((item) => (
                    <Checkbox color="danger" key={item} value={item}>
                      {item}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
              {carFeaturesError && (
                <p className="text-red-700 py-2">{carFeaturesError}</p>
              )}
              <p className="py-4">
                Apple CarPlay is a registered trademark of Apple Inc. Android is
                a trademark of Google LLC.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Description</h2>
              <p>
                Tell guests what makes your car unique and why they’ll love
                driving it.
              </p>
              <h2 className="text-lg text-red-700 font-bold">
                What should I include?
              </h2>

              <div className="borderCarList p-4  flex flex-col justify-center items-start gap-6 max-w-[550px] w-full">
                <h2 className="text-xl font-bold  ">
                  Tips to get more bookings
                </h2>

                <div className="bg-[#F0D9DB] p-8 max-w-[450px] w-full rounded-[0.625rem] ">
                  <p className="text-start ">
                    Listing with descriptions of at least 100 words are up to
                    three times more likely to get booked.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <Textarea
                  label="Description"
                  classNames={{
                    label: "text-lg font-bold",
                  }}
                  labelPlacement="outside"
                  maxRows={6}
                  defaultValue={stepform?.description || false}
                  placeholder="Enter your description"
                  {...register("description", { required: true })}
                />

                {errors.description && (
                  <p className="text-red-700">description is required</p>
                )}
              </div>
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
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-[320px]  w-full ">
            {fileList?.length > 0 &&
              fileList?.map((item, index) => (
                <ImageComponent
                  key={item?.id}
                  item={item}
                  handleImageChange={handleImageChange}
                />
              ))}
            {allImages && <p className="text-red-700 w-full">{allImages}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingForm2;
