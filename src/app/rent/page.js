"use client";
import { noFound, rentajeep1, top_jeep, trustpilate_icon } from "@/Assets";
import ImageWithtext from "@/components/Aboutus/ImageWithtext";
import LeftRightText from "@/components/rent-a-jeep/LeftRightText";
import MultiplePara from "@/components/rent-a-jeep/MultiplePara";
import PageDivider from "@/components/rent-a-jeep/PageDivider";
import SearchBanner from "@/components/rent-a-jeep/SearchBanner";
import { destinationData, experienceData, reviewsData } from "@/data/slider";
import Slider from "@/components/sliders/Slider";
import React, { useEffect, useState } from "react";
import FAQs from "@/components/FAQs";
import { Searchparams } from "@/Utils/searchParams";
import { API } from "@/Api";
import Image from "next/image";
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
      heading: "Jeep Wrangler",
      para: "The Jeep brand owes its very existence to the Wrangler, its most iconic and capable model. Robust four-wheel-drive systems, solid front and rear axles, and unique tricks like removable doors enable the Wrangler to go where other SUVs dare not tread. What’s more, the removable roof and ample back seat space allow for fun in the sun for your whole crew.",
    },
    {
      heading: "Jeep Gladiator",
      para: "Essentially a pickup truck version of the Wrangler, the Gladiator blends that model’s ruggedness and off-road prowess with cavernous cargo space, thanks to its lengthened body and five-foot-long cargo bed. A strong V6 offers competitive performance and power, and the Gladiator stands alone as the only pickup that lets you go roofless on your outdoor adventure.",
    },
    {
      heading: "Jeep Grand Cherokee",
      para: "If you like your family getaways with a generous serving of refinement, Jeep’s top model beckons. A quiet and refined ride, a rich set of vehicle features, and room for adults in every row make for smooth sailing on the pavement, while Jeep’s available four-wheel-drive hardware makes the Grand Cherokee a rugged vehicle that can hold its own when the going gets tough.",
    },
  ];
  const keypoints = [
    {
      img: rentajeep1,
      heading: "What Jeeping is all about",
      para: "Driving a Jeep isn’t just for getting around — it’s a lifestyle. Jeeps let you do more, see more, and have more fun than cars that need to keep their feet dry. If you’re thinking about future trips, find a nearby Jeep on Rent Eagles for whatever adventure you’re planning, and discover why everyone loves the Jeep lifestyle.",
    },
  ];

  const brand = Searchparams("brand");
  const [carsData, setCarsData] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  const getCarsByBrand = async () => {
    try {
      const res = await API.GetCarsByBrand(brand);
      const reviewsRes = await API.GetReviewsByBrand(brand);
      setCarsData(res?.data?.data);
      setRecentReviews(reviewsRes?.data?.data);
      // console.log(reviewsRes?.data?.data, "res....");
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getCarsByBrand();
  }, []);

  return (
    <>
      <SearchBanner
        topheading={
          "Discover Rent Eagles, the world's largest car sharing marketplace"
        }
        heading={`Rent a ${brand}`}
      />
      {carsData?.length > 0 ? (
        <div className="section_pb container mx-auto max-w-7xl px-5 section_pt">
          <Slider
            data={carsData}
            title={`Top rated ${
              brand?.charAt(0).toUpperCase() + brand?.slice(1)
            }`}
            type="jeep"
          />
        </div>
      ) : (
        <NoCarFound />
      )}

      <LeftRightText
        heading1={"Drive a Jeep 4x4"}
        heading2={"For the road less traveled"}
        para1={
          "Whether driving in the city, sun, or snow, a Jeep is the perfect choice for anywhere your journey might take you."
        }
        para2={
          "Jeep’s modern models offer space and utility for your family trip, and trail-rated Jeeps have the rugged power to back up their tough-guy looks. In a Jeep you can hit the high road, low road, or any road in between in just about any condition."
        }
      />
      <PageDivider />
      <MultiplePara
        heading={""}
        MultiplePara={multiparalist}
        btn_text={"Book a Jeep today"}
        btn_link={"/"}
      />
      {/* <ImageWithtext
        mainheading={"Want to dive deeper?"}
        keypoints={keypoints}
        imagefirst={true}
      /> */}
      <div className="container mx-auto px-5">
        <h2 className="text-center pb-16 text-4xl md:text-5xl my-5 font-bold">
          Want to dive deeper?
        </h2>

        <div
          className={`flex  gap-10 xl:gap-28 lg:items-center py-6  flex-col lg:flex-row`}
        >
          <div className="flex-1">
            <Image
              src={rentajeep1}
              width={520}
              height={280}
              alt=""
              className={`w-full max-h-[500px] `}
            />
          </div>
          <div className={`textarea flex-1`}>
            {/* <h4 className="text-black font-bold text-2xl mb-3">
                  {item.sub_heading}
                </h4> */}
            <h3 className="text-black font-bold text-3xl lg:text-4xl mb-3">
              What Jeeping is all about
            </h3>
            <p className={`text-black font-normal text-base mb-4 `}>
              Driving a Jeep isn’t just for getting around — it’s a lifestyle.
              Jeeps let you do more, see more, and have more fun than cars that
              need to keep their feet dry. If you’re thinking about future
              trips, find a nearby Jeep on Rent Eagles for whatever adventure
              you’re planning, and discover why everyone loves the Jeep
              lifestyle.
            </p>
          </div>
        </div>
      </div>

      <MultiplePara
        heading={"Top Jeep models"}
        MultiplePara={multiparalist2}
        btn_text={"Drive a Jeep"}
        btn_link={"/"}
      />
      {recentReviews?.length ? (
        <div className="bg-web_brown/20">
          <div className="section_pt section_pb container mx-auto px-5">
            <Slider
              data={reviewsData}
              title="Recent reviews"
              type="recent_reviews"
            />
          </div>
        </div>
      ) : (
        // <p className="para !pb-5">No reviews yet!</p>
        <NoCarFound />
      )}

      <div className="section_pb section_pt container mx-auto px-5">
        <Slider
          data={destinationData}
          title="Browse by destination"
          type="destination"
        />
      </div>
      <div className="container mx-auto px-5">
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
