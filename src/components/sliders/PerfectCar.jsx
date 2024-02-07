import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PerfectCar = ({ item }) => {
  const today = new Date();
  const tomorrow = new Date();
  const Max_date = new Date();

  tomorrow.setDate(today.getDate() + 1);
  Max_date.setDate(today.getDate() + 30);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const [value, onChange] = useState([tomorrow, Max_date]);
  return (
    <div className="mx-auto flex items-center gap-8 justify-evenly  max-w-[1300px] lg:flex-row flex-col-reverse">
      <div className=" max-w-[600px] ">
        <Image
          alt="car-image"
          src={item.img}
          width={1000}
          height={1000}
          className="select-none pointer-events-none"
        />
      </div>
      <div className=" max-w-[420px] flex flex-col gap-5">
        <h2 className="sm:text-3xl text-2xl font-bold">
          {item.heading}{" "}
          <span className="text-web_brown">{item.heading2} </span>
        </h2>
        <p className="font-medium ">{item.desc}</p>
        <Link
          target="_blank"
          href={`/search?placeId=${"ChIJV2SgwjJBNIYRcFvbYZI8WJ0"}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}`}
        >
          <Button className="bg-web_brown text-white px-6 py-2.5 max-w-fit rounded-none">
            <button>Browse Cars</button>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PerfectCar;
