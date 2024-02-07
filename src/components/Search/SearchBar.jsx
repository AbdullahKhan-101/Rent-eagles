"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import PlacesAutoComplete from "../Places/PlacesAutoComplete";
import { Autocomplete } from "@react-google-maps/api";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const SearchBar = ({ absolute, heading, category, location }) => {
  const today = new Date();
  const tomorrow = new Date();
  const Max_date = new Date();
  tomorrow.setDate(today.getDate() + 1);
  Max_date.setDate(today.getDate() + 30);

  const [value, onChange] = useState([tomorrow, Max_date]);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [placeID, setPlaceId] = useState("ChIJV2SgwjJBNIYRcFvbYZI8WJ0");
  const [searchResult, setSearchResult] = useState(null);

  const pathname = usePathname();

  let newHeading = heading?.substring(7).toLowerCase(); // Convert to lowercase
  newHeading = newHeading?.charAt(0).toUpperCase() + newHeading?.slice(1); // Capitalize first letter

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };
  const onPlaceChanged = () => {
    const place = searchResult?.getPlace();
    setPlaceId(place?.place_id);
  };

  return (
    <>
      <div
        className={`${
          absolute && "absolute"
        }   md:max-w-[860px] max-w-[300px]  mx-auto custom_shadow left-0 right-0 top-[4%] lg:top-[10%] bg-white rounded-xl md:rounded-full p-2 flex md:flex-row flex-col items-center`}
      >
        <div className="flex-1 flex md:flex-row  flex-col gap-2 sm:max-w-full lg:px-4 max-w-[250px]">
          <div className="flex-1">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-left pl-1 "
            >
              Where
            </label>
            {/* <PlacesAutoComplete
            setSearchResult={setSearchResult}
            setPlaceId={setPlaceId}
            searchResult={searchResult}
          /> */}
            <Autocomplete
              onPlaceChanged={onPlaceChanged}
              onLoad={onLoad}
              // setSearchResult={setSearchResult}
              // setPlaceId={setPlaceId}
              // searchResult={searchResult}
            >
              <input
                type="text"
                placeholder="City, airport, address or hotel"
                className="!bg-transparent"
                style={{
                  maxWidth: `340px `,
                  width: "100%",
                  // height: `32px `,
                  padding: `0 6px `,
                  fontSize: `14px `,
                  outline: `none `,
                  // background: "white ",
                }}
              />
            </Autocomplete>
          </div>
          <div className="md:border-x border-y md:border-y-0 py-2 md:py-0 md:pr-4 md:pl-2 sm:flex-1 border-black/40">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-left pl-1"
            >
              Date
            </label>
            <DateRangePicker
              minDate={new Date()}
              onChange={onChange}
              value={value}
            />
          </div>
          <div className="sm:flex-1 border-black/40">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-left"
            >
              Time
            </label>
            <div className="flex sm:items-center sm:gap-[2px] gap-1.5 sm:flex-row flex-col">
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
          target="_blank"
          className="hidden md:block"
          href={`/search?placeId=${placeID}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}`}
        >
          <div className="bg-[#99000B] rounded-full p-1.5 flex items-center justify-center">
            <MagnifyingGlassIcon className="w-5 h-5 text-white" />
          </div>
        </Link>
        <Link
          target="_blank"
          className="block md:hidden w-[90%]"
          href={`/search??placeId=${placeID}&start_date=${value[0].toISOString()}&start_time=${startTime.toString()}&end_date=${value[1].toISOString()}&end_time=${endTime.toString()}`}
        >
          <button className="bg-web_brown w-full py-1.5 mt-2 text-white rounded-2xl">
            Search{" "}
          </button>
        </Link>
      </div>
      {!absolute && (
        <div className="  md:max-w-[860px] max-w-[300px]  mx-auto left-0 right-0 top-[4%] lg:top-[10%]  p-2 flex md:flex-row flex-col items-center">
          <div className="flex justify-end gap-3 w-full items-center">
            <span>Home</span>
            <ArrowLongRightIcon className="h-6 w-6" />
            {heading && (
              <>
                <span> {newHeading}</span>
                {pathname !== "/rent" && (
                  <ArrowLongRightIcon className="h-6 w-6" />
                )}
              </>
            )}
            {pathname !== "/rent" && (
              <>
                <span> {category ?? "Cars"}</span>
                <ArrowLongRightIcon className="h-6 w-6" />
              </>
            )}
            {pathname !== "/rent" && <span> {location ?? "Los Angeles"}</span>}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
