import { noFound } from "@/Assets";
import Image from "next/image";
import React from "react";

const NoCarFound = () => {
  return (
    <div className="py-8 container mx-auto px-5 text-center flex justify-center ">
      <div>
        <Image
          alt="no-cars"
          src={noFound}
          width={1000}
          height={1000}
          className="sm:max-w-[400px] max-w-[280px]"
        />
        <p className="text-center sm:text-2xl text-xl font-bold">
          No data at the moment.
        </p>
      </div>
    </div>
  );
};

export default NoCarFound;
