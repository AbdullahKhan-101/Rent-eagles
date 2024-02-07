"use client";
import React from "react";
import { SampleNextArrow, SamplePrevArrow } from "./SliderButtons";
import CarCard from "./CarCard";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import DestinationCard from "./DestinationCard";
import ExperienceCard from "./ExperienceCard";
import Reviews from "./Reviews";
import PerfectCar from "./PerfectCar";
import TopCar from "./TopCar";
import RecentReview from "./RecentReview";

const CarsSlider = ({ data, cat, title, type }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow:
      type === "cars"
        ? 5
        : type === "destination"
        ? 6
        : type === "perfect_cars"
        ? 1
        : type === "hosts"
        ? 2
        : type === "experience" || "reviews" || "jeep" || "recent_reviews"
        ? 3
        : 5,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow:
            type === "cars"
              ? 4
              : type === "destination"
              ? 5
              : type === "perfect_cars"
              ? 1
              : type === "hosts"
              ? 2
              : type === "experience" || "reviews" || "jeep" || "recent_reviews"
              ? 3
              : 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            type === "perfect_cars"
              ? 1
              : type === "experience" ||
                "reviews" ||
                "jeep" ||
                "hosts" ||
                "recent_reviews"
              ? 2
              : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: type === "perfect_cars" ? 1 : 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 220,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="">
      <p className="para !pb-5">{title}</p>
      <div>
        <Slider {...settings}>
          {data?.map((item) =>
            type === "cars" ? (
              <CarCard cat={cat} item={item} key={item.id} />
            ) : type === "destination" ? (
              <DestinationCard item={item} key={item.id} />
            ) : type === "experience" ? (
              <ExperienceCard item={item} key={item.id} />
            ) : type === "reviews" ? (
              <Reviews item={item} key={item.id} />
            ) : type === "recent_reviews" ? (
              <RecentReview item={item} key={item.id} />
            ) : type === "perfect_cars" ? (
              <PerfectCar item={item} key={item.id} />
            ) : type === "jeep" ? (
              <TopCar item={item} key={item.id} />
            ) : type === "hosts" ? (
              <TopCar item={item} key={item.id} />
            ) : (
              ""
            )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default CarsSlider;
