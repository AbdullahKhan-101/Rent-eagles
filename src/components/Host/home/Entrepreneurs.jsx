"use client";
import { entrepreneurs_img } from "@/Assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Entrepreneurs = () => {
  const host = useSelector((state) => state.host.host);

  return (
    <div className="entrepreneurs py-16">
      <div className="container max-w-6xl mx-auto px-5">
        <div className="header flex flex-wrap justify-center">
          <div className="w-full md:w-9/12">
            <h2 className="text-center font-bold text-3xl md:text-5xl mb-6">
              Entrepreneurs of all experience levels welcome
            </h2>
            <p className="w-full md:w-9/12 mx-auto text-center text-black text-base mb-3">
              Whether you want to host a few cars to earn extra income to pay
              for life’s expenses, or build a small shop with a portfolio of
              cars, start with one car and scale how you want.
            </p>
          </div>
        </div>
        <div className="list-body w-full lg:max-w-[70%] px-4  mx-auto flex flex-wrap">
          <div className="w-full lg:w-3/12 flex flex-wrap content-evenly justify-center">
            <div className="list-container pr-0 md:pr-8">
              <div className="mb-5">
                <h3 className="text-center md:text-left text-black font-bold text-2xl mb-3">
                  $10,516
                </h3>
                <p className="text-center md:text-left text-black font-normal text-base mb-4">
                  Average annual income of 1 car*
                </p>
              </div>
              <div className="mb-5">
                <h3 className="text-center md:text-left text-black font-bold text-2xl mb-3">
                  $10,516
                </h3>
                <p className="text-center md:text-left text-black font-normal text-base mb-4">
                  Average annual income of 1 car*
                </p>
              </div>
              <div className="mb-5">
                <h3 className="text-center md:text-left text-black font-bold text-2xl mb-3">
                  $10,516
                </h3>
                <p className="text-center md:text-left text-black font-normal text-base mb-4">
                  Average annual income of 1 car*
                </p>
              </div>
              <div className="mb-5">
                <h3 className="text-center md:text-left text-black font-bold text-2xl mb-3">
                  $10,516
                </h3>
                <p className="text-center md:text-left text-black font-normal text-base mb-4">
                  Average annual income of 1 car*
                </p>
              </div>
              <div className="mb-5">
                <h3 className="text-center md:text-left text-black font-bold text-2xl mb-3">
                  $10,516
                </h3>
                <p className="text-center md:text-left text-black font-normal text-base mb-4">
                  Average annual income of 1 car*
                </p>
              </div>
              <Link
                href={`${
                  host?.is_approved ? "/host/car-listing" : "/host/sign-up"
                }`}
                className="bg-[#99000B] py-3 px-7 mx-auto md:ml-0 mb-6 md:mb-0 text-white table"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <Image
              src={entrepreneurs_img}
              width={600}
              height={560}
              alt=""
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrepreneurs;
