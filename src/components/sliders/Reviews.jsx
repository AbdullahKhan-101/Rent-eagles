import { trustpilate_icon } from "@/Assets";
import { StarIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Reviews = ({ item }) => {
  const stars = Array.from(
    { length: item?.average_ratings?.charAt(0) },
    (_, index) => <StarIcon key={index} className="w-5 h-5 text-web_brown " />
  );

  return (
    <div className="scale-[.96] border min-h-[265px] p-4 custom_shadow bg-white cursor-pointer mx-auto rounded-2xl overflow-hidden max-w-[460px] focus-visible:outline-none transition-all ease-out duration-300">
      <div className="flex items-center gap-4">
        {item?.profile_photo ? (
          <Image
            alt="avatar"
            width={1000}
            height={1000}
            src={item?.profile_photo}
            className="w-16 sm:w-20 h-16 sm:h-20 rounded-full"
          />
        ) : (
          <Avatar className="w-16 sm:w-20 h-16 sm:h-20 opacity-70" />
        )}
        <div>
          <h3 className="text-xl font-bold mb-2  leading-4">
            {item?.host_name}
          </h3>
          <div className="flex items-center gap-3 mb-2 ">
            <Image alt="icon" src={trustpilate_icon} />
            <p className="text-xs font-semibold">All-Star Host</p>
          </div>
          <p className="text-xs font-semibold">
            {item?.total_trips} trips. Joined {item?.created_at}{" "}
          </p>
        </div>
      </div>
      <div className="my-7">
        <div className="flex items-center gap-2 mb-3">{stars}</div>
        <p className="text-lg max-w-[320px] min-h-[50px] tracking-tight leading-6 font-medium">
          {item?.driver?.review_description}
        </p>
      </div>
      <div>
        <p className="text-xs font-semibold">
          {item?.driver?.driver_name} {item?.driver?.driver_reviewed_when}
        </p>
      </div>
    </div>
  );
};

export default Reviews;
