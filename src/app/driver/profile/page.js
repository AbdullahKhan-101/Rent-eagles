"use client";
import { API } from "@/Api";
import { checkbox, coverphoto } from "@/Assets";
import { ToastError, ToastSuccess } from "@/Utils/toast";
import MapComponent from "@/components/GoogleMaps/ProfileMap";
import Allreview from "@/components/reviews/Allreview";
import PubReviews from "@/components/reviews/PubReviews";
import { reviewsdata } from "@/data/reviews";
import {
  CheckCircleIcon,
  StarIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Avatar, Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const initialUser = useSelector((state) => state.user.user);

  const [reviewsData, setReviewsData] = useState(null);
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await API.getDriver();
        setUser(res?.data?.data[0]?.user);
        const responseReviews = await API.GetDriverPubReviews(user?.id);
        setReviewsData(responseReviews?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleVerifyEmail = async () => {
    try {
      const response = await API.VerifyEmail({ email: user?.email });
      ToastSuccess(response);
    } catch (error) {
      ToastError(error);
      console.log(error);
    }
  };

  // console.log(user, "user... old...");

  const address = user?.address || "";

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
        <div className="absolute bottom-[2rem] right-[8rem]">
          <Link href={"/driver/profile/edit-profile"}>
            <Button size="xs" className="bg-red-700 text-white">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-[70%] mx-auto w-full">
        <Avatar
          showFallback
          src={user?.profile_photo}
          alt={user?.first_name}
          className="-mt-[7%] mx-auto sm:mx-0 sm:w-[180px] sm:h-[180px] w-[150px] h-[150px] "
        />
      </div>

      <div className="lg:max-w-[70%] px-4 w-full mx-auto flex justify-start items-center gap-8 ">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
          <div className="flex flex-col md:max-w-[30%] w-full justify-center items-start py-6 gap-4">
            <h1 className="">{user?.first_name + " " + user?.last_name}</h1>
            <p>Joined on {user?.join_date}</p>
            <div className="  ">
              <p className="font-bold text-[#616161]">VERIFIED INFO</p>
            </div>

            <div className="flex flex-col justify-center gap-4 items-start w-full">
              <div className="flex justify-between items-center w-full">
                <p>Approved to drive</p>
                {user?.is_approved_to_drive ? (
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                ) : (
                  <XCircleIcon className="w-7 h-7  " />
                )}
              </div>
              <div className="flex justify-between items-center w-full">
                <p>Email address</p>
                {user?.is_email_verified ? (
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                ) : (
                  <Button
                    onClick={handleVerifyEmail}
                    size="xs"
                    className="bg-red-700 text-white"
                  >
                    Verify Email
                  </Button>
                )}
              </div>
              <div className="flex justify-between items-center w-full">
                <p>Phone number</p>
                {user?.is_phone_verified ? (
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                ) : (
                  <XCircleIcon className="w-7 h-7  " />
                )}
              </div>
              <div className="flex justify-between items-center w-full">
                <p>Documents</p>
                {user?.is_approved_to_drive ? (
                  <CheckCircleIcon className="w-7 h-7 text-red-700" />
                ) : (
                  <XCircleIcon className="w-7 h-7  " />
                )}
              </div>
            </div>
            <p>
              Build trust with other users on Rent Eagles by verifying your
              contact information.
            </p>
          </div>

          <div className="flex flex-col md:max-w-[60%] w-full  ml-auto justify-start items-start py-6 gap-4">
            {user?.city && user?.state ? (
              <p className="text-[#616161]">LOCATION</p>
            ) : (
              <p className="text-[#616161]">
                EDIT YOUR PROFILE TO SHOW LOCATION
              </p>
            )}

            {user?.address && <MapComponent address={address} />}

            <PubReviews
              heading={"REVIEWS FROM HOSTS"}
              reviewsData={reviewsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
