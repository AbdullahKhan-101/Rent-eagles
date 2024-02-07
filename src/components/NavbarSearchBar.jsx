"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import PlacesAutoComplete from "./Places/PlacesAutoComplete";
import { Autocomplete } from "@react-google-maps/api";

const NavbarSearchBar = ({ absolute }) => {
  const today = new Date();
  const tomorrow = new Date();
  const Max_date = new Date();
  tomorrow.setDate(today.getDate() + 1);
  Max_date.setDate(today.getDate() + 30);
  const [value, onChange] = useState([tomorrow, Max_date]);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [placeID, setPlaceId] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    const place = searchResult?.getPlace();
    setPlaceId(place?.place_id);
  };

  return (
    <div className="w-full hidden lg:block ">
      <div
        className={`${
          absolute && "absolute"
        }   md:max-w-[945px] max-w-[300px]  mx-auto   left-0 right-0 top-[8%] lg:top-[10%]  rounded-xl md:rounded-full p-2 flex md:flex-row flex-col items-center`}
      >
        <div className="flex-1 flex md:flex-row  flex-col gap-2 lg:px-4 ">
          <div className="sm:flex justify-center gap-3  items-end w-full">
            <p className="text-web_brown font-semibold">where</p>

            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
              <input
                type="text"
                placeholder="City, airport, address or hotel"
                className="bg-gray-100 rounded-xl"
                style={{
                  maxWidth: `340px `,
                  width: "100%",
                  height: `32px `,
                  padding: `0 12px `,
                  fontSize: `14px `,
                  outline: `none `,
                  // background: "white ",
                }}
              />
            </Autocomplete>
          </div>
          <div className=" py-2 md:py-0 md:pr-4 md:pl-2 sm:flex justify-center gap-3  items-end border-black/40">
            <label
              htmlFor="from"
              className="block text-sm  text-left pl-1 text-web_brown font-semibold"
            >
              Date
            </label>
            <div className="border-b border-b-gray-500/50 pb-1">
              <DateRangePicker
                minDate={new Date()}
                onChange={onChange}
                value={value}
              />
            </div>
          </div>
          <div className="sm:flex justify-center gap-3  items-end border-black/40">
            <label
              htmlFor="from"
              className="block text-sm text-left text-web_brown font-semibold"
            >
              Time
            </label>
            <div className="flex border-b  pb-[2px] border-b-gray-500/50 sm:items-center sm:gap-[2px] gap-1.5 sm:flex-row flex-col">
              <div className="flex flex-1 items-center gap-[2px] ">
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border-none outline-none"
                />
                <span className="mx-1 w-[10px] h-[2px] bg-black/50"> </span>
              </div>
              <div className="flex flex-1 items-center gap-[2px] ">
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="outline-none border-none"
                />
                <span className="mx-1 opacity-0 w-[10px] h-[2px] bg-black/50">
                  {" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="hidden md:block"
          href={`/search?placeId=${placeID}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}`}
        >
          <div className="bg-[#99000B] rounded-full p-1.5 flex items-center justify-center">
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </div>
        </Link>
        <Link
          className="block md:hidden w-[90%]"
          href={`/search?placeId=${placeID}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}`}
        >
          <button className="bg-web_brown w-full py-1.5 mt-2 text-white rounded-2xl">
            Search{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarSearchBar;
