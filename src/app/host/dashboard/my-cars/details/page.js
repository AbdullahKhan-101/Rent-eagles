"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { Searchparams, searchparams } from "@/Utils/searchParams";
import { API } from "@/Api";
import Image from "next/image";
import {
  Avatar,
  Button,
  Divider,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { reviewsdata } from "@/data/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewCar from "@/components/Modals/reviews/ReviewCar";
import PubReviews from "@/components/reviews/PubReviews";
import Ratings from "@/components/Host/Ratings";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import LockCar from "@/components/Modals/LockCar";

const Index = () => {
  const id = Searchparams("id");
  const [carsData, setCarsData] = useState(null);
  const [carsReview, setCarsReview] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);

  useEffect(() => {
    const getSingleCar = async () => {
      try {
        const response = await API.GetSingleCar(id);
        setCarsData(response?.data?.data);
        const responseReviews = await API.GetSingleCarReview(id);
        setCarsReview(responseReviews?.data?.data[0]);
        const responseReviewsData = await API.GetSingleCarReviewData(id);
        setReviewsData(responseReviewsData?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCar();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: false,
  };

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  //   console.log(carsData, "datacar...");

  const [lockedDates, setLockedDates] = useState([]);

  const getLockedDates = async () => {
    const res = await API.getLockDates({ car_id: id });
    console.log(res, "res....");
    setLockedDates(res?.data);
  };

  return (
    <>
      <div className="text-end pb-2 -translate-y-2 ">
        <Button
          onClick={() => {
            getLockedDates();
            onOpen();
          }}
          className="bg-red-50 border border-red-200 text-red-500 font-medium"
          startContent={<LockOpenIcon className="w-4 h-4 text-red-500" />}
        >
          Lock this car
        </Button>
      </div>
      <div className="relative rounded-xl">
        <Slider {...settings}>
          {carsData?.photos?.map((photos, index) => (
            <div key={index} className="relative rounded-xl ">
              <img
                src={photos?.signedUrl}
                alt={`photos${index + 1}`}
                width={1000}
                fallbackSrc
                height={1000}
                className="object-cover cursor-pointer transition-all ease-in-out delay-200   hover:scale-125 w-[100vw] rounded-xl z-0 object-center h-[50vh] "
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col w-full justify-center items-start py-12 gap-6">
        <div className="flex justify-between items-center w-full">
          <h1>{carsData?.car_name}</h1>
          <h2 className="font-bold text-xl sm:text-2xl ">
            ${carsData?.price_per_day}/day
          </h2>
        </div>
        <div className="flex justify-center items-center gap-8">
          <p className="font-bold ">Make year:</p>
          <p className=" ">{carsData?.model}</p>
        </div>

        <div className="flex flex-col justify-center items-start gap-6 w-full">
          <h2 className="font-bold text-xl sm:text-2xl ">Hosted by: </h2>
          <div className="flex justify-center items-center gap-5">
            <div className="relative">
              <Avatar
                showFallback
                src={carsData?.host_details?.profile_photo}
                className="  w-[100px] h-[100px] "
              />
              <div className="flex justify-center items-center gap-2 absolute  mx-auto right-0 bottom-0 left-0 bg-white shadow-lg rounded-lg w-full max-w-[110px] h-fit">
                <p className="">{carsData?.host_details?.average_ratings}</p>
                <StarIcon className="w-5 h-6 text-red-700" />
              </div>
            </div>

            <div className="flex justify-center items-start flex-col">
              <p className="font-bold">{carsData?.host_details?.host_name}</p>
              <p className="">
                {carsData?.host_details?.trips_completed} trips completed
                <span> Joined {carsData?.host_details?.host_joined}</span>
              </p>
              {/* <p className=" ">{carsData?.host_details?.average_ratings}</p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-6 w-full">
          <h2 className="font-bold text-xl sm:text-2xl ">Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 sm:max-w-[70%] w-full gap-4 ">
            {carsData?.car_features?.split(",").map((item, index) => {
              return (
                <Button
                  key={index}
                  className="bg-red-100 hover:bg-red-500 hover:text-white rounded-lg px-4 py-2"
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-6 w-full">
          <h2 className="font-bold text-xl sm:text-2xl ">Description</h2>
          <p className="border-[1px] border-gray-100 p-8">
            {carsData?.description}
          </p>
        </div>
        <Ratings carsReview={carsReview} />

        <div>
          <p className="text-xl font-bold text-gray-300">REVIEWS</p>
        </div>

        <PubReviews
          heading={"REVIEWS FROM DRIVERS"}
          reviewsData={reviewsData}
        />
      </div>
      <LockCar
        id={carsData?.id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        lockedDates={lockedDates}
        getLockedDates={getLockedDates}
      />
    </>
  );
};

export default Index;
