"use client";
import { API } from "@/Api";
import { noCars } from "@/Assets";
import { Searchparams } from "@/Utils/searchParams";
import CarMap from "@/components/GoogleMaps/CarMap";
import Loading from "@/components/Loading";
import Car_Card from "@/components/Search/Car_Card";
import Filters from "@/components/Search/Filters";
import { MapIcon, XCircleIcon } from "@heroicons/react/24/outline";
// import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const start_date = Searchparams("start_date");
  const start_time = Searchparams("start_time");
  const end_date = Searchparams("end_date");
  const end_time = Searchparams("end_time");

  const placeId = Searchparams("placeId");

  const getallCars = async () => {
    setLoading(true);
    try {
      const res = await API.GetAllCars(
        placeId,
        start_date,
        end_date,
        start_time,
        end_time
      );
      setCars(res?.data?.data);
      setFilteredCars(res?.data?.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilteredCars([...cars]);
  };

  useEffect(() => {
    getallCars();
  }, [start_date, end_date, placeId]);

  return (
    <div className="relative">
      {cars && <Filters cars={cars} setCars={setFilteredCars} />}
      <div className="flex relative">
        {loading ? (
          <Loading />
        ) : (
          <div className=" overflow-y-auto custom_dropdown py-4 lg:px-6 px-4 xl:flex-[.50] max-h-[85vh] min-h-[85vh] sm:max-h-[81vh] sm:min-h-[81vh] lg:flex-[.55] ">
            <div className="my-8 flex flex-col gap-6">
              {filteredCars?.length ? (
                filteredCars?.map((item, index) => {
                  return (
                    <Car_Card
                      allData={item}
                      key={index}
                      start_date={start_date}
                      end_date={end_date}
                      start_time={start_time}
                      end_time={end_time}
                    />
                  );
                })
              ) : (
                <div className="flex flex-col justify-center gap-4 max-w-[550px] items-center">
                  <Image alt="no-car" src={noCars} />
                  <h5 className="font-semibold text-lg">No cars found</h5>
                  <p>
                    Try changing your filters, adjusting your dates, or
                    exploring the map
                  </p>
                  <Button
                    onClick={resetFilters}
                    className="bg-web_brown text-white px-6 py-2.5 max-w-fit rounded-none"
                  >
                    <button>Reset filters</button>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`block absolute transition-all !duration-700 ease-out lg:flex-[.55] lg:static   ${
            isOpen
              ? " h-full w-full top-0 right-0 left-0 opacity-100 "
              : "h-0 opacity-0 lg:h-auto lg:opacity-100"
          } `}
        >
          {filteredCars.length > 0 && <CarMap cars={filteredCars} />}
        </div>
      </div>
      {/*  */}
      {filteredCars?.length > 0 && (
        <>
          {!isOpen ? (
            <div
              onClick={() => setIsOpen(true)}
              className="max-w-fit lg:hidden cursor-pointer absolute bottom-7 flex items-center gap-2 mx-auto text-white right-0 left-0 bg-web_brown rounded-lg p-2"
            >
              <MapIcon className="w-5 h-5 text-white" />
              <p>Map</p>
            </div>
          ) : (
            <div
              onClick={() => setIsOpen(false)}
              className="max-w-fit lg:hidden cursor-pointer absolute bottom-7 flex items-center gap-1 mx-auto text-white right-0 left-0 bg-web_brown rounded-lg p-2"
            >
              <XCircleIcon className="w-6 h-6 " />
              <p>Close</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
