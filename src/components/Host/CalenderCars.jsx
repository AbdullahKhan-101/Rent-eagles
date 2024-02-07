import { reward } from "@/Assets";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CalenderCars = ({ data, key }) => {
  return (
    <Link href={`/car-details?id=${data?.car_id}`}>
      <div className=" rounded-[10px] cursor-pointer !boxMyCar shadow-lg max-w-[800px] w-full flex  justify-center items-center gap-6">
        <div className="w-full h-full relative">
          <Image
            src={data?.photo_1}
            alt="carpic"
            width={1000}
            height={1000}
            className="  h-[200px] rounded-[10px] object-cover object-center"
          />
        </div>
        <div className="max-w-[90%] w-full mx-auto px-4">
          <h2 className="font-bold text-lg sm:text-2xl ">
            {data?.car_name.substring(0, 20)}....
          </h2>
          <div className="flex flex-wrap sm:flex-nowrap justify-start py-2 items-center gap-3  sm:gap-8">
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
          <div className="float-right py-4 ">
            <p className="font-bold text-sm">${data?.price_per_day}/day</p>
          </div>
          <div className="float-left py-4 ">
            <Button color="danger" variant="bordered">
              Booked
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CalenderCars;
