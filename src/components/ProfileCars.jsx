import { carpic, reward } from "@/Assets";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const ProfileCars = ({ data }) => {
  return (
    <div className=" rounded-[10px] cursor-pointer !boxMyCar shadow-lg max-w-[350px] w-full flex flex-col gap-6">
      <div className="w-full h-full relative">
        <Image
          src={data?.url}
          alt="carpic"
          width={1000}
          height={1000}
          className="  h-[200px] rounded-[10px] object-cover object-center"
        />

        <div className="absolute top-3 right-7 bottom-0 bg-white h-fit p-1 rounded-2xl">
          <TrashIcon className="w-8 h-8 " />
        </div>
      </div>
      <div className="max-w-[90%] w-full mx-auto">
        <h2 className="font-bold text-lg sm:text-2xl ">
          {data?.name.substring(0, 20)}....
        </h2>
        <div className="flex justify-start py-2 items-center gap-8">
          <div className="flex justify-start items-center gap-2">
            <p className="text-sm">{data?.ratings}</p>
            <StarIcon className="text-red-800 w-6 h-7" />
            <p className="text-sm">({data?.trips_completed} trips)</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <Image
              src={reward}
              alt="carpic"
              width={50}
              height={50}
              className="  w-6 h-7 object-cover object-center"
            />
            <p>All-Star Host</p>
          </div>
        </div>

        <hr className="h-[2px] bg-black w-full" />
        <div className="float-right py-4">
          <p className="font-bold text-sm">${data?.price}/day</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCars;
