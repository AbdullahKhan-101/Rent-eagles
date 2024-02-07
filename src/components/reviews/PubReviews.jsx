import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Divider } from "@nextui-org/react";
import React from "react";

const PubReviews = ({ heading, reviewsData }) => {
  return reviewsData?.length > 0 ? (
    <div className="flex flex-col w-full justify-start items-start py-6 gap-4">
      <p className="font-bold text-[#616161]">{heading}</p>

      {reviewsData?.map((item, index) => (
        <div
          key={index}
          className="flex flex-col flex-wrap sm:flex-nowrap justify-start items-start   w-full"
        >
          <div className="flex justify-center items-center gap-3">
            <Avatar
              showFallback
              src={item?.profile_photo}
              className="  w-[80px] h-[80px] "
            />
            <div className="flex flex-col justify-center items-start">
              <div>
                <p className="text-sm py-2">{item?.name}</p>
                <p className="text-sm">{item?.date}</p>
              </div>
            </div>
          </div>

          <div className="    w-full flex flex-col justify-center items-start">
            <div className="flex py-2 ">
              {[...Array(Math.floor(item?.rating))].map((_, index) => (
                <StarIcon key={index} className="w-6 h-6 text-red-700" />
              ))}
            </div>
            <p className="py-3">{item?.description}</p>
            <div className="hidden sm:block w-full">
              <Divider orientation="horizantal" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No Reviews given....</p>
  );
};

export default PubReviews;
