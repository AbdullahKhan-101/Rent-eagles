import { carpic, reward } from "@/Assets";
import {
  CheckCircleIcon,
  StarIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyCars = ({ data }) => {
  return (
    <Link href={`/host/dashboard/my-cars/details?id=${data?.id}`}>
      <div className=" rounded-[10px] cursor-pointer !boxMyCar shadow-lg max-w-[350px] w-full flex flex-col gap-6">
        <div className="w-full h-full relative">
          <Image
            src={data?.url}
            alt="carpic"
            width={1000}
            height={1000}
            className="  h-[200px] rounded-[10px] object-cover object-center"
          />
          {/* <div className="absolute top-3 right-7 bottom-0 bg-white h-fit p-1 rounded-2xl">
            <TrashIcon className="w-8 h-8 " />
          </div> */}
        </div>
        <div className="max-w-[90%] w-full mx-auto">
          <h2 className="font-bold text-lg sm:text-2xl line-clamp-1">
            {data?.name.substring(0, 20)}
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
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-1">
              {data?.is_approved ? (
                <CheckCircleIcon className="text-green-600 w-5 h-5" />
              ) : (
                <XCircleIcon className="text-red-600 w-5 h-5" />
              )}
              <p className="font-medium text-xs text-gray-500">
                {data?.is_approved
                  ? `Approved by rent eagles`
                  : `Waiting for approval`}
              </p>
            </div>
            <p className="font-bold text-sm">${data?.price}/day</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyCars;
