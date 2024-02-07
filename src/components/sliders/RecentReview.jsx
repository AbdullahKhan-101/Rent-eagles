import { trustpilate_icon } from "@/Assets";
import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecentReview = ({ item }) => {
  const stars = Array.from({ length: item?.rating || 0 }, (_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-web_brown " />
  ));

  return (
    <div className="scale-[.96] p-4 custom_shadow bg-white cursor-pointer mx-auto rounded-2xl overflow-hidden max-w-[460px] focus-visible:outline-none transition-all ease-out duration-300">
      <div className="flex  gap-4">
        {item?.profile_photo ? (
          <Image
            alt="avatar"
            width={1000}
            height={1000}
            src={item.avatar}
            className="w-20 h-20 rounded-full"
          />
        ) : (
          <Avatar className="w-20 h-20 opacity-70" />
        )}
        <div className="my-">
          <div className="flex items-center gap-2 mb-3">{stars}</div>
          <Link
            href={`/car-details?id=${item?.id}`}
            className="text-lg text-web_brown max-w-[320px]  leading-6 font-medium"
          >
            {item?.car_name}
          </Link>
          <p className="text-lg max-w-[320px] my-4 min-h-[50px] tracking-tight leading-6 font-medium">
            {item?.description}
          </p>
          {item?.driver_name && (
            <p className="text-xs font-semibold">
              {item?.driver_name}. - {item?.created_at}
            </p>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RecentReview;
