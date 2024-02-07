import { top_jeep, trustpilate_icon } from "@/Assets";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TopCar = ({ item }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/car-details?id=${item?.car_id}`)}
      className="scale-[.96] cursor-pointer shadow-lg mx-auto rounded-2xl overflow-hidden max-w-[400px] focus-visible:outline-none transition-all ease-out duration-300"
    >
      <div className="max-h-[250px] lg:min-h-[250px] min-h-[215px] overflow-hidden relative">
        <Image
          alt="card-img"
          width={1000}
          height={280}
          src={item?.car_photo}
          className="w-full max-h-[250px] hover:scale-105 min-h-[215px] lg:min-h-[250px] h-full transition"
        />
      </div>
      <div className="p-4 border-b-2 gap-3">
        <p className="text-xl font-bold line-clamp-1">{item?.car_name}</p>
        <div className="text-xs flex items-center gap-6 font-medium mt-2">
          <div className="flex items-center gap-1">
            <span>{item?.rating}</span>
            <StarIcon className="w-4 h-4 text-web_brown " />
            <span>({item?.trips_completed} trips)</span>
          </div>
          <div className="flex items-center gap-3 ">
            <Image alt="icon" src={trustpilate_icon} />
            <p className="text-xs font-medium leading-4">All-Star Host</p>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-3 items-center justify-between">
        <div></div>
        <p className="font-bold ">${item?.price_per_day}/day</p>
      </div>
    </div>
  );
};

export default TopCar;
