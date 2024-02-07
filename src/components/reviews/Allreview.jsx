import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Divider } from "@nextui-org/react";
import React from "react";

const Allreview = ({ reviewsdata }) => {
  console.log(reviewsdata)
  let userRating = 5;
  return (
    <div className="flex flex-col w-full justify-start items-start py-6 gap-4">
      <p className="font-bold text-[#616161]">REVIEWS FROM HOST</p>
      <div className="flex justify-center items-center gap-4">
        <p>5.0</p>
        <div className="flex">
          {[...Array(Math.floor(userRating))].map((_, index) => (
            <StarIcon key={index} className="w-6 h-6 text-red-700" />
          ))}
        </div>

        <p>(408 reviews)</p>
      </div>

      {reviewsdata?.map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap sm:flex-nowrap justify-start items-start gap-8 w-full"
        >
          <Avatar
            showFallback
            src={item?.image}
            className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] "
          />
          <div className=" sm:max-w-[65%] w-full flex flex-col justify-center items-start">
            <div className="hidden sm:block">
              <Divider orientation="horizantal" />
            </div>
            <div className="flex pt-2">
              {[...Array(Math.floor(item?.stars))].map((_, index) => (
                <StarIcon key={index} className="w-6 h-6 text-red-700" />
              ))}
            </div>
            <p className="text-sm">{item?.name}</p>
            <p className="py-3">{item?.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allreview;
