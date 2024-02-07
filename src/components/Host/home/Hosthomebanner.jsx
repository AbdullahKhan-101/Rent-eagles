"use client";
import { host_banner, travelers_logo } from "@/Assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Hosthomebanner = () => {
  const host = useSelector((state) => state.host.host);

  return (
    <div className="host-banner">
      <div className="container mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-auto">
            <h2 className="text-1xl font-bold">FIND YOUR DRIVE</h2>
            <h2 className="text-3xl lg:text-6xl font-bold mb-4">
              Start a car sharing <br /> business on Rent Eagles
            </h2>
            <div className="flex flex-wrap items-center w-full md:max-w-[80%]">
              <Link
                href={`${
                  host?.is_approved ? "/host/car-listing" : "/host/sign-up"
                } `}
                className="bg-[#99000B] py-3 px-7 text-white table"
              >
                Get Started
              </Link>
              <h2 className="text-black md:ml-3 mt-3 md:mt-0 font-bold">
                INSURANCE PROVIDER
              </h2>
              <Image
                src={travelers_logo}
                width={120}
                height={80}
                alt=""
                className="md:-mt-[12px] md:ml-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="img-wrapper">
        <Image
          src={host_banner}
          width={1920}
          height={530}
          alt=""
          className="w-full"
        />
      </div>
      <div className="bottom-content py-16">
        <div className="container mx-auto px-5 flex flex-wrap justify-center">
          <div className=" w-full md:w-[45%] flex flex-wrap justify-start md:justify-center">
            <p className="text-black text-base mb-3">
              Take control of your financial future while cultivating your
              entrepreneurial fire with Rent Eagles, the world’s largest car
              sharing marketplace.
            </p>
            <p className="text-black text-base mb-3">
              Rent Eagles gives budding entrepreneurs the tools and resources
              they need to build a small, successful portfolio of cars to share
              on the marketplace, and the opportunity to add thousands to their
              annual income.
            </p>
            <p className="text-black text-base mb-3">
              List your first car now to get started, then build your business
              plan and scale how you want!
            </p>
            <Link
              href={`${
                host?.is_approved ? "/host/car-listing" : "/host/sign-up"
              }`}
              className="bg-[#99000B] py-3 px-7 text-white table"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hosthomebanner;
