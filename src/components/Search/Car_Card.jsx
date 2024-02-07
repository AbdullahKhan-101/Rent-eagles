import { jeep1, trustpilate_icon } from "@/Assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Car_Card = ({ allData , start_date, end_date, start_time, end_time }) => {
  // console.log(allData, "singl car");
  const router = useRouter();
  return (
    <Link href={`/car-details?id=${allData?.id}&start_date=${start_date}&end_date=${end_date}&start_time=${start_time}&end_time=${end_time}`} className="w-full h-full">
      <div className="border rounded-xl overflow-hidden flex lg:flex-row flex-col xl:gap-4 lg:gap-2 cursor-pointer hover:bg-gray-50 hover:opacity-90 transition ">
        <div className="lg:max-w-[270px] xl:max-w-[310px] lg:max-h-[200px] relative">
          <Image
            alt="car-img"
            src={allData?.photo}
            width={1000}
            className="lg:max-h-[200px] lg:h-[200px] max-h-[420px]"
            height={1000}
          />
        </div>
        <div className="p-2 flex flex-1 lg:flex-wrap xl:flex-nowrap justify-between">
          <div className=" ">
            <p className=" sm:text-[20px] text-[19px] font-bold">
              {allData?.car_name}
            </p>
            <div className="flex items-center my-3 mb-8 lg:mb-3 lg:gap-4 gap-2">
              <p className="text-sm font-medium">New Listing</p>
              <div className="flex item-center gap-2">
                <Image
                  className="w-5 h-5 object-contain"
                  alt="trust-pilate-icon"
                  src={trustpilate_icon}
                />
                <p className="text-sm font-medium">All-Star Host</p>
              </div>
            </div>
            <p className="text-sm font-medium">{allData?.address}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>{" "}
            <div className="text-right">
              <p className="text-base font-bold">
                ${allData?.price_per_day}/day
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Car_Card;
