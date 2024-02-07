"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { Searchparams, searchparams } from "@/Utils/searchParams";
import { API } from "@/Api";
import Image from "next/image";
import { Avatar, Button, Divider, Input, Progress } from "@nextui-org/react";
import { reviewsdata } from "@/data/reviews";
import { StarIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import BookingForm from "@/components/BookingForm";
import PubReviews from "@/components/reviews/PubReviews";
import ReviewCar from "@/components/Modals/reviews/ReviewCar";
import StripeComponent from "@/components/Stripe/StripeComponent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MapComponent from "@/components/GoogleMaps/ProfileMap";
import { seats } from "@/Assets";

const Index = () => {
  const id = Searchparams("id");
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const [carsData, setCarsData] = useState(null);
  const [carsReview, setCarsReview] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [reviewsAllData, setReviewsAllData] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [paymentID, setPaymentID] = useState(null);

  useEffect(() => {
    const getSingleCar = async () => {
      try {
        const response = await API.PublicCarsDetails(id);
        setCarsData(response?.data?.data);
        const responseReviews = await API.PublicCarsRatings(id);
        setCarsReview(responseReviews?.data?.data[0]);
        const responseReviewsData = await API.PublicCarsReviews(id);
        setReviewsData(responseReviewsData?.data?.data);
        const responseReviewsALLData = await API.PublicCarAllReviews(id);
        setReviewsAllData(responseReviewsALLData?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleCar();
  }, []);

  const options = {
    clientSecret: paymentID ? paymentID : null,
  };

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
  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <div className="relative rounded-xl  ">
        <Slider {...settings}>
          {carsData?.photos?.map((photos, index) => (
            <div key={index} className="relative rounded-xl ">
              <img
                src={photos?.signedUrl}
                alt={`photos${index + 1}`}
                width={1000}
                fallbackSrc
                height={1000}
                className="object-cover w-full cursor-pointer transition-all ease-in-out delay-200   hover:scale-125 rounded-xl z-0 object-center h-[50vh] "
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className=" px-3 sm:px-0 flex  flex-wrap sm:flex-nowrap justify-center items-start py-12 w-full ">
        <div className="max-w-[600px] w-full  ">
          <div className="flex justify-between items-center w-full">
            <h1>{carsData?.car_name}</h1>
          </div>
          <div className="flex   justify-start items-center gap-8">
            <p className="font-light ">Make year:</p>
            <p className=" ">{carsData?.model}</p>
          </div>
          <div className="flex mt-2 justify-start items-center gap-3">
            <Image src={seats} width={100} height={100} className="w-7 h-7" />
            <p className=" ">{carsData?.number_of_seats} seats</p>
          </div>
          <div className="block sm:hidden text-start py-2">
            <h2 className="font-bold text-xl sm:text-2xl  ">
              ${carsData?.price_per_day}/day
            </h2>
          </div>
          <div className="block sm:hidden">
            {!paymentID ? (
              <BookingForm
                id={id}
                setAllowed={setAllowed}
                setPaymentID={setPaymentID}
                price_per_day={carsData?.price_per_day}
              />
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <StripeComponent clientSecret={paymentID} />
              </Elements>
            )}
          </div>
          <div className="flex mt-6 flex-col justify-center items-start gap-6 w-full">
            <h2 className="font-bold text-xl sm:text-2xl ">Hosted by: </h2>
            <Link
              href={`/host/profile-details?id=${carsData?.host_details?.id}`}
            >
              <div className="flex justify-center items-center gap-5 cursor-pointer">
                <div className="relative">
                  <Avatar
                    showFallback
                    src={carsData?.host_details?.profile_photo}
                    className="  w-[100px] h-[100px] "
                  />
                  <div className="flex justify-center items-center gap-2 absolute  mx-auto right-0 bottom-0 left-0 bg-white shadow-lg rounded-lg w-full max-w-[110px] h-fit">
                    <p className="">
                      {carsData?.host_details?.average_ratings}
                    </p>
                    <StarIcon className="w-5 h-6 text-red-700" />
                  </div>
                </div>

                <div className="flex justify-center items-start flex-col">
                  <p className="font-bold">
                    {carsData?.host_details?.host_name}
                  </p>
                  <p className="">
                    {carsData?.host_details?.trips_completed} trips completed
                    <span> Joined {carsData?.host_details?.host_joined}</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col py-5 justify-center items-start gap-6 w-full">
            <h2 className="font-bold text-xl sm:text-2xl ">Features</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 sm:max-w-[70%] w-full gap-4 ">
              {carsData?.car_features?.split(",").map((item, index) => {
                return (
                  <Button
                    key={index}
                    disabled={true}
                    className="bg-red-100 hover:bg-red-500 hover:text-white rounded-lg px-4 py-2"
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col py-5  justify-center items-start gap-6 w-full">
            <h2 className="font-bold text-xl sm:text-2xl ">Description</h2>
            <p className="border-[1px] border-gray-100 p-8">
              {carsData?.description}
            </p>
          </div>
          <div className="flex flex-col py-5  justify-center items-start gap-6 w-full">
            <h2 className="font-bold text-xl sm:text-2xl ">Transmission</h2>
            <p className="border-[1px] border-gray-100 px-5 py-3 ">
              {carsData?.transmission}
            </p>
          </div>
          <div className="flex flex-col justify-center items-start gap-6 w-full">
            <h2 className="font-bold text-xl sm:text-2xl ">
              Rating And Reviews
            </h2>
            <div className="flex flex-col justify-center w-full items-start gap-2">
              <div className="flex justify-center items-center gap-2">
                <p>{carsReview?.ratings}</p>
                <StarIcon className="w-8 h-9 text-red-800" />
              </div>
              <p>({carsReview?.total_ratings} ratings)</p>
            </div>

            <div className="flex justify-start items-center gap-6 w-full">
              <p className="max-w-[120px] w-full">Cleanliness</p>
              <div className=" w-full">
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
              <div className=" w-full">
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
              <div className=" w-full">
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
              <div className=" w-full">
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
              <div className=" w-full">
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

          <div>
            <p className="text-xl font-bold py-2 text-gray-400">REVIEWS</p>
          </div>

          <div className="my-3">
            <ReviewCar id={id} />
          </div>

          <PubReviews
            heading={"REVIEWS FROM DRIVERS"}
            reviewsData={reviewsAllData}
          />
        </div>

        <div className=" w-[400px]   ">
          <div className="hidden sm:block">
            {!paymentID ? (
              <BookingForm
                price_per_day={carsData?.price_per_day}
                id={id}
                setAllowed={setAllowed}
                setPaymentID={setPaymentID}
              />
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <StripeComponent clientSecret={paymentID} />
              </Elements>
            )}
          </div>
        </div>
      </div>

      <MapComponent address={carsData?.address} />
    </div>
  );
};

export default Index;
