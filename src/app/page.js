"use client";
import { API } from "@/Api";
import FAQs from "@/components/FAQs";
import Hero from "@/components/Hero";
import NoCarFound from "@/components/NoCarFound";
import Offer from "@/components/home/Offer";
import Slider from "@/components/sliders/Slider";
import {
  carsData,
  destinationData,
  experienceData,
  perfectCarsData,
  reviewsData,
} from "@/data/slider";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [topHost, setTopHost] = useState([]);

  const getTopHosts = async () => {
    try {
      const res = await API.GetTopHost();
      setTopHost(res?.data?.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getTopHosts();
  }, []);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-5">
        <div className="pt-12 lg:pt-14 section_pb text-center max-w-fit mx-auto">
          <h2 className="lg_heading lg:pb-6 pb-3">Find your drive</h2>
          <p className="bg-gradient-to-t from-web_brown/30 via-web_brown/10 px-4 para">
            Explore the world&apos;s largest car sharing marketplace
          </p>
        </div>

        <div className="section_pb">
          <Slider data={carsData} title="Browse by make" type="cars" />
        </div>

        <div className="section_pb ">
          <Slider data={perfectCarsData} type="perfect_cars" />
        </div>

        <div className="section_pb">
          <Slider
            data={destinationData}
            title="Browse by destination"
            type="destination"
          />
        </div>

        <div className="section_pb">
          <Slider
            data={experienceData}
            title="Browse by experience"
            type="experience"
          />
        </div>

        <h2 className="lg_heading pb-2.5  text-center bg-gradient-to-t from-web_brown/30 via-white px-4 max-w-fit mx-auto">
          Meet the hosts
        </h2>

        {/*  */}
        <div className="section_pb pt-12">
          {topHost?.length ? (
            <Slider
              data={topHost}
              title="Top hosts on Rent Eagles"
              type="reviews"
            />
          ) : (
            // <p className="para !pb-5">No hosts yet!</p>
            <NoCarFound />
          )}
        </div>
      </div>

      <div className="section_pb">
        <Offer />
      </div>

      <div className="container mx-auto px-5">
        <h2 className="lg_heading pb-2.5  text-center bg-gradient-to-t from-web_brown/30 via-white px-4 max-w-fit mx-auto">
          Frequently asked questions
        </h2>
        <div className="section_pb pt-12">
          <FAQs />
        </div>
      </div>
    </div>
  );
}
