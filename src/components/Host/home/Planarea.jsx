"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Planarea = () => {
  const host = useSelector((state) => state.host.host);
  return (
    <div className="planarea py-16">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="richarea pt-16 text-center w-full md:w-3/4 mx-auto">
          <h2 className="text-center font-bold text-3xl md:text-5xl ">
            Start building your business plan
          </h2>

          <p className="text-black text-base mb-3 w-full md:w-[65%] mx-auto py-6">
            List your first car to get started today and build your plan to take
            control of your financial future tomorrow.
          </p>
          <Link
            href={`${
              host?.is_approved ? "/host/car-listing" : "/host/sign-up"
            }`}
            className="bg-[#99000B] text-white py-3 px-7 mx-auto md:ml-0 mb-6 md:mb-0 "
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Planarea;
