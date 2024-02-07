"use client";
import {
  autoLogo,
  destination,
  hit_the_road,
  liveLargecar,
  trustpilate_icon,
} from "@/Assets";
import ImageWithtext from "@/components/Aboutus/ImageWithtext";
import MultiplePara from "@/components/rent-a-jeep/MultiplePara";
import { carsCategoryData, carsData, reviewsData } from "@/data/slider";
import Slider from "@/components/sliders/Slider";
import React, { useEffect, useState } from "react";
import FAQs from "@/components/FAQs";
import SearchBar from "@/components/Search/SearchBar";
import Image from "next/image";
import { Searchparams } from "@/Utils/searchParams";
import { API } from "@/Api";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import RecentReview from "@/components/sliders/RecentReview";
import NoCarFound from "@/components/NoCarFound";

const Index = () => {
  const multiparalist = [
    {
      heading: "All-weather performance",
      para: "When the going gets tough, Jeeps keep going. With four-wheel-drive available throughout the lineup, any Jeep can instill confidence when driving through severe weather conditions, helping ensure you and your crew have a smooth vacation. Poor road conditions? No problem.",
    },
    {
      heading: "Five-seat convertible",
      para: "A Jeep Wrangler makes for a wholly original way to enjoy open-top motoring with friends: it’s the only four-door, five-seat convertible SUV on the market. Along with removable doors and a folding windshield, it adds up to the purest open-air experience, and takes your scenic trip to the next level.",
    },
    {
      heading: "Five-seat convertible",
      para: "With a selection of SUV models ranging from compact to full-size, it’s easy to find a Jeep with ample space for multiple people and adventure gear, making for smooth family getaways to popular vacation spots like national parks.",
    },
  ];
  const multiparalist2 = [
    {
      heading: "Griffith Park",
      para: "Perched in the hills north of Los Feliz, Griffith Park covers 4,310 acres and is known for its stunning views, winding trails, and attractions like the Griffith Observatory, Bronson Canyons, Autry Museum, and the LA Zoo.",
    },
    {
      heading: "Movie studio tours",
      para: "Get backstage access on tours at Paramount, Universal City, Warner Brothers, or Sony to see where famous shows and movies are produced. Universal Studios Hollywood is the go-to show in town, and be sure to head a few minutes down the 101 to stroll the Hollywood Walk of Fame.",
    },
    {
      heading: "Venice Beach",
      para: "Take your car to the coast, to bask in the waves, stroll the quaint Venice canals, and hit the bustling beach boardwalk for the gun show at Muscle Beach. Santa Monica Beach and Santa Monica Pier are right next door.",
    },
  ];
  const multiparalist4 = [
    {
      heading: "Joshua Tree National Park",
      para: "A three-hour drive east of LA, the desert landscape at this national park is unlike any other! The boulders and trees have inspired numerous creatives, hikers, climbers, and campers.",
    },
    {
      heading: "Ojai, CA",
      para: "Book something comfortable like a crossover, full-size car, or larger vehicle, and travel an hour and a half north to the bohemian town of Ojai in the Topatopa Mountains between Ventura and Santa Barbara.",
    },
    {
      heading: "Big Bear, CA",
      para: "Make the convenient 90-minute drive into the San Bernardino Mountains and enjoy winter skiing at Bear Mountain Ski Resort, or rent a boat for summer watersports and chilling on the lake.",
    },
  ];
  const multiparalist3 = [
    {
      heading: "Pacific Coast Highway",
      para: "The PCH, as the locals call it, stretches along the U.S. coast from the sandy beaches of San Diego all the way through Washington — grab a sports car, fuel up, and soak in the Southern California sun.",
    },
    {
      heading: "Angeles Crest Highway",
      para: "This winding street is famous among drivers, climbing up 7,900 feet and clinging to twisting mountain roads through canyons and ridges with glimpses of LA over cliff edges.",
    },
    {
      heading: "Mulholland Drive",
      para: "This breathtaking 14-mile drive through the Santa Monica Mountains allows drivers to relive Hollywood chase scenes with great views of celebrity properties and the scenic valley below.",
    },
  ];
  const keypoints = [
    {
      img: liveLargecar,
      heading: "Live large in Los Angeles",
      para: "Los Angeles is an impressive place to visit, and not just because it looks just like the movies! Get your fill of sunny beaches, steep yourself in the rich arts and culture scenes, and eat your way across town while enjoying SoCal’s beautiful weather.",
      para2:
        "Driving is a lifestyle in this sprawling, bustling metropolis, so get yourself a sweet ride in LA that’ll make you excited to cruise to favorite road trip destinations, or wherever your heart takes you.",
    },
  ];
  const keypoints2 = [
    {
      img: hit_the_road,
      sub_heading: "Try car sharing in Los Angeles, CA",
      heading: "Hit the road",
      para: "Close to the mountains, the beach, and the desert, Los Angeles is perfectly situated to book a car on Rent Eagles and get away for a mind-blowing day trip or road trip that’ll make you feel like you’re worlds away. When you’re done with city driving on busy avenues like Hollywood Boulevard and Rodeo Drive, hit the freeways and explore the surrounding areas.",
      btn_link: "/",
      btn_text: "Book the perfect car",
    },
  ];

  const location = Searchparams("location");
  const category = Searchparams("category");

  const [carsApiData, setCarsApiData] = useState([]);
  const [topHost, setTopHost] = useState([]);

  const getCarsByBrand = async () => {
    try {
      if (category) {
        const res2 = await API.GetCarsByCategory(category);
        setCarsApiData(res2?.data?.data);
      } else {
        const res = await API.GetCarsByBrand("jeep");
        setCarsApiData(res?.data?.data);

        // top host
        const host_res = await API.GetTopHosts(location);
        setTopHost(host_res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getCarsByBrand();
  }, [category]);

  return (
    <>
      <div className="search-banner py-12 search-banner-bg">
        <div className="container max-w-[840px] px-5 mx-auto">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
            <div className="">
              <h1 className="text-black lg:line-clamp-1 font-bold text-4xl mb-1">
                {category
                  ? `Rent ${category} in ${location ?? "New York"}`
                  : `Rent cars in ${location ?? "New York"}`}
              </h1>
              <h2 className="text-black  font-bold font-4xl ">
                Discover Rent Eagles, the world&apos;s largest car sharing
                marketplace
              </h2>
            </div>
            <div>
              <Image
                alt="destination-img"
                src={destination}
                className="max-w-[100px] "
              />
            </div>
          </div>
          <SearchBar category={category} location={location} />
        </div>
      </div>
      {carsApiData?.length ? (
        <div className="section_ container max-w-7xl mx-auto px-5 section_pt">
          <Slider
            data={carsApiData}
            title={`Top rated ${
              category
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : "Jeep"
            }`}
            type="jeep"
          />
          <Link
            href={"/"}
            className="bg-[#99000B] mt-12 mx-auto py-3 px-7 text-white table"
          >
            See more cars in Los Angeles, CA
          </Link>
        </div>
      ) : (
        <NoCarFound />
      )}
      <ImageWithtext keypoints={keypoints} imagefirst={false} />

      <MultiplePara
        heading={`${
          location
            ? location?.charAt(0).toUpperCase() + location?.slice(1)
            : "New York"
        } favorites`}
        sub_heading={
          "Hot, new activities are always popping up in Los Angeles, but these are classic favorites that have made the City of Angels iconic."
        }
        MultiplePara={multiparalist2}
        line={true}
      />
      <div className="">
        {!category && topHost?.length ? (
          <div className=" container mx-auto px-5 max-w-7xl section_pb ">
            <h2 className="md:text-center font-bold text-3xl md:text-5xl mb-10">
              Top hosts in {location ?? "New York"}
            </h2>
            {topHost?.map((item, index) => (
              <TopHostCars key={index} item={item} />
            ))}
            {/* <TopHostCars carsApiData={carsApiData} /> */}
          </div>
        ) : (
          <NoCarFound />
        )}
      </div>

      {/* <ImageWithtext keypoints={keypoints2} imagefirst={true} /> */}
      <div
        className={`flex justify-evenly  gap-10 xl:gap-28 lg:items-center flex-col lg:flex-row-reverse container mx-auto px-5 py-12`}
      >
        <div className="">
          <Image
            src={hit_the_road}
            width={450}
            height={280}
            alt=""
            className={`w-full max-h-[600px] `}
          />
        </div>
        <div className={`textarea max-w-[440px]`}>
          <h4 className="text-black font-bold text-2xl mb-3">
            Try car sharing in Los Angeles, CA
          </h4>
          <h3 className="text-black font-bold text-3xl lg:text-4xl mb-3">
            Hit the road
          </h3>
          <p
            className={`text-black font-normal py-4 pb-10 text-base max-w-[400px] `}
          >
            Close to the mountains, the beach, and the desert, Los Angeles is
            perfectly situated to book a car on Rent Eagles and get away for a
            mind-blowing day trip or road trip that’ll make you feel like you’re
            worlds away. When you’re done with city driving on busy avenues like
            Hollywood Boulevard and Rodeo Drive, hit the freeways and explore
            the surrounding areas.
          </p>
          <Link href={"/"} className="bg-[#99000B] mt-12  py-3 px-7 text-white">
            Book the perfect car
          </Link>
        </div>
      </div>

      <MultiplePara MultiplePara={multiparalist4} />

      {/* <div className="bg-web_brown/20">
        <div className="section_pt section_pb container mx-auto px-5">
          <Slider
            data={reviewsData}
            title="Recent reviews"
            type="recent_reviews"
          />
        </div>
      </div> */}

      <div className="section_pb section_pt container mx-auto px-5">
        <Slider data={carsData} title="Browse by make" type="cars" />
      </div>

      <div className="section_pb container mx-auto px-5">
        <Slider
          data={carsCategoryData}
          title="Browse by category"
          type="cars"
          cat={true}
        />
      </div>

      <MultiplePara
        heading={`Best ${location} driving roads`}
        MultiplePara={multiparalist3}
        btn_link={"/"}
        btn_text={`Search cars in ${location}`}
      />

      <div className="container mx-auto px-5 pt-6">
        <h2 className="lg_heading pb-2.5  text-center bg-gradient-to-t from-web_brown/30 via-white px-4 max-w-fit mx-auto">
          Frequently asked questions
        </h2>
        <div className="section_pb pt-12">
          <FAQs />
        </div>
      </div>
    </>
  );
};

export default Index;

const TopHostCars = ({ item }) => {
  return (
    <div className="mb-10 flex lg:flex-row flex-col">
      <div className=" flex-1 lg:flex-[.33] max-w-[400px]">
        <div className="flex mb-10 items-center gap-2">
          <Image
            alt="logo"
            src={item?.profile_photo}
            width={1000}
            height={1000}
            className="rounded-full w-24 h-24"
          />
          <div>
            <p className="text-xl font-bold">{item?.name}</p>
            <div className="flex items-center gap-3 my-2 ">
              <Image alt="icon" src={trustpilate_icon} />
              <p className="text-xs font-semibold">All-Star Host</p>
            </div>
            <p className="text-xs font-medium">
              162041 trips • Joined May 2016
            </p>
          </div>
        </div>
        {/* body */}
        {item?.drivers?.map((item, index) => (
          <div className=" mb-10" key={index}>
            <div className="flex item-center gap-2">
              {Array.from({ length: item?.rating || 0 }, (_, index) => (
                <StarIcon key={index} className="w-5 h-5 text-web_brown " />
              ))}
            </div>
            <p className="my-2 font-semibold">{item?.description}</p>
            {item?.name && (
              <p className="text-xs font-medium">
                {item?.name}. <span> - {item?.date}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className=" flex-1 container max-w-[840px] lg:flex-[.64]">
        {item?.cars?.length ? (
          <Slider
            data={item?.cars}
            title={`${item?.name} vehicles`}
            type="hosts"
          />
        ) : null}
      </div>
    </div>
  );
};
