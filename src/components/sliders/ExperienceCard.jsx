import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ExperienceCard = ({ item }) => {
  const today = new Date();
  const tomorrow = new Date();
  const Max_date = new Date();
  tomorrow.setDate(today.getDate() + 1);
  Max_date.setDate(today.getDate() + 30);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const [value, onChange] = useState([tomorrow, Max_date]);

  return (
    <Link
      target="_blank"
      href={`/search?placeId=${"ChIJV2SgwjJBNIYRcFvbYZI8WJ0"}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}&feature=${
        item.name
      }`}
    >
      <div className="scale-[.96] cursor-pointer mx-auto rounded-t-2xl overflow-hidden max-w-[460px] focus-visible:outline-none transition-all ease-out duration-300">
        <div className="max-h-[330px] rounded-2xl overflow-hidden">
          <Image
            alt="card-img"
            width={1000}
            height={300}
            src={item.img}
            className="w-full hover:scale-105 h-full transition"
          />
        </div>
        <div className="py-4 flex items-center gap-3">
          <Image
            alt="icon"
            width={1000}
            height={1000}
            className="w-6"
            src={item.icon}
          />
          <p className="text-lg font-semibold line-clamp-1">{item.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
