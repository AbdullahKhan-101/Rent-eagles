"use client";
import { overlaper } from "@/Assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Overlaptext = () => {
  const host = useSelector((state) => state.host.host);
  return (
    <div className="overlaparea py-16">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="img-with-overlap flex flex-wrap justify-end">
          <Image
            src={overlaper}
            width={1120}
            height={800}
            alt=""
            className="w-full"
          />
          <div className="w-full md:w-2/5 bg-[#F0D9DB] mt-0 md:-mt-28 py-8 px-5">
            <p className="text-black font-bold text-base mb-3">
              “We didn’t want it to be too time intensive because we both have
              full time jobs, and also, we want it to be a good return on our
              investment… The profits are great for us — we can pay off a Jeep a
              year!”
            </p>
          </div>
        </div>
        <div className="richarea pt-16 text-center w-full md:w-3/4 mx-auto">
          <h2 className="text-center font-bold text-3xl md:text-5xl ">
            A powerhouse power couple
          </h2>
          <h4 className="text-black  font-bold py-4">
            Sharing a portfolio of Jeeps in Denver
          </h4>
          <p className="text-black text-base mb-3">
            Meet Justin and Meagan, a powerhouse hosting couple out of Denver,
            CO. The team started sharing Meagan’s Jeep to try Rent Eagles on for
            size as a novel investment opportunity, and scaled their
            Jeep-sharing business up to six cars to help build their savings and
            diversify their investment portfolio as they maintain their full
            time jobs.
          </p>
          <Link
            href={`${
              host?.is_approved ? "/host/car-listing" : "/host/sign-up"
            }`}
            className="text-[#99000B] py-3 px-7 mx-auto md:ml-0 mb-6 md:mb-0  flex flex-wrap justify-center"
          >
            Read their Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overlaptext;
