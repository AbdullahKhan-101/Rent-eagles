import { become_host, book_car } from "@/Assets";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Offer = () => {
  return (
    <>
      <div className="bg_offer sm:block hidden max-w-[1400px] mx-auto xl:py-10">
        <div className="flex pt-6 sm:flex-row items-center sm:items-start flex-col mx-auto max-w-[900px] justify-evenly sm:gap-4 gap-8">
          <div className=" sm:self-end sm:pb-5 text-center sm:max-w-[220px] max-w-[180px] ">
            <Link
              href={"/browse?location=los%20angeles"}
              className="text-web_brown max-w-fit text-center mx-auto border-b-2 border-b-transparent hover:border-web_brown transition sm:text-3xl text-xl font-bold flex justify-center items-center gap-1 mb-2"
            >
              Book a Car
              <span>
                <ChevronRightIcon className="w-6 h-6" />
              </span>
            </Link>
            <p className="text-sm font-medium">
              Down the street or across the country, find the perfect vehicle
              for your next adventure
            </p>
          </div>
          <div className="sm:max-w-[300px] max-w-[260px] ">
            <Image
              alt="img"
              src={book_car}
              width={1000}
              height={1000}
              className="w-[240px]"
            />
          </div>
        </div>
        <div className="mx-auto max-w-[900px] py-12 flex sm:flex-row flex-col-reverse items-center sm:items-start justify-evenly sm:gap-4 gap-8">
          <div className="sm:max-w-[300px] max-w-[260px] ">
            <Image
              alt="img"
              src={become_host}
              width={1000}
              height={1000}
              className="w-[260px]"
            />
          </div>
          <div className=" text-center sm:max-w-[250px] max-w-[180px] ">
            <Link
              href={"/host/home"}
              className="text-web_brown border-b-2 border-b-transparent hover:border-web_brown transition sm:text-3xl text-xl font-bold flex justify-center items-center gap-1 mb-2"
            >
              Become a Host
              <span>
                <ChevronRightIcon className="w-6 h-6" />
              </span>
            </Link>
            <p className="text-sm font-medium">
              Accelerate your entreprenuership and start building a small car
              sharing business on Rent Eagles
            </p>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="bg_offer   pt-20  overflow-hidden max-w-[100vw] sm:hidden mx-auto xl:py-6">
        <div className=" sm:flex md:px-10 pt-6 sm:flex-row items-center sm:items-start flex-col mx-auto max-w-[1100px] sm:justify-evenly relative sm:static sm:gap-4 gap-8">
          <div className="absolute !-translate-y-[100px] right-0 left-0 sm:self-end sm:pb-5 mx-auto text-center sm:max-w-[220px] max-w-[250px] pb-5 ">
            <Link
              href={"/browse?location=los%20angeles"}
              className="text-web_brown border-b border-b-transparent hover:border-web_brown transition sm:text-3xl text-2xl font-bold flex justify-center items-center gap-1 mb-2"
            >
              Book a Car
              <span>
                <ChevronRightIcon className="w-6 h-6" />
              </span>
            </Link>
            <p className="text-sm font-medium">
              Down the street or across the country, find the perfect vehicle
              for your next adventure
            </p>
          </div>
          <div className="sm:max-w-[300px]  sm:static py-5 sm:py-0 absolute -right-10 max-w-[260px] w-full">
            <Image
              alt="img"
              src={book_car}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
        </div>
        <div className="sm:flex  md:px-10 pt-6 sm:flex-row items-center sm:items-start flex-col mx-auto max-w-[1100px] sm:justify-evenly relative sm:static sm:gap-4 gap-8">
          <div className="mt-56 sm:max-w-[300px]  py-5 sm:py-0 absolute -left-10 max-w-[280px] w-full">
            <Image
              alt="img"
              src={become_host}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>

          <div className=" sm:self-end mt-[500px] sm:pb-5 mx-auto text-center sm:max-w-[220px] max-w-[250px] ">
            <Link
              href={"/host/home"}
              className="text-web_brown border-b border-b-transparent hover:border-web_brown transition sm:text-3xl text-2xl font-bold flex justify-center items-center gap-1 mb-2"
            >
              Become a Host
              <span>
                <ChevronRightIcon className="w-6 h-6" />
              </span>
            </Link>
            <p className="text-sm font-medium">
              Accelerate your entreprenuership and start building a small car
              sharing business on Rent Eagles
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
