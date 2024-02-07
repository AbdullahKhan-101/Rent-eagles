import { StarIcon } from "@heroicons/react/24/solid";
import { Progress } from "@nextui-org/react";
import React from "react";

const Ratings = ({ carsReview }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-6 w-full">
      <h2 className="font-bold text-xl sm:text-2xl ">Rating And Reviews</h2>
      <div className="flex flex-col justify-center items-start gap-2">
        <div className="flex justify-center items-center gap-2">
          <p>{carsReview?.ratings}</p>
          <StarIcon className="w-8 h-9 text-red-800" />
        </div>
        <p>({carsReview?.total_ratings} ratings)</p>
      </div>

      <div className="flex justify-start items-center gap-6 w-full">
        <p className="max-w-[120px] w-full">Cleanliness</p>
        <div className=" max-w-[30%] w-full">
          <Progress
            className=" bg-red-400  !p-0 rounded  "
            classNames={{
              indicator: "bg-red-700",
              value: "text-foreground/60",
              label: "bg-none",
            }}
            value={carsReview?.cleanliness * 20}
          />
        </div>
        <p>{carsReview?.cleanliness}</p>
      </div>
      <div className="flex justify-start items-center gap-6 w-full">
        <p className="max-w-[120px] w-full">Maintenance</p>
        <div className=" max-w-[30%] w-full">
          <Progress
            className=" bg-red-400  !p-0 rounded  "
            classNames={{
              indicator: "bg-red-700",
              value: "text-foreground/60",
              label: "bg-none",
            }}
            value={carsReview?.maintenance * 20}
          />
        </div>
        <p>{carsReview?.maintenance}</p>
      </div>
      <div className="flex justify-start items-center gap-6 w-full">
        <p className="max-w-[120px] w-full">Communication</p>
        <div className=" max-w-[30%] w-full">
          <Progress
            className=" bg-red-400  !p-0 rounded  "
            classNames={{
              indicator: "bg-red-700",
              value: "text-foreground/60",
              label: "bg-none",
            }}
            value={carsReview?.communication * 20}
          />
        </div>
        <p>{carsReview?.communication}</p>
      </div>
      <div className="flex justify-start items-center gap-6 w-full">
        <p className="max-w-[120px] w-full">Convenience</p>
        <div className=" max-w-[30%] w-full">
          <Progress
            className=" bg-red-400  !p-0 rounded  "
            classNames={{
              indicator: "bg-red-700",
              value: "text-foreground/60",
              label: "bg-none",
            }}
            value={carsReview?.convenience * 20}
          />
        </div>
        <p>{carsReview?.convenience}</p>
      </div>
      <div className="flex justify-start items-center gap-6 w-full">
        <p className="max-w-[120px] w-full">Accuracy</p>
        <div className=" max-w-[30%] w-full">
          <Progress
            className=" bg-red-400  !p-0 rounded  "
            classNames={{
              indicator: "bg-red-700",
              value: "text-foreground/60",
              label: "bg-none",
            }}
            value={carsReview?.accuracy * 20}
          />
        </div>
        <p>{carsReview?.accuracy}</p>
      </div>
    </div>
  );
};

export default Ratings;
