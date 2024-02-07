import { trustpilate_icon } from "@/Assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MarkerCard = ({ allData }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/car-details?id=${allData.id}`)}
      className="mx-auto rounded-xl overflow-hidden flex flex-col cursor-pointer hover:bg-gray-50 hover:opacity-90 transition "
    >
      <div className="max-h-[200px] max-w-[200px] ">
        <Image
          alt="car-img"
          src={allData?.photo}
          width={280}
          className="h-[165px] "
          height={165}
        />
      </div>
      <div className="p-2 flex flex-1 justify-between">
        <div className="">
          <p className="sm:text-[20px] text-[19px] font-bold">
            {allData?.name}
          </p>
          <div className="flex items-center my-2 mb-8 gap-2">
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
          <p className="text-sm max-w-[180px] line-clamp-1 font-medium">
            {allData?.address}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <div></div>{" "}
          <div className="text-right">
            <p className="text-base font-bold">${allData?.price_per_day}/day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerCard;
