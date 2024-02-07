"use client";
import { API } from "@/Api";
import { coverphoto } from "@/Assets";
import { Searchparams } from "@/Utils/searchParams";
import SubmitReview from "@/components/Driver/SubmitReview";
import MapComponent from "@/components/GoogleMaps/ProfileMap";
import PublicCars from "@/components/Host/PublicCars";
import PubReviews from "@/components/reviews/PubReviews";
import {
  CheckCircleIcon,
  StarIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Avatar, Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Index = () => {
  const id = Searchparams("id");
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.GetHostPublic(id);
        setUser(response?.data?.data[0]);
        const responseCars = await API.GetHostCarsPub(id);
        setCars(responseCars?.data?.data);
        const responseReviews = await API.GetHostPubReviews(id);
        setReviewsData(responseReviews?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="relative">
        <Image
          src={coverphoto}
          alt="coverphoto"
          width={1000}
          height={300}
          className="object-cover w-full object-center min-h-[20vh]"
        />
      </div>

      <div className="max-w-[70%] mx-auto w-full">
        <Avatar
          showFallback
          src={user?.profile_photo}
          alt={user?.first_name}
          className="-mt-[7%] mx-auto sm:mx-0 sm:w-[180px] sm:h-[180px] w-[150px] h-[150px] "
        />
      </div>

      <div className="lg:max-w-[70%] xl:max-w-[75%] px-4 w-full mx-auto flex justify-center flex-wrap lg:flex-nowrap items-start gap-8 ">
        <div className="flex flex-col md:flex-row justify-between items-start   w-full">
          <div className="flex flex-col max-w-[350px]  w-full justify-center items-start py-6 gap-4">
            <h1 className="">{user?.host_name}</h1>
            <p>Joined on {user?.host_joined}</p>
            <div className="  ">
              <p className="font-bold text-[#616161]">VERIFIED INFO</p>
            </div>

            <div className="flex   flex-col justify-center gap-4 items-start w-full">
              {user?.is_email_verified && (
                <div className="flex justify-between items-center w-full">
                  <p>Email address</p>
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                </div>
              )}

              {user?.is_phone_verified && (
                <div className="flex justify-between items-center w-full">
                  <p>Phone number</p>
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                </div>
              )}
            </div>
            {user?.city && user?.state && (
              <MapComponent city={user?.city} state={user?.state} />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-12 w-full">
          <div className=" grid grid-cols-1 sm:grid-cols-2  w-full  ml-auto   py-6 gap-4">
            {cars?.map((item, index) => {
              return <PublicCars key={index} cars={item} />;
            })}
          </div>

          <SubmitReview id={id} />

          <PubReviews
            heading={"REVIEWS FROM DRIVERS"}
            reviewsData={reviewsData}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
