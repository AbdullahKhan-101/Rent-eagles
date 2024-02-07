"use client";
import { API } from "@/Api";
import MyCars from "@/components/Host/MyCars";
import Loading from "@/components/Loading";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Index = () => {
  const [carsData, setCarsData] = useState(null);
  const initialHost = useSelector((state) => state.host.host);
  const [host, setHost] = useState(initialHost);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await API.getHost();
        setHost(res?.data?.data[0]?.user);
        const responseReviews = await API.GetHostPubReviews(host?.id);
        setReviewsData(responseReviews?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const GetCarsHost = async () => {
      try {
        const response = await API.GetHostCars();
        setCarsData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetCarsHost();
  }, []);

  const [bankData, setBankData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GetBankDetails();
        setBankData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(bankData);

  return (
    <div className="w-full py-14 ">
      {loading ? (
        <Loading />
      ) : (
        <>
          {host?.is_approved ? (
            <div className="w-full hidden sm:block  py-4 sm:py-0">
              <Link href={"/host/car-listing"}>
                <Button className=" bg-[#99000B] text-white float-right">
                  Add a new Car
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {bankData ? (
                <div className="w-full text-center font-semibold text-lg hidden sm:block  py-4 sm:py-0">
                  <p>Your profile verification is currently under review.</p>
                </div>
              ) : (
                <div className="w-full hidden sm:block  py-4 sm:py-0">
                  <Link href={"/host/profile/bank"}>
                    <Button className=" bg-[#99000B] text-white float-right">
                      Enter Bank Details First
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-between place-items-center gap-6">
        <div className="w-full block sm:hidden  py-4 sm:py-0">
          <Link href={"/host/car-listing"}>
            <Button className=" bg-[#99000B] text-white float-right">
              Add a new Car
            </Button>
          </Link>
        </div>
        {carsData?.map((item, index) => {
          return <MyCars key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Index;
